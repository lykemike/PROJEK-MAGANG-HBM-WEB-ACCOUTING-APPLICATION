import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // get penerimaan pembayaran
    const get_penerimaan_pembayaran = await prisma.penerimaanPembayaran.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        header_penjualan: {
          include: {
            kontak: {
              include: {
                piutang: true,
              },
            },
          },
        },
        akun: true,
        JurnalPenerimaanPembayaran: {
          include: {
            akun: true,
          },
        },
      },
    });

    // update penerimaan pembayaran date confirmation from input
    const update_date_confirmation = await prisma.penerimaanPembayaran.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        date_confirmation: req.body.tanggal,
      },
    });

    // get date from input, then split into DD:MM:YYYY
    const confirm_date = req.body.tanggal;
    const day = confirm_date.split("-")[2];
    const month = confirm_date.split("-")[1];
    const year = confirm_date.split("-")[0];

    // get current timestamp 25 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // push data need for inserting into laporan transaksi table
    let jurnal = [];
    get_penerimaan_pembayaran.JurnalPenerimaanPembayaran.map((i) => {
      jurnal.push({
        akun_id: i.akun_id,
        kategori_id: i.akun.kategoriId,
        timestamp: current_time,
        date: confirm_date,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: i.tipe_saldo == "Debit" ? i.nominal : 0,
        kredit: i.tipe_saldo == "Kredit" ? i.nominal : 0,
        sumber_transaksi: "Sales Invoice",
        no_ref: i.header_penjualan_id,
        delete_ref_no: i.penerimaan_pembayaran_id,
        delete_ref_name: "Penerimaan Pembayaran",
      });
    });

    // create laporan transaski
    const create_laporan_transaksi = await prisma.laporanTransaksi.createMany({
      data: jurnal,
    });

    const tipe_perusahaan = get_penerimaan_pembayaran.header_penjualan.tipe_perusahaan;
    const akun_kas_kecil = get_penerimaan_pembayaran.akun_id;
    const akun_piutang = get_penerimaan_pembayaran.header_penjualan.kontak.piutang.id;
    const nominal_negeri = get_penerimaan_pembayaran.tagihan_sebelum_pajak - get_penerimaan_pembayaran.pajak_total;
    const nominal_swasta = get_penerimaan_pembayaran.tagihan_setelah_pajak - get_penerimaan_pembayaran.pajak_total;

    // condition for where penjualan tipe perusahaan is false (negeri) or true (swasta)
    if (tipe_perusahaan == "false") {
      // update status penerimaan pembayaran
      const update_status = await prisma.penerimaanPembayaran.update({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
        data: {
          status: "Done",
        },
      });

      // create jurnal
      const create_jurnal_done = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: akun_kas_kecil,
            nominal: nominal_negeri,
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: akun_piutang,
            nominal: nominal_negeri,
            tipe_saldo: "Kredit",
          },
        ],
      });

      // create jurnal "DONE" for laporan transaksi
      const create_laporan = await prisma.laporanTransaksi.createMany({
        data: [
          {
            akun_id: akun_kas_kecil,
            kategori_id: get_penerimaan_pembayaran.akun.kategoriId,
            timestamp: current_time,
            date: confirm_date,
            hari: parseInt(day),
            bulan: parseInt(month),
            tahun: parseInt(year),
            debit: nominal_negeri,
            kredit: 0,
            sumber_transaksi: "Sales Invoice",
            no_ref: get_penerimaan_pembayaran.header_penjualan.id,
            delete_ref_no: get_penerimaan_pembayaran.id,
            delete_ref_name: "Penerimaan Pembayaran",
          },
          {
            akun_id: akun_piutang,
            kategori_id: get_penerimaan_pembayaran.akun.kategoriId,
            timestamp: current_time,
            date: confirm_date,
            hari: parseInt(day),
            bulan: parseInt(month),
            tahun: parseInt(year),
            debit: 0,
            kredit: nominal_negeri,
            sumber_transaksi: "Sales Invoice",
            no_ref: get_penerimaan_pembayaran.header_penjualan.id,
            delete_ref_no: get_penerimaan_pembayaran.id,
            delete_ref_name: "Penerimaan Pembayaran",
          },
        ],
      });

      // get current saldo from detail saldo awal
      const get_saldo_skrg = await prisma.detailSaldoAwal.findFirst({
        where: {
          akun_id: get_penerimaan_pembayaran.akun_id,
        },
      });

      // update saldo awal
      const update_setor_ke_saldo_skrg = await prisma.detailSaldoAwal.update({
        where: {
          akun_id: get_penerimaan_pembayaran.akun_id,
        },
        data: {
          sisa_saldo: get_saldo_skrg.sisa_saldo + nominal_negeri,
        },
      });
    } else {
      // update status penerimaan pembayaran
      const update_status = await prisma.penerimaanPembayaran.update({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
        data: {
          status: "Done",
        },
      });

      // create jurnal
      const create_jurnal_done = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: akun_kas_kecil,
            nominal: nominal_swasta,
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: akun_piutang,
            nominal: nominal_swasta,
            tipe_saldo: "Kredit",
          },
        ],
      });

      // create jurnal "DONE" for laporan transaksi
      const create_laporan = await prisma.laporanTransaksi.createMany({
        data: [
          {
            akun_id: akun_kas_kecil,
            kategori_id: get_penerimaan_pembayaran.akun.kategoriId,
            timestamp: current_time,
            date: confirm_date,
            hari: parseInt(day),
            bulan: parseInt(month),
            tahun: parseInt(year),
            debit: nominal_swasta,
            kredit: 0,
            sumber_transaksi: "Sales Invoice",
            no_ref: get_penerimaan_pembayaran.header_penjualan.id,
            delete_ref_no: get_penerimaan_pembayaran.id,
            delete_ref_name: "Penerimaan Pembayaran",
          },
          {
            akun_id: akun_piutang,
            kategori_id: get_penerimaan_pembayaran.akun.kategoriId,
            timestamp: current_time,
            date: confirm_date,
            hari: parseInt(day),
            bulan: parseInt(month),
            tahun: parseInt(year),
            debit: 0,
            kredit: nominal_swasta,
            sumber_transaksi: "Sales Invoice",
            no_ref: get_penerimaan_pembayaran.header_penjualan.id,
            delete_ref_no: get_penerimaan_pembayaran.id,
            delete_ref_name: "Penerimaan Pembayaran",
          },
        ],
      });

      // get current saldo from detail saldo awal
      const get_saldo_skrg = await prisma.detailSaldoAwal.findFirst({
        where: {
          akun_id: get_penerimaan_pembayaran.akun_id,
        },
      });

      // update saldo awal
      const update_setor_ke_saldo_skrg = await prisma.detailSaldoAwal.update({
        where: {
          akun_id: get_penerimaan_pembayaran.akun_id,
        },
        data: {
          sisa_saldo: get_saldo_skrg.sisa_saldo + nominal_swasta,
        },
      });
    }

    res.status(201).json({ message: "Complete invoice penerimaan pembayaran success!" });
  } catch (error) {
    res.status(400).json({ data: "Comeplete invoice penerimaan pembayaran failed!", error });
    console.log(error);
  }
};
