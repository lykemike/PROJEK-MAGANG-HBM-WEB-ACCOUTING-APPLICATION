import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      header_penjualan_id: parseInt(req.body.id),
      akun_id: parseInt(req.body.setor_ke),
      tgl_pembayaran: req.body.tgl_pembayaran,
      pajak_id: parseInt(req.body.pajak_id),
      pajak_nama: req.body.pajak_nama,
      pajak_persen: parseInt(req.body.pajak_persen),
      presentase_penagihan: parseInt(req.body.presentase_penagihan),
      tagihan_sebelum_pajak: parseInt(req.body.tagihan_sebelum_pajak),
      pajak_total: parseInt(req.body.pajak_total),
      tagihan_setelah_pajak: parseInt(req.body.tagihan_setelah_pajak),
      say: req.body.say,
      bank_id: parseInt(req.body.bank_id),
      status: "-",
    };

    const create_penerimaan_pembayaran = await prisma.penerimaanPembayaran.createMany({
      data: [frontend_data],
    });

    const find_latest = await prisma.penerimaanPembayaran.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const get_header_penjualan = await prisma.headerPenjualan.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        kontak: true,
        DetailPenjualan: {
          include: {
            produk: true,
          },
        },
        pajak: {
          include: {
            kategori1: true,
          },
        },
      },
    });

    const pajak_keluaran_persen = get_header_penjualan.pajak_persen;
    const tipe_perusahaan = req.body.tipe_perusahaan;

    const get_pajak = await prisma.pajak.findFirst({
      where: {
        id: parseInt(req.body.pajak_id),
      },
      include: {
        kategori2: true,
      },
    });

    if (tipe_perusahaan == "false") {
      // Perusahaan Negeri
      let jumlah_sebelum_pajak = req.body.tagihan_sebelum_pajak;
      let update_sisa_tagihan = get_header_penjualan.sisa_tagihan - parseInt(jumlah_sebelum_pajak);

      const update_header_penjualan = await prisma.headerPenjualan.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          sisa_tagihan: parseInt(update_sisa_tagihan),
          status: "Partial",
        },
      });

      const update_penerimaan_pembayaran = await prisma.penerimaanPembayaran.updateMany({
        where: {
          header_penjualan_id: parseInt(req.body.id),
        },
        data: {
          status: "Process",
        },
      });

      // Nama Akun
      let piutang = get_header_penjualan.kontak.akun_piutang_id;
      let pajak_masukan = get_pajak.kategori2.id;
      let pendapatan_bersih = get_header_penjualan.DetailPenjualan[0].produk.akun_id;

      // Nominal Akun
      let nominal_piutang = parseInt(req.body.tagihan_sebelum_pajak) - parseInt(req.body.pajak_total);
      let nominal_pajak_masukan = parseInt(req.body.pajak_total);
      let nominal_pendapatan_bersih = parseInt(req.body.tagihan_sebelum_pajak);

      const create_jurnal = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: parseInt(req.body.id),
            penerimaan_pembayaran_id: find_latest.id,
            akun_id: parseInt(piutang),
            nominal: parseInt(nominal_piutang),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: parseInt(req.body.id),
            penerimaan_pembayaran_id: find_latest.id,
            akun_id: parseInt(pajak_masukan),
            nominal: parseInt(nominal_pajak_masukan),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: parseInt(req.body.id),
            penerimaan_pembayaran_id: find_latest.id,
            akun_id: parseInt(pendapatan_bersih),
            nominal: parseInt(nominal_pendapatan_bersih),
            tipe_saldo: "Kredit",
          },
        ],
      });
    } else {
      // Perusahaan Swasta
      let nominal_sisa_tagihan = parseInt(req.body.tagihan_sebelum_pajak) + parseInt(req.body.tagihan_sebelum_pajak) * (pajak_keluaran_persen / 100);
      let update_sisa_tagihan = get_header_penjualan.sisa_tagihan - parseInt(nominal_sisa_tagihan);

      const update_header_penjualan = await prisma.headerPenjualan.update({
        where: {
          id: parseInt(req.body.id),
        },
        data: {
          sisa_tagihan: parseInt(update_sisa_tagihan),
          status: "Partial",
        },
      });

      const update_penerimaan_pembayaran = await prisma.penerimaanPembayaran.update({
        where: {
          id: find_latest.id,
        },
        data: {
          tagihan_setelah_pajak: nominal_sisa_tagihan,
          status: "Process",
        },
      });

      // Nama Akun
      let piutang = get_header_penjualan.kontak.akun_piutang_id;
      let pajak_masukan = get_pajak.kategori2.id;
      let pajak_keluaran = get_header_penjualan.pajak.kategori1.id;
      let pendapatan_bersih = get_header_penjualan.DetailPenjualan[0].produk.akun_id;

      // Nominal Akun
      let nominal_piutang = (pajak_keluaran_persen / 100) * parseInt(req.body.tagihan_sebelum_pajak) + parseInt(req.body.tagihan_sebelum_pajak) - parseInt(req.body.pajak_total);
      let nominal_pajak_masukan = parseInt(req.body.pajak_total);
      let nominal_pajak_keluaran = parseInt(req.body.tagihan_sebelum_pajak) * (pajak_keluaran_persen / 100);
      let nominal_pendapatan_bersih = parseInt(req.body.tagihan_sebelum_pajak);

      const create_jurnal = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: parseInt(req.body.id),
            penerimaan_pembayaran_id: find_latest.id,
            akun_id: parseInt(piutang),
            nominal: parseInt(nominal_piutang),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: parseInt(req.body.id),
            penerimaan_pembayaran_id: find_latest.id,
            akun_id: parseInt(pajak_masukan),
            nominal: parseInt(nominal_pajak_masukan),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: parseInt(req.body.id),
            penerimaan_pembayaran_id: find_latest.id,
            akun_id: parseInt(pajak_keluaran),
            nominal: parseInt(nominal_pajak_keluaran),
            tipe_saldo: "Kredit",
          },
          {
            header_penjualan_id: parseInt(req.body.id),
            penerimaan_pembayaran_id: find_latest.id,
            akun_id: parseInt(pendapatan_bersih),
            nominal: parseInt(nominal_pendapatan_bersih),
            tipe_saldo: "Kredit",
          },
        ],
      });
    }

    res.status(201).json([
      {
        message: "Create Penerimaan Pembayaran Penjualan Success!",
        data: frontend_data,
        id: find_latest,
      },
    ]);
  } catch (error) {
    res.status(400).json([{ data: "Create Penerimaan Pembayaran Penjualan Failed!", error }]);
    console.log(error);
  }
};
