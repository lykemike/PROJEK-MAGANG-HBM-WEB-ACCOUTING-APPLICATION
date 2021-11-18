import React, { useState } from "react";
import Layout from "../../../components/layout";
import Link from "next/link";
import { Button, DropdownButton, InputGroup, FormControl, Dropdown, Row, Col, Form, Card } from "react-bootstrap";
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
  TableFooter,
} from "@material-ui/core";
import * as Yup from "yup";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function invoice_reimbursement({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;

  function print() {
    router.push(`../print/${id}`);
  }

  let tanggal = data[0].DetailReimburse.tanggal;
  // tanggal = new Date(tanggal[0], tanggal[1] - 1, tanggal[2]);
  // tanggal.setDate(tanggal.getDate() + props.values.syarat_pembayaran);
  // let tanggal = tgltransaksi.toLocaleDateString();
  // let tgl = tanggal.split("/");

  console.log(tanggal);

  return (
    <div>
      <Layout>
        <div className="border-b border-gray-200">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="../reimbursement/tabel-reimbursement">
              Table Reimbursement
            </Link>
            <Typography color="textPrimary">Reimbursement Overview</Typography>
          </Breadcrumbs>
          <h2 className="text-blue-600">Reimbursement #{id}</h2>
        </div>

        <div className="border-b border-gray-200">
          <Row className="py-2">
            <Col sm="3">
              <label className="font-medium mr-2">Nama Pegawai:</label>
              <label>{data[0].nama_pegawai}</label>
            </Col>
          </Row>
        </div>

        <TableContainer className="mt-4" component={Paper}>
          <Table size="small">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">Tanggal</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Tempat</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Biaya</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Keterangan</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Jumlah</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data[0].DetailReimburse.map((i, index) => (
                <TableRow key={index}>
                  <TableCell>{i.tanggal}</TableCell>
                  <TableCell>{i.tempat}</TableCell>
                  <TableCell>{i.biaya}</TableCell>
                  <TableCell>{i.keterangan}</TableCell>
                  <TableCell>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell align="right">Total</TableCell>
                <TableCell>
                  Rp.{" "}
                  {data[0].DetailReimburse.reduce((a, b) => (a = a + b.jumlah), 0).toLocaleString({ minimumFractionDigits: 0 })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <div className="mt-4 border-b border-t border-gray-200">
          <Row className="py-2">
            <Col sm="3">
              <label className="font-medium mr-2">Pemohon:</label>
              <label>{data[0].nama_pegawai}</label>
            </Col>
            <Col sm="3">
              <label className="font-medium mr-2">Yang Mengetahui:</label>
              <label>{data[0].yang_mengetahui}</label>
            </Col>
            <Col sm="3">
              <label className="font-medium mr-2">Yang Menyetujui:</label>
              <label>{data[0].yang_menyetujui}</label>
            </Col>
          </Row>
        </div>

        <div className="mt-4 float-right">
          <Button variant="primary" type="submit" onClick={print}>
            Cetak
          </Button>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerReimburse.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      DetailReimburse: true,
    },
  });

  const detail = await prisma.detailReimburse.findMany({
    where: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      data: header,
      data2: detail,
    },
  };
}
