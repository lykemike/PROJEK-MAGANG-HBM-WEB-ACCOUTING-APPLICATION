import React from "react";
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

  console.log(data);
  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="../../produk/tabel-produk">
            Table Produk
          </Link>
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
                  <Button variant="primary">Ubah</Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="8">
            <Row class="row no-gutters">
              <p className="text-2xl">Nama Produk: {data[0].nama}</p>
            </Row>
            <Row class="row no-gutters">
              <p className="text-2xl">Kode Produk: {data[0].kode_sku}</p>
            </Row>
            <Row class="row no-gutters">
              <p className="text-2xl">Satuan Produk: {data[0].satuan}</p>
            </Row>
            <Row class="row no-gutters">
              <p className="text-2xl">Kategori Produk: {data[0].kategori_produk}</p>
            </Row>
            <Row class="row no-gutters">
              <p className="text-2xl">Keterangan: {data[0].deskripsi}</p>
            </Row>

            <TableContainer className="mt-4" component={Paper}>
              <h4>Transaksi</h4>
              <Table size="small" aria-label="a dense table">
                <TableHead className="bg-dark">
                  <TableRow>
                    <TableCell>
                      <Typography className="text-white font-bold">Tanggal</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold">Tipe</Typography>
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
          <Col sm="4">
            <div class="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
              <div class="px-4 py-2 bg-blue-300 flex items-center justify-between">
                <h1 class="text-xl font-gray-700 font-bold">Penjualan</h1>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">Harga Jual Satuan</h3>
              </div>
              <div class="px-4 flex space-x-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">
                  Rp. {data[0].harga_jual_satuan.toLocaleString({ minimumFractionDigits: 0 })}
                </h3>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">Akun Penjualan</h3>
              </div>
              <div class="px-4 flex space-x-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">
                  {data[0].akun_penjualan == 1 ? "-" : data[0].penjualan.nama_akun}
                </h3>
              </div>
            </div>
            <div class="mt-8 bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
              <div class="px-4 py-2 bg-blue-300 flex items-center justify-between">
                <h1 class="text-xl font-gray-700 font-bold">Pembelian</h1>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">Harga Beli Satuan</h3>
              </div>
              <div class="px-4 flex space-x-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">
                  Rp. {data[0].harga_beli_satuan.toLocaleString({ minimumFractionDigits: 0 })}
                </h3>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">Akun Pembelian</h3>
              </div>
              <div class="px-4 flex space-x-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">
                  {data[0].akun_pembelian == 1 ? "-" : data[0].pembelian.nama_akun}
                </h3>
              </div>
            </div>
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
      pembelian: true,
      penjualan: true,
    },
  });

  return {
    props: {
      data: products,
    },
  };
}
