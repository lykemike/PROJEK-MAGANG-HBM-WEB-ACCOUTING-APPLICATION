import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const akunsetor = await prisma.detailSaldoAwal.findMany({
      where: {
        akun_id: parseInt(req.body.akun_setor),
      },
    });

    const akuntransfer = await prisma.detailSaldoAwal.findMany({
      where: {
        akun_id: parseInt(req.body.akun_transfer),
      },
    });

    const updatesaldo_akuntransfer = akuntransfer[0].sisa_saldo - parseInt(req.body.total);

    const update_saldo_akuntransfer = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(akuntransfer[0].akun_id),
      },
      data: {
        sisa_saldo: parseInt(updatesaldo_akuntransfer),
      },
    });

    const updatesaldo_akunsetor = akunsetor[0].sisa_saldo + parseInt(req.body.total);

    const update_saldo_akunsetor = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(akunsetor[0].akun_id),
      },
      data: {
        sisa_saldo: parseInt(updatesaldo_akunsetor),
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
      sisa_saldo_akunsetor: parseInt(updatesaldo_akunsetor),
      sisa_saldo_akuntransfer: parseInt(updatesaldo_akuntransfer),
    };

    // const reverse_frontend_data = {
    //   akun_transfer_id: parseInt(req.body.akun_setor),
    //   akun_setor_id: parseInt(req.body.akun_transfer),
    //   total: parseInt(req.body.total),
    //   memo: req.body.memo,
    //   no_transaksi: parseInt(req.body.no_transaksi),
    //   tgl_transaksi: req.body.tgl_transaksi,
    //   tag: req.body.tag,
    //   status: "Belum terekonsiliasi",
    //   sisa_saldo_akunsetor: parseInt(updatesaldo_akuntransfer),
    //   sisa_saldo_akuntransfer: parseInt(updatesaldo_akunsetor),
    // };

    const create_transfer_uang = await prisma.transferUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    // const create_reverse_transfer_uang = await prisma.transferUang.createMany({
    //   data: [reverse_frontend_data],
    //   skipDuplicates: true,
    // });

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

    res.status(201).json({
      message: "Create Transfer dan Jurnal Uang Success!",
      data: update_saldo_akunsetor,
    });
  } catch (error) {
    res.status(400).json({ data: "Failed to create transfer uang!", error });
    console.log(error);
  }
};
