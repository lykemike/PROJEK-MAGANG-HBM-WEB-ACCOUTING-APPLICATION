import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      akun_transfer_id: parseInt(req.body.akun_transfer),
      akun_setor_id: parseInt(req.body.akun_setor),
      jumlah: parseInt(req.body.jumlah),
      memo: req.body.memo,
      no_transaksi: parseInt(req.body.no_transaksi),
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

    const update_no_transaksi = await prisma.transferUang.update({
      where: {
        id: find_latest.id,
      },
      data: {
        no_transaksi: find_latest.id,
      },
    });

    const jurnal_transfer_uang = await prisma.jurnalTransferUang.createMany({
      data: [
        {
          transfer_uang_id: find_latest.id,
          akun_id: parseInt(req.body.akun_setor),
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Debit",
        },
        {
          transfer_uang_id: find_latest.id,
          akun_id: parseInt(req.body.akun_transfer),
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json({
      message: "Create Transfer dan Jurnal Uang Success!",
      data: create_transfer_uang,
      id: find_latest,
    });
  } catch (error) {
    res.status(400).json({ data: "Failed to create transfer uang!", error });
    console.log(error);
  }
};
