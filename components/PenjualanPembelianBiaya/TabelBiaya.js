import React, { useState, useMemo, useCallback } from "react";
import Link from "next/Link";
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, Edit, Delete, Icon, Done } from "@material-ui/icons/";
import { Row, Col, FormControl, Modal, Button } from "react-bootstrap";
import { Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Collapse, IconButton, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Axios from "axios";

export default function TableBiaya({ data, modalDelete }) {
  const akun = useMemo(() => {
    return data.akun;
  }, []);

  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell style={{ minWidth: 50, width: 50 }} />
          <TableCell style={{ minWidth: 200, width: 200 }}>{data.tgl_transaksi}</TableCell>
          <TableCell style={{ minWidth: 200, width: 200 }}>Expense #{data.id}</TableCell>
          <TableCell style={{ minWidth: 600, width: 600 }}>{akun.kode_akun + " - " + akun.nama_akun}</TableCell>
          <TableCell style={{ minWidth: 200, width: 200 }}>Rp. {data.total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          <TableCell style={{ minWidth: 200, width: 200 }} align="right">
            <Link href={`../biaya/view/${data.id}`}>
              <a>
                <Button variant="info" size="sm" className="mr-2">
                  <Visibility className="text-white" fontSize="small" />
                </Button>
              </a>
            </Link>

            <Link href={`../../biaya/update/${data.id}`}>
              <a>
                <Button variant="warning" size="sm" className="mr-2">
                  <Edit className="text-white" fontSize="small" />
                </Button>
              </a>
            </Link>
            <Button variant="danger" size="sm" onClick={modalDelete}>
              <Delete className="text-white" fontSize="small" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
