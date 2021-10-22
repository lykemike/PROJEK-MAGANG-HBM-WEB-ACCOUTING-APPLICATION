import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_kategori = await prisma.kategoriProduk.delete({
      where: {
        id: parseInt(req.body.id),
      },
    });

    res.status(201).json({ message: "Delete kategori success!", data: delete_kategori });
  } catch (error) {
    res.status(400).json({ data: "Delete kategori success!", error });
    console.log(error);
  }
};
