import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_jurnal = prisma.jurnalKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: parseInt(req.body.id),
      },
    });

    const delete_detail = prisma.detailKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: parseInt(req.body.id),
      },
    });

    const delete_header = prisma.headerKirimUang.deleteMany({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal, delete_detail, delete_header]);
    res.status(201).json({ message: "Delete kirim uang success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete kirim uang failed!", error });
    console.log(error);
  }
};
