import React from "react";
import Head from "next/head";
import Layout from "../../../components/Layout";
import { Row, Col } from "react-bootstrap";

import {
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

export default function jurnalentry({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Print Journal Entry</title>
      </Head>
      <div className="container">
        <div className="border-b border-gray-200">
          <Row>
            <Col sm="8">
              <h2 className="text-blue-600">Journal Entry #{id}</h2>
            </Col>
            <Col sm="4"></Col>
          </Row>
        </div>
        <div className="mt-4 mb-4">
          <Row>
            <Col sm="3">Tanggal Transaksi: {data[0].tgl_transaksi}</Col>
            <Col sm="6">No. Transaksi: Journal Entry #{data[0].no_transaksi}</Col>
          </Row>
        </div>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">No. Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Nama Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Deskripsi</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Debit (dalam IDR)</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography className="text-white font-bold">Kredit (dalam IDR)</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data2.map((i, index) => (
                <TableRow key={index}>
                  <TableCell>{i.akun.kode_akun}</TableCell>
                  <TableCell>{i.akun.nama_akun}</TableCell>
                  <TableCell>{i.deskripsi}</TableCell>
                  <TableCell>Rp. {i.debit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                  <TableCell>Rp. {i.kredit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell />
                <TableCell>
                  <Typography className="text-black">
                    Rp. {data[0].total_debit.toLocaleString({ minimumFractionDigits: 0 })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-black">
                    Rp. {data[0].total_kredit.toLocaleString({ minimumFractionDigits: 0 })}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerJurnal.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      DetailJurnal: true,
    },
  });

  const detail = await prisma.detailJurnal.findMany({
    where: {
      header_jurnal_id: parseInt(id),
    },
    include: {
      header_jurnal: true,
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
