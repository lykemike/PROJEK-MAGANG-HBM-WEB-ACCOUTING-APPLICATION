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
      status: "Active",
    };

    const create_header_pembelian = await prisma.headerPembelian.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_latest = await prisma.headerPembelian.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const update_no_transaksi = await prisma.headerPembelian.update({
      where: {
        id: find_latest.id,
      },
      data: {
        no_transaksi: find_latest.id,
      },
    });

    const get_setting_pembelian = await prisma.settingDefault.findMany({
      where: {
        tipe: "pembelian",
      },
      include: {
        akun: true,
      },
    });

    const setting_pembelian_cogs = get_setting_pembelian.filter((i) => i.nama_setting === "pembelian_cogs");
    const setting_pemotongan = get_setting_pembelian.filter((i) => i.nama_setting === "pemotongan");
    const setting_uang_muka_pembelian = get_setting_pembelian.filter((i) => i.nama_setting === "uang_muka_pembelian");
    const setting_hutang_blm_ditagih = get_setting_pembelian.filter((i) => i.nama_setting === "hutang_blm_ditagih");
    const setting_pajak_pembelian = get_setting_pembelian.filter((i) => i.nama_setting === "pajak_pembelian");
    const diskon_penjualan = get_setting_pembelian.filter((i) => i.nama_setting === "diskon_penjualan");
    const total_diskon = parseInt(req.body.total_diskon_per_baris) + parseInt(req.body.total_diskon);
    
    let detail = [];
    req.body.produks &&
      JSON.parse(req.body.produks).map((i) => {
        if (parseInt(i.hasil_pajak) == 0) {
          detail.push({
            header_pembelian_id: find_latest.id,
            produk_id: parseInt(i.produk_id),
            nama_produk: i.nama_produk,
            desk_produk: i.deskripsi_produk,
            kuantitas: parseInt(i.kuantitas),
            satuan: i.satuan,
            harga_satuan: parseInt(i.harga_satuan),
            diskon: parseInt(i.diskon),
            hasil_diskon: parseInt(i.hasil_diskon),
            pajak_id: 1,
            pajak_nama: "KOSONG",
            pajak_persen: 0,
            hasil_pajak: 0,
            jumlah: parseInt(i.jumlah),
            pajak_nama_akun_beli: setting_pajak_pembelian[0].akun.nama_akun,
          });
        } else {
          detail.push({
            header_pembelian_id: find_latest.id,
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
            pajak_persen: parseInt(i.pajak_persen),
            hasil_pajak: parseInt(i.hasil_pajak),
            jumlah: parseInt(i.jumlah),
            pajak_nama_akun_beli: i.pajak_nama_akun_beli,
          });
        }
      });

    const create_detail_pembelian = await prisma.detailPembelian.createMany({
      data: detail,
      skipDuplicates: true,
    });

    let list_pajak = [];
    detail.map((i) => {
      if (i.nama_pajak == "" || i.hasil_pajak == 0) {
        list_pajak.push({
          header_pembelian_id: find_latest.id,
          nama_akun: setting_pajak_pembelian[0].akun.nama_akun,
          nominal: 0,
          tipe_saldo: "Debit",
        });
      } else {
        list_pajak.push({
          header_pembelian_id: find_latest.id,
          nama_akun: i.pajak_nama_akun_beli,
          nominal: parseInt(i.hasil_pajak),
          tipe_saldo: "Debit",
        });
      }
    });

    const akunUangMuka = await prisma.akun.findMany({
      where: {
        id: parseInt(req.body.akun_uang_muka),
      },
    });

    const akunPemotongan = await prisma.akun.findMany({
      where: {
        id: parseInt(req.body.akun_pemotongan),
      },
    });

    const add_jurnal_pembelian = await prisma.jurnalPembelian.createMany({
     data: list_pajak,
    })

    const create_kredit_jurnal = await prisma.jurnalPembelian.createMany({
      data: [
      {
        header_pembelian_id: find_latest.id,
        nama_akun: setting_pembelian_cogs[0].akun.nama_akun,
        nominal: parseInt(req.body.subtotal),
        tipe_saldo: "Debit",
      },  
      {
        header_pembelian_id: find_latest.id,
        nama_akun: setting_pemotongan[0].akun.nama_akun,
        nominal: parseInt(req.body.pemotongan),
        tipe_saldo: "Kredit",
      },
      {
        header_pembelian_id: find_latest.id,
        nama_akun: diskon_penjualan[0].akun.nama_akun,
        nominal: parseInt(total_diskon),
        tipe_saldo: "Kredit",
      },
      {
        header_pembelian_id: find_latest.id,
        nama_akun: setting_uang_muka_pembelian[0].akun.nama_akun,
        nominal: parseInt(req.body.uang_muka),
        tipe_saldo: "Kredit",
      },
      {
        header_pembelian_id: find_latest.id,
        nama_akun: setting_hutang_blm_ditagih[0].akun.nama_akun,
        nominal: parseInt(req.body.sisa_tagihan),
        tipe_saldo: "Kredit",
      },
      ],
    });
    res.status(201).json([
      {
        message: "Create Detail Pembelian Success!",
        data: add_jurnal_pembelian, 
      },
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
