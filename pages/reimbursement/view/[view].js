import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/layout";
import { Button, DropdownButton, InputGroup, FormControl, Dropdown, Row, Col, Form, Card } from "react-bootstrap";
import { Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TableFooter } from "@material-ui/core";
import * as Yup from "yup";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function invoice_reimbursement({ data }) {
  const router = useRouter();
  const { view } = router.query;

  function print() {
    router.push(`../view/print/${view}`);
  }

  return (
    <Layout>
      <Head>
        <title>Reimbursement Overview</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Reimbursement Overview</Typography>
        </Breadcrumbs>
        <h2 className="text-blue-600">Reimbursement #{view}</h2>
      </div>

      <div className="border-b border-gray-200">
        <Row className="py-2">
          <Col sm="3">
            <label className="font-medium mr-2">Nama Pegawai:</label>
            <label>{data.nama_pegawai}</label>
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
            {data.DetailReimburse.map((i, index) => (
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
              <TableCell>Rp. {data.total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <div className="mt-4 border-b border-t border-gray-200">
        <Row className="py-2">
          <Col sm="3">
            <label className="font-medium mr-2">Pemohon:</label>
            <label>{data.nama_pegawai}</label>
          </Col>
          <Col sm="3">
            <label className="font-medium mr-2">Yang Mengetahui:</label>
            <label>{data.yang_mengetahui}</label>
          </Col>
          <Col sm="3">
            <label className="font-medium mr-2">Yang Menyetujui:</label>
            <label>{data.yang_menyetujui}</label>
          </Col>
        </Row>
      </div>

      <div className="mt-4 float-right">
        <Button variant="primary" type="submit" onClick={print}>
          Cetak
        </Button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { view } = context.query;

  const header = await prisma.headerReimburse.findFirst({
    where: {
      id: parseInt(view),
    },
    include: {
      DetailReimburse: true,
    },
  });

  return {
    props: {
      data: header,
    },
  };
}
