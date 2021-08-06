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
      akun_bayar_id: parseInt(req.body.akun_bayar_id),
      akun_penerima_id: parseInt(req.body.akun_penerima_id),
      no_transaksi: parseInt(req.body.no_transaksi),
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
      memo: req.body.memo,
      file_attachment: req.file.filename,
      subtotal: parseInt(req.body.subtotal),
      pajak: parseInt(req.body.hasil_pajak),
      total: parseInt(req.body.total),
    };

    const create_kirim_uang = await prisma.headerKirimUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_kirim_uang = await prisma.headerKirimUang.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        id: frontend_data.id,
      },
    });
    
    let detail = [];
    req.body.detail_kirim_uang &&
      JSON.parse(req.body.detail_kirim_uang).map((i) => {
        detail.push({
          header_kirim_uang_id: find_header_kirim_uang.id,
          akun_id: parseInt(i.akun_id),
          nama_akun: i.nama_akun,
          deskripsi: i.deskripsi,
          pajak_id: parseInt(i.pajak_id),
          pajak_nama: i.pajak_nama,
          pajak_persen: i.pajak_persen,
          hasil_pajak: parseInt(i.hasil_pajak),
          jumlah: parseInt(i.jumlah),
        });
      });

    const create_detail_kirim_uang = await prisma.detailKirimUang.createMany({
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Create Kirim Uang Success!", data: create_detail_kirim_uang });
  } catch (error) {
    res.status(400).json({ data: "Failed to create kirim uang!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
