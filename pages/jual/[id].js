import { React, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import { Breadcrumbs, Table as Tables, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Snackbar } from "@material-ui/core/";
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

export default function penagihanpenjualan({ kontak, produk, pajak, syarat_pembayaran, header_penjualan, detail_penjualan }) {
  const url = "http://localhost:3000/api/jual/updatepenjualan";
  const router = useRouter();

  const ValidationSchema = Yup.object().shape({
    nomor_kontrak: Yup.string().required("*required"),
    tgl_kontrak_mulai: Yup.string().required("*required"),
    tgl_kontrak_expired: Yup.string().required("*required"),
    syarat_pembayaran_id: Yup.string().required("*required"),
    pajak_id: Yup.string().required("*required"),
    // produks: Yup.array(
    //   Yup.object({
    //     produk_id: Yup.string().required("*required"),
    //   })
    // )
    //   .min(1)
    //   .max(3),
  });
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

  return (
    <Layout>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Head>
        <title>Update Penagihan Penjualan</title>
      </Head>

      <Formik
        initialValues={{
          id: header_penjualan.id,
          kontak_id: header_penjualan.kontak_id,
          nama_perusahaan: header_penjualan.nama_perusahaan,
          email: header_penjualan.email,
          alamat_penagihan: header_penjualan.alamat_penagihan,
          syarat_pembayaran_id: header_penjualan.syarat_pembayaran_id,
          syarat_pembayaran_nama: header_penjualan.syarat_pembayaran.nama,
          nomor_npwp: header_penjualan.nomor_npwp,
          nomor_kontrak: header_penjualan.nomor_kontrak,
          tgl_kontrak_mulai: header_penjualan.tgl_kontrak_mulai,
          hari: header_penjualan.hari,
          bulan: header_penjualan.bulan,
          tahun: header_penjualan.tahun,
          tgl_kontrak_expired: header_penjualan.tgl_kontrak_expired,
          custom_invoice: header_penjualan.custom_invoice,
          tipe_perusahaan: header_penjualan.tipe_perusahaan == "false" ? false : true,
          pesan: header_penjualan.pesan,
          file_attachment: header_penjualan.file_attachment,
          subtotal: header_penjualan.subtotal,
          pajak_id: header_penjualan.pajak_id,
          pajak_nama: header_penjualan.pajak_nama,
          pajak_persen: header_penjualan.pajak_persen,
          pajak_hasil: header_penjualan.pajak_hasil,
          total: header_penjualan.total,
          sisa_tagihan: header_penjualan.sisa_tagihan,
          produks: detail_penjualan,
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
                router.push(`view/${response.data.id}`);
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
              <Typography color="textPrimary">Transaksi</Typography>
            </Breadcrumbs>

            <h2 className="text-blue-600">Update Penagihan Penjualan</h2>
            <div className="border-t border-gray-200">
              <Form>
                <Row className="mt-2 mb-2">
                  <Col sm="3">
                    <label className="font-medium">Pelanggan</label>
                    <Select
                      options={kontak}
                      name="kontak_id"
                      defaultValue={{
                        value: props.values.kontak_id,
                        label: props.values.nama_perusahaan,
                      }}
                      isDisabled
                    />
                  </Col>
                  <Col sm="3">
                    <label className="font-medium">Email</label>
                    <Form.Control disabled type="text" placeholder={props.values.email} name="email" />
                  </Col>

                  <Col sm="3" />
                  <Col sm="3">
                    <div className="mt-4">
                      <h3>
                        Rp.{" "}
                        {props.values.sisa_tagihan.toLocaleString({
                          minimumFractionDigits: 0,
                        })}
                      </h3>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="border-t border-gray-200">
              <Row className="mt-2">
                <Col sm="3">
                  <div className="mb-2">
                    <label className="font-medium">Alamat Penagihan</label>
                    <FormControl style={{ height: 115, resize: "none" }} disabled placeholder={props.values.alamat_penagihan} as="textarea" className="italic" name="alamat_penagihan" />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label className="font-medium">
                      Nomor Kontrak
                      {props.errors.nomor_kontrak && props.touched.nomor_kontrak ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.nomor_kontrak}</span> : null}
                    </label>
                    <Form.Control type="text" placeholder="-" name="nomor_kontrak" value={props.values.nomor_kontrak} onChange={props.handleChange} />
                  </div>

                  <div className="mb-2">
                    <label className="font-medium">No. Transaksi</label>
                    <FormControl disabled placeholder={"Sales Invoice #" + header_penjualan.id} />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label className="font-medium">Tanggal Kontrak</label>
                    <Form.Control
                      type="date"
                      name="tgl_kontrak_mulai"
                      value={props.values.tgl_kontrak_mulai}
                      onChange={(e) => {
                        props.setFieldValue(`tgl_kontrak_mulai`, e.target.value);

                        const split_date = e.target.value;
                        const day = split_date.split("-")[2];
                        props.setFieldValue(`hari`, day);

                        const month = split_date.split("-")[1];
                        props.setFieldValue(`bulan`, month);

                        const year = split_date.split("-")[0];
                        props.setFieldValue(`tahun`, year);
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="font-medium">Syarat Pembayaran</label>
                    <Select
                      options={syarat_pembayaran}
                      defaultValue={{ value: props.values.syarat_pembayaran_id, label: props.values.syarat_pembayaran_nama }}
                      name="syarat_pembayaran_id"
                      onChange={(e) => {
                        props.setFieldValue(`syarat_pembayaran_id`, e.value);
                      }}
                    />
                  </div>
                </Col>

                <Col sm="3">
                  <div className="mb-2">
                    <label className="font-medium">
                      Tanggal Habis Kontrak
                      {props.errors.tgl_kontrak_expired && props.touched.tgl_kontrak_expired ? (
                        <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.tgl_kontrak_expired}</span>
                      ) : null}
                    </label>
                    <Form.Control type="date" name="tgl_kontrak_expired" value={props.values.tgl_kontrak_expired} onChange={props.handleChange} />
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
                label={props.values.tipe_perusahaan == false ? "Negara" : "Swasta"}
                labelPlacement="end"
                checked={props.values.tipe_perusahaan}
                control={
                  <Switch
                    color="primary"
                    onChange={(e) => {
                      if (e.target.checked === false) {
                        props.setFieldValue((props.values.tipe_perusahaan = false));

                        const subtotal = props.values.produks.reduce((a, b) => (a = a + b.produk_harga), 0);
                        props.setFieldValue((props.values.subtotal = subtotal));
                        props.setFieldValue(`subtotal`, subtotal);

                        const hasil_pajak = (props.values.pajak_persen / 100) * subtotal;
                        props.setFieldValue((props.values.pajak_hasil = hasil_pajak));
                        props.setFieldValue(`pajak_hasil`, hasil_pajak);

                        const total = subtotal;
                        props.setFieldValue(`total`, total);
                        props.setFieldValue((props.values.total = total));

                        props.setFieldValue(`sisa_tagihan`, total);
                        props.setFieldValue((props.values.sisa_tagihan = total));
                      } else {
                        props.setFieldValue((props.values.tipe_perusahaan = true));

                        const subtotal = props.values.produks.reduce((a, b) => (a = a + b.produk_harga), 0);
                        props.setFieldValue((props.values.subtotal = subtotal));
                        props.setFieldValue(`subtotal`, subtotal);

                        const hasil_pajak = (props.values.pajak_persen / 100) * subtotal;
                        props.setFieldValue((props.values.pajak_hasil = hasil_pajak));
                        props.setFieldValue(`pajak_hasil`, hasil_pajak);

                        const total = subtotal + hasil_pajak;
                        props.setFieldValue(`total`, total);
                        props.setFieldValue((props.values.total = total));

                        props.setFieldValue(`sisa_tagihan`, total);
                        props.setFieldValue((props.values.sisa_tagihan = total));
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
                              defaultValue={{
                                value: props.values.produks[index].produk_id,
                                label: props.values.produks[index].produk_name,
                              }}
                              options={produk}
                              name={`produks.${index}.produk_id`}
                              onChange={(e) => {
                                if (props.values.tipe_perusahaan == false) {
                                  props.setFieldValue(`produks.${index}.produk_id`, e.value);
                                  props.setFieldValue(`produks.${index}.produk_name`, e.label);
                                  props.setFieldValue(`produks.${index}.produk_deskripsi`, e.deskripsi);
                                  props.setFieldValue(`produks.${index}.produk_harga`, e.harga);
                                  props.setFieldValue((props.values.produks[index].produk_harga = e.harga));

                                  const subtotal = props.values.produks.reduce((a, b) => (a = a + b.produk_harga), 0);
                                  props.setFieldValue((props.values.subtotal = subtotal));
                                  props.setFieldValue(`subtotal`, subtotal);

                                  const hasil_pajak = (props.values.pajak_persen / 100) * subtotal;
                                  props.setFieldValue((props.values.pajak_hasil = hasil_pajak));
                                  props.setFieldValue(`pajak_hasil`, hasil_pajak);

                                  const total = subtotal;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));

                                  props.setFieldValue(`sisa_tagihan`, total);
                                  props.setFieldValue((props.values.sisa_tagihan = total));
                                } else {
                                  props.setFieldValue(`produks.${index}.produk_id`, e.value);
                                  props.setFieldValue(`produks.${index}.produk_name`, e.label);
                                  props.setFieldValue(`produks.${index}.produk_deskripsi`, e.deskripsi);
                                  props.setFieldValue(`produks.${index}.produk_harga`, e.harga);
                                  props.setFieldValue((props.values.produks[index].produk_harga = e.harga));

                                  const subtotal = props.values.produks.reduce((a, b) => (a = a + b.produk_harga), 0);
                                  props.setFieldValue((props.values.subtotal = subtotal));
                                  props.setFieldValue(`subtotal`, subtotal);

                                  const hasil_pajak = (props.values.pajak_persen / 100) * subtotal;
                                  props.setFieldValue((props.values.pajak_hasil = hasil_pajak));
                                  props.setFieldValue(`pajak_hasil`, hasil_pajak);

                                  const total = subtotal + hasil_pajak;
                                  props.setFieldValue(`total`, total);
                                  props.setFieldValue((props.values.total = total));

                                  props.setFieldValue(`sisa_tagihan`, total);
                                  props.setFieldValue((props.values.sisa_tagihan = total));
                                }
                              }}
                            />
                            {/* {props.errors.produks.index.produk_id && props.touched.produks.index.produk_id ? (
                              <span class="ml-1 text-xs font-medium text-red-500 required-dot">
                                {props.errors.produks.index.produk_id}
                              </span>
                            ) : null} */}
                          </td>
                          <td
                            style={{
                              minWidth: 300,
                              width: 300,
                            }}
                          >
                            <Form.Control disabled type="text" name={`produks.${index}.produk_deskripsi`} value={props.values.produks[index].produk_deskripsi} />
                          </td>

                          <td
                            style={{
                              minWidth: 200,
                              width: 200,
                            }}
                          >
                            <Form.Control disabled type="number" name={`produks.${index}.produk_harga`} value={props.values.produks[index].produk_harga} />
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
                    name="pesan"
                    class="px-2 py-2 border border-gray-800"
                    value={props.values.pesan}
                    onChange={props.handleChange}
                  />
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
                    <label name="subtotal">
                      Rp.{" "}
                      {props.values.subtotal.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="6">
                    <label className="font-medium">
                      Pajak Keluaran
                      {props.errors.pajak_id && props.touched.pajak_id ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.pajak_id}</span> : null}
                    </label>
                  </Col>
                  <Col sm="6"></Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="6">
                    <Select
                      options={pajak}
                      defaultValue={{
                        value: parseInt(props.values.pajak_id),
                        label: props.values.pajak_nama + " - " + props.values.pajak_persen + "%",
                      }}
                      name="pajak_id"
                      onChange={(e) => {
                        if (props.values.tipe_perusahaan == false) {
                          props.setFieldValue(`pajak_id`, e.value);
                          props.setFieldValue(`pajak_nama`, e.label2);
                          props.setFieldValue(`pajak_persen`, e.persen);

                          const hasil_pajak = (e.persen / 100) * props.values.subtotal;
                          props.setFieldValue(`pajak_hasil`, hasil_pajak);
                          props.setFieldValue((props.values.pajak_hasil = hasil_pajak));

                          const total = props.values.subtotal;
                          props.setFieldValue(`total`, total);
                          props.setFieldValue((props.values.total = total));

                          props.setFieldValue(`sisa_tagihan`, total);
                          props.setFieldValue((props.values.sisa_tagihan = total));
                        } else {
                          props.setFieldValue(`pajak_id`, e.value);
                          props.setFieldValue(`pajak_nama`, e.label2);
                          props.setFieldValue(`pajak_persen`, e.persen);

                          const hasil_pajak = (e.persen / 100) * props.values.subtotal;
                          props.setFieldValue(`pajak_hasil`, hasil_pajak);
                          props.setFieldValue((props.values.pajak_hasil = hasil_pajak));

                          const total = props.values.subtotal + hasil_pajak;
                          props.setFieldValue(`total`, total);
                          props.setFieldValue((props.values.total = total));

                          props.setFieldValue(`sisa_tagihan`, total);
                          props.setFieldValue((props.values.sisa_tagihan = total));
                        }
                      }}
                    />
                  </Col>
                  <Col sm="6">
                    <label>Rp. {props.values.pajak_hasil.toLocaleString({ minimumFractionDigits: 0 })}</label>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col sm="6">
                    <label className="font-medium">Total</label>
                  </Col>
                  <Col sm="6">
                    <label name="total">
                      Rp.{" "}
                      {props.values.total.toLocaleString({
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
                        Rp.{" "}
                        {props.values.sisa_tagihan.toLocaleString({
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
                    Update Penjualan
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
        where: { kontak_type_id: 1 },
      },
      syarat_pembayaran: true,
    },
  });

  let kontaks = [];
  get_kontaks.map((i) => {
    kontaks.push({
      value: i.id,
      label: i.nama_perusahaan,
      email: i.email,
      alamat_perusahaan: i.alamat_perusahaan,
      syarat_pembayaran_id: i.syarat_pembayaran_id,
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
      label: i.nama + " - " + i.presentase_aktif + "%",
      label2: i.nama,
      persen: i.presentase_aktif,
      akun_jual: i.akun_jual,
      akun_beli: i.akun_beli,
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

  const get_header_penjualan = await prisma.headerPenjualan.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      syarat_pembayaran: true,
      DetailPenjualan: true,
    },
  });

  let detail_penjualan = [];
  get_header_penjualan.DetailPenjualan.map((i) => {
    detail_penjualan.push({
      produk_id: i.produk_id,
      produk_name: i.produk_name,
      produk_deskripsi: i.produk_deskripsi,
      produk_harga: i.produk_harga,
    });
  });

  return {
    props: {
      kontak: kontaks,
      produk: produks,
      pajak: pajaks,
      syarat_pembayaran: syarat_pembayarans,
      header_penjualan: get_header_penjualan,
      detail_penjualan: detail_penjualan,
    },
  };
}
