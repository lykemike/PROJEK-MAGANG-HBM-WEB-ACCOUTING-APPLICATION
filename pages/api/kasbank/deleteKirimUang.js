import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const find_header_kirim_uang = await prisma.headerKirimUang.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const find_detail_saldo = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: find_header_kirim_uang.akun_bayar_id,
      },
    });

    const update_detail_saldo = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: find_header_kirim_uang.akun_bayar_id,
      },
      data: {
        sisa_saldo: find_detail_saldo.sisa_saldo + find_header_kirim_uang.total,
      },
    });

    const delete_jurnal_from_laporan_transaksi = prisma.laporanTransaksi.deleteMany({
      where: {
        delete_ref_name: "Kirim Uang",
        delete_ref_no: parseInt(req.body.id),
      },
    });

    const delete_jurnal = prisma.jurnalKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: parseInt(req.body.id),
      },
    });

    const delete_detail = prisma.detailKirimUang.deleteMany({
      where: {
        header_kirim_uang_id: parseInt(req.body.id),
      },
    });

    const delete_header = prisma.headerKirimUang.deleteMany({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal_from_laporan_transaksi, delete_jurnal, delete_detail, delete_header]);
    res.status(201).json({ message: "Delete kirim uang success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete kirim uang failed!", error });
    console.log(error);
  }
};
