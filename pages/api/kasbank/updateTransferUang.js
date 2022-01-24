import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const header_transfer_uang = await prisma.transferUang.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const current_saldo_akun_transfer = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: header_transfer_uang.akun_transfer_id,
      },
    });

    const revert_saldo_akun_transfer = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: header_transfer_uang.akun_transfer_id,
      },
      data: {
        sisa_saldo: current_saldo_akun_transfer.sisa_saldo + header_transfer_uang.total,
      },
    });

    const current_saldo_akun_setor = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: header_transfer_uang.akun_setor_id,
      },
    });

    const revert_saldo_akun_setor = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: header_transfer_uang.akun_setor_id,
      },
      data: {
        sisa_saldo: current_saldo_akun_setor.sisa_saldo - header_transfer_uang.total,
      },
    });

    const frontend_data = {
      akun_transfer_id: parseInt(req.body.akun_transfer),
      akun_setor_id: parseInt(req.body.akun_setor),
      total: parseInt(req.body.total),
      memo: req.body.memo,
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
      status: "Belum terekonsiliasi",
    };

    const find_latest = parseInt(req.body.id);

    const update_transfer_uang = await prisma.transferUang.update({
      where: {
        id: find_latest,
      },
      data: frontend_data,
    });

    const delete_jurnal = await prisma.jurnalTransferUang.deleteMany({
      where: {
        transfer_uang_id: find_latest,
      },
    });

    const jurnal_transfer_uang = await prisma.jurnalTransferUang.createMany({
      data: [
        {
          transfer_uang_id: find_latest,
          akun_id: parseInt(req.body.akun_setor),
          nominal: parseInt(req.body.total),
          tipe_saldo: "Debit",
        },
        {
          transfer_uang_id: find_latest,
          akun_id: parseInt(req.body.akun_transfer),
          nominal: parseInt(req.body.total),
          tipe_saldo: "Kredit",
        },
      ],
    });

    const get_akun_transfer = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_transfer),
      },
    });

    const update_saldo_skrg_akun_transfer = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_transfer),
      },
      data: {
        sisa_saldo: get_akun_transfer.sisa_saldo - parseInt(req.body.total),
      },
    });

    const get_akun_setor = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_setor),
      },
    });

    const update_saldo_skrg_akun_setor = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_setor),
      },
      data: {
        sisa_saldo: get_akun_setor.sisa_saldo + parseInt(req.body.total),
      },
    });

    res.status(201).json({
      message: "Update transfer uang success!",
      id: find_latest,
    });
  } catch (error) {
    res.status(400).json({ data: "Failed to update transfer uang!", error });
    console.log(error);
  }
};
