import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../../../components/Layout";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import Link from "next/Link";
import { Breadcrumbs, Table as Tables, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TableFooter } from "@material-ui/core/";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
import { filter } from "lodash";
const prisma = new PrismaClient();

export default function View({ data }) {
  const router = useRouter();
  const { view } = router.query;
  function cetak() {
    router.push(`../cetak/${view}`);
  }

  return (
    <Layout>
      <Head>
        <title>Overview Penerimaan Pembayaran</title>
      </Head>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Transaksi</Typography>
      </Breadcrumbs>
      <h2 className="text-blue-600">Penerimaan Pembayaran</h2>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <label className="font-medium mr-2">Pelanggan:</label>
            <label>{data[0].header_penjualan.nama_perusahaan}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Setor Ke:</label>
            <label>{data[0].akun.nama_akun}</label>
          </Col>

          <Col>
            <div className="d-flex justify-content-end">
              <h4>INVOICE</h4>
            </div>
          </Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <label className="font-medium mr-2">Nomor Transaksi:</label>
            <label>Sales Invoice #{data[0].header_penjualan.id}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Tanggal Pembayaran:</label>
            <label>{data[0].date}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Nomor Kontrak:</label>
            <label>{data[0].header_penjualan.nomor_kontrak}</label>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col sm="4" />
          <Col sm="4">
            <label className="font-medium mr-2">Tanggal Kontrak:</label>
            <label>{data[0].header_penjualan.tgl_kontrak_mulai}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Nomor Invoice Custom:</label>
            <label>{data[0].header_penjualan.custom_invoice}</label>
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
                <Typography className="text-white font-bold">Total</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Sisa Tagihan</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">%</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Jumlah</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((i, index) => (
              <TableRow>
                <TableCell style={{ minWidth: 400, width: 400 }}>Sales Invoice #{i.id}</TableCell>
                <TableCell style={{ minWidth: 300, width: 300 }}>{i.deskripsi}</TableCell>
                <TableCell style={{ minWidth: 250, width: 250 }}>Rp. {i.header_penjualan.total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                <TableCell style={{ minWidth: 250, width: 250 }}>Rp. {i.header_penjualan.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                <TableCell style={{ minWidth: 100, width: 100 }}>{i.presentase_penagihan}%</TableCell>
                <TableCell style={{ minWidth: 200, width: 200 }}>Rp. {i.tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell>Jumlah Tagihan Sebelum {data[0].pajak.nama + " - " + data[0].pajak.presentase_aktif + "%"}</TableCell>
              <TableCell>Rp. {data[0].tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{data[0].header_penjualan.pajak.nama + " - " + data[0].header_penjualan.pajak.presentase_aktif + "%"}</TableCell>
              <TableCell>Rp. {data[0].pajak_keluaran_total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jumlah Tagihan Setelah {data[0].header_penjualan.pajak.nama + " - " + data[0].header_penjualan.pajak.presentase_aktif + "%"}</TableCell>
              <TableCell>Rp. {data[0].tagihan_setelah_pajak.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Terbilang</TableCell>
              <TableCell>{data[0].say}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Row className="mt-8">
        <Col sm="6">
          <label className="font-medium mr-2">Bank:</label>
          <label>{data[0].bank.nama_bank + " (" + data[0].bank.nomor_rekening + ")"}</label>
        </Col>
      </Row>

      <Row>
        <Col sm="5">
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Lihat Jurnal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead className="bg-blue-200">
                    <TableRow>
                      <TableCell>Nama Akun</TableCell>
                      <TableCell>Debit</TableCell>
                      <TableCell>Kredit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data[0].header_penjualan.tipe_perusahaan == "false"
                      ? data[0].JurnalPenerimaanPembayaran.slice(0, 3).map((i, index) => (
                          <TableRow key={index}>
                            <TableCell>{i.akun.kode_akun + " - " + i.akun.nama_akun}</TableCell>
                            <TableCell>{i.tipe_saldo == "Debit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                            <TableCell>{i.tipe_saldo == "Kredit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                          </TableRow>
                        ))
                      : data[0].JurnalPenerimaanPembayaran.slice(0, 4).map((i, index) => (
                          <TableRow key={index}>
                            <TableCell>{i.akun.kode_akun + " - " + i.akun.nama_akun}</TableCell>
                            <TableCell>{i.tipe_saldo == "Debit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                            <TableCell>{i.tipe_saldo == "Kredit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                          </TableRow>
                        ))}
                  </TableBody>

                  {data[0].status == "Process" ? null : (
                    <TableBody>
                      <TableCell className="font-medium">Jurnal Done</TableCell>
                      <TableCell />
                      <TableCell />
                    </TableBody>
                  )}

                  {data[0].header_penjualan.tipe_perusahaan == "false"
                    ? data[0].JurnalPenerimaanPembayaran.slice(3, 5).map((i, index) => (
                        <TableRow key={index}>
                          <TableCell>{i.akun.kode_akun + " - " + i.akun.nama_akun}</TableCell>
                          <TableCell>{i.tipe_saldo == "Debit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                          <TableCell>{i.tipe_saldo == "Kredit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                        </TableRow>
                      ))
                    : data[0].JurnalPenerimaanPembayaran.slice(4, 6).map((i, index) => (
                        <TableRow key={index}>
                          <TableCell>{i.akun.kode_akun + " - " + i.akun.nama_akun}</TableCell>
                          <TableCell>{i.tipe_saldo == "Debit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                          <TableCell>{i.tipe_saldo == "Kredit" ? "Rp. " + i.nominal.toLocaleString({ minimumFractionDigits: 0 }) : null}</TableCell>
                        </TableRow>
                      ))}
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Col>
      </Row>
      <Row className="mt-20">
        <Col sm="4" />
        <Col sm="4">
          <Button variant="primary" onClick={cetak}>
            Cetak
          </Button>
        </Col>
        <Col sm="4" />
      </Row>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { view } = context.query;

  const detail = await prisma.penerimaanPembayaran.findMany({
    where: {
      id: parseInt(view),
    },
    include: {
      pajak: true,
      akun: true,
      JurnalPenerimaanPembayaran: {
        include: {
          akun: true,
        },
      },
      header_penjualan: {
        include: {
          kontak: true,
          DetailPenjualan: true,
          pajak: true,
        },
      },
      bank: {
        include: {
          akun: true,
        },
      },
    },
  });

  return {
    props: {
      data: detail,
    },
  };
}
