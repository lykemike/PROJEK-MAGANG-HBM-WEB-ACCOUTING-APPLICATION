import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";

import { Form, Row, Col, Button } from "react-bootstrap";
import { Breadcrumbs, Typography } from "@material-ui/core/";

import * as Yup from "yup";
import Axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form as Forms, Field } from "formik";
import Select from "react-select";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function User({ data }) {
  const router = useRouter();
  const api_create = "http://localhost:3000/api/user/createUser";

  function SelectField(FieldProps) {
    return <Select options={data} onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)} />;
  }

  const UserSchema = Yup.object().shape({
    first_name: Yup.string().min(2, "* chracters must be more than 2").max(20, "* chracters must be less than 20").required("* required"),
    email: Yup.string().email("* must be a valid email").required("* required"),
    password: Yup.string().min(6, "* password must be more than 6 characters").required("* required"),
    role_id: Yup.string().required("* required"),
  });

  function cancelButton() {
    router.push("../user/tabel-user");
  }

  return (
    <Layout>
      <Head>
        <title>Buat User Baru</title>
      </Head>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "-",
          email: "",
          password: "",
          role_id: "",
        }}
        validationSchema={UserSchema}
        onSubmit={async (values) => {
          Axios.post(api_create, values)
            .then(function (response) {
              console.log(response);
              router.push("tabel-user");
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
                <Typography color="textPrimary">Buat User Baru</Typography>
              </Breadcrumbs>

              <h2 className="text-blue-600">Buat User Baru</h2>
            </div>

            <div class="mt-12 container">
              <Form>
                <Row className="mb-2">
                  <Col sm="2">
                    <label className="font-medium">First Name</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control placeholder="First Name" name="first_name" onChange={props.handleChange} onBLur={props.handleBlur} />
                  </Col>
                  <Col>{props.errors.first_name && props.touched.first_name ? <span class="text-xs font-medium text-red-500 required-dot">{props.errors.first_name}</span> : null}</Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label className="font-medium">Last Name</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control placeholder="Last Name" name="last_name" onChange={props.handleChange} onBLur={props.handleBlur} />
                  </Col>
                  <Col>{props.errors.last_name && props.touched.last_name ? <span class="text-xs font-medium text-red-500 required-dot">{props.errors.last_name}</span> : null}</Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label className="font-medium">Email</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control placeholder="Email" name="email" onChange={props.handleChange} onBLur={props.handleBlur} />
                  </Col>
                  <Col>{props.errors.email && props.touched.email ? <span class="text-xs font-medium text-red-500 required-dot">{props.errors.email}</span> : null}</Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label className="font-medium">Password</label>
                  </Col>
                  <Col sm="4">
                    <Form.Control type="password" placeholder="Password" name="password" onChange={props.handleChange} onBLur={props.handleBlur} />
                  </Col>
                  <Col>{props.errors.password && props.touched.password ? <span class="text-xs font-medium text-red-500 required-dot">{props.errors.password}</span> : null}</Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="2">
                    <label className="font-medium">Roles</label>
                  </Col>
                  <Col sm="4">
                    <Select
                      options={data}
                      name="role_id"
                      onChange={(e) => {
                        props.setFieldValue(`role_id`, e.value);
                        props.setFieldValue((props.values.role_id = e.value));
                      }}
                    />
                  </Col>
                  <Col>{props.errors.role_id && props.touched.role_id ? <span class="text-xs font-medium text-red-500 required-dot">{props.errors.role_id}</span> : null}</Col>
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
  const roles = await prisma.role.findMany({
    orderBy: [
      {
        roleType: "asc",
      },
    ],
  });

  let detail = [];
  roles.map((i) => {
    detail.push({
      value: i.id,
      label: i.roleType,
    });
  });

  return {
    props: {
      data: detail,
    },
  };
}
