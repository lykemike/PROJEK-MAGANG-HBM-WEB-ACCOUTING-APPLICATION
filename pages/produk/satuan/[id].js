import React from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Col, Row } from "react-bootstrap";

import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default function updateSatuan({ data }) {
  const router = useRouter();
  const { id } = router.query;
  const SatuanSchema = Yup.object().shape({
    satuan: Yup.string().required("required"),
  });

  const api_update_satuan = "http://localhost:3000/api/produk/updateSatuan";
  function cancelButton() {
    router.push("../satuan/tabel-satuan");
  }
  return (
    <Layout>
      <Formik
        initialValues={{
          satuan: data.satuan,
        }}
        validationSchema={SatuanSchema}
        onSubmit={async (values) => {
          let data = { ...values, id };
          Axios.put(api_update_satuan, data)
            .then(function (response) {
              console.log(response);
              router.push("../satuan/tabel-satuan");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Form>
              <h2>Add Satuan Produk</h2>

              <hr />

              <div className="container">
                <Row className="mb-2">
                  <Col className="mt-1" sm="1">
                    <Form.Label>Satuan</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      placeholder={props.values.satuan}
                      name="satuan"
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

  const get_satuan = await prisma.satuanProduk.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      data: get_satuan,
    },
  };
}
