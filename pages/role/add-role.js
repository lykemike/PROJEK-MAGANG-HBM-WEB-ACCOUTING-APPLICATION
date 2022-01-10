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
    role_type: Yup.string().min(2, "* characters must be more than 2").max(30, "* characters must be less than 30").required("* required"),
    menu: Yup.array().min(1, "* must select atleast 1 menu"),
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
                <Typography color="textPrimary">Buat role baru</Typography>
              </Breadcrumbs>

              <h2>Buat role baru</h2>
            </div>

            <div>
              <div class="mt-12 container">
                <Form>
                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Role Name</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control placeholder="-" name="role_type" onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Col>
                    <Col>{props.errors.role_type && props.touched.role_type ? <span class="text-xs font-medium text-red-500 required-dot">{props.errors.role_type}</span> : null}</Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Role Description</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control placeholder="-" name="role_desc" onChange={props.handleChange} onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="2">
                      <label className="font-medium">Access Menu</label>
                    </Col>

                    <Col sm="2" className="ml-3">
                      <div role="group" aria-labelledby="checkbox-group">
                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="1" /> Dashboard
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="2" /> Jurnal
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="3" /> User
                          </label>
                        </Row>
                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="4" /> Role
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="5" /> Daftar Akun
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="6" /> Kontak
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="7" /> Laporan
                          </label>
                        </Row>
                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="15" /> Reimbursement
                          </label>
                        </Row>
                      </div>
                    </Col>

                    <Col sm="4">
                      <div role="group" aria-labelledby="checkbox-group">
                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="8" /> Pajak
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="9" /> Produk
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="10" /> Kas & Bank
                          </label>
                        </Row>
                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="11" /> Penjualan
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="12" /> Pembelian
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="13" /> Biaya
                          </label>
                        </Row>

                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="14" /> Pengaturan
                          </label>
                        </Row>
                        <Row>
                          <label className="font-medium">
                            <Field type="checkbox" name="menu" value="16" /> Aset
                          </label>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="2" />
                    <Col sm="6">{props.errors.menu && props.touched.menu ? <span class="text-xs font-medium text-red-500 required-dot">{props.errors.menu}</span> : null}</Col>
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
