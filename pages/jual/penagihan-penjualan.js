import { React } from "react";
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

export default function penagihanpenjualan({ kontak, produk, pajak, akun_pendapatan, akun_kas_bank, syarat_pembayaran }) {
  const ValidationSchema = Yup.object().shape({
    nama_supplier: Yup.string().required("*required"),
    syarat_pembayaran: Yup.string().required("*required"),
    tgl_jatuh_tempo: Yup.string().required("*required"),
    tgl_kontrak: Yup.string().required("*required"),
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

  return (
    <Layout>
      <Formik
        initialValues={{
          client_id: "",
          client_email: "",
          client_alamat_penagihan: "",
          syarat_pembayaran_utama: "",
          nomor_npwp: "",
          no_kontrak: "",
          tgl_kontrak_mulai: "",
          tgl_kontrak_jatuh_tempo: "",
          no_invoice: "",
          custom_invoice: custom_invoice,
          tipe_perushaan: false,
          pesan: "",
          subtotal: "",
          pajak_id: "",
          pajak_nama: "",
          pajak_persen: 0,
          pajak_hasil: 0,
          total: 0,
          sisa_tagihan: 0,
          produks: [
            {
              produk_id: "",
              produk_name: "",
              produk_deskripsi: "",
              produk_harga: 0,
            },
          ],
          // nama_supplier: "",
          // email: "",
          // alamat_supplier: "",
          // tgl_transaksi: current,
          // tgl_jatuh_tempo: "",
          // syarat_pembayaran: "",
          // no_ref_penagihan: "-",
          // tag: "-",
          // boolean: false,
          // tgl_kontrak: "",
          // custom_invoice: custom_invoice,
          // produks: [
          //   {
          //     produk_id: "",
          //     nama_produk: "",
          //     deskripsi_produk: "",
          //     kuantitas: "",
          //     satuan: "",
          //     harga_satuan: "",
          //     diskon: 0,
          //     hasil_diskon: 0,
          //     pajak_id: 0,
          //     pajak_nama: "kosong",
          //     pajak_jual_id: 0,
          //     pajak_persen: 0,
          //     hasil_pajak: 0,
          //     jumlah: "",
          //   },
          // ],
          // pesan: "-",
          // memo: "-",
          // fileattachment: [],
          // subtotal: "",
          // total_diskon_per_baris: "",
          // diskon: 0,
          // total_diskon: "",
          // total_pajak_per_baris: "",
          // total: "",
          // pemotongan: 0,
          // pemotongan_total: 0,
          // akun_pemotongan: "",
          // uang_muka: 0,
          // akun_uang_muka: "",
          // sisa_tagihan: 0,
          // balance: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => {
          console.log(values);
          // let formData = new FormData();
          // for (var key in values) {
          //   if (key == "produks") {
          //     formData.append(`${key}`, JSON.stringify(values[key]));
          //   } else {
          //     formData.append(`${key}`, `${values[key]}`);
          //   }
          // }
          // Array.from(values.fileattachment).map((i) => formData.append("file", i));
          // console.log(values);
          // Axios.post(url, formData, {
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
          // })
          //   .then(function (response) {
          //     console.log(response);
          //     router.push(`view/${response.data[0].id.id}`);
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary">Transaksi</Typography>
            </Breadcrumbs>

            <h2 className="text-blue-600">Buat Penagihan Penjualan</h2>
            <div className="border-t border-gray-200">
              <Form>
                <Row className="mt-2">
                  <Col sm="3">
                    <label className="font-medium">
                      Client
                      {props.errors.nama_supplier && props.touched.nama_supplier ? (
                        <span class="text-xs text-red-500 required-dot">{" " + props.errors.nama_supplier}</span>
                      ) : null}
                    </label>
                  </Col>
                  <Col sm="3">
                    <label className="font-medium">Email</label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="3">
                    <Select
                      options={kontak}
                      name="client_id"
                      onChange={(e) => {
                        props.setFieldValue(`client_id`, e.value);
                        props.setFieldValue(`client_email`, e.email);
                        props.setFieldValue(`client_alamat_penagihan`, e.alamat_perusahaan);
                        props.setFieldValue(`syarat_pembayaran_utama`, e.syarat_pembayaran);
                        console.log(e.syarat_pembayaran);
                        props.setFieldValue(`nomor_npwp`, e.nomor_npwp);
                      }}
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Control
                      disabled
                      type="text"
                      placeholder="Auto"
                      name="client_email"
                      value={props.values.client_email}
                      onChange={(e) => {
                        props.setFieldValue("client_email", e.target.value);
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
                    <label className="font-medium">Alamat Penagihan</label>
                    <FormControl
                      style={{ height: 115, resize: "none" }}
                      disabled
                      placeholder="Auto"
                      as="textarea"
                      className="italic"
                      name="client_alamat_penagihan"
                      value={props.values.client_alamat_penagihan}
                      onChange={(e) => {
                        props.setFieldValue("client_alamat_penagihan", e.target.value);
                      }}
                    />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label className="font-medium">
                      Nomor Kontrak
                      <span class="text-red-500 required-dot"> * </span>
                    </label>
                    <Form.Control type="text" placeholder="-" name="no_ref_penagihan" onChange={props.handleChange} />
                  </div>

                  <div className="mb-2">
                    <label className="font-medium">No. Transaksi</label>
                    <FormControl disabled placeholder="Auto" name="no_transaksi" onChange={props.handleChange} />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label className="font-medium">Tanggal Kontrak</label>
                    <Form.Control type="date" placeholder="Auto" name="tgl_transaksi" onChange={props.handleChange} />
                  </div>

                  <div className="mb-2">
                    <label className="font-medium">Syarat Pembayaran</label>
                    <Select
                      options={syarat_pembayaran}
                      defaultValue={{ value: props.values.syarat_pembayaran_utama, label: props.values.syarat_pembayaran_utama }}
                      name="syarat_pembayaran_utama"
                    />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label className="font-medium">Tanggal Habis Kontrak</label>
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
                    <label className="font-medium">NPWP</label>
                    <Form.Control disabled placeholder="Auto" type="text" value={props.values.nomor_npwp} />
                  </div>
                </Col>
              </Row>
            </div>

            <div class="flex flex-row-reverse mt-8">
              <FormControlLabel
                label={props.values.tipe_perushaan == false ? "Negara" : "Swasta"}
                labelPlacement="end"
                control={
                  <Switch
                    color="primary"
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        props.setFieldValue((props.values.tipe_perushaan = true));
                      } else {
                        props.setFieldValue((props.values.tipe_perushaan = false));
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
                              minWidth: 200,
                              width: 200,
                            }}
                          >
                            <Select
                              options={produk}
                              name={`produks.${index}.produk_id`}
                              onChange={(e) => {
                                props.setFieldValue(`produks.${index}.produk_id`, e.value);
                                props.setFieldValue(`produks.${index}.produk_deskripsi`, e.deskripsi);
                                props.setFieldValue(`produks.${index}.produk_harga`, e.harga);
                                props.setFieldValue((props.values.produks[index].produk_harga = e.harga));

                                const subtotal = props.values.produks.reduce((a, b) => (a = a + b.produk_harga), 0);
                                props.setFieldValue((props.values.subtotal = subtotal));
                                props.setFieldValue(`subtotal`, subtotal);

                                const hasil_pajak = (props.values.pajak_persen / 100) * subtotal;
                                props.setFieldValue((props.values.pajak_hasil = hasil_pajak));
                                props.setFieldValue(`pajak_hasil`, hasil_pajak);

                                const total = subtotal - hasil_pajak;
                                props.setFieldValue(`total`, total);
                                props.setFieldValue((props.values.total = total));
                              }}
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 300,
                              width: 300,
                            }}
                          >
                            <Form.Control
                              disabled
                              type="text"
                              name={`produks.${index}.produk_deskripsi`}
                              value={props.values.produks[index].produk_deskripsi}
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
                              type="number"
                              name={`produks.${index}.produk_harga`}
                              value={props.values.produks[index].produk_harga}
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
                          produk_name: "",
                          deskripsi: "",
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

            <Row className="mb-4 mt-4">
              <Col sm="4">
                <div className="mb-2">
                  <label className="font-medium">Pesan</label>
                  <FormControl
                    style={{ width: 400, resize: "none" }}
                    placeholder="-"
                    as="textarea"
                    rows="3"
                    name="memo"
                    class="px-2 py-2 border border-gray-800"
                    onChange={props.handleChange}
                  />
                </div>

                <div>
                  <label className="font-medium">File Attachment</label>
                  <div
                    style={{ width: 400 }}
                    class="mt-1 flex justify-center px-6 pt-4 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                  >
                    <div class="space-y-1 text-center">
                      <svg
                        class="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>

                      <div class="flex text-sm text-gray-600">
                        <label
                          for="file-upload"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <Form.File
                            type="file"
                            name="fileattachment"
                            onChange={(e) => props.setFieldValue("fileattachment", e.target.files)}
                          />
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
                  <Col sm="6">
                    <label className="font-medium">Pajak</label>
                  </Col>
                  <Col sm="6">
                    <Select
                      options={pajak}
                      name="pajak_id"
                      onChange={(e) => {
                        props.setFieldValue(`pajak_id`, e.value);
                        props.setFieldValue(`pajak_id`, e.label2);
                        props.setFieldValue(`pajak_persen`, e.persen);

                        const hasil_pajak = (e.persen / 100) * props.values.subtotal;
                        props.setFieldValue(`pajak_hasil`, hasil_pajak);
                        props.setFieldValue((props.values.pajak_hasil = hasil_pajak));

                        const total = props.values.subtotal - hasil_pajak;
                        props.setFieldValue(`total`, total);
                        props.setFieldValue((props.values.total = total));
                      }}
                    />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="6">
                    <label className="font-medium">Hasil Pajak</label>
                  </Col>
                  <Col sm="6">
                    <label>
                      {props.values.pajak_hasil == 0
                        ? "Rp. 0, 00"
                        : "Rp. " + props.values.pajak_hasil.toLocaleString({ minimumFractionDigits: 0 })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="6">
                    <label className="font-medium">Total</label>
                  </Col>
                  <Col sm="6">
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

                <div className="border-t border-gray-200">
                  <Row className="mt-2">
                    <Col sm="6">
                      <h5>Sisa Tagihan</h5>
                    </Col>
                    <Col sm="6">
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

export async function getServerSideProps() {
  const get_kontaks = await prisma.kontak.findMany({
    include: {
      KontakDetail: {
        where: { kontak_type_id: 1 },
      },
    },
  });

  let kontaks = [];
  get_kontaks.map((i) => {
    kontaks.push({
      value: i.id,
      label: i.nama_perusahaan,
      email: i.email,
      alamat_perusahaan: i.alamat_perusahaan,
      syarat_pembayaran: i.syarat_pembayaran,
      nomor_npwp: i.nomor_npwp,
    });
  });

  const get_produks = await prisma.produk.findMany({});

  let produks = [];
  get_produks.map((i) => {
    produks.push({
      value: i.id,
      label: i.nama,
      deskripsi: i.deskripsi,
      harga: i.harga,
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
      label: i.nama + " - " + i.presentasaAktif + "%",
      label2: i.nama,
      persen: i.presentase_aktif,
      akun_jual: i.akun_jual,
      akun_beli: i.akun_beli,
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
      label: i.nama,
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
    },
  };
}
