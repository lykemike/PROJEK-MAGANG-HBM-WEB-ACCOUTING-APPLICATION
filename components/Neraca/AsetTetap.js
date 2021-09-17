import React, { useState } from "react";
// import JournalEntry from "./JournalEntry";
// import SalesInvoice from "./SalesInvoice";

export default function TableDetailBBRow({ data, label = "Aset Tetap" }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
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
            {data.map((asetTetap) => (
              <tbody>
                <td colSpan="3" class="px-1 py-1">
                  <p>
                    {asetTetap.kode_akun} - {asetTetap.nama_akun}
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
                  <span class="text-gray-300">Rp. XXX</span>
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
