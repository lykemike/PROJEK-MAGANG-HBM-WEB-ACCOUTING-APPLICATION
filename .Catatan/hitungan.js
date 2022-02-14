// penyesuian
// ##Saldo Normal DEBIT
// Saldo Awal = 20,000,000
// total transaksi debit  = 10,000,000
// total transaksi kredit = 3,000,000

// ##Saldo Normal Kredit
// Saldo Awal = 20,000,000
// total transaksi debit  = 3,000,000
// total transaksi kredit = 10,000,000

// Penyesuian

// saldo normal debit
let saldo_awal_debit = "20,000,000";
let transaksi_debit_debit = "10,000,000";
let transaksi_debit_kredit = "3,000000";

let saldo_awal_kredit = "20,000,000";
let transaksi_kredit_debit = "3,000,000";
let transaksi_kredit_kredit = "10,000,000";

const total_transaksi_saldo_normal_debit = transaksi_debit_debit - transaksi_debit_kredit; // 7,000,000
const total_transaksi_saldo_normal_kredit = transaksi_kredit_kredit - transaksi_kredit_debit; // 7,000,000

if (value[0].saldo_normal === "Debit" && total_transaksi_saldo_normal_debit > 0) {
  // saldo normal DEBIT, transaksi tersebut LEBIH dari 0, maka masuk ke kolom DEBIT
  pny_debit = total_transaksi_saldo_normal_debit;
  pny_kredit = 0;
} else if (value[0].saldo_normal === "Debit" && total_transaksi_saldo_normal_debit < 0) {
  // saldo normal DEBIT, transaksi tersebut KURANG dari 0, maka masuk ke kolom DEBIT
  pny_debit = 0;
  pny_kredit = total_transaksi_saldo_normal_debit;
} else if (value[0].saldo_normal === "Kredit" && total_transaksi_saldo_normal_kredit > 0) {
  // saldo normal KREDIT, transaksi tersebut LEBIH dari 0, maka masuk ke kolom KREDIT
  pny_debit = 0;
  pny_kredit = total_transaksi_saldo_normal_kredit;
} else if (value[0].saldo_normal === "Kredit" && total_transaksi_saldo_normal_kredit < 0) {
  // saldo normal KREDIT, transaksi tersebut KURANG dari 0, maka masuk ke kolom KREDIT
  pny_debit = total_transaksi_saldo_normal_kredit;
  pny_kredit = 0;
}

if (value[0].saldo_normal === "DEBIT" && pny_debit > 0) {
  hasil_akhir_debit = value[0].saldo_normal + pny_debit;
  hasil_akhir_kredit = 0;
} else if (value[0].saldo_normal === "DEBIT" && pny_debit < 0) {
  hasil_akhir_debit = 0;
  hasil_akhir_kredit = value[0].saldo_normal - pny_debit;
}

// 	if saldo normal === DEBIT && pny_debit > 0
// 		hasil akhir debit = saldo awal + pny_debit
// 		hasil akhir kredit = 0
// 	else if saldo normal === DEBIT && pny_debit == 0
// 		hasil akhir debit = 0
// 		hasil akhir kredit = saldo awal + pny
