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
    // insert data to database
    const create_produk = await prisma.produk.create({
      data: {
        file_attachment: req.file == undefined ? "-" : req.file.filename,
        nama: req.body.nama,
        kategori_id: parseInt(req.body.kategori_id),
        kategori_name: req.body.kategori_name,
        deskripsi: req.body.deskripsi.trim().length == 0 ? "-" : req.body.deskripsi,
        harga: parseInt(req.body.harga),
        akun_id: parseInt(req.body.akun_penjualan_id),
        akun_penjualan_name: req.body.akun_penjualan_name,
      },
    });

    // update product kategori when selected
    const update_kategori_produk = await prisma.kategoriProduk.update({
      where: {
        id: parseInt(req.body.kategori_id),
      },
      data: {
        jumlah: {
          increment: 1,
        },
      },
    });

    res.status(201).json({ message: "Create produk produk success!", create_produk });
  } catch (error) {
    res.status(400).json({ data: "Failed to create produk", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
