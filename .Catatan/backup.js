// push data to laporan transaksi
let laporan_transaksi = [];
req.body.detail_biaya &&
  JSON.parse(req.body.detail_biaya).map((i) => {
    laporan_transaksi.push({
      akun_id: parseInt(i.akun_id),
      kategori_id: parseInt(i.kategori_id),
      timestamp: current_time,
      date: req.body.tgl_transaksi,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      debit: parseInt(i.jumlah),
      kredit: 0,
      sumber_transaksi: "Expense",
      // no_ref: find_latest.id,
      // delete_ref_no: find_latest.id,
      delete_ref_name: "Expense",
    });
  });

// push data to laporan transaksi
let laporan_transaksi_pajak_masukan = [];
req.body.detail_biaya &&
  JSON.parse(req.body.detail_biaya).map((i) => {
    if (i.kategori_id_masukan == "") {
    } else {
      laporan_transaksi_pajak_masukan.push({
        akun_id: i.pajak_masukan_id,
        kategori_id: parseInt(i.kategori_id_masukan),
        timestamp: current_time,
        date: req.body.tgl_transaksi,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: parseInt(i.pajak_masukan_per_baris),
        kredit: 0,
        sumber_transaksi: "Expense",
        // no_ref: find_latest.id,
        // delete_ref_no: find_latest.id,
        delete_ref_name: "Expense",
      });
    }
  });

let laporan_transaksi_pajak_keluaran = [];
req.body.detail_biaya &&
  JSON.parse(req.body.detail_biaya).map((i) => {
    if (i.kategori_id_keluaran == "") {
    } else {
      laporan_transaksi_pajak_keluaran.push({
        akun_id: i.pajak_keluaran_id,
        kategori_id: parseInt(i.kategori_id_keluaran),
        timestamp: current_time,
        date: req.body.tgl_transaksi,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: parseInt(i.pajak_keluaran_per_baris),
        kredit: 0,
        sumber_transaksi: "Expense",
        // no_ref: find_latest.id,
        // delete_ref_no: find_latest.id,
        delete_ref_name: "Expense",
      });
    }
  });
