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
      no_transaksi: parseInt(req.body.no_transaksi),
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
      memo: req.body.memo,
      file_attachment: " req.file.filename",
      subtotal: parseInt(req.body.subtotal),
      pajak: parseInt(req.body.hasil_pajak),
      total: parseInt(req.body.total),
      status: "Belum terekonsiliasi",
    };

    const bool = {
      boolean: req.body.boolean,
    };

    const create_kirim_uang = await prisma.headerKirimUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_latest = await prisma.headerKirimUang.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    let detail = [];
    req.body.detail_kirim_uang &&
      JSON.parse(req.body.detail_kirim_uang).map((i) => {
        detail.push({
          header_kirim_uang_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nama_akun: i.nama_akun,
          deskripsi: i.deskripsi,
          pajak_id: parseInt(i.pajak_id),
          pajak_nama: i.pajak_nama,
          pajak_persen: i.pajak_persen,
          pajak_beli_id: parseInt(i.pajak_beli_id),
          hasil_pajak: parseInt(i.hasil_pajak),
          jumlah: parseInt(i.jumlah),
          jumlah2: parseInt(i.jumlah2),
        });
      });

    const create_detail_kirim_uang = await prisma.detailKirimUang.createMany({
      data: detail,
      skipDuplicates: true,
    });

    const akun_bayar = {
      header_kirim_uang_id: find_latest.id,
      akun_id: parseInt(req.body.akun_bayar_id),
      nominal: parseInt(req.body.total),
      tipe_saldo: "Kredit",
    };

    let akun_pembayaran = [];
    detail.map((i) => {
      if (bool.boolean == "true") {
        akun_pembayaran.push({
          header_kirim_uang_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.jumlah2),
          tipe_saldo: "Debit",
        });
      } else {
        akun_pembayaran.push({
          header_kirim_uang_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.jumlah),
          tipe_saldo: "Debit",
        });
      }
    });

    let list_pajak = [];
    detail.map((i) => {
      list_pajak.push({
        header_kirim_uang_id: find_latest.id,
        akun_id: parseInt(i.pajak_beli_id),
        nominal: parseInt(i.hasil_pajak),
        tipe_saldo: "Debit",
      });
    });

    const create_akun_pembayaran = await prisma.jurnalKirimUang.createMany({
      data: akun_pembayaran,
    });

    const create_list_pajak = await prisma.jurnalKirimUang.createMany({
      data: list_pajak,
    });

    const create_akun_bayar = await prisma.jurnalKirimUang.createMany({
      data: akun_bayar,
    });

    res.status(201).json({ message: "Create Kirim Uang Success!", id: find_latest, create_akun_bayar, create_list_pajak, create_akun_pembayaran });
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
