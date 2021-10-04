import React, { useState, useMemo, useEffect } from "react";
import merge from "lodash/merge";
import _ from "lodash";

export default function TableDetailRow({
  data,
  index,
  label = "Sales Invoice",
  tipe = "penjualan",
  setgrandtotal
}) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };
  const detail = useMemo(() => {
    if (tipe == "pembelian") {
      return data.JurnalPembelian;
    } else if (tipe == "biaya") {
      return data.JurnalBiaya;
    } else if (tipe == "transferUang") {
      return data.JurnalTransferUang;
    } else if (tipe == "kirimUang") {
      return data.JurnalKirimUang;
    } else if (tipe == "terimaUang") {
      return data.JurnalTerimaUang;
    } else if (tipe == "jurnal") {
      return data.DetailJurnal;
    } else {
      return data.JurnalPenjualan;
    }
  }, [tipe]);

   setgrandtotal(detail
                    .filter((i) => i.tipe_saldo === "Debit")
                    .reduce((a, b) => (a = a + b.nominal), 0)
                    )

  const result = 1 + 1;

  return (
    <>
      <tr>
        <td class="py-3">
          <p class="text-blue-600 cursor-pointer" onClick={onClick}>
            {label} #{data.id} || created on {data.tgl_transaksi}
          </p>
        </td>
      </tr>
      {/* <tr>
        <td class={`py-2 text-sm text-gray-500 text-uppercase font-bold ${open ? "block" : "hidden"}`}>Detail #{index + 1}</td>
      </tr> */}
      <tr class="ml-4">
        <td colSpan="3" class={open ? "block" : "hidden"}>
          <table class="w-full">
            <thead class="justify-between">
              <tr class="bg-blue-500 ">
                <th class="px-2 py-1">
                  <span class="text-gray-300">Nama Akun</span>
                </th>
                <th class="px-2 py-1">
                  <span class="text-gray-300">Debit</span>
                </th>
                <th class="px-2 py-1">
                  <span class="text-gray-300">Kredit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {detail.map((i) => (
                <tr>
                  <td class="px-2 py-2">
                    {i.akun.kode_akun} - {i.akun.nama_akun}
                  </td>
                  <td class="px-2 py-2">
                    Rp.{" "}
                    {i.tipe_saldo === "Debit"
                      ? i.nominal.toLocaleString({ minimumFractionDigits: 0 })
                      : 0}
                  </td>
                  <td class="px-2 py-2">
                    Rp.{" "}
                    {i.tipe_saldo === "Kredit"
                      ? i.nominal.toLocaleString({ minimumFractionDigits: 0 })
                      : 0}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot class="border-t-2 border-black">
              <tr>
                <td class="px-2 py-1" align="right">
                  Total
                </td>
                <td class="px-2 py-1">
                  Rp.{" "}
                  {detail
                    .filter((i) => i.tipe_saldo === "Debit")
                    .reduce((a, b) => (a = a + b.nominal), 0)
                    .toLocaleString({ minimumFractionDigits: 0 })}
                </td>
                <td class="px-2 py-1">
                  Rp.{" "}
                  {detail
                    .filter((i) => i.tipe_saldo === "Kredit")
                    .reduce((a, b) => (a = a + b.nominal), 0)
                    .toLocaleString({ minimumFractionDigits: 0 })}
                </td>
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
    </>
  );
}
