import React from "react";
import Head from "next/head";
import Layout from "../../../components/Layout";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function purchaseInvoice({ header, data }) {
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
    router.push(`../cetak2/${id}`);
  }

  const jurnal_pengiriman_pembayaran = header[0].JurnalPengirimanBayaran.filter((i) => i.tipe_saldo === "Debit").reduce(
    (a, b) => (a = a + b.nominal),
    0
  );
  return (
    <Layout>
      <Head>
        <title>Purchase Invoice</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className=" text-blue-600">Purchase Invoice #{id}</h2>
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
              <p className="font-medium ml-2">Supplier: </p>
              {header[0].kontak.nama}
            </Row>
          </Col>
          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Email: </p>
              {header[0].email}
            </Row>
          </Col>
          <Col sm="4">
            <Row className="mt-2 mb-3 float-right">
              <h3>Total Amount</h3>
              <h3 className=" text-blue-600 ml-2">
                Rp.{" "}
                {header[0].sisa_tagihan.toLocaleString({
                  minimumFractionDigits: 0,
                })}
              </h3>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="py-2 border-b border-gray-200">
        <Row>
          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Alamat Supplier: </p>
              {header[0].alamat_supplier}
            </Row>
          </Col>

          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Tanggal Transaksi: </p>
              {header[0].tgl_transaksi}
            </Row>
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Tanggal Jatuh Tempo: </p>
              {header[0].tgl_jatuh_tempo}
            </Row>
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Syarat Pembayaran: </p>
              {data.nama_pembayaran}
            </Row>
          </Col>

          <Col sm="4">
            <Row class="row no-gutters">
              <p className="font-medium mr-2">No. Transaksi:</p>
              {header[0].no_transaksi}
            </Row>
            <Row class="row no-gutters">
              <p className="font-medium mr-2">Tag: </p>
              {header[0].tag}
            </Row>
            <Row class="row no-gutters">
              <p className="font-medium mr-2">No. Referensi: </p>
              {header[0].no_ref_penagihan}
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
                <Typography className="text-white font-bold">Satuan</Typography>
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
                <TableCell>{i.produk.nama}</TableCell>
                <TableCell>{i.desk_produk}</TableCell>
                <TableCell>{i.kuantitas}</TableCell>
                <TableCell>{i.satuan}</TableCell>
                <TableCell>
                  Rp.{" "}
                  {i.harga_satuan.toLocaleString({
                    minimumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell>{i.diskon}%</TableCell>
                <TableCell>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell />
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
            <TableCell />
            <TableCell align="right">Diskon</TableCell>
            <TableCell>
              Rp. {(header[0].total_diskon + header[0].total_diskon_per_baris).toLocaleString({ minimumFractionDigits: 0 })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align="right">Total</TableCell>
            <TableCell>Rp. {header[0].total.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align="right">Jumlah Pemotongan</TableCell>
            <TableCell>
              Rp.{" "}
              {header[0].pemotongan.toLocaleString({
                minimumFractionDigits: 0,
              })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell align="right">Sudah Dibayar</TableCell>
            <TableCell>
              Rp. {(header[0].uang_muka + jurnal_pengiriman_pembayaran).toLocaleString({ minimumFractionDigits: 0 })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
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

      <Row className="mt-24">
        <Col sm="4"></Col>
        <Col sm="4">
          <Row className="row no-gutters">
            <Button variant="primary" className="mr-2" onClick={cetak}>
              Cetak
            </Button>
            <Button variant="primary" onClick={pembayaran}>
              Kirim Pembayaran
            </Button>
          </Row>
        </Col>
        <Col sm="4">
          <Row className="float-right row no-gutters">
            <Button variant="danger" className="mr-2">
              Kembali
            </Button>
            <Button variant="success" onClick={edit}>
              Ubah
            </Button>
          </Row>
        </Col>
      </Row>
    </Layout>
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
      DetailPembelian: {
        include: {
          produk: true,
          pajak: true,
        },
      },
      JurnalPengirimanBayaran: true,
    },
  });

  const find_syarat_pembayaran = await prisma.syaratPembayaran.findFirst({
    where: {
      value: parseInt(header[0].syarat_pembayaran),
    },
  });

  return {
    props: {
      header: header,
      data: find_syarat_pembayaran,
    },
  };
}
