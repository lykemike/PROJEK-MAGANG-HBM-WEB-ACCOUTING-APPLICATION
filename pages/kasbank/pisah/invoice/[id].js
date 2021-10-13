import React from "react";
import Layout from "../../../../components/Layout";
import { Row, Col } from "react-bootstrap";
import {
  Breadcrumbs,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableFooter,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function InvoicePisah({ data }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      {data[0].tipe_transaksi == "Terima" ? (
        <>
          <div className="border-b border-gray-200">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary" className="mb-4">
                Terima Uang
              </Typography>
            </Breadcrumbs>
          </div>

          <div className="border-b border-gray-200">
            <Row className="mt-2">
              <Col>
                <Typography color="textPrimary">Transaksi</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 className="text-blue-600">Bank Deposit #{data[0].detail_bank_statement_id}</h2>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">Selasai</div>
              </Col>
            </Row>
          </div>

          <div className="border-b border-gray-200">
            <Row className="py-4">
              <Col>
                <Row>
                  <Typography color="textPrimary" className="px-4">
                    Setor Ke:
                  </Typography>
                  <Typography color="textPrimary">{data[0].akun.nama_akun}</Typography>
                </Row>
              </Col>
              <Col>
                <h4 className="d-flex justify-content-end">
                  Total: Rp. {data[0].nominal.toLocaleString({ minimumFractionDigits: 0 })}
                </h4>
              </Col>
            </Row>
          </div>

          <div className="border-b border-gray-200">
            <Row className="py-4">
              <Col sm="3">
                <Row>
                  <Typography color="textPrimary" className="px-4">
                    Tanggal Transaksi:
                  </Typography>
                  <Typography color="textPrimary">{data[0].tgl_transaksi}</Typography>
                </Row>
              </Col>
              <Col sm="4">
                <Row>
                  <Typography color="textPrimary" className="px-4">
                    No. Transaksi:
                  </Typography>
                  <Typography color="textPrimary">#{data[0].id}</Typography>
                </Row>
              </Col>
              <Col sm="5" />
            </Row>
          </div>

          <TableContainer component={Paper} className="mt-4">
            <Table size="small" aria-label="simple table">
              <TableHead className="bg-blue-500">
                <TableRow>
                  <TableCell>
                    <Typography className="text-white font-bold" align="left">
                      Akun
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Deskripsi</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Jumlah</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {data.slice(1).map((i, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    {i.akun.kode_akun} - {i.akun.nama_akun}
                  </TableCell>
                  <TableCell>{i.deskripsi}</TableCell>
                  <TableCell>Rp. {i.nominal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                </TableRow>
              ))}
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell>Total</TableCell>
                  <TableCell>Rp. {data[0].nominal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <div className="border-b border-gray-200">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary" className="mb-4">
                Bayar Uang
              </Typography>
            </Breadcrumbs>
          </div>

          <div className="border-b border-gray-200">
            <Row className="mt-2">
              <Col>
                <Typography color="textPrimary">Transaksi</Typography>
              </Col>
            </Row>
            <Row>
              <Col>
                <h2 className="text-blue-600">Bank Withdrawl #{data[0].detail_bank_statement_id}</h2>
              </Col>
              <Col>
                <div className="d-flex justify-content-end">Selasai</div>
              </Col>
            </Row>
          </div>

          <div className="border-b border-gray-200">
            <Row className="py-4">
              <Col>
                <Row>
                  <Typography color="textPrimary" className="px-4">
                    Bayar Dari:
                  </Typography>
                  <Typography color="textPrimary">{data[0].akun.nama_akun}</Typography>
                </Row>
              </Col>
              <Col>
                <h4 className="d-flex justify-content-end">
                  Total: Rp. {data[0].nominal.toLocaleString({ minimumFractionDigits: 0 })}
                </h4>
              </Col>
            </Row>
          </div>

          <div className="border-b border-gray-200">
            <Row className="py-4">
              <Col sm="3">
                <Row>
                  <Typography color="textPrimary" className="px-4">
                    Tanggal Transaksi:
                  </Typography>
                  <Typography color="textPrimary">{data[0].tgl_transaksi}</Typography>
                </Row>
              </Col>
              <Col sm="4">
                <Row>
                  <Typography color="textPrimary" className="px-4">
                    No. Transaksi:
                  </Typography>
                  <Typography color="textPrimary">#{data[0].id}</Typography>
                </Row>
              </Col>
              <Col sm="5" />
            </Row>
          </div>

          <TableContainer component={Paper} className="mt-4">
            <Table size="small" aria-label="simple table">
              <TableHead className="bg-blue-500">
                <TableRow>
                  <TableCell>
                    <Typography className="text-white font-bold" align="left">
                      Akun
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Deskripsi</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Jumlah</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              {data.slice(1).map((i, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    {i.akun.kode_akun} - {i.akun.nama_akun}
                  </TableCell>
                  <TableCell>{i.deskripsi}</TableCell>
                  <TableCell>Rp. {i.nominal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                </TableRow>
              ))}
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell>Total</TableCell>
                  <TableCell>Rp. {data[0].nominal.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const jurnal_bank_statement = await prisma.jurnalBankStatement.findMany({
    where: {
      detail_bank_statement_id: parseInt(id),
    },
    include: {
      akun: true,
    },
  });

  return {
    props: {
      data: jurnal_bank_statement,
    },
  };
}
