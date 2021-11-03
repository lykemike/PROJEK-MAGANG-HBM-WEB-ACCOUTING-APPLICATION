import React from "react";
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

export default function addProduk({ data, data2, data3, data5, kategori, satuan, akun_jual, akun_beli }) {
  const ProdukSchema = Yup.object().shape({
    nama: Yup.string()
      .min(5, "* must be more than 5 characters")
      .max(50, "* must be less than 50 characters")
      .required("* required"),
    kategori_produk: Yup.string().required("* required"),
    unit: Yup.string().required("* required"),
    // kode_sku: Yup.string().required("* required"),
    // kategori_produk_id: Yup.string().required("required"),
    // unit: Yup.number().integer().required("required"),
    // deskripsi: Yup.string().required("required"),
    // hbs: Yup.number().integer().required("required"),
    // akun_pembelian: Yup.number().integer().required("required"),
    // pajak_beli: Yup.string().required("required"),
    // hjs: Yup.number().integer().required("required"),
    // akun_penjualan: Yup.number().integer().required("required"),
    // pajak_jual: Yup.string().required("required"),
  });

  // Produk Api
  const url = "http://localhost:3000/api/produk/createProduk";

  // Redirect
  const router = useRouter();

  // Batal Button Function
  function cancelButton() {
    router.push("../produk/tabel-produk");
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          file_upload: [],
          nama: "",
          kode_sku: "-",
          kategori_produk_id: "",
          kategori_produk: "",
          unit: "",
          quantity: 0,
          deskripsi: "-",
          hbs: 0,
          akun_pembelian: 1,
          hjs: 0,
          akun_penjualan: 1,
          beli_disable: true,
          jual_disable: true,
        }}
        validationSchema={ProdukSchema}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            formData.append(`${key}`, `${values[key]}`);
          }
          Array.from(values.file_upload).map((i) => formData.append("file", i));
          console.log(values);
          Axios.post(url, formData, {
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
              <title>Add Produk</title>
            </Head>

            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../tabel-produk">
                  Tabel Produk
                </Link>
                <Typography color="textPrimary">Add Produk & Jasa Baru</Typography>
              </Breadcrumbs>

              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Add Produk & Jasa Baru</h2>
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
                    <Form.Control className="mb-2" placeholder="" name="nama" onChange={props.handleChange} />
                  </Col>
                  {props.errors.nama && props.touched.nama ? (
                    <div class="text-red-500 text-sm mt-2">{props.errors.nama}</div>
                  ) : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Kode / SKU</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control className="mb-2" placeholder="-" name="kode_sku" onChange={props.handleChange} />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm="2">
                    <label>Kategori</label>
                  </Col>
                  <Col sm="4">
                    <Select
                      options={kategori}
                      name="kategori_produk"
                      onChange={(e) => {
                        props.setFieldValue("kategori_produk", e.label);
                        props.setFieldValue("kategori_produk_id", e.value);
                      }}
                    />
                  </Col>
                  {props.errors.kategori_produk && props.touched.kategori_produk ? (
                    <div class="text-red-500 text-sm mt-2">{props.errors.kategori_produk}</div>
                  ) : null}
                </Row>

                <Row className="mb-3">
                  <Col sm="2">
                    <label>Unit</label>
                  </Col>
                  <Col sm="4">
                    <Select
                      options={satuan}
                      name="unit"
                      onChange={(e) => {
                        props.setFieldValue("unit", e.label);
                      }}
                    />
                  </Col>
                  {props.errors.unit && props.touched.unit ? (
                    <div class="text-red-500 text-sm mt-2">{props.errors.unit}</div>
                  ) : null}
                </Row>

                <Row className="mb-3">
                  <Col sm="2">
                    <label>Quantity</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control type="number" min={0} name="quantity" onChange={props.handleChange} />
                  </Col>
                </Row>

                <Row className="mb-12">
                  <Col sm="2">
                    <label>Deskripsi</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control className="mb-2" placeholder="-" name="deskripsi" onChange={props.handleChange} />
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
                        className="mb-2"
                        placeholder="Rp. 0,00"
                        name="hbs"
                        onChange={props.handleChange}
                      />
                      {props.errors.hbs && props.touched.hbs ? (
                        <div class="text-red-500 text-sm">
                          <ErrorOutlineIcon />
                          {props.errors.hbs}
                        </div>
                      ) : null}
                    </Col>
                    <Col sm="3">
                      <label>Akun Pembelian</label>
                      <Select
                        isDisabled={props.values.beli_disable}
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
                        placeholder="Rp. 0,00"
                        name="hjs"
                        onChange={props.handleChange}
                      />
                      {props.errors.hjs && props.touched.hjs ? (
                        <div class="text-red-500 text-sm">
                          <ErrorOutlineIcon />
                          {props.errors.hjs}
                        </div>
                      ) : null}
                    </Col>
                    <Col sm="3">
                      <label>Akun Penjualan</label>
                      <Select
                        isDisabled={props.values.jual_disable}
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
                  Tambah
                </Button>
              </Col>
            </Row>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get kategori akun penjualan and pembelian from akun model
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

  const get_kategori_produk = await prisma.kategoriProduk.findMany();

  let kategori = [];
  get_kategori_produk.map((i) => {
    kategori.push({
      value: i.id,
      label: i.nama,
    });
  });

  return {
    props: {
      data: get_akun_pembelian,
      data2: get_akun_penjualan,
      data3: get_kategori_produk,
      data5: get_satuan_produk,
      kategori: kategori,
      satuan: satuan,
      akun_jual: akun_penjualan,
      akun_beli: akun_pembelian,
    },
  };
}
