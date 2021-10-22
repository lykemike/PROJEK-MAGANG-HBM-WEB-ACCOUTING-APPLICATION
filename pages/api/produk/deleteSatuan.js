import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_satuan = await prisma.satuanProduk.delete({
      where: {
        id: parseInt(req.body.id),
      },
    });

    res.status(201).json({ message: "Delete satuan success!", data: delete_satuan });
  } catch (error) {
    res.status(400).json({ data: "Delete satuan success!", error });
    console.log(error);
  }
};
