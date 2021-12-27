import React, { useState } from "react";
// import JournalEntry from "./JournalEntry";
// import SalesInvoice from "./SalesInvoice";
import merge from "lodash/merge";

export default function TableDetailBBRow({ data, label = "Aset" }) {
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

  return (
    <>
      {console.log(
        data[32].JurnalPembelian.filter((i) => i.tipe_saldo === "Debit").reduce(
          (a, b) => (a = a + b.nominal),
          0
        )
      )}
      <tr>
        <td class="py-3">
          <p class="text-blue-600 cursor-pointer" onClick={onClick}>
            {label}
          </p>
        </td>
      </tr>
      <tr class="ml-4">
        <td colSpan="3" class={open ? "block" : "hidden"}>
          <table class="w-full">
            <thead class="justify-between">
              <tr class="bg-blue-500 ">
                <th colSpan="3" class="px-2 py-1 text-center">
                  <span class="text-gray-300">Daftar Akun</span>
                </th>
                <th colSpan="2" class="px-2 py-1 ml-2">
                  <span class="text-gray-300">Saldo Awal</span>
                </th>
                <th colSpan="2" class="px-2 py-1">
                  <span class="text-gray-300">Penyesuaian</span>
                </th>
                <th colSpan="2" class="px-2 py-1">
                  <span class="text-gray-300">Saldo Akhir</span>
                </th>
              </tr>
              <tr class="bg-blue-500 ">
                <th colSpan="3" class="px-1 py-1">
                  <span class="text-gray-300"></span>
                </th>
                <th colSpan="1" class="px-2 py-1">
                  <span class="text-gray-300">Debit</span>
                </th>
                <th class="px-4 py-1">
                  <span class="text-gray-300">Kredit</span>
                </th>

                <th colSpan="1" class="px-2 py-1">
                  <span class="text-gray-300">Debit</span>
                </th>
                <th colSpan="1" class="px-4 py-1">
                  <span class="text-gray-300">Kredit</span>
                </th>

                <th colSpan="1" class="px-2 py-1">
                  <span class="text-gray-300">Debit</span>
                </th>
                <th colSpan="1" class="px-4 py-1">
                  <span class="text-gray-300">Kredit</span>
                </th>
              </tr>
            </thead>
            {data.map((aset, index) => (
              <tbody>
                <td colSpan="3" class="px-1 py-1">
                  <p>
                    {aset.kode_akun} - {aset.nama_akun}
                  </p>
                </td>

                <td colSpan="1" class="px-2 py-1">
                  <span class="text-black-300">
                    Rp.{" "}
                    {aset.DetailSaldoAwal[0].debit.toLocaleString({
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </td>
                <td class="px-4 py-1">
                  <span class="text-black-300">
                    Rp.{" "}
                    {aset.DetailSaldoAwal[0].kredit.toLocaleString({
                      minimumFractionDigits: 0,
                    })}
                  </span>
                </td>

                <td colSpan="1" class="px-2 py-1">
                  <span class="text-black-300">
                    Rp.{" "}
                    {penyesuaian(
                      "Debit",
                      aset.DetailJurnal,
                      aset.JurnalBiaya,
                      aset.JurnalKirimUang,
                      aset.JurnalTerimaUang,
                      aset.JurnalPenjualan,
                      aset.JurnalPembelian,
                      aset.JurnalTransferUang
                    ).toLocaleString({ minimumFractionDigits: 0 })}
                  </span>
                </td>
                {/* kredit */}
                <td colSpan="1" class="px-4 py-1">
                  <span class="text-black-300">
                    Rp.{" "}
                    {penyesuaian(
                      "Kredit",
                      aset.DetailJurnal,
                      aset.JurnalBiaya,
                      aset.JurnalKirimUang,
                      aset.JurnalTerimaUang,
                      aset.JurnalPenjualan,
                      aset.JurnalPembelian,
                      aset.JurnalTransferUang
                    ).toLocaleString({ minimumFractionDigits: 0 })}
                  </span>
                </td>

                <td colSpan="1" class="px-2 py-1">
                  <span class="text-black-300">
                    Rp.{" "}
                    {saldoakhir(
                      aset.DetailSaldoAwal[0].debit,
                      aset.DetailSaldoAwal[0].kredit,
                      penyesuaian(
                        "Debit",
                        aset.DetailJurnal,
                        aset.JurnalBiaya,
                        aset.JurnalKirimUang,
                        aset.JurnalTerimaUang,
                        aset.JurnalPenjualan,
                        aset.JurnalPembelian,
                        aset.JurnalTransferUang
                      ),
                      penyesuaian(
                        "Kredit",
                        aset.DetailJurnal,
                        aset.JurnalBiaya,
                        aset.JurnalKirimUang,
                        aset.JurnalTerimaUang,
                        aset.JurnalPenjualan,
                        aset.JurnalPembelian,
                        aset.JurnalTransferUang
                      ),
                      "Debit"
                    ).toLocaleString({ minimumFractionDigits: 0 })}
                  </span>
                </td>
                <td class="px-4 py-1">
                  <span class="text-black-300">
                    Rp.{" "}
                    {saldoakhir(
                      aset.DetailSaldoAwal[0].debit,
                      aset.DetailSaldoAwal[0].kredit,
                      penyesuaian(
                        "Debit",
                        aset.DetailJurnal,
                        aset.JurnalBiaya,
                        aset.JurnalKirimUang,
                        aset.JurnalTerimaUang,
                        aset.JurnalPenjualan,
                        aset.JurnalPembelian,
                        aset.JurnalTransferUang
                      ),
                      penyesuaian(
                        "Kredit",
                        aset.DetailJurnal,
                        aset.JurnalBiaya,
                        aset.JurnalKirimUang,
                        aset.JurnalTerimaUang,
                        aset.JurnalPenjualan,
                        aset.JurnalPembelian,
                        aset.JurnalTransferUang
                      ),
                      "Kredit"
                    ).toLocaleString({ minimumFractionDigits: 0 })}
                  </span>
                </td>
              </tbody>
            ))}
            <tfoot class="border-t-2 border-black">
              <tr>
                <td class="px-2 py-2"></td>
                <td class="px-2 py-2"></td>
                <td class="px-2 py-1" align="right">
                  Total
                </td>
                <td class="px-2 py-1"></td>
                {/* <td class="px-2 py-1">Rp. {data.JurnalPembelian.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td> */}
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
    </>
  );
}
