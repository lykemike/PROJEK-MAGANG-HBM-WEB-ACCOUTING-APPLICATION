import React from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";

import Head from "next/head";
import { Button, Table, Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";

import { Breadcrumbs, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Axios from "axios";
import Select from "react-select";
import { Formik, Form as Forms, FieldArray } from "formik";

const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";

export default function TerimaUang({ data, data2, data3, data4 }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/kasbank/updateTerimaUang";

  return (
    <Layout>
      <Formik
        initialValues={{
          id: data4.id,
          akun_setor_id: data4.akun_setor_id,
          kontak_id: data4.kontak_id,
          tgl_transaksi: data4.tgl_transaksi,
          memo: data4.memo,
          total: data4.total,
          fileattachment: [],
          detail_terima_uang: data4.DetailTerimaUang,
        }}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            if (key == "detail_terima_uang") {
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
              router.push(`../view-terima/${response.data.id}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Head>
              <title>Update Terima Uang</title>
            </Head>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Transaksi</Typography>
              </Breadcrumbs>
              <h2 className="text-blue-600">Update Terima Uang</h2>
            </div>

            <div class="border-b border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <label className="font-medium">
                    Setor Ke
                    {props.errors.akun_setor_id && props.touched.akun_setor_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.akun_setor_id}</span> : null}
                  </label>
                  <Select
                    options={data}
                    defaultValue={{ label: data4.akun_setor.kode_akun + " - " + data4.akun_setor.nama_akun, value: props.values.akun_setor_id }}
                    name="akun_setor_id"
                    onChange={(e) => {
                      props.setFieldValue("akun_setor_id", e.value);
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
                  <label className="font-medium">
                    Yang Membayar
                    {props.errors.kontak_id && props.touched.kontak_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.kontak_id}</span> : null}
                  </label>
                  <Select
                    options={data2}
                    name="kontak_id"
                    defaultValue={{ label: data4.kontak.nama_perusahaan, value: props.values.kontak_id }}
                    onChange={(e) => {
                      props.setFieldValue("kontak_id", e.value);
                    }}
                  />
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
                  <th>Terima Dari</th>
                  <th>Deskripsi</th>
                  <th>Jumlah</th>
                  <th />
                </tr>
              </thead>
              <FieldArray name="detail_terima_uang">
                {({ insert, remove, push }) => (
                  <tbody style={{ height: "10rem" }}>
                    {props.values.detail_terima_uang.length > 0 &&
                      props.values.detail_terima_uang.map((i, index) => (
                        <tr key={index}>
                          <td>
                            <Select
                              options={data3}
                              name={`detail_terima_uang.${index}.akun_id`}
                              defaultValue={{ label: props.values.detail_terima_uang[index].nama_akun, value: props.values.detail_terima_uang[index].akun_id }}
                              onChange={(e) => {
                                props.setFieldValue(`detail_terima_uang.${index}.akun_id`, e.value);
                                props.setFieldValue(`detail_terima_uang.${index}.nama_akun`, e.label);
                              }}
                            />
                          </td>

                          <td>
                            <Form.Control
                              placeholder="-"
                              name={`detail_terima_uang.${index}.deskripsi`}
                              value={props.values.detail_terima_uang[index].deskripsi}
                              onChange={(e) => {
                                props.setFieldValue(`detail_terima_uang.${index}.deskripsi`, e.target.value);
                              }}
                            />
                          </td>

                          <td>
                            <Form.Control
                              placeholder="0"
                              type="number"
                              min="0"
                              name={`detail_terima_uang.${index}.jumlah`}
                              value={props.values.detail_terima_uang[index].jumlah}
                              onChange={(e) => {
                                props.setFieldValue((props.values.detail_terima_uang[index].jumlah = parseInt(e.target.value)));
                                props.setFieldValue(`detail_terima_uang.${index}.jumlah`, parseInt(e.target.value));

                                const total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);
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

                    <Button
                      className="ml-2 mt-4"
                      onClick={() =>
                        push({
                          akun_id: "",
                          nama_akun: "",
                          deskripsi: "-",
                          jumlah: 0,
                        })
                      }
                    >
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
                      <Form.Control as="textarea" rows={3} name="memo" value={props.values.memo} placeholder="-" onChange={props.handleChange} />
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
                      Rp.{" "}
                      {props.values.total.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>

            <div className="flex justify-end mb-10">
              <Button variant="danger mr-2">Batal</Button>

              <Button variant="success" type="submit" onClick={props.handleSubmit}>
                Update Terima Uang
              </Button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { edit } = context.query;
  const get_akun_kas_bank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun_kas_bank = [];
  get_akun_kas_bank.map((i) => {
    akun_kas_bank.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

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

  const get_akun_awalan_piutang = await prisma.akun.findMany({
    where: {
      nama_akun: {
        startsWith: "piutang",
      },
    },
  });

  let akun_awalan_piutang = [];
  get_akun_awalan_piutang.map((i) => {
    akun_awalan_piutang.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  const get_terima_uang = await prisma.headerTerimaUang.findFirst({
    where: {
      id: parseInt(edit),
    },
    include: {
      DetailTerimaUang: {
        include: {
          akun: true,
        },
      },
      akun_setor: true,
      kontak: true,
    },
  });
  return {
    props: {
      data: akun_kas_bank,
      data2: kontaks,
      data3: akun_awalan_piutang,
      data4: get_terima_uang,
    },
  };
}
