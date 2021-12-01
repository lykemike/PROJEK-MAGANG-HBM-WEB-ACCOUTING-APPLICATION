import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_jurnal_penerimaan_pembayaran = prisma.jurnalPenerimaanPembayaran.deleteMany({
      where: {
        header_penjualan_id: parseInt(req.body.header_penjualan_id),
      },
    });

    const delete_penerimaan_pembayaran = prisma.penerimaanPembayaran.deleteMany({
      where: {
        header_penjualan_id: parseInt(req.body.header_penjualan_id),
      },
    });

    const delete_detail_penjualan = prisma.detailPenjualan.deleteMany({
      where: {
        header_penjualan_id: parseInt(req.body.header_penjualan_id),
      },
    });

    const delete_header_penjualan = prisma.headerPenjualan.deleteMany({
      where: {
        id: parseInt(req.body.header_penjualan_id),
      },
    });

    const transaction = await prisma.$transaction([
      delete_jurnal_penerimaan_pembayaran,
      delete_penerimaan_pembayaran,
      delete_detail_penjualan,
      delete_header_penjualan,
    ]);
    res.status(201).json({ message: "Delete penjualan success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete penjualan failed!", error });
    console.log(error);
  }
};
