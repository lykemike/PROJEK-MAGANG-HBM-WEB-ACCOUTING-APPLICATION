import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, Form, Button } from "react-bootstrap";
import Link from "next/link";

import {
  Breadcrumbs,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableFooter,
} from "@material-ui/core";

import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Expense({ data, data2 }) {
  // Redirect Function and Take URL Parameter [id]
  const router = useRouter();
  const { id } = router.query;

  function pembayaran() {
    router.push(`../pembayaran/${id}`);
  }

  const totalPajak = data2.reduce((a, b) => (a = a + b.hasil_pajak), 0);

  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Expense #{id}</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              {data[0].sisa_tagihan > 0 ? (
                <h3 className="float-right">Belum Dibayar</h3>
              ) : (
                <h3 className="float-right text-green-500">Lunas</h3>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <div className="py-4 border-b border-gray-200">
        <Row>
          <Col className="font-medium" sm="2">
            Bayar Dari:
          </Col>
          <Col sm="8">{data[0].akun1.nama_akun}</Col>
        </Row>
      </div>

      <div className="py-4 border-b border-gray-200">
        <Row>
          <Col className="font-medium" sm="2">
            Penerima:
          </Col>
          <Col sm="2">{data[0].kontak.nama}</Col>

          <Col className="font-medium" sm="2">
            Tanggal Transaksi:
          </Col>
          <Col sm="2">{data[0].tgl_transaksi}</Col>

          <Col className="font-medium" sm="2">
            Nomor Trasaksi:
          </Col>
          <Col sm="2">Expense #{data[0].no_transaksi}</Col>
        </Row>

        <Row className="mt-2">
          <Col className="font-medium" sm="2">
            Alamat Penagihan:
          </Col>
          <Col sm="2">{data[0].alamat_penagihan}</Col>

          <Col className="font-medium" sm="2">
            Tag:
          </Col>
          <Col sm="2">{data[0].tag}</Col>

          <Col className="font-medium" sm="2">
            Cara Pembayaran:
          </Col>
          <Col sm="2">{data[0].cara_pembayaran}</Col>
        </Row>
      </div>

      <TableContainer className="mt-4" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell>
                <Typography className="text-white font-bold">Akun Biaya</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Deskripsi</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Pajak</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Jumlah (dalam IDR)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2.map((i, index) => (
              <TableRow key={index}>
                <TableCell>{i.akun_biaya.nama_akun}</TableCell>
                <TableCell>{i.deskripsi}</TableCell>
                <TableCell>
                  {i.pajak.nama} - {i.pajak.presentasaAktif}%
                </TableCell>
                <TableCell>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="right">SubTotal</TableCell>
            <TableCell>Rp. {data[0].subtotal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="right">Pajak</TableCell>
            <TableCell>Rp. {totalPajak.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="right">Total</TableCell>
            <TableCell>Rp. {data[0].total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="right">Pemotongan</TableCell>
            <TableCell>Rp. {data[0].pemotongan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="right">Sisa Tagihan</TableCell>
            <TableCell>Rp. {data[0].sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <div>
        <Row className="mt-32">
          <Col className="d-flex justify-content-end">
            <Button variant="danger" className="mr-4">
              Kembali
            </Button>
            <Button variant="success" onClick={pembayaran}>
              Bayar
            </Button>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  // Get biaya from API
  const getheaderbiaya = await prisma.headerBiaya.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun1: true,
      akun2: true,
      kontak: true,
      detail_biaya: true,
    },
  });

  const getdetailbiaya = await prisma.detailBiaya.findMany({
    where: {
      header_biaya_id: parseInt(id),
    },
    include: {
      header_biaya: true,
      akun_biaya: true,
      pajak: true,
    },
  });

  return {
    props: {
      data: getheaderbiaya,
      data2: getdetailbiaya,
    },
  };
}
