import { PrismaClient } from ".prisma/client";
import { create } from "lodash";
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
    const update_produk = await prisma.produk.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        file_attachment: req.file.filename,
        nama: req.body.nama,
        kategori_id: parseInt(req.body.kategori_id),
        kategori_name: req.body.kategori_name,
        deskripsi: req.body.deskripsi,
        harga: parseInt(req.body.harga),
        akun_id: parseInt(req.body.akun_penjualan_id),
        akun_penjualan_name: req.body.akun_penjualan_name,
      },
    });

    res.status(201).json({ message: "Update produk produk success!", data: update_produk });
  } catch (error) {
    res.status(400).json({ data: "error", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
