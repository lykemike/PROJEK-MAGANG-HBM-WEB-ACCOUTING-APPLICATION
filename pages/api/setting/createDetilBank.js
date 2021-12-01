import { PrismaClient } from ".prisma/client";
import { eq } from "lodash";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const create_bank_detail = await prisma.detailBank.createMany({
      data: [
        {
          akun_id: parseInt(req.body.akun_id),
          nama_bank: req.body.nama_bank,
          cabang_bank: req.body.cabang_bank,
          nomor_rekening: req.body.nomor_rekening,
          atas_nama: req.body.atas_nama,
        },
      ],
      skipDuplicates: true,
    });

    res.status(200).json({ message: "Create bank detail success!", data: create_bank_detail });
  } catch (error) {
    res.status(400).json({ data: "Create bank detail failed!", error });
    console.log(error);
  }
};
