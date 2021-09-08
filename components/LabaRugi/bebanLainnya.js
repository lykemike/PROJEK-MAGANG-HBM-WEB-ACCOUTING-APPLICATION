import React, { useState } from "react";
// import JournalEntry from "./JournalEntry";
// import SalesInvoice from "./SalesInvoice";

export default function beban({ data, label = "Beban Operasional"}) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };



  return (
    <>  
      <tr>
        <td class='py-3'>
          <p class='text-blue-600 cursor-pointer' onClick={onClick}>
          {label} 
          </p> 
        </td>
      </tr>
      {/* <tr>
        <td class={`py-2 text-sm text-gray-500 text-uppercase font-bold ${open ? "block" : "hidden"}`}>Aset</td>
      </tr> */}
      <tr class='ml-4'>
        <td colSpan='3' class={open ? "block" : "hidden"}>
          <table class='w-full'>
            <thead  class='justify-between'>
            </thead> 
           
            <tbody> 
            {data.map((bebanLainnya,index) => (
                   <tr key="index">
                   <td colSpan="3" class='px-1 py-1'>
                    <p>{bebanLainnya.kode_akun} - {bebanLainnya.nama_akun}</p>
                    </td>
                   
                    <td colSpan="1" class='px-2 py-1'>
                    <span class='text-gray-300'></span>
                    </td>
                    <td class='px-4 py-1'>
                    <span class='text-gray-300'> XXX</span>
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
                   </tr>  
                   ))}
            </tbody>
           

            <tfoot class='border-t-2 border-black'>
            </tfoot>
          </table>
        </td>
      </tr>
    </>
  );
}
