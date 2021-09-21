import React, { useState } from "react";
// import JournalEntry from "./JournalEntry";
// import SalesInvoice from "./SalesInvoice";
import merge from "lodash/merge";

export default function TableDetailBBRow({ data, label = "Aset" }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };

  const daftar_akun = { akun: [{ kode_akun: "1-10001", nama_akun: "Kas Besar (BCA 525536917)" }] };
  const saldo_awal = { akun: [{ saldo_awal: [{ debit: 0, kredit: 9600000 }] }] };
  const penyesuaian = { akun: [{ penyesuaian: [{ debit: 0, kredit: 500000 }] }] };
  const saldo_akhir = { akun: [{ saldo_akhir: [{ debit: 0, kredit: 9100000 }] }] };

  const tb = merge(daftar_akun, saldo_awal, penyesuaian, saldo_akhir);
  console.log(tb);
  return (
    <>
      {/* {console.log(data[32].JurnalPembelian.filter((i) => i.tipe_saldo === "Debit").reduce((a, b) => (a = a + b.nominal), 0))} */}
      {tb.akun[0].saldo_awal[0].kredit - tb.akun[0].penyesuaian[0].kredit}
      <tr>
        <td class='py-3'>
          <p class='text-blue-600 cursor-pointer' onClick={onClick}>
            {label}
          </p>
        </td>
      </tr>
      <tr class='ml-4'>
        <td colSpan='3' class={open ? "block" : "hidden"}>
          <table class='w-full'>
            <thead class='justify-between'>
              <tr class='bg-blue-500 '>
                <th colSpan='3' class='px-2 py-1 text-center'>
                  <span class='text-gray-300'>Daftar Akun</span>
                </th>
                <th colSpan='2' class='px-2 py-1 ml-2'>
                  <span class='text-gray-300'>Saldo Awal</span>
                </th>
                <th colSpan='2' class='px-2 py-1'>
                  <span class='text-gray-300'>Penyesuaian</span>
                </th>
                <th colSpan='2' class='px-2 py-1'>
                  <span class='text-gray-300'>Saldo Akhir</span>
                </th>
              </tr>
              <tr class='bg-blue-500 '>
                <th colSpan='3' class='px-1 py-1'>
                  <span class='text-gray-300'></span>
                </th>
                <th colSpan='1' class='px-2 py-1'>
                  <span class='text-gray-300'>Debit</span>
                </th>
                <th class='px-4 py-1'>
                  <span class='text-gray-300'>Kredit</span>
                </th>

                <th colSpan='1' class='px-2 py-1'>
                  <span class='text-gray-300'>Debit</span>
                </th>
                <th colSpan='1' class='px-4 py-1'>
                  <span class='text-gray-300'>Kredit</span>
                </th>

                <th colSpan='1' class='px-2 py-1'>
                  <span class='text-gray-300'>Debit</span>
                </th>
                <th colSpan='1' class='px-4 py-1'>
                  <span class='text-gray-300'>Kredit</span>
                </th>
              </tr>
            </thead>
            {data.map((aset, index) => (
              <tbody>
                <td colSpan='3' class='px-1 py-1'>
                  <p>
                    {aset.kode_akun} - {aset.nama_akun}
                  </p>
                </td>

                <td colSpan='1' class='px-2 py-1'>
                  <span class='text-gray-300'></span>
                </td>
                <td class='px-4 py-1'>
                  <span class='text-gray-300'></span>
                </td>

                <td colSpan='1' class='px-2 py-1'>
                  <span class='text-gray-300'>
                    Rp.{" "}
                    {data[index].JurnalPembelian.filter((i) => i.tipe_saldo === "Debit").reduce((a, b) => (a = a + b.nominal), 0)}
                  </span>
                </td>
                <td colSpan='1' class='px-4 py-1'>
                  <span class='text-gray-300'>
                    Rp.{" "}
                    {data[index].JurnalPembelian.filter((i) => i.tipe_saldo === "Kredit").reduce(
                      (a, b) => (a = a + b.nominal),
                      0
                    )}
                  </span>
                </td>

                <td colSpan='1' class='px-2 py-1'>
                  <span class='text-gray-300'></span>
                </td>
                <td colSpan='1' class='px-4 py-1'>
                  <span class='text-gray-300'></span>
                </td>
              </tbody>
            ))}
            <tfoot class='border-t-2 border-black'>
              <tr>
                <td class='px-2 py-2'></td>
                <td class='px-2 py-2'></td>
                <td class='px-2 py-1' align='right'>
                  Total
                </td>
                <td class='px-2 py-1'></td>
                {/* <td class="px-2 py-1">Rp. {data.JurnalPembelian.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td> */}
              </tr>
            </tfoot>
          </table>
        </td>
      </tr>
    </>
  );
}
