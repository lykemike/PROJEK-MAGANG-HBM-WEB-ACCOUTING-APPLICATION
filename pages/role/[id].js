import React, { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";

import { Form, Row, Col, Button } from "react-bootstrap";
import { Snackbar, Breadcrumbs, Typography } from "@material-ui/core/";

import * as Yup from "yup";
import { Formik, Form as Forms, Field } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function updateRole({ data }) {
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
  const router = useRouter();
  const { id } = router.query;
  const api_update = "http://localhost:3000/api/role/updateRole";
  const formik = useRef(null);

  const RoleSchema = Yup.object().shape({
    role_type: Yup.string().min(2, " characters must be more than 1").max(30, " characters must be less than 30").required(" required"),
  });

  function cancelButton() {
    router.push("../role/tabel-role");
  }

  return (
    <Layout>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Head>
        <title>Update Role</title>
      </Head>
      <Formik
        enableReinitialize={true}
        innerRef={formik}
        initialValues={{
          role_type: data.roleType,
          role_desc: data.roleDesc,
          menu: data.RolePrivellege.map((i) => i.menu_id.toString()),
        }}
        validationSchema={RoleSchema}
        onSubmit={async (values) => {
          let data = { ...values, id };
          Axios.put(api_update, data)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.push("../role/tabel-role");
              }, 2000);
            })
            .catch(function (error) {
              setState({ open: true, toast_message: error.response.data.message });
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../role/tabel-role">
                  Role List
                </Link>
                <Typography color="textPrimary">Update Role</Typography>
              </Breadcrumbs>

              <h2>Update Role</h2>
            </div>

            <div>
              <div class="mt-12 container">
                <Form>
                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Role Name</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control value={props.values.role_type} name="role_type" onChange={props.handleChange} onBlur={props.handleBlur} />
                      {props.errors.role_type && props.touched.role_type ? <div class="text-red-500 text-sm">*{props.errors.role_type}</div> : null}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Role Description</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control value={props.values.role_desc} name="role_desc" onChange={props.handleChange} onBlur={props.handleBlur} />
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="2">
                      <label className="font-medium">Access Menu</label>
                    </Col>

                    <Col sm="2" className="ml-3">
                      <div role="group" aria-labelledby="checkbox-group">
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="1" className="mr-2" />
                            Dashboard
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="2" className="mr-2" />
                            Jurnal
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="3" className="mr-2" />
                            User
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="4" className="mr-2" />
                            Role
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="5" className="mr-2" />
                            Daftar Akun
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="6" className="mr-2" />
                            Kontak
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="7" className="mr-2" />
                            Laporan
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="15" className="mr-2" />
                            Reimbursement
                          </label>
                        </Row>
                      </div>
                    </Col>

                    <Col sm="4">
                      <div role="group" aria-labelledby="checkbox-group">
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="8" className="mr-2" />
                            Pajak
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="9" className="mr-2" />
                            Produk
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="10" className="mr-2" />
                            Kas & Bank
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="11" className="mr-2" />
                            Penjualan
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="12" className="mr-2" />
                            Pembelian
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="13" className="mr-2" />
                            Biaya
                          </label>
                        </Row>

                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="14" className="mr-2" />
                            Pengaturan
                          </label>
                        </Row>
                        <Row>
                          <label>
                            <Field type="checkbox" name="menu" value="16" className="mr-2" />
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
                        Update
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

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_role = await prisma.role.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      RolePrivellege: true,
    },
  });

  return {
    props: {
      data: get_role,
    },
  };
}
