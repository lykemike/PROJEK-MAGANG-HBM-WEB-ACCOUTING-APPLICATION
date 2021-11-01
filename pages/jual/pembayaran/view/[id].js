import React from "react";
import Layout from "../../../../components/Layout";
import { Row, Col, Form, Table } from "react-bootstrap";
import Link from "next/Link";
import {
  Breadcrumbs,
  Table as Tables,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableFooter,
} from "@material-ui/core/";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function BayarNanti({ data2 }) {
  return (
    <Layout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="../../../jual/penjualan">
          Tabel Penjualan
        </Link>
        <Typography color="textPrimary">Penerimaan Pembayaran</Typography>
      </Breadcrumbs>
      <h2 className="text-blue-600">Penerimaan Pembayaran</h2>
      <div className="border-t border-gray-200">
        <Row sm="12" className="py-2">
          <Col sm="3">
            <label>Pelanggan: {data2[0].header_penjualan.kontak.nama}</label>
          </Col>

          <Col sm="3">
            <label>Setor Ke: {data2[0].akun.nama_akun}</label>
          </Col>

          <Col className="d-flex justify-content-end mr-3">
            <Row>
              <h4 className="mr-2">Total</h4>
              <h4>Rp. {data2[0].jumlah.toLocaleString({ minimumFractionDigits: 0 })}</h4>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="border-t border-b border-gray-200">
        <Row sm="12" className="py-2">
          <Col sm="3">
            <label>Cara Pembayaran: {data2[0].cara_pembayaran} </label>
          </Col>

          <Col sm="3">
            <label>Tanggal Pembayaran: {data2[0].tgl_pembayaran} </label>
          </Col>

          <Col sm="3">
            <label>Tanggal Jatuh Tempo: {data2[0].tgl_jauth_tempo}</label>
          </Col>

          <Col sm="3">
            <label>No. Transaksi: {data2[0].id} </label>
          </Col>
        </Row>
      </div>

      <TableContainer className="mt-8" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell>
                <Typography className="text-white font-bold">Nomor</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Deskripsi</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Tanggal Jatuh Tempo</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Total</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Sisa Tagihan</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Jumlah</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((i, index) => (
              <TableRow>
                <TableCell>Penerimaan Pembayaran Invoice #{i.id}</TableCell>
                <TableCell> {i.header_penjualan.memo}</TableCell>
                <TableCell>{i.header_penjualan.tgl_jatuh_tempo}</TableCell>
                <TableCell>Rp. {i.header_penjualan.total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                <TableCell>Rp. {i.header_penjualan.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                <TableCell>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell align="right">Total</TableCell>
              <TableCell>
                Rp. {data2.reduce((a, b) => (a = a + b.jumlah), 0).toLocaleString({ minimumFractionDigits: 0 })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const detail = await prisma.penerimaanPembayaran.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      header_penjualan: {
        include: {
          kontak: true,
        },
      },
      akun: true,
    },
  });

  return {
    props: {
      data2: detail,
    },
  };
}
