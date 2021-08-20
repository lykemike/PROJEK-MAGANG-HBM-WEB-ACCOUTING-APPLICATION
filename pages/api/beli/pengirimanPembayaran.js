import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      header_pembelian_id: parseInt(req.body.id),
      akun_id: parseInt(req.body.bayar_dari),
      cara_pembayaran: req.body.carapembayaran,
      tgl_pembayaran: req.body.tgl_pembayaran,
      tgl_jauth_tempo: req.body.tgl_jatuh_tempo,
      jumlah: parseInt(req.body.jumlah),
    };

    const create_penerimaan_pembayaran = await prisma.pengirimanBayaran.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_pembelian = await prisma.headerPembelian.findUnique({
      where: {
        id: frontend_data.header_pembelian_id,
      },
      select: {
        sisa_tagihan: true,
      },
    });

    const sisa = parseInt(find_header_pembelian.sisa_tagihan) - parseInt(req.body.jumlah);

    const update_sisa_tagihan = await prisma.headerPembelian.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        sisa_tagihan: sisa,
      },
    });

    const find_akun_bayar = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.bayar_dari),
      },
    });

    const find_default_hutang_blm_ditagih = await prisma.settingDefault.findFirst({
      where: {
        id: 10
      },
      include: {
        akun: true
      }
    })

    const jurnal_pengiriman_pembayaran = await prisma.jurnalPengirimanBayaran.createMany({
      data: [
        {
          header_pembelian_id: parseInt(req.body.id),
          nama_penerimaan_akun: find_default_hutang_blm_ditagih.akun.nama_akun,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Debit",
        },
        {
          header_pembelian_id: parseInt(req.body.id),
          nama_penerimaan_akun: find_akun_bayar.nama_akun,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json([
      { message: "Create Penerimaan Pembayaran Success!", data: create_penerimaan_pembayaran },
      { message: "Update Sisa Tagihan Success!", data: update_sisa_tagihan },
      { message: "Create Jurnal Pengiriman Pembayaran!", data: jurnal_pengiriman_pembayaran },
    ]);
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};
