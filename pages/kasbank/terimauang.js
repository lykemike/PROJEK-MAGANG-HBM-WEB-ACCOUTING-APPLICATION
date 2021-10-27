import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Button, Table, DropdownButton, Dropdown, Row, Col, Form, Card, InputGroup, FormControl } from "react-bootstrap";
import AttachmentIcon from "@material-ui/icons/Attachment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import EventNoteIcon from "@material-ui/icons/EventNote";

import Select from "react-select";

import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Tables,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const KirimUangSchema = Yup.object().shape({
//     bank: Yup.string().required('Required'),
//     penerima : Yup.string().required('Required')
//   });

export default function terima_uang({ data, data2, data3, data4, data5 }) {
  const router = useRouter();

  const url = "http://localhost:3000/api/kasbank/createTerimaUang";

  const id = data5 != undefined ? parseInt(data5.id) + 1 : 1;
  // const id = 1;

  const [idInvoice, setIdInvoice] = useState(id);

  const ValidationSchema = Yup.object().shape({
    akun_setor_id: Yup.number().required("* required"),
  });

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  console.log(current);

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_setor_id: "",
          kontak_id: "",
          tgl_transaksi: current,
          no_transaksi: id,
          tag: "-",
          memo: "",
          subtotal: 0,
          total: "",
          fileattachment: [],
          hasil_pajak: "",
          boolean: false,
          detail_terima_uang: [
            {
              akun_id: "",
              nama_akun: "",
              deskripsi: "",
              pajak_id: "",
              pajak_nama: "",
              pajak_jual_id: "",
              pajak_persen: "",
              hasil_pajak: 0,
              jumlah: "",
              jumlah2: "",
            },
          ],
        }}
        validateSchema={ValidationSchema}
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
          console.log(values);
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              router.push(`view-terima/${idInvoice}`);
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
                <Link color="inherit" href="../kasbank/kasbankhome">
                  Transaksi
                </Link>
                <Typography color="textPrimary">Terima Uang</Typography>
              </Breadcrumbs>

              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Terima Uang</h2>
                </Col>
              </Row>
            </div>

            <div variant="container">
              <div class="mb-10">
                <Row className="mt-2">
                  <Col sm="4">
                    <Form.Label>Setor Ke</Form.Label>
                    <Select
                      options={data}
                      name="akun_setor_id"
                      onChange={(e) => {
                        props.setFieldValue("akun_setor_id", e.value);
                      }}
                    />
                    {props.errors.akun_setor_id && props.touched.akun_setor_id ? (
                      <div class="text-red-500 text-sm mt-2">{props.errors.akun_setor_id}</div>
                    ) : null}
                  </Col>

                  <Col className="d-flex justify-content-end" sm="8">
                    <Row>
                      <h3 className="mr-4">Total Amount</h3>
                      <h3 class="text-purple-700 text-opacity-100 "> Rp.{props.values.total}</h3>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div class="mb-10">
                <Row>
                  <Col>
                    <Form.Label>Yang Membayar</Form.Label>
                    <Select
                      options={data2}
                      name="kontak_id"
                      onChange={(e) => {
                        props.setFieldValue("kontak_id", e.value);
                      }}
                    />

                    {props.errors.kontak_id && props.touched.kontak_id ? <div>{props.errors.kontak_id}</div> : null}
                  </Col>

                  <Col>
                    <Form.Label>Tanggal Transaksi</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Pick date"
                        type="date"
                        aria-label="date"
                        name="tgl_transaksi"
                        value={props.values.tgl_transaksi}
                        onChange={props.handleChange}
                      />
                      {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                    </InputGroup>
                  </Col>

                  <Col>
                    <Form.Label>Nomor Transaksi</Form.Label>
                    <Form.Control placeholder={"Auto"} name="no_transaksi" disabled />
                  </Col>

                  <Col>
                    <Form.Label>Tag</Form.Label>
                    <Form.Control placeholder="-" name="tag" onChange={props.handleChange} />
                  </Col>
                </Row>
              </div>

              <div className="d-flex justify-content-end">
                <Form.Check
                  label="Harga Termasuk Pajak"
                  type="switch"
                  id="custom-switch"
                  onChange={(e) => {
                    if (e.target.checked === true) {
                      props.setFieldValue((props.values.boolean = true));
                      const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);
                      const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                      let harga_termasuk_pajak = jumlah_total - pajak_total;
                      props.setFieldValue((props.values.subtotal = harga_termasuk_pajak));
                      props.setFieldValue("subtotal", harga_termasuk_pajak);

                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                      props.setFieldValue("hasil_pajak", pajak_total);

                      let total = jumlah_total;
                      props.setFieldValue((props.values.total = total));
                      props.setFieldValue("total", total);
                    } else {
                      props.setFieldValue((props.values.boolean = false));
                      const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);
                      const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                      let harga_tidak_termasuk_pajak = jumlah_total;
                      props.setFieldValue((props.values.subtotal = harga_tidak_termasuk_pajak));
                      props.setFieldValue("subtotal", harga_tidak_termasuk_pajak);

                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                      props.setFieldValue("hasil_pajak", pajak_total);

                      let total = jumlah_total + pajak_total;
                      props.setFieldValue((props.values.total = total));
                      props.setFieldValue("total", total);
                    }
                  }}
                />
              </div>

              <div class="mb-12">
                <Table responsive class="table mt-4">
                  <thead class="thead-light">
                    <tr>
                      <th>Pembayaran Untuk Akun</th>
                      <th>Deskripsi</th>
                      <th>Pajak</th>
                      <th>Jumlah</th>
                      <th />
                    </tr>
                  </thead>
                  <FieldArray name="detail_terima_uang">
                    {({ insert, remove, push }) => (
                      <tbody name="detail_terima_uang">
                        {props.values.detail_terima_uang.length > 0 &&
                          props.values.detail_terima_uang.map((i, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  minWidth: 250,
                                }}
                              >
                                <Select
                                  options={data3}
                                  name={`detail_terima_uang.${index}.akun_id`}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_terima_uang.${index}.akun_id`, e.value);
                                  }}
                                />
                              </td>

                              <td
                                style={{
                                  minWidth: 200,
                                }}
                              >
                                <Form.Control
                                  placeholder="-"
                                  name={`detail_terima_uang.${index}.deskripsi`}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_terima_uang.${index}.deskripsi`, e.target.value);
                                  }}
                                />
                              </td>

                              <td
                                style={{
                                  minWidth: 200,
                                }}
                              >
                                <Select
                                  options={data4}
                                  name={`detail_terima_uang.${index}.pajak_id`}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_terima_uang.${index}.pajak_id`, e.value);

                                    let result = data4.filter((i) => {
                                      return i.value === e.value;
                                    });

                                    if (props.values.boolean == false) {
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_persen`, result[0].presentase_aktif);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_nama`, result[0].nama);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_jual_id`, result[0].akun_penjual.id);

                                      let jumlah = props.values.detail_terima_uang[index].jumlah;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                      const jumlah_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.jumlah),
                                        0
                                      );
                                      props.setFieldValue((props.values.subtotal = jumlah_total));
                                      props.setFieldValue("subtotal", jumlah_total);

                                      let pajak =
                                        props.values.detail_terima_uang[index].jumlah * (result[0].presentase_aktif / 100);
                                      props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                      const pajak_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.hasil_pajak),
                                        0
                                      );
                                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                      props.setFieldValue("hasil_pajak", pajak_total);

                                      let jumlah2 = props.values.detail_terima_uang[index].jumlah - pajak;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                      let total = jumlah_total + pajak_total;
                                      props.setFieldValue((props.values.total = total));
                                      props.setFieldValue("total", total);
                                    } else {
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_persen`, result[0].presentase_aktif);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_nama`, result[0].nama);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_jual_id`, result[0].akun_penjual.id);

                                      let jumlah = props.values.detail_terima_uang[index].jumlah;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                      const jumlah_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.jumlah),
                                        0
                                      );

                                      let pajak =
                                        props.values.detail_terima_uang[index].jumlah * (result[0].presentase_aktif / 100);
                                      props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                      const pajak_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.hasil_pajak),
                                        0
                                      );
                                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                      props.setFieldValue("hasil_pajak", pajak_total);

                                      let jumlah2 = props.values.detail_terima_uang[index].jumlah - pajak;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                      let harga_termasuk_pajak = jumlah_total - pajak_total;
                                      props.setFieldValue((props.values.subtotal = harga_termasuk_pajak));
                                      props.setFieldValue("subtotal", harga_termasuk_pajak);

                                      let total = jumlah_total;
                                      props.setFieldValue((props.values.total = total));
                                      props.setFieldValue("total", total);
                                    }
                                  }}
                                />
                                <Form.Control
                                  as="select"
                                  name={`detail_terima_uang.${index}.pajak_id`}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_terima_uang.${index}.pajak_id`, e.target.value);
                                    let hasil2 = data4.filter((i) => {
                                      return i.id === parseInt(e.target.value);
                                    });

                                    if (props.values.boolean == false) {
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_persen`, hasil2[0].presentasaAktif);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_nama`, hasil2[0].nama);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_jual_id`, hasil2[0].kategori1.id);

                                      let jumlah = props.values.detail_terima_uang[index].jumlah;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                      const jumlah_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.jumlah),
                                        0
                                      );
                                      props.setFieldValue((props.values.subtotal = jumlah_total));
                                      props.setFieldValue("subtotal", jumlah_total);

                                      let pajak =
                                        props.values.detail_terima_uang[index].jumlah * (hasil2[0].presentasaAktif / 100);
                                      props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                      const pajak_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.hasil_pajak),
                                        0
                                      );
                                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                      props.setFieldValue("hasil_pajak", pajak_total);

                                      let jumlah2 = props.values.detail_terima_uang[index].jumlah - pajak;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                      let total = jumlah_total + pajak_total;
                                      props.setFieldValue((props.values.total = total));
                                      props.setFieldValue("total", total);
                                    } else {
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_persen`, hasil2[0].presentasaAktif);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_nama`, hasil2[0].nama);
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_jual_id`, hasil2[0].kategori1.id);

                                      let jumlah = props.values.detail_terima_uang[index].jumlah;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                      const jumlah_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.jumlah),
                                        0
                                      );

                                      let pajak =
                                        props.values.detail_terima_uang[index].jumlah * (hasil2[0].presentasaAktif / 100);
                                      props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                      const pajak_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.hasil_pajak),
                                        0
                                      );
                                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                      props.setFieldValue("hasil_pajak", pajak_total);

                                      let jumlah2 = props.values.detail_terima_uang[index].jumlah - pajak;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                      let harga_termasuk_pajak = jumlah_total - pajak_total;
                                      props.setFieldValue((props.values.subtotal = harga_termasuk_pajak));
                                      props.setFieldValue("subtotal", harga_termasuk_pajak);

                                      let total = jumlah_total;
                                      props.setFieldValue((props.values.total = total));
                                      props.setFieldValue("total", total);
                                    }
                                  }}
                                >
                                  <option value="0">Pilih</option>
                                  {data4.map((pajaks, index) => (
                                    <option key={index} value={pajaks.id}>
                                      {pajaks.nama}
                                    </option>
                                  ))}
                                </Form.Control>
                              </td>

                              <td
                                style={{
                                  minWidth: 200,
                                }}
                              >
                                <Form.Control
                                  placeholder="Rp. 0, 00"
                                  type="number"
                                  min="0"
                                  name={`detail_terima_uang.${index}.jumlah`}
                                  onChange={(e) => {
                                    props.setFieldValue(`detail_terima_uang.${index}.jumlah`, parseInt(e.target.value));

                                    if (props.values.boolean == false) {
                                      let jumlah = parseInt(e.target.value);
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                      const jumlah_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.jumlah),
                                        0
                                      );
                                      props.setFieldValue((props.values.subtotal = jumlah_total));
                                      props.setFieldValue("subtotal", jumlah_total);

                                      let pajak =
                                        parseInt(e.target.value) * (props.values.detail_terima_uang[index].pajak_persen / 100);
                                      props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                      const pajak_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.hasil_pajak),
                                        0
                                      );
                                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                      props.setFieldValue("hasil_pajak", pajak_total);

                                      let jumlah2 = jumlah - props.values.detail_terima_uang[index].hasil_pajak;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                      let total = jumlah_total + pajak_total;
                                      props.setFieldValue((props.values.total = total));
                                      props.setFieldValue("total", total);
                                    } else {
                                      let jumlah = parseInt(e.target.value);
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                      const jumlah_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.jumlah),
                                        0
                                      );

                                      let pajak =
                                        parseInt(e.target.value) * (props.values.detail_terima_uang[index].pajak_persen / 100);
                                      props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                      const pajak_total = props.values.detail_terima_uang.reduce(
                                        (a, b) => (a = a + b.hasil_pajak),
                                        0
                                      );
                                      props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                      props.setFieldValue("hasil_pajak", pajak_total);

                                      let jumlah2 = jumlah - props.values.detail_terima_uang[index].hasil_pajak;
                                      props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                      let harga_termasuk_pajak = jumlah_total - pajak_total;
                                      props.setFieldValue((props.values.subtotal = harga_termasuk_pajak));
                                      props.setFieldValue("subtotal", harga_termasuk_pajak);

                                      let total = jumlah_total;
                                      props.setFieldValue((props.values.total = total));
                                      props.setFieldValue("total", total);
                                    }
                                  }}
                                ></Form.Control>
                              </td>

                              <td>
                                <Button variant="primary" onClick={() => remove(index)} onChange={(e) => {}}>
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}

                        <Button
                          variant="primary ml-2"
                          onClick={() =>
                            push({
                              nama_akun: "",
                              deskripsi: "",
                              pajak_id: "",
                              pajak_nama: "",
                              pajak_jual_id: "",
                              pajak_persen: "",
                              hasil_pajak: "",
                              jumlah: "",
                              jumlah2: "",
                            })
                          }
                        >
                          <PlaylistAddIcon fontSize="medium" /> Tambah Data
                        </Button>
                      </tbody>
                    )}
                  </FieldArray>
                </Table>
              </div>

              <div class="mb-6">
                <Row>
                  <Col>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Memo</Form.Label>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} name="memo" placeholder="Isi Memo" onChange={props.handleChange} />
                        {props.errors.memo && props.touched.memo ? <div>{props.errors.memo}</div> : null}
                      </Form.Group>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Subtotal
                      </Form.Label>
                      <Col sm="6">
                        <Form.Label column sm="2" name="subtotal">
                          Rp.{props.values.subtotal.toLocaleString({ minimumFractionDigits: 0 })}
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm="3">
                        Pajak
                      </Form.Label>
                      <Col sm="6">
                        <Form.Label column sm="2" name="hasil_pajak">
                          Rp.{props.values.hasil_pajak}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div class="mb-10">
                <Row>
                  <Col>
                    <div>
                      <Form.Label>
                        <AttachmentIcon /> Lampiran
                      </Form.Label>

                      <Card border="secondary" style={{ width: "15rem" }}>
                        File Attachment <br />
                        <Form.File
                          type="file"
                          name="fileattachment"
                          onChange={(e) => props.setFieldValue("fileattachment", e.target.files)}
                        />
                      </Card>
                    </div>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Form.Group as={Row} controlId="\\">
                      <Form.Label column sm="4">
                        Total Fixed
                      </Form.Label>
                      <Col sm="8">
                        <Form.Label column sm="2" name="total">
                          Rp.{props.values.total}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="float-right mb-10">
                <Button variant="danger mr-2">
                  <HighlightOffIcon fontSize="medium" /> Batal
                </Button>

                <Button variant="success" type="submit" onClick={props.handleSubmit}>
                  <CheckCircleIcon fontSize="medium" /> Buat Transferan
                </Button>
              </div>
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
  get_akun_kas_bank.map((i) => {
    akun_kas_bank.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  const get_kontaks = await prisma.kontak.findMany({});

  let kontaks = [];
  get_kontaks.map((i) => {
    kontaks.push({
      value: i.id,
      label: i.nama_panggilan,
    });
  });

  const get_akun_awalan_piutang = await prisma.akun.findMany({
    where: {
      nama_akun: {
        startsWith: "piutang",
      },
    },
  });

  const akun_awalan_piutang = [];
  get_akun_awalan_piutang.map((i) => {
    akun_awalan_piutang.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const get_pajaks = await prisma.pajak.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      kategori1: true,
    },
  });

  const pajaks = [];
  get_pajaks.map((i) => {
    pajaks.push({
      value: i.id,
      label: i.nama,
      presentase_aktif: i.presentasaAktif,
      akun_penjual: i.akunPenjual,
      akun_pembeli: i.akunPembeli,
    });
  });

  const terimauangterakhir = await prisma.headerTerimaUang.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  return {
    props: {
      data: akun_kas_bank,
      data2: kontaks,
      data3: akun_awalan_piutang,
      data4: pajaks,
      data5: terimauangterakhir,
    },
  };
}
