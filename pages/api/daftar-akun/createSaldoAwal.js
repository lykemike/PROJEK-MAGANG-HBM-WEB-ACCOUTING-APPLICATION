import { PrismaClient } from ".prisma/client";
import { find } from "lodash";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      tgl_konversi: req.body.tgl_konversi,
    };

    const create_header_saldo = await prisma.headerSaldoAwal.createMany({
      data: [frontend_data],
    });

    const find_latest = await prisma.headerSaldoAwal.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    let detail = [];
    req.body.saldo_awal.map((i) => {
      detail.push({
        header_saldo_awal_id: find_latest.id,
        akun_id: parseInt(i.id),
        debit: parseInt(i.debit),
        kredit: parseInt(i.kredit),
      });
    });

    const create_detail_saldo = await prisma.detailSaldoAwal.createMany({
      data: detail,
    });

    res.status(201).json({ message: "Atur Saldo Awal Success!", data: detail });
  } catch (error) {
    res.status(400).json({ message: "Atur Saldo Awal Failed!", error });
    console.log(error);
  }
};
