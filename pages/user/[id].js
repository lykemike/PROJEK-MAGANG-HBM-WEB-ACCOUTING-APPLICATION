import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";

import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik, Form as Forms, Field } from "formik";
import { Breadcrumbs, Typography } from "@material-ui/core/";

import * as Yup from "yup";
import Axios from "axios";
import { useRouter } from "next/router";
import Select from "react-select";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function update({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;
  const updateUser = "http://localhost:3000/api/user/updateUser";
  const formik = useRef(null);

  function SelectField(FieldProps) {
    return <Select options={data} onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)} />;
  }

  const UserSchema = Yup.object().shape({
    first_name: Yup.string().min(2, "* chracters must be more than 2").max(20, "* chracters must be less than 20").required("*required"),
    email: Yup.string().email("* must be a valid email").required("* required"),
    password: Yup.string().min(6, "* password must be more than 6 characters").required("* required"),
    // role_id: Yup.object().shape({
    //   value: Yup.number().required("* required"),
    // }),
  });

  function cancelButton() {
    router.push("../user/tabel-user");
  }
  console.log(data2);
  return (
    <Layout>
      <Head>
        <title>Update User</title>
      </Head>
      <Formik
        enableReinitialize={true}
        innerRef={formik}
        initialValues={{
          first_name: data2.firstName,
          last_name: data2.lastName,
          email: data2.email,
          password: data2.password,
          role_id: data2.roleId,
          role_name: data2.role.roleType,
        }}
        validationSchema={UserSchema}
        onSubmit={async (values) => {
          let data = { ...values, id };
          Axios.put(updateUser, data)
            .then(function (response) {
              console.log(response);
              router.push("../user/tabel-user");
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
                <Typography color="textPrimary">Update User</Typography>
              </Breadcrumbs>

              <h2>Update User</h2>
            </div>

            <div>
              <div className="mt-12 container">
                <Form>
                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">First Name</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control placeholder={props.values.first_name} value={props.values.first_name} onChange={props.handleChange} onBlur={props.handleBlur} />
                      {props.errors.first_name && props.touched.first_name ? <div className="text-red-500 text-sm">{props.errors.first_name}</div> : null}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Last Name</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control placeholder={props.values.last_name} value={props.values.last_name} onChange={props.handleChange} onBlur={props.handleBlur} />
                      {props.errors.last_name && props.touched.last_name ? <div className="text-red-500 text-sm">{props.errors.last_name}</div> : null}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Email</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control placeholder={props.values.email} value={props.values.email} onChange={props.handleChange} onBlur={props.handleBlur} />
                      {props.errors.email && props.touched.email ? <div className="text-red-500 text-sm">{props.errors.email}</div> : null}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Password</label>
                    </Col>
                    <Col sm="4">
                      <Form.Control placeholder="********" onChange={props.handleChange} onBlur={props.handleBlur} />
                      {props.errors.password && props.touched.password ? <div className="text-red-500 text-sm">{props.errors.password}</div> : null}
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <label className="font-medium">Roles</label>
                    </Col>
                    <Col sm="4">
                      <Select
                        options={data}
                        name="role_id"
                        defaultValue={{ label: props.values.role_name, value: props.values.role_id }}
                        onChange={(e) => {
                          props.setFieldValue(`role_id`, e.value);
                          props.setFieldValue((props.values.role_id = e.value));
                        }}
                      />
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

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      role: true,
    },
  });

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
      data2: get_user,
    },
  };
}
