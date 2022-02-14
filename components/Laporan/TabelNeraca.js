import React, { useState, useMemo } from "react";

import { Box, Breadcrumbs, Typography, Collapse, Table, TableRow, TableCell, TableHead, TableFooter, TableBody, IconButton } from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

export default function Test2({ data, label, label2 }) {
  const [open, setOpen] = useState(false);
  //   console.log(data);
  //   console.log(label2);
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
                {/* <Typography variant="body1" gutterBottom component="div" className="text-black font-bold">
                  Aset Lancar
                </Typography> */}

                <Table size="small" aria-label="purchases">
                  <TableHead className="bg-blue-300">
                    <TableRow>
                      <TableCell></TableCell>

                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((i) => (
                      <TableRow>
                        <TableCell>{i.heading}</TableCell>

                        <TableCell>{i.saldo_akhir_tb}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>Total</TableCell>

                      <TableCell>{label2}</TableCell>
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
