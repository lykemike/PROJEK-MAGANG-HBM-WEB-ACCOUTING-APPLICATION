import React, { useEffect, useRef } from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Col, Row } from "react-bootstrap";

import { useRouter } from "next/router";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function updateKategoriProduk({ data }) {
  const router = useRouter();
  const { id } = router.query;

  const updateKategori = "http://localhost:3000/api/produk/updateKategori";

  // Get Existing Produk data based on [id]
  const formikref = useRef(null);

  // Batal Button Function
  function cancelButton() {
    router.push("../kategori/tabel-kategori");
  }
  console.log(data);
  return (
    <Layout>
      <Formik
        initialValues={{
          nama: data.nama,
          jumlah: data.jumlah,
        }}
        onSubmit={async (values) => {
          let data = { ...values, id };
          Axios.post(updateKategori, data)
            .then(function (response) {
              console.log(response);
              router.push("../kategori/tabel-kategori");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Form>
              <h2>Update Kategori Produk</h2>

              <hr />

              <div className="container">
                <Row className="mb-2">
                  <Col className="mt-1" sm="1">
                    <Form.Label>Nama</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      placeholder={props.values.nama}
                      name="nama"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col className="mt-1" sm="1">
                    <Form.Label>Jumlah</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      disabled
                      placeholder={props.values.jumlah}
                      name="jumlah"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col sm="1" />
                  <Col sm="4" className="d-flex justify-content-end mt-10">
                    <Button variant="danger mr-2" onClick={cancelButton}>
                      Batal
                    </Button>
                    <Button variant="success" onClick={props.handleSubmit}>
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_kategori_produk = await prisma.kategoriProduk.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  return {
    props: {
      data: get_kategori_produk,
    },
  };
}
