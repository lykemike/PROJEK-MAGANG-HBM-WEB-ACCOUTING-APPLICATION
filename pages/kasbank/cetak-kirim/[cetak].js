import React from "react";
import Layout from "../../../components/layout";
import Head from "next/head";
import { useRouter } from "next/router";

import { Button, Row, Col, Form } from "react-bootstrap";
import { Breadcrumbs, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TableFooter } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function InvoiceKirimuang({ data, data2 }) {
  const router = useRouter();
  const { cetak } = router.query;

  return (
    <div className="container">
      <Head>
        <title>Invoice Kirim Uang</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Bank Withdrawl #{cetak}</h2>
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
          <Col sm="4">
            <label className="mr-2 font-medium py-2">Bayar dari:</label>
            <label>{data[0].akun_bayar.nama_akun}</label>
          </Col>

          <Col sm="8">
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
            <label className="mr-2 font-medium py-2">Penerima:</label>
            <label>{data[0].kontak.nama_perusahaan}</label>
          </Col>

          <Col sm="3">
            <label className="mr-2 font-medium py-2">Tanggal Transaksi:</label>
            <label>{data[0].tgl_transaksi}</label>
          </Col>

          <Col sm="3">
            <label className="mr-2 font-medium py-2">Nomor Transaksi:</label>
            <label>Bank Withdrawl #{data[0].id}</label>
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
  const { cetak } = context.query;

  const header = await prisma.headerKirimUang.findMany({
    where: {
      id: parseInt(cetak),
    },
    include: {
      akun_bayar: true,
      kontak: true,
    },
  });

  const detail = await prisma.detailKirimUang.findMany({
    where: {
      header_kirim_uang_id: parseInt(cetak),
    },
    include: {
      header_kirim_uang: true,
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
