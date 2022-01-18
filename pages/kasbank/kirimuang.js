import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import Link from "next/link";
import Head from "next/head";
import { Button, Table, DropdownButton, Dropdown, Row, Col, Form, Card, InputGroup, FormControl } from "react-bootstrap";

import { Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Tables, TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Axios from "axios";
import * as Yup from "yup";
import Select from "react-select";
import { Formik, Form as Forms, FieldArray } from "formik";

const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";

export default function kirim_uang({ data, data2, data3 }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/kasbank/createKirimUang";

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const validation = Yup.object().shape({
    akun_bayar_id: Yup.string().required("* required"),
    kontak_id: Yup.string().required("* required"),
  });

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_bayar_id: "",
          kontak_id: "",
          tgl_transaksi: current,
          memo: "",
          total: 0,
          fileattachment: [],
          detail_kirim_uang: [
            {
              akun_id: "",
              nama_akun: "",
              deskripsi: "-",
              jumlah: 0,
            },
          ],
        }}
        validationSchema={validation}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            if (key == "detail_kirim_uang") {
              formData.append(`${key}`, JSON.stringify(values[key]));
            } else {
              formData.append(`${key}`, `${values[key]}`);
            }
          }
          Array.from(values.fileattachment).map((i) => formData.append("file", i));
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              router.push(`view-kirim/${response.data.id}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Head>
              <title>Buat Kirim Uang</title>
            </Head>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Transaksi</Typography>
              </Breadcrumbs>
              <h2 className="text-blue-600">Kirim Uang</h2>
            </div>

            <div class="border-b border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <label className="font-medium">
                    Bayar dari
                    {props.errors.akun_bayar_id && props.touched.akun_bayar_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.akun_bayar_id}</span> : null}
                  </label>
                  <Select
                    options={data}
                    name="akun_bayar_id"
                    onChange={(e) => {
                      props.setFieldValue("akun_bayar_id", e.value);
                    }}
                  />
                </Col>
                <Col sm="3" />
                <Col sm="3" />
                <Col sm="3">
                  <div className="d-flex justify-content-end">
                    <h3 className="mr-2">Total Amount:</h3>
                    <h3 className="text-blue-600">
                      Rp.{" "}
                      {props.values.total.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </h3>
                  </div>
                </Col>
              </Row>
            </div>

            <div class="border-b border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <label className="font-medium">Penerima</label>
                  <Select
                    options={data2}
                    name="kontak_id"
                    onChange={(e) => {
                      props.setFieldValue("kontak_id", e.value);
                    }}
                  />
                  {props.errors.kontak_id && props.touched.kontak_id ? <div class="text-red-500 text-sm mt-2">{props.errors.kontak_id}</div> : null}
                </Col>

                <Col sm="3">
                  <label className="font-medium">Tanggal Transaksi</label>
                  <InputGroup className="mb-3">
                    <FormControl value={props.values.tgl_transaksi} type="date" aria-label="date" name="tgl_transaksi" onChange={props.handleChange} />
                    {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                  </InputGroup>
                </Col>

                <Col sm="3">
                  <label className="font-medium">Nomor Transaksi</label>
                  <Form.Control placeholder={"Auto"} name="no_transaksi" disabled />
                </Col>
              </Row>
            </div>

            <Table responsive>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Pembayaran Untuk Akun</th>
                  <th>Deskripsi</th>
                  <th>Jumlah</th>
                  <th />
                </tr>
              </thead>
              <FieldArray name="detail_kirim_uang">
                {({ insert, remove, push }) => (
                  <tbody style={{ height: "10rem" }}>
                    {props.values.detail_kirim_uang.length > 0 &&
                      props.values.detail_kirim_uang.map((i, index) => (
                        <tr key={index}>
                          <td>
                            <Select
                              options={data3}
                              name={`detail_kirim_uang.${index}.akun_id`}
                              onChange={(e) => {
                                props.setFieldValue(`detail_kirim_uang.${index}.akun_id`, e.value);
                                props.setFieldValue(`detail_kirim_uang.${index}.nama_akun`, e.label);
                              }}
                            />
                          </td>

                          <td>
                            <Form.Control
                              placeholder="-"
                              name={`detail_kirim_uang.${index}.deskripsi`}
                              onChange={(e) => {
                                props.setFieldValue(`detail_kirim_uang.${index}.deskripsi`, e.target.value);
                              }}
                            />
                          </td>

                          <td>
                            <Form.Control
                              placeholder="0"
                              type="number"
                              min="0"
                              name={`detail_kirim_uang.${index}.jumlah`}
                              onChange={(e) => {
                                props.setFieldValue((props.values.detail_kirim_uang[index].jumlah = parseInt(e.target.value)));
                                props.setFieldValue(`detail_kirim_uang.${index}.jumlah`, parseInt(e.target.value));

                                const total = props.values.detail_kirim_uang.reduce((a, b) => (a = a + b.jumlah), 0);
                                props.setFieldValue((props.values.total = total));
                                props.setFieldValue(`total`, total);
                              }}
                            />
                          </td>

                          <td className="flex justify-end">
                            <Button variant="danger" onClick={() => remove(index)}>
                              <BackspaceIcon fontSize="small" />
                            </Button>
                          </td>
                        </tr>
                      ))}

                    <Button className="ml-2 mt-4" variant="primary" onClick={() => push({ akun_id: "", nama_akun: "", deskripsi: "-", jumlah: 0 })}>
                      <AddIcon fontSize="small" /> Tambah data
                    </Button>
                  </tbody>
                )}
              </FieldArray>
            </Table>

            <div class="mb-6">
              <Row>
                <Col sm="4">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <label className="font-medium">Memo</label>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Control as="textarea" rows={3} name="memo" placeholder="-" onChange={props.handleChange} />
                      {props.errors.memo && props.touched.memo ? <div>{props.errors.memo}</div> : null}
                    </Form.Group>
                  </Form.Group>
                  File Attachment <br />
                  <Form.File type="file" name="fileattachment" onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
                </Col>
                <Col sm="4" />
                <Col sm="4">
                  <Row>
                    <Col sm="8">Total</Col>
                    <Col sm="4">
                      <label name="total">
                        Rp.{" "}
                        {props.values.total.toLocaleString({
                          minimumFractionDigits: 0,
                        })}
                      </label>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="flex justify-end mb-10">
              <Button variant="danger mr-2">
                <HighlightOffIcon fontSize="medium" /> Batal
              </Button>

              <Button variant="success" type="submit" onClick={props.handleSubmit}>
                <CheckCircleIcon fontSize="medium" /> Buat Transferan
              </Button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const get_akun_kas_bank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun_kas_bank = [];
  get_akun_kas_bank.map((i) =>
    akun_kas_bank.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    })
  );

  const get_kontaks = await prisma.kontak.findMany({
    orderBy: {
      nama: "asc",
    },
  });

  let kontaks = [];
  get_kontaks.map((i) =>
    kontaks.push({
      value: i.id,
      label: i.nama_perusahaan,
    })
  );

  const get_akun_utang = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [8, 10, 11],
      },
    },
  });

  let akun_utang = [];
  get_akun_utang.map((i) =>
    akun_utang.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    })
  );

  return {
    props: {
      data: akun_kas_bank,
      data2: kontaks,
      data3: akun_utang,
    },
  };
}
