import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createSatuanProduk = await prisma.satuanProduk.createMany({
      data: [
        { satuan: "pcs" },
        { satuan: "box" },
        { satuan: "lusin" },
        { satuan: "buah" },
        { satuan: "lembar" },
        { satuan: "biji" },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Testing Success!", createSatuanProduk });
  } catch (error) {
    res.status(400).json({ roleType: "TESTING FAILED", error });
    console.log(error);
  }
};
