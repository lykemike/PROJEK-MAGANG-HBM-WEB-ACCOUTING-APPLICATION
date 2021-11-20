import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const create_pajak = await prisma.pajak.createMany({
      data: [
        {
          nama: req.body.nama,
          presentase_aktif: parseInt(req.body.persen),
          akun_jual: parseInt(req.body.akun_jual),
          akun_beli: parseInt(req.body.akun_beli),
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
