import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { Breadcrumbs, Typography } from "@material-ui/core/";
import { Add, Backspace } from "@material-ui/icons/";

import Axios from "axios";
import * as Yup from "yup";
import Select from "react-select";
import { Formik, Form as Forms, FieldArray, getIn } from "formik";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function reimbursement({ data }) {
  const url = "http://localhost:3000/api/reimbursement/createReimbursement";
  const router = useRouter();

  const ValidationSchema = Yup.object().shape({
    nama_pegawai: Yup.string().required("*required"),
    periode_id: Yup.string().required("*required"),
    yang_mengetahui: Yup.string().required("*required"),
    yang_menyetujui: Yup.string().required("*required"),
    detail_reimburse: Yup.array().of(
      Yup.object().shape({
        tanggal: Yup.string().required("*required"),
        jumlah: Yup.number("*must be a number").typeError("*required").min(1, "*minimal 1").required("*required"),
      })
    ),
  });
  return (
    <Layout>
      <Head>
        <title>Buat Reimbursement</title>
      </Head>
      <Formik
        initialValues={{
          nama_pegawai: "",
          yang_mengetahui: "",
          yang_menyetujui: "",
          periode_id: "",
          current_periode: "",
          detail_reimburse: [
            {
              tanggal: "",
              tempat: "",
              biaya: "",
              keterangan: "",
              jumlah: 0,
            },
          ],
          total: 0,
        }}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.push(`view/${response.data.id.id}`);
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
                <Typography color="textPrimary">Reimbursement</Typography>
              </Breadcrumbs>
              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Pembuatan Reimbursement</h2>
                </Col>
                <Col sm="4" />
              </Row>
            </div>

            <div class="mb-10 mt-2">
              <Row>
                <Col sm="3">
                  <label className="font-medium">
                    Nama Pegawai
                    {props.errors.nama_pegawai && props.touched.nama_pegawai ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.nama_pegawai}</span> : null}
                  </label>
                  <Form.Control
                    placeholder="-"
                    type="text"
                    name="nama_pegawai"
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      let uppercase_word = e.target.value
                        .split(/ /g)
                        .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                        .join(" ");

                      props.setFieldValue((props.values.nama_pegawai = uppercase_word));
                    }}
                  />
                </Col>
                <Col sm="3">
                  <label className="font-medium">
                    Periode Reimbursement
                    {props.errors.periode_id && props.touched.periode_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.periode_id}</span> : null}
                  </label>
                  <Select
                    options={data}
                    name="periode_id"
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      props.setFieldValue(`periode_id`, e.value);

                      let day = new Date();
                      let current_year = day.getFullYear();
                      let current_month = e.value;
                      let new_month = "";
                      current_month < 10 ? (new_month = "0" + current_month) : (new_month = current_month);
                      let join_new_date = [current_year, new_month, "01"].join("-");
                      props.setFieldValue(`current_periode`, join_new_date);
                      props.setFieldValue((props.values.current_periode = join_new_date));
                    }}
                  />
                </Col>
              </Row>
            </div>

            <Table responsive>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Tanggal</th>
                  <th>Tempat</th>
                  <th>Biaya</th>
                  <th>Keterangan</th>
                  <th>Jumlah</th>
                  <th />
                </tr>
              </thead>
              <FieldArray name="detail_reimburse">
                {({ insert, remove, push }) => (
                  <tbody>
                    {props.values.detail_reimburse.length > 0 &&
                      props.values.detail_reimburse.map((i, index) => (
                        <tr key={index}>
                          <td style={{ minWidth: 250, width: 250 }}>
                            <Form.Control
                              type="date"
                              name={`detail_reimburse.${index}.tanggal`}
                              onBlur={props.handleBlur}
                              value={props.values.current_periode}
                              onChange={(e) => {
                                let input = e.target.value;
                                let split_input = input.split("-");
                                let split_input_day = split_input[2];

                                let split_periode = props.values.current_periode.split("-");
                                let year = split_periode[0];
                                let month = split_periode[1];
                                let day = split_periode[2];

                                let new_tanggal = [year, month, split_input_day].join("-");

                                props.setFieldValue(`detail_reimburse.${index}.tanggal`, new_tanggal);
                                props.setFieldValue((props.values.detail_reimburse[index].tanggal = new_tanggal));
                              }}
                            />
                            {getIn(props.errors, `detail_reimburse.${index}.tanggal`) && getIn(props.touched, `detail_reimburse.${index}.tanggal`) ? (
                              <span class="ml-1 text-xs font-medium text-red-500 required-dot">{getIn(props.errors, `detail_reimburse.${index}.tanggal`)}</span>
                            ) : null}
                          </td>
                          <td style={{ minWidth: 350, width: 350 }}>
                            <Form.Control
                              type="text"
                              name={`detail_reimburse.${index}.tempat`}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                let uppercase_word = e.target.value
                                  .split(/ /g)
                                  .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                                  .join(" ");

                                props.setFieldValue((props.values.detail_reimburse[index].tempat = uppercase_word));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 350, width: 350 }}>
                            <Form.Control
                              type="text"
                              name={`detail_reimburse.${index}.biaya`}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                let uppercase_word = e.target.value
                                  .split(/ /g)
                                  .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                                  .join(" ");

                                props.setFieldValue((props.values.detail_reimburse[index].biaya = uppercase_word));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 350, width: 350 }}>
                            <Form.Control
                              type="text"
                              name={`detail_reimburse.${index}.keterangan`}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                let uppercase_word = e.target.value
                                  .split(/ /g)
                                  .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                                  .join(" ");

                                props.setFieldValue((props.values.detail_reimburse[index].keterangan = uppercase_word));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 200, width: 200 }}>
                            <Form.Control
                              min="0"
                              type="number"
                              name={`detail_reimburse.${index}.jumlah`}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                props.setFieldValue(`detail_reimburse.${index}.jumlah`, parseInt(e.target.value));
                                props.setFieldValue((props.values.detail_reimburse[index].jumlah = parseInt(e.target.value)));

                                const total = props.values.detail_reimburse.reduce((a, b) => (a = a + b.jumlah), 0);
                                props.setFieldValue(`total`, total);
                                props.setFieldValue((props.values.total = total));
                              }}
                            />
                            {getIn(props.errors, `detail_reimburse.${index}.jumlah`) && getIn(props.touched, `detail_reimburse.${index}.jumlah`) ? (
                              <span class="ml-1 text-xs font-medium text-red-500 required-dot">{getIn(props.errors, `detail_reimburse.${index}.jumlah`)}</span>
                            ) : null}
                          </td>
                          <td style={{ minWidth: 50, width: 50 }}>
                            <Button variant="danger" onClick={() => remove(index)}>
                              <Backspace fontSize="small" />
                            </Button>
                          </td>
                        </tr>
                      ))}

                    <Button
                      className="ml-2 mt-4 py-2"
                      variant="primary"
                      onClick={() =>
                        push({
                          tanggal: "",
                          tempat: "",
                          biaya: "",
                          keterangan: "",
                          jumlah: 0,
                        })
                      }
                    >
                      <Add fontSize="small" /> Tambah data
                    </Button>
                  </tbody>
                )}
              </FieldArray>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td className="d-flex justify-content-end">
                    <label className="font-medium">Total</label>
                  </td>
                  <td>Rp. {props.values.total.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td />
                </tr>
              </tfoot>
            </Table>

            <div className="border-t border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <label className="font-medium">
                    Yang Mengetahui
                    {props.errors.yang_mengetahui && props.touched.yang_mengetahui ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.yang_mengetahui}</span> : null}
                  </label>
                  <Form.Control
                    placeholder="-"
                    name="yang_mengetahui"
                    type="text"
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      let uppercase_word = e.target.value
                        .split(/ /g)
                        .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                        .join(" ");

                      props.setFieldValue((props.values.yang_mengetahui = uppercase_word));
                    }}
                  />
                </Col>
                <Col sm="3">
                  <label className="font-medium">
                    Yang Menyetujui
                    {props.errors.yang_menyetujui && props.touched.yang_menyetujui ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.yang_menyetujui}</span> : null}
                  </label>
                  <Form.Control
                    placeholder="-"
                    name="yang_menyetujui"
                    type="text"
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      let uppercase_word = e.target.value
                        .split(/ /g)
                        .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                        .join(" ");

                      props.setFieldValue((props.values.yang_menyetujui = uppercase_word));
                    }}
                  />
                </Col>
                <Col />
              </Row>
            </div>

            <div className="float-right mb-10">
              <Link href={`../reimbursement/tabel-reimbursement`}>
                <a>
                  <Button variant="danger mr-2">Batal</Button>
                </a>
              </Link>

              <Button variant="success" type="submit" onClick={props.handleSubmit}>
                Buat
              </Button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const get_periode = await prisma.periode.findMany({});
  let periode = [];
  get_periode.map((i) => {
    periode.push({
      value: i.id,
      label: i.nama,
    });
  });

  return {
    props: {
      data: periode,
    },
  };
}
