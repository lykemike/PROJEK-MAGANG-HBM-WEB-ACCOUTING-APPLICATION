import React, { useMemo } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { Formik, Field, Form } from "formik";

export default function BankStatement({ data, index, label, view, contact }) {
  const detail = useMemo(() => {
    if (view == "kirimuang") {
      return data.HeaderKirimUang;
    } else if (view == "terimauang") {
      return data.HeaderTerimaUang;
    } else {
      return data.TransferUang1;
    }
  }, [view]);
  return (
    <>
      <TableBody>
        {detail.map((i) => (
          <TableRow>
            <TableCell>
              <Field type='checkbox' name='toggle' />
            </TableCell>
            <TableCell component='th' scope='row'>
              {i.tgl_transaksi}
            </TableCell>
            {/* <TableCell>{contact == "contact" ? i.kontak.nama : "-"}</TableCell> */}
            <TableCell />
            <TableCell />
            <TableCell>{i.tag}</TableCell>
            <TableCell>Rp. {label == "incoming" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "Rp. 0, 00"}</TableCell>
            <TableCell>Rp. {label == "outgoing" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "Rp. 0, 00"}</TableCell>
            <TableCell>Rp. 0, 00</TableCell>
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
