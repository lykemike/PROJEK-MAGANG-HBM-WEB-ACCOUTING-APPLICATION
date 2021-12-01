import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import { Button, Form, Col, Row, FormCheck, Card } from "react-bootstrap";
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

import * as Yup from "yup";
import { Formik, Form as Forms, Field } from "formik";
import Select from "react-select";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function addProduk({ data, data2, data3 }) {
  const ProdukSchema = Yup.object().shape({
    nama: Yup.string()
      .min(2, "* must be more than 5 characters")
      .max(50, "* must be less than 50 characters")
      .required("* required"),
    kategori_id: Yup.string().required("* required"),
    harga: Yup.number().required("* required"),
    akun_penjualan_id: Yup.string().required("* required"),
  });

  // Produk Api
  const url = "http://localhost:3000/api/produk/updateProduk";

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
          id: data3[0].id,
          file_attachment: "",
          nama: data3[0].nama,
          kategori_id: data3[0].kategori_id,
          kategori_name: data3[0].kategori_name,
          deskripsi: data3[0].deskripsi,
          harga: data3[0].harga,
          akun_penjualan_id: data3[0].akun_id,
          akun_penjualan_name: data3[0].akun_penjualan_name,
        }}
        validationSchema={ProdukSchema}
        onSubmit={async (values) => {
          let formData = new FormData();

          for (var key in values) {
            formData.append(`${key}`, `${values[key]}`);
          }

          Array.from(values.file_attachment).map((i) => formData.append("file", i));

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
              <title>Update Produk / Jasa</title>
            </Head>

            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Update Produk & Jasa</Typography>
              </Breadcrumbs>

              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Update Produk / Jasa Baru</h2>
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
                      name="file_attachment"
                      accept="image/*"
                      onChange={(e) => props.setFieldValue(`file_attachment`, e.target.files)}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Nama</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      className="mb-2"
                      placeholder=""
                      name="nama"
                      value={props.values.nama}
                      onChange={(e) => {
                        let name = e.target.value;
                        let name2 = name.charAt(0).toUpperCase() + name.slice(1);
                        props.setFieldValue((props.values.nama = name2));
                      }}
                    />
                  </Col>
                  {props.errors.nama && props.touched.nama ? (
                    <span class="text-xs font-medium text-red-500 required-dot">{props.errors.nama}</span>
                  ) : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Kategori</label>
                  </Col>
                  <Col sm="4">
                    <Select
                      options={data}
                      defaultValue={{ value: parseInt(props.values.kategori_id), label: props.values.kategori_name }}
                      name="kategori_id"
                      onChange={(e) => {
                        props.setFieldValue(`kategori_id`, e.value);
                        props.setFieldValue(`kategori_name`, e.label);
                      }}
                    />
                  </Col>
                  {props.errors.kategori_id && props.touched.kategori_id ? (
                    <span class="text-xs font-medium text-red-500 required-dot">{props.errors.kategori_id}</span>
                  ) : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Deskripsi</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      className="mb-2"
                      placeholder="-"
                      name="deskripsi"
                      value={props.values.deskripsi}
                      onChange={(e) => {
                        let name = e.target.value;
                        let name2 = name.charAt(0).toLowerCase() + name.slice(1);
                        props.setFieldValue((props.values.deskripsi = name2));
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Harga</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      className="mb-2"
                      type="number"
                      min="0"
                      name="harga"
                      value={props.values.harga}
                      onChange={props.handleChange}
                    />
                  </Col>
                  {props.errors.harga && props.touched.harga ? (
                    <span class="text-xs font-medium text-red-500 required-dot">{props.errors.harga}</span>
                  ) : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label>Akun Penjualan</label>
                  </Col>
                  <Col sm="4">
                    <Select
                      options={data2}
                      name="akun_penjualan_id"
                      defaultValue={{ value: parseInt(props.values.akun_penjualan_id), label: props.values.akun_penjualan_name }}
                      onChange={(e) => {
                        props.setFieldValue(`akun_penjualan_id`, e.value);
                        props.setFieldValue(`akun_penjualan_name`, e.label);
                      }}
                    />
                  </Col>
                  {props.errors.akun_penjualan_id && props.touched.akun_penjualan_id ? (
                    <span class="text-xs font-medium text-red-500 required-dot">{props.errors.akun_penjualan_id}</span>
                  ) : null}
                </Row>
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
  });

  const get_kategori_produks = await prisma.kategoriProduk.findMany({});

  let kategori_produk = [];
  get_kategori_produks.map((i) => {
    kategori_produk.push({
      value: i.id,
      label: i.nama,
    });
  });

  const get_akun_penjualans = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13],
      },
    },
  });

  let akun_penjualan = [];
  get_akun_penjualans.map((i) => {
    akun_penjualan.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  return {
    props: {
      data: kategori_produk,
      data2: akun_penjualan,
      data3: get_produk,
    },
  };
}
