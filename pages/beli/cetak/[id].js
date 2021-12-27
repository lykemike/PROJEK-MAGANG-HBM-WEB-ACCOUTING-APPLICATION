import React from "react";
import Layout from "../../../components/Layout";

import { Row, Col, Button } from "react-bootstrap";
import Head from "next/head";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";

import { Breadcrumbs, Typography, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TableFooter } from "@material-ui/core";

import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function salesInvoice({ header, data }) {
  const router = useRouter();
  const { id } = router.query;

  //   function pembayaran() {
  //     router.push(`../pembayaran/${id}`);
  //   }

  //   function edit() {
  //     router.push(`../${id}`);
  //   }

  //   function cetak() {
  //     router.push(`../cetak/${id}`);
  //   }

  const jurnal_pengiriman_pembayaran = header[0].JurnalPengirimanBayaran.filter((i) => i.tipe_saldo === "Debit").reduce(
    (a, b) => (a = a + b.nominal),
    0
  );

  return (
    <div className="container">
      <Head>
        <title>PrintPurchase Invoice</title>
      </Head>

      <div className="border-b border-gray-200">
        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Purchase Invoice #{id}</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              {header[0].sisa_tagihan > 0 ? <h3>Terbayar Sebagian</h3> : <h3 className="text-green-500">Lunas</h3>}
            </div>
          </Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Supplier:</p>
              {header[0].kontak.nama}
            </Row>
          </Col>
          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Email:</p>
              {header[0].email}
            </Row>
          </Col>

          <Col></Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Alamat Supplier:</p>
              {header[0].alamat_perusahaan}
            </Row>
          </Col>

          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Tanggal Transaksi:</p>
              {header[0].tgl_transaksi}
            </Row>
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Tanggal Jatuh Tempo:</p>
              {header[0].tgl_jatuh_tempo}
            </Row>
          </Col>

          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">No. Transaksi:</p>
              {header[0].custom_invoice}
            </Row>

            <Row class="row no-gutters">
              <p className="font-medium mr-2">No. Kontrak:</p>
              {header[0].no_ref_penagihan}
            </Row>
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Syarat Pembayaran:</p>
              {data.nama}
            </Row>
          </Col>
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
                <Typography className="text-white font-bold">Kuantitas</Typography>
              </TableCell>

              <TableCell>
                <Typography className="text-white font-bold">Harga Satuan</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Diskon</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Jumlah</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {header[0].DetailPembelian.map((i, index) => (
              <TableRow key={index}>
                <TableCell>{i.nama_akun_pembelian}</TableCell>
                <TableCell>{i.deskripsi}</TableCell>
                <TableCell>{i.kuantitas}</TableCell>

                <TableCell>
                  Rp.{" "}
                  {i.harga_satuan.toLocaleString({
                    minimumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell>Rp. {i.diskon}</TableCell>
                <TableCell>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />

            <TableCell align="right">SubTotal</TableCell>
            <TableCell>Rp. {header[0].subtotal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />

            <TableCell align="right">Diskon</TableCell>
            <TableCell>Rp. {header[0].total_diskon.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />

            <TableCell align="right">Pajak</TableCell>
            <TableCell>
              Rp.{" "}
              {header[0].total_pajak.toLocaleString({
                minimumFractionDigits: 0,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />

            <TableCell align="right">Total</TableCell>
            <TableCell>Rp. {header[0].sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />

            <TableCell />
            <TableCell align="right">Sisa Tagihan</TableCell>
            <TableCell>
              Rp.{" "}
              {header[0].sisa_tagihan.toLocaleString({
                minimumFractionDigits: 0,
              })}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <div className="d-flex justify-content-end mt-4">
        <h4>Total Amount</h4>
        <h4 className=" text-blue-600 ml-2">
          Rp.{" "}
          {header[0].sisa_tagihan.toLocaleString({
            minimumFractionDigits: 0,
          })}
        </h4>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerPembelian.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      DetailPembelian: true,

      JurnalPengirimanBayaran: true,
    },
  });

  const find_syarat_pembayaran = await prisma.syaratPembayaran.findFirst({
    where: {
      id: parseInt(header[0].syarat_pembayaran_id),
    },
  });

  return {
    props: {
      header: header,
      data: find_syarat_pembayaran,
    },
  };
}
