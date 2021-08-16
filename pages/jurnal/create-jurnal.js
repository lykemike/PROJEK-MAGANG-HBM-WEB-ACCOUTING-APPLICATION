import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, FormControl, Button, FormGroup } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import PlaylistAddIcon from "@material-ui/icons/Add";
import Link from "next/link";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import 'date-fns';
// import {KeyboardDatePicker} from '@material-ui/pickers';

export default function create_jurnal({ data, data2 }) {
  const router = useRouter();

  const url = "http://localhost:3000/api/jurnal/createJurnal";
  const id = data2 != undefined ? parseInt(data2.id) + 1 : 1;
  // const id = 1;

  const [idInvoice, setIdInvoice] = useState(id);

  return (
    <Layout>
      <Formik
        initialValues={{
          no_transaksi: id,
          tgl_transaksi: "",
          total_debit: "",
          total_kredit: "",
          fileattachment: [],
          detail_jurnal: [
            {
              akun_id: "",
              deskripsi: "",
              tag: "",
              debit: 0,
              debit_disable: false,
              kredit: 0,
              kredit_disable: false,
            },
          ],
        }}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            if (key == "detail_jurnal") {
              formData.append(`${key}`, JSON.stringify(values[key]));
            } else {
              formData.append(`${key}`, `${values[key]}`);
            }
          }
          Array.from(values.fileattachment).map((i) => formData.append("file", i));
          console.log(values);
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              router.push(`view-jurnal/${idInvoice}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <h1>Jurnal</h1>
            <Form>
              <Form.Group as={Row} controlId='formPlaintext'>
                <Form.Label column sm='2'>
                  No. Transaksi
                </Form.Label>
                <Form.Label column sm='2'>
                  Tgl.Transaksi
                </Form.Label>
              </Form.Group>
              <Form.Group as={Row} controlId='formPlaintext'>
                <Col sm='2'>
                  <Form.Control placeholder={"Auto " + "(" + id + ")"} name='no_transaksi' onChange={props.handleChange} disabled />
                </Col>
                <Col sm='2'>
                  <FormControl placeholder='Pick date' type='date' aria-label='date' onChange={props.handleChange} name='tgl_transaksi' />
                  {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                  {/* <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline" label="Date picker inline" value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}/> */}
                </Col>
              </Form.Group>
            </Form>

            <div className='card'>
              <div className='card-body'>
                <Form>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Form.Label column sm='2'>
                      Akun
                    </Form.Label>
                    <Form.Label column sm='2'>
                      Deskripsi
                    </Form.Label>
                    <Form.Label column sm='1'>
                      Tag
                    </Form.Label>
                    <Form.Label column sm='2'>
                      Debit
                    </Form.Label>
                    <Form.Label column sm='2'>
                      Kredit
                    </Form.Label>
                    <Form.Label column sm='2'>
                      Action
                    </Form.Label>
                  </Form.Group>

                  <FieldArray name='detail_jurnal'>
                    {({ insert, remove, push }) => (
                      <div>
                        {props.values.detail_jurnal.length > 0 &&
                          props.values.detail_jurnal.map((i, index) => (
                            <div key={index} name='detail_jurnal'>
                              <Form.Group as={Row} controlId='formPlaintext'>
                                <Col sm='2'>
                                  <Form.Control
                                    as='select'
                                    name={`detail_jurnal.${index}.akun_id`}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.akun_id`, e.target.value);
                                      let hasil2 = data.filter((i) => {
                                        return i.id === parseInt(e.target.value);
                                      });
                                    }}>
                                    <option value='kosong'>Pilih</option>
                                    {data.map((namaAkun) => (
                                      <option key={namaAkun.id} value={namaAkun.id}>
                                        {namaAkun.nama_akun}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </Col>
                                <Col sm='2'>
                                  <Form.Control
                                    placeholder='Isi Deskripsi'
                                    name='deskripsi'
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.deskripsi`, e.target.value);
                                    }}
                                  />
                                </Col>
                                <Col sm='1'>
                                  <Form.Control
                                    placeholder=''
                                    name='tag'
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.tag`, e.target.value);
                                    }}
                                  />
                                </Col>
                                <Col sm='2'>
                                  <Form.Control
                                    placeholder='Isi Debit'
                                    disabled={props.values.detail_jurnal[index].debit_disable}
                                    name={`detail_jurnal.${index}.debit`}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.debit`, parseInt(e.target.value));
                                      let debit = parseInt(e.target.value);
                                      props.setFieldValue((props.values.detail_jurnal[index].debit = debit));
                                      const total_debit = props.values.detail_jurnal.reduce((a, b) => (a = a + b.debit), 0);
                                      props.setFieldValue((props.values.total_debit = total_debit));
                                      props.setFieldValue("total_debit", total_debit);

                                      if (e.target.value.length > 0) {
                                        props.setFieldValue(`detail_jurnal.${index}.kredit_disable`, true);
                                      } else {
                                        props.setFieldValue(`detail_jurnal.${index}.kredit_disable`, false);
                                        props.setFieldValue(`detail_jurnal.${index}.kredit`, 0);
                                      }
                                    }}
                                  />
                                </Col>
                                <Col sm='2'>
                                  <Form.Control
                                    placeholder='Isi Kredit'
                                    name='kredit'
                                    disabled={props.values.detail_jurnal[index].kredit_disable}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.kredit`, parseInt(e.target.value));
                                      let kredit = parseInt(e.target.value);
                                      props.setFieldValue((props.values.detail_jurnal[index].kredit = kredit));
                                      const total_kredit = props.values.detail_jurnal.reduce((a, b) => (a = a + b.kredit), 0);
                                      props.setFieldValue((props.values.total_kredit = total_kredit));
                                      props.setFieldValue("total_kredit", total_kredit);

                                      if (e.target.value.length > 0) {
                                        props.setFieldValue(`detail_jurnal.${index}.debit_disable`, true);
                                      } else {
                                        props.setFieldValue(`detail_jurnal.${index}.debit_disable`, false);
                                        props.setFieldValue(`detail_jurnal.${index}.debit`, 0);
                                      }
                                    }}
                                  />
                                </Col>
                                <Col sm='2'>
                                  <Button variant='primary' onClick={() => remove(index)}>
                                    Remove
                                  </Button>
                                </Col>
                              </Form.Group>
                            </div>
                          ))}

                        <Button
                          variant='primary ml-2'
                          onClick={() =>
                            push({
                              akun_id: "",
                              deskripsi: "",
                              tag: "",
                              debit: 0,
                              debit_disable: false,
                              kredit: 0,
                              kredit_disable: false,
                            })
                          }>
                          <PlaylistAddIcon fontSize='medium' /> Tambah Data
                        </Button>
                      </div>
                    )}
                  </FieldArray>

                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='3'></Col>
                    <Col sm='3'></Col>
                    <Col sm='3' name='total_debit'>
                      Total Debit <br />
                      Rp. {props.values.total_debit}
                    </Col>
                    <Col sm='3' name='total_kredit'>
                      Total Kredit <br />
                      Rp. {props.values.total_kredit}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='3'>
                      File Attachment <br />
                      <Form.File type='file' name='fileattachment' onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div class='left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3'>
              <button onclick='openModal(false)' class='bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none ml-4 mr-2'>
                Batal
              </button>

              <button class='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none' onClick={props.handleSubmit}>
                Submit
              </button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps({}) {
  const akuns = await prisma.akun.findMany({
    orderBy: [
      {
        nama_akun: "asc",
      },
    ],
    include: {
      kategori_akun: true,
    },
  });

  const jurnalterakhir = await prisma.headerJurnal.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  return {
    props: {
      data: akuns,
      data2: jurnalterakhir,
    },
  };
}
