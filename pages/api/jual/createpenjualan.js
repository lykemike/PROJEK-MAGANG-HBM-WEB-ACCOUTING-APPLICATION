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
    // get date from input, then split into DD:MM:YYYY
    const confirm_date = req.body.tgl_kontrak_mulai;
    const day = confirm_date.split("-")[2];
    const month = confirm_date.split("-")[1];
    const year = confirm_date.split("-")[0];

    // get current timestamp 25 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // get data from front end
    const frontend_data = {
      kontak_id: parseInt(req.body.kontak_id),
      nama_perusahaan: req.body.nama_perusahaan,
      email: req.body.email,
      alamat_penagihan: req.body.alamat_penagihan,
      syarat_pembayaran_id: parseInt(req.body.syarat_pembayaran_id),
      nomor_npwp: req.body.nomor_npwp,
      nomor_kontrak: req.body.nomor_kontrak,
      tgl_kontrak_mulai: req.body.tgl_kontrak_mulai,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      tgl_kontrak_expired: req.body.tgl_kontrak_expired,
      custom_invoice: "-",
      tipe_perusahaan: req.body.tipe_perusahaan,
      file_attachment: req.file == undefined ? "-" : req.file.filename,
      subtotal: parseInt(req.body.subtotal),
      pajak_id: parseInt(req.body.pajak_id),
      pajak_nama: req.body.pajak_nama,
      pajak_persen: parseInt(req.body.pajak_persen),
      pajak_hasil: parseInt(req.body.pajak_hasil),
      total: parseInt(req.body.total),
      sisa_tagihan: parseInt(req.body.sisa_tagihan),
    };

    // create header penjualan
    const create_header_penjualan = await prisma.headerPenjualan.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    // get latest id by sorting in "DESC" than getting the first data
    const find_latest = await prisma.headerPenjualan.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    // custom HBM invoice
    let nomor_invoice_custom = "";
    if (find_latest.id.toString().length == 3) {
      nomor_invoice_custom = find_latest.id.toString();
    } else if (find_latest.id.toString().length == 2) {
      nomor_invoice_custom = "0" + find_latest.id.toString();
    } else if (find_latest.id.toString().length == 1) {
      nomor_invoice_custom = "00" + find_latest.id.toString();
    }

    const join_invoice = nomor_invoice_custom + req.body.custom_invoice;

    // update custom HBM invoice to header penjualan table
    const update_nomor_invoice_custom = await prisma.headerPenjualan.update({
      where: {
        id: find_latest.id,
      },
      data: {
        custom_invoice: join_invoice.toString(),
      },
    });

    // get detail (field array data) from front end
    let detail = [];
    JSON.parse(req.body.produks).map((i) => {
      detail.push({
        header_penjualan_id: find_latest.id,
        produk_id: parseInt(i.produk_id),
        produk_name: i.produk_name,
        produk_deskripsi: i.produk_deskripsi,
        produk_harga: parseInt(i.produk_harga),
      });
    });

    // create detail penjualan
    const create_detail_penjualan = await prisma.detailPenjualan.createMany({
      data: detail,
    });

    res.status(201).json({ message: "Create Invoice Penjualan Success!", id: find_latest });
  } catch (error) {
    res.status(400).json([{ data: "Failed to Create Invoice Penjualan!", error }]);
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
