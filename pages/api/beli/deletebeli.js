import { PrismaClient } from ".prisma/client";
import { groupBy, kebabCase, sortBy, sum, sumBy, uniqBy } from "lodash";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const PengirimanBayaran = await prisma.pengirimanBayaran.findMany({
      where: {
        header_pembelian_id: parseInt(req.body.header_pembelian_id),
      },
      include: {
        JurnalPengirimanBayaran: true,
      },
    });

    let newnominal = [];

    PengirimanBayaran.map((i, index) => {
      PengirimanBayaran[index].JurnalPengirimanBayaran.filter((k) => k.tipe_saldo === "Kredit").map((j) => {
        newnominal.push({
          akun_id: j.akun_id,
          nominal: j.nominal,
          tipe_saldo: j.tipe_saldo,
        });
      });
    });

    const find_akun_detail_saldoawal = await prisma.detailSaldoAwal.findMany({
      where: {
        akun_id: {
          in: newnominal.map((i) => i.akun_id),
        },
      },
    });

    let newsisasaldo = [];

    newnominal.map((i) => {
      newsisasaldo.push({
        akun_id: i.akun_id,
        nominal: newnominal.filter((j) => j.akun_id == i.akun_id).reduce((a, b) => (a = a + b.nominal), 0),
      });
    });

    const hasilgroup = uniqBy(newsisasaldo, "akun_id");
    for (let index = 0; index < hasilgroup.length; index++) {
      const update_detail_saldo_awal = await prisma.detailSaldoAwal.updateMany({
        where: {
          akun_id: hasilgroup[index].akun_id,
        },
        data: {
          sisa_saldo: { increment: hasilgroup[index].nominal },
        },
      });
    }

    const delete_jurnal_pembelian_from_laporan_transaksi = prisma.laporanTransaksi.deleteMany({
      where: {
        delete_ref_no: parseInt(req.body.header_pembelian_id),
        delete_ref_name: "Purchase Invoice" || "Pengiriman Pembayaran",
      },
    });
    // const transaction = req.body.header_pembelian_id;
    const delete_jurnal_pengiriman_pembayaran = prisma.jurnalPengirimanBayaran.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.header_pembelian_id),
      },
    });

    const delete_pengiriman_pembayaran = prisma.pengirimanBayaran.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.header_pembelian_id),
      },
    });

    const delete_jurnal_pembelian = prisma.jurnalPembelian.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.header_pembelian_id),
      },
    });

    const delete_detail_pembelian = prisma.detailPembelian.deleteMany({
      where: {
        header_pembelian_id: parseInt(req.body.header_pembelian_id),
      },
    });

    const delete_header_pembelian = prisma.headerPembelian.delete({
      where: {
        id: parseInt(req.body.header_pembelian_id),
      },
    });

    const transaction = await prisma.$transaction([
      delete_jurnal_pembelian_from_laporan_transaksi,
      delete_jurnal_pengiriman_pembayaran,
      delete_pengiriman_pembayaran,
      delete_jurnal_pembelian,
      delete_detail_pembelian,
      delete_header_pembelian,
    ]);
    res.status(201).json({ message: "Delete pembelian success!" });
  } catch (error) {
    res.status(400).json({ data: "Delete pembelian failed!", error });
    console.log(error);
  }
};
