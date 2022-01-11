import React from "react";
import Layout from "../../../components/layout";
import Head from "next/head";
import { Button, Row, Col, Form } from "react-bootstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PrintIcon from "@material-ui/icons/Print";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

import { Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Tables, TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";

export default function bank_transfer({ data }) {
  const router = useRouter();
  const { view } = router.query;

  function cetak() {
    router.push(`../cetak-transfer/${view}`);
  }

  return (
    <Layout>
      <Head>
        <title>Invoice Transfer Uang</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Bank Transfer #{view}</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <h3>Selasai</h3>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border-b border-gray-200">
        <Row className="py-2">
          <Col sm="4">
            <label className="mr-2 font-medium py-2">Transfer dari:</label>
            <label>{data[0].akun_transfer.nama_akun}</label>
          </Col>
          <Col sm="4">
            <label className="mr-2 font-medium py-2">Tanggal Transaksi:</label>
            <label>{data[0].tgl_transaksi}</label>
          </Col>
        </Row>

        <Row className="py-2">
          <Col sm="4">
            <label className="mr-2 font-medium py-2">Setor Ke:</label>
            <label>{data[0].akun_setor.nama_akun}</label>
          </Col>
          <Col sm="4">
            <label className="mr-2 font-medium py-2">Nomor Transaksi:</label>
            <label>Bank Transfer #{data[0].id}</label>
          </Col>
        </Row>

        <Row className="py-2">
          <Col sm="4">
            <label className="mr-2 font-medium py-2">Jumlah:</label>
            <label>Rp. {data[0].total.toLocaleString({ minimumFractionDigits: 0 })}</label>
          </Col>
          <Col sm="4">
            <label className="mr-2 font-medium py-2">Tag:</label>
            <label>{data[0].tag}</label>
          </Col>
        </Row>
      </div>

      <div className="mt-12">
        <Button variant="secondary mr-2">
          <ArrowBackIosIcon fontSize="medium" />
          Kembali
        </Button>
        <Button variant="primary" onClick={cetak}>
          <PrintIcon fontSize="medium" /> Cetak
        </Button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { view } = context.query;

  const transfer = await prisma.transferUang.findMany({
    where: {
      id: parseInt(view),
    },
    include: {
      akun_setor: true,
      akun_transfer: true,
    },
  });

  return {
    props: {
      data: transfer,
    },
  };
}
