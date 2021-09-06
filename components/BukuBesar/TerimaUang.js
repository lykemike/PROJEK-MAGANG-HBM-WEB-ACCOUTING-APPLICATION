import React from 'react'

const TerimaUang = ({ tgl_transaksi, no_transaksi, nominal ,tipe_saldo}) => {
    return (
        
               <tr>
                  <td class='px-2 py-2'>
                    {tgl_transaksi}
                  </td>
                  <td class='px-2 py-2'>Terima Uang </td>
                  <td class='px-2 py-2'>
                    {no_transaksi}
                  </td>
                  <td class='px-2 py-2'>Rp. {tipe_saldo === "Debit" ? nominal.toLocaleString({ minimumFractionDigits: 0 }) : 0}</td>
                  <td class='px-2 py-2'>Rp. {tipe_saldo === "Kredit" ? nominal.toLocaleString({ minimumFractionDigits: 0 }) : 0}</td>
                  <td class='px-2 py-2'>Rp. --</td>
                </tr>
        
    )
}

export default TerimaUang
