import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Breadcrumbs, Typography, Snackbar } from "@material-ui/core/";

import Select from "react-select";
import * as Yup from "yup";
import { Formik, Form as Forms, Field } from "formik";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function update({ data, data2, data3 }) {
  const router = useRouter();
  const { id } = router.query;
  const formik = useRef(null);

  const PajakScehma = Yup.object().shape({
    nama: Yup.string().min(5, "* must be atleast 5 characters long").required("* required"),
    presentase_aktif: Yup.number().required("* required").positive("* presentase aktif must be a positive").integer(),
  });

  const updatePajak = "http://localhost:3000/api/pajak/updatePajak";

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
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Head>
        <title>Update Pajak</title>
      </Head>

      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Update Pajak</Typography>
        </Breadcrumbs>

        <h2>Update Pajak</h2>
      </div>
      <Formik
        enableReinitialize={true}
        innerRef={formik}
        initialValues={{
          nama: data3.nama,
          presentase_aktif: data3.presentase_aktif,
          akun_pajak_penjualan_id: data3.akun_jual,
          akun_pajak_penjualan_name: data3.kategori1.kode_akun + " - " + data3.kategori1.nama_akun,
          akun_pajak_penjualan_id: data3.akun_beli,
          akun_pajak_pembelian_name: data3.kategori2.kode_akun + " - " + data3.kategori2.nama_akun,
        }}
        validationSchema={PajakScehma}
        onSubmit={async (values) => {
          let data = { ...values, id };

          Axios.put(updatePajak, data)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              router.push("../pajak/tabel-pajak");
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
                    <Form.Control value={props.values.nama} name="nama" onChange={props.handleChange} onBLur={props.handleBlur} />
                  </Col>
                  {props.errors.nama && props.touched.nama ? <p className="text-red-500 text-sm italic mt-2">{props.errors.nama}</p> : null}
                </Row>

                <Row className="mb-2">
                  <Col sm="3">
                    <label className="font-medium">Presentase Aktif</label>
                  </Col>
                  <Col sm="4">
                    <InputGroup>
                      <Form.Control value={props.values.presentase_aktif} type="number" name="presentase_aktif" onChange={props.handleChange} onBLur={props.handleBlur} />
                      <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  {props.errors.presentase_aktif && props.touched.presentase_aktif ? <p className="text-red-500 text-sm italic mt-2">{props.errors.presentase_aktif}</p> : null}
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
                          name="akun_pajak_penjualan_id"
                          defaultValue={{ label: props.values.akun_pajak_penjualan_name, value: props.values.akun_pajak_penjualan_id }}
                          onChange={(e) => {
                            props.setFieldValue(`akun_pajak_penjualan_id`, e.value);
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
                          name="akun_pajak_pembelian_id"
                          defaultValue={{ label: props.values.akun_pajak_pembelian_name, value: props.values.akun_pajak_pembelian_id }}
                          onChange={(e) => {
                            props.setFieldValue(`akun_pajak_pembelian_id`, e.value);
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

export async function getServerSideProps(context) {
  const { id } = context.query;

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

  const get_pajak = await prisma.pajak.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      kategori1: true,
      kategori2: true,
    },
  });

  return {
    props: {
      data: pajak_penjualan,
      data2: pajak_pembelian,
      data3: get_pajak,
    },
  };
}
