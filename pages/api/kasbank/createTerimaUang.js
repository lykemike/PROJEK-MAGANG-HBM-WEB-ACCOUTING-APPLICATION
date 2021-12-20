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
      akun_setor_id: parseInt(req.body.akun_setor_id),
      kontak_id: parseInt(req.body.kontak_id),
      tgl_transaksi: req.body.tgl_transaksi,
      memo: req.body.memo,
      file_attachment: "req.file.filename",
      total: parseInt(req.body.total),
      status: "Belum terekonsiliasi",
    };

    const create_terima_uang = await prisma.headerTerimaUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_latest = await prisma.headerTerimaUang.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    let detail = [];
    req.body.detail_terima_uang &&
      JSON.parse(req.body.detail_terima_uang).map((i) => {
        detail.push({
          header_terima_uang_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nama_akun: i.nama_akun,
          deskripsi: i.deskripsi,
          jumlah: parseInt(i.jumlah),
        });
      });

    const create_detail_terima_uang = await prisma.detailTerimaUang.createMany({
      data: detail,
    });

    const create_jurnal_debit = await prisma.jurnalTerimaUang.create({
      data: {
        header_terima_uang_id: find_latest.id,
        akun_id: parseInt(req.body.akun_setor_id),
        nominal: parseInt(req.body.total),
        tipe_saldo: "Debit",
      },
    });

    let jurnal_kredit = [];
    detail.map((i) => {
      jurnal_kredit.push({
        header_terima_uang_id: find_latest.id,
        akun_id: parseInt(i.akun_id),
        nominal: parseInt(i.jumlah),
        tipe_saldo: "Kredit",
      });
    });

    const create_jurnal_kredit = await prisma.jurnalTerimaUang.createMany({
      data: jurnal_kredit,
    });

    res.status(201).json({ message: "Create Header, Detail, Jurnal Terima Uang Sucess!", id: find_latest });
  } catch (error) {
    res.status(400).json({ data: "Failed Header, Detail, Jurnal Terima Uang!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
