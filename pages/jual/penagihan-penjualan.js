import { React } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import BackspaceIcon from "@material-ui/icons/Backspace";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "next/Link";

import { Formik, Form as Forms, FieldArray } from "formik";
import { Form, Row, Col, InputGroup, FormControl, Table } from "react-bootstrap";

import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function penagihanpenjualan({ data, data2, data3, data4, data5, data6 }) {
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

  return (
    <Layout>
      <Formik
        initialValues={{
          nama_supplier: "",
          email: "",
          alamat_supplier: "",
          tgl_transaksi: current,
          tgl_jatuh_tempo: "",
          syarat_pembayaran: 0,
          no_ref_penagihan: "-",
          tag: "-",
          boolean: false,
          tgl_kontrak: "",
          custom_invoice: custom_invoice,
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
              pajak_jual_id: 0,
              pajak_persen: 0,
              hasil_pajak: 0,
              jumlah: "",
            },
          ],
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
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              // router.push(`view/${response.data[0].id.id}`);
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
              <Typography color="textPrimary">Penagihan Penjualan</Typography>
            </Breadcrumbs>

            <h2>Buat Penagihan Penjualan</h2>
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
                    <Form.Control
                      as="select"
                      name="nama_supplier"
                      onChange={(e) => {
                        props.setFieldValue("nama_supplier", e.target.value);
                        if (e.target.value === "kosong") {
                          props.setFieldValue("email", "");
                          props.setFieldValue("alamat_supplier", "");
                        } else {
                          let hasil = data.filter((i) => {
                            return i.kontak.id === parseInt(e.target.value);
                          });
                          props.setFieldValue("email", hasil[0].kontak.email),
                            props.setFieldValue("alamat_supplier", hasil[0].kontak.alamat_pembayaran);
                        }
                      }}
                    >
                      <option value="kosong">pilih pelanggan</option>
                      {data.map((nama_supplier, index) => (
                        <option key={index} value={nama_supplier.kontak.id}>
                          {nama_supplier.kontak.nama_panggilan}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col sm="3">
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="-"
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
                      Rp.{" "}
                      {props.values.sisa_tagihan.toLocaleString({
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
                    <Form.Control
                      as="select"
                      name="syarat_pembayaran"
                      onChange={(e) => {
                        props.setFieldValue("syarat_pembayaran", parseInt(e.target.value));
                        props.setFieldValue((props.values.syarat_pembayaran = parseInt(e.target.value)));

                        let tanggal = props.values.tgl_transaksi;
                        let tanggal2 = new Date(tanggal);
                        tanggal2.setDate(tanggal2.getDate() + parseInt(e.target.value));

                        let convert_to_iso = tanggal2.toISOString().slice(0, 10);
                        props.setFieldValue("tgl_jatuh_tempo", convert_to_iso);
                        props.setFieldValue((props.values.tgl_jatuh_tempo = convert_to_iso));
                      }}
                    >
                      <option>Pilih</option>
                      {data6.map((i, index) => (
                        <option key={index} value={i.value}>
                          {i.nama_pembayaran}
                        </option>
                      ))}
                    </Form.Control>
                  </div>
                  <div className="mb-2">
                    <label>Tanggal Kontrak</label>
                    <Form.Control type="date" placeholder="Auto" name="tgl_kontrak" onChange={props.handleChange} />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label>Tanggal Invoice</label>
                    <Form.Control
                      type="date"
                      placeholder="Auto"
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
                  </div>
                  <div className="mb-2">
                    <label>Nomor Invoice Custom</label>
                    <Form.Control type="text" placeholder="Auto" name="no_invoice_custom" disabled />
                  </div>
                </Col>
              </Row>
            </div>

            <div class="flex flex-row-reverse">
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
              <div className="border-t border-b border-gray-200 bg-gray-300 rounded">
                <Row>
                  <Col sm="2">
                    <label className="font-semibold text-lg">Produk</label>
                  </Col>
                  <Col sm="1">
                    <label className="font-semibold text-lg">Deskripsi</label>
                  </Col>
                  <Col sm="1">
                    <label className="font-semibold text-lg">Kuantitas</label>
                  </Col>
                  <Col sm="1">
                    <label className="font-semibold text-lg">Satuan</label>
                  </Col>
                  <Col sm="2">
                    <label className="font-semibold text-lg">Harga Satuan</label>
                  </Col>
                  <Col sm="1">
                    <label className="font-semibold text-lg">Diskon</label>
                  </Col>
                  <Col sm="1">
                    <label className="font-semibold text-lg">Pajak</label>
                  </Col>
                  <Col sm="2">
                    <label className="font-semibold text-lg">Jumlah</label>
                  </Col>
                  <Col sm="1" />
                </Row>
              </div>
              <div>
                <Form className="py-2">
                  <FieldArray name="produks">
                    {({ insert, remove, push }) => (
                      <div>
                        {props.values.produks.length > 0 &&
                          props.values.produks.map((i, index) => (
                            <Row md="20" key={index} name="produk_id">
                              <Col sm="2">
                                <Form.Control
                                  as="select"
                                  size=""
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
                                      props.setFieldValue(`produks.${index}.deskripsi_produk`, hasil1[0].deskripsi),
                                        props.setFieldValue(`produks.${index}.harga_satuan`, hasil1[0].harga_jual_satuan);
                                      props.setFieldValue(`produks.${index}.satuan`, hasil1[0].satuan);
                                      props.setFieldValue(
                                        `produks.${index}.nama_produk`,
                                        data3.filter((i) => i.id === parseInt(e.target.value))[0].nama
                                      );
                                    }
                                  }}
                                >
                                  <option value="kosong">pilih produk</option>
                                  {data3
                                    .filter((nama_produk) => nama_produk.harga_jual_satuan > 0)
                                    .map((nama_produk) => (
                                      <option key={nama_produk.id} value={nama_produk.id}>
                                        {nama_produk.nama}
                                      </option>
                                    ))}
                                </Form.Control>
                              </Col>
                              <Col sm="1">
                                <Form.Control
                                  disabled
                                  type="text"
                                  size=""
                                  as="textarea"
                                  rows={1}
                                  name={`produks.${index}.deskripsi_produk`}
                                  value={props.values.produks[index].deskripsi_produk}
                                ></Form.Control>
                              </Col>
                              <Col sm="1">
                                <Form.Control
                                  type="number"
                                  size=""
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
                              <Col sm="1">
                                <Form.Control
                                  disabled
                                  type="text"
                                  s
                                  ize=""
                                  name={`produks.${index}.satuan`}
                                  value={props.values.produks[index].satuan}
                                />
                              </Col>
                              <Col sm="2">
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
                              </Col>
                              <Col sm="1">
                                <Form.Control
                                  type="text"
                                  size=""
                                  placeholder="ex:100%"
                                  name={`produks.${index}.diskon`}
                                  onChange={(e) => {
                                    props.setFieldValue(`produks.${index}.diskon`, e.target.value);
                                    if (props.values.boolean == false) {
                                      // Rumus jumlah
                                      let jumlah =
                                        props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
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
                                      let jumlah =
                                        props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
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
                              <Col sm="1">
                                <Form.Control
                                  as="select"
                                  size=""
                                  name={`produks.${index}.pajak_id`}
                                  onChange={(e) => {
                                    props.setFieldValue(`produks.${index}.pajak_id`, e.target.value);
                                    if (props.values.boolean == false) {
                                      if (e.target.value == undefined || e.target.value == "" || e.target.value == 0) {
                                        // Rumus total: kuantitas * harga satuan
                                        let jumlah =
                                          props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
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
                                        props.setFieldValue(
                                          `produks.${index}.pajak_nama`,
                                          data2.filter((i) => i.id === parseInt(e.target.value))[0].nama
                                        );
                                        props.setFieldValue(
                                          `produks.${index}.pajak_jual_id`,
                                          data2.filter((i) => i.id === parseInt(e.target.value))[0].kategori1.id
                                        );

                                        // Rumus total: kuantitas * harga satuan
                                        let jumlah =
                                          props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
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
                                        let jumlah =
                                          props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
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
                                        props.setFieldValue(
                                          `produks.${index}.pajak_nama`,
                                          data2.filter((i) => i.id === parseInt(e.target.value))[0].nama
                                        );
                                        props.setFieldValue(
                                          `produks.${index}.pajak_jual_id`,
                                          data2.filter((i) => i.id === parseInt(e.target.value))[0].kategori1.id
                                        );

                                        // Rumus total: kuantitas * harga satuan
                                        let jumlah =
                                          props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
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
                                  }}
                                >
                                  {/* <option value='0'>pilih pajak</option> */}
                                  <option value="0">Pilih</option>
                                  {data2.map((nama_pajak) => (
                                    <option key={nama_pajak.id} value={nama_pajak.id}>
                                      {nama_pajak.nama} - {nama_pajak.presentasaAktif}%
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                              <Col sm="1">
                                <Form.Control
                                  type="text"
                                  size=""
                                  placeholder=""
                                  name={`produks.${index}.jumlah`}
                                  value={props.values.produks[index].jumlah}
                                  onChange={(e) => {}}
                                ></Form.Control>
                              </Col>
                              <Col sm="2">
                                <button type="button" className="secondary" onClick={() => remove(index)} onChange={(e) => {}}>
                                  <BackspaceIcon className="mt-2" />
                                </button>
                              </Col>
                            </Row>
                          ))}

                        <button
                          type="button"
                          class="mt-4 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
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
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </Form>
              </div>
            </Table>

            <Form className="py-2">
              <Form.Group as={Row} controlId="formPlaintext">
                <Col sm="4">
                  <label for="Pesan" name="pesan">
                    Pesan
                  </label>
                  <br />
                  <textarea
                    rows="3"
                    name="pesan"
                    class="px-16 py-2 border border-gray-800  "
                    onChange={props.handleChange}
                  ></textarea>{" "}
                  <br />
                  <label for="memo">Memo</label>
                  <br />
                  <textarea
                    rows="3"
                    name="memo"
                    class="px-16 py-2 border border-gray-800"
                    onChange={props.handleChange}
                  ></textarea>{" "}
                  <br />
                  File Attachment <br />
                  <Form.File
                    type="file"
                    name="fileattachment"
                    onChange={(e) => props.setFieldValue("fileattachment", e.target.files)}
                  />
                </Col>
                <Col sm="4" />
                <Col sm="4">
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">Sub Total</Col>
                    <Col sm="4">
                      <Form.Label column sm="4" name="subtotal">
                        Rp.
                        {props.values.subtotal.toLocaleString({
                          minimumFractionDigits: 0,
                        })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">Diskon Per Baris</Col>
                    <Form.Label column sm="4" name="total_diskon_per_baris">
                      Rp.
                      {props.values.total_diskon_per_baris.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">Diskon</Col>
                    <Col sm="4"></Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">
                      <InputGroup className="mb-3">
                        <FormControl
                          type="text"
                          sm="4"
                          placeholder=""
                          aria-label="Amount (to the nearest dollar)"
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
                          {/* <InputGroup.Text>Rp</InputGroup.Text> */}
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                    <Col sm="4">
                      <Form.Label column sm="2" name="total_diskon">
                        Rp.
                        {props.values.total_diskon.toLocaleString({
                          minimumFractionDigits: 0,
                        })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">Pajak</Col>
                    <Form.Label column sm="4" name="total_pajak_per_baris">
                      Rp.
                      {props.values.total_pajak_per_baris.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">Total</Col>
                    <Col sm="4">
                      <Form.Label column sm="2" name="total">
                        Rp.
                        {props.values.total.toLocaleString({
                          minimumFractionDigits: 0,
                        })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">Pemotongan</Col>
                    <Col sm="4"></Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">
                      <InputGroup className="mb-3">
                        <FormControl
                          type="text"
                          placeholder=""
                          aria-label="Amount (to the nearest dollar)"
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
                        <InputGroup.Append>
                          {/* <InputGroup.Text>%</InputGroup.Text> */}
                          <InputGroup.Text>Rp</InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                    <Col sm="4">
                      <Form.Label column sm="2" name="pemotongan_total">
                        Rp.
                        {props.values.pemotongan_total.toLocaleString({
                          minimumFractionDigits: 0,
                        })}
                      </Form.Label>
                    </Col>
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control as="select" name="akun_pemotongan" onChange={props.handleChange}>
                        <option value="0">Pilih</option>
                        {data4.map((akun) => (
                          <option key={akun.id} value={akun.id}>
                            {akun.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="8">Uang Muka</Col>
                    <Col sm="4">
                      <Form.Control
                        type="text"
                        placeholder=""
                        size=""
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
                  </Form.Group>
                  <Row className="mb-3">
                    <Col>
                      <Form.Control as="select" name="akun_uang_muka" onChange={props.handleChange}>
                        <option value="0">Pilih</option>
                        {data5.map((akun) => (
                          <option key={akun.id} value={akun.id}>
                            {akun.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <div className="border-t border-gray-200">
                    <br />
                    <Form.Group as={Row} controlId="formPlaintext">
                      <Col sm="8">
                        <h5>Sisa Tagihan</h5>
                      </Col>
                      <Col sm="4">
                        <Form.Label column sm="2" name="sisa_tagihan">
                          Rp.
                          {props.values.sisa_tagihan.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                  </div>
                </Col>
              </Form.Group>
            </Form>
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
              <Link href="/jual/penjualan">
                <button
                  onClick="openModal(false)"
                  class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none"
                >
                  Batal
                </button>
              </Link>
              <Link href="/jual/penjualan">
                <button
                  class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none"
                  onClick={props.handleSubmit}
                >
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

export async function getServerSideProps() {
  // Get kontak,produk,pajak from API
  const kontaks = await prisma.kontakDetail.findMany({
    where: {
      kontak_type_id: 2,
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
      kategori1: true,
    },
  });

  const produks = await prisma.produk.findMany({
    orderBy: {
      id: "asc",
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

  const get_syarat_pembayaran = await prisma.syaratPembayaran.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return {
    props: {
      data: kontaks,
      data2: pajaks,
      data3: produks,
      data4: akunPendapatan,
      data5: akunKasBank,
      data6: get_syarat_pembayaran,
    },
  };
}
