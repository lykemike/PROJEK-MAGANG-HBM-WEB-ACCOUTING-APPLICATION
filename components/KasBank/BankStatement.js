import React, { useMemo } from "react";
import { TableBody, TableCell, TableRow, Checkbox } from "@material-ui/core";

export default function BankStatement({ data, index, selectedBankStatement, handleSelectOneBankStatement }) {
  let autoIncrement = 1;
  return (
    <>
      <TableBody>
        <TableRow key={data.id} selected={selectedBankStatement.indexOf(data.id) !== -1}>
          <TableCell>
            <Checkbox
              checked={selectedBankStatement.indexOf(data.id) !== -1}
              color="primary"
              onChange={(event) => handleSelectOneBankStatement(event, data.id)}
              value={selectedBankStatement.indexOf(data.id) !== -1}
            />
          </TableCell>
          <TableCell component="th" scope="row">
            {data.tgl_mutasi_bank}
          </TableCell>
          <TableCell>{data.deskripsi}</TableCell>
          <TableCell>{data.tgl_import}</TableCell>
          <TableCell>Rp. {data.debit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          <TableCell>Rp. {data.kredit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>
            {data.status == "Belum Terekonsiliasi" ? (
              <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{data.status}</span>
            ) : (
              <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{data.status}</span>
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
