import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      header_penjualan_id: parseInt(req.body.id),
      akun_id: parseInt(req.body.setor_ke),
      cara_pembayaran: req.body.carapembayaran,
      tgl_pembayaran: req.body.tgl_pembayaran,
      tgl_jauth_tempo: req.body.tgl_jatuh_tempo,
      jumlah: parseInt(req.body.jumlah),
    };

    const create_penerimaan_pembayaran = await prisma.penerimaanPembayaran.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_penjualan = await prisma.headerPenjualan.findUnique({
      where: {
        id: frontend_data.header_penjualan_id,
      },
      select: {
        sisa_tagihan: true,
      },
    });

    const sisa = parseInt(find_header_penjualan.sisa_tagihan) - parseInt(req.body.jumlah);

    const update_sisa_tagihan = await prisma.headerPenjualan.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        sisa_tagihan: sisa,
      },
    });

    const find_akun_setor = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.setor_ke),
      },
    });

    const find_default_piutang = await prisma.settingDefault.findFirst({
      where: {
        id: 4,
      },
      include: {
        akun: true,
      },
    });

    const jurnal_penerimaan_pembayaran = await prisma.jurnalPenerimaanPembayaran.createMany({
      data: [
        {
          header_penjualan_id: parseInt(req.body.id),
          nama_penerimaan_akun: find_akun_setor.nama_akun,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Debit",
        },
        {
          header_penjualan_id: parseInt(req.body.id),
          nama_penerimaan_akun: find_default_piutang.akun.nama_akun,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json([
      { message: "Create Penerimaan Pembayaran Success!", data: create_penerimaan_pembayaran },
      { message: "Update Sisa Tagihan Success!", data: update_sisa_tagihan },
      { message: "Create Jurnal Penerimaan Pembayaran!", data: jurnal_penerimaan_pembayaran },
    ]);
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};
