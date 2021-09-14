import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createpelepasanAset = await prisma.pelepasanAset.createMany({
      data: [
        {
          tgl_transaksi: req.body.tgl_transaksi,
          harga_jual: parseInt(req.body.harga_jual),
          header_aset_id: parseInt(req.body.id),
          deposit_id: parseInt(req.body.deposit_id),
          memo: req.body.memo,
          tag: req.body.tag,
        },
      ],
      skipDuplicates: true,
    });

    const find_latest = await prisma.pelepasanAset.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const updateaset = await prisma.aset.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        terjual: true,
      },
    });

    const find_akun_deposit_ke = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.deposit_id),
      },
    });

    const get_setting_aset_tetap = await prisma.settingDefault.findMany({
      where: {
        nama_setting: "aset_tetap",
      },
      include: {
        akun: true,
      },
    });

    const jurnal_aset = await prisma.jurnalPelepasanAset.createMany({
      data: [
        {
          header_pelepasan_aset_id: find_latest.id,
          header_aset_id: parseInt(req.body.id),
          akun_id: parseInt(find_akun_deposit_ke.id),
          nominal: parseInt(req.body.harga_jual),
          tipe_saldo: "Debit",
        },
        {
          header_pelepasan_aset_id: find_latest.id,
          header_aset_id: parseInt(req.body.id),
          akun_id: parseInt(get_setting_aset_tetap[0].akun_id),
          nominal: parseInt(req.body.harga_jual),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json({ message: "CREATE PELEPASAN ASET SUCCESS!", jurnal_aset });
  } catch (error) {
    res.status(400).json({ data: "CREATE PELEPASAN ASET FAILED!", error });
    console.log(error);
  }
};
