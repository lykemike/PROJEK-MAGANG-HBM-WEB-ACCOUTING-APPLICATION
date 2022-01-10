import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      header_pembelian_id: parseInt(req.body.id),
      akun_id: parseInt(req.body.akun_id),
      nama_akun_bayar_dari: req.body.nama_akun_bayar_dari,
      cara_pembayaran_id: parseInt(req.body.cara_pembayaran_id),
      cara_pembayaran_nama: req.body.cara_pembayaran_nama,
      tgl_pembayaran: req.body.tgl_pembayaran,

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

    if (sisa == 0) {
      const update_sisa_tagihan = await prisma.headerPembelian.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          sisa_tagihan: sisa,
          status: "Complete",
        },
      });
    } else {
      const update_sisa_tagihan = await prisma.headerPembelian.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          sisa_tagihan: sisa,
          status: "Partial",
        },
      });
    }

    const find_akun_bayar = await prisma.kontak.findFirst({
      where: {
        kontak_id: parseInt(req.body.kontak_id),
      },
    });

    const jurnal_pengiriman_pembayaran = await prisma.jurnalPengirimanBayaran.createMany({
      data: [
        {
          header_pembelian_id: parseInt(req.body.id),
          akun_id: find_akun_bayar.akun_hutang_id,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Debit",
        },
        {
          header_pembelian_id: parseInt(req.body.id),
          akun_id: req.body.akun.id,
          nominal: parseInt(req.body.jumlah),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json([{ message: "Pengerimaan Pembayaran Success!", data: create_penerimaan_pembayaran }]);
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};
