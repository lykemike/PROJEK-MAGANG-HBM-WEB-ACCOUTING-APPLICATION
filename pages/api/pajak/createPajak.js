import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const create_pajak = await prisma.pajak.createMany({
      data: [
        {
          nama: req.body.nama,
          presentasaAktif: parseInt(req.body.presentaseAktif),
          akunPenjual: parseInt(req.body.akunPajakPenjualan),
          akunPembeli: parseInt(req.body.akunPajakPembelian),
        },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Create pajak success!", data: create_pajak });
  } catch (error) {
    res.status(400).json({ data: "Create pajak failed!", error });
    console.log(error);
  }
};
