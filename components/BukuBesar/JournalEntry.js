import React from 'react'

const JournalEntry = ({ tgl_transaksi, no_transaksi, debit,kredit}) => {
    return (
        
               <tr>
                  <td class='px-2 py-2'>
                    {tgl_transaksi}
                  </td>
                  <td class='px-2 py-2'>Journal Entry </td>
                  <td class='px-2 py-2'>
                    {no_transaksi}
                  </td>
                  <td class='px-2 py-2'>Rp. {debit > 0 ? debit.toLocaleString({ minimumFractionDigits: 0 }) : 0}</td>
                  <td class='px-2 py-2'>Rp. {kredit > 0 ? kredit.toLocaleString({ minimumFractionDigits: 0 }) : 0}</td>
                  <td class='px-2 py-2'>Rp. --</td>
                </tr>
        
    )
}

export default JournalEntry
