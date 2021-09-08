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
      fileattachment: "req.file.filename",

      subtotal: parseInt(req.body.subtotal),
      total: parseInt(req.body.total),
      akun_pemotongan: parseInt(req.body.akun_pemotongan),
      pemotongan: parseInt(req.body.pemotongan),
      sisa_tagihan: parseInt(req.body.sisa_tagihan),
      total_pajak_per_baris: parseInt(req.body.total_pajak_per_baris),
      change_view: true,
      status: "Active",
    };

    const bool = {
      boolean: req.body.boolean,
    };

    const create_header_biaya = await prisma.headerBiaya.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_latest = await prisma.headerBiaya.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const update_no_transaksi = await prisma.headerBiaya.update({
      where: {
        id: find_latest.id,
      },
      data: {
        no_transaksi: find_latest.id,
      },
    });

    const get_setting_biaya = await prisma.settingDefault.findMany({
      where: {
        tipe: "biaya",
      },
      include: {
        akun: true,
      },
    });

    const setting_pemotongan = get_setting_biaya.filter((i) => i.nama_setting === "pemotongan");
    const setting_hutang_usaha = get_setting_biaya.filter((i) => i.nama_setting === "hutang_usaha");

    let detail = [];
    req.body.detail_biaya &&
      JSON.parse(req.body.detail_biaya).map((i) => {
        detail.push({
          header_biaya_id: find_latest.id,
          akun_biaya_id: parseInt(i.akun_biaya_id),
          nama_akun: i.nama_akun,
          deskripsi: i.deskripsi,
          pajak_id: parseInt(i.pajak_id),
          pajak_nama: i.pajak_nama,
          pajak_persen: parseInt(i.pajak_persen),
          hasil_pajak: parseInt(i.hasil_pajak),
          pajak_akun_beli_id: i.pajak_akun_beli_id,
          jumlah: parseInt(i.jumlah),
          jumlah2: parseInt(i.jumlah2),
        });
      });

    const create_detail_biaya = await prisma.detailBiaya.createMany({
      data: detail,
      skipDuplicates: true,
    });

    const find_nama_akun = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.akun_kas_bank),
      },
    });

    let list_pajak = [];
    detail.map((i) => {
      // let pajak = get_pajak_id(i.pajak_id);

      list_pajak.push({
        header_biaya_id: find_latest.id,
        akun_biaya_id: i.pajak_akun_beli_id,
        nominal: parseInt(i.hasil_pajak),
        tipe_saldo: "Debit",
      });
    });

    let list_akun = [];
    detail.map((i) => {
      // let pajak = get_pajak_id(i.pajak_id);
      if (bool.boolean == "true") {
        list_akun.push({
          header_biaya_id: find_latest.id,
          akun_biaya_id: parseInt(i.akun_biaya_id),
          nominal: parseInt(i.jumlah2),
          tipe_saldo: "Debit",
        });
      } else {
        list_akun.push({
          header_biaya_id: find_latest.id,
          akun_biaya_id: parseInt(i.akun_biaya_id),
          nominal: parseInt(i.jumlah),
          tipe_saldo: "Debit",
        });
      }
    });

    const akunbayardari = await prisma.akun.findMany({
      where: {
        id: parseInt(req.body.akun_kas_bank),
      },
    });

    const nama_akun_biaya = akunbayardari.nama_akun;

    let data_biaya = [];

    if (bool.boolean == "true") {
      data_biaya.push(
        {
          header_biaya_id: find_latest.id,
          akun_biaya_id: setting_pemotongan[0].akun.id,
          tipe_saldo: "Kredit",
          nominal: parseInt(req.body.pemotongan),
        },
        {
          header_biaya_id: find_latest.id,
          akun_biaya_id: setting_hutang_usaha[0].akun.id,
          tipe_saldo: "Kredit",
          nominal: parseInt(req.body.sisa_tagihan),
        }
      );
    } else {
      data_biaya.push(
        {
          header_biaya_id: find_latest.id,
          akun_biaya_id: setting_pemotongan[0].akun.id,
          tipe_saldo: "Kredit",
          nominal: parseInt(req.body.pemotongan),
        },
        {
          header_biaya_id: find_latest.id,
          akun_biaya_id: akunbayardari[0].id,
          tipe_saldo: "Kredit",
          nominal: parseInt(req.body.sisa_tagihan),
        }
      );
    }

    const create_jurnal_biaya = await prisma.jurnalBiaya.createMany({
      data: list_akun,
    });

    const create_jurnal_pajak = await prisma.jurnalBiaya.createMany({
      data: list_pajak,
    });

    const create_jurnal_kredit = await prisma.jurnalBiaya.createMany({
      data: data_biaya,
    });

    res.status(201).json([{ message: "Create biaya success!", data: create_jurnal_biaya, id: find_latest }]);
  } catch (error) {
    res.status(400).json([{ data: "Failed to create detail biaya!", error }]);
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
