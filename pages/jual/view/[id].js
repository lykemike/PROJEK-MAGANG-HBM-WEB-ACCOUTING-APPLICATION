import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { Row, Col, Button, DropdownButton, Dropdown, FormControl } from "react-bootstrap";

import { Breadcrumbs, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TableFooter } from "@material-ui/core";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function salesInvoice({ data, header }) {
  const router = useRouter();
  const { id } = router.query;

  function pembayaran() {
    router.push(`../pembayaran/${id}`);
  }

  function edit() {
    router.push(`../${id}`);
  }

  function cetak() {
    router.push(`../cetak/${id}`);
  }

  function cetak2() {
    router.push(`../proforma-invoice/${id}`);
  }

  const jurnal_penerimaan_pembayaran = header[0].JurnalPenerimaanPembayaran.filter((i) => i.tipe_saldo === "Debit").reduce((a, b) => (a = a + b.nominal), 0);

  return (
    <Layout>
      <Head>
        <title>Sales Invoice</title>
      </Head>

      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Sales Invoice #{id}</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">{header[0].sisa_tagihan > 0 ? <h3>Terbayar Sebagian</h3> : <h3 className="text-green-500">Lunas</h3>}</div>
          </Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <label className="font-medium mr-2">Pelanggan:</label>
            <label>{header[0].nama_perusahaan}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Email:</label>
            <label>{header[0].email}</label>
          </Col>

          <Col>
            <div className="d-flex justify-content-end">
              <h3>Total Amount</h3>
              <h3 className=" text-blue-600 ml-2">Rp. {header[0].sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</h3>
            </div>
          </Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <label className="font-medium mr-2">Alamat Penagihan:</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Tanggal Mulai Kontrak:</label>
            <label>{header[0].tgl_kontrak_mulai}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Nomor Kontrak:</label>
            <label>{header[0].nomor_kontrak}</label>
          </Col>
        </Row>

        <Row>
          <Col sm="4">
            <label>{header[0].alamat_penagihan}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Tanggal Habis Kontrak:</label>
            <label>{header[0].tgl_kontrak_expired}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">Syarat Pembayaran:</label>
            <label>{header[0].syarat_pembayaran.nama}</label>
          </Col>
        </Row>

        <Row>
          <Col sm="4">
            <label className="font-medium mr-2">NPWP:</label>
            <label>{header[0].nomor_npwp}</label>
          </Col>
          <Col sm="4">
            <label className="font-medium mr-2">No. Transaksi:</label>
            <label>Sales Invoice #{header[0].id}</label>
          </Col>
          <Col sm="4" />
        </Row>
      </div>

      <TableContainer className="mt-4" component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell>
                <Typography className="text-white font-bold">Produk</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Deskripsi</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Harga</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {header[0].DetailPenjualan.map((i, index) => (
              <TableRow key={index}>
                <TableCell>{i.produk_name}</TableCell>
                <TableCell>{i.produk_deskripsi}</TableCell>
                <TableCell>Rp. {i.produk_harga.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell />
            <TableCell align="right">SubTotal</TableCell>
            <TableCell>Rp. {header[0].subtotal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell align="right">{header[0].pajak_nama + " - " + header[0].pajak_persen + "%"}</TableCell>
            <TableCell>Rp. {header[0].pajak_hasil.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell align="right">Total</TableCell>
            <TableCell>Rp. {header[0].total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell align="right">Sisa Tagihan</TableCell>
            <TableCell>Rp. {header[0].sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>

      <Row className="mt-24">
        <Col sm="4">
          <DropdownButton variant="primary" id="dropdown-basic-button" title="Cetak">
            <Dropdown.Item onClick={cetak2}>Proforma Invoice</Dropdown.Item>
            <Dropdown.Item onClick={cetak}>Cetak</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col sm="4">
          {header[0].sisa_tagihan > 0 ? (
            <Button variant="primary" onClick={pembayaran}>
              Terima Pembayaran
            </Button>
          ) : null}
        </Col>
        <Col sm="4">
          <Row className="float-right row no-gutters">
            <Button variant="danger" className="mr-2">
              Kembali
            </Button>
            {header[0].PenerimaanPembayaran.length > 0 ? null : (
              <Button variant="success" onClick={edit}>
                Ubah
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerPenjualan.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      DetailPenjualan: {
        include: {
          produk: true,
        },
      },
      PenerimaanPembayaran: true,
      JurnalPenerimaanPembayaran: true,
      syarat_pembayaran: true,
    },
  });

  return {
    props: {
      header: header,
    },
  };
}
