import { React, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import {
  Breadcrumbs,
  Table as Tables,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core/";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import BackspaceIcon from "@material-ui/icons/Backspace";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "next/Link";
import Select from "react-select";
import { Formik, Form as Forms, FieldArray } from "formik";
import { Form, Row, Col, InputGroup, FormControl, Table, Button } from "react-bootstrap";
import * as Yup from "yup";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function penagihanpenjualan({
  kontak,
  produk,
  pajak,
  akun_pendapatan,
  akun_kas_bank,
  syarat_pembayaran,
  header_penjualan,
  detail_penjualan,
}) {
  const ValidationSchema = Yup.object().shape({
    nama_supplier: Yup.string().required("* required"),
    syarat_pembayaran: Yup.string().required("* required"),
    tgl_jatuh_tempo: Yup.string().required("* required"),
    tgl_kontrak: Yup.string().required("* required"),
  });

  const url = "http://localhost:3000/api/jual/createpenjualan";
  const router = useRouter();

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const currentMonth = day.getMonth() + 1;
  let newCurrentMonth = "";
  if (currentMonth < 10) {
    newCurrentMonth = "0" + currentMonth;
  } else {
    newCurrentMonth = currentMonth;
  }

  let roman_numerals = "";
  if (currentMonth == 1) {
    roman_numerals = "I";
  } else if (currentMonth == 2) {
    roman_numerals = "II";
  } else if (currentMonth == 3) {
    roman_numerals = "III";
  } else if (currentMonth == 4) {
    roman_numerals = "IV";
  } else if (currentMonth == 5) {
    roman_numerals = "V";
  } else if (currentMonth == 6) {
    roman_numerals = "VI";
  } else if (currentMonth == 7) {
    roman_numerals = "VII";
  } else if (currentMonth == 8) {
    roman_numerals = "VIII";
  } else if (currentMonth == 9) {
    roman_numerals = "IX";
  } else if (currentMonth == 10) {
    roman_numerals = "X";
  } else if (currentMonth == 11) {
    roman_numerals = "XI";
  } else if (currentMonth == 12) {
    roman_numerals = "XII";
  }
  const currentYear = day.getFullYear();
  const custom_invoice = "/HBM/INV/" + roman_numerals + "/" + currentYear;
  const formik = useRef(null);

  console.log(header_penjualan[0].email);
  return (
    <Layout>
      <Formik
        enableReinitialize={true}
        innerRef={formik}
        initialValues={{
          nama_supplier: header_penjualan[0].kontak_id,
          nama: header_penjualan[0].nama_supplier,
          email: header_penjualan[0].email,
          alamat_supplier: header_penjualan[0].alamat_supplier,
          tgl_transaksi: current,
          tgl_jatuh_tempo: "",
          syarat_pembayaran: "",
          no_ref_penagihan: "-",
          tag: "-",
          boolean: false,
          tgl_kontrak: "",
          custom_invoice: custom_invoice,
          produks: detail_penjualan,
          pesan: "-",
          memo: "-",
          fileattachment: [],
          subtotal: "",
          total_diskon_per_baris: "",
          diskon: 0,
          total_diskon: "",
          total_pajak_per_baris: "",
          total: "",
          pemotongan: 0,
          pemotongan_total: 0,
          akun_pemotongan: "",
          uang_muka: 0,
          akun_uang_muka: "",
          sisa_tagihan: 0,
          balance: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            if (key == "produks") {
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
              router.push(`view/${response.data[0].id.id}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="../jual/penjualan">
                Transaksi
              </Link>
              <Typography color="textPrimary">Update Penagihan Penjualan</Typography>
            </Breadcrumbs>

            <h2 className="text-blue-600">Update Penagihan Penjualan</h2>
            <div className="border-t border-gray-200">
              <Form>
                <Row className="mt-2">
                  <Col sm="3">
                    <label>Pelanggan</label>
                  </Col>
                  <Col sm="3">
                    <label>Email</label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="3">
                    <Select
                      options={kontak}
                      name="nama_supplier"
                      value={{ value: parseInt(props.values.nama_supplier), label: props.values.nama }}
                      onChange={(e) => {
                        props.setFieldValue("nama_supplier", e.value);
                        props.setFieldValue("email", e.email);
                        props.setFieldValue("alamat_supplier", e.alamat_pembayaran);
                      }}
                    />
                    {props.errors.nama_supplier && props.touched.nama_supplier ? (
                      <div class="text-red-500 text-sm mt-2">{props.errors.nama_supplier}</div>
                    ) : null}
                  </Col>
                  <Col sm="3">
                    <Form.Control
                      disabled
                      type="text"
                      name="email"
                      value={props.values.email}
                      onChange={(e) => {
                        props.setFieldValue("email", e.target.value);
                      }}
                    />
                  </Col>
                  <Col sm="3" />
                  <Col sm="3">
                    <h3 name="sisa_tagihan">
                      {props.values.sisa_tagihan == ""
                        ? "Rp. 0, 00"
                        : "Rp. " +
                          props.values.sisa_tagihan.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                    </h3>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="border-t border-gray-200">
              <Row className="mt-2">
                <Col sm="3">
                  <div className="mb-2">
                    <label>Alamat Penagihan</label>
                    <textarea
                      disabled
                      rows="4"
                      id="message"
                      class="px-10 py-2 border border-gray-800  "
                      name="alamat_supplier"
                      value={props.values.alamat_supplier}
                      onChange={(e) => {
                        props.setFieldValue("alamat_supplier", e.target.value);
                      }}
                    />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label>Nomor Invoice</label>
                    <Form.Control disabled type="text" placeholder="Auto" name="no_transaksi" onChange={props.handleChange} />
                  </div>
                  <div className="mb-2">
                    <label>Syarat Pembayaran</label>
                    <Select
                      options={syarat_pembayaran}
                      name="syarat_pembayaran"
                      onChange={(e) => {
                        props.setFieldValue("syarat_pembayaran", e.value);
                        props.setFieldValue((props.values.syarat_pembayaran = parseInt(e.value)));

                        let tanggal = props.values.tgl_transaksi;
                        let tanggal2 = new Date(tanggal);
                        tanggal2.setDate(tanggal2.getDate() + parseInt(e.value));

                        let convert_to_iso = tanggal2.toISOString().slice(0, 10);
                        props.setFieldValue("tgl_jatuh_tempo", convert_to_iso);
                        props.setFieldValue((props.values.tgl_jatuh_tempo = convert_to_iso));
                      }}
                    />
                    {props.errors.syarat_pembayaran && props.touched.syarat_pembayaran ? (
                      <div class="text-red-500 text-sm mt-2">{props.errors.syarat_pembayaran}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label>Tanggal Kontrak</label>
                    <Form.Control type="date" placeholder="Auto" name="tgl_kontrak" onChange={props.handleChange} />
                    {props.errors.tgl_kontrak && props.touched.tgl_kontrak ? (
                      <div class="text-red-500 text-sm mt-2">{props.errors.tgl_kontrak}</div>
                    ) : null}
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label>Tanggal Invoice</label>
                    <Form.Control
                      type="date"
                      placeholder="Auto"
                      value={props.values.tgl_transaksi}
                      name="tgl_transaksi"
                      onChange={(e) => {
                        props.setFieldValue("tgl_transaksi", e.target.value);
                        props.setFieldValue((props.values.tgl_transaksi = e.target.value));

                        let tanggal = e.target.value;
                        let tanggal2 = new Date(tanggal);
                        tanggal2.setDate(tanggal2.getDate() + parseInt(props.values.syarat_pembayaran));

                        let convert_to_iso = tanggal2.toISOString().slice(0, 10);
                        props.setFieldValue("tgl_jatuh_tempo", convert_to_iso);
                        props.setFieldValue((props.values.tgl_jatuh_tempo = convert_to_iso));
                      }}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Tag</label>
                    <Form.Control type="text" placeholder="-" name="tag" onChange={props.handleChange} />
                  </div>
                  <div className="mb-2">
                    <label>Nomor Kontrak</label>
                    <Form.Control type="text" placeholder="-" name="no_ref_penagihan" onChange={props.handleChange} />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label>Tanggal Jatuh Tempo</label>
                    <Form.Control
                      type="date"
                      placeholder="Auto"
                      name="tgl_jatuh_tempo"
                      onChange={props.handleChange}
                      value={props.values.tgl_jatuh_tempo}
                    />
                    {props.errors.tgl_jatuh_tempo && props.touched.tgl_jatuh_tempo ? (
                      <div class="text-red-500 text-sm mt-2">{props.errors.tgl_jatuh_tempo}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <label>Nomor Invoice Custom</label>
                    <Form.Control type="text" placeholder="Auto" name="no_invoice_custom" disabled />
                  </div>
                </Col>
              </Row>
            </div>

            <div class="flex flex-row-reverse mt-8">
              <FormControlLabel
                label="Harga Termasuk Pajak"
                labelPlacement="end"
                control={
                  <Switch
                    color="primary"
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        props.setFieldValue((props.values.boolean = true));
                        const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                        const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);
                        const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                        let new_subtotal = subtotal - pajak_total;
                        props.setFieldValue((props.values.subtotal = new_subtotal));
                        props.setFieldValue("subtotal", new_subtotal);

                        props.setFieldValue("total_diskon_per_baris", diskon_total);

                        let diskon_tambahan = (props.values.diskon / 100) * new_subtotal;
                        props.setFieldValue((props.values.total_diskon = diskon_tambahan));
                        props.setFieldValue("total_diskon", diskon_tambahan);

                        props.setFieldValue("total_pajak_per_baris", pajak_total);

                        let total = new_subtotal + pajak_total - (diskon_total + diskon_tambahan);
                        props.setFieldValue((props.values.total = total));
                        props.setFieldValue("total", total);

                        let pemotongan = total - props.values.pemotongan;
                        props.setFieldValue((props.values.pemotongan_total = pemotongan));
                        props.setFieldValue("pemotongan_total", pemotongan);

                        let sisa_tagihan = pemotongan - props.values.uang_muka;
                        props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                        props.setFieldValue("sisa_tagihan", sisa_tagihan);
                      } else {
                        props.setFieldValue((props.values.boolean = false));
                        const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                        const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);
                        const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                        props.setFieldValue("subtotal", subtotal);

                        props.setFieldValue("total_diskon_per_baris", diskon_total);

                        let diskon_tambahan = (props.values.diskon / 100) * subtotal;
                        props.setFieldValue((props.values.total_diskon = diskon_tambahan));
                        props.setFieldValue("total_diskon", diskon_tambahan);

                        props.setFieldValue("total_pajak_per_baris", pajak_total);

                        let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);
                        props.setFieldValue((props.values.total = total));
                        props.setFieldValue("total", total);

                        let pemotongan = total - props.values.pemotongan;
                        props.setFieldValue((props.values.pemotongan_total = pemotongan));
                        props.setFieldValue("pemotongan_total", pemotongan);

                        let sisa_tagihan = pemotongan - props.values.uang_muka;
                        props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                        props.setFieldValue("sisa_tagihan", sisa_tagihan);
                      }
                    }}
                  />
                }
              />
            </div>

            <Table responsive>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Produk</th>
                  <th>Deskripsi</th>
                  <th>Kuantias</th>
                  <th>Satuan</th>
                  <th>Harga Satuan</th>
                  <th>Diskon</th>
                  <th>Pajak</th>
                  <th>Jumlah</th>
                  <th />
                </tr>
              </thead>
              <FieldArray name="produks">
                {({ insert, remove, push }) => (
                  <tbody style={{ height: "10rem" }}>
                    {props.values.produks.length > 0 &&
                      props.values.produks.map((i, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              minWidth: 250,
                              width: 250,
                            }}
                          >
                            <Select
                              options={produk}
                              name={`produks.${index}.produk_id`}
                              value={{
                                value: props.values.produks[index].produk_id,
                                label: props.values.produks[index].nama_produk,
                              }}
                              onChange={(e) => {
                                props.setFieldValue(`produks.${index}.produk_id`, e.value);
                                props.setFieldValue(`produks.${index}.deskripsi_produk`, e.deskripsi);
                                props.setFieldValue(`produks.${index}.harga_satuan`, e.harga_jual_satuan);
                                props.setFieldValue(`produks.${index}.satuan`, e.satuan);
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
                              disabled
                              type="text"
                              as="textarea"
                              rows={1}
                              name={`produks.${index}.deskripsi_produk`}
                              value={props.values.produks[index].deskripsi_produk}
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 100,
                              width: 100,
                            }}
                          >
                            <Form.Control
                              type="number"
                              min="0"
                              placeholder="0"
                              name={`produks.${index}.kuantitas`}
                              onChange={(e) => {
                                if (props.values.boolean == false) {
                                  // Rumus jumlah
                                  props.setFieldValue(`produks.${index}.kuantitas`, e.target.value);
                                  let jumlah = e.target.value * props.values.produks[index].harga_satuan;
                                  props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                  const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                                  props.setFieldValue((props.values.subtotal = subtotal));
                                  props.setFieldValue("subtotal", subtotal);

                                  // Rumus diskon per baris
                                  let diskon = jumlah * (props.values.produks[index].diskon / 100);
                                  props.setFieldValue((props.values.produks[index].hasil_diskon = diskon));
                                  const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);
                                  props.setFieldValue((props.values.total_diskon_per_baris = diskon_total));
                                  props.setFieldValue("total_diskon_per_baris", diskon_total);

                                  // Rumus diskon tambahan
                                  let diskon_tambahan = (props.values.diskon / 100) * subtotal;
                                  props.setFieldValue((props.values.total_diskon = diskon_tambahan));
                                  props.setFieldValue("total_diskon", diskon_tambahan);

                                  // Rumus pajak per baris
                                  let pajak = jumlah * (props.values.produks[index].pajak_persen / 100);
                                  props.setFieldValue((props.values.produks[index].hasil_pajak = pajak));
                                  const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                  props.setFieldValue((props.values.total_pajak_per_baris = pajak_total));
                                  props.setFieldValue("total_pajak_per_baris", pajak_total);

                                  // Rumus total
                                  let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                  props.setFieldValue((props.values.total = total));
                                  props.setFieldValue("total", total);

                                  // Rumus pemotongan
                                  let pemotongan = total - props.values.pemotongan;
                                  props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                  props.setFieldValue("pemotongan_total", pemotongan);

                                  // Rumus sisa tagihan
                                  let sisa_tagihan = pemotongan - props.values.uang_muka;
                                  props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                  props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                  // Rumus balance akun pendapatan
                                  let balance = parseInt(subtotal + pajak_total);
                                  props.setFieldValue((props.values.balance = balance));
                                } else {
                                  // Rumus jumlah
                                  props.setFieldValue(`produks.${index}.kuantitas`, e.target.value);
                                  let jumlah = e.target.value * props.values.produks[index].harga_satuan;
                                  props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                  const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                                  // Rumus diskon per baris
                                  let diskon = jumlah * (props.values.produks[index].diskon / 100);
                                  props.setFieldValue((props.values.produks[index].hasil_diskon = diskon));
                                  const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);
                                  props.setFieldValue((props.values.total_diskon_per_baris = diskon_total));
                                  props.setFieldValue("total_diskon_per_baris", diskon_total);

                                  // Rumus pajak per baris
                                  let pajak = jumlah * (props.values.produks[index].pajak_persen / 100);
                                  props.setFieldValue((props.values.produks[index].hasil_pajak = pajak));
                                  const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                  props.setFieldValue((props.values.total_pajak_per_baris = pajak_total));
                                  props.setFieldValue("total_pajak_per_baris", pajak_total);

                                  let new_subtotal = subtotal - pajak_total;
                                  props.setFieldValue((props.values.subtotal = new_subtotal));
                                  props.setFieldValue("subtotal", new_subtotal);

                                  // Rumus diskon tambahan
                                  let diskon_tambahan = (props.values.diskon / 100) * new_subtotal;
                                  props.setFieldValue((props.values.total_diskon = diskon_tambahan));
                                  props.setFieldValue("total_diskon", diskon_tambahan);

                                  // Rumus total
                                  let total = new_subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                  props.setFieldValue((props.values.total = total));
                                  props.setFieldValue("total", total);

                                  // Rumus pemotongan
                                  let pemotongan = total - props.values.pemotongan;
                                  props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                  props.setFieldValue("pemotongan_total", pemotongan);

                                  // Rumus sisa tagihan
                                  let sisa_tagihan = pemotongan - props.values.uang_muka;
                                  props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                  props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                  // Rumus balance akun pendapatan
                                  let balance = parseInt(subtotal + pajak_total);
                                  props.setFieldValue((props.values.balance = balance));
                                }
                              }}
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 150,
                              width: 150,
                            }}
                          >
                            <Form.Control
                              disabled
                              type="text"
                              name={`produks.${index}.satuan`}
                              value={props.values.produks[index].satuan}
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 250,
                              width: 250,
                            }}
                          >
                            <Form.Control
                              disabled
                              type="text"
                              size=""
                              placeholder=""
                              name={`produks.${index}.harga_satuan`}
                              value={
                                "Rp. " +
                                props.values.produks[index].harga_satuan.toLocaleString({
                                  minimumFractionDigits: 0,
                                })
                              }
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 100,
                              width: 100,
                            }}
                          >
                            <Form.Control
                              type="number"
                              min="0"
                              placeholder="0"
                              name={`produks.${index}.diskon`}
                              onChange={(e) => {
                                props.setFieldValue(`produks.${index}.diskon`, e.target.value);
                                if (props.values.boolean == false) {
                                  // Rumus jumlah
                                  let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                  props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                  const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                                  props.setFieldValue((props.values.subtotal = subtotal));
                                  props.setFieldValue("subtotal", subtotal);

                                  // Rumus diskon per baris
                                  let diskon = jumlah * (e.target.value / 100);
                                  props.setFieldValue((props.values.produks[index].hasil_diskon = diskon));
                                  const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);
                                  props.setFieldValue((props.values.total_diskon_per_baris = diskon_total));
                                  props.setFieldValue("total_diskon_per_baris", diskon_total);

                                  // Rumus diskon tambahan
                                  let diskon_tambahan = (props.values.diskon / 100) * subtotal;

                                  // Rumus pajak per baris
                                  const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                                  // Rumus total
                                  let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                  props.setFieldValue((props.values.total = total));
                                  props.setFieldValue("total", total);

                                  // Rumus pemotongan
                                  let pemotongan = total - props.values.pemotongan;
                                  props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                  props.setFieldValue("pemotongan_total", pemotongan);

                                  // Rumus sisa tagihan
                                  let sisa_tagihan = pemotongan - props.values.uang_muka;
                                  props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                  props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                  // Rumus balance akun pendapatan
                                  let balance = parseInt(subtotal + pajak_total);
                                  props.setFieldValue((props.values.balance = balance));
                                } else {
                                  // Rumus jumlah
                                  let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                  props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                  const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                                  // Rumus diskon per baris
                                  let diskon = jumlah * (e.target.value / 100);
                                  props.setFieldValue((props.values.produks[index].hasil_diskon = diskon));
                                  const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);
                                  props.setFieldValue((props.values.total_diskon_per_baris = diskon_total));
                                  props.setFieldValue("total_diskon_per_baris", diskon_total);

                                  // Rumus pajak per baris
                                  const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                                  let new_subtotal = subtotal - pajak_total;
                                  props.setFieldValue((props.values.subtotal = new_subtotal));
                                  props.setFieldValue("subtotal", new_subtotal);

                                  // Rumus diskon tambahan
                                  let diskon_tambahan = (props.values.diskon / 100) * new_subtotal;

                                  // Rumus total
                                  let total = new_subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                  props.setFieldValue((props.values.total = total));
                                  props.setFieldValue("total", total);

                                  // Rumus pemotongan
                                  let pemotongan = total - props.values.pemotongan;
                                  props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                  props.setFieldValue("pemotongan_total", pemotongan);

                                  // Rumus sisa tagihan
                                  let sisa_tagihan = pemotongan - props.values.uang_muka;
                                  props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                  props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                  // Rumus balance akun pendapatan
                                  let balance = parseInt(subtotal + pajak_total);
                                  props.setFieldValue((props.values.balance = balance));
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
                            <Select
                              options={pajak}
                              name={`produks.${index}.pajak_id`}
                              onChange={(e) => {
                                props.setFieldValue(`produks.${index}.pajak_id`, e.value);
                                if (props.values.boolean == false) {
                                  if (e.value == undefined || e.value == "" || e.value == 0) {
                                    // Rumus total: kuantitas * harga satuan
                                    let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                    props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                    const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                                    props.setFieldValue((props.values.subtotal = subtotal));
                                    props.setFieldValue("subtotal", subtotal);

                                    // Rumus pajak per baris
                                    let pajak = jumlah * (0 / 100);
                                    props.setFieldValue((props.values.produks[index].hasil_pajak = pajak));
                                    const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                    props.setFieldValue((props.values.total_pajak_per_baris = pajak_total));
                                    props.setFieldValue("total_pajak_per_baris", pajak_total);

                                    // Rumus diskon per baris
                                    const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                                    // Rumus diskon tambahan
                                    let diskon_tambahan = (props.values.diskon / 100) * subtotal;

                                    // Rumus total
                                    let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.total = total));
                                    props.setFieldValue("total", total);

                                    // Rumus pemotongan
                                    let pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                    props.setFieldValue("pemotongan_total", pemotongan);

                                    // Rumus sisa tagihan
                                    let sisa_tagihan = pemotongan - props.values.uang_muka;
                                    props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                    props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                    // Rumus balance akun pendapatan
                                    let balance = parseInt(subtotal + pajak_total);
                                    props.setFieldValue((props.values.balance = balance));
                                  } else {
                                    props.setFieldValue(`produks.${index}.pajak_persen`, e.presentase_aktif);
                                    props.setFieldValue(`produks.${index}.pajak_nama`, e.label);
                                    props.setFieldValue(`produks.${index}.pajak_jual_id`, e.akun_jual);

                                    // Rumus total: kuantitas * harga satuan
                                    let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                    props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                    const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                                    props.setFieldValue((props.values.subtotal = subtotal));
                                    props.setFieldValue("subtotal", subtotal);

                                    // Rumus pajak per baris
                                    let pajak = jumlah * (e.presentase_aktif / 100);
                                    props.setFieldValue((props.values.produks[index].hasil_pajak = pajak));
                                    const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                    props.setFieldValue((props.values.total_pajak_per_baris = pajak_total));
                                    props.setFieldValue("total_pajak_per_baris", pajak_total);

                                    // Rumus diskon per baris
                                    const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                                    // Rumus diskon tambahan
                                    let diskon_tambahan = (props.values.diskon / 100) * subtotal;

                                    // Rumus total
                                    let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.total = total));
                                    props.setFieldValue("total", total);

                                    // Rumus pemotongan
                                    let pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                    props.setFieldValue("pemotongan_total", pemotongan);

                                    // Rumus sisa tagihan
                                    let sisa_tagihan = pemotongan - props.values.uang_muka;
                                    props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                    props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                    // Rumus balance akun pendapatan
                                    let balance = parseInt(subtotal + pajak_total);
                                    props.setFieldValue((props.values.balance = balance));
                                  }
                                } else {
                                  if (e.value == undefined || e.value == "" || e.value == 0) {
                                    // Rumus total: kuantitas * harga satuan
                                    let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                    props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                    const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                                    props.setFieldValue((props.values.subtotal = subtotal));
                                    props.setFieldValue("subtotal", subtotal);

                                    // Rumus pajak per baris
                                    let pajak = jumlah * (0 / 100);
                                    props.setFieldValue((props.values.produks[index].hasil_pajak = pajak));
                                    const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                    props.setFieldValue((props.values.total_pajak_per_baris = pajak_total));
                                    props.setFieldValue("total_pajak_per_baris", pajak_total);

                                    // Rumus diskon per baris
                                    const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                                    // Rumus diskon tambahan
                                    let diskon_tambahan = (props.values.diskon / 100) * subtotal;

                                    // Rumus total
                                    let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.total = total));
                                    props.setFieldValue("total", total);

                                    // Rumus pemotongan
                                    let pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                    props.setFieldValue("pemotongan_total", pemotongan);

                                    // Rumus sisa tagihan
                                    let sisa_tagihan = pemotongan - props.values.uang_muka;
                                    props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                    props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                    // Rumus balance akun pendapatan
                                    let balance = parseInt(subtotal + pajak_total);
                                    props.setFieldValue((props.values.balance = balance));
                                  } else {
                                    props.setFieldValue(`produks.${index}.pajak_persen`, e.presentase_aktif);
                                    props.setFieldValue(`produks.${index}.pajak_nama`, e.label);
                                    props.setFieldValue(`produks.${index}.pajak_jual_id`, e.akun_jual);
                                    // Rumus total: kuantitas * harga satuan
                                    let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                    props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                    const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                                    // Rumus pajak per baris
                                    let pajak = jumlah * (e.presentase_aktif / 100);
                                    props.setFieldValue((props.values.produks[index].hasil_pajak = pajak));
                                    const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                    props.setFieldValue((props.values.total_pajak_per_baris = pajak_total));
                                    props.setFieldValue("total_pajak_per_baris", pajak_total);

                                    // Rumus diskon per baris
                                    const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                                    let new_subtotal = subtotal - pajak_total;
                                    props.setFieldValue((props.values.subtotal = new_subtotal));
                                    props.setFieldValue("subtotal", new_subtotal);

                                    // Rumus diskon tambahan
                                    let diskon_tambahan = (props.values.diskon / 100) * new_subtotal;

                                    // Rumus total
                                    let total = new_subtotal + pajak_total - (diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.total = total));
                                    props.setFieldValue("total", total);

                                    // Rumus pemotongan
                                    let pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue((props.values.pemotongan_total = pemotongan));
                                    props.setFieldValue("pemotongan_total", pemotongan);

                                    // Rumus sisa tagihan
                                    let sisa_tagihan = pemotongan - props.values.uang_muka;
                                    props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                    props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                    // Rumus balance akun pendapatan
                                    let balance = parseInt(subtotal + pajak_total);
                                    props.setFieldValue((props.values.balance = balance));
                                  }
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
                              disabled
                              type="number"
                              name={`produks.${index}.jumlah`}
                              value={props.values.produks[index].jumlah}
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
                          produk_id: "",
                          nama_produk: "",
                          deskripsi_produk: "",
                          kuantitas: "",
                          satuan: "",
                          harga_satuan: "",
                          diskon: 0,
                          pajak_id: 0,
                          pajak_nama: "kosong",
                          pajak_persen: 0,
                          pajak_jual_id: 0,
                          jumlah: "",
                          hasil_diskon: 0,
                          hasil_pajak: 0,
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
              <Col sm="4" className="mt-4">
                <label for="Pesan" name="pesan">
                  Pesan
                </label>
                <br />
                <textarea
                  placeholder="-"
                  rows="3"
                  name="pesan"
                  class="px-16 py-2 border border-gray-800"
                  onChange={props.handleChange}
                />
                <br />
                <label for="memo">Memo</label>
                <br />
                <textarea
                  placeholder="-"
                  rows="3"
                  name="memo"
                  class="px-16 py-2 border border-gray-800"
                  onChange={props.handleChange}
                />
                <br />
                File Attachment <br />
                <Form.File
                  type="file"
                  name="fileattachment"
                  onChange={(e) => props.setFieldValue("fileattachment", e.target.files)}
                />
              </Col>
              <Col sm="4" className="mt-4" />
              <Col sm="4" className="mt-4 mb-2">
                <Row>
                  <Col sm="8">Subtotal</Col>
                  <Col sm="4">
                    <label name="subtotal">
                      {props.values.subtotal == ""
                        ? "Rp. 0, 00"
                        : "Rp. " +
                          props.values.subtotal.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Diskon per baris</Col>
                  <Col sm="4">
                    <label name="total_diskon_per_baris">
                      {props.values.total_diskon_per_baris == ""
                        ? "Rp. 0, 00"
                        : "Rp. " +
                          props.values.total_diskon_per_baris.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Diskon Tambahan</Col>
                  <Col sm="4">
                    <InputGroup>
                      <FormControl
                        type="number"
                        min="0"
                        placeholder="0"
                        name="diskon"
                        onChange={(e) => {
                          props.setFieldValue("diskon", e.target.value);
                          if (props.values.boolean == false) {
                            // Rumus diskon tambahan
                            let diskon_tambahan = (e.target.value / 100) * props.values.subtotal;
                            props.setFieldValue((props.values.total_diskon = diskon_tambahan));
                            props.setFieldValue("total_diskon", diskon_tambahan);

                            // Rumus jumlah
                            const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                            // Rumus pajak per baris
                            const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                            // Rumus diskon per baris
                            const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                            // Rumus total
                            let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);
                            props.setFieldValue((props.values.total = total));
                            props.setFieldValue("total", total);

                            // Rumus pemotongan
                            let pemotongan = total - props.values.pemotongan;
                            props.setFieldValue((props.values.pemotongan_total = pemotongan));
                            props.setFieldValue("pemotongan_total", pemotongan);

                            // Rumus sisa tagihan
                            let sisa_tagihan = pemotongan - props.values.uang_muka;
                            props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                            props.setFieldValue("sisa_tagihan", sisa_tagihan);

                            // Rumus balance akun pendapatan
                            let balance = parseInt(subtotal + pajak_total);
                            props.setFieldValue((props.values.balance = balance));
                          } else {
                            // Rumus diskon tambahan
                            let diskon_tambahan = (e.target.value / 100) * props.values.subtotal;
                            props.setFieldValue((props.values.total_diskon = diskon_tambahan));
                            props.setFieldValue("total_diskon", diskon_tambahan);

                            // Rumus jumlah
                            const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                            // Rumus pajak per baris
                            const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                            // Rumus diskon per baris
                            const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                            let new_subtotal = subtotal - pajak_total;
                            props.setFieldValue((props.values.subtotal = new_subtotal));
                            props.setFieldValue("subtotal", new_subtotal);

                            // Rumus total
                            let total = new_subtotal + pajak_total - (diskon_total + diskon_tambahan);
                            props.setFieldValue((props.values.total = total));
                            props.setFieldValue("total", total);

                            // Rumus pemotongan
                            let pemotongan = total - props.values.pemotongan;
                            props.setFieldValue((props.values.pemotongan_total = pemotongan));
                            props.setFieldValue("pemotongan_total", pemotongan);

                            // Rumus sisa tagihan
                            let sisa_tagihan = pemotongan - props.values.uang_muka;
                            props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                            props.setFieldValue("sisa_tagihan", sisa_tagihan);

                            // Rumus balance akun pendapatan
                            let balance = parseInt(subtotal + pajak_total);
                            props.setFieldValue((props.values.balance = balance));
                          }
                        }}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>%</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Total diskon tambahan</Col>
                  <Col sm="4">
                    <label name="total_diskon">
                      {props.values.total_diskon == ""
                        ? "Rp. 0, 00"
                        : "Rp. " +
                          props.values.total_diskon.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Pajak per baris</Col>
                  <Col sm="4">
                    <label name="total_pajak_per_baris">
                      {props.values.total_pajak_per_baris == ""
                        ? "Rp. 0, 00"
                        : "Rp. " +
                          props.values.total_pajak_per_baris.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Total</Col>
                  <Col sm="4">
                    <label name="total">
                      {props.values.total == ""
                        ? "Rp. 0, 00"
                        : "Rp. " +
                          props.values.total.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Pemotongan</Col>
                  <Col sm="4">
                    <InputGroup>
                      <InputGroup.Append>
                        <InputGroup.Text>Rp. </InputGroup.Text>
                      </InputGroup.Append>
                      <FormControl
                        type="number"
                        min="0"
                        placeholder="0, 00"
                        name="pemotongan"
                        onChange={(e) => {
                          props.setFieldValue("pemotongan", parseInt(e.target.value));

                          if (props.values.boolean == false) {
                            // Rumus jumlah
                            const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                            // Rumus pajak per baris
                            const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                            // Rumus diskon per baris
                            const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                            // Rumus diskon tambahan
                            let diskon_tambahan = (props.values.diskon / 100) * subtotal;

                            // Rumus total
                            let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);

                            // Rumus pemotongan
                            let pemotongan = total - e.target.value;
                            props.setFieldValue((props.values.pemotongan_total = pemotongan));
                            props.setFieldValue("pemotongan_total", pemotongan);

                            // Rumus sisa tagihan
                            let sisa_tagihan = pemotongan - props.values.uang_muka;
                            props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                            props.setFieldValue("sisa_tagihan", sisa_tagihan);

                            // Rumus balance akun pendapatan
                            let balance = parseInt(subtotal + pajak_total);
                            props.setFieldValue((props.values.balance = balance));
                          } else {
                            // Rumus jumlah
                            const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                            // Rumus pajak per baris
                            const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                            // Rumus diskon per baris
                            const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                            let new_subtotal = subtotal - pajak_total;
                            props.setFieldValue((props.values.subtotal = new_subtotal));
                            props.setFieldValue("subtotal", new_subtotal);

                            // Rumus diskon tambahan
                            let diskon_tambahan = (props.values.diskon / 100) * new_subtotal;

                            // Rumus total
                            let total = new_subtotal + pajak_total - (diskon_total + diskon_tambahan);

                            // Rumus pemotongan
                            let pemotongan = total - e.target.value;
                            props.setFieldValue((props.values.pemotongan_total = pemotongan));
                            props.setFieldValue("pemotongan_total", pemotongan);

                            // Rumus sisa tagihan
                            let sisa_tagihan = pemotongan - props.values.uang_muka;
                            props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                            props.setFieldValue("sisa_tagihan", sisa_tagihan);

                            // Rumus balance akun pendapatan
                            let balance = parseInt(subtotal + pajak_total);
                            props.setFieldValue((props.values.balance = balance));
                          }
                        }}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Total setelah pemotongan </Col>
                  <Col sm="4">
                    <label name="pemotongan_total">
                      {props.values.pemotongan_total == ""
                        ? "Rp. 0, 00"
                        : "Rp. " +
                          props.values.pemotongan_total.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="5">Akun Pemotongan</Col>
                  <Col sm="7">
                    <Select
                      options={akun_pendapatan}
                      name="akun_pemotongan"
                      onChange={(e) => {
                        props.setFieldValue(`akun_pemotongan`, e.value);
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="8">Uang Muka</Col>
                  <Col sm="4">
                    <Form.Control
                      type="number"
                      placeholder="Rp. 0, 00"
                      name="uang_muka"
                      onChange={(e) => {
                        props.setFieldValue("uang_muka", parseInt(e.target.value));

                        if (props.values.boolean == false) {
                          // Rumus jumlah
                          const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                          // Rumus pajak per baris
                          const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                          // Rumus diskon per baris
                          const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                          // Rumus diskon tambahan
                          let diskon_tambahan = (props.values.diskon / 100) * subtotal;

                          // Rumus total
                          let total = subtotal + pajak_total - (diskon_total + diskon_tambahan);

                          // Rumus pemotongan
                          let pemotongan = total - props.values.pemotongan;
                          props.setFieldValue((props.values.pemotongan_total = pemotongan));
                          props.setFieldValue("pemotongan_total", pemotongan);

                          // Rumus sisa tagihan
                          let sisa_tagihan = pemotongan - e.target.value;
                          props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                          props.setFieldValue("sisa_tagihan", sisa_tagihan);

                          // Rumus balance akun pendapatan
                          let balance = parseInt(subtotal + pajak_total);
                          props.setFieldValue((props.values.balance = balance));
                        } else {
                          // Rumus jumlah
                          const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                          // Rumus pajak per baris
                          const pajak_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                          // Rumus diskon per baris
                          const diskon_total = props.values.produks.reduce((a, b) => (a = a + b.hasil_diskon), 0);

                          let new_subtotal = subtotal - pajak_total;
                          props.setFieldValue((props.values.subtotal = new_subtotal));
                          props.setFieldValue("subtotal", new_subtotal);

                          // Rumus diskon tambahan
                          let diskon_tambahan = (props.values.diskon / 100) * new_subtotal;

                          // Rumus total
                          let total = new_subtotal + pajak_total - (diskon_total + diskon_tambahan);

                          // Rumus pemotongan
                          let pemotongan = total - props.values.pemotongan;
                          props.setFieldValue((props.values.pemotongan_total = pemotongan));
                          props.setFieldValue("pemotongan_total", pemotongan);

                          // Rumus sisa tagihan
                          let sisa_tagihan = pemotongan - e.target.value;
                          props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                          props.setFieldValue("sisa_tagihan", sisa_tagihan);

                          // Rumus balance akun pendapatan
                          let balance = parseInt(subtotal + pajak_total);
                          props.setFieldValue((props.values.balance = balance));
                        }
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col sm="5">Akun Uang Muka</Col>
                  <Col sm="7">
                    <Select
                      options={akun_kas_bank}
                      name="akun_uang_muka"
                      onChange={(e) => {
                        props.setFieldValue(`akun_uang_muka`, e.value);
                      }}
                    />
                  </Col>
                </Row>

                <div className="border-t border-gray-200">
                  <br />
                  <Row>
                    <Col sm="8">
                      <h5>Sisa Tagihan</h5>
                    </Col>
                    <Col sm="4">
                      <label name="sisa_tagihan">
                        {props.values.sisa_tagihan == ""
                          ? "Rp. 0, 00"
                          : "Rp. " +
                            props.values.sisa_tagihan.toLocaleString({
                              minimumFractionDigits: 0,
                            })}
                      </label>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            <div class="border-t border-gray-200">
              <div className="mt-2 flex justify-end gap-3">
                <Link href="/jual/penjualan">
                  <Button variant="danger">Batal</Button>
                </Link>
                <Link href="/jual/penjualan">
                  <Button variant="success" onClick={props.handleSubmit}>
                    Buat Penjualan
                  </Button>
                </Link>
              </div>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_kontaks = await prisma.kontak.findMany({
    include: {
      KontakDetail: {
        where: { kontak_type_id: 2 },
      },
    },
  });

  let kontaks = [];
  get_kontaks.map((i) => {
    kontaks.push({
      value: i.id,
      label: i.nama_panggilan,
      email: i.email,
      alamat_pembayaran: i.alamat_pembayaran,
    });
  });

  const get_produks = await prisma.produk.findMany({});

  let produks = [];
  get_produks.map((i) => {
    produks.push({
      value: i.id,
      label: i.nama,
      deskripsi: i.deskripsi,
      satuan: i.satuan,
      harga_jual_satuan: i.harga_jual_satuan,
      harga_beli_satuan: i.harga_beli_satuan,
    });
  });

  const get_pajaks = await prisma.pajak.findMany({
    include: {
      kategori1: true,
    },
  });

  let pajaks = [];
  get_pajaks.map((i) => {
    pajaks.push({
      value: i.id,
      label: i.nama,
      presentase_aktif: i.presentasaAktif,
      akun_jual: i.akunPenjual,
      akun_beli: i.akunPembeli,
    });
  });

  const get_akun_pendapatans = await prisma.akun.findMany({
    where: {
      kategoriId: 13,
    },
  });

  let akun_pendapatans = [];
  get_akun_pendapatans.map((i) => {
    akun_pendapatans.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const get_akun_kas_bank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun_kas_bank = [];
  get_akun_kas_bank.map((i) => {
    akun_kas_bank.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const get_syarat_pembayarans = await prisma.syaratPembayaran.findMany({
    orderBy: {
      id: "asc",
    },
  });

  let syarat_pembayarans = [];
  get_syarat_pembayarans.map((i) => {
    syarat_pembayarans.push({
      value: i.id,
      label: i.nama_pembayaran,
    });
  });

  const get_header_penjualan = await prisma.headerPenjualan.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun1: true,
      akun2: true,
      kontak: true,
      DetailPenjualan: true,
    },
  });

  let header_penjualan = [];
  get_header_penjualan.map((i) => {
    header_penjualan.push({
      value: i.id,
      akun_1: i.akun1,
      akun_2: i.akun2,
      kontak: i.kontak,
      detail_penjualan: i.DetailPenjualan,
    });
  });

  let detail_penjualan = [];
  get_header_penjualan[0].DetailPenjualan.map((i) => {
    detail_penjualan.push({
      produk_id: i.produk_id.toString(),
      nama_produk: i.nama_produk,
      deskripsi_produk: i.desk_produk,
      kuantitas: i.kuantitas,
      satuan: i.satuan,
      harga_satuan: i.harga_satuan,
      diskon: i.diskon,
      hasil_diskon: i.hasil_diskon,
      pajak_id: i.pajak_id,
      pajak_nama: i.pajak_nama,
      pajak_jual_id: i.pajak_jual_id,
      pajak_persen: i.pajak_persen,
      hasil_pajak: i.hasil_pajak,
      jumlah: i.jumlah,
    });
  });

  return {
    props: {
      kontak: kontaks,
      produk: produks,
      pajak: pajaks,
      akun_pendapatan: akun_pendapatans,
      akun_kas_bank: akun_kas_bank,
      syarat_pembayaran: syarat_pembayarans,
      header_penjualan: get_header_penjualan,
      detail_penjualan: detail_penjualan,
    },
  };
}
