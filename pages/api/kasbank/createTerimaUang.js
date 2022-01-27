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

    // get current timestamp 25 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // get data from front end
    const frontend_data = {
      akun_setor_id: parseInt(req.body.akun_setor_id),
      kontak_id: parseInt(req.body.kontak_id),
      tgl_transaksi: req.body.tgl_transaksi,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      memo: req.body.memo,
      file_attachment: req.file == undefined ? "-" : req.file.filename,
      total: parseInt(req.body.total),
    };

    const create_terima_uang = await prisma.headerTerimaUang.create({
      data: frontend_data,
    });

    const find_detail_saldo = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_setor_id),
      },
    });

    const update_saldo_saat_ini = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_setor_id),
      },
      data: {
        sisa_saldo: find_detail_saldo.sisa_saldo + parseInt(req.body.total),
      },
    });

    const find_latest = await prisma.headerTerimaUang.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    let detail = [];
    req.body.detail_terima_uang &&
      JSON.parse(req.body.detail_terima_uang).map((i) => {
        detail.push({
          header_terima_uang_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          kategori_id: parseInt(i.kategori_id),
          nama_akun: i.nama_akun,
          deskripsi: i.deskripsi,
          jumlah: parseInt(i.jumlah),
        });
      });

    const create_detail_terima_uang = await prisma.detailTerimaUang.createMany({
      data: detail,
    });

    const create_jurnal_debit = await prisma.jurnalTerimaUang.create({
      data: {
        header_terima_uang_id: find_latest.id,
        akun_id: parseInt(req.body.akun_setor_id),
        nominal: parseInt(req.body.total),
        tipe_saldo: "Debit",
      },
    });

    let jurnal_kredit = [];
    detail.map((i) => {
      jurnal_kredit.push({
        header_terima_uang_id: find_latest.id,
        akun_id: parseInt(i.akun_id),
        nominal: parseInt(i.jumlah),
        tipe_saldo: "Kredit",
      });
    });

    const create_jurnal_kredit = await prisma.jurnalTerimaUang.createMany({
      data: jurnal_kredit,
    });

    const create_laporan_transaksi_debit = await prisma.laporanTransaksi.create({
      data: {
        akun_id: parseInt(req.body.akun_setor_id),
        kategori_id: 3,
        timestamp: current_time,
        date: req.body.tgl_transaksi,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: parseInt(req.body.total),
        kredit: 0,
        sumber_transaksi: "Kas & Bank",
        no_ref: find_latest.id,
        delete_ref_no: find_latest.id,
        delete_ref_name: "Terima Uang",
      },
    });

    let laporan_transaksi = [];
    req.body.detail_terima_uang &&
      JSON.parse(req.body.detail_terima_uang).map((i) => {
        laporan_transaksi.push({
          akun_id: parseInt(i.akun_id),
          kategori_id: parseInt(i.kategori_id),
          timestamp: current_time,
          date: req.body.tgl_transaksi,
          hari: parseInt(day),
          bulan: parseInt(month),
          tahun: parseInt(year),
          debit: 0,
          kredit: parseInt(i.jumlah),
          sumber_transaksi: "Kas & Bank",
          no_ref: find_latest.id,
          delete_ref_no: find_latest.id,
          delete_ref_name: "Terima Uang",
        });
      });

    const create_laporan_transaksi_kredit = await prisma.laporanTransaksi.createMany({
      data: laporan_transaksi,
    });

    res.status(201).json({ message: "Create terima uang success!", id: find_latest });
  } catch (error) {
    res.status(400).json({ data: "Failed to create terima uang!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
