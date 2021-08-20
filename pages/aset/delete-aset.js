import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";

import * as Yup from 'yup'
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function addaset({ data }) {
    const router = useRouter();
    const url = "http://localhost:3000/api/";
  
    const id = data != undefined ? parseInt(data.id) + 1 : 1;
  
    const [idInvoice, setIdInvoice] = useState(id);
  
   
    return (
        <Layout>
          <Formik
            initialValues={{
              akun_transfer: "",
              akun_setor: "",
              jumlah: "",
              memo: "",
              no_transaksi: id,
              tgl_transaksi: "",
              tag: "",
            }}
            onSubmit={async (values) => {
              // alert(JSON.stringify(values, null, 2));
              console.log(values);
              Axios.post(url, values)
                .then(function (response) {
                  console.log(response);
                  router.push(``);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}>
            {(props) => (
              <Forms noValidate>
      {/* <Formik
        initialValues={{
        
        }}
        // validationSchema={}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
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
          <Forms noValidate> */}
            <div>
              <h4>Pelepasan Aset</h4>
              <h5 class="mt-5">Nomor Aset - Nama Aset</h5>
              <div class='mt-12 container'>
                <Form>
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Tanggal Transaksi</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                        type="date"
                        placeholder=''
                        name='tgl_transaksi'
                        onChange={props.handleChange}
                        // onChange={props.handleChange}
                        // onBLur={props.handleBlur}
                      />
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Harga Jual</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                        placeholder=''
                        name='harga_jual'
                        onChange={props.handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Deposit ke</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                        as="select"
                        placeholder='deposit_ke'
                        onChange={props.handleChange}
                      />
      
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Memo</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control
                         as="textarea" 
                         rows={3}
                         onChange={props.handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Tags</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Row>
                        <Col>
                          <Form.Control
                            type="text"
                            name='tag'
                            onChange={props.handleChange}>
                            {/* loop over roles and show them */}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col sm='2' />
                    <Col sm='4' className='d-flex justify-content-end mt-10'>
                      <Button variant='danger mr-2'>
                        Batal
                      </Button>
                      <Button variant='success'>
                        Simpan
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          {/* </Forms>
        )}
      </Formik> */}
            </Forms>
        )}
      </Formik>
    </Layout>
  );
}

