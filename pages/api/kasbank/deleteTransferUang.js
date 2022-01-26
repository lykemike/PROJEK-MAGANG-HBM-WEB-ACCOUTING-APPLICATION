import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const old_transfer_uang = await prisma.transferUang.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const current_sisa_saldo_transfer = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: old_transfer_uang.akun_transfer_id,
      },
    });

    const revert_saldo_akun_transfer = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: old_transfer_uang.akun_transfer_id,
      },
      data: {
        sisa_saldo: current_sisa_saldo_transfer.sisa_saldo + old_transfer_uang.total,
      },
    });

    const current_sisa_saldo_setor = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: old_transfer_uang.akun_setor_id,
      },
    });

    const revert_saldo_akun_setor = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: old_transfer_uang.akun_setor_id,
      },
      data: {
        sisa_saldo: current_sisa_saldo_setor.sisa_saldo - old_transfer_uang.total,
      },
    });

    const delete_jurnal_from_laporan_transaksi = prisma.laporanTransaksi.deleteMany({
      where: {
        delete_ref_name: "Transfer Uang",
        delete_ref_no: parseInt(req.body.id),
      },
    });

    const delete_jurnal = prisma.jurnalTransferUang.deleteMany({
      where: {
        transfer_uang_id: parseInt(req.body.id),
      },
    });

    const delete_header = prisma.transferUang.deleteMany({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal_from_laporan_transaksi, delete_jurnal, delete_header]);
    res.status(201).json({ message: "Delete transfer uang success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete transfer uang failed!", error });
    console.log(error);
  }
};
