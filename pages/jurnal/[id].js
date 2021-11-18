import React, { useState, useRef } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { Form, Row, Col, FormControl, Button, FormGroup } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import PlaylistAddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray, Field } from "formik";
import Select from "react-select";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function edit_jurnal({ data, data2, header, jurnal }) {
  const url = "http://localhost:3000/api/jurnal/updateJurnal";
  const formik = useRef(null);

  // Redirect
  const router = useRouter();
  const { id } = router.query;

  // Batal Button Function
  function cancelButton() {
    router.push("");
  }

  return (
    <Layout>
      <Head>
        <title>Update Jurnal</title>
      </Head>
      <Formik
        enableReinitialize={true}
        innerRef={formik}
        initialValues={{
          id: id,
          no_transaksi: header[0].no_transaksi,
          tgl_transaksi: header[0].tgl_transaksi,
          total_debit: header[0].total_debit,
          total_kredit: header[0].total_kredit,
          fileattachment: [],
          balance: "",
          detail_jurnal: jurnal,
          // debit_disable: false,
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
          Axios.put(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              //   router.push(`view-jurnal/${idInvoice}`);
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
                <Typography color="textPrimary">Update Jurnal</Typography>
              </Breadcrumbs>
              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Update Jurnal</h2>
                </Col>
                <Col sm="4"></Col>
              </Row>
            </div>

            <Row className="mt-4">
              <Col sm="3">
                <p className="font-semibold">No. Transaksi</p>
              </Col>
              <Col sm="3">
                <p className="font-semibold">Tanggal Transaksi</p>
              </Col>

              <Col sm="6">
                <div className="flex justify-end items-center">
                  {props.values.balance == "Balance" ? (
                    <h1 className="text-green-500">Balance</h1>
                  ) : (
                    <h2 className="text-red-500">{props.values.balance}</h2>
                  )}
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm="2">
                <Form.Control
                  placeholder={"Auto"}
                  name="no_transaksi"
                  onChange={props.handleChange}
                  value={props.values.no_transaksi}
                  disabled
                />
              </Col>
              <Col sm="1" />
              <Col sm="2">
                <FormControl
                  placeholder="Pick date"
                  type="date"
                  aria-label="date"
                  onChange={props.handleChange}
                  name="tgl_transaksi"
                  value={props.values.tgl_transaksi}
                  disabled
                />
                {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
              </Col>
            </Row>

            <div className="card mt-8">
              <div className="card-body">
                <Form>
                  <Row>
                    <Col sm="3">
                      <p className="font-semibold">Akun</p>
                    </Col>
                    <Col sm="2">
                      <p className="font-semibold">Deskripsi</p>
                    </Col>
                    <Col sm="1">
                      <p className="font-semibold">Tag</p>
                    </Col>
                    <Col sm="2">
                      <p className="font-semibold">Debit</p>
                    </Col>
                    <Col m="2">
                      <p className="font-semibold">Kredit</p>
                    </Col>
                    <Col sm="2">{/* <p className="font-semibold">Action</p> */}</Col>
                  </Row>

                  <FieldArray name="detail_jurnal">
                    {({ insert, remove, push }) => (
                      <div>
                        {props.values.detail_jurnal.length > 0 &&
                          props.values.detail_jurnal.map((i, index) => (
                            <div key={index} name="detail_jurnal">
                              <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="3">
                                  {/* <Field options={jurnal} name={`detail_jurnal.${index}.akun_id`} component={SelectField} /> */}
                                  <Form.Control
                                    as="select"
                                    name={`detail_jurnal.${index}.akun_id`}
                                    value={props.values.detail_jurnal[index].akun_id}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.akun_id`, e.target.value);
                                      let hasil2 = data.filter((i) => {
                                        return i.id === parseInt(e.target.value);
                                      });
                                    }}
                                  >
                                    <option value="kosong">Pilih</option>
                                    {data.map((namaAkun) => (
                                      <option key={namaAkun.id} value={namaAkun.id}>
                                        {namaAkun.nama_akun}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </Col>
                                <Col sm="2">
                                  <Form.Control
                                    placeholder="Isi Deskripsi"
                                    name="deskripsi"
                                    value={props.values.detail_jurnal[index].deskripsi}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.deskripsi`, e.target.value);
                                    }}
                                  />
                                </Col>
                                <Col sm="1">
                                  <Form.Control
                                    placeholder=""
                                    name="tag"
                                    value={props.values.detail_jurnal[index].tag}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_jurnal.${index}.tag`, e.target.value);
                                    }}
                                  />
                                </Col>
                                <Col sm="2">
                                  <Form.Control
                                    type="number"
                                    placeholder="Rp. 0,00"
                                    disabled={props.values.detail_jurnal[index].debit_disable}
                                    name={`detail_jurnal.${index}.debit`}
                                    value={props.values.detail_jurnal[index].debit}
                                    onChange={(e) => {
                                      if (e.target.value.length > 0) {
                                        props.setFieldValue(`detail_jurnal.${index}.kredit_disable`, true);
                                        props.setFieldValue(`detail_jurnal.${index}.debit`, parseInt(e.target.value));

                                        let debit = parseInt(e.target.value);
                                        props.setFieldValue((props.values.detail_jurnal[index].debit = debit));
                                        props.setFieldValue((props.values.detail_jurnal[index].nominal = debit));
                                        props.setFieldValue((props.values.detail_jurnal[index].tipe_saldo = "Debit"));

                                        const total_debit = props.values.detail_jurnal.reduce((a, b) => (a = a + b.debit), 0);
                                        props.setFieldValue((props.values.total_debit = total_debit));
                                        props.setFieldValue("total_debit", total_debit);

                                        if ((props.values.total_debit / props.values.total_kredit) % 0) {
                                          let balance = props.values.total_debit - props.values.total_kredit;
                                          props.setFieldValue((balance = "Balance"));
                                          props.setFieldValue("balance", balance);
                                        } else if (props.values.total_kredit > props.values.total_debit) {
                                          let balance = props.values.total_kredit - props.values.total_debit;
                                          props.setFieldValue(
                                            (balance =
                                              "Debit kurang: Rp. " +
                                              Math.abs(balance).toLocaleString({
                                                minimumFractionDigits: 0,
                                              }))
                                          );
                                          props.setFieldValue("balance", balance);
                                        } else {
                                          let balance = props.values.total_kredit - props.values.total_debit;
                                          props.setFieldValue(
                                            (balance =
                                              "Kredit kurang: Rp. " +
                                              Math.abs(balance).toLocaleString({
                                                minimumFractionDigits: 0,
                                              }))
                                          );
                                          props.setFieldValue("balance", balance);
                                        }
                                      } else {
                                        props.setFieldValue(`detail_jurnal.${index}.kredit_disable`, false);
                                        props.setFieldValue(`detail_jurnal.${index}.kredit`, 0);
                                        props.setFieldValue(`detail_jurnal.${index}.debit`, 0);

                                        let debit = 0;
                                        props.setFieldValue((props.values.detail_jurnal[index].debit = debit));
                                        props.setFieldValue((props.values.detail_jurnal[index].nominal = debit));
                                        props.setFieldValue((props.values.detail_jurnal[index].tipe_saldo = "Debit"));

                                        const total_debit = props.values.detail_jurnal.reduce((a, b) => (a = a + b.debit), 0);
                                        props.setFieldValue((props.values.total_debit = total_debit));
                                        props.setFieldValue("total_debit", total_debit);
                                      }
                                    }}
                                  />
                                </Col>
                                <Col sm="2">
                                  <Form.Control
                                    type="number"
                                    placeholder="Rp. 0,00"
                                    name="kredit"
                                    disabled={props.values.detail_jurnal[index].kredit_disable}
                                    value={props.values.detail_jurnal[index].kredit}
                                    onChange={(e) => {
                                      if (e.target.value.length > 0) {
                                        props.setFieldValue(`detail_jurnal.${index}.debit_disable`, true);
                                        props.setFieldValue(`detail_jurnal.${index}.kredit`, parseInt(e.target.value));

                                        let kredit = parseInt(e.target.value);
                                        props.setFieldValue((props.values.detail_jurnal[index].kredit = kredit));
                                        props.setFieldValue((props.values.detail_jurnal[index].nominal = kredit));
                                        props.setFieldValue((props.values.detail_jurnal[index].tipe_saldo = "Kredit"));

                                        const total_kredit = props.values.detail_jurnal.reduce((a, b) => (a = a + b.kredit), 0);
                                        props.setFieldValue((props.values.total_kredit = total_kredit));
                                        props.setFieldValue("total_kredit", total_kredit);

                                        if (props.values.total_kredit / props.values.total_debit == 1) {
                                          let balance = props.values.total_kredit - props.values.total_debit;
                                          props.setFieldValue((balance = "Balance"));
                                          props.setFieldValue("balance", balance);
                                        } else if (props.values.total_debit > props.values.total_kredit) {
                                          let balance = props.values.total_kredit - props.values.total_debit;
                                          props.setFieldValue(
                                            (balance =
                                              "Kredit kurang: Rp. " +
                                              Math.abs(balance).toLocaleString({
                                                minimumFractionDigits: 0,
                                              }))
                                          );
                                          props.setFieldValue("balance", balance);
                                        } else {
                                          let balance = props.values.total_kredit - props.values.total_debit;
                                          props.setFieldValue(
                                            (balance =
                                              "Debit kurang: Rp. " +
                                              Math.abs(balance).toLocaleString({
                                                minimumFractionDigits: 0,
                                              }))
                                          );
                                          props.setFieldValue("balance", balance);
                                        }
                                      } else {
                                        props.setFieldValue(`detail_jurnal.${index}.debit_disable`, false);
                                        props.setFieldValue(`detail_jurnal.${index}.debit`, 0);
                                        props.setFieldValue(`detail_jurnal.${index}.kredit`, 0);

                                        let kredit = 0;
                                        props.setFieldValue((props.values.detail_jurnal[index].kredit = kredit));
                                        props.setFieldValue((props.values.detail_jurnal[index].nominal = kredit));
                                        props.setFieldValue((props.values.detail_jurnal[index].tipe_saldo = "Kredit"));

                                        const total_kredit = props.values.detail_jurnal.reduce((a, b) => (a = a + b.kredit), 0);
                                        props.setFieldValue((props.values.total_kredit = total_kredit));
                                        props.setFieldValue("total_kredit", total_kredit);
                                      }
                                    }}
                                  />
                                </Col>
                                <Col sm="2">
                                  <Button variant="danger" onClick={() => remove(index)}>
                                    Remove
                                  </Button>
                                </Col>
                              </Form.Group>
                            </div>
                          ))}

                        <Button
                          variant="primary ml-2"
                          onClick={() =>
                            push({
                              akun_id: "",
                              deskripsi: "",
                              tag: "",
                              debit: "",
                              kredit: "",
                            })
                          }
                        >
                          <PlaylistAddIcon fontSize="medium" /> Tambah Data
                        </Button>
                      </div>
                    )}
                  </FieldArray>

                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="3"></Col>
                    <Col sm="3"></Col>
                    <Col sm="3" name="total_debit">
                      Total Debit <br />
                      Rp. {props.values.total_debit}
                    </Col>
                    <Col sm="3" name="total_kredit">
                      Total Kredit <br />
                      Rp. {props.values.total_kredit}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="3">
                      File Attachment <br />
                      <Form.File
                        type="file"
                        name="fileattachment"
                        onChange={(e) => props.setFieldValue("fileattachment", e.target.files)}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
              <Button variant="danger">Batal</Button>
              {props.values.total_debit == props.values.total_kredit ? (
                <Button variant="success" onClick={props.handleSubmit}>
                  Update
                </Button>
              ) : (
                <Button variant="success" disabled>
                  Update
                </Button>
              )}
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

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

  const header = await prisma.headerJurnal.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      DetailJurnal: {
        include: {
          akun: true,
        },
      },
    },
  });

  let jurnal = [];
  header[0].DetailJurnal.map((i) => {
    jurnal.push({
      akun_id: i.akun_id.toString(),
      deskripsi: i.deskripsi,
      tag: i.tag,
      debit: parseInt(i.debit),
      debit_disable: false,
      kredit: parseInt(i.kredit),
      kredit_disable: false,
      nominal: parseInt(i.nominal),
      tipe_saldo: i.tipe_saldo,
    });
  });

  return {
    props: {
      data: akuns,
      data2: jurnalterakhir,
      jurnal: jurnal,
      header: header,
    },
  };
}
