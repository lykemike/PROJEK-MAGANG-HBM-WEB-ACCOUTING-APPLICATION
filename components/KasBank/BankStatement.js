import React, { useMemo } from "react";
import { TableBody, TableCell, TableRow, Checkbox } from "@material-ui/core";

export default function BankStatement({ data, index, label, view, contact, selectedTransactions, handleSelectOne }) {
  const detail = useMemo(() => {
    if (view == "kirimuang") {
      return data.HeaderKirimUang;
    } else if (view == "terimauang") {
      return data.HeaderTerimaUang;
    } else {
      return data.TransferUang1;
    }
  }, [view]);

  let autoIncrement = 1;
  // var bank_statement = [
  //   { total_header_kirim_uang: data.HeaderKirimUang.reduce((a, b) => (a = a + b.total), 0) },
  //   { total_header_terima_uang: data.HeaderTerimaUang.reduce((a, b) => (a = a + b.total), 0) },
  //   { total_header_transfer_uang: data.TransferUang1.reduce((a, b) => (a = a + b.total), 0) },
  // ];

  // console.log(bank_statement);

  return (
    <>
      <TableBody>
        {detail.map((i, index) => (
          <TableRow
            key={JSON.stringify({ id: i.id, tipe: view })}
            selected={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}>
            <TableCell>
              <Checkbox
                checked={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}
                color='primary'
                onChange={(event) => handleSelectOne(event, JSON.stringify({ id: i.id, tipe: view }))}
                value={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}
              />
            </TableCell>
            <TableCell component='th' scope='row'>
              {i.tgl_transaksi}
            </TableCell>
            {/* <TableCell>{contact == "contact" ? i.kontak.nama : "-"}</TableCell> */}
            <TableCell />
            <TableCell />
            <TableCell>Rp. {label == "incoming" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "0, 00"}</TableCell>
            <TableCell>Rp. {label == "outgoing" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "0, 00"}</TableCell>
            <TableCell>Rp. 0, 00</TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              {i.status == "Belum terekonsiliasi" ? (
                <span class='bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs'>{i.status}</span>
              ) : (
                <span class='bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs'>{i.status}</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
