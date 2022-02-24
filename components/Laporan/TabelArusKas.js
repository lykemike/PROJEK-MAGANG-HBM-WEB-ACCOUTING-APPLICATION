import React, { useState, useMemo } from "react";

import { Box, Breadcrumbs, Typography, Collapse, Table, TableRow, TableCell, TableHead, TableFooter, TableBody, IconButton } from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

export default function ArusKasComp({ data, data2 }) {
  console.log(data2);
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Arus kas dari Aktivitas Operasional</Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right" />
        </TableRow>
        <TableRow>
          <TableCell align="left">Penerimaan dari pelanggan</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.penerimaan_dari_pelanggan).map((j) => j.penerimaan_dari_pelanggan)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Aset Lancar Lainya</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.aset).map((j) => j.aset)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Pembayaran ke Pemasok</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.pembayaran).map((j) => j.pembayaran)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Kartu Kredit dan Liabilitas Jangka Pendek Lainnya</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.kartukredit).map((j) => j.kartukredit)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Pendapatan Lainnya</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.pendapatanlain).map((j) => j.pendapatanlain)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Pengeluaran operasional</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.pengeluaran).map((j) => j.pengeluaran)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="button" className="ml-4">
              Kas bersih yang diperoleh dari Aktivitas Operasional
            </Typography>
          </TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data2.map((i) => i.aktivias_opr)}</TableCell>
        </TableRow>
        {/* separator */}
        <TableRow>
          <TableCell>
            <Typography variant="h6">Arus kas dari akativitas investasi</Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right" />
        </TableRow>
        <TableRow>
          <TableCell align="left">Perolehan/Penjualan Aset</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.penjualanaset).map((j) => j.penjualanaset)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Aktivitas Investasi Lainnya</TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.aktivitas).map((j) => j.aktivitas)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="button" className="ml-4">
              Kas bersih yang diperoleh dari Aktivitas Investasi
            </Typography>
          </TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data2.map((i) => i.aktivias_inv)}</TableCell>
        </TableRow>
        {/* separator */}
        <TableRow>
          <TableCell>
            <Typography variant="h6">Arus kas dari Aktivitas Pendanaan</Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right"></TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Pembayaran/ Penerimaan pinjaman</TableCell>
          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.penerimaanpinjaman).map((j) => j.penerimaanpinjaman)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ekuitas/Modal</TableCell>
          <TableCell align="right" />
          <TableCell align="right">{data?.filter((i) => i.modal).map((j) => j.modal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="button" className="ml-4">
              Kas bersih yang diperoleh dari Aktivitas Pendanaan
            </Typography>
          </TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data2.map((i) => i.aktivias_dana)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>

          <TableCell align="right" />
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            <Typography>Kenaikan(Penurunan)Kas </Typography>
          </TableCell>

          <TableCell align="right" />
          <TableCell align="right">{data2.map((i) => i.total)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>Saldo Kas Awal </Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right">{data2.map((i) => i.saldo_awal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography>Saldo Kas Akhir </Typography>
          </TableCell>
          <TableCell align="right" />
          <TableCell align="right">{data2.map((i) => i.saldo_akhir)}</TableCell>
        </TableRow>
      </TableFooter>
    </>
  );
}
