import React, { useState, useMemo } from "react";

import { Box, Breadcrumbs, Typography, Collapse, Table, TableRow, TableCell, TableHead, TableFooter, TableBody, IconButton } from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

export default function ArusKasComp() {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>Pendapatan Penjualan</TableCell>
          <TableCell align="right" />

          <TableCell align="right">
            {/* {"Rp. " +
              data
                ?.filter((i) => i.label == "Pendapatan Penjualan")
                .map((j) => j.total)
                .toLocaleString({ minimumFractionDigits: 0 })} */}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Harga Pokok Penjualan</TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* {"Rp. " +
              data
                ?.filter((i) => i.label == "Harga Pokok Penjualan")
                .map((j) => j.total)
                .toLocaleString({ minimumFractionDigits: 0 })} */}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Total Laba Kotor</Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right">{/* <Typography variant="h6">{labaKotor == 0 ? "Rp. 0, 00" : "Rp. " + labaKotor.toLocaleString({ minimumFractionDigits: 0 })}</Typography> */}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Beban Operasional</TableCell>
          <TableCell align="right" />
          <TableCell align="right" />
        </TableRow>
        {/* {value[0] &&
          value[0].data.map((j, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="inherit" className="ml-2">
                  {j.heading}
                </Typography>
              </TableCell>
              <TableCell align="right">{j.debit > 0 ? "Rp. " + j.debit.toLocaleString({ minimumFractionDigits: 0 }) : "(Rp. " + j.kredit.toLocaleString({ minimumFractionDigits: 0 }) + ")"}</TableCell>
              <TableCell align="right" />
            </TableRow>
          ))} */}

        <TableRow>
          <TableCell>Total Beban Operasional</TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* {"Rp. " +
              data
                ?.filter((i) => i.label == "Beban Selain Beban Pajak")
                .map((j) => j.total)
                .toLocaleString({ minimumFractionDigits: 0 })} */}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Pendapatan Bersih Operasional</Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* <Typography variant="h6">{pendapatanBersihOperasional == 0 ? "Rp. 0, 00" : "Rp. " + pendapatanBersihOperasional.toLocaleString({ minimumFractionDigits: 0 })}</Typography> */}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Pendapatan Lainnya</TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* {"Rp. " +
              data
                ?.filter((i) => i.label == "Pendapatan Lainnya")
                .map((j) => j.total)
                .toLocaleString({ minimumFractionDigits: 0 })} */}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Beban Lainnya</TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* {"Rp. " +
              data
                ?.filter((i) => i.label == "Beban Lainnya Selain Beban Pajak")
                .map((j) => j.total)
                .toLocaleString({ minimumFractionDigits: 0 })} */}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Pendapatan Bersih Sebelum Pajak</Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* <Typography variant="h6">{pendapatanBersihSebelumPajak == 0 ? "Rp. 0, 00" : "Rp. " + pendapatanBersihSebelumPajak.toLocaleString({ minimumFractionDigits: 0 })}</Typography> */}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Beban Pajak</TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* {"Rp. " +
              data
                ?.filter((i) => i.label == "Beban Pajak")
                .map((j) => j.total)
                .toLocaleString({ minimumFractionDigits: 0 })} */}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>
            <Typography variant="h6">Pendapatan Bersih Sesudah Pajak</Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right">
            {/* <Typography variant="h6">{pendapatanBersihSesudahPajak == 0 ? "Rp. 0, 00" : "Rp. " + pendapatanBersihSesudahPajak.toLocaleString({ minimumFractionDigits: 0 })}</Typography> */}
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
