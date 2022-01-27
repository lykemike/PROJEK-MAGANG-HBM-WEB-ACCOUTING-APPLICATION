import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../../components/Layout";
import { Row, Col, Form, Button, FormCheck, Table, InputGroup, FormControl } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";

import { Snackbar, Breadcrumbs, Table as Tables, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@material-ui/core/";

import * as Yup from "yup";
import Select from "react-select";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function pembayaran_jual({ data, data2, data3, data4, data5 }) {
  const router = useRouter();
  const { id } = router.query;
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState, toast_message: "" });
  };

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };

  const url = "http://localhost:3000/api/jual/createPenerimaanPembayaran";

  function pembayaran() {
    router.push(`../pembayaran/view/${id}`);
  }

  const ValidationSchema = Yup.object().shape({
    setor_ke: Yup.string().required("*required"),
    pajak_id: Yup.string().required("*required"),
    say: Yup.string().required("*required"),
    bank_id: Yup.string().required("*required"),
  });

  const today = new Date();
  const current_date = today.toISOString().slice(0, 10);
  const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const split_date = today.toISOString().slice(0, 10);

  return (
    <Layout>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Head>
        <title>Penerimaan Pembayaran</title>
      </Head>
      <Formik
        initialValues={{
          id: id,
          setor_ke: "",
          nama_akun_setor: "",
          date: current_date,
          pajak_id: "",
          pajak_nama: "",
          pajak_persen: 0,

          presentase_penagihan: 0,
          deskripsi: "-",
          subtotal: data[0].subtotal,
          tagihan_sebelum_pajak: 0,
          pajak_label: "Pajak",
          pajak_total: 0,
          tagihan_setelah_pajak: 0,
          say: "",

          bank_id: "",
          tipe_perusahaan: data[0].tipe_perusahaan,

          pajak_keluaran_nama: data[0].pajak.nama,
          pajak_keluaran_presentase_aktif: data[0].pajak.presentase_aktif,
          pajak_keluaran_total: 0,
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => {
          Axios.post(url, values)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.push(`../pembayaran/view/${response.data.id.id}`);
              }, 2000);
            })
            .catch(function (error) {
              setState({ open: true, toast_message: error.response.data.message });
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary"> Transaksi</Typography>
            </Breadcrumbs>
            <h2 className="text-blue-600">Penerimaan Pembayaran</h2>

            <div className="border-t border-gray-200">
              <Row className="mt-2 mb-2">
                <Col sm="3">
                  <label className="font-medium">Pelanggan</label>
                  <Form.Control placeholder={data[0].kontak.nama_perusahaan} disabled />
                </Col>

                <Col sm="3">
                  <label className="font-medium">
                    Setor Ke
                    {props.errors.setor_ke && props.touched.setor_ke ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.setor_ke}</span> : null}
                  </label>
                  <Select
                    options={data2}
                    name="setor_ke"
                    onChange={(e) => {
                      props.setFieldValue("setor_ke", e.value);
                      props.setFieldValue("nama_akun_setor", e.label2);
                    }}
                  />
                </Col>
                <Col sm="3" />
                <Col>
                  <div className="mt-4">
                    <h3>Rp. {props.values.tagihan_setelah_pajak.toLocaleString({ minimumFractionDigits: 0 })}</h3>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="border-t border-gray-200">
              <Row className="mt-2">
                <Col sm="3">
                  <label className="font-medium">No. Transkasi</label>
                  <Form.Control disabled placeholder={"Sales Invoice #" + data[0].id} />
                </Col>

                <Col sm="3">
                  <label className="font-medium">Tanggal Pembayaran</label>
                  <Form.Control placeholder="" type="date" name="date" value={props.values.date} onChange={props.handleChange} />
                </Col>

                <Col sm="3">
                  <label className="font-medium">Nomor Kontrak</label>
                  <Form.Control disabled placeholder={data[0].nomor_kontrak} />
                </Col>

                <Col sm="3" />
              </Row>

              <Row className="mt-2">
                <Col />
                <Col sm="3">
                  <label className="font-medium">Tanggal Kontrak</label>
                  <Form.Control disabled value={data[0].tgl_kontrak_mulai} type="date" />
                </Col>
                <Col sm="3">
                  <label className="font-medium">No. Invoice Custom</label>
                  <Form.Control disabled placeholder={data[0].custom_invoice} />
                </Col>

                <Col sm="3"></Col>
              </Row>
            </div>

            <Table className="mt-8">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Nomor</th>
                  <th>Deskripsi</th>
                  <th>Subtotal</th>
                  <th>Total</th>
                  <th>Sisa Tagihan</th>
                  <th>Pajak Masukan</th>
                  <th>%</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ minWidth: 250, width: 250 }}>Sales Invoice #{data[0].id}</td>
                  <td style={{ minWidth: 250, width: 250 }}>
                    <Form.Control
                      as="textarea"
                      style={{ height: "60px" }}
                      size="sm"
                      onChange={(e) => {
                        let uppercase_word = e.target.value;

                        props.setFieldValue("deskripsi", uppercase_word);
                      }}
                    />
                  </td>
                  <td style={{ minWidth: 150, width: 150 }}>Rp. {data[0].subtotal.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td style={{ minWidth: 150, width: 150 }}>Rp. {data[0].total.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td style={{ minWidth: 150, width: 150 }}>Rp. {data[0].sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td style={{ minWidth: 300, width: 300 }}>
                    <Select
                      options={data3}
                      name="pajak_id"
                      onChange={(e) => {
                        props.setFieldValue("pajak_id", e.value);
                        props.setFieldValue("pajak_label", e.label);
                        props.setFieldValue("pajak_nama", e.label2);
                        props.setFieldValue("pajak_persen", e.pajak_persen);

                        let tagihan_sebelum_pajak = props.values.subtotal * (props.values.presentase_penagihan / 100);
                        props.setFieldValue(`tagihan_sebelum_pajak`, tagihan_sebelum_pajak);
                        props.setFieldValue((props.values.tagihan_sebelum_pajak = tagihan_sebelum_pajak));

                        let total_pajak = tagihan_sebelum_pajak * (e.pajak_persen / 100);
                        props.setFieldValue(`pajak_total`, total_pajak);
                        props.setFieldValue((props.values.pajak_total = total_pajak));

                        let total_pajak_keluaran = tagihan_sebelum_pajak * (props.values.pajak_keluaran_presentase_aktif / 100);
                        props.setFieldValue(`pajak_keluaran_total`, total_pajak_keluaran);
                        props.setFieldValue((props.values.pajak_keluaran_total = total_pajak_keluaran));

                        let tagihan_setelah_pajak = tagihan_sebelum_pajak + total_pajak_keluaran;
                        props.setFieldValue(`tagihan_setelah_pajak`, tagihan_setelah_pajak);
                        props.setFieldValue((props.values.tagihan_setelah_pajak = tagihan_setelah_pajak));
                      }}
                    />
                    {props.errors.pajak_id && props.touched.pajak_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.pajak_id}</span> : null}
                  </td>
                  <td style={{ minWidth: 100, width: 100 }}>
                    <FormControl
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0"
                      name="presentase_penagihan"
                      onChange={(e) => {
                        let persen = parseInt(e.target.value);
                        props.setFieldValue(`presentase_penagihan`, persen);

                        let tagihan_sebelum_pajak = props.values.subtotal * (e.target.value / 100);
                        props.setFieldValue(`tagihan_sebelum_pajak`, tagihan_sebelum_pajak);
                        props.setFieldValue((props.values.tagihan_sebelum_pajak = tagihan_sebelum_pajak));

                        let total_pajak = tagihan_sebelum_pajak * (props.values.pajak_persen / 100);
                        props.setFieldValue(`pajak_total`, total_pajak);
                        props.setFieldValue((props.values.pajak_total = total_pajak));

                        let total_pajak_keluaran = tagihan_sebelum_pajak * (props.values.pajak_keluaran_presentase_aktif / 100);
                        props.setFieldValue(`pajak_keluaran_total`, total_pajak_keluaran);
                        props.setFieldValue((props.values.pajak_keluaran_total = total_pajak_keluaran));

                        let tagihan_setelah_pajak = tagihan_sebelum_pajak + total_pajak_keluaran;
                        props.setFieldValue(`tagihan_setelah_pajak`, tagihan_setelah_pajak);
                        props.setFieldValue((props.values.tagihan_setelah_pajak = tagihan_setelah_pajak));
                      }}
                    />
                  </td>
                  <td style={{ minWidth: 250, width: 250 }}>
                    <InputGroup>
                      <InputGroup.Append>
                        <InputGroup.Text>Rp. </InputGroup.Text>
                      </InputGroup.Append>
                      <Form.Control disabled type="number" name="tagihan_sebelum_pajak" min="0" placeholder={props.values.tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })} />
                    </InputGroup>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="font-medium text-sm">Jumlah Tagihan Sebelum Pajak</td>
                  <td className="text-sm">Rp. {props.values.tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })}</td>
                </tr>

                <tr>
                  <td className="font-medium text-sm">{props.values.pajak_keluaran_nama + " - " + props.values.pajak_keluaran_presentase_aktif + "%"}</td>
                  <td className="text-sm">Rp. {props.values.pajak_keluaran_total.toLocaleString({ minimumFractionDigits: 0 })}</td>
                </tr>

                <tr>
                  <td className="font-medium text-sm">Jumlah Tagihan Setelah Pajak</td>
                  <td className="text-sm">Rp. {props.values.tagihan_setelah_pajak.toLocaleString({ minimumFractionDigits: 0 })}</td>
                </tr>
                <tr>
                  <td className="font-medium text-sm">
                    Terbilang
                    {props.errors.say && props.touched.say ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.say}</span> : null}
                  </td>
                  <td>
                    <Form.Control
                      as="textarea"
                      style={{ height: "60px" }}
                      size="sm"
                      onChange={(e) => {
                        let uppercase_word = e.target.value
                          .split(/ /g)
                          .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                          .join(" ");

                        props.setFieldValue("say", uppercase_word);
                      }}
                    />
                  </td>
                </tr>
              </tfoot>
            </Table>

            <Row>
              <Col sm="3">
                <label className="font-medium text-sm">
                  Bank
                  {props.errors.bank_id && props.touched.bank_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.bank_id}</span> : null}
                </label>
                <Select
                  options={data4}
                  name="bank_id"
                  onChange={(e) => {
                    props.setFieldValue(`bank_id`, e.value);
                  }}
                />
              </Col>
            </Row>

            <Row className="mt-7">
              <Col sm="4" />

              <Col sm="4" />

              <Col sm="4">
                <Row>
                  <Col sm="6" className="d-flex justify-content-end">
                    <h5>Total</h5>
                  </Col>
                  <Col sm="6">
                    <h5>Rp. {props.values.tagihan_setelah_pajak.toLocaleString({ minimumFractionDigits: 0 })}</h5>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-end mt-10">
                {/* <Button variant='primary mr-2' onClick={pembayaran}>
                    Invoice
                  </Button> */}
                <Link href="/jual/penjualan">
                  <Button variant="danger mr-2">Batal</Button>
                </Link>
                <Button variant="success" onClick={props.handleSubmit} disabled={props.values.validation_button}>
                  Buat Pencetakan
                </Button>
              </Col>
            </Row>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerPenjualan.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      DetailPenjualan: true,
      pajak: true,
    },
  });

  const get_akun_setor_ke = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
    include: {
      DetailBank: true,
    },
  });

  let akun_setor_ke = [];
  get_akun_setor_ke.map((i) => {
    akun_setor_ke.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
      label2: i.nama_akun,
      detail_bank: i.DetailBank,
    });
  });

  const get_pajak = await prisma.pajak.findMany({
    include: {
      kategori2: true,
    },
  });

  let pajak = [];
  get_pajak.map((i) => {
    pajak.push({
      value: i.id,
      label: i.nama + " - " + i.presentase_aktif + "%",
      label2: i.nama,
      pajak_persen: i.presentase_aktif,
    });
  });

  const get_bank = await prisma.detailBank.findMany({});

  let bank = [];
  get_bank.map((i) => {
    bank.push({
      value: i.id,
      label: i.nama_bank + " (" + i.nomor_rekening + ")",
    });
  });

  return {
    props: {
      data: header,
      data2: akun_setor_ke,
      data3: pajak,
      data4: bank,
      data5: get_bank,
    },
  };
}
