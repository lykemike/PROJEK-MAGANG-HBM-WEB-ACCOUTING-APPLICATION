import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import { Row, Col, Form, Button, FormCheck, InputGroup, FormControl, Table } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/Link";
import RemoveIcon from "@material-ui/icons/Remove";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";

import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import * as Yup from "yup";
import { PrismaClient } from "@prisma/client";
import { Snackbar } from "@material-ui/core";
const prisma = new PrismaClient();

export default function BuatBiaya({ data, data2, data3, data4 }) {
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

  const router = useRouter();
  const url = "http://localhost:3000/api/biaya/createBiaya";

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const ValidationSchema = Yup.object().shape({
    akun_id: Yup.string().required("*required"),
    cara_pembayaran_id: Yup.string().required("*required"),

    // produks: Yup.array(
    //   Yup.object({
    //     produk_id: Yup.string().required("*required"),
    //   })
    // )
    //   .min(1)
    //   .max(3),
  });

  return (
    <Layout>
      <Head>
        <title>Buat Biaya</title>
      </Head>
      <Formik
        initialValues={{
          akun_id: "",
          tgl_transaksi: current,
          cara_pembayaran_id: "",
          harga_termasuk_pajak: false,
          detail_biaya: [
            {
              akun_id: "",
              kategori_id: "",
              akun_nama: "",
              deskripsi: "-",
              pajak_id: "",
              pajak_masukan_id: "",
              kategori_id_masukan: "",
              pajak_masukan_nama: "",
              pajak_masukan_persen: 0,
              pajak_masukan_per_baris: 0,
              pajak_keluaran_id: "",
              kategori_id_keluaran: "",
              pajak_keluaran_nama: "",
              pajak_keluaran_persen: 0,
              pajak_keluaran_per_baris: 0,
              jumlah: 0,
              termasuk_jumlah: 0,
              termasuk_pajak_masukan: 0,
              termasuk_pajak_keluaran: 0,
            },
          ],
          pajak_masukan_total: 0,
          pajak_keluaran_total: 0,
          memo: "-",
          file_attachment: [],
          subtotal: 0,
          total: 0,
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => {
          console.log(values);
          let formData = new FormData();
          for (var key in values) {
            if (key == "detail_biaya") {
              formData.append(`${key}`, JSON.stringify(values[key]));
            } else {
              formData.append(`${key}`, `${values[key]}`);
            }
          }

          if (values.file_attachment.length > 0) {
            Array.from(values.file_attachment).map((i) => formData.append("file", i));
          }

          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.push(`view/${response.data.id.id}`);
              }, 2000);
            })
            .catch(function (error) {
              setState({ open: true, toast_message: error.response.data.message });
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary">Biaya</Typography>
            </Breadcrumbs>
            <h2 className="text-blue-600">Buat Biaya</h2>
            <div className="border-t border-gray-200">
              <Row className="mt-2 mb-2">
                <Col sm="3">
                  <label className="font-medium">
                    Bayar Dari
                    {props.errors.akun_id && props.touched.akun_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.akun_id}</span> : null}
                  </label>
                  <Select
                    options={data}
                    name="akun_id"
                    onChange={(e) => {
                      props.setFieldValue(`akun_id`, e.value);
                    }}
                  />
                </Col>
              </Row>
            </div>

            <div className="border-t border-gray-200">
              <Row className="mt-2 mb-2">
                <Col sm="3">
                  <label className="font-medium">No. Transaksi</label>
                  <FormControl disabled placeholder="Auto" />
                </Col>
                <Col sm="3">
                  <label className="font-medium">Tanggal Transaksi</label>
                  <FormControl type="date" name="tgl_transaksi" value={props.values.tgl_transaksi} onChange={props.handleChange} />
                </Col>
                <Col sm="3">
                  <label className="font-medium">
                    Cara Pembayaran
                    {props.errors.cara_pembayaran_id && props.touched.cara_pembayaran_id ? (
                      <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.cara_pembayaran_id}</span>
                    ) : null}
                  </label>
                  <Select
                    options={data4}
                    onChange={(e) => {
                      props.setFieldValue(`cara_pembayaran_id`, e.value);
                    }}
                  />
                </Col>
              </Row>
            </div>

            <div class="flex flex-row-reverse mt-8">
              <FormControlLabel
                label={props.values.harga_termasuk_pajak == false ? "Harga Termasuk Pajak" : "Harga Termasuk Pajak"}
                labelPlacement="end"
                control={
                  <Switch
                    color="primary"
                    onChange={(e) => {
                      if (e.target.checked == false) {
                        props.setFieldValue((props.values.harga_termasuk_pajak = false));

                        const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                        props.setFieldValue(`subtotal`, subtotal);
                        props.setFieldValue((props.values.subtotal = subtotal));

                        const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_masukan_per_baris), 0);
                        props.setFieldValue(`pajak_masukan_total`, pph_total);
                        props.setFieldValue((props.values.pajak_masukan_total = pph_total));

                        const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_keluaran_per_baris), 0);
                        props.setFieldValue(`pajak_keluaran_total`, ppn_total);
                        props.setFieldValue((props.values.pajak_keluaran_total = ppn_total));

                        const total = subtotal + pph_total - ppn_total;
                        props.setFieldValue(`total`, total);
                        props.setFieldValue((props.values.total = total));
                      } else {
                        props.setFieldValue((props.values.harga_termasuk_pajak = true));

                        const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_jumlah), 0);
                        props.setFieldValue(`subtotal`, Math.round(subtotal));
                        props.setFieldValue((props.values.subtotal = Math.round(subtotal)));

                        const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_masukan), 0);
                        props.setFieldValue(`pajak_masukan_total`, Math.round(pph_total));
                        props.setFieldValue((props.values.pajak_masukan_total = Math.round(pph_total)));

                        const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_keluaran), 0);
                        props.setFieldValue(`pajak_keluaran_total`, Math.round(ppn_total));
                        props.setFieldValue((props.values.pajak_keluaran_total = Math.round(ppn_total)));

                        const total = subtotal + pph_total - ppn_total;
                        props.setFieldValue(`total`, total);
                        props.setFieldValue((props.values.total = total));
                      }
                    }}
                  />
                }
              />
            </div>

            <Table responsive>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Akun Biaya</th>
                  <th>Deskripsi</th>
                  <th>Pajak Masukan</th>
                  <th>Pajak Keluaran</th>
                  <th>Jumlah</th>
                  <th />
                </tr>
              </thead>
              <FieldArray name="detail_biaya">
                {({ insert, remove, push }) => (
                  <tbody style={{ height: "10rem" }}>
                    {props.values.detail_biaya.length > 0 &&
                      props.values.detail_biaya.map((i, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              minWidth: 300,
                              width: 300,
                            }}
                          >
                            <Select
                              options={data2}
                              onChange={(e) => {
                                props.setFieldValue(`detail_biaya.${index}.akun_id`, e.value);
                                props.setFieldValue(`detail_biaya.${index}.akun_nama`, e.label);
                                props.setFieldValue(`detail_biaya.${index}.kategori_id`, e.kategori_id);
                              }}
                            />
                          </td>

                          <td
                            style={{
                              minWidth: 300,
                              width: 300,
                            }}
                          >
                            <Form.Control type="text" placeholder="-" onChange={(e) => props.setFieldValue(`detail_biaya.${index}.deskripsi`, e.target.value)} />
                          </td>

                          <td
                            style={{
                              minWidth: 200,
                              width: 200,
                            }}
                          >
                            <Select
                              options={data3}
                              onChange={(e) => {
                                props.setFieldValue(`detail_biaya.${index}.pajak_id`, e.value);
                                props.setFieldValue(`detail_biaya.${index}.pajak_masukan_id`, e.pajak_masukan_id);
                                props.setFieldValue(`detail_biaya.${index}.pajak_masukan_nama`, e.label2);
                                props.setFieldValue(`detail_biaya.${index}.pajak_masukan_persen`, e.persen);
                                props.setFieldValue(`detail_biaya.${index}.kategori_id_masukan`, e.kategori_id_masukan);
                                if (props.values.harga_termasuk_pajak == false) {
                                  const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                                  props.setFieldValue(`subtotal`, subtotal);
                                  props.setFieldValue((props.values.subtotal = subtotal));

                                  const pph = (e.persen / 100) * props.values.detail_biaya[index].jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.pajak_masukan_per_baris`, pph);
                                  props.setFieldValue((props.values.detail_biaya[index].pajak_masukan_per_baris = pph));

                                  const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_masukan_per_baris), 0);
                                  props.setFieldValue(`pajak_masukan_total`, pph_total);
                                  props.setFieldValue((props.values.pajak_masukan_total = pph_total));

                                  const ppn = (props.values.detail_biaya[index].pajak_keluaran_persen / 100) * props.values.detail_biaya[index].jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.pajak_keluaran_per_baris`, ppn);
                                  props.setFieldValue((props.values.detail_biaya[index].pajak_keluaran_per_baris = ppn));

                                  const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_keluaran_per_baris), 0);
                                  props.setFieldValue(`pajak_keluaran_total`, ppn_total);
                                  props.setFieldValue((props.values.pajak_keluaran_total = ppn_total));

                                  const total = subtotal + pph_total - ppn_total;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));

                                  const rumus_pajak = 1 + e.persen / 100 - props.values.detail_biaya[index].pajak_keluaran_persen / 100;
                                  const jumlah = props.values.detail_biaya[index].jumlah / rumus_pajak;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_jumlah`, Math.round(jumlah));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_jumlah = Math.round(jumlah)));

                                  const pph2 = (e.persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_masukan`, Math.round(pph2));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_masukan = Math.round(pph2)));

                                  const ppn2 = (props.values.detail_biaya[index].pajak_keluaran_persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_keluaran`, Math.round(ppn2));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_keluaran = Math.round(ppn2)));
                                } else {
                                  const rumus_pajak = 1 + e.persen / 100 - props.values.detail_biaya[index].pajak_keluaran_persen / 100;
                                  const jumlah = props.values.detail_biaya[index].jumlah / rumus_pajak;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_jumlah`, Math.round(jumlah));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_jumlah = Math.round(jumlah)));

                                  const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_jumlah), 0);
                                  props.setFieldValue(`subtotal`, Math.round(subtotal));
                                  props.setFieldValue((props.values.subtotal = Math.round(subtotal)));

                                  const pph = (e.persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_masukan`, Math.round(pph));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_masukan = Math.round(pph)));

                                  const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_masukan), 0);
                                  props.setFieldValue(`pajak_masukan_total`, Math.round(pph_total));
                                  props.setFieldValue((props.values.pajak_masukan_total = Math.round(pph_total)));

                                  const ppn = (props.values.detail_biaya[index].pajak_keluaran_persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_keluaran`, Math.round(ppn));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_keluaran = Math.round(ppn)));

                                  const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_keluaran), 0);
                                  props.setFieldValue(`pajak_keluaran_total`, Math.round(ppn_total));
                                  props.setFieldValue((props.values.pajak_keluaran_total = Math.round(ppn_total)));

                                  const total = subtotal + pph_total - ppn_total;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));
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
                            <Select
                              options={data3}
                              onChange={(e) => {
                                props.setFieldValue(`detail_biaya.${index}.pajak_id`, e.value);
                                props.setFieldValue(`detail_biaya.${index}.pajak_keluaran_id`, e.pajak_keluaran_id);
                                props.setFieldValue(`detail_biaya.${index}.pajak_keluaran_nama`, e.label2);
                                props.setFieldValue(`detail_biaya.${index}.pajak_keluaran_persen`, e.persen);
                                props.setFieldValue(`detail_biaya.${index}.kategori_id_keluaran`, e.kategori_id_keluaran);
                                if (props.values.harga_termasuk_pajak == false) {
                                  const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                                  props.setFieldValue(`subtotal`, subtotal);
                                  props.setFieldValue((props.values.subtotal = subtotal));

                                  const pph = (props.values.detail_biaya[index].pajak_masukan_persen / 100) * props.values.detail_biaya[index].jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.pajak_masukan_per_baris`, pph);
                                  props.setFieldValue((props.values.detail_biaya[index].pajak_masukan_per_baris = pph));

                                  const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_masukan_per_baris), 0);
                                  props.setFieldValue(`pajak_masukan_total`, pph_total);
                                  props.setFieldValue((props.values.pajak_masukan_total = pph_total));

                                  const ppn = (e.persen / 100) * props.values.detail_biaya[index].jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.pajak_keluaran_per_baris`, ppn);
                                  props.setFieldValue((props.values.detail_biaya[index].pajak_keluaran_per_baris = ppn));

                                  const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_keluaran_per_baris), 0);
                                  props.setFieldValue(`pajak_keluaran_total`, ppn_total);
                                  props.setFieldValue((props.values.pajak_keluaran_total = ppn_total));

                                  const total = subtotal + pph_total - ppn_total;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));

                                  const rumus_pajak = 1 + props.values.detail_biaya[index].pajak_masukan_persen / 100 - e.persen / 100;
                                  const jumlah = props.values.detail_biaya[index].jumlah / rumus_pajak;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_jumlah`, Math.round(jumlah));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_jumlah = Math.round(jumlah)));

                                  const pph2 = (props.values.detail_biaya[index].pajak_masukan_persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_masukan`, Math.round(pph2));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_masukan = Math.round(pph2)));

                                  const ppn2 = (e.persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_keluaran`, Math.round(ppn2));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_keluaran = Math.round(ppn)));
                                } else {
                                  const rumus_pajak = 1 + props.values.detail_biaya[index].pajak_masukan_persen / 100 - e.persen / 100;
                                  const jumlah = props.values.detail_biaya[index].jumlah / rumus_pajak;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_jumlah`, Math.round(jumlah));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_jumlah = Math.round(jumlah)));

                                  const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_jumlah), 0);
                                  props.setFieldValue(`subtotal`, Math.round(subtotal));
                                  props.setFieldValue((props.values.subtotal = Math.round(subtotal)));

                                  const pph = (props.values.detail_biaya[index].pajak_masukan_persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_masukan`, Math.round(pph));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_masukan = Math.round(pph)));

                                  const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_masukan), 0);
                                  props.setFieldValue(`pajak_masukan_total`, Math.round(pph_total));
                                  props.setFieldValue((props.values.pajak_masukan_total = Math.round(pph_total)));

                                  const ppn = (e.persen / 100) * props.values.detail_biaya[index].termasuk_jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_keluaran`, Math.round(ppn));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_keluaran = Math.round(ppn)));

                                  const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_keluaran), 0);
                                  props.setFieldValue(`pajak_keluaran_total`, Math.round(ppn_total));
                                  props.setFieldValue((props.values.pajak_keluaran_total = Math.round(ppn_total)));

                                  const total = subtotal + pph_total - ppn_total;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));
                                }
                              }}
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 250,
                              width: 250,
                            }}
                          >
                            <Form.Control
                              type="number"
                              min="0"
                              placeholder="0"
                              onChange={(e) => {
                                props.setFieldValue(`detail_biaya.${index}.jumlah`, parseInt(e.target.value));
                                props.setFieldValue((props.values.detail_biaya[index].jumlah = parseInt(e.target.value)));
                                if (props.values.harga_termasuk_pajak == false) {
                                  const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                                  props.setFieldValue(`subtotal`, subtotal);
                                  props.setFieldValue((props.values.subtotal = subtotal));

                                  const pph = (props.values.detail_biaya[index].pajak_masukan_persen / 100) * parseInt(e.target.value);
                                  props.setFieldValue(`detail_biaya.${index}.pajak_masukan_per_baris`, pph);
                                  props.setFieldValue((props.values.detail_biaya[index].pajak_masukan_per_baris = pph));

                                  const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_masukan_per_baris), 0);
                                  props.setFieldValue(`pajak_masukan_total`, pph_total);
                                  props.setFieldValue((props.values.pajak_masukan_total = pph_total));

                                  const ppn = (props.values.detail_biaya[index].pajak_keluaran_persen / 100) * parseInt(e.target.value);
                                  props.setFieldValue(`detail_biaya.${index}.pajak_keluaran_per_baris`, ppn);
                                  props.setFieldValue((props.values.detail_biaya[index].pajak_keluaran_per_baris = ppn));

                                  const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak_keluaran_per_baris), 0);
                                  props.setFieldValue(`pajak_keluaran_total`, ppn_total);
                                  props.setFieldValue((props.values.pajak_keluaran_total = ppn_total));

                                  const total = subtotal + pph_total - ppn_total;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));

                                  const rumus_pajak = 1 + props.values.detail_biaya[index].pajak_masukan_persen / 100 - props.values.detail_biaya[index].pajak_keluaran_persen / 100;
                                  const jumlah = parseInt(e.target.value) / rumus_pajak;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_jumlah`, Math.round(jumlah));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_jumlah = Math.round(jumlah)));

                                  const pph2 = (props.values.detail_biaya[index].pajak_masukan_persen / 100) * jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_masukan`, Math.round(pph2));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_masukan = Math.round(pph2)));

                                  const ppn2 = (props.values.detail_biaya[index].pajak_keluaran_persen / 100) * jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_keluaran`, Math.round(ppn2));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_keluaran = Math.round(ppn)));
                                } else {
                                  const rumus_pajak = 1 + props.values.detail_biaya[index].pajak_masukan_persen / 100 - props.values.detail_biaya[index].pajak_keluaran_persen / 100;
                                  const jumlah = parseInt(e.target.value) / rumus_pajak;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_jumlah`, Math.round(jumlah));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_jumlah = Math.round(jumlah)));

                                  const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_jumlah), 0);
                                  props.setFieldValue(`subtotal`, Math.round(subtotal));
                                  props.setFieldValue((props.values.subtotal = Math.round(subtotal)));

                                  const pph = (props.values.detail_biaya[index].pajak_masukan_persen / 100) * jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_masukan`, Math.round(pph));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_masukan = Math.round(pph)));

                                  const pph_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_masukan), 0);
                                  props.setFieldValue(`pajak_masukan_total`, Math.round(pph_total));
                                  props.setFieldValue((props.values.pajak_masukan_total = Math.round(pph_total)));

                                  const ppn = (props.values.detail_biaya[index].pajak_keluaran_persen / 100) * jumlah;
                                  props.setFieldValue(`detail_biaya.${index}.termasuk_pajak_keluaran`, Math.round(ppn));
                                  props.setFieldValue((props.values.detail_biaya[index].termasuk_pajak_keluaran = Math.round(ppn)));

                                  const ppn_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.termasuk_pajak_keluaran), 0);
                                  props.setFieldValue(`pajak_keluaran_total`, Math.round(ppn_total));
                                  props.setFieldValue((props.values.pajak_keluaran_total = Math.round(ppn_total)));

                                  const total = subtotal + pph_total - ppn_total;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));
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
                            <RemoveIcon className="cursor-pointer" onClick={() => remove(index)} />
                          </td>
                        </tr>
                      ))}

                    <Button
                      className="ml-2 mt-4"
                      variant="primary"
                      onClick={() =>
                        push({
                          akun_id: "",
                          kategori_id: "",
                          akun_nama: "",
                          deskripsi: "-",
                          pajak_id: "",
                          pajak_masukan_id: "",
                          kategori_id_masukan: "",
                          pajak_masukan_nama: "",
                          pajak_masukan_persen: 0,
                          pajak_masukan_per_baris: 0,
                          pajak_keluaran_id: "",
                          kategori_id_keluaran: "",
                          pajak_keluaran_nama: "",
                          pajak_keluaran_persen: 0,
                          pajak_keluaran_per_baris: 0,
                          jumlah: 0,
                          termasuk_jumlah: 0,
                          termasuk_pajak_masukan: 0,
                          termasuk_pajak_keluaran: 0,
                        })
                      }
                    >
                      <AddIcon fontSize="small" /> Tambah data
                    </Button>
                  </tbody>
                )}
              </FieldArray>
            </Table>

            <Row>
              <Col sm="4">
                <div className="mb-2">
                  <label className="font-medium">Memo</label>
                  <FormControl style={{ width: 400, resize: "none" }} placeholder="-" as="textarea" rows="3" name="memo" class="px-2 py-2 border border-gray-800" onChange={props.handleChange} />
                </div>

                <div>
                  <label className="font-medium">File Attachment</label>
                  <div style={{ width: 400 }} class="mt-1 flex justify-center px-6 pt-4 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <div class="flex text-sm text-gray-600">
                        <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <Form.File type="file" name="file_attachment" onChange={(e) => props.setFieldValue("file_attachment", e.target.files)} />
                        </label>
                      </div>

                      <p class="text-xs text-gray-500">Tarik file ke sini atau pilih file </p>
                      <p class="text-xs text-gray-500">Ukuran maksimal 10MB</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="4" />
              <Col sm="4">
                <Row>
                  <Col sm="6">
                    <label className="font-medium">Subtotal</label>
                  </Col>
                  <Col sm="6">
                    <label name="subtotal">Rp. {props.values.subtotal.toLocaleString({ minimumFractionDigits: 0 })}</label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="6">
                    <label className="font-medium">Pajak Masukan</label>
                  </Col>
                  <Col sm="6">
                    <label name="pajak_hasil">Rp. {props.values.pajak_masukan_total.toLocaleString({ minimumFractionDigits: 0 })}</label>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col sm="6">
                    <label className="font-medium">Pajak Keluaran</label>
                  </Col>
                  <Col sm="6">
                    <label name="pajak_hasil">Rp. {props.values.pajak_keluaran_total.toLocaleString({ minimumFractionDigits: 0 })}</label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="6">
                    <label className="font-medium">Total</label>
                  </Col>
                  <Col sm="6">
                    <label name="total">Rp. {props.values.total.toLocaleString({ minimumFractionDigits: 0 })}</label>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-end mt-10">
                <Link href="pengeluaran">
                  <a>
                    <Button variant="danger mr-2">Batal</Button>
                  </a>
                </Link>

                <Button variant="success" className="ml-2" onClick={props.handleSubmit}>
                  Bayar
                </Button>
              </Col>
            </Row>
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

  const get_akun_beban = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [16, 17],
      },
    },
  });

  let akun_beban = [];
  get_akun_beban.map((i) => {
    akun_beban.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
      label2: i.nama_akun,
      kategori_id: i.kategoriId,
    });
  });

  const get_pajak = await prisma.pajak.findMany({
    include: {
      kategori2: true,
    },
    include: {
      kategori1: {
        select: {
          kategoriId: true,
        },
      },
      kategori2: {
        select: {
          kategoriId: true,
        },
      },
    },
  });

  let pajak = [];
  get_pajak.map((i) => {
    pajak.push({
      value: i.id,
      label: i.nama + " - " + i.presentase_aktif + "%",
      label2: i.nama,
      persen: i.presentase_aktif,
      pajak_masukan_id: i.akun_beli,
      pajak_keluaran_id: i.akun_jual,
      kategori_id_masukan: i.kategori2.kategoriId,
      kategori_id_keluaran: i.kategori1.kategoriId,
    });
  });

  const get_cara_pembayaran = await prisma.caraPembayaran.findMany({});

  let cara_pembayaran = [];
  get_cara_pembayaran.map((i) => {
    cara_pembayaran.push({
      value: i.id,
      label: i.nama,
    });
  });

  return {
    props: {
      data: akun_kas_bank,
      data2: akun_beban,
      data3: pajak,
      data4: cara_pembayaran,
    },
  };
}
