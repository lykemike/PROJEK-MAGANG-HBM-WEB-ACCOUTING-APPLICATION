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
      tgl_transaksi: req.body.tgl_transaksi,
      total_debit: parseInt(req.body.total_debit),
      total_kredit: parseInt(req.body.total_kredit),
      lampiran: "req.file.filename",
    };

    const update_header_jurnal = await prisma.headerJurnal.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: frontend_data,
    });

    const delete_old_jurnal = await prisma.detailJurnal.deleteMany({
      where: {
        header_jurnal_id: parseInt(req.body.id),
      },
    });

    let detail = [];
    req.body.detail_jurnal &&
      JSON.parse(req.body.detail_jurnal).map((i) => {
        detail.push({
          header_jurnal_id: parseInt(req.body.id),
          akun_id: parseInt(i.akun_id),
          akun_nama: i.akun_nama,
          deskripsi: i.deskripsi,
          debit: parseInt(i.debit),
          kredit: parseInt(i.kredit),
          nominal: parseInt(i.nominal),
          tipe_saldo: i.tipe_saldo,
        });
      });

    const create_detail_jurnal = await prisma.detailJurnal.createMany({
      data: detail,
      skipDuplicates: true,
    });

    const find_latest = await prisma.headerJurnal.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    res.status(201).json([{ message: "Update Jurnal success!", id: find_latest }]);
  } catch (error) {
    res.status(400).json([{ data: "Failed to update jurnal!", error }]);
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
