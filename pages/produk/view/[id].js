import React from "react";
import Head from "next/head";
import Layout from "../../../components/Layout";
import { Row, Col, FormControl, Button, Card } from "react-bootstrap";
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
  TableSortLabel,
  TableBody,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function detailProduk({ data }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>Detail Produk & Jasa</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Produk & Jasa</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Detail Produk</h2>
          </Col>
          <Col sm="4" />
        </Row>
      </div>

      <Card body className="mt-4">
        <Row className="mb-2">
          <Col sm="8">
            <h3>Informasi</h3>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href={`../${id}`}>
                <a>
                  <Button variant="success">Ubah</Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div>
              <label className="font-medium mr-2">Nama Produk:</label>
              <label>{data[0].nama}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Kategori:</label>
              <label>{data[0].kategori.nama}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Deskrpsi:</label>
              <label>{data[0].deskripsi}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Harga:</label>
              <label>Rp. {data[0].harga.toLocaleString({ minimumFractionDigits: 0 })}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Akun Penjualan:</label>
              <label>{data[0].akun.nama_akun}</label>
            </div>
          </Col>
        </Row>

        <Row className="mt-8">
          <Col sm="8">
            <h4>Transaksi</h4>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead className="bg-dark">
                  <TableRow>
                    <TableCell>
                      <Typography className="text-white font-bold">Tanggal Transaksi</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold">Tipe Transaksi</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold">Jumlah</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const products = await prisma.produk.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun: true,
      kategori: true,
    },
  });

  return {
    props: {
      data: products,
    },
  };
}
