import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_jurnal_from_laporan_transaksi = await prisma.laporanTransaksi.deleteMany({
      where: {
        no_ref: parseInt(req.body.jurnal_id),
        delete_ref_name: "Journal Entry",
      },
    });

    const delete_detail_jurnal = prisma.detailJurnal.deleteMany({
      where: {
        header_jurnal_id: parseInt(req.body.jurnal_id),
      },
    });

    const delete_header_jurnal = prisma.headerJurnal.delete({
      where: {
        id: parseInt(req.body.jurnal_id),
      },
    });

    const transaction = await prisma.$transaction([delete_detail_jurnal, delete_header_jurnal]);
    res.status(201).json({ message: "Delete jurnal success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete jurnal failed!", error });
    console.log(error);
  }
};
