import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";

import { Form, Row, Col, Button } from "react-bootstrap";
import { Breadcrumbs, Typography } from "@material-ui/core/";

import * as Yup from "yup";
import { Formik, Form as Forms, Field } from "formik";

import Axios from "axios";
import { useRouter } from "next/router";

export default function addRole() {
  const RoleSchema = Yup.object().shape({
    role_type: Yup.string()
      .min(2, " characters must be more than 1")
      .max(30, " characters must be less than 30")
      .required(" required"),
  });

  const url = "http://localhost:3000/api/role/createRole";
  const router = useRouter();

  function cancelButton() {
    router.push("../role/tabel-role");
  }

  return (
    <Layout>
      <Head>
        <title>Buat Role Baru</title>
      </Head>
      <Formik
        initialValues={{
          role_type: "",
          role_desc: "-",
          menu: [],
        }}
        validationSchema={RoleSchema}
        onSubmit={async (values) => {
          Axios.post(url, values)
            .then(function (response) {
              router.push("../role/tabel-role");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../role/tabel-role">
                  Role list
                </Link>
                <Typography color="textPrimary">Buat role baru</Typography>
              </Breadcrumbs>

              <h2>Buat role baru</h2>
            </div>

            <div>
              <div class="mt-12 container">
                <Form>
                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Role Name</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control
                        placeholder="Administrator"
                        name="role_type"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.errors.role_type && props.touched.role_type ? (
                        <div class="text-red-500 text-sm">*{props.errors.role_type}</div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Role Description</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control
                        placeholder="-"
                        name="role_desc"
                        onChange={props.handleChange}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="2">
                      <Form.Label>Access Menu</Form.Label>
                    </Col>

                    <Col sm="2" className="ml-3">
                      <div role="group" aria-labelledby="checkbox-group">
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="1" /> Dashboard
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="2" /> Jurnal
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="3" /> User
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="4" /> Role
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="5" /> Daftar Akun
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="6" /> Kontak
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="7" /> Laporan
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="15" /> Reimbursement
                          </label>
                        </Row>
                      </div>
                    </Col>

                    <Col sm="4">
                      <div role="group" aria-labelledby="checkbox-group">
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="8" /> Pajak
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="9" /> Produk
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="10" />
                            Kas & Bank
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="11" /> Penjualan
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="12" /> Pembelian
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="13" /> Biaya
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="14" /> Pengaturan
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="16" /> Aset
                          </label>
                        </Row>
                      </div>
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
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
