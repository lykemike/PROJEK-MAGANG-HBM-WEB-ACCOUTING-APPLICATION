import React from "react";
import Head from "next/head";
import Layout from "../../../components/Layout";
import { Row, Col, FormControl, Button, Card } from "react-bootstrap";
import { Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableSortLabel, TableBody } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
export default function detailProduk({ data }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(data);
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
              <label>{data.nama}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Kategori:</label>
              <label>{data.kategori.nama}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Deskrpsi:</label>
              <label>{data.deskripsi}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Harga:</label>
              <label>Rp. {data.harga.toLocaleString({ minimumFractionDigits: 0 })}</label>
            </div>
            <div>
              <label className="font-medium mr-2">Akun Penjualan:</label>
              <label>{data.akun.nama_akun}</label>
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
                    <TableCell align="right" />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.DetailPenjualan.map((i, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ minWidth: 200, width: 200 }}>{i.header_penjualan.tgl_kontrak_mulai}</TableCell>

                      <TableCell style={{ minWidth: 200, width: 200 }}>{i.header_penjualan.tipe_perusahaan == "false" ? "Negeri" : "Swasta"}</TableCell>
                      <TableCell style={{ minWidth: 200, width: 200 }}>Rp. {i.header_penjualan.sisa_tagihan.toLocaleString()}</TableCell>
                      <TableCell align="right" style={{ minWidth: 50, width: 50 }}>
                        <Link href={`../../jual/view/${i.header_penjualan.id}`}>
                          <a>
                            <Button variant="secondary" size="sm" className="mr-2">
                              <OpenInNewIcon className="text-white" fontSize="small" />
                            </Button>
                          </a>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
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

  const products = await prisma.produk.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      akun: true,
      kategori: true,
      DetailPenjualan: {
        include: {
          header_penjualan: true,
        },
      },
    },
  });

  return {
    props: {
      data: products,
    },
  };
}
