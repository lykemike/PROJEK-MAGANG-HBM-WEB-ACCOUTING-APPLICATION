import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Breadcrumbs, Typography } from "@material-ui/core/";

import Select from "react-select";
import * as Yup from "yup";
import Axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form as Forms, Field } from "formik";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function addpajak({ data, data2 }) {
  const router = useRouter();

  const PajakScehma = Yup.object().shape({
    nama: Yup.string().min(5, "* must be atleast 5 characters long").required("* required"),
    presentaseAktif: Yup.number().required("* required").positive("* presentase aktif must be a positive").integer(),
  });

  const api_create = "http://localhost:3000/api/pajak/createPajak";

  function cancelButton() {
    router.push("../pajak/tabel-pajak");
  }

  function SelectField(FieldProps) {
    return <Select options={data} onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)} />;
  }

  function SelectField2(FieldProps) {
    return <Select options={data2} onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)} />;
  }

  return (
    <Layout>
      <Head>
        <title>Buat Pajak Baru</title>
      </Head>

      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="../pajak/tabel-pajak">
            Pajak List
          </Link>
          <Typography color="textPrimary">Buat Pajak Baru</Typography>
        </Breadcrumbs>

        <h2>Buat Pajak Baru</h2>
      </div>

      <Formik
        initialValues={{
          nama: "",
          presentaseAktif: "",
          akunPajakPenjualan: "",
          akunPajakPembelian: "",
        }}
        validationSchema={PajakScehma}
        onSubmit={async (values) => {
          Axios.post(api_create, values)
            .then(function (response) {
              router.push("tabel-pajak");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div className="mt-12 container">
              <Form>
                <Row className="mb-2">
                  <Col sm="2">
                    <Form.Label>Nama</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      placeholder="Pajak Penjualan atas Barang Mewah (PPnBM)"
                      name="nama"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </Col>
                  {props.errors.nama && props.touched.nama ? (
                    <p className="text-red-500 text-sm italic mt-2">{props.errors.nama}</p>
                  ) : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <Form.Label>Presentase Aktif</Form.Label>
                  </Col>
                  <Col sm="4">
                    <InputGroup>
                      <Form.Control
                        type="number"
                        min="0"
                        placeholder="10 %"
                        name="presentaseAktif"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  {props.errors.presentaseAktif && props.touched.presentaseAktif ? (
                    <p className="text-red-500 text-sm italic mt-2">{props.errors.presentaseAktif}</p>
                  ) : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <Form.Label>Akun Pajak Penjualan</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Row>
                      <Col>
                        <Field options={data} name="akunPajakPenjualan" component={SelectField} />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <Form.Label>Akun Pajak Pembelian</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Row>
                      <Col>
                        <Field options={data2} name="akunPajakPembelian" component={SelectField2} />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col sm="2" />
                  <Col sm="4" className="d-flex justify-content-end mt-10">
                    <Button variant="danger mr-2" onClick={cancelButton}>
                      Batal
                    </Button>
                    <Button variant="success" onClick={props.handleSubmit}>
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const get_pajak_penjualan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [10, 11, 13, 14, 16, 17],
      },
    },
  });

  let pajak_penjualan = [];
  get_pajak_penjualan.map((i) => {
    pajak_penjualan.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const get_pajak_pembelian = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [2, 13, 14, 16, 17],
      },
    },
  });

  let pajak_pembelian = [];
  get_pajak_pembelian.map((i) => {
    pajak_pembelian.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  return {
    props: {
      data: pajak_penjualan,
      data2: pajak_pembelian,
    },
  };
}
