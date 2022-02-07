import React, { useState, useMemo } from "react";

import { Box, Breadcrumbs, Typography, Collapse, Table, TableRow, TableCell, TableHead, TableFooter, TableBody, IconButton } from "@material-ui/core";

export default function Test2() {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>Aset</TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>(1-10101) - Kas</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Kewajiban</TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>(2-20101) - Kewajiban</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Ekuitas</TableCell>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
        </TableRow>
        <TableRow>
          <TableCell>(3-30101) - Ekujitas</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
          <TableCell>Rp. 0, 00</TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
