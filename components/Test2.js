import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

export default function Test2({ data, index, label = "Sales Invoice", tipe = "penjualan" }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };
  const detail = useMemo(() => {
    if (tipe == "pembelian") {
      return data.JurnalPembelian;
    } else {
      return data.JurnalPenjualan;
    }
  }, [tipe]);

  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            <p className='text-blue-700'>
              {label} #{data.id} || created on {data.tgl_transaksi}
            </p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box margin={1}>
                <Table size='small' aria-label='purchases'>
                  <TableHead className='bg-blue-400'>
                    <TableRow>
                      <TableCell>
                        <p className='font-bold'>Nama Akun</p>
                      </TableCell>
                      <TableCell align='right'>
                        <p className='font-bold'>Debit</p>
                      </TableCell>
                      <TableCell align='right'>
                        <p className='font-bold'>Kredit</p>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detail.map((i) => (
                      <TableRow>
                        <TableCell component='th' scope='row'>
                          {i.akun.kode_akun} - {i.akun.nama_akun}
                        </TableCell>
                        <TableCell align='right'>Rp. {i.tipe_saldo === "Debit" ? i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : 0}</TableCell>
                        <TableCell align='right'>Rp. {i.tipe_saldo === "Kredit" ? i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell align='right'>Total</TableCell>
                      <TableCell align='right'>
                        Rp.{" "}
                        {detail
                          .filter((i) => i.tipe_saldo === "Debit")
                          .reduce((a, b) => (a = a + b.nominal), 0)
                          .toLocaleString({ minimumFractionDigits: 0 })}
                      </TableCell>
                      <TableCell align='right'>
                        Rp.{" "}
                        {detail
                          .filter((i) => i.tipe_saldo === "Kredit")
                          .reduce((a, b) => (a = a + b.nominal), 0)
                          .toLocaleString({ minimumFractionDigits: 0 })}
                      </TableCell>
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
