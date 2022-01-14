import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";

import { Formik, Form as Forms } from "formik";
import * as Yup from "yup";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Select from "react-select";

const BuatAkunBaruSchema = Yup.object().shape({
  nama_akun: Yup.string().required("* required"),
  // kode_akun: Yup.string().required("*Required"),
  // kategori_akun: Yup.string().required('kategori_akun harus dipilih'),
  // detail: Yup.string().required('detail harus dipilih'),
  // deskripsi: Yup.string().required('*deskripsi tidak boleh kosong'),
});

export default function BuatAkunBaru({ data, data2 }) {
  const url = "http://localhost:3000/api/daftar-akun/createAkun";
  return (
    <Layout>
      <Formik
        initialValues={{
          nama_akun: "",
          kategori_id: "",
        }}
        validationSchema={BuatAkunBaruSchema}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <h1>Buat Akun Baru</h1>
            <div class="mt-12 container">
              <Form>
                <Row className="mb-3">
                  <Col sm="2">Nama Akun</Col>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      placeholder="Nama"
                      name="nama_akun"
                      onChange={(e) => {
                        let input = e.target.value;
                        let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                        props.setFieldValue((props.values.nama_akun = input2));
                      }}
                      onBLur={props.handleBlur}
                    />
                    {props.errors.nama_akun && props.touched.nama_akun ? <div class="text-red-500 text-sm">{props.errors.nama_akun}</div> : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm="2">Kode Akun</Col>
                  <Col sm="6">
                    <Form.Control type="text" placeholder="Auto" name="kode_akun" disabled onBLur={props.handleBlur} />
                    {props.errors.kode_akun && props.touched.kode_akun ? <div class="text-red-500 text-sm">{props.errors.kode_akun}</div> : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm="2">Kategori</Col>
                  <Col sm="6">
                    <Select
                      options={data}
                      name="kategori_id"
                      onChange={(e) => {
                        props.setFieldValue(`kategori_id`, e.value);
                        props.setFieldValue(`kategori_name`, e.label);
                      }}
                    />
                    {props.errors.kategori_id && props.touched.kategori_id ? <div class="text-red-500 text-sm">{props.errors.kategori_id}</div> : null}
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Form.Label column sm="2" />
                  <Col sm="6">
                    <Button variant="danger mr-4" onClick={props.handleReset}>
                      Batal
                    </Button>
                    <Button variant="success" type="submit" onClick={props.handleSubmit}>
                      Buat
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
  const get_kategories = await prisma.kategori.findMany({
    where: {
      NOT: {
        name: {
          equals: "Kartu Kredit",
        },
      },
    },
    orderBy: [
      {
        id: "asc",
      },
    ],
  });

  const destructure = [];
  get_kategories.map((i) => {
    destructure.push({
      value: i.id,
      label: i.name,
    });
  });

  const tipeAkuns = await prisma.tipeAkun.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });

  return {
    props: {
      data: destructure,
      data2: tipeAkuns,
    },
  };
}
