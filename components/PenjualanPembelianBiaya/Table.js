import React, { useState, useMemo, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Link from "next/Link";
import { Row, Col, FormControl, Modal, Button } from "react-bootstrap";
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, Edit, Delete, Icon, AssignmentTurnedIn } from "@material-ui/icons/";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { TableFooter } from "@material-ui/core";
export default function Table2({ data, index, label, label2, view, modalDelete }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const detail = useMemo(() => {
    if (view == "jual") {
      return data.PenerimaanPembayaran;
    } else if (view == "beli") {
      return data.PengirimanBayaran;
    } else {
      return data.pengirimanbiaya;
    }
  }, [view]);

  const status = useCallback((tgl_jatuh_tempo, status) => {
    if (tgl_jatuh_tempo < current) {
      return <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Jatuh Tempo</span>;
    } else if (status == "Complete") {
      return <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{data.status}</span>;
    } else if (status == "Active") {
      return <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{data.status}</span>;
    } else if (status == "Partial") {
      return <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">{data.status}</span>;
    } else {
      null;
    }
  }, []);

  let autoIncrement = 1;
  {
    console.log(detail);
  }
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {data.tgl_transaksi}
          </TableCell>
          <TableCell>
            {label} #{data.id}
          </TableCell>
          <TableCell>{data.kontak.nama}</TableCell>
          <TableCell>{data.tgl_jatuh_tempo}</TableCell>

          <TableCell>{status(data.tgl_jatuh_tempo, data.status)}</TableCell>
          <TableCell>Rp. {data.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          <TableCell>Rp. {data.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          <TableCell align="center">
            <Link href={`../../${view}/view/${data.id}`}>
              <a>
                <VisibilityOutlinedIcon color="primary" fontSize="small" className="mr-2" />
              </a>
            </Link>
            <Link href={`../../${view}/${data.id}`}>
              <a>
                <EditOutlinedIcon color="action" fontSize="small" className="mr-2" />
              </a>
            </Link>
            <DeleteOutlineIcon className="cursor-pointer" color="secondary" fontSize="small" onClick={modalDelete} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="body1" gutterBottom component="div" className="text-black font-bold">
                  History {label2}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead className="bg-blue-300">
                    <TableRow>
                      <TableCell>Jumlah Transaksi</TableCell>
                      <TableCell>Cara Pembayaran</TableCell>
                      <TableCell>Tanggal Pembayaran</TableCell>
                      <TableCell>Total Pembayaran</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detail.map((i) => (
                      <TableRow>
                        <TableCell component="th" scope="row" align="center">
                          {autoIncrement++}
                        </TableCell>
                        <Link href={`../../${view}/pembayaran/view/${i.id}`}>
                          <TableCell className="cursor-pointer hover:text-blue-600">{i.cara_pembayaran_nama}</TableCell>
                        </Link>
                        <TableCell>{i.tgl_pembayaran}</TableCell>
                        <TableCell>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                        <TableCell>
                          <Link href={`../beli/pembayaran/view/${i.id}`}>
                            <a>
                              <Button variant="info" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                            </a>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell>Total Pembayaran</TableCell>
                      <TableCell>Rp. {detail.reduce((a, b) => (a = a + b.jumlah), 0).toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
