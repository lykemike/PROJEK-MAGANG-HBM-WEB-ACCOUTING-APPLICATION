import React, { useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Button, Row, Col, Form } from "react-bootstrap";
import { Formik, Form as Forms, FieldArray } from "formik";
import * as Yup from "yup";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Axios from "axios";
import { useRouter } from "next/router";

export default function reimbursement() {
  const url = "http://localhost:3000/api/reimbursement/createReimbursement";
  const router = useRouter();

  const ReimburseSchema = Yup.object().shape({
    nama_pegawai: Yup.string().required("*Nama Harap Diisi"),
    yang_mengetahui: Yup.string().required("*Nama Harap Diisi"),
    yang_menyetujui: Yup.string().required("*Nama Harap Diisi"),
    periode: Yup.string().required("*Periode Harap Diisi"),
  });

  function cancelButton() {
    router.push("../reimbursement/tabel-reimbursement");
  }

  return (
    <div>
      <Layout>
        <Formik
          initialValues={{
            nama_pegawai: "",
            yang_mengetahui: "",
            yang_menyetujui: "",
            periode: "",
            status: "Process",
            detail_reimburse: [
              {
                tanggal: "",
                tempat: "-",
                biaya: "-",
                keterangan: "-",
                jumlah: 0,
              },
            ],
          }}
          validationSchema={ReimburseSchema}
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
                  <Link color="inherit" href="../reimbursement/tabel-reimbursement">
                    Tabel Reimbursement
                  </Link>
                  <Typography color="textPrimary">Pembuatan Reimbursement</Typography>
                </Breadcrumbs>
                <Row>
                  <Col sm="8">
                    <h2 className="text-blue-600">Pembuatan Reimbursement</h2>
                  </Col>
                  <Col sm="4" />
                </Row>
              </div>

              <div variant="container">
                <div class="mb-10 mt-2">
                  <Row>
                    <Col sm="3">
                      <Form.Label>Nama Pegawai</Form.Label>
                      <Form.Control
                        placeholder="-"
                        type="text"
                        name="nama_pegawai"
                        onChange={(e) => {
                          let name = e.target.value;
                          let name2 = name.charAt(0).toUpperCase() + name.slice(1);
                          props.setFieldValue((props.values.nama_pegawai = name2));
                        }}
                      />
                      {props.errors.nama_pegawai && props.touched.nama_pegawai ? (
                        <div class="text-red-500 text-sm">{props.errors.nama_pegawai}</div>
                      ) : null}
                    </Col>
                    <Col sm="3">
                      <Form.Label>Periode Reimbursement</Form.Label>
                      <Form.Control placeholder="-" as="select" name="periode" onChange={props.handleChange}>
                        <option value="kosong">Pilih Periode Bulan</option>
                        <option value="Januari">Januari</option>
                        <option value="Februari">Februari</option>
                        <option value="Maret">Maret</option>
                        <option value="April">April</option>
                        <option value="Mei">Mei</option>
                        <option value="Juni">Juni</option>
                        <option value="Juli">Juli</option>
                        <option value="Agustus">Agustus</option>
                        <option value="September">September</option>
                        <option value="Oktober">Oktober</option>
                        <option value="November">November</option>
                        <option value="Desember">Desember</option>
                      </Form.Control>
                      {props.errors.periode && props.touched.periode ? (
                        <div class="text-red-500 text-sm">{props.errors.periode}</div>
                      ) : null}
                    </Col>
                  </Row>
                </div>
                <Form>
                  <div className="card">
                    <div className="card-body">
                      <Row>
                        <Col sm="2">
                          <p className="font-semibold">Tanggal</p>
                        </Col>
                        <Col sm="3">
                          <p className="font-semibold">Deskripsi</p>
                        </Col>
                        <Col sm="2">
                          <p className="font-semibold">Biaya</p>
                        </Col>
                        <Col sm="3">
                          <p className="font-semibold">Keterangan</p>
                        </Col>
                        <Col m="2">
                          <p className="font-semibold">Jumlah</p>
                        </Col>
                      </Row>
                      <FieldArray name="detail_reimburse">
                        {({ insert, remove, push }) => (
                          <div>
                            {props.values.detail_reimburse.length > 0 &&
                              props.values.detail_reimburse.map((i, index) => (
                                <div key={index} name="detail_reimburse">
                                  <Row className="mt-2" key={index}>
                                    <Col sm="2">
                                      <Form.Control
                                        type="date"
                                        name="tanggal"
                                        aria-label="date"
                                        onChange={(e) => {
                                          props.setFieldValue(`detail_reimburse.${index}.tanggal`, e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col sm="3">
                                      <Form.Control
                                        type="text"
                                        placeholder="-"
                                        name="tempat"
                                        onChange={(e) => {
                                          props.setFieldValue(`detail_reimburse.${index}.tempat`, e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col sm="2">
                                      <Form.Control
                                        type="text"
                                        placeholder="-"
                                        name="biaya"
                                        onChange={(e) => {
                                          props.setFieldValue(`detail_reimburse.${index}.biaya`, e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col sm="3">
                                      <Form.Control
                                        type="text"
                                        placeholder="-"
                                        name="keterangan"
                                        onChange={(e) => {
                                          props.setFieldValue(`detail_reimburse.${index}.keterangan`, e.target.value);
                                        }}
                                      />
                                    </Col>
                                    <Col sm="2">
                                      <Form.Control
                                        type="number"
                                        placeholder="Rp. 0, 00"
                                        min="0"
                                        name="jumlah"
                                        onChange={(e) => {
                                          props.setFieldValue(`detail_reimburse.${index}.jumlah`, parseInt(e.target.value));
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              ))}

                            <Button
                              variant="primary mt-4"
                              onClick={() =>
                                push({
                                  tanggal: "",
                                  tempat: "-",
                                  biaya: "-",
                                  keterangan: "-",
                                  jumlah: 0,
                                })
                              }
                            >
                              <PlaylistAddIcon fontSize="medium" /> Tambah Data
                            </Button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </Form>

                <hr />
                <div>
                  <Row>
                    <Col sm="3">
                      <Form.Label>Yang Mengetahui</Form.Label>
                      <Form.Control
                        placeholder="-"
                        name="yang_mengetahui"
                        type="text"
                        onChange={(e) => {
                          let name = e.target.value;
                          let name2 = name.charAt(0).toUpperCase() + name.slice(1);
                          props.setFieldValue((props.values.yang_mengetahui = name2));
                        }}
                      />
                      {props.errors.yang_mengetahui && props.touched.yang_mengetahui ? (
                        <div class="text-red-500 text-sm">{props.errors.yang_mengetahui}</div>
                      ) : null}
                    </Col>
                    <Col sm="3">
                      <Form.Label>Yang Menyetujui</Form.Label>
                      <Form.Control
                        placeholder="-"
                        name="yang_menyetujui"
                        type="text"
                        onChange={(e) => {
                          let name = e.target.value;
                          let name2 = name.charAt(0).toUpperCase() + name.slice(1);
                          props.setFieldValue((props.values.yang_menyetujui = name2));
                        }}
                      />
                      {props.errors.yang_menyetujui && props.touched.yang_menyetujui ? (
                        <div class="text-red-500 text-sm">{props.errors.yang_menyetujui}</div>
                      ) : null}
                    </Col>
                    <Col></Col>
                  </Row>
                </div>

                <div className="float-right mb-10">
                  <Button variant="danger mr-2" onClick={cancelButton}>
                    <HighlightOffIcon fontSize="medium" /> Batal
                  </Button>
                  <Button variant="success" type="submit" onClick={props.handleSubmit}>
                    <CheckCircleIcon fontSize="medium" /> Buat Reimbursement
                  </Button>
                </div>
              </div>
            </Forms>
          )}
        </Formik>
      </Layout>
    </div>
  );
}
