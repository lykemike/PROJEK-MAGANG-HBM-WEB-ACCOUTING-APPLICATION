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
    // get date from input, then split into DD:MM:YYYY
    const confirm_date = req.body.tgl_transaksi;
    const day = confirm_date.split("-")[2];
    const month = confirm_date.split("-")[1];
    const year = confirm_date.split("-")[0];

    // get current timestamp 25 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // latest id
    const find_latest = parseInt(req.body.id);

    // get data from front end
    const frontend_data = {
      tgl_transaksi: req.body.tgl_transaksi,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      total_debit: parseInt(req.body.total_debit),
      total_kredit: parseInt(req.body.total_kredit),
      lampiran: "req.file.filename",
    };

    // update new data to header jurnal table
    const update_header_jurnal = await prisma.headerJurnal.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: frontend_data,
    });

    // delete old jurnal in detail jurnal table
    const delete_old_jurnal = await prisma.detailJurnal.deleteMany({
      where: {
        header_jurnal_id: parseInt(req.body.id),
      },
    });

    // push data to detail
    let detail = [];
    req.body.detail_jurnal &&
      JSON.parse(req.body.detail_jurnal).map((i) => {
        detail.push({
          header_jurnal_id: parseInt(req.body.id),
          akun_id: parseInt(i.akun_id),
          kategori_id: parseInt(i.kategori_id),
          akun_nama: i.akun_nama,
          deskripsi: i.deskripsi,
          debit: parseInt(i.debit),
          kredit: parseInt(i.kredit),
          nominal: parseInt(i.nominal),
          tipe_saldo: i.tipe_saldo,
          debit_disable: i.debit_disable,
          kredit_disable: i.kredit_disable,
        });
      });

    // create detail jurnal
    const create_detail_jurnal = await prisma.detailJurnal.createMany({
      data: detail,
      skipDuplicates: true,
    });

    // delete old jurnal in laporan transaksi table
    const delete_old_laporan_transaksi = await prisma.laporanTransaksi.deleteMany({
      where: {
        no_ref: find_latest,
        sumber_transaksi: "Journal Entry",
      },
    });

    // push data to laporan transaksi
    let laporan_transaksi = [];
    req.body.detail_jurnal &&
      JSON.parse(req.body.detail_jurnal).map((i) => {
        laporan_transaksi.push({
          akun_id: parseInt(i.akun_id),
          kategori_id: parseInt(i.kategori_id),
          timestamp: current_time,
          date: req.body.tgl_transaksi,
          hari: parseInt(day),
          bulan: parseInt(month),
          tahun: parseInt(year),
          debit: parseInt(i.debit),
          kredit: parseInt(i.kredit),
          sumber_transaksi: "Journal Entry",
          no_ref: find_latest,
          delete_ref_no: find_latest,
          delete_ref_name: "Journal Entry",
        });
      });

    // create laporan transaksi
    const create_laporan_transaksi = await prisma.laporanTransaksi.createMany({
      data: laporan_transaksi,
    });

    res.status(201).json({ message: "Update Jurnal success!", id: find_latest });
  } catch (error) {
    res.status(400).json({ data: "Failed to update jurnal!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
