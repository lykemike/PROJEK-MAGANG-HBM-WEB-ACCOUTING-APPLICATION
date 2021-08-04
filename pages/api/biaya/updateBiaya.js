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
      akun_kas_bank: parseInt(req.body.akun_kas_bank),
      nama_penerima: parseInt(req.body.nama_penerima),
      tgl_transaksi: req.body.tgl_transaksi,
      cara_pembayaran: req.body.cara_pembayaran,
      no_transaksi: parseInt(req.body.no_transaksi),

      alamat_penagihan: req.body.alamat_penagihan,
      tag: req.body.tag,

      memo: req.body.memo,
      lampiran: req.body.lampiran,

      subtotal: parseInt(req.body.subtotal),
      pajak: parseInt(req.body.pajak),
      total: parseInt(req.body.total),
      akun_pemotongan: parseInt(req.body.akun_pemotongan),
      pemotongan: parseInt(req.body.pemotongan),
      jumlah_pemotongan: parseInt(req.body.jumlah_pemotongan),
    };

    const update_header_biaya = await prisma.headerBiaya.updateMany({
      where: {
        id: parseInt(req.body.id),
      },
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_biaya = await prisma.headerBiaya.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    let detail = [];
    req.body.detail_biaya &&
      JSON.parse(req.body.detail_biaya).map((i) => {
        detail.push({
          header_biaya_id: find_header_biaya.id,
          akun_biaya_id: parseInt(i.akun_biaya_id),
          deskripsi: i.deskripsi,
          pajak_id: parseInt(i.pajak_id),
          jumlah: Math.floor(i.jumlah),
        });
      });

    const update_detail_biaya = await prisma.detailBiaya.update({
      where: {
        header_biaya_id: parseInt(req.body.id),
      },
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json([{ message: "Update biaya success!", data: update_detail_biaya }]);
  } catch (error) {
    res.status(400).json([{ data: "Failed to update biaya!", error }]);
    console.log(error);
  }
};
