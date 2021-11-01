import React from "react";
import Layout from "../../components/Layout";
import SidebarSetting from "../../components/SidebarSetting";
import { Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function settingperusahaan({ data }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/setting/updatePerusahaan";

  return (
    <Layout>
      <Formik
        initialValues={{
          file_upload: [],
          tampil_logo: data.tampil_logo,
          nama_perusahaan: data.nama_perushaan,
          alamat: data.alamat,
          alamat_pengiriman: data.alamat_pengiriman,
          telepon: data.telepon,
          fax: data.fax,
          npwp: data.npwp,
          website: data.website,
          email: data.email,
          nama_bank: data.nama_bank,
          cabang_bank: data.cabang_bank,
          alamat_bank: data.alamat_bank,
          nomor_rekening: data.nomor_rekening,
          atas_nama: data.atas_nama,
          swift_code: data.swift_code,
        }}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          let formData = new FormData();
          for (var key in values) {
            formData.append(`${key}`, `${values[key]}`);
          }
          Array.from(values.file_upload).map((i) => formData.append("file", i));
          console.log(values);
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              router.push("");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <h1>Pengaturan</h1>
            <Form>
              <Form.Group as={Row} controlId="formPlaintext">
                <Col sm="3">
                  <SidebarSetting />
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="4">
                  <h3>Pengaturan Perusahaan</h3>

                  <Row className="mb-2">
                    <Col>Logo</Col>
                    <Col>
                      <Form.File
                        type="file"
                        name="file_upload"
                        accept="image/*"
                        onChange={(e) => props.setFieldValue("file_upload", e.target.files)}
                      />
                      {props.errors.file_upload && props.touched.file_upload ? (
                        <div class="text-red-500 text-sm">
                          <ErrorOutlineIcon />
                          {props.errors.file_upload}
                        </div>
                      ) : null}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Tampilan Logo di Laporan</Col>
                    <Col>
                      <input
                        class="form-check-input position-static ml-1"
                        type="checkbox"
                        id="blankCheckbox"
                        checked={props.values.tampil_logo}
                        name="tampil_logo"
                        onChange={(e) => {
                          props.setFieldValue((props.values.tampil_logo = e.target.checked));
                        }}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Nama Perusahaan</Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name="nama_perusahaan"
                        value={props.values.nama_perusahaan}
                        onChange={props.handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Alamat</Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="alamat"
                          value={props.values.alamat}
                          onChange={props.handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Alamat Pengiriman</Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="alamat_pengiriman"
                          value={props.values.alamat_pengiriman}
                          onChange={props.handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Telepon</Col>
                    <Col>
                      <Form.Control type="text" name="telepon" value={props.values.telepon} onChange={props.handleChange} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Fax</Col>
                    <Col>
                      <Form.Control type="text" name="fax" value={props.values.fax} onChange={props.handleChange} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>NPWP</Col>
                    <Col>
                      <Form.Control type="text" name="npwp" value={props.values.npwp} onChange={props.handleChange} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Website</Col>
                    <Col>
                      <Form.Control type="text" name="website" value={props.values.website} onChange={props.handleChange} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Email</Col>
                    <Col>
                      <Form.Control type="text" name="email" value={props.values.email} onChange={props.handleChange} />
                    </Col>
                  </Row>
                </Col>
                <Col sm="4">
                  <h3>Detil Akun Bank</h3>

                  <Row className="mb-2">
                    <Col>Nama Bank</Col>
                    <Col>
                      <Form.Control type="text" name="nama_bank" value={props.values.nama_bank} onChange={props.handleChange} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Cabang Bank</Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name="cabang_bank"
                        value={props.values.cabang_bank}
                        onChange={props.handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Alamat Bank</Col>
                    <Col>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="alamat_bank"
                          value={props.values.alamat_bank}
                          onChange={props.handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Nomor Rekening</Col>
                    <Col>
                      <Form.Control
                        type="text"
                        name="nomor_rekening"
                        value={props.values.nomor_rekening}
                        onChange={props.handleChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Atas Nama</Col>
                    <Col>
                      <Form.Control type="text" name="atas_nama" value={props.values.atas_nama} onChange={props.handleChange} />
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>Swift Code</Col>
                    <Col>
                      <Form.Control type="text" name="swift_code" value={props.values.swift_code} onChange={props.handleChange} />
                    </Col>
                  </Row>
                </Col>
              </Form.Group>
            </Form>
            <div class="float-right">
              <button
                onclick="openModal(false)"
                class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none"
              >
                Batal
              </button>
              <button
                class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none"
                onClick={props.handleSubmit}
              >
                Ubah
              </button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const get_setting_perusahaan = await prisma.settingPerusahaan.findFirst({
    where: {
      id: 1,
    },
  });

  return {
    props: {
      data: get_setting_perusahaan,
    },
  };
}
