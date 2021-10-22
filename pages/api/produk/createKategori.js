import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const create_kategori_produk = await prisma.kategoriProduk.createMany({
      data: [
        {
          nama: req.body.nama,
          jumlah: parseInt(req.body.jumlah),
        },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Create kategori produk success!", data: create_kategori_produk });
  } catch (error) {
    res.status(400).json({ data: "Create kategori produk failed!", error });
    console.log(error);
  }
};
