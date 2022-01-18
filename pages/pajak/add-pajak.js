import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Breadcrumbs, Typography, Snackbar } from "@material-ui/core/";

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
    persen: Yup.number().required("* required").positive("* presentase aktif must be a positive").integer(),
  });

  const api_create = "http://localhost:3000/api/pajak/createPajak";

  function cancelButton() {
    router.push("../pajak/tabel-pajak");
  }

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState, toast_message: "" });
  };

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };

  return (
    <Layout>
      <Head>
        <title>Buat Pajak Baru</title>
      </Head>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Buat Pajak Baru</Typography>
        </Breadcrumbs>

        <h2>Buat Pajak Baru</h2>
      </div>

      <Formik
        initialValues={{
          nama: "",
          persen: "",
          akun_jual: "",
          akun_beli: "",
        }}
        validationSchema={PajakScehma}
        onSubmit={async (values) => {
          Axios.post(api_create, values)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              router.push("tabel-pajak");
            })
            .catch(function (error) {
              setState({ open: true, toast_message: error.response.data.message });
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div className="mt-12 container">
              <Form>
                <Row className="mb-2">
                  <Col sm="3">
                    <label className="font-medium">Nama</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      placeholder="-"
                      name="nama"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      onChange={(e) => {
                        let input = e.target.value;
                        let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                        props.setFieldValue((props.values.nama = input2));
                      }}
                    />
                  </Col>
                  {props.errors.nama && props.touched.nama ? <p className="text-red-500 text-sm italic mt-2">{props.errors.nama}</p> : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="3">
                    <label className="font-medium">Presentase Aktif</label>
                  </Col>
                  <Col sm="4">
                    <InputGroup>
                      <Form.Control type="number" min="0" placeholder="0" name="persen" onChange={props.handleChange} onBlur={props.handleBlur} />
                      <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  {props.errors.persen && props.touched.persen ? <p className="text-red-500 text-sm italic mt-2">{props.errors.persen}</p> : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="3">
                    <label className="font-medium">Akun Pajak Penjualan</label>
                  </Col>
                  <Col sm="4">
                    <Row>
                      <Col>
                        <Select
                          options={data}
                          name="akun_jual"
                          onChange={(e) => {
                            props.setFieldValue(`akun_jual`, e.value);
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="3">
                    <label className="font-medium">Akun Pajak Pembelian</label>
                  </Col>
                  <Col sm="4">
                    <Row>
                      <Col>
                        <Select
                          options={data2}
                          name="akun_beli"
                          onChange={(e) => {
                            props.setFieldValue(`akun_beli`, e.value);
                          }}
                        />
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
      label: i.kode_akun + " - " + i.nama_akun,
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
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  return {
    props: {
      data: pajak_penjualan,
      data2: pajak_pembelian,
    },
  };
}
