import multer from "multer";
import { extname } from "path";
import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  callback(null, `${name}-${randomName}${fileExtName}`);
};

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: editFileName,
  }),
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  await runMiddleware(req, res, upload.single("file"));
  try {
    const frontend_data = {
      kontak_id: parseInt(req.body.kontak_id),
      nama_supplier: req.body.nama_supplier,
      email: req.body.email,
      alamat_perusahaan: req.body.alamat_perusahaan,
      akun_hutang_supplier_id: parseInt(req.body.akun_hutang_supp),
      tgl_transaksi: req.body.tgl_transaksi,
      tgl_jatuh_tempo: req.body.tgl_jatuh_tempo,
      syarat_pembayaran_id: parseInt(req.body.syarat_pembayaran_id),
      syarat_pembayaran_nama: req.body.syarat_pembayaran_nama,
      no_ref_penagihan: req.body.no_ref_penagihan,
      no_transaksi: parseInt(req.body.no_transaksi),
      memo: req.body.memo,

      file_attachment: req.file.filename,
      subtotal: parseInt(req.body.subtotal),
      total_diskon: parseInt(req.body.total_diskon),
      pajak_id: parseInt(req.body.pajak_id),
      pajak_nama: req.body.pajak_nama,
      pajak_persen: parseInt(req.body.pajak_persen),
      total_pajak: parseInt(req.body.total_pajak),
      sisa_tagihan: parseInt(req.body.sisa_tagihan),
      total: parseInt(req.body.sisa_tagihan),
      status: "Active",
      akun_diskon_pembelian_id: parseInt(req.body.akun_diskon_pembelian_id),
      akun_diskon_pembelian_nama: req.body.akun_diskon_pembelian_nama,
    };

    const update_header = await prisma.headerPembelian.update({
      where: {
        id: parseInt(req.body.no_transaksi),
      },
      data: frontend_data,
    });

    const delete_old_detail = await prisma.detailPembelian.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.no_transaksi),
      },
    });

    const delete_old_jurnal = await prisma.jurnalPembelian.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.no_transaksi),
      },
    });

    let detail = [];
    req.body.akun_beli &&
      JSON.parse(req.body.akun_beli).map((i) => {
        detail.push({
          header_pembelian_id: parseInt(req.body.no_transaksi),
          akun_pembelian_id: parseInt(i.akun_pembelian_id),
          nama_akun_pembelian: i.nama_akun_pembelian,
          deskripsi: i.deskripsi,
          kuantitas: parseInt(i.kuantitas),

          harga_satuan: parseInt(i.harga_satuan),
          diskon: parseInt(i.diskon),

          total: parseInt(i.jumlah),
          jumlah: parseInt(i.jumlah),
        });
      });

    const create_detail = await prisma.detailPembelian.createMany({
      data: detail,
    });

    let list_akun = [];
    detail.map((i) => {
      list_akun.push({
        header_pembelian_id: parseInt(req.body.no_transaksi),
        akun_id: parseInt(i.akun_pembelian_id),
        nominal: parseInt(i.jumlah),
        tipe_saldo: "Debit",
      });
    });

    const add_jurnal_pembelian = await prisma.jurnalPembelian.createMany({
      data: list_akun,
    });

    const create_kredit_jurnal = await prisma.jurnalPembelian.createMany({
      data: [
        {
          header_pembelian_id: parseInt(req.body.no_transaksi),
          akun_id: parseInt(req.body.akun_diskon_pembelian_id),
          nominal: parseInt(req.body.total_diskon),
          tipe_saldo: "Kredit",
        },
        {
          header_pembelian_id: parseInt(req.body.no_transaksi),
          akun_id: parseInt(req.body.pajak_id),
          nominal: parseInt(req.body.total_pajak),
          tipe_saldo: "Debit",
        },
        {
          header_pembelian_id: parseInt(req.body.no_transaksi),
          akun_id: parseInt(req.body.akun_hutang_supp),
          nominal: parseInt(req.body.sisa_tagihan),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json([{ message: "Update pembelian success!", data: create_kredit_jurnal }]);
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
