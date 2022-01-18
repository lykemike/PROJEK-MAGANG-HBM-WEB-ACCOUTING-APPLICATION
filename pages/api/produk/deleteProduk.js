import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const get_produk = await prisma.produk.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        DetailPenjualan: true,
      },
    });

    if (get_produk.DetailPenjualan.length > 0) {
      return res.status(400).json({ message: "Failed to delete, current product has on going transaction" });
    } else {
      const get_produk = await prisma.produk.findFirst({
        where: {
          id: parseInt(req.body.id),
        },
        include: {
          DetailPenjualan: true,
        },
      });

      return res.status(400).json({ message: "Delete Success!" });
    }
  } catch (error) {
    res.status(400).json({ data: "Delete produk success!", error });
    console.log(error);
  }
};
