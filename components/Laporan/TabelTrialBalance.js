import React from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";

export default function Test2({ label, data }) {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <h5 className="text-blue-600">{label}</h5>
          </TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
        {data.map((i) => (
          <TableRow>
            <TableCell>{i.heading}</TableCell>
            <TableCell>Rp. {i.saldo_awal_debit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
            <TableCell>Rp. {i.saldo_awal_kredit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
            <TableCell>{i.pny_debit}</TableCell>
            <TableCell>{i.pny_kredit}</TableCell>
            <TableCell>{i.akhir_debit}</TableCell>
            <TableCell>{i.akhir_kredit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
