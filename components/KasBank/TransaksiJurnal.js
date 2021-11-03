import React, { useMemo } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";

import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons/";

export default function TransaksiJurnal({ data, index, bankid, label, view, contact, selectedTransactions, handleSelectOne }) {
  const detail = useMemo(() => {
    if (view == "kirimuang") {
      return data.HeaderKirimUang;
    } else if (view == "terimauang") {
      return data.HeaderTerimaUang;
    } else if (view == "transferuang1") {
      return data.TransferUang1;
    } else {
      return data.TransferUang2;
    }
  }, [view]);

  return (
    <>
      <TableBody>
        {detail.map((i, index) => (
          <TableRow
            key={JSON.stringify({ id: i.id, tipe: view })}
            selected={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}
          >
            <TableCell>
              <Checkbox
                checked={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}
                color="primary"
                onChange={(event) => handleSelectOne(event, JSON.stringify({ id: i.id, tipe: view }))}
                value={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}
              />
            </TableCell>
            <TableCell component="th" scope="row">
              {i.tgl_transaksi}
            </TableCell>
            <TableCell>{contact == "contact" ? i.kontak.nama : "-"}</TableCell>
            <TableCell>{i.tag}</TableCell>
            <TableCell>Rp. {label == "incoming" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "0, 00"}</TableCell>
            <TableCell>Rp. {label == "outgoing" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "0, 00"}</TableCell>
            <TableCell>
              {/* Rp. {label == "outgoing" ? i.sisa_saldo_akuntransfer.toLocaleString({ minimumFractionDigits: 0 }) : i.sisa_saldo_akunsetor.toLocaleString({ minimumFractionDigits: 0 })} */}
            </TableCell>
            <TableCell>
              {i.status == "Belum terekonsiliasi" ? (
                <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{i.status}</span>
              ) : (
                <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{i.status}</span>
              )}
            </TableCell>
            <TableCell align="center">
              {view == "kirimuang" ? (
                <Link href={`view-kirim/${i.id}`}>
                  <a>
                    <VisibilityOutlined className="cursor-pointer" color="primary" fontSize="small" />
                  </a>
                </Link>
              ) : null}
              {view == "terimauang" ? (
                <Link href={`view-terima/${i.id}`}>
                  <a>
                    <VisibilityOutlined className="cursor-pointer" color="primary" fontSize="small" />
                  </a>
                </Link>
              ) : null}
              {view == "transferuang1" ? (
                <Link href={`view-transfer/${i.id}`}>
                  <a>
                    <VisibilityOutlined className="cursor-pointer" color="primary" fontSize="small" />
                  </a>
                </Link>
              ) : null}
              {view == "transferuang2" ? (
                <Link href={`view-transfer/${i.id}`}>
                  <a>
                    <VisibilityOutlined className="cursor-pointer" color="primary" fontSize="small" />
                  </a>
                </Link>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
