import React from "react";
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function updateReimbursement({ header, detail }) {
  const router = useRouter();
  const { id } = router.query;

  function cancelButton() {
    router.push("../reimbursement/tabel-reimbursement");
  }

  const api_update_reimbursement = "http://localhost:3000/api/reimbursement/updateReimbursement";

  return (
    <Formik
      initialValues={{
        nama_pegawai: header.nama_pegawai,
        yang_mengetahui: header.yang_mengetahui,
        yang_menyetujui: header.yang_menyetujui,
        periode: header.periode,
        status: header.status,
        detail_reimburse: detail,
      }}
      onSubmit={(values) => {
        let data = { ...values, id };
        Axios.put(api_update_reimbursement, data)
          .then(function (response) {
            console.log(response);
            router.push(`view/${response.data.id}`);
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
    >
      {(props) => (
        <Forms noValidate>
          <Layout>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../reimbursement/tabel-reimbursement">
                  Tabel Reimbursement
                </Link>
                <Typography color="textPrimary">Update Reimbursement</Typography>
              </Breadcrumbs>
              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Update Reimbursement</h2>
                </Col>
                <Col sm="4" />
              </Row>
            </div>

            <div class="mb-10 mt-2">
              <Row>
                <Col sm="3">
                  <Form.Label>Nama Pegawai</Form.Label>
                  <Form.Control
                    placeholder={props.values.nama_pegawai}
                    type="text"
                    name="nama_pegawai"
                    onChange={(e) => {
                      let name = e.target.value;
                      let name2 = name.charAt(0).toUpperCase() + name.slice(1);
                      props.setFieldValue((props.values.nama_pegawai = name2));
                    }}
                  />
                </Col>
                <Col sm="3">
                  <Form.Label>Periode Reimbursement</Form.Label>
                  <Form.Control value={props.values.periode} as="select" name="periode" onChange={props.handleChange}>
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
                </Col>
              </Row>
            </div>

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
                                  value={props.values.detail_reimburse[index].tanggal}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_reimburse.${index}.tanggal`, e.target.value);
                                  }}
                                />
                              </Col>
                              <Col sm="3">
                                <Form.Control
                                  name="tempat"
                                  placeholder="-"
                                  value={props.values.detail_reimburse[index].tempat}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_reimburse.${index}.tempat`, e.target.value);
                                  }}
                                />
                              </Col>
                              <Col sm="2">
                                <Form.Control
                                  type="text"
                                  placeholder="-"
                                  value={props.values.detail_reimburse[index].biaya}
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
                                  value={props.values.detail_reimburse[index].keterangan}
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
                                  value={props.values.detail_reimburse[index].jumlah}
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

            <hr />
            <div>
              <Row>
                <Col sm="3">
                  <Form.Label>Yang Mengetahui</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="yang_mengetahui"
                    value={props.values.yang_mengetahui}
                    type="text"
                    onChange={(e) => {
                      let name = e.target.value;
                      let name2 = name.charAt(0).toUpperCase() + name.slice(1);
                      props.setFieldValue((props.values.yang_mengetahui = name2));
                    }}
                  />
                </Col>
                <Col sm="3">
                  <Form.Label>Yang Menyetujui</Form.Label>
                  <Form.Control
                    placeholder="-"
                    name="yang_menyetujui"
                    value={props.values.yang_menyetujui}
                    type="text"
                    onChange={(e) => {
                      let name = e.target.value;
                      let name2 = name.charAt(0).toUpperCase() + name.slice(1);
                      props.setFieldValue((props.values.yang_menyetujui = name2));
                    }}
                  />
                </Col>
                <Col></Col>
              </Row>
            </div>

            <div className="float-right mb-10">
              <Button variant="danger mr-2" onClick={cancelButton}>
                <HighlightOffIcon fontSize="medium" /> Batal
              </Button>
              <Button variant="success" type="submit" onClick={props.handleSubmit}>
                <CheckCircleIcon fontSize="medium" /> Update Reimbursement
              </Button>
            </div>
          </Layout>
        </Forms>
      )}
    </Formik>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_reimbursement = await prisma.headerReimburse.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      DetailReimburse: true,
    },
  });

  let detail = [];
  get_reimbursement.DetailReimburse.map((i) => {
    detail.push({
      header_reimburse_id: i.header_reimburse_id,
      tanggal: i.tanggal,
      tempat: i.tempat,
      biaya: i.biaya,
      keterangan: i.keterangan,
      jumlah: parseInt(i.jumlah),
    });
  });

  return {
    props: {
      header: get_reimbursement,
      detail: detail,
    },
  };
}
