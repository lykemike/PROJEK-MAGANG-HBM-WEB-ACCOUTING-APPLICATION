import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createSatuan = await prisma.satuanProduk.createMany({
      data: [
        {
          satuan: req.body.satuan,
        },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Create Satuan Produk Success!", data: createSatuan });
  } catch (error) {
    res.status(400).json({ roleType: "Create Satuan Produk Failed!", error });
    console.log(error);
  }
};
