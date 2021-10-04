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
      no_transaksi: parseInt(req.body.no_transaksi),
      tgl_transaksi: req.body.tgl_transaksi,
      total_debit: parseInt(req.body.total_debit),
      total_kredit: parseInt(req.body.total_kredit),
      lampiran: "req.file.filename",
    };

    const create_header_jurnal = await prisma.headerJurnal.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_latest = await prisma.headerJurnal.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    let detail = [];
    req.body.detail_jurnal &&
      JSON.parse(req.body.detail_jurnal).map((i) => {
        detail.push({
          header_jurnal_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          deskripsi: i.deskripsi,
          tag: i.tag,
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

    res.status(201).json([
      {
        message: "Create Jurnal success!",
        data: create_detail_jurnal,
        id: find_latest,
      },
    ]);
  } catch (error) {
    res.status(400).json([{ data: "Failed to create jurnal!", error }]);
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
