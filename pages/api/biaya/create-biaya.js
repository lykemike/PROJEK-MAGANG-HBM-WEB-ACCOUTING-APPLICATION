import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
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

    const create_header_biaya = await prisma.headerBiaya.createMany({
      data: [frontend_data],
    });

    const find_header_biaya = await prisma.headerBiaya.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        id: frontend_data.id,
      },
    });

    let detail = [];
    req.body.detail_biaya.map((i) => {
      detail.push({
        header_biaya_id: find_header_biaya.id,
        akun_biaya_id: parseInt(i.akun_biaya_id),
        deskripsi: i.deskripsi,
        pajak_id: parseInt(i.pajak_id),
        jumlah: Math.floor(i.jumlah),
      });
    });

    const create_detail_biaya = await prisma.detailBiaya.createMany({
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json([
      // { message: "Create header biaya success!", data: create_header_biaya },
      { message: "Find header biaya success!", data: find_header_biaya },
      { message: "Create detail biaya success!", data: create_detail_biaya },
    ]);
  } catch (error) {
    res.status(400).json([
      // { data: "Failed to create header biaya!", error },
      { data: "Failed to find header biaya!", error },
      { data: "Failed to create detail biaya!", error },
    ]);
    console.log(error);
  }
};
