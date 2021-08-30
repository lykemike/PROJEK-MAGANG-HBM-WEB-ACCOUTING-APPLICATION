import React, { useState } from "react";

export default function TableDetailBBRow({ data, index }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };
  console.log(data)
  return (
    <>
      <tr>
        <td class='py-3'>
          <p class='text-blue-600 cursor-pointer' onClick={onClick}>
          {data.nama_akun}
          </p> 
        </td>
      </tr>
      <tr>
        <td class={`py-2 text-sm text-gray-500 text-uppercase font-bold ${open ? "block" : "hidden"}`}>Detail #{index + 1}</td>
      </tr>
      <tr class='ml-4'>
        <td colSpan='3' class={open ? "block" : "hidden"}>
          <table class='w-full'>
            <thead class='justify-between'>
              <tr class='bg-blue-500 '>
                <th class='px-2 py-1'>
                  <span class='text-gray-300'>Tanggal</span>
                </th>
                <th class='px-2 py-1'>
                  <span class='text-gray-300'>Transaksi</span>
                </th>
                <th class='px-2 py-1'>
                  <span class='text-gray-300'>Nomor</span>
                </th>
                <th class='px-2 py-1'>
                  <span class='text-gray-300'>Debit</span>
                </th>
                <th class='px-2 py-1'>
                  <span class='text-gray-300'>Kredit</span>
                </th>
                <th class='px-2 py-1'>
                  <span class='text-gray-300'>Saldo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {data.DetailJurnal.map((i) => (
                <tr>
                  <td class='px-2 py-2'>
                    {data.tgl_transaksi}
                  </td>
                  <td class='px-2 py-2'></td>
                  <td class='px-2 py-2'>
                    {data.id}
                  </td>
                  <td class='px-2 py-2'>Rp. {i.debit.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td class='px-2 py-2'>Rp. {i.kredit.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td class='px-2 py-2'></td>
                </tr>
              ))} */}
            </tbody>
            <tfoot class='border-t-2 border-black'>
              <tr>
                <td class='px-2 py-2'></td>
                <td class='px-2 py-2'></td>
                <td class='px-2 py-1' align='right'>
                  Total
                </td>
                {/* <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
                <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td> */}
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
    </>
  );
}
