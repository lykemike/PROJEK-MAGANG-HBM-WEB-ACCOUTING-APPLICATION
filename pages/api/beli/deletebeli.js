import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_jurnal_pembelian = prisma.jurnalPembelian.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.header_pembelian_id),
      },
    });

    const delete_detail_pembelian = prisma.detailPembelian.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.header_pembelian_id),
      },
    });

    const delete_header_pembelian = prisma.headerPembelian.deleteMany({
      where: {
        id: parseInt(req.body.header_pembelian_id),
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal_pembelian, delete_detail_pembelian, delete_header_pembelian]);
    res.status(201).json({ message: "Delete penjualan success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete penjualan failed!", error });
    console.log(error);
  }
};