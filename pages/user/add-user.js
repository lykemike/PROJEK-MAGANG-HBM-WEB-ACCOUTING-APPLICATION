import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";

import * as Yup from "yup";
import Axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form as Forms, Field } from "formik";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function User({ data }) {
  // Form validation
  const UserSchema = Yup.object().shape({
    first_name: Yup.string().required("*required"),
    last_name: Yup.string().required("*required"),
    email: Yup.string().email().required("*required"),
    password: Yup.string().required("*required"),
  });

  // User API
  const createUser = "http://localhost:3000/api/user/createUser";

  // Redirect Function
  const router = useRouter();

  // Batal Button Function
  function cancelButton() {
    router.push("../user/tabel-user");
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          role_id: "",
          toggle : false,
          checked: [],
        }}
        validationSchema={UserSchema}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
          Axios.post(createUser, values)
            .then(function (response) {
              console.log(response);
              router.push("tabel-user");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div>
              <h4>Buat User Baru</h4>
              <div class='mt-12 container'>
                <Form>
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>First Name</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                        placeholder='First Name'
                        name='first_name'
                        onChange={props.handleChange}
                        onBLur={props.handleBlur}
                      />
                      {props.errors.first_name && props.touched.first_name ? (
                        <div class='text-red-500 text-sm'>{props.errors.first_name}</div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Last Name</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                        placeholder='Last Name'
                        name='last_name'
                        onChange={props.handleChange}
                        onBLur={props.handleBlur}
                      />
                      {props.errors.last_name && props.touched.last_name ? (
                        <div class='text-red-500 text-sm'>{props.errors.last_name}</div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Email</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                        placeholder='Email'
                        name='email'
                        onChange={props.handleChange}
                        onBLur={props.handleBlur}
                      />
                      {props.errors.email && props.touched.email ? (
                        <div class='text-red-500 text-sm'>{props.errors.email}</div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Password</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={props.handleChange}
                        onBLur={props.handleBlur}
                      />
                      {props.errors.password && props.touched.password ? (
                        <div class='text-red-500 text-sm'>{props.errors.password}</div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Roles</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Row>
                        <Col>
                          <Form.Control
                            as='select'
                            name='role_id'
                            onChange={props.handleChange}
                            onBLur={props.handleBlur}>
                            {/* loop over roles and show them */}
                            <option>pilih</option>
                            {data.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.roleType}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                           <Col sm='2'>
                              <Form.Label>Access Menu</Form.Label>
                            </Col>

                            <Col sm='2' className="ml-3">
                              <div role="group" aria-labelledby="checkbox-group">
                                <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="1" />
                                      Dashboard                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="2" />
                                      Jurnal                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="3" />
                                      User                              
                                    </label>
                                 </Row>    
                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="4" />
                                      Role                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="5" />
                                      Daftar Akun                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="6" />
                                      Kontak                              
                                    </label>
                                 </Row>  
                                 
                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="7" />
                                      Laporan                              
                                    </label>
                                 </Row>                
                              </div>
                         </Col>

                         <Col sm='4'>
                         <div role="group" aria-labelledby="checkbox-group">
                                <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="8" />
                                      Pajak                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="9" />
                                      Produk                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="10" />
                                      Kas & Bank                              
                                    </label>
                                 </Row>    
                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="11" />
                                      Penjualan                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="12" />
                                      Pembelian                              
                                    </label>
                                 </Row>

                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="13" />
                                      Biaya                              
                                    </label>
                                 </Row>   
                                 
                                 <Row>
                                    <label>
                                      <Field type="checkbox" name="checked" value="14" />
                                      Pengaturan                              
                                    </label>
                                 </Row>               
                              </div>

                         </Col>
                  </Row>
                  
                  <Row>
                    <Col sm='2' />
                    <Col sm='4' className='d-flex justify-content-end mt-10'>
                      <Button variant='danger mr-2' onClick={cancelButton}>
                        Batal
                      </Button>
                      <Button variant='success' onClick={props.handleSubmit}>
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

export async function getServerSideProps() {
  // Get Roles from API
  const roles = await prisma.role.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });

  return {
    props: {
      data: roles,
    },
  };
}
