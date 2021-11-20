import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../../../components/Layout";
import { Form, Row, Col, Button, Card, Tab, Tabs, InputGroup, FormControl } from "react-bootstrap";
import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { BusinessCenterOutlined, AccountBalanceOutlined, DescriptionOutlined, SearchOutlined } from "@material-ui/icons/";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function BuatKontakBaru({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;

  function cancelButton() {
    router.push("../kontak/tabel-kontak");
  }

  return (
    <Layout>
      <Head>
        <title>Informasi Kontak</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Kontak</Typography>
        </Breadcrumbs>
        <h2 className="text-blue-600">Informasi Kontak</h2>
      </div>

      <div>
        <div className="mt-2">
          <Row>
            <Col sm="6">
              <h4>{data[0].nama_perusahaan}</h4>
              <label>Tipe: {data2.map((i) => i.kontak_type.nama + ", ")}</label>
            </Col>

            <Col sm="6">
              <div className="d-flex justify-content-end">
                <Link href={`../../kontak/${id}`}>
                  <a>
                    <Button variant="primary">Ubah</Button>
                  </a>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div variant="container" className="mt-4">
          <Tabs defaultActiveKey="profil" id="uncontrolled-tab-example">
            <Tab eventKey="profil" title="Profil" />
            <Tab eventKey="transaksi" title="Transaksi" />

            <div eventKey="profil">
              <div class="mt-4">
                <Card>
                  <Card.Body>
                    <Row>
                      <Col>
                        <h3>
                          <BusinessCenterOutlined fontSize="large" />
                          Informasi Umum
                        </h3>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="4">
                        <label className="font-medium mr-2 ">Nama Kontak</label>
                        <br />
                        <label>{data[0].nama}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">Nama Perusahaan</label>
                        <br />
                        <label>{data[0].nama_perusahaan}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">Telepon</label>
                        <br />
                        <label>{data[0].nomor_telepon}</label>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="4">
                        <label className="font-medium mr-2">Jabatan</label>
                        <br />
                        <label>{data[0].jabatan}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">Fax</label>
                        <br />
                        <label>{data[0].nomor_fax}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">NPWP</label>
                        <br />
                        <label>{data[0].nomor_npwp}</label>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="4">
                        <label className="font-medium mr-2">Email</label>
                        <br />
                        <label>{data[0].email}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">Alamat Perusahaan</label>
                        <br />
                        <label className="italic">{data[0].alamat_perusahaan}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">Handphone</label>
                        <br />
                        <label>{data[0].nomor_hp}</label>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card className="mt-2">
                  <Card.Body>
                    <Row>
                      <Col>
                        <h3>
                          <AccountBalanceOutlined fontSize="large" />
                          Akun Bank
                        </h3>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="4">
                        <label className="font-medium mr-2">Nama Bank</label>
                        <br />
                        <label>{data[0].nama_bank}</label>
                      </Col>

                      <Col sm="4">
                        <label className="font-medium mr-2">Nomor Rekening</label>
                        <br />
                        <label>{data[0].nomor_rekening}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">Atas Nama</label>
                        <br />
                        <label>{data[0].atas_nama}</label>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="4">
                        <label className="font-medium mr-2">Kantor Cabang Bank</label>
                        <br />
                        <label className="italic">{data[0].kantor_cabang_bank}</label>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card className="mt-2">
                  <Card.Body>
                    <Row>
                      <Col>
                        <h3>
                          <DescriptionOutlined fontSize="large" />
                          Pemetaan Akun
                        </h3>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm="4">
                        <label className="font-medium mr-2">Akun Piutang</label>
                        <br />
                        <label>{data[0].piutang.kode_akun + " - " + data[0].piutang.nama_akun}</label>
                      </Col>

                      <Col sm="4">
                        <label className="font-medium mr-2">Akun Hutang</label>
                        <br />
                        <label>{data[0].hutang.kode_akun + " - " + data[0].hutang.nama_akun}</label>
                      </Col>
                      <Col sm="4">
                        <label className="font-medium mr-2">Syarat Pembyaran Utama</label>
                        <br />
                        <label>{data[0].syarat_pembayaran}</label>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div eventKey="transaksi">
              <div class="mt-4">
                <Row>
                  <Col />
                  <Col sm="3" className="d-flex justify-content-end">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">
                          <SearchOutlined />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl placeholder="Cari" />
                    </InputGroup>
                  </Col>
                </Row>

                <div style={{ height: "30rem" }}>
                  <TableContainer className="mt-4" component={Paper}>
                    <Table size="small" aria-label="a dense table">
                      <TableHead className="bg-dark">
                        <TableRow>
                          <TableCell>
                            <Typography className="text-white font-bold">Tanggal</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography className="text-white font-bold">Nomor</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography className="text-white font-bold">Tanggal Jatuh Tempo</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography className="text-white font-bold">Status</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography className="text-white font-bold">Jumlah</Typography>
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>20/11/2021</TableCell>
                          <TableCell>Sales Invoice #0145</TableCell>
                          <TableCell>20/12/2021</TableCell>
                          <TableCell>Active</TableCell>
                          <TableCell>Rp. 140,000,000</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_kontak = await prisma.kontak.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      piutang: true,
      hutang: true,
    },
  });

  const get_kontak_detail = await prisma.kontakDetail.findMany({
    where: {
      kontak_id: parseInt(id),
    },
    include: {
      kontak_type: true,
    },
  });
  return {
    props: {
      data: get_kontak,
      data2: get_kontak_detail,
    },
  };
}
