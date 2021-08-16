import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createpelepasanAset = await prisma.pelepasanAset.createMany({
      data: [
        {
          tgl_transaksi: req.body.tgl_transaksi,
          harga_jual: parseInt(req.body.harga_jual),
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

    const find_akun_deposit_ke = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.deposit_id),
      },
    });

    const get_setting_aset_tetap = await prisma.settingDefault.findMany({
      where: {
        tipe: "Aset",
      },
      include: {
        akun: true,
      },
    });
    const setting_aset_tetap = get_setting_aset_tetap.filter((i) => i.nama_setting === "Aset");

    const jurnal_aset = await prisma.jurnalAset.createMany({
      data: [
        {
          header_aset_id: find_latest.id,
          nama_penerimaan_akun: find_akun_deposit_ke.nama_akun,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Debit",
        },
        {
          header_aset_id: find_latest.id,
          nama_penerimaan_akun: setting_aset_tetap[0].akun.nama_akun,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json({ message: "CREATE PELEPASAN ASET SUCCESS!", data: jurnal_aset });
  } catch (error) {
    res.status(400).json({ data: "CREATE PELEPASAN ASET FAILED!", error });
    console.log(error);
  }
};
