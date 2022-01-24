import { React, useState } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { Snackbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Switch from "@material-ui/core/Switch";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import BackspaceIcon from "@material-ui/icons/Backspace";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

import { Formik, Form as Forms, FieldArray } from "formik";
import { Form, Row, Col, Table, InputGroup, FormControl } from "react-bootstrap";

import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function penagihanpembelian({ kontak, pajak, akun_pembelian, akundiskon_pembelian, syarat_pembayaran }) {
  const url = "http://localhost:3000/api/beli/createpembelian";
  const router = useRouter();

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

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
      <Formik
        initialValues={{
          kontak_id: 0,
          nama_supplier: "",
          akun_hutang_supp: "",
          email: "",
          alamat_perusahaan: "",
          tgl_transaksi: current,
          tgl_jatuh_tempo: "",
          syarat_pembayaran_id: 0,
          syarat_pembayaran_nama: "",
          no_ref_penagihan: "-",
          no_transaksi: 0,

          akun_beli: [
            {
              akun_pembelian_id: "",
              nama_akun_pembelian: "",
              deskripsi: "",
              kuantitas: "",

              harga_satuan: 0,
              diskon: 0,

              total: 0,
              jumlah: "",
            },
          ],
          memo: "-",
          fileattachment: [],
          akun_diskon_pembelian_id: "",
          akun_diskon_pembelian_nama: "",
          subtotal: 0,
          pajak_id: "",
          pajak_nama: "",
          pajak_persen: 0,
          total_diskon: 0,
          total_pajak: 0,

          sisa_tagihan: 0,
        }}
        // validationSchema={}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            if (key == "akun_beli") {
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
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              autoHideDuration={6000}
              open={open}
              onClose={handleClose}
              message={toast_message}
              key={vertical + horizontal}
            />
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="../beli/pembelian">
                Transaksi
              </Link>
              <Typography color="textPrimary">Penagihan Pembelian</Typography>
            </Breadcrumbs>

            <h2>Buat Penagihan Pembelian</h2>
            <div className="border-t border-gray-200">
              <Form>
                <Row className="mt-2">
                  <Col sm="3">
                    <label>Supplier</label>
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
                      onChange={(e) => {
                        props.setFieldValue(`kontak_id`, e.value);
                        props.setFieldValue(`nama_supplier`, e.label);
                        props.setFieldValue(`email`, e.email);
                        props.setFieldValue(`alamat_perusahaan`, e.alamat_perusahaan);
                        props.setFieldValue(`akun_hutang_supp`, e.akun_hutang);
                        props.setFieldValue(`syarat_pembayaran_id`, e.syarat_pembayaran_id);
                        props.setFieldValue(`syarat_pembayaran_nama`, e.syarat_pembayaran_nama);
                      }}
                    />
                  </Col>
                  <Col sm="3">
                    <Form.Control
                      disabled
                      type="text"
                      placeholder=""
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
                <Col sm="4">
                  <label for="message">Alamat Supplier</label> <br />
                  <textarea
                    disabled
                    rows="4"
                    id="message"
                    class="px-10 py-2 border border-gray-800  "
                    name="alamat_perusahaan"
                    value={props.values.alamat_perusahaan}
                    onChange={(e) => {
                      props.setFieldValue("alamat_perusahaan", e.target.value);
                    }}
                  ></textarea>
                </Col>

                <Col sm="4">
                  <div className="mb-2">
                    <label>Nomor Transaksi</label>
                    <Form.Control disabled type="text" placeholder="Auto" name="no_transaksi" onChange={props.handleChange} />
                  </div>
                  <div className="mb-2">
                    <label>No. Referensi</label>
                    <Form.Control type="text" placeholder="-" name="no_ref_penagihan" onChange={props.handleChange} />
                  </div>
                  <div className="mb-2">
                    <label>Syarat Pembayaran</label>
                    <Select
                      // defaultValue={{
                      //   value: props.values.syarat_pembayaran_id,
                      //   label: props.values.syarat_pembayaran_nama,
                      // }}
                      placeholder={props.values.syarat_pembayaran_nama}
                      options={syarat_pembayaran}
                      name="syarat_pembayaran"
                      onChange={(e) => {
                        props.setFieldValue(`syarat_pembayaran_id`, e.value);
                        props.setFieldValue(`syarat_pembayaran_nama`, e.label);
                      }}
                    />
                  </div>
                </Col>

                <Col sm="4">
                  <div className="mb-2">
                    <label className="font-medium">
                      Tanggal Transaksi
                      {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? (
                        <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.tgl_transaksi}</span>
                      ) : null}
                    </label>
                    <Form.Control
                      type="date"
                      placeholder="Auto"
                      defaultValue={props.values.tgl_transaksi}
                      name="tgl_transaksi"
                      onChange={props.handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Tanggal Jatuh Tempo</label>
                    <Form.Control type="date" name="tgl_jatuh_tempo" onChange={props.handleChange} value={props.values.tgl_jatuh_tempo} />
                  </div>
                </Col>
              </Row>
            </div>

            <Table responsive>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Akun Pembelian</th>
                  <th>Deskripsi</th>
                  <th>Kuantitas</th>
                  <th>Harga Satuan</th>
                  <th>Diskon</th>
                  <th>Jumlah</th>
                  <th />
                </tr>
              </thead>

              <FieldArray name="akun_beli">
                {({ insert, remove, push }) => (
                  <tbody style={{ height: "10rem" }}>
                    {props.values.akun_beli.length > 0 &&
                      props.values.akun_beli.map((i, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              minWidth: 200,
                              width: 200,
                            }}
                          >
                            <Select
                              options={akun_pembelian}
                              name={`akun_beli.${index}.akun_pembelian_id`}
                              onChange={(e) => {
                                props.setFieldValue(`akun_beli.${index}.akun_pembelian_id`, e.value);
                                props.setFieldValue(`akun_beli.${index}.nama_akun_pembelian`, e.label);
                              }}
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 300,
                              width: 300,
                            }}
                          >
                            <Form.Control type="text" name={`akun_beli.${index}.deskripsi`} onChange={props.handleChange} />
                          </td>

                          <td
                            style={{
                              minWidth: 200,
                              width: 200,
                            }}
                          >
                            <Form.Control
                              type="number"
                              name={`akun_beli.${index}.kuantitas`}
                              onChange={(e) => {
                                props.setFieldValue(`akun_beli.${index}.kuantitas`, parseInt(e.target.value));
                                props.setFieldValue((props.values.akun_beli[index].kuantitas = parseInt(e.target.value)));

                                //jumlah
                                let jumlah = parseInt(e.target.value) * props.values.akun_beli[index].harga_satuan;
                                props.setFieldValue(`akun_beli.${index}.jumlah`, jumlah);
                                props.setFieldValue((props.values.akun_beli[index].jumlah = jumlah));

                                //diskon
                                let diskon = props.values.akun_beli[index].diskon;
                                props.setFieldValue(`akun_beli.${index}.diskon`, diskon);
                                props.setFieldValue((props.values.akun_beli[index].diskon = diskon));
                                const total_diskon = props.values.akun_beli.reduce((a, b) => (a = a + b.diskon), 0);
                                props.setFieldValue(`total_diskon`, total_diskon);
                                props.setFieldValue((props.values.total_diskon = total_diskon));

                                //subtotal
                                const subtotal = props.values.akun_beli.reduce((a, b) => (a = a + b.jumlah), 0);
                                props.setFieldValue(`subtotal`, subtotal);
                                props.setFieldValue((props.values.subtotal = subtotal));

                                //pajak
                                let total_pajak = subtotal * (props.values.pajak_persen / 100);
                                props.setFieldValue(`total_pajak`, total_pajak);
                                props.setFieldValue((props.values.total_pajak = total_pajak));

                                //sisa tagihan
                                let sisa_tagihan = subtotal - total_diskon + total_pajak;
                                props.setFieldValue(`sisa_tagihan`, sisa_tagihan);
                                props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
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
                              type="number"
                              name={`akun_beli.${index}.harga_satuan`}
                              onChange={(e) => {
                                props.setFieldValue(`akun_beli.${index}.harga_satuan`, parseInt(e.target.value));
                                props.setFieldValue((props.values.akun_beli[index].harga_satuan = parseInt(e.target.value)));

                                //jumlah
                                let jumlah = parseInt(e.target.value) * props.values.akun_beli[index].kuantitas;
                                props.setFieldValue(`akun_beli.${index}.jumlah`, jumlah);
                                props.setFieldValue((props.values.akun_beli[index].jumlah = jumlah));

                                //diskon
                                let diskon = props.values.akun_beli[index].diskon;
                                props.setFieldValue(`akun_beli.${index}.diskon`, diskon);
                                props.setFieldValue((props.values.akun_beli[index].diskon = diskon));
                                const total_diskon = props.values.akun_beli.reduce((a, b) => (a = a + b.diskon), 0);
                                props.setFieldValue(`total_diskon`, total_diskon);
                                props.setFieldValue(props.values.total_diskon, total_diskon);

                                //subtotal
                                const subtotal = props.values.akun_beli.reduce((a, b) => (a = a + b.jumlah), 0);
                                props.setFieldValue(`subtotal`, subtotal);
                                props.setFieldValue((props.values.subtotal = subtotal));

                                //pajak
                                let total_pajak = subtotal * (props.values.pajak_persen / 100);
                                props.setFieldValue(`total_pajak`, total_pajak);
                                props.setFieldValue((props.values.total_pajak = total_pajak));

                                //sisa tagihan
                                let sisa_tagihan = subtotal - total_diskon + total_pajak;
                                props.setFieldValue(`sisa_tagihan`, sisa_tagihan);
                                props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
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
                              type="number"
                              name={`akun_beli.${index}.diskon`}
                              onChange={(e) => {
                                //jumlah
                                let jumlah = props.values.akun_beli[index].kuantitas * props.values.akun_beli[index].harga_satuan;
                                props.setFieldValue(`akun_beli.${index}.jumlah`, jumlah);
                                props.setFieldValue((props.values.akun_beli[index].jumlah = jumlah));

                                //diskon
                                let diskon = parseInt(e.target.value);
                                props.setFieldValue(`akun_beli.${index}.diskon`, diskon);
                                props.setFieldValue((props.values.akun_beli[index].diskon = diskon));
                                const total_diskon = props.values.akun_beli.reduce((a, b) => (a = a + b.diskon), 0);
                                props.setFieldValue(`total_diskon`, total_diskon);
                                props.setFieldValue(props.values.total_diskon, total_diskon);

                                //subtotal
                                const subtotal = props.values.akun_beli.reduce((a, b) => (a = a + b.jumlah), 0);
                                props.setFieldValue(`subtotal`, subtotal);
                                props.setFieldValue((props.values.subtotal = subtotal));

                                //pajak
                                let total_pajak = subtotal * (props.values.pajak_persen / 100);
                                props.setFieldValue(`total_pajak`, total_pajak);
                                props.setFieldValue((props.values.total_pajak = total_pajak));

                                //sisa tagihan
                                let sisa_tagihan = subtotal - total_diskon + total_pajak;
                                props.setFieldValue(`sisa_tagihan`, sisa_tagihan);
                                props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                              }}
                            />
                          </td>
                          <td
                            style={{
                              minWidth: 200,
                              width: 200,
                            }}
                          >
                            <Form.Control type="number" name={`akun_beli.${index}.jumlah`} disabled value={props.values.akun_beli[index].jumlah} />
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

                    <button
                      type="button"
                      class="mt-4 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                      onClick={() =>
                        push({
                          akun_pembelian_id: "",
                          nama_akun_pembelian: "",
                          deskripsi: "",
                          kuantitas: "",

                          harga_satuan: 0,
                          diskon: 0,

                          total: 0,
                          jumlah: "",
                        })
                      }
                    >
                      <AddIcon fontSize="small" /> Tambah data
                    </button>
                  </tbody>
                )}
              </FieldArray>
            </Table>

            <Form className="py-2">
              <Form.Group as={Row} controlId="formPlaintext">
                <Col sm="4">
                  <label for="memo">Memo</label>
                  <br />
                  <textarea rows="3" name="memo" class="px-16 py-2 border border-gray-800  " onChange={props.handleChange}></textarea> <br />
                  File Attachment <br />
                  <Form.File type="file" name="fileattachment" onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
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
                    <Col sm="4">
                      <Select
                        options={akundiskon_pembelian}
                        name="akun_diskon"
                        onChange={(e) => {
                          props.setFieldValue(`akun_diskon_pembelian_id`, e.value);
                          props.setFieldValue(`akun_diskon_pembelian_nama`, e.label);
                        }}
                      />
                    </Col>
                    <Col sm="4">Diskon Per Baris</Col>
                    <Form.Label column sm="4" name="total_diskon_per_baris">
                      Rp.
                      {props.values.total_diskon.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="4">
                      <Select
                        options={pajak}
                        name="pajak"
                        onChange={(e) => {
                          props.setFieldValue(`pajak_id`, e.value);
                          props.setFieldValue(`pajak_nama`, e.label);
                          props.setFieldValue(`pajak_persen`, parseInt(e.persen));

                          //diskon
                          const total_diskon = props.values.akun_beli.reduce((a, b) => (a = a + b.diskon), 0);
                          props.setFieldValue(`total_diskon`, total_diskon);
                          props.setFieldValue((props.values.total_diskon = total_diskon));

                          //subtotal
                          const subtotal = props.values.akun_beli.reduce((a, b) => (a = a + b.jumlah), 0);
                          props.setFieldValue(`subtotal`, subtotal);
                          props.setFieldValue((props.values.subtotal = subtotal));

                          //pajak
                          let total_pajak = subtotal * (parseInt(e.persen) / 100);
                          props.setFieldValue(`total_pajak`, total_pajak);
                          props.setFieldValue((props.values.total_pajak = total_pajak));

                          //sisa tagihan
                          let sisa_tagihan = subtotal - total_diskon + total_pajak;
                          props.setFieldValue(`sisa_tagihan`, sisa_tagihan);
                          props.setFieldValue((props.values.sisa_tagihan = sisa_tagihan));
                        }}
                      />
                    </Col>

                    <Col sm="4">Pajak</Col>
                    <Form.Label column sm="4" name="total_pajak_per_baris">
                      Rp.
                      {props.values.total_pajak.toLocaleString({
                        minimumFractionDigits: 0,
                      })}
                    </Form.Label>
                  </Form.Group>

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
              <Link href="/beli/pembelian">
                <button onclick="openModal(false)" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">
                  Batal
                </button>
              </Link>

              <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none" onClick={props.handleSubmit}>
                Buat Pembelian
              </button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get kontak,produk,pajak from API
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
      syarat_pembayaran_nama: i.syarat_pembayaran.nama,
      nomor_npwp: i.nomor_npwp,
      akun_hutang: i.akun_hutang_id,
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

  const produks = await prisma.produk.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const get_akun_pembelian = await prisma.akun.findMany({
    where: {
      kategoriId: 5,
    },
  });

  let akun_pembelian = [];
  get_akun_pembelian.map((i) => {
    akun_pembelian.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const get_akundiskon_pembelian = await prisma.akun.findMany({
    where: {
      kategoriId: 15,
    },
  });

  let akundiskon_pembelians = [];
  get_akundiskon_pembelian.map((i) => {
    akundiskon_pembelians.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const akunPendapatan = await prisma.akun.findMany({
    where: {
      kategoriId: 13,
    },
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

  const get_syarat_pembayaran = await prisma.syaratPembayaran.findMany({
    orderBy: {
      id: "asc",
    },
  });

  let syarat_pembayarans = [];
  get_syarat_pembayaran.map((i) => {
    syarat_pembayarans.push({
      value: i.id,
      label: i.nama,
    });
  });

  return {
    props: {
      kontak: kontaks,
      pajak: pajaks,
      akun_pembelian: akun_pembelian,
      akundiskon_pembelian: akundiskon_pembelians,
      data4: akunPendapatan,
      data5: akun_kas_bank,
      syarat_pembayaran: syarat_pembayarans,
    },
  };
}
