import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createpelepasanAset = await prisma.aset.createMany({
      data: [
        {
          tgl_transaksi: req.body.tgl_transaksi,
          harga_jual: parseInt(req.body.harga_jual),
          deposit_id: parseInt(req.body.deposit_id),
          memo: req.body.memo,
          tag: req.body.tag,
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
