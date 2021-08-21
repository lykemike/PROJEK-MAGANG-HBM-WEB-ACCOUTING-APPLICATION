import { React, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, InputGroup, FormControl, Table } from "react-bootstrap";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import BackspaceIcon from "@material-ui/icons/Backspace";

import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function penagihanpenjualan({ data, data2, data3, data4, data5, data6, header, produk }) {
  const url = "http://localhost:3000/api/beli/createpembelian";
  const router = useRouter();
  const { id } = router.query;

  const formik = useRef(null)

  
  return (
    <Layout>
      <Formik
        enableReinitialize={true}
        innerRef={formik}
        initialValues={{
          nama_supplier: header[0].nama_supplier,
          email: header[0].email,
          alamat_supplier: header[0].alamat_supplier,
          tgl_transaksi: header[0].tgl_transaksi,
          tgl_jatuh_tempo: header[0].tgl_transaksi,
          syarat_pembayaran: header[0].syarat_pembayaran,
          no_ref_penagihan: header[0].no_ref_penagihan,
          no_transaksi: header[0].no_transaksi,
          tag: header[0].tag,
          produks: produk,
          pesan: header[0].pesan,
          memo: header[0].memo,
          fileattachment: [],
          subtotal: header[0].subtotal,
          total_diskon_per_baris: header[0].total_diskon_per_baris,
          diskon: header[0].diskon,
          total_diskon: header[0].total_diskon,
          total_pajak_per_baris: header[0].total_pajak_per_baris,
          total: header[0].total,
          pemotongan: header[0].pemotongan,
          pemotongan_total: header[0].pemotongan_total,
          akun_pemotongan: header[0].akun_pemotongan,
          uang_muka: header[0].uang_muka,
          akun_uang_muka: header[0].akun_uang_muka,
          sisa_tagihan: header[0].sisa_tagihan,
        }}
        // validationSchema={}
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
          // Axios.post(url, formData, {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // })
          //   .then(function (response) {
          //     console.log(response);
          //     router.push(`view/${id}`);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        }}>
        {(props) => (
          <Forms noValidate>
            <h3>Edit Penagihan Pembelian</h3>
            <div className='border-t border-gray-200'>
              <Form>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Form.Label column sm='3'>
                    Supplier
                  </Form.Label>
                  <Form.Label column sm='3'>
                    Email
                  </Form.Label>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='3'>
                    <Form.Control
                      as='select'
                      name='nama_supplier'
                      disabled={true}
                      value={props.values.nama_supplier}
                      onChange={(e) => {
                        props.setFieldValue("nama_supplier", e.target.value);
                        if (e.target.value === "") {
                          props.setFieldValue("email", ""), props.setFieldValue("alamat_supplier", "");
                        } else {
                          let hasil = data.filter((i) => {
                            return i.kontak.id === parseInt(e.target.value);
                          });
                          props.setFieldValue("email", hasil[0].kontak.email),
                            props.setFieldValue("alamat_supplier", hasil[0].kontak.alamat_pembayaran);
                        }
                      }}>
                      <option value='kosong'>pilih supplier</option>
                      {data.map((nama_supplier) => (
                        <option key={nama_supplier.kontak.id} value={nama_supplier.kontak.id}>
                          {nama_supplier.kontak.nama_panggilan}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm='3'>
                    <Form.Control
                      type='text'
                      placeholder=''
                      disabled={true}
                      name='email'
                      value={props.values.email}
                      onChange={(e) => {
                        props.setFieldValue("email", e.target.value);
                      }}></Form.Control>
                  </Col>
                  <Col sm='3'></Col>
                  <Col sm='3'>
                    <Form.Label column sm='2' name='sisa_tagihan'>
                      Rp.{props.values.sisa_tagihan}
                    </Form.Label>
                  </Col>
                </Form.Group>
              </Form>
            </div>
            <div className='border-t border-gray-200'>
              <Form>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Form.Label column sm='3'>
                    <label for='message'>Alamat Penagihan</label>
                    <br />
                    <textarea
                      rows='5'
                      id='message'
                      disabled={true}
                      class='px-10 py-2 border border-gray-800  '
                      name='alamat_supplier'
                      value={props.values.alamat_supplier}
                      onChange={(e) => {
                        props.setFieldValue("alamat_supplier", e.target.value);
                      }}></textarea>
                  </Form.Label>
                  <Form.Label column sm='3'>
                    Tgl Transaksi <br />
                    <Form.Control
                      type='date'
                      placeholder='Auto'
                      name='tgl_transaksi'
                      value={props.values.tgl_transaksi}
                      disabled={true}
                      onChange={
                        // props.handleChange
                        (e) => {
                          props.setFieldValue("tgl_transaksi", e.target.value);
                          props.setFieldValue((props.values.tgl_transaksi = e.target.value));

                          let tgltransaksi = e.target.value.split("-");
                          tgltransaksi = new Date(tgltransaksi[0], tgltransaksi[1] - 1, tgltransaksi[2]);
                          tgltransaksi.setDate(tgltransaksi.getDate() + props.values.syarat_pembayaran);
                          let tanggal = tgltransaksi.toLocaleDateString();
                          let tgl = tanggal.split("/");
                          props.setFieldValue("tgl_jatuh_tempo", `${tgl[2]}-${tgl[0].length > 1 ? tgl[0] : "0" + tgl[0]}-${tgl[1]}`);
                          props.setFieldValue(props.values.tgl_jatuh_tempo, `${tgl[2]}-${tgl[0].length > 1 ? tgl[0] : "0" + tgl[0]}-${tgl[1]}`);
                        }
                      }
                    />
                    <br />
                    Tgl Jatuh Tempo <br />
                    <Form.Control
                      type='date'
                      placeholder='Auto'
                      name='tgl_jatuh_tempo'
                      disabled={true}
                      onChange={props.handleChange}
                      value={props.values.tgl_jatuh_tempo}
                    />{" "}
                    <br />
                    Syarat Pembayaran <br />
                    <Form.Control
                      as='select'
                      defaultValue='Choose...'
                      name='syarat_pembayaran'
                      value={props.values.syarat_pembayaran}
                      disabled={true}
                      onChange={(e) => {

                        // let tgltransaksi = props.values.tgl_transaksi.split("-");
                        // tgltransaksi = new Date(tgltransaksi[0], tgltransaksi[1] - 1, tgltransaksi[2]);
                        // tgltransaksi.setDate(tgltransaksi.getDate() + e.target.value);
                        // let tanggal = tgltransaksi.toLocaleDateString();
                        // let tgl = tanggal.split("/");
                        // props.setFieldValue("tgl_jatuh_tempo", `${tgl[2]}-${tgl[0].length > 1 ? tgl[0] : "0" + tgl[0]}-${tgl[1]}`);
                        // props.setFieldValue(props.values.tgl_jatuh_tempo, `${tgl[2]}-${tgl[0].length > 1 ? tgl[0] : "0" + tgl[0]}-${tgl[1]}`);
                      }}
                      onBLur={props.handleBlur}>
                    {header.map((i) => {
                        <option>{i.syarat_pembayaran}</option>;
                      })}
                    </Form.Control>
                    <br />
                  </Form.Label>

                  <Form.Label column sm='3'>
                    No Transaksi <br />
                    <Form.Control disabled={true} type='text' placeholder='Auto' value={props.values.no_transaksi}  name='no_transaksi' onChange={props.handleChange} /> <br />
                    No Referensi Penagihan <br />
                    <Form.Control disabled={true} type='text' placeholder='' value={props.values.no_ref_penagihan} name='no_ref_penagihan' onChange={props.handleChange} /> <br />
                    Tag <br />
                    <Form.Control disabled={true} type='text' placeholder='' name='tag' value={props.values.tag} onChange={props.handleChange} /> <br />
                  </Form.Label>
                </Form.Group>
              </Form>
              <div class='flex flex-row-reverse'>
              <Form.Check
                label='Harga Termasuk Pajak'
                type='switch'
                id='custom-switch'
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
              </div>

            </div>
            <Table responsive>
              <div className='border-t border-gray-200'>
                <Form>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Form.Label column sm='2'>
                      Produk
                    </Form.Label>
                    <Form.Label column sm='1'>
                      Deskripsi
                    </Form.Label>
                    <Form.Label column sm='1'>
                      Kuantitas
                    </Form.Label>
                    <Form.Label column sm='1'>
                      Satuan
                    </Form.Label>
                    <Form.Label column sm='2'>
                      Harga Satuan
                    </Form.Label>
                    <Form.Label column sm='1'>
                      Diskon
                    </Form.Label>
                    <Form.Label column sm='1'>
                      Pajak
                    </Form.Label>
                    <Form.Label column sm='2'>
                      Jumlah
                    </Form.Label>
                    <Form.Label column sm='1'></Form.Label>
                  </Form.Group>
                </Form>
              </div>

              <div className='border-t border-gray-200'>
                <Form className='py-2'>
                  <FieldArray name='produks'>
                    {({ insert, remove, push }) => (
                      <div>
                        {props.values.produks.length > 0 &&
                          props.values.produks.map((i, index) => (
                            <Row md='20' key={index} name='produk_id'>
                              <Col sm='2'>
                                <Form.Control
                                  as='select'
                                  size=''
                                  name={`produks.${index}.produk_id`}
                                  value={props.values.produks[index].produk_id}
                                  onChange={(e) => {
                                    props.setFieldValue(`produks.${index}.produk_id`, e.target.value);
                                    if (e.target.value === "") {
                                      props.setFieldValue(`produks.${index}.deskripsi_produk`, ""),
                                        props.setFieldValue(`produks.${index}.harga_satuan`, ""),
                                        props.setFieldValue(`produks.${index}.diskon`, ""),
                                        props.setFieldValue(`produks.${index}.harga_satuan`, ""),
                                        props.setFieldValue(`produks.${index}.kuantitas`, ""),
                                        props.setFieldValue(`produks.${index}.pajak`, ""),
                                        props.setFieldValue(`produks.${index}.satuan`, ""),
                                        props.setFieldValue(`produks.${index}.presentasaAktif`, "");
                                    } else {
                                      let hasil1 = data3.filter((i) => {
                                        return i.id === parseInt(e.target.value);
                                      });
                                      props.setFieldValue(`produks.${index}.deskripsi_produk`, hasil1[0].deskripsi),
                                      props.setFieldValue(`produks.${index}.harga_satuan`, hasil1[0].harga_beli_satuan);
                                      props.setFieldValue(`produks.${index}.satuan`, hasil1[0].satuan.satuan);
                                      props.setFieldValue(
                                        `produks.${index}.nama_produk`,
                                        data3.filter((i) => i.id === parseInt(e.target.value))[0].nama
                                      );
                                    }
                                  }}>
                                  <option value='kosong'>pilih produk</option>
                                  {data3.filter(nama_produk => nama_produk.harga_beli_satuan > 0).map((nama_produk, index) => (
                                    <option key={index} value={nama_produk.id}>
                                      {nama_produk.nama}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                              <Col sm='1'>
                                <Form.Control
                                  type='text'
                                  size=''
                                  as='textarea'
                                  rows={2}
                                  name={`produks.${index}.deskripsi_produk`}
                                  value={props.values.produks[index].deskripsi_produk}></Form.Control>
                              </Col>
                              <Col sm='1'>
                                <Form.Control
                                  type='number'
                                  size=''
                                  name={`produks.${index}.kuantitas`}
                                  value={props.values.produks[index].kuantitas}
                                  onChange={(e) => {
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

                                    // Rumus diskon jurnal
                                    let diskon_jurnal = parseInt(diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.diskon_jurnal = diskon_jurnal));
                                  }}
                                />
                              </Col>
                              <Col sm='1'>
                                <Form.Control type='text' size='' name={`produks.${index}.satuan`} value={props.values.produks[index].satuan} />
                              </Col>
                              <Col sm='2'>
                                <Form.Control
                                  type='text'
                                  size=''
                                  placeholder=''
                                  name={`produks.${index}.harga_satuan`}
                                  value={"Rp. " + props.values.produks[index].harga_satuan.toLocaleString({ minimumFractionDigits: 0 })}
                                />
                              </Col>
                              <Col sm='1'>
                                <Form.Control
                                  type='text'
                                  size=''
                                  placeholder='ex:100%'
                                  name={`produks.${index}.diskon`}
                                  value={props.values.produks[index].diskon}
                                  onChange={(e) => {
                                    props.setFieldValue(`produks.${index}.diskon`, e.target.value);

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

                                    // Rumus diskon jurnal
                                    let diskon_jurnal = parseInt(diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.diskon_jurnal = diskon_jurnal));
                                  }}
                                />
                              </Col>
                              <Col sm='1'>
                                <Form.Control
                                  as='select'
                                  size=''
                                  name={`produks.${index}.pajak_id`}
                                  value={props.values.produks[index].pajak_id}
                                  onChange={(e) => {
                                    props.setFieldValue(`produks.${index}.pajak_id`, e.target.value);
                                    let hasil2 = data2.filter((i) => {
                                      return i.id === parseInt(e.target.value);
                                    });
                                    props.setFieldValue(`produks.${index}.pajak_persen`, hasil2[0].presentasaAktif);
                                    props.setFieldValue(
                                      `produks.${index}.pajak_nama`,
                                      data2.filter((i) => i.id === parseInt(e.target.value))[0].nama
                                    );

                                    // Rumus total: kuantitas * harga satuan
                                    let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                    props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                    const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
                                    props.setFieldValue((props.values.subtotal = subtotal));
                                    props.setFieldValue("subtotal", subtotal);

                                    // Rumus pajak per baris
                                    let pajak = jumlah * (hasil2[0].presentasaAktif / 100);
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

                                    // Rumus diskon jurnal
                                    let diskon_jurnal = parseInt(diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.diskon_jurnal = diskon_jurnal));
                                  }}>
                                  {/* <option value='0'>pilih pajak</option> */}
                                  {data2.map((nama_pajak) => (
                                    <option key={nama_pajak.id} value={nama_pajak.id}>
                                      {nama_pajak.nama} - {nama_pajak.presentasaAktif}%
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                              <Col sm='1'>
                                <Form.Control
                                  type='text'
                                  size=''
                                  placeholder=''
                                  name={`produks.${index}.jumlah`}
                                  value={props.values.produks[index].jumlah}
                                  onChange={(e) => {}}></Form.Control>
                              </Col>
                              <Col sm='2'>
                                <button
                                  type='button'
                                  className='secondary'
                                  onClick={() => remove(index)}
                                  onChange={(e) => {
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
                                    let sisa_tagihan = pemotongan - props.values.uang_muka;
                                    props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                                    props.setFieldValue("sisa_tagihan", sisa_tagihan);

                                    // Rumus balance akun pendapatan
                                    let balance = parseInt(subtotal + pajak_total);
                                    props.setFieldValue((props.values.balance = balance));

                                    // Rumus diskon jurnal
                                    let diskon_jurnal = parseInt(diskon_total + diskon_tambahan);
                                    props.setFieldValue((props.values.diskon_jurnal = diskon_jurnal));
                                  }}>
                                  <BackspaceIcon className='mt-2' />
                                </button>
                              </Col>
                            </Row>
                          ))}

                        <button
                          type='button'
                          class='focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
                          onClick={() =>
                            push({
                              produk_id: "",
                              nama_produk: "",
                              deskripsi_produk: "",
                              kuantitas: "",
                              satuan: "",
                              harga_satuan: "",
                              diskon: "",
                              pajak_id: "",
                              pajak_nama: "",
                              pajak_persen: "",
                              jumlah: "",
                              hasil_diskon: "",
                              hasil_pajak: "",
                            })
                          }>
                          <AddIcon fontSize='small' /> Tambah data
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </Form>
              </div>
            </Table>

            <Form className='py-2'>
              <Form.Group as={Row} controlId='formPlaintext'>
                <Col sm='4'>
                  <label for='Pesan' name='pesan'>
                    Pesan
                  </label>
                  <br />
                  <textarea 
                   rows='3' 
                   name='pesan' 
                   class='px-16 py-2 border border-gray-800'  
                   placeholder={props.values.pesan}
                   onChange={props.handleChange}
                   ></textarea> <br />

                  <label for='memo'>Memo</label>
                  <br />
                  <textarea 
                  rows='3' 
                  name='memo' 
                  class='px-16 py-2 border border-gray-800  '
                  placeholder={props.values.memo}
                  onChange={props.handleChange}
                  ></textarea> <br />
             
                 File Attachment <br />
                  <Form.File type='file' name='fileattachment' onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
                </Col>
                <Col sm='4' />
                <Col sm='4'>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>Sub Total</Col>
                    <Col sm='4'>
                      <Form.Label column sm='4' name='subtotal'>
                        Rp.{props.values.subtotal.toLocaleString({ minimumFractionDigits: 0 })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>Diskon Per Baris</Col>
                    <Form.Label column sm='4' name='total_diskon_per_baris'>
                      Rp.{props.values.total_diskon_per_baris.toLocaleString({ minimumFractionDigits: 0 })}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>Diskon</Col>
                    <Col sm='4'></Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>
                      <InputGroup className='mb-3'>
                        <FormControl
                          type='text'
                          sm='4'
                          placeholder=''
                          aria-label='Amount (to the nearest dollar)'
                          name='diskon'
                          onChange={(e) => {
                            props.setFieldValue("diskon", e.target.value);
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

                            // Rumus diskon jurnal
                            let diskon_jurnal = parseInt(diskon_total + diskon_tambahan);
                            props.setFieldValue((props.values.diskon_jurnal = diskon_jurnal));
                          }}
                        />

                        <InputGroup.Append>
                          <InputGroup.Text>%</InputGroup.Text>
                          {/* <InputGroup.Text>Rp</InputGroup.Text> */}
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                    <Col sm='4'>
                      <Form.Label column sm='2' name='total_diskon'>
                        Rp.{props.values.total_diskon.toLocaleString({ minimumFractionDigits: 0 })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>Pajak</Col>
                    <Form.Label column sm='4' name='total_pajak_per_baris'>
                      Rp.{props.values.total_pajak_per_baris.toLocaleString({ minimumFractionDigits: 0 })}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>Total</Col>
                    <Col sm='4'>
                      <Form.Label column sm='2' name='total'>
                        Rp.{props.values.total.toLocaleString({ minimumFractionDigits: 0 })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>Pemotongan</Col>
                    <Col sm='4'></Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>
                      <InputGroup className='mb-3'>
                        <FormControl
                          type='text'
                          placeholder=''
                          aria-label='Amount (to the nearest dollar)'
                          name='pemotongan'
                          onChange={(e) => {
                            props.setFieldValue("pemotongan", parseInt(e.target.value));

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

                            // Rumus diskon jurnal
                            let diskon_jurnal = parseInt(diskon_total + diskon_tambahan);
                            props.setFieldValue((props.values.diskon_jurnal = diskon_jurnal));
                          }}
                        />
                        <InputGroup.Append>
                          {/* <InputGroup.Text>%</InputGroup.Text> */}
                          <InputGroup.Text>Rp</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                    <Col sm='4'>
                      <Form.Label column sm='2' name='pemotongan_total'>
                        Rp.{props.values.pemotongan_total.toLocaleString({ minimumFractionDigits: 0 })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Row className='mb-3'>
                    <Col>
                      <Form.Control as='select' name='akun_pemotongan' onChange={props.handleChange}>
                        <option value='kosong'>Pilih</option>
                        {data4.map((akun) => (
                          <option key={akun.id} value={akun.id}>
                            {akun.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                  <Form.Group as={Row} controlId='formPlaintext'>
                    <Col sm='8'>Uang Muka</Col>
                    <Col sm='4'>
                      <Form.Control
                        type='text'
                        placeholder=''
                        size=''
                        name='uang_muka'
                        onChange={(e) => {
                          props.setFieldValue("uang_muka", parseInt(e.target.value));

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

                          // Rumus diskon jurnal
                          let diskon_jurnal = parseInt(diskon_total + diskon_tambahan);
                          props.setFieldValue((props.values.diskon_jurnal = diskon_jurnal));
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Row className='mb-3'>
                    <Col>
                      <Form.Control as='select' name='akun_uang_muka' onChange={props.handleChange}>
                        <option value='kosong'>Pilih</option>
                        {data5.map((akun) => (
                          <option key={akun.id} value={akun.id}>
                            {akun.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <div className='border-t border-gray-200'>
                    <br />
                    <Form.Group as={Row} controlId='formPlaintext'>
                      <Col sm='8'>
                        <h5>Sisa Tagihan</h5>
                      </Col>
                      <Col sm='4'>
                        <Form.Label column sm='2' name='sisa_tagihan'>
                          Rp.{props.values.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                  </div>
                </Col>
              </Form.Group>
            </Form>
            <div class='left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3'>
              <Link href='/jual/penjualan'>
                <button onclick='openModal(false)' class='bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none'>
                  Batal
                </button>
              </Link>
              <Link href='/jual/penjualan'>
                <button class='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none' onClick={props.handleSubmit}>
                  Buat Penjualan
                </button>
              </Link>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerPembelian.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      DetailPembelian: true,
    },
  });

  // Get kontak,produk,pajak from API
  const kontaks = await prisma.kontakDetail.findMany({
    where: {
      kontak_type_id: 1,
    },
    // orderBy: {
    //   id: "asc",
    // },
    include: {
      kontak: true,
    },
  });

  const pajaks = await prisma.pajak.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });

  const produks = await prisma.produk.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      satuan: true,
    },
  });

  const akunPendapatan = await prisma.akun.findMany({
    where: {
      kategoriId: 13,
    },
  });

  const akunKasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  const pembelianTerakhir = await prisma.headerPembelian.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  
  let produk = []
  header[0].DetailPembelian.map((i) => {
    produk.push({
              produk_id: i.produk_id.toString(),
              nama_produk: i.nama_produk,
              deskripsi_produk: i.desk_produk,
              kuantitas: i.kuantitas,
              satuan: i.satuan,
              harga_satuan: i.harga_satuan,
              diskon: i.diskon,
              hasil_diskon: i.hasil_diskon,
              pajak_id: i.pajak_id ,
              pajak_nama: i.pajak_nama,
              pajak_nama_akun_beli: i.pajak_nama_akun_beli,
              pajak_persen: i.pajak_persen,
              hasil_pajak: i.hasil_pajak,
              jumlah: i.jumlah,
    })
  })
  return {
    props: {
      data: kontaks,
      data2: pajaks,
      data3: produks,
      data4: akunPendapatan,
      data5: akunKasBank,
      data6: pembelianTerakhir,
      header: header,
      produk: produk
    },
  };
}
