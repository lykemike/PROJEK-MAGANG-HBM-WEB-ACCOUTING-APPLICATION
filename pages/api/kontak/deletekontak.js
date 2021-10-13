import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_kontak_detail = prisma.kontakDetail.deleteMany({
      where: {
        kontak_id: parseInt(req.body.kontakid),
      },
    });

    const delete_kontak = prisma.kontak.delete({
      where: {
        id: parseInt(req.body.kontakid),
      },
    });

    const transaction = await prisma.$transaction([delete_kontak_detail, delete_kontak]);

    res.status(201).json({ message: "Delete kontak success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete kontak failed!" });
    console.log(error);
  }
};
