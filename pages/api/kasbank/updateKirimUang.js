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
      kontak_id: parseInt(req.body.kontak_id),
      tgl_transaksi: req.body.tgl_transaksi,
      memo: req.body.memo,
      file_attachment: req.file == undefined ? "-" : req.file.filename,
      total: parseInt(req.body.total),
      status: "Belum terekonsiliasi",
    };

    const find_latest = req.body.id;

    const find_old_saldo = await prisma.headerKirimUang.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const find_old_detail_saldo = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
    });

    const revert_saldo_saat_ini = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
      data: {
        sisa_saldo: find_old_detail_saldo.sisa_saldo + find_old_saldo.total,
      },
    });

    const find_new_detail_saldo = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
    });

    const update_saldo_saat_ini = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_bayar_id),
      },
      data: {
        sisa_saldo: find_new_detail_saldo.sisa_saldo - parseInt(req.body.total),
      },
    });

    const update_kirim_uang = await prisma.headerKirimUang.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: frontend_data,
    });

    const delete_detail = await prisma.detailKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: parseInt(req.body.id),
      },
    });

    let detail = [];
    req.body.detail_kirim_uang &&
      JSON.parse(req.body.detail_kirim_uang).map((i) => {
        detail.push({
          header_kirim_uang_id: parseInt(req.body.id),
          akun_id: parseInt(i.akun_id),
          nama_akun: i.nama_akun,
          deskripsi: i.deskripsi,
          jumlah: parseInt(i.jumlah),
        });
      });

    const create_detail_kirim_uang = await prisma.detailKirimUang.createMany({
      data: detail,
    });

    const delete_jurnal = await prisma.jurnalKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: parseInt(req.body.id),
      },
    });

    let jurnal_debit = [];
    detail.map((i) => {
      jurnal_debit.push({
        header_kirim_uang_id: parseInt(req.body.id),
        akun_id: parseInt(i.akun_id),
        nominal: parseInt(i.jumlah),
        tipe_saldo: "Debit",
      });
    });

    const create_jurnal_debit = await prisma.jurnalKirimUang.createMany({
      data: jurnal_debit,
    });

    const create_jurnal_kredit = await prisma.jurnalKirimUang.create({
      data: {
        header_kirim_uang_id: parseInt(req.body.id),
        akun_id: parseInt(req.body.akun_bayar_id),
        nominal: parseInt(req.body.total),
        tipe_saldo: "Kredit",
      },
    });

    res.status(201).json({
      message: "Update Kirim Uang Success!",
      id: find_latest,
    });
  } catch (error) {
    res.status(400).json({ data: "Update kirim uang failed!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
