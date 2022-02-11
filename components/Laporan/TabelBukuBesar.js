import React, { useState, useMemo } from "react";

import { Box, Breadcrumbs, Typography, Collapse, Table, TableRow, TableCell, TableHead, TableFooter, TableBody, IconButton } from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

export default function Test2({ label, data }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" style={{ minWidth: 500, width: 500 }}>
            <Typography className="text-blue-700">{label}</Typography>
          </TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="body1" gutterBottom component="div" className="text-black font-bold">
                  Jurnal
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead className="bg-blue-300">
                    <TableRow>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Transaksi</TableCell>
                      <TableCell>Nomor</TableCell>
                      <TableCell>Debit</TableCell>
                      <TableCell>Kredit</TableCell>
                      <TableCell>Saldo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{data.value[0].saldo_awal_date}</TableCell>
                      <TableCell>Saldo Awal</TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell>{"Rp. " + data.value[0].saldo_awal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                    </TableRow>
                    {data?.value.map((i) => (
                      <TableRow>
                        <TableCell>{i.tanggal}</TableCell>
                        <TableCell>{i.sumber_transaksi}</TableCell>
                        <TableCell>{"# " + i.no_ref}</TableCell>
                        <TableCell>{"Rp. " + i.debit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                        <TableCell>{"Rp. " + i.kredit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                        <TableCell>{"Rp. " + i.selisih.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell>Saldo Akhir</TableCell>
                      <TableCell>{"Rp. " + data.value.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                      <TableCell>{"Rp. " + data.value.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                      <TableCell>XXX.XXX</TableCell>
                      {/* <TableCell align="right">Total</TableCell> */}
                      {/* <TableCell align="right">Rp. {data.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</TableCell> */}
                      {/* <TableCell align="right">Rp. {data.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</TableCell> */}
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
