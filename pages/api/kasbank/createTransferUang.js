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
    const frontend_data = {
      akun_id: parseInt(req.body.akun_id),
      jumlah: parseInt(req.body.jumlah),
      memo: req.body.memo,
      file_attachment: req.file.filename,
      no_transaksi: parseInt(req.body.no_transaksi),
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
    };

    const create_transfer_uang = await prisma.transferUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const update_no_transaksi = await prisma.transferUang.update({
      where: {
        id: frontend_data.id,
      },
      data: {
        no_transaksi: frontend_data.id,
      },
    });

    res
      .status(201)
      .json({ message: "Create Transfer Uang Success!", data: create_transfer_uang }, { message: "Update No Transaksi!", data: update_no_transaksi });
  } catch (error) {
    res.status(400).json({ data: "Failed!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
