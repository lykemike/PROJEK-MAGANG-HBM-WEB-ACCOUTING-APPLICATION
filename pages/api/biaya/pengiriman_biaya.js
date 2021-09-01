import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      header_biaya_id: parseInt(req.body.id),
      akun_id: parseInt(req.body.bayar_dari),
      cara_pembayaran: req.body.cara_pembayaran,
      tgl_pembayaran: req.body.tgl_transaksi,
      tgl_jauth_tempo: req.body.tgl_jatuh_tempo,
      jumlah: parseInt(req.body.jumlah),
    };

    const create_penerimaan_pembayaran = await prisma.pengirimanBiaya.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_biaya = await prisma.headerBiaya.findUnique({
      where: {
        id: frontend_data.header_biaya_id,
      },
      select: {
        pemotongan_total: true,
      },
    });

    const sisa = parseInt(find_header_biaya.pemotongan_total) - parseInt(req.body.jumlah);

    const update_sisa_tagihan = await prisma.headerBiaya.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        pemotongan_total: sisa,
      },
    });

    const find_akun_bayar_dari = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.bayar_dari),
      },
    });

    const find_default_piutang = await prisma.settingDefault.findFirst({
      where: {
        id: 14,
      },
      include: {
        akun: true,
      },
    });

    const jurnal_penerimaan_pembayaran = await prisma.jurnalPengirimanBiaya.createMany({
      data: [
        {
          header_biaya_id: parseInt(req.body.id),
          akun_id: parseInt(find_akun_bayar_dari.id),
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Debit",
        },
        {
          header_biaya_id: parseInt(req.body.id),
          akun_id: parseInt(find_default_piutang.akun.id),
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json([
      { message: "Create Pengiriman Pembayaran Success!", data: create_penerimaan_pembayaran },
      { message: "Update Sisa Tagihan Success!", data: update_sisa_tagihan },
      { message: "Create Jurnal Pengiriman Pembayaran!", data: jurnal_penerimaan_pembayaran },
    ]);
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};
