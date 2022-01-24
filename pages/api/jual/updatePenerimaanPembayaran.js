import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // get data from front end
    const frontend_data = {
      header_penjualan_id: parseInt(req.body.header_penjualan_id),
      akun_id: parseInt(req.body.setor_ke),
      date: req.body.date,
      timestamp: req.body.timestamp,
      hari: parseInt(req.body.hari),
      bulan: parseInt(req.body.bulan),
      tahun: parseInt(req.body.tahun),
      deskripsi: req.body.deskripsi,
      pajak_id: parseInt(req.body.pajak_id),
      pajak_nama: req.body.pajak_nama,
      pajak_persen: parseInt(req.body.pajak_persen),
      presentase_penagihan: parseInt(req.body.presentase_penagihan),
      tagihan_sebelum_pajak: parseInt(req.body.tagihan_sebelum_pajak),
      pajak_total: parseInt(req.body.pajak_total),
      pajak_keluaran_total: parseInt(req.body.pajak_keluaran_total),
      tagihan_setelah_pajak: parseInt(req.body.tagihan_setelah_pajak),
      say: req.body.say,
      bank_id: parseInt(req.body.bank_id),
      status: req.body.status,
    };

    const tipe_perusahaan = req.body.tipe_perusahaan;

    // get penerimaan pembayaran
    const get_penerimaan_pembayaran = await prisma.penerimaanPembayaran.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        header_penjualan: true,
      },
    });

    // get header penjualan
    const get_header_penjualan = await prisma.headerPenjualan.findFirst({
      where: {
        id: get_penerimaan_pembayaran.header_penjualan.id,
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

    // get pajak
    const get_pajak = await prisma.pajak.findFirst({
      where: {
        id: parseInt(req.body.pajak_id),
      },
      include: {
        kategori2: true,
      },
    });

    let current_sisa_tagihan = parseInt(get_penerimaan_pembayaran.header_penjualan.sisa_tagihan);
    let current_tagihan_sebelum_pajak = parseInt(get_penerimaan_pembayaran.tagihan_sebelum_pajak);
    let current_tagihan_setelah_pajak = parseInt(get_penerimaan_pembayaran.tagihan_setelah_pajak);

    // condition for where penjualan tipe perusahaan is false (negeri) or true (swasta)
    if (tipe_perusahaan == "false") {
      // revert and update to initial sisa tagihan
      let revert_sisa_tagihan_negeri = current_sisa_tagihan + current_tagihan_sebelum_pajak;

      // update header penjualan
      const update_sisa_tagihan_negeri = await prisma.headerPenjualan.update({
        where: {
          id: get_header_penjualan.id,
        },
        data: {
          sisa_tagihan: revert_sisa_tagihan_negeri,
        },
      });

      // update penerimaan pembayaran
      const update_penerimaan_pembayaran = await prisma.penerimaanPembayaran.update({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
        data: frontend_data,
      });

      // delete old jurnal penerimaan pembayaran
      const delete_old_jurnal = await prisma.jurnalPenerimaanPembayaran.deleteMany({
        where: {
          penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
        },
      });

      // get new updated header penjualan
      const get_new_header_penjualan = await prisma.headerPenjualan.findFirst({
        where: {
          id: get_header_penjualan.id,
        },
      });

      // get new updated penerimaan pembayaran
      const get_new_penerimaan_pembayaran = await prisma.penerimaanPembayaran.findFirst({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
      });

      let updated_sisa_tagihan = parseInt(get_new_header_penjualan.sisa_tagihan);
      let new_tagihan_sebelum_pajak = parseInt(get_new_penerimaan_pembayaran.tagihan_sebelum_pajak);
      let new_sisa_tagihan = updated_sisa_tagihan - new_tagihan_sebelum_pajak;

      // update new sisa tagihan
      const update_new_sisa_tagihan = await prisma.headerPenjualan.update({
        where: {
          id: get_header_penjualan.id,
        },
        data: {
          sisa_tagihan: new_sisa_tagihan,
        },
      });

      // nama akun
      let akun_piutang = get_header_penjualan.kontak.akun_piutang_id;
      let akun_pajak_masukan = get_pajak.kategori2.id;
      let akun_pendapatan_bersih = get_header_penjualan.DetailPenjualan[0].produk.akun_id;

      // nominal berdasarkan akun
      let nominal_piutang = parseInt(req.body.tagihan_sebelum_pajak) - parseInt(req.body.pajak_keluaran_total);
      let nominal_pajak_masukan = parseInt(req.body.pajak_keluaran_total);
      let nominal_pendapatan_bersih = parseInt(req.body.tagihan_sebelum_pajak);

      // create jurnal
      const create_new_jurnal = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: get_header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: parseInt(akun_piutang),
            nominal: parseInt(nominal_piutang),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: parseInt(akun_pajak_masukan),
            nominal: parseInt(nominal_pajak_masukan),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: parseInt(akun_pendapatan_bersih),
            nominal: parseInt(nominal_pendapatan_bersih),
            tipe_saldo: "Kredit",
          },
        ],
      });
    } else {
      // revert and update to initial sisa tagihan
      let revert_sisa_tagihan_swasta = current_sisa_tagihan + current_tagihan_setelah_pajak;

      // update header penjualan
      const update_sisa_tagihan_swasta = await prisma.headerPenjualan.update({
        where: {
          id: get_header_penjualan.id,
        },
        data: {
          sisa_tagihan: revert_sisa_tagihan_swasta,
        },
      });

      // update penerimaan pembayaran
      const update_penerimaan_pembayaran = await prisma.penerimaanPembayaran.update({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
        data: frontend_data,
      });

      // delete old jurnal penerimaan pembayaran
      const delete_old_jurnal = await prisma.jurnalPenerimaanPembayaran.deleteMany({
        where: {
          penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
        },
      });

      // get new updated header penjualan
      const get_new_header_penjualan = await prisma.headerPenjualan.findFirst({
        where: {
          id: get_header_penjualan.id,
        },
      });

      // get new updated penerimaan pembayaran
      const get_new_penerimaan_pembayaran = await prisma.penerimaanPembayaran.findFirst({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
      });

      let updated_sisa_tagihan = parseInt(get_new_header_penjualan.sisa_tagihan);
      let new_tagihan_setelah_pajak = parseInt(get_new_penerimaan_pembayaran.tagihan_setelah_pajak);
      let new_sisa_tagihan = updated_sisa_tagihan - new_tagihan_setelah_pajak;

      // update new sisa tagihan
      const update_new_sisa_tagihan = await prisma.headerPenjualan.update({
        where: {
          id: get_header_penjualan.id,
        },
        data: {
          sisa_tagihan: new_sisa_tagihan,
        },
      });

      // nama akun
      let akun_piutang = get_header_penjualan.kontak.akun_piutang_id;
      let akun_pajak_masukan = get_pajak.kategori2.id;
      let akun_pajak_keluaran = get_header_penjualan.pajak.kategori1.id;
      let akun_pendapatan_bersih = get_header_penjualan.DetailPenjualan[0].produk.akun_id;

      // nominal berdasarkan nama akun
      let nominal_piutang = (get_header_penjualan.pajak_persen / 100) * parseInt(req.body.tagihan_sebelum_pajak) + parseInt(req.body.tagihan_sebelum_pajak) - parseInt(req.body.pajak_total);
      let nominal_pajak_masukan = parseInt(req.body.pajak_total);
      let nominal_pajak_keluaran = parseInt(req.body.tagihan_sebelum_pajak) * (get_header_penjualan.pajak_persen / 100);
      let nominal_pendapatan_bersih = parseInt(req.body.tagihan_sebelum_pajak);

      // create jurnal
      const create_jurnal = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: get_header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: parseInt(akun_piutang),
            nominal: parseInt(nominal_piutang),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: parseInt(akun_pajak_masukan),
            nominal: parseInt(nominal_pajak_masukan),
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: parseInt(akun_pajak_keluaran),
            nominal: parseInt(nominal_pajak_keluaran),
            tipe_saldo: "Kredit",
          },
          {
            header_penjualan_id: get_header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            akun_id: parseInt(akun_pendapatan_bersih),
            nominal: parseInt(nominal_pendapatan_bersih),
            tipe_saldo: "Kredit",
          },
        ],
      });
    }

    res.status(201).json({
      message: "Update Penerimaan Pembayaran Penjualan Success!",
      id: get_penerimaan_pembayaran.id,
    });
  } catch (error) {
    res.status(400).json([{ data: "Update Penerimaan Pembayaran Penjualan Failed!", error }]);
    console.log(error);
  }
};
