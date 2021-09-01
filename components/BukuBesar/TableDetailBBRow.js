import React, { useState } from "react";
import JournalEntry from "./JournalEntry";
import SalesInvoice from "./SalesInvoice";

export default function TableDetailBBRow({ data, index}) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };



  return (
    <>  
    {console.log(data)}
      <tr>
        <td class='py-3'>
          <p class='text-blue-600 cursor-pointer' onClick={onClick}>
          {data.kode_akun} - {data.nama_akun}
          </p> 
        </td>
      </tr>
      {/* <tr>
        <td class={`py-2 text-sm text-gray-500 text-uppercase font-bold ${open ? "block" : "hidden"}`}>{data.kode_akun}</td>
      </tr> */}
      <tr class='ml-4'>
        <td colSpan='3' class={open ? "block" : "hidden"}>
          <table class='w-full ml-4'>
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
             <SalesInvoice 
             tgl_transaksi={data.JurnalPenjualan[0]?.header_penjualan.tgl_transaksi || '-'}
             no_transaksi={data.JurnalPenjualan[0]?.header_penjualan.no_transaksi || '-'}
             nominal={data.JurnalPenjualan[0]?.nominal || '0'}
             tipe_saldo={data.JurnalPenjualan[0]?.tipe_saldo || '-'}
             />
            <JournalEntry
            tgl_transaksi={data.DetailJurnal[0]?.header_jurnal.tgl_transaksi || '-'}
            no_transaksi={data.DetailJurnal[0]?.header_jurnal.no_transaksi || '-'}
            debit={data.DetailJurnal[0]?.debit || '0'}
            kredit={data.DetailJurnal[0]?.kredit || '0'}
            
            />
        
            
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
