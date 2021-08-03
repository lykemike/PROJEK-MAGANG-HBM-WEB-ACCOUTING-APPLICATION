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
      akun_setor_id: parseInt(req.body.akun_setor),
      akun_membayar_id: parseInt(req.body.akun_membayar),
      no_transaksi: parseInt(req.body.no_transaksi),
      tag: req.body.tag,
      memo: req.body.memo,
      file_attachment: req.body.filename,
      subtotal: parseInt(req.body.subtotal),
      pajak: parseInt(req.body.pajak),
      total: parseInt(req.body.total),
    };

    const create_terima_uang = await prisma.headerTerimaUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_terima_uang = await prisma.headerTerimaUang.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        id: frontend_data.id,
      },
    });

    const find_no_transaksi = await prisma.headerTerimaUang.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        no_transaksi: frontend_data.id,
      },
    });

    const update_no_transaksi = await prisma.headerTerimaUang.update({
      where: {
        id: frontend_data.id,
        no_transaksi: parseInt(req.body.no_transaksi),
      },
      data: {
        no_transaksi: find_no_transaksi.id,
      },
    });

    let detail = [];
    req.body.akuns &&
      JSON.parse(req.body.akuns).map((i) => {
        detail.push({
          header_terima_uang_id: find_header_terima_uang.id,
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

    const create_detail_terima_uang = await prisma.detailTerimaUang.createMany({
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Update No Transaksi!", data: create_detail_terima_uang });
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
