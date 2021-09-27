import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import * as Yup from "yup";
import { Formik, Form as Forms, Field } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";

export default function addRole() {
  const RoleSchema = Yup.object().shape({
    role_type: Yup.string().required(" required"),
  });

  const url = "http://localhost:3000/api/role/createRole";
  const router = useRouter();

  function cancelButton() {
    router.push("../role/tabel-role");
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          role_type: "",
          role_desc: "",
          menu: [],
        }}
        validationSchema={RoleSchema}
        onSubmit={async (values) => {
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.push("../role/tabel-role");
            })
            .catch(function (error) {
              console.log(error);
              console.log(JSON.stringify(values, null, 2));
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div>
              <h4>Buat Role Baru</h4>
              <div class="mt-12 container">
                <Form>
                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Role Name</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control
                        placeholder="Role Name"
                        name="role_type"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.errors.role_type && props.touched.role_type ? (
                        <div class="text-red-500 text-sm">
                          <ErrorOutlineIcon />
                          {props.errors.role_type}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Role Description</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control
                        placeholder="Role Desc"
                        name="role_desc"
                        onChange={props.handleChange}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {/* {props.errors.role_desc && props.touched.role_desc ? <div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.role_desc}</div> : null} */}
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
                            <Field type="checkbox" name="menu" value="1" />
                            Dashboard
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="2" />
                            Jurnal
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="3" />
                            User
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="4" />
                            Role
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="5" />
                            Daftar Akun
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="6" />
                            Kontak
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="7" />
                            Laporan
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="15" />
                            Reimbursement
                          </label>
                        </Row>
                      </div>
                    </Col>

                    <Col sm="4">
                      <div role="group" aria-labelledby="checkbox-group">
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="8" />
                            Pajak
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="9" />
                            Produk
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
                            <Field type="checkbox" name="menu" value="11" />
                            Penjualan
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="12" />
                            Pembelian
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="13" />
                            Biaya
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="14" />
                            Pengaturan
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="15" />
                            Aset
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
