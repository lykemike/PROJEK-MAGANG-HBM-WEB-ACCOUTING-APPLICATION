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
    const akunsetor = await prisma.detailSaldoAwal.findMany({
      where: {
        akun_id: parseInt(req.body.akun_setor_id),
      },
    });

    const updatesaldo_akunsetor = akunsetor[0].sisa_saldo + parseInt(req.body.total);

    const update_saldo_akunsetor = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(akunsetor[0].akun_id),
      },
      data: {
        sisa_saldo: parseInt(updatesaldo_akunsetor),
      },
    });
    const frontend_data = {
      akun_setor_id: parseInt(req.body.akun_setor_id),
      kontak_id: parseInt(req.body.kontak_id),
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
      memo: req.body.memo,
      file_attachment: "req.file.filename",
      subtotal: parseInt(req.body.subtotal),
      pajak: parseInt(req.body.hasil_pajak),
      total: parseInt(req.body.total),
      sisa_saldo_akunsetor: parseInt(updatesaldo_akunsetor),
      status: "Belum terekonsiliasi",
    };

    const bool = {
      boolean: req.body.boolean,
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
          pajak_id: parseInt(i.pajak_id),
          pajak_nama: i.pajak_nama,
          pajak_persen: i.pajak_persen,
          pajak_jual_id: parseInt(i.pajak_jual_id),
          hasil_pajak: parseInt(i.hasil_pajak),
          jumlah: parseInt(i.jumlah),
          jumlah2: parseInt(i.jumlah2),
        });
      });

    const create_detail_terima_uang = await prisma.detailTerimaUang.createMany({
      data: detail,
      skipDuplicates: true,
    });

    const akun_setor = {
      header_terima_uang_id: find_latest.id,
      akun_id: parseInt(req.body.akun_setor_id),
      nominal: parseInt(req.body.total),
      tipe_saldo: "Debit",
    };

    let akun_terima = [];
    detail.map((i) => {
      if (bool.boolean == "true") {
        akun_terima.push({
          header_terima_uang_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.jumlah2),
          tipe_saldo: "Kredit",
        });
      } else {
        akun_terima.push({
          header_terima_uang_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.jumlah),
          tipe_saldo: "Kredit",
        });
      }
    });

    let list_pajak = [];
    detail.map((i) => {
      list_pajak.push({
        header_terima_uang_id: find_latest.id,
        akun_id: parseInt(i.pajak_jual_id),
        nominal: parseInt(i.hasil_pajak),
        tipe_saldo: "Kredit",
      });
    });

    const create_akun_setor = await prisma.jurnalTerimaUang.createMany({
      data: akun_setor,
    });

    const create_akun_terima = await prisma.jurnalTerimaUang.createMany({
      data: akun_terima,
    });

    const create_list_pajak = await prisma.jurnalTerimaUang.createMany({
      data: list_pajak,
    });

    res
      .status(201)
      .json({ message: "Create Header, Detail, Jurnal Terima Uang Sucess!", akun_terima, bool, detail, id: find_latest });
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
