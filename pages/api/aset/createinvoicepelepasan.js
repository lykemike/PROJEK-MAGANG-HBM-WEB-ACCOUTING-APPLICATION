import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createpelepasanAset = await prisma.aset.createMany({
      data: [
        {
          nama_akun: req.body.nama_akun,
          nominal: parseInt(req.body.nominal),
          tipe_saldo: req.body.tipe_saldo,
          untungrugi: parseInt(req.body.untungrugi),
          untungrugiakun: req.body.untungrugiakun,
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
