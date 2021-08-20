import { React, useEffect, useState } from "react";
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

export default function penagihanpenjualan({ data, data2, data3, data4, data5, data6 }) {
  const url = "http://localhost:3000/api/beli/createpembelian";
  const router = useRouter();
  const id = data6 != undefined ? parseInt(data6.id) + 1 : 0;
  const [idInvoice, setIdInvoice] = useState(id);

  return (
    <Layout>
      <Formik
        initialValues={{
          nama_supplier: "",
          email: "",
          alamat_supplier: "",
          tgl_transaksi: "",
          tgl_jatuh_tempo: "",
          syarat_pembayaran: "",
          no_ref_penagihan: "",
          no_transaksi: 0,
          tag: "",
          boolean: false,
          produks: [
            {
              produk_id: "",
              nama_produk: "",
              deskripsi_produk: "",
              kuantitas: "",
              satuan: "",
              harga_satuan: "",
              diskon: 0,
              hasil_diskon: 0,
              pajak_id: 0,
              pajak_nama: "kosong",
              pajak_nama_akun_beli: "",
              pajak_persen: 0,
              hasil_pajak: 0,
              jumlah: "",
            },
          ],
          pesan: "",
          memo: "",
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
        // validationSchema={}
        onSubmit={async (values) => {
          console.log(values);
          let formData = new FormData();
          for (var key in values) {
            if (key == "produks") {
              formData.append(`${key}`, JSON.stringify(values[key]));
            } else {
              formData.append(`${key}`, `${values[key]}`);
            }
          }
          Array.from(values.fileattachment).map((i) => formData.append("file", i));
          console.log(values.fileattachment);
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              router.push(`view/${idInvoice}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <h3>Buat Penagihan Pembelian</h3>
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
                      onChange={(e) => {
                        props.setFieldValue("nama_supplier", e.target.value);
                        if (e.target.value === "kosong") {
                          props.setFieldValue("email", ""), props.setFieldValue("alamat_supplier", "");
                        } else {
                          let hasil = data.filter((i) => {
                            return i.kontak.id === parseInt(e.target.value);
                          });
                          props.setFieldValue("email", hasil[0].kontak.email), props.setFieldValue("alamat_supplier", hasil[0].kontak.alamat_pembayaran);
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
                    <label for='message'>Alamat Supplier</label>
                    <br />
                    <textarea
                      rows='5'
                      id='message'
                      class='px-10 py-2 border border-gray-800  '
                      name='alamat_supplier'
                      value={props.values.alamat_supplier}
                      onChange={(e) => {
                        props.setFieldValue("alamat_supplier", e.target.value);
                      }}></textarea>
                  </Form.Label>
                  <Form.Label column sm='3'>
                    Tgl Invoice <br />
                    <Form.Control
                      type='date'
                      placeholder='Auto'
                      name='tgl_transaksi'
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
                    <Form.Control type='date' placeholder='Auto' name='tgl_jatuh_tempo' onChange={props.handleChange} value={props.values.tgl_jatuh_tempo} /> <br />
                    Syarat Pembayaran <br />
                    <Form.Control
                      as='select'
                      defaultValue='Choose...'
                      name='syarat_pembayaran'
                      onChange={(e) => {
                        props.setFieldValue("syarat_pembayaran", parseInt(e.target.value));
                        props.setFieldValue((props.values.syarat_pembayaran = parseInt(e.target.value)));

                        // let tgltransaksi = props.values.tgl_transaksi.split("-");
                        // tgltransaksi = new Date(tgltransaksi[0], tgltransaksi[1] - 1, tgltransaksi[2]);
                        // tgltransaksi.setDate(tgltransaksi.getDate() + e.target.value);
                        // let tanggal = tgltransaksi.toLocaleDateString();
                        // let tgl = tanggal.split("/");
                        // props.setFieldValue("tgl_jatuh_tempo", `${tgl[2]}-${tgl[0].length > 1 ? tgl[0] : "0" + tgl[0]}-${tgl[1]}`);
                        // props.setFieldValue(props.values.tgl_jatuh_tempo, `${tgl[2]}-${tgl[0].length > 1 ? tgl[0] : "0" + tgl[0]}-${tgl[1]}`);
                      }}
                      onBLur={props.handleBlur}>
                      <option value='0'>Pilih</option>
                      <option value='0'>Tunai / Cash</option>
                      <option value='0'>Kredit / Term of Payment</option>
                      <option value='10'>10 hari</option>
                      <option value='15'>15 hari</option>
                      <option value='30'>30 hari</option>
                    </Form.Control>
                    <br />
                  </Form.Label>

                  <Form.Label column sm='3'>
                    No Invoice <br />
                    <Form.Control disabled type='text' placeholder='Auto' name='no_transaksi' onChange={props.handleChange} /> <br />
                    Nomor Kontrak <br />
                    <Form.Control type='text' placeholder='' name='no_ref_penagihan' onChange={props.handleChange} /> <br />
                    Tag <br />
                    <Form.Control type='text' placeholder='' name='tag' onChange={props.handleChange} /> <br />
                  </Form.Label>
                </Form.Group>
              </Form>
              <div class='flex flex-row-reverse'>
                <FormControlLabel
                  value=''
                  control={
                    <Switch
                      color='primary'
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
                  label='Harga Termasuk Pajak'
                  labelPlacement='start'
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
                                      props.setFieldValue(`produks.${index}.deskripsi_produk`, hasil1[0].deskripsi), props.setFieldValue(`produks.${index}.harga_satuan`, hasil1[0].harga_jual_satuan);
                                      props.setFieldValue(`produks.${index}.satuan`, hasil1[0].satuan.satuan);
                                      props.setFieldValue(`produks.${index}.nama_produk`, data3.filter((i) => i.id === parseInt(e.target.value))[0].nama);
                                    }
                                  }}>
                                  <option value='kosong'>pilih produk</option>
                                  {data3.filter(nama_produk => nama_produk.harga_beli_satuan > 0).map((nama_produk) => (
                                    <option key={nama_produk.id} value={nama_produk.id}>
                                      {nama_produk.nama}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                              <Col sm='1'>
                                <Form.Control
                                  type='text'
                                  size=''
                                  disabled
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
                                  value={props.values.kuantitas}
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
                              </Col>
                              <Col sm='1'>
                                <Form.Control disabled type='text' size='' name={`produks.${index}.satuan`} value={props.values.produks[index].satuan} />
                              </Col>
                              <Col sm='2'>
                                <Form.Control
                                  type='text'
                                  size=''
                                  disabled
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
                              </Col>
                              <Col sm='1'>
                                <Form.Control
                                  as='select'
                                  size=''
                                  name={`produks.${index}.pajak_id`}
                                  onChange={(e) => {
                                    props.setFieldValue(`produks.${index}.pajak_id`, e.target.value);
                                    if (props.values.boolean == false) {
                                      if (e.target.value == undefined || e.target.value == "" || e.target.value == 0) {
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
                                        let hasil2 = data2.filter((i) => {
                                          return i.id === parseInt(e.target.value);
                                        });
                                        props.setFieldValue(`produks.${index}.pajak_persen`, hasil2[0].presentasaAktif);
                                        props.setFieldValue(`produks.${index}.pajak_nama`, data2.filter((i) => i.id === parseInt(e.target.value))[0].nama);
                                        props.setFieldValue(`produks.${index}.pajak_nama_akun_beli`, data2.filter((i) => i.id === parseInt(e.target.value))[0].kategori2.nama_akun);

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
                                      }
                                    } else {
                                      if (e.target.value == undefined || e.target.value == "" || e.target.value == 0) {
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
                                        let hasil2 = data2.filter((i) => {
                                          return i.id === parseInt(e.target.value);
                                        });
                                        props.setFieldValue(`produks.${index}.pajak_persen`, hasil2[0].presentasaAktif);
                                        props.setFieldValue(`produks.${index}.pajak_nama`, data2.filter((i) => i.id === parseInt(e.target.value))[0].nama);
                                        props.setFieldValue(`produks.${index}.pajak_nama_akun_beli`, data2.filter((i) => i.id === parseInt(e.target.value))[0].kategori2.nama_akun);

                                        // Rumus total: kuantitas * harga satuan
                                        let jumlah = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
                                        props.setFieldValue((props.values.produks[index].jumlah = jumlah));
                                        const subtotal = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

                                        // Rumus pajak per baris
                                        let pajak = jumlah * (hasil2[0].presentasaAktif / 100);
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
                                  }}>
                                  <option value="0">pilih pajak</option>
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
                                  disabled
                                  placeholder=''
                                  name={`produks.${index}.jumlah`}
                                  value={props.values.produks[index].jumlah}
                                  onChange={(e) => {}}></Form.Control>
                              </Col>
                              <Col sm='2'>
                                <button type='button' className='secondary' onClick={() => remove(index)} onChange={(e) => {}}>
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
                              diskon: 0,
                              pajak_id: 0,
                              pajak_nama: "kosong",
                              pajak_persen: 0,
                              pajak_nama_akun_beli: "kosong",
                              jumlah: "",
                              hasil_diskon: 0,
                              hasil_pajak: 0,
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
                  <textarea rows='3' name='pesan' class='px-16 py-2 border border-gray-800  '></textarea> <br />
                  <label for='memo'>Memo</label>
                  <br />
                  <textarea rows='3' name='memo' class='px-16 py-2 border border-gray-800  '></textarea> <br />
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
              <Link href='/beli/pembelian'>
                <button class='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none' onClick={props.handleSubmit}>
                  Buat Pembelian
                </button>
              </Link>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
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
    include: {
      kategori2: true,
    },
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

  return {
    props: {
      data: kontaks,
      data2: pajaks,
      data3: produks,
      data4: akunPendapatan,
      data5: akunKasBank,
      data6: pembelianTerakhir,
    },
  };
}
