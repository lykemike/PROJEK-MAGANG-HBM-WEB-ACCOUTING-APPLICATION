import React from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../../components/layout";
import { Button, Row, Col, Form } from "react-bootstrap";
import PrintIcon from "@material-ui/icons/Print";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

import { Breadcrumbs, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TableFooter } from "@material-ui/core";

export default function InvoiceTerimaUang({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;

  function cetak() {
    router.push(`../cetak-terima/${id}`);
  }

  return (
    <div className="container">
      <Head>
        <title>Invoice Terima Uang</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Bank Deposit #{id}</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <h3>Selasai</h3>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border-b border-gray-200">
        <Row>
          <Col sm="6">
            <label className="mr-2 font-medium py-2">Bayar dari:</label>
            <label>{data[0].akun_setor.kode_akun + " - " + data[0].akun_setor.nama_akun}</label>
          </Col>

          <Col sm="6">
            <div className="d-flex justify-content-end">
              <h3 className="mr-2">Total Amount:</h3>
              <h3 className="text-blue-600">Rp. {data[0].total.toLocaleString({ minimumFractionDigits: 0 })}</h3>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border-b border-gray-200">
        <Row>
          <Col sm="3">
            <label className="mr-2 font-medium py-2">Pembayar:</label>
            <label>{data[0].kontak.nama_perusahaan}</label>
          </Col>

          <Col sm="3">
            <label className="mr-2 font-medium py-2">Tanggal Transaksi:</label>
            <label>{data[0].tgl_transaksi}</label>
          </Col>

          <Col sm="3">
            <label className="mr-2 font-medium py-2">Nomor Transaksi:</label>
            <label>Bank Deposit #{data[0].id}</label>
          </Col>
        </Row>
      </div>

      <TableContainer className="mt-4" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell>
                <Typography className="text-white font-bold">Akun</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Deskripsi</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Jumlah (in IDR)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((i, index) => (
              <TableRow key={index}>
                <TableCell>
                  {i.akun.kode_akun} - {i.akun.nama_akun}
                </TableCell>
                <TableCell>{i.deskripsi}</TableCell>
                <TableCell>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell />
            <TableCell align="right">Total</TableCell>
            <TableCell>Rp. {data[0].total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerTerimaUang.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun_setor: true,
      kontak: true,
    },
  });

  const detail = await prisma.detailTerimaUang.findMany({
    where: {
      header_terima_uang_id: parseInt(id),
    },
    include: {
      header_terima_uang: true,
      akun: true,
    },
  });

  return {
    props: {
      data: header,
      data2: detail,
    },
  };
}
