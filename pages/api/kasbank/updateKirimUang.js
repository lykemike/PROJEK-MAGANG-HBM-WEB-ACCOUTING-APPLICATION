import { PrismaClient } from ".prisma/client";
import multer from "multer";
import { extname } from "path";
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
    // get date from input, then split into DD:MM:YYYY
    const confirm_date = req.body.tgl_transaksi;
    const day = confirm_date.split("-")[2];
    const month = confirm_date.split("-")[1];
    const year = confirm_date.split("-")[0];

    // get current timestamp 24 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // header kirim uang id, declared as global
    const header_kirim_uang_id = parseInt(req.body.id);

    // get data from front end
    const frontend_data = {
      akun_bayar_id: parseInt(req.body.akun_bayar_id),
      kontak_id: parseInt(req.body.kontak_id),
      tgl_transaksi: req.body.tgl_transaksi,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      memo: req.body.memo,
      file_attachment: req.file == undefined ? "-" : req.file.filename,
      total: parseInt(req.body.total),
      status: "Belum terekonsiliasi",
    };

    // find old saldo in header kirim uang
    const find_old_saldo = await prisma.headerKirimUang.findFirst({
      where: {
        id: header_kirim_uang_id,
      },
    });

    // find old saldo in detail saldo awal
    const find_old_detail_saldo_awal = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
    });

    // revert old detail saldo awal
    const revert_old_saldo = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
      data: {
        sisa_saldo: find_old_detail_saldo_awal.sisa_saldo + find_old_saldo.total,
      },
    });

    // find new detail saldo awal
    const find_new_detail_saldo_awal = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
    });

    // update new detail saldo awal
    const update_saldo_new_saldo_awal = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
      data: {
        sisa_saldo: find_new_detail_saldo_awal.sisa_saldo - parseInt(req.body.total),
      },
    });

    // update header kirim uang
    const update_header = await prisma.headerKirimUang.update({
      where: {
        id: header_kirim_uang_id,
      },
      data: frontend_data,
    });

    // delete old detail kirim uang
    const delete_detail = await prisma.detailKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: header_kirim_uang_id,
      },
    });

    // push data to detail
    let detail = [];
    req.body.detail_kirim_uang &&
      JSON.parse(req.body.detail_kirim_uang).map((i) => {
        detail.push({
          header_kirim_uang_id: header_kirim_uang_id,
          akun_id: parseInt(i.akun_id),
          kategori_id: parseInt(i.kategori_id),
          nama_akun: i.nama_akun,
          deskripsi: i.deskripsi,
          jumlah: parseInt(i.jumlah),
        });
      });

    // create new detail kirim uang
    const create_new_detail = await prisma.detailKirimUang.createMany({
      data: detail,
    });

    // delete old jurnal kirim uang
    const delete_jurnal = await prisma.jurnalKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: header_kirim_uang_id,
      },
    });

    // push data to jurnal debit
    let jurnal_debit = [];
    detail.map((i) => {
      jurnal_debit.push({
        header_kirim_uang_id: header_kirim_uang_id,
        akun_id: parseInt(i.akun_id),
        nominal: parseInt(i.jumlah),
        tipe_saldo: "Debit",
      });
    });

    // create new jurnal debit
    const create_jurnal_debit = await prisma.jurnalKirimUang.createMany({
      data: jurnal_debit,
    });

    // create new jurnal kredit
    const create_jurnal_kredit = await prisma.jurnalKirimUang.create({
      data: {
        header_kirim_uang_id: header_kirim_uang_id,
        akun_id: parseInt(req.body.akun_bayar_id),
        nominal: parseInt(req.body.total),
        tipe_saldo: "Kredit",
      },
    });

    // delete old jurnal from laporan transaksi
    const delete_jurnal_in_laporan_transaksi = await prisma.laporanTransaksi.deleteMany({
      where: {
        delete_ref_name: "Kirim Uang",
        delete_ref_no: header_kirim_uang_id,
      },
    });

    // push data to laporan transaksi
    let laporan_transaksi = [];
    req.body.detail_kirim_uang &&
      JSON.parse(req.body.detail_kirim_uang).map((i) => {
        laporan_transaksi.push({
          akun_id: parseInt(i.akun_id),
          kategori_id: parseInt(i.kategori_id),
          timestamp: current_time,
          date: req.body.tgl_transaksi,
          hari: parseInt(day),
          bulan: parseInt(month),
          tahun: parseInt(year),
          debit: parseInt(i.jumlah),
          kredit: 0,
          sumber_transaksi: "Kas & Bank",
          no_ref: header_kirim_uang_id,
          delete_ref_no: header_kirim_uang_id,
          delete_ref_name: "Kirim Uang",
        });
      });

    // create laporan jurnal transaksi debit
    const create_laporan_transaksi_debit = await prisma.laporanTransaksi.createMany({
      data: laporan_transaksi,
    });

    // create laporan jurnal transaksi kredit
    const create_laporan_transaksi_kredit = await prisma.laporanTransaksi.create({
      data: {
        akun_id: parseInt(req.body.akun_bayar_id),
        kategori_id: 3,
        timestamp: current_time,
        date: req.body.tgl_transaksi,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: 0,
        kredit: parseInt(req.body.total),
        sumber_transaksi: "Kas & Bank",
        no_ref: header_kirim_uang_id,
        delete_ref_no: header_kirim_uang_id,
        delete_ref_name: "Kirim Uang",
      },
    });

    res.status(201).json({ message: "Update Kirim Uang Success!", id: header_kirim_uang_id });
  } catch (error) {
    res.status(400).json({ data: "Update kirim uang failed!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
