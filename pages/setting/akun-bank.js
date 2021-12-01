import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, FormControl, Button } from "react-bootstrap";
import SidebarSetting from "../../components/SidebarSetting";
import Divider from "@material-ui/core/Divider";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";

import Select from "react-select";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function pemetaanakun({ data }) {
  const url = "http://localhost:3000/api/setting/createDetilBank";
  const router = useRouter();

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_id: "",
          nama_bank: "",
          cabang_bank: "",
          nomor_rekening: "",
          atas_nama: "",
        }}
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
            <Row>
              <Col sm="3">
                <SidebarSetting />
              </Col>
              <Col sm="4">
                <h1>Detil Akun Bank</h1>

                <label>Nama Akun Bank</label>
                <Select
                  options={data}
                  name="akun_bank"
                  onChange={(e) => {
                    props.setFieldValue(`akun_id`, e.value);
                  }}
                />

                <label>Nama Bank</label>
                <Form.Control placeholder="-" type="text" name="nama_bank" onChange={props.handleChange} />

                <label>Cabang Bank</label>
                <Form.Control placeholder="-" type="text" name="cabang_bank" onChange={props.handleChange} />

                <label>Nomor Rekening</label>
                <Form.Control placeholder="-" type="text" name="nomor_rekening" onChange={props.handleChange} />

                <label>Atas Nama</label>
                <Form.Control placeholder="-" type="text" name="atas_nama" onChange={props.handleChange} />
              </Col>
            </Row>

            <Button variant="success" onClick={props.handleSubmit}>
              Submit
            </Button>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const get_akun_kas_bank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun = [];
  get_akun_kas_bank.map((i) => {
    akun.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
      label2: i.nama_akun,
    });
  });

  return {
    props: {
      data: akun,
    },
  };
}
