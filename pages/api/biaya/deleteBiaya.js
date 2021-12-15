import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_jurnal_biaya = prisma.jurnalBiaya.deleteMany({
      where: {
        header_biaya_id: parseInt(req.body.header_biaya_id),
      },
    });

    const delete_detail_biaya = prisma.detailBiaya.deleteMany({
      where: {
        header_biaya_id: parseInt(req.body.header_biaya_id),
      },
    });

    const delete_header_biaya = prisma.headerBiaya.deleteMany({
      where: {
        id: parseInt(req.body.header_biaya_id),
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal_biaya, delete_detail_biaya, delete_header_biaya]);
    res.status(201).json({ message: "Delete biaya success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete biaya failed!", error });
    console.log(error);
  }
};
