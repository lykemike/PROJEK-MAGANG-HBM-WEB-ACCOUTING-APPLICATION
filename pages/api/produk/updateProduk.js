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
    const updateProduk = await prisma.produk.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        image: req.file.filename,
        nama: req.body.nama,
        kode_sku: req.body.kode_sku,
        kategori_produk_id: parseInt(req.body.kategori_produk),
        unit: parseInt(req.body.unit),
        deskripsi: req.body.deskripsi,

        harga_beli_satuan: parseInt(req.body.hbs),
        akun_pembelian: parseInt(req.body.akun_pembelian),
        pajak_beli: req.body.pajak_beli,

        harga_jual_satuan: parseInt(req.body.hjs),
        akun_penjualan: parseInt(req.body.akun_penjualan),
        pajak_jual: req.body.pajak_jual,
      },
    });

    res.status(201).json({ message: "UPDATE PRODUK SUCCESS!", data: updateProduk });
  } catch (error) {
    res.status(400).json({ data: "UPDATE PRODUK FAILED!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
