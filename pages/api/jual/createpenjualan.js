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
      kontak_id: parseInt(req.body.nama_supplier),
      nama_supplier: req.body.nama_supplier,
      email: req.body.email,
      alamat_supplier: req.body.alamat_supplier,
      tgl_transaksi: req.body.tgl_transaksi,
      tgl_jatuh_tempo: req.body.tgl_jatuh_tempo,
      syarat_pembayaran: String(req.body.syarat_pembayaran),
      no_ref_penagihan: req.body.no_ref_penagihan,
      no_transaksi: parseInt(req.body.no_transaksi),
      tag: req.body.tag,
      pesan: req.body.pesan,
      memo: req.body.memo,
      file_attachment: req.file.filename,
      subtotal: parseInt(req.body.subtotal),
      total_diskon_per_baris: parseInt(req.body.total_diskon_per_baris),
      diskon: parseInt(req.body.diskon),
      total_diskon: parseInt(req.body.total_diskon),
      total_pajak_per_baris: parseInt(req.body.total_pajak_per_baris),
      total: parseInt(req.body.total),
      pemotongan: parseInt(req.body.pemotongan),
      pemotongan_total: parseInt(req.body.pemotongan_total),
      akun_pemotongan: parseInt(req.body.akun_pemotongan),
      uang_muka: parseInt(req.body.uang_muka),
      akun_uang_muka: parseInt(req.body.akun_uang_muka),
      sisa_tagihan: parseInt(req.body.sisa_tagihan),
      balance: parseInt(req.body.balance),
    };

    const create_header_penjualan = await prisma.headerPenjualan.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_penjualan = await prisma.headerPenjualan.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        id: frontend_data.id,
      },
    });

    const find_no_transaksi = await prisma.headerPenjualan.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        no_transaksi: frontend_data.id,
      },
    });

    const update_no_transaksi = await prisma.headerPenjualan.update({
      where: {
        id: frontend_data.id,
        no_transaksi: parseInt(req.body.no_transaksi),
      },
      data: {
        no_transaksi: find_no_transaksi.id,
      },
    });

    let detail = [];
    req.body.produks.map((i) => {
      detail.push({
        header_penjualan_id: find_header_penjualan.id,
        produk_id: parseInt(i.produk_id),
        nama_produk: i.nama_produk,
        desk_produk: i.deskripsi_produk,
        kuantitas: parseInt(i.kuantitas),
        satuan: i.satuan,
        harga_satuan: parseInt(i.harga_satuan),
        diskon: parseInt(i.diskon),
        hasil_diskon: parseInt(i.hasil_diskon),
        pajak_id: parseInt(i.pajak_id),
        pajak_nama: i.pajak_nama,
        pajak_persen: i.pajak_persen,
        hasil_pajak: parseInt(i.hasil_pajak),
        jumlah: parseInt(i.jumlah),
      });
    });

    const create_detail_penjualan = await prisma.detailPenjualan.createMany({
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json([
      { message: "Find produk detail success!", data: create_detail_penjualan },
      // { message: "Create Header Penjualan Success!", data: create_header_penjualan },
      // { message: "Find Header Penjualan ID Success!", data: find_header_penjualan },
      // { message: "Find No Transaksi Success!", data: find_no_transaksi },
      // { message: "Update No Transaksi Success!", data: update_no_transaksi },
      // { message: "Create Detail Penjualan Success!", data: create_detail_penjualan },
      // { message: "Update Jumlah Kategori Produk Success!", data: update_jumlah_kategori_produk },
    ]);
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
