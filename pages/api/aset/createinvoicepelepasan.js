import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createpelepasanAset = await prisma.aset.createMany({
      data: [
        {
          biaya_akuisisi_id: parseInt(req.body.biaya_akuisisi_id),
          akumulasi_penyusutan_id: parseInt(req.body.akumulasi_penyusutan_id),
          harga_pelepasan_aset_id: parseInt(req.body.harga_pelepasan_aset_id),
          untungrugi: req.body.untungrugi,
        },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "CREATE PELEPASAN ASET SUCCESS!", data: createpelepasanAset });
  } catch (error) {
    res.status(400).json({ data: "CREATE PELEPASAN ASET FAILED!", error });
    console.log(error);
  }
};
