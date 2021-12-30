import React from "react";
import Link from "next/link";
import Head from "next/head";

import Layout from "../../../../components/Layout";
import { Row, Col, Button } from "react-bootstrap";
import { Breadcrumbs, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TableFooter } from "@material-ui/core";

import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Expense({ data }) {
  const router = useRouter();
  const { cetak } = router.query;

  return (
    <div className="container">
      <Head>
        <title>Cetak Biaya</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Expense #{cetak}</h2>
          </Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <label className="font-medium mr-2">Bayar Dari:</label>
            <label>{data[0].akun.nama_akun}</label>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <h3>Total Amount</h3>
              <h3 className=" text-blue-600 ml-2">Rp. {data[0].total.toLocaleString({ minimumFractionDigits: 0 })}</h3>
            </div>
          </Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="3">
            <label className="font-medium mr-2">No. Transaksi:</label>
            <label>Expense #{data[0].id}</label>
          </Col>
          <Col sm="3">
            <label className="font-medium mr-2">Tanggal Transaksi:</label>
            <label>{data[0].tgl_transaksi}</label>
          </Col>
          <Col sm="3">
            <label className="font-medium mr-2">Cara Pembayaran:</label>
            <label>{data[0].cara_pembayaran.nama}</label>
          </Col>
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
                <Typography className="text-white font-bold">Pajak Masukan</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Pajak Keluaran</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Jumlah (dalam IDR)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data[0].DetailBiaya.map((i, index) => (
              <TableRow key={index}>
                <TableCell>{i.akun.kode_akun + " - " + i.akun.nama_akun}</TableCell>
                <TableCell>{i.deskripsi}</TableCell>
                <TableCell>
                  Rp.{" "}
                  {data[0].harga_termasuk_pajak == "false"
                    ? i.pajak_masukan_per_baris.toLocaleString({ minimumFractionDigits: 0 })
                    : i.termasuk_pajak_masukan.toLocaleString({ minimumFractionDigits: 0 })}
                </TableCell>
                <TableCell>
                  Rp.{" "}
                  {data[0].harga_termasuk_pajak == "false"
                    ? i.pajak_keluaran_per_baris.toLocaleString({ minimumFractionDigits: 0 })
                    : i.termasuk_pajak_keluaran.toLocaleString({ minimumFractionDigits: 0 })}
                </TableCell>
                {/* <TableCell style={{ minWidth: 300, width: 300 }}>{i.pajak_nama == "-" ? "-" : i.pajak.nama + " - " + i.pajak.presentase_aktif + "%"}</TableCell> */}
                <TableCell style={{ minWidth: 300, width: 300 }}>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align="right">Subtotal</TableCell>
            <TableCell>Rp. {data[0].subtotal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align="right">Pajak Masukan Total</TableCell>
            <TableCell>Rp. {data[0].pajak_masukan_total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align="right">Pajak Keluaran Total</TableCell>
            <TableCell>Rp. {data[0].pajak_keluaran_total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell />
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

  const get_header_biaya = await prisma.headerBiaya.findMany({
    where: {
      id: parseInt(cetak),
    },
    include: {
      DetailBiaya: {
        include: {
          akun: true,
          pajak_keluaran: true,
          pajak_masukan: true,
        },
      },
      JurnalBiaya: true,
      akun: true,
      cara_pembayaran: true,
    },
  });

  return {
    props: {
      data: get_header_biaya,
    },
  };
}
