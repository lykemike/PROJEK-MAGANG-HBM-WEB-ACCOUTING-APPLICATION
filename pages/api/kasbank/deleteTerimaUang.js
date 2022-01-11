import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const find_header_terima_uang = await prisma.headerTerimaUang.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const find_detail_saldo = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: find_header_terima_uang.akun_setor_id,
      },
    });

    const update_detail_saldo = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: find_header_terima_uang.akun_setor_id,
      },
      data: {
        sisa_saldo: find_detail_saldo.sisa_saldo - find_header_terima_uang.total,
      },
    });

    const delete_jurnal = prisma.jurnalTerimaUang.deleteMany({
      where: {
        header_terima_uang_id: parseInt(req.body.id),
      },
    });

    const delete_detail = prisma.detailTerimaUang.deleteMany({
      where: {
        header_terima_uang_id: parseInt(req.body.id),
      },
    });

    const delete_header = prisma.headerTerimaUang.deleteMany({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal, delete_detail, delete_header]);
    res.status(201).json({ message: "Delete terima uang success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete terima uang failed!", error });
    console.log(error);
  }
};
