import React, { useState } from "react";
// import JournalEntry from "./JournalEntry";
// import SalesInvoice from "./SalesInvoice";

export default function TableDetailBBRow({ data, label = "Modal" }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };

  const penyesuaian = (
    tipeSaldo,
    detailjurnal,
    jurnalpembelian,
    jurnalpenjualan,
    jurnalbiaya,
    jurnalkirimuang,
    jurnaltransferuang,
    jurnalterimauang
  ) => {
    let detailJurnal =
      detailjurnal?.length > 0
        ? detailjurnal
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalPembelian =
      jurnalpembelian?.length > 0
        ? jurnalpembelian
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalPenjualan =
      jurnalpenjualan?.length > 0
        ? jurnalpenjualan
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalBiaya =
      jurnalbiaya?.length > 0
        ? jurnalbiaya
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalKirimuang =
      jurnalkirimuang?.length > 0
        ? jurnalkirimuang
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalTransferuang =
      jurnaltransferuang?.length > 0
        ? jurnaltransferuang
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalTerimauang =
      jurnalterimauang?.length > 0
        ? jurnalterimauang
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    return (
      detailJurnal +
      jurnalPembelian +
      jurnalPenjualan +
      jurnalBiaya +
      jurnalKirimuang +
      jurnalTransferuang +
      jurnalTerimauang
    );
  };

  const saldoakhir = (saldoawaldebit, saldoawalkredit, debit, kredit, tipe) => {
    if (saldoawaldebit < 1) {
      let hitung_kredit = saldoawalkredit + kredit;
      if (hitung_kredit > debit) {
        // masuk ke kredit
        if (tipe === "Kredit") {
          return hitung_kredit - debit;
        } else {
          return 0;
        }
      } else {
        if (tipe === "Kredit") {
          return 0;
        } else {
          return debit - hitung_kredit;
        }
      }
    } else {
      let hitung_debit = saldoawaldebit + debit;
      if (hitung_debit > kredit) {
        // masuk ke debit
        if (tipe === "Debit") {
          return hitung_debit - kredit;
        } else {
          return 0;
        }
      } else {
        if (tipe === "Debit") {
          // masuk ke kredit
          return 0;
        } else {
          return kredit - hitung_debit;
        }
      }
    }
  };

  const summary = (kredit, debit) => {
    return debit + kredit;
  };

  return (
    <>
      {console.log(data)}
      <tr>
        <td class="py-3">
          <p class="text-blue-600 cursor-pointer" onClick={onClick}>
            {label}
          </p>
        </td>
      </tr>
      {/* <tr>
        <td class={`py-2 text-sm text-gray-500 text-uppercase font-bold ${open ? "block" : "hidden"}`}>Aset</td>
      </tr> */}
      <tr class="ml-4">
        <td colSpan="3" class={open ? "block" : "hidden"}>
          <table class="w-full">
            <thead class="justify-between"></thead>
            {data.map((modal) => (
              <tbody>
                <td colSpan="3" class="px-1 py-1">
                  <p>
                    {modal.kode_akun} - {modal.nama_akun}
                  </p>
                </td>

                <td colSpan="1" class="px-2 py-1">
                  <span class="text-gray-300"></span>
                </td>
                <td class="px-4 py-1">
                  <span class="text-gray-300"></span>
                </td>

                <td colSpan="1" class="px-2 py-1">
                  <span class="text-gray-300"></span>
                </td>
                <td colSpan="1" class="px-4 py-1">
                  <span class="text-gray-300"></span>
                </td>

                <td colSpan="1" class="px-2 py-1">
                  <span class="text-black-300">
                    Rp.{" "}
                    {summary(
                      saldoakhir(
                        modal.DetailSaldoAwal[0].debit,
                        modal.DetailSaldoAwal[0].kredit,
                        penyesuaian(
                          "Debit",
                          modal.DetailJurnal,
                          modal.JurnalBiaya,
                          modal.JurnalKirimUang,
                          modal.JurnalTerimaUang,
                          modal.JurnalPenjualan,
                          modal.JurnalPembelian,
                          modal.JurnalTransferUang
                        ),
                        penyesuaian(
                          "Kredit",
                          modal.DetailJurnal,
                          modal.JurnalBiaya,
                          modal.JurnalKirimUang,
                          modal.JurnalTerimaUang,
                          modal.JurnalPenjualan,
                          modal.JurnalPembelian,
                          modal.JurnalTransferUang
                        ),
                        "Debit"
                      ),
                      saldoakhir(
                        modal.DetailSaldoAwal[0].debit,
                        modal.DetailSaldoAwal[0].kredit,
                        penyesuaian(
                          "Debit",
                          modal.DetailJurnal,
                          modal.JurnalBiaya,
                          modal.JurnalKirimUang,
                          modal.JurnalTerimaUang,
                          modal.JurnalPenjualan,
                          modal.JurnalPembelian,
                          modal.JurnalTransferUang
                        ),
                        penyesuaian(
                          "Kredit",
                          modal.DetailJurnal,
                          modal.JurnalBiaya,
                          modal.JurnalKirimUang,
                          modal.JurnalTerimaUang,
                          modal.JurnalPenjualan,
                          modal.JurnalPembelian,
                          modal.JurnalTransferUang
                        ),
                        "Kredit"
                      )
                    ).toLocaleString({ minimumFractionDigits: 0 })}
                  </span>
                </td>
                <td colSpan="1" class="px-4 py-1">
                  <span class="text-gray-300"></span>
                </td>
              </tbody>
            ))}

            <tfoot class="border-t-2 border-black"></tfoot>
          </table>
        </td>
      </tr>
    </>
  );
}
