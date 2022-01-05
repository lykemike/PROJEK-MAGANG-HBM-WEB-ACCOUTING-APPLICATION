import React, { useState } from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import { Form, Row, Col, FormControl, Button, FormGroup, Table } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import PlaylistAddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray, Field } from "formik";
import Axios from "axios";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function create_jurnal({ data }) {
  const router = useRouter();

  const url = "http://localhost:3000/api/jurnal/createJurnal";

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  return (
    <Layout>
      <Head>
        <title>Buat Jurnal</title>
      </Head>
      <Formik
        initialValues={{
          tgl_transaksi: current,
          total_debit: "",
          total_kredit: "",
          fileattachment: [],
          balance: "",
          detail_jurnal: [
            {
              akun_id: "",
              akun_nama: "",
              deskripsi: "-",
              nominal: 0,
              tipe_saldo: "",
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
          // if (values.fileattachment.length > 0) {
          //   Array.from(values.fileattachment).map((i) => formData.append("file", i));
          // }

          Array.from(values.fileattachment).map((i) => formData.append("file", i));
          console.log(values);
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              // router.push(`view-jurnal/${idInvoice}`);
              router.push(`view-jurnal/${response.data[0].id.id}`);
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
                <Typography color="textPrimary">Jurnal</Typography>
              </Breadcrumbs>
              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Jurnal</h2>
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
                  {props.values.balance == "Balance" ? <h1 className="text-green-500">Balance</h1> : <h2 className="text-red-500">{props.values.balance}</h2>}
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm="2">
                <Form.Control placeholder={"Auto"} name="no_transaksi" onChange={props.handleChange} disabled />
              </Col>
              <Col sm="1" />
              <Col sm="2">
                <FormControl placeholder="Pick date" type="date" aria-label="date" onChange={props.handleChange} name="tgl_transaksi" value={current} />
                {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
              </Col>
            </Row>
            <div className="card mt-8">
              <div className="card-body">
                <Table responsive>
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th>Akun</th>
                      <th>Deskripsi</th>
                      <th>Debit</th>
                      <th>Kredit</th>
                      <th />
                    </tr>
                  </thead>
                  <FieldArray name="detail_jurnal">
                    {({ insert, remove, push }) => (
                      <tbody style={{ height: "10rem" }}>
                        {props.values.detail_jurnal.length > 0 &&
                          props.values.detail_jurnal.map((i, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  minWidth: 250,
                                  width: 250,
                                }}
                              >
                                <Select
                                  options={data}
                                  name={`detail_jurnal.${index}.akun_id`}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_jurnal.${index}.akun_id`, e.value);
                                    props.setFieldValue((props.values.detail_jurnal[index].akun_id = e.value));

                                    props.setFieldValue(`detail_jurnal.${index}.akun_nama`, e.label);
                                    props.setFieldValue((props.values.detail_jurnal[index].akun_nama = e.label));
                                  }}
                                />
                              </td>
                              <td
                                style={{
                                  minWidth: 300,
                                  width: 300,
                                }}
                              >
                                <Form.Control type="text" placeholder="-" name={`detail_jurnal.${index}.deskripsi`} />
                              </td>

                              <td
                                style={{
                                  minWidth: 200,
                                  width: 200,
                                }}
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="0"
                                  disabled={props.values.detail_jurnal[index].debit_disable}
                                  name={`detail_jurnal.${index}.debit`}
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
                              </td>

                              <td
                                style={{
                                  minWidth: 200,
                                  width: 200,
                                }}
                              >
                                <Form.Control
                                  type="number"
                                  placeholder="0"
                                  name="kredit"
                                  disabled={props.values.detail_jurnal[index].kredit_disable}
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
                              </td>
                              <td
                                style={{
                                  minWidth: 50,
                                  width: 50,
                                }}
                              >
                                <RemoveOutlinedIcon className="cursor-pointer" onClick={() => remove(index)} />
                              </td>
                            </tr>
                          ))}

                        <Button
                          className="ml-2 mt-4"
                          variant="primary"
                          onClick={() =>
                            push({
                              akun_id: "",
                              akun_nama: "",
                              deskripsi: "-",
                              debit: 0,
                              debit_disable: false,
                              kredit: 0,
                              kredit_disable: false,
                            })
                          }
                        >
                          <AddIcon fontSize="small" /> Tambah data
                        </Button>
                      </tbody>
                    )}
                  </FieldArray>
                </Table>
              </div>
            </div>
            <div className="card mt-8">
              <div className="card-body">
                <Row>
                  <Col sm="8">
                    File Attachment <br />
                    <Form.File type="file" name="fileattachment" onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
                  </Col>
                  <Col sm="2">
                    <h4>
                      Total Debit <br />
                      Rp.{" "}
                      {props.values.total_debit.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </h4>
                  </Col>
                  <Col sm="2">
                    <h4>
                      Total Kredit <br />
                      Rp.{" "}
                      {props.values.total_kredit.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </h4>
                  </Col>
                </Row>
              </div>
            </div>

            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
              <Link href="tabel-jurnal">
                <a>
                  <Button variant="danger">Batal</Button>
                </a>
              </Link>

              {props.values.total_debit == props.values.total_kredit ? (
                <Button variant="success" onClick={props.handleSubmit}>
                  Submit
                </Button>
              ) : (
                <Button variant="success" disabled>
                  Submit
                </Button>
              )}
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

  let detail = [];
  akuns.map((i) => {
    detail.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  return {
    props: {
      data: detail,
    },
  };
}
