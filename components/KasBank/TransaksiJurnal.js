import React, { useMemo } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Tabs, Tab, Card, Button, DropdownButton, Dropdown, Table, Row, Col } from "react-bootstrap";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CachedIcon from "@material-ui/icons/Cached";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Tables from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
export default function TransaksiJurnal({ data, index, label, view, contact, selectedTransactions, handleSelectOne }) {
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
            <TableCell>
              Rp. {label == "incoming" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "Rp. 0, 00"}
            </TableCell>
            <TableCell>
              Rp. {label == "outgoing" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "Rp. 0, 00"}
            </TableCell>
            <TableCell>Rp. 0, 00</TableCell>
            <TableCell>
              {i.status == "Belum terekonsiliasi" ? (
                <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{i.status}</span>
              ) : (
                <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{i.status}</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
