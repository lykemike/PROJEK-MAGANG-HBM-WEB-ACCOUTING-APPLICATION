import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_produk = await prisma.produk.delete({
      where: {
        id: parseInt(req.body.id),
      },
    });

    res.status(201).json({ message: "Delete produk success!", data: delete_produk });
  } catch (error) {
    res.status(400).json({ data: "Delete produk success!", error });
    console.log(error);
  }
};
