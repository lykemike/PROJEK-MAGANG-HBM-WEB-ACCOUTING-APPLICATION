import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const update_satuan = await prisma.satuanProduk.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        satuan: req.body.satuan,
      },
    });

    res.status(201).json({ message: "Update Satuan Produk Success!", data: update_satuan });
  } catch (error) {
    res.status(400).json({ roleType: "Update Satuan Produk Failed!", error });
    console.log(error);
  }
};
