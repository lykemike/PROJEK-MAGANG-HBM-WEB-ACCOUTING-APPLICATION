import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      akun_transfer_id: parseInt(req.body.akun_transfer),
      akun_setor_id: parseInt(req.body.akun_setor),
      total: parseInt(req.body.total),
      memo: req.body.memo,
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
      status: "Belum terekonsiliasi",
    };

    const create_transfer_uang = await prisma.transferUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_latest = await prisma.transferUang.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const jurnal_transfer_uang = await prisma.jurnalTransferUang.createMany({
      data: [
        {
          transfer_uang_id: find_latest.id,
          akun_id: parseInt(req.body.akun_setor),
          nominal: parseInt(req.body.total),
          tipe_saldo: "Debit",
        },
        {
          transfer_uang_id: find_latest.id,
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

    const update_saldo_skrg_transfer = await prisma.detailSaldoAwal.update({
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

    const update_saldo_skrg_setor = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_setor),
      },
      data: {
        sisa_saldo: get_akun_setor.sisa_saldo + parseInt(req.body.total),
      },
    });

    res.status(201).json({
      message: "Create transfer uang success!",
      id: find_latest,
    });
  } catch (error) {
    res.status(400).json({ data: "Failed to create transfer uang!", error });
    console.log(error);
  }
};
