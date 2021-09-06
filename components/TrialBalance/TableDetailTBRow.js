import React, { useState } from "react";
// import JournalEntry from "./JournalEntry";
// import SalesInvoice from "./SalesInvoice";

export default function TableDetailBBRow({ data, label = "Aset"}) {
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
          {label} 
          </p> 
        </td>
      </tr>
      <tr class='ml-4'>
        <td colSpan='3' class={open ? "block" : "hidden"}>
          <table class='w-full'>
            <thead  class='justify-between'>
              <tr class='bg-blue-500 '>
                <th colSpan="3" class='px-2 py-1 text-center'>
                  <span class='text-gray-300'>Daftar Akun</span>
                </th>
                <th colSpan="2" class='px-2 py-1 ml-2'>
                  <span class='text-gray-300'>Saldo Awal</span>
                </th>
                <th  colSpan="2" class='px-2 py-1'>
                  <span class='text-gray-300'>Penyesuaian</span>
                </th>
                <th  colSpan="2" class='px-2 py-1'>
                  <span class='text-gray-300'>Saldo Akhir</span>
                </th>
              </tr> 
              <tr class='bg-blue-500 '>
                
                <th colSpan="3" class='px-1 py-1'>
                  <span class='text-gray-300'></span>
                </th>
                    <th colSpan="1" class='px-2 py-1'>
                    <span class='text-gray-300'>Debit</span>
                    </th>
                    <th class='px-4 py-1'>
                    <span class='text-gray-300'>Kredit</span>
                    </th>
               
                    <th colSpan="1" class='px-2 py-1'>
                    <span class='text-gray-300'>Debit</span>
                    </th>
                    <th colSpan="1"class='px-4 py-1'>
                    <span class='text-gray-300'>Kredit</span>
                    </th>
               
                    <th colSpan="1" class='px-2 py-1'>
                    <span class='text-gray-300'>Debit</span>
                    </th>
                    <th colSpan="1" class='px-4 py-1'>
                    <span class='text-gray-300'>Kredit</span>
                    </th>
               
              </tr> 
            </thead>
            {data.map((aset) => (
            <tbody>
                    <td colSpan="3" class='px-1 py-1'>
                       <p>{aset.kode_akun} - {aset.nama_akun}</p>
                    </td>
                
                    <td colSpan="1" class='px-2 py-1'>
                    <span class='text-gray-300'></span>
                    </td>
                    <td class='px-4 py-1'>
                    <span class='text-gray-300'></span>
                    </td>
               
                    <td colSpan="1" class='px-2 py-1'>
                    <span class='text-gray-300'></span>
                    </td>
                    <td colSpan="1"class='px-4 py-1'>
                    <span class='text-gray-300'></span>
                    </td>
               
                    <td colSpan="1" class='px-2 py-1'>
                    <span class='text-gray-300'></span>
                    </td>
                    <td colSpan="1" class='px-4 py-1'>
                    <span class='text-gray-300'></span>
                    </td>
        
             
            </tbody>))}
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
