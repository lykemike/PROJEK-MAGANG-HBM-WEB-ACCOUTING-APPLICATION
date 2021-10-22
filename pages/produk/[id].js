import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";
import { Button, Form, Col, Row, FormCheck, Card } from "react-bootstrap";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Select from "react-select";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form as Forms, Field } from "formik";
import Axios from "axios";

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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function updateProduk({
  produk,
  satuan,
  curr_satuan,
  kategori,
  curr_kategori,
  akun_beli,
  curr_akun_beli,
  akun_jual,
  curr_akun_jual,
}) {
  const router = useRouter();
  const { id } = router.query;

  const api_update_produk = "http://localhost:3000/api/produk/updateProduk";

  function cancelButton() {
    router.push("../produk/tabel-produk");
  }

  console.log(Boolean(produk[0].beli_disabled));

  return (
    <Layout>
      <Formik
        initialValues={{
          id: id,
          file_upload: [],
          nama: produk[0].nama,
          kode_sku: produk[0].kode_sku,
          kategori_produk: curr_kategori[0].label,
          unit: curr_satuan[0].label,
          quantity: produk[0].quantity,
          deskripsi: produk[0].deskripsi,
          hbs: produk[0].harga_beli_satuan,
          akun_pembelian: curr_akun_beli[0].value,
          akun_pembelian_nama: curr_akun_beli[0].label,
          hjs: produk[0].harga_jual_satuan,
          akun_penjualan: curr_akun_jual[0].value,
          akun_penjualan_nama: curr_akun_jual[0].label,
          beli_disable: Boolean(produk[0].beli_disabled),
          jual_disable: Boolean(produk[0].jual_disabled),
        }}
        // validationSchema={ProdukSchema}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            formData.append(`${key}`, `${values[key]}`);
          }
          Array.from(values.file_upload).map((i) => formData.append("file", i));
          Axios.put(api_update_produk, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              router.push("../produk/tabel-produk");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Head>
              <title>Update Produk</title>
            </Head>

            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../tabel-produk">
                  Tabel Produk
                </Link>
                <Typography color="textPrimary">Update Produk & Jasa</Typography>
              </Breadcrumbs>

              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Update Produk & Jasa</h2>
                </Col>
              </Row>
            </div>
            <Card className="mt-4">
              <Card.Body>
                <Row className="mb-2">
                  <Col sm="2">
                    <label>Gambar</label>
                  </Col>
                  <Col sm="4">
                    <Form.File
                      type="file"
                      name="file_upload"
                      accept="image/*"
                      onChange={(e) => props.setFieldValue("file_upload", e.target.files)}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Nama</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control className="mb-2" placeholder={produk[0].nama} name="nama" onChange={props.handleChange} />
                    {props.errors.nama && props.touched.nama ? (
                      <div class="text-red-500 text-sm">
                        <ErrorOutlineIcon />
                        {props.errors.nama}
                      </div>
                    ) : null}
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Kode / SKU</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      className="mb-2"
                      placeholder={produk[0].kode_sku}
                      name="kode_sku"
                      onChange={props.handleChange}
                    />
                    {props.errors.kode_sku && props.touched.kode_sku ? (
                      <div class="text-red-500 text-sm">
                        <ErrorOutlineIcon />
                        {props.errors.kode_sku}
                      </div>
                    ) : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm="2">
                    <label>Kategori</label>
                  </Col>
                  <Col sm="4">
                    <Select
                      options={kategori}
                      placeholder={props.values.kategori_produk}
                      name="kategori_produk"
                      onChange={(e) => {
                        props.setFieldValue("kategori_produk", e.label);
                        props.setFieldValue("kategori_produk_id", e.value);
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm="2">
                    <label>Unit</label>
                  </Col>
                  <Col sm="4">
                    <Select
                      options={satuan}
                      placeholder={props.values.unit}
                      type="number"
                      min="0"
                      name="unit"
                      onChange={(e) => {
                        props.setFieldValue("unit", e.label);
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm="2">
                    <label>Quantity</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control type="number" placeholder={produk[0].quantity} name="quantity" onChange={props.handleChange} />
                  </Col>
                </Row>

                <Row className="mb-12">
                  <Col sm="2">
                    <label>Deskripsi</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      className="mb-2"
                      placeholder={produk[0].deskripsi}
                      name="deskripsi"
                      onChange={props.handleChange}
                    />
                    {props.errors.deskripsi && props.touched.deskripsi ? (
                      <div class="text-red-500 text-sm">
                        <ErrorOutlineIcon />
                        {props.errors.deskripsi}
                      </div>
                    ) : null}
                  </Col>
                </Row>

                <div>
                  <h4>Harga</h4>
                </div>

                <div className="border-b border-gray-200">
                  <Row className="px-4 py-2 border-t border-b border-gray-200">
                    <FormCheck
                      onChange={(e) => {
                        if (e.target.checked == true) {
                          props.setFieldValue(`beli_disable`, false);
                        } else {
                          props.setFieldValue(`beli_disable`, true);
                        }
                      }}
                    />
                    <h5>Saya Beli Produk Ini</h5>
                  </Row>

                  <Row sm="12" className="mt-2 mb-2">
                    <Col sm="2">
                      <label>Harga Beli Satuan</label>
                      <Form.Control
                        disabled={props.values.beli_disable}
                        type="number"
                        min="0"
                        placeholder={"Rp. " + props.values.hbs.toLocaleString({ minimumFractionDigits: 0 })}
                        className="mb-2"
                        name="hbs"
                        onChange={props.handleChange}
                      />
                    </Col>
                    <Col sm="3">
                      <label>Akun Pembelian</label>
                      <Select
                        isDisabled={props.values.beli_disable}
                        placeholder={props.values.akun_pembelian_nama}
                        options={akun_beli}
                        name="akun_pembelian"
                        onChange={(e) => {
                          props.setFieldValue("akun_pembelian", e.value);
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="px-4 py-2 border-t border-b border-gray-200">
                    <FormCheck
                      onChange={(e) => {
                        if (e.target.checked == true) {
                          props.setFieldValue(`jual_disable`, false);
                        } else {
                          props.setFieldValue(`jual_disable`, true);
                        }
                      }}
                    />
                    <h5>Saya Jual Produk Ini</h5>
                  </Row>

                  <Row sm="12" className="mt-2 mb-2">
                    <Col sm="2">
                      <label>Harga Jual Satuan</label>
                      <Form.Control
                        disabled={props.values.jual_disable}
                        className="mb-2"
                        type="number"
                        min="0"
                        placeholder={"Rp. " + props.values.hjs.toLocaleString({ minimumFractionDigits: 0 })}
                        name="hjs"
                        onChange={props.handleChange}
                      />
                    </Col>
                    <Col sm="3">
                      <label>Akun Penjualan</label>
                      <Select
                        isDisabled={props.values.jual_disable}
                        placeholder={props.values.akun_penjualan_nama}
                        options={akun_jual}
                        name="akun_penjualan"
                        onChange={(e) => {
                          props.setFieldValue("akun_penjualan", e.value);
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>

            <Row>
              <Col className="d-flex justify-content-end mt-10">
                <Button variant="danger mr-2" onClick={cancelButton}>
                  Batal
                </Button>
                <Button variant="success" onClick={props.handleSubmit}>
                  Update
                </Button>
              </Col>
            </Row>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_produk = await prisma.produk.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      pembelian: true,
      penjualan: true,
    },
  });

  const get_satuan_produk = await prisma.satuanProduk.findMany({
    orderBy: {
      satuan: "asc",
    },
  });

  let satuan = [];
  get_satuan_produk.map((i) => {
    satuan.push({
      value: i.id,
      label: i.satuan,
    });
  });

  let curr_satuan = [];
  curr_satuan.push({
    value: get_produk[0].satuan,
    label: get_produk[0].satuan,
  });

  const get_kategori_produk = await prisma.kategoriProduk.findMany();

  let kategori = [];
  get_kategori_produk.map((i) => {
    kategori.push({
      value: i.id,
      label: i.nama,
    });
  });

  let curr_kategori = [];
  curr_kategori.push({
    value: get_produk[0].kategori_produk,
    label: get_produk[0].kategori_produk,
  });

  const get_akun_pembelian = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [15, 5],
      },
    },
  });

  let akun_pembelian = [];
  get_akun_pembelian.map((i) => {
    akun_pembelian.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  let curr_akun_beli = [];
  curr_akun_beli.push({
    value: get_produk[0].akun_pembelian,
    label: get_produk[0].pembelian.nama_akun,
  });

  const get_akun_penjualan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13],
      },
    },
  });

  let akun_penjualan = [];
  get_akun_penjualan.map((i) => {
    akun_penjualan.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  let curr_akun_jual = [];
  curr_akun_jual.push({
    value: get_produk[0].akun_penjualan,
    label: get_produk[0].penjualan.nama_akun,
  });

  return {
    props: {
      data3: get_kategori_produk,

      produk: get_produk,
      kategori: kategori,
      satuan: satuan,
      curr_kategori: curr_kategori,
      curr_satuan: curr_satuan,
      akun_jual: akun_penjualan,
      akun_beli: akun_pembelian,
      curr_akun_jual: curr_akun_jual,
      curr_akun_beli: curr_akun_beli,
    },
  };
}
