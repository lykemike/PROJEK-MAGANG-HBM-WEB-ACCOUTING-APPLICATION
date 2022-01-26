import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // set header biaya id
    const header_biaya_id = parseInt(req.body.header_biaya_id);

    // find header biaya id
    const find_header_biaya_total = await prisma.headerBiaya.findFirst({
      where: {
        id: header_biaya_id,
      },
    });

    // find saldo skrg
    const find_saldo_skrg = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: find_header_biaya_total.akun_id,
      },
    });

    // revert saldo
    const revert_saldo = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: find_header_biaya_total.akun_id,
      },
      data: {
        sisa_saldo: find_saldo_skrg.sisa_saldo + find_header_biaya_total.total,
      },
    });

    // delete jurnal from laporan transaksi
    const delete_jurnal_1 = prisma.laporanTransaksi.deleteMany({
      where: {
        delete_ref_name: "Expense",
        delete_ref_no: header_biaya_id,
      },
    });

    // delete jurnal from jurnal biaya
    const delete_jurnal_2 = prisma.jurnalBiaya.deleteMany({
      where: {
        header_biaya_id: header_biaya_id,
      },
    });

    // delete detail biaya from detail biaya
    const delete_detail = prisma.detailBiaya.deleteMany({
      where: {
        header_biaya_id: header_biaya_id,
      },
    });

    // delete header from header biaya
    const delete_header = prisma.headerBiaya.deleteMany({
      where: {
        id: header_biaya_id,
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal_1, delete_jurnal_2, delete_detail, delete_header]);
    res.status(201).json({ message: "Delete biaya success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete biaya failed!", error });
    console.log(error);
  }
};
