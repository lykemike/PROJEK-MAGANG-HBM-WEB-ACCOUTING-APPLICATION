import React, { useState } from "react";

export default function TableDetailRow({ data, index }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <tr>
        <td class="py-3">
          <p class="text-blue-600 cursor-pointer" onClick={onClick}>
            Journal Entry #{data.id} || created on {data.tgl_transaksi}
          </p>
        </td>
      </tr>
      <tr>
        <td class={`py-2 text-sm text-gray-500 text-uppercase font-bold ${open ? "block" : "hidden"}`}>Detail #{index + 1}</td>
      </tr>
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
              {data.DetailJurnal.map((i) => (
                <tr>
                  <td class="px-2 py-2">
                    {i.akun.kode_akun} - {i.akun.nama_akun}
                  </td>
                  <td class="px-2 py-2">Rp. {i.debit.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td class="px-2 py-2">Rp. {i.kredit.toLocaleString({ minimumFractionDigits: 0 })}</td>
                </tr>
              ))}
            </tbody>
            <tfoot class="border-t-2 border-black">
              <tr>
                <td class="px-2 py-1" align="right">
                  Total
                </td>
                <td class="px-2 py-1">Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
                <td class="px-2 py-1">Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
    </>
  );
}
