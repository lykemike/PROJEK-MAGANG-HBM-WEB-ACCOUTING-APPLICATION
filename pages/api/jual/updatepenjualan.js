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
      kontak_id: parseInt(req.body.kontak_id),
      nama_perusahaan: req.body.nama_perusahaan,
      email: req.body.email,
      alamat_penagihan: req.body.alamat_penagihan,
      syarat_pembayaran_id: parseInt(req.body.syarat_pembayaran_id),
      nomor_npwp: req.body.nomor_npwp,
      nomor_kontrak: req.body.nomor_kontrak,
      tgl_kontrak_mulai: req.body.tgl_kontrak_mulai,
      tgl_kontrak_expired: req.body.tgl_kontrak_expired,
      custom_invoice: req.body.custom_invoice,
      tipe_perusahaan: req.body.tipe_perusahaan,
      pesan: req.body.pesan,
      file_attachment: req.file.filename,
      subtotal: parseInt(req.body.subtotal),
      pajak_id: parseInt(req.body.pajak_id),
      pajak_nama: req.body.pajak_nama,
      pajak_persen: parseInt(req.body.pajak_persen),
      pajak_hasil: parseInt(req.body.pajak_hasil),
      total: parseInt(req.body.total),
      sisa_tagihan: parseInt(req.body.sisa_tagihan),
      status: "Active",
    };

    const update_header_penjualan = await prisma.headerPenjualan.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: frontend_data,
    });

    const delete_old_detail = await prisma.detailPenjualan.deleteMany({
      where: {
        header_penjualan_id: parseInt(req.body.id),
      },
    });

    const current_id = parseInt(req.body.id);

    let detail = [];
    JSON.parse(req.body.produks).map((i) => {
      detail.push({
        header_penjualan_id: current_id,
        produk_id: parseInt(i.produk_id),
        produk_name: i.produk_name,
        produk_deskripsi: i.produk_deskripsi,
        produk_harga: parseInt(i.produk_harga),
      });
    });

    const create_detail_penjualan = await prisma.detailPenjualan.createMany({
      data: detail,
    });

    res.status(201).json([{ message: "Update Invoice Penjualan Success!", data: frontend_data, id: current_id }]);
  } catch (error) {
    res.status(400).json([{ data: "Update Invoice Penjualan Failed!", error }]);
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
