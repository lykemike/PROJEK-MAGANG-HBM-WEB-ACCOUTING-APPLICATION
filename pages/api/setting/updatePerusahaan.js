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
      logo: req.bodyParser.filename,
      tampilkan_logo: req.body.boolean,
      nama_perushaan: req.body.nama_perushaaan,
      alamat: req.body.alamat,
      alamat_pengiriman: req.body.alamat_pengiriman,
      telepon: req.body.telepon,
      fax: req.body.fax,
      npwp: req.body.npwp,
      website: req.body.website,
      email: req.body.email,
      nama_bank: req.body.nama_bank,
      cabang_bank: req.body.cabang_bank,
      alamat_bank: req.body.alamat_bank,
      nomor_rekening: req.body.nomor_rekening,
      atas_nama: req.body.atas_nama,
      swift_code: req.body.swift_code,
    };
    const settingPerusahaan = await prisma.settingPerusahaan.update({
      where: {
        id: 1,
      },
      data: frontend_data,
    });

    res.status(201).json([
      {
        message: "Create Detail Penjualan Success!",
        data: settingPerusahaan,
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
