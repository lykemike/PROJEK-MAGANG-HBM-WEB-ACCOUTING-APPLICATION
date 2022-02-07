import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // get date from input, then split into DD:MM:YYYY
    const confirm_date = req.body.tgl_pembayaran;
    const day = confirm_date.split("-")[2];
    const month = confirm_date.split("-")[1];
    const year = confirm_date.split("-")[0];
    const frontend_data = {
      header_pembelian_id: parseInt(req.body.header_pembelian_id),
      akun_id: parseInt(req.body.akun_id),
      nama_akun_bayar_dari: req.body.nama_akun_bayar_dari,
      cara_pembayaran_id: parseInt(req.body.cara_pembayaran_id),
      cara_pembayaran_nama: req.body.cara_pembayaran_nama,
      tgl_pembayaran: req.body.tgl_pembayaran,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      jumlah: parseInt(req.body.jumlah_baru),
    };

    const create_penerimaan_pembayaran = await prisma.pengirimanBayaran.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: frontend_data,
    });

    const find_akun_detail_saldoawal = await prisma.detailSaldoAwal.findMany({
      where: {
        akun_id: parseInt(req.body.akun_id),
      },
    });

    const update_saldo_skrg_bayar_dari_lama = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_id),
      },
      data: {
        sisa_saldo: find_akun_detail_saldoawal[0].sisa_saldo + parseInt(req.body.jumlah),
      },
    });
    const update_saldo_skrg_bayar_dari = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_id),
      },
      data: {
        sisa_saldo: find_akun_detail_saldoawal[0].sisa_saldo - parseInt(req.body.jumlah_baru),
      },
    });

    const find_header_pembelian = await prisma.headerPembelian.findFirst({
      where: {
        id: parseInt(req.body.header_pembelian_id),
      },
      select: {
        sisa_tagihan: true,
      },
    });

    const sisatagihanlama = parseInt(find_header_pembelian.sisa_tagihan) + parseInt(req.body.jumlah);

    const sisatagihanbaru = parseInt(sisatagihanlama) - parseInt(req.body.jumlah_baru);

    const update_sisa_tagihan = await prisma.headerPembelian.update({
      where: {
        id: parseInt(req.body.header_pembelian_id),
      },
      data: {
        sisa_tagihan: parseInt(sisatagihanbaru),
        status: sisatagihanbaru == 0 ? "Completed" : "Partial",
      },
    });

    const find_akun_bayar = await prisma.kontak.findFirst({
      where: {
        id: parseInt(req.body.kontak_id),
      },
    });
    const find_pengiriman_bayaran = await prisma.pengirimanBayaran.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const deletejurnallama = await prisma.jurnalPengirimanBayaran.deleteMany({
      where: {
        PengirimanBayaran_id: parseInt(req.body.id),
      },
    });
    const jurnal_pengiriman_pembayaran = await prisma.jurnalPengirimanBayaran.createMany({
      data: [
        {
          header_pembelian_id: parseInt(req.body.header_pembelian_id),
          akun_id: find_akun_bayar.akun_hutang_id,
          nominal: parseInt(req.body.jumlah_baru),
          PengirimanBayaran_id: find_pengiriman_bayaran.id,
          tipe_saldo: "Debit",
        },
        {
          header_pembelian_id: parseInt(req.body.header_pembelian_id),
          akun_id: req.body.akun_id,
          nominal: parseInt(req.body.jumlah_baru),
          PengirimanBayaran_id: find_pengiriman_bayaran.id,
          tipe_saldo: "Kredit",
        },
      ],
    });

    // get current timestamp 24 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    const find_jurnal_pengirimanbayaran = await prisma.jurnalPengirimanBayaran.findMany({
      where: {
        PengirimanBayaran_id: find_pengiriman_bayaran.id,
      },
      include: { akun: true },
    });

    const find_jurnal_pengirimanbayaran_id = await prisma.jurnalPengirimanBayaran.findMany({
      where: {
        PengirimanBayaran_id: find_pengiriman_bayaran.id,
      },
    });

    let jurnal = [];
    find_jurnal_pengirimanbayaran.map((i) => {
      jurnal.push({
        akun_id: i.akun_id,
        kategori_id: i.akun.kategoriId,
        timestamp: current_time,
        date: req.body.tgl_pembayaran,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: i.tipe_saldo == "Debit" ? i.nominal : 0,
        kredit: i.tipe_saldo == "Kredit" ? i.nominal : 0,
        sumber_transaksi: "Purchase Invoice",
        no_ref: i.header_pembelian_id,
        delete_ref_no: i.PengirimanBayaran_id,
        delete_ref_name: "Pengiriman Pembayaran",
      });
    });

    // delete current jurnal from laporan transaksi table
    const delete_jurnal_pengiriman_from_laporan_transaksi = await prisma.laporanTransaksi.deleteMany({
      where: {
        delete_ref_no: find_pengiriman_bayaran.id,
        delete_ref_name: "Pengiriman Pembayaran",
      },
    });
    // create laporan transaski
    const create_laporan_transaksi = await prisma.laporanTransaksi.createMany({
      data: jurnal,
    });

    res.status(201).json({ message: "Create Penerimaan Pembayaran Success!", id: find_pengiriman_bayaran.id });
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};
