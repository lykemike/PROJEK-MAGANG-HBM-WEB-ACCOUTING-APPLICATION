import React, { useState } from "react";
import Layout from "../../components/Layout";
import SidebarSetting from "../../components/SidebarSetting";
import { Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { Snackbar } from "@material-ui/core";
import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { parseISOWithOptions } from "date-fns/fp";
const prisma = new PrismaClient();

export default function addaset({ data, data2, data3, data4 }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/aset/createaset";

  const id = data != undefined ? parseInt(data.id) + 1 : 1;

  const [idInvoice, setIdInvoice] = useState(id);

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
          nama_aset: "",
          nomor_aset: "",
          akun_aset_tetap: "",
          deskripsi: "",
          tgl_akuisisi: "",
          biaya_akuisisi: 0,
          akun_dikreditkan: "",
          tag: "",
          aset_non_depresiasi: false,
          metode: "0",
          masa_manfaat: 0,
          nilai_tahun: 0,
          nama_pic: "",
          tgl_akuisisi: "",
          biaya_akuisisi: "",
          akun_dikreditkan: "",
          akun_penyusutan: "",
          akumulasi_akun_penyusutan: "",
          akumulasi_penyusutan: "",
          tgl_penyusutan: "",
          boolean: false,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.push(`../aset/list-aset`);
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
            <h3>Penyimpanan Aset Baru</h3>
            <Form>
              <Col>
                <h4 class="mt-4 mb-4">Detail Aset</h4>
                <Form.Group as={Row} controlId="formPlaintext">
                  <Col sm="6">
                    <Row className="mb-2">
                      <Col>Nama Aset</Col>
                      <Col>
                        <Form.Control type="text" placeholder="" name="nama_aset" size="sm" onChange={props.handleChange} />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Nomor Aset</Col>
                      <Col>
                        <Form.Control type="text" placeholder="" name="nomor_aset" size="sm" onChange={props.handleChange} />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>PIC</Col>
                      <Col>
                        <Form.Control type="text" placeholder="" name="nama_pic" size="sm" onChange={props.handleChange} />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Akun Aset Tetap</Col>
                      <Col>
                        <Form.Control as="select" placeholder="" size="sm" name="akun_aset_tetap" onChange={props.handleChange}>
                          <option value="0">Pilih</option>
                          {data.map((akunAsetTetap) => (
                            <option key={akunAsetTetap.id} value={akunAsetTetap.id}>
                              {akunAsetTetap.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Deskripsi</Col>
                      <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Control as="textarea" rows={3} name="deskripsi" onChange={props.handleChange} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="6">
                    <Row className="mb-2">
                      <Col>Tanggal Akuisisi</Col>
                      <Col>
                        <Form.Control type="date" placeholder="" size="sm" name="tgl_akuisisi" onChange={props.handleChange} />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Biaya Akuisisi</Col>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Rp. "
                          size="sm"
                          name="biaya_akuisisi"
                          onChange={(e) => {
                            props.setFieldValue((props.values.biaya_akuisisi = parseInt(e.target.value)));
                            if (props.values.metode == "1") {
                              let straight_line = parseInt(e.target.value) / props.values.masa_manfaat;
                              props.setFieldValue((props.values.nilai_tahun = straight_line));
                              props.setFieldValue("nilai_tahun", straight_line);
                            } else {
                              let reducing_balance = (100 / 100 / props.values.masa_manfaat) * 2 * parseInt(e.target.value);
                              props.setFieldValue((props.values.nilai_tahun = reducing_balance));
                              props.setFieldValue("nilai_tahun", reducing_balance);
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Akun Dikreditkan</Col>
                      <Col>
                        <Form.Control as="select" placeholder="" size="sm" name="akun_dikreditkan" onChange={props.handleChange}>
                          <option value="0">Pilih</option>
                          {data2.map((akunKredit) => (
                            <option key={akunKredit.id} value={akunKredit.id}>
                              {akunKredit.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Tags</Col>
                      <Col>
                        <Form.Control type="text" placeholder="" size="sm" name="tag" onChange={props.handleChange} />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
              </Col>

              <Col>
                <h4 class="mt-4 mb-4">Penyusutan</h4>
                <Form.Group as={Row} controlId="formPlaintext">
                  <Col sm="6">
                    <Row className="mb-2">
                      <Col>Aset non Depresiasi</Col>
                      <Col>
                        <input
                          class="form-check-input position-static ml-1"
                          type="checkbox"
                          id="blankCheckbox"
                          aria-label="..."
                          name="aset_non_depresiasi"
                          onChange={(e) => {
                            if (e.target.checked == true) {
                              props.setFieldValue((props.values.aset_non_depresiasi = true));
                              props.setFieldValue((props.values.metode = "Kosong"));
                              props.setFieldValue((props.values.masa_manfaat = 0));
                              props.setFieldValue((props.values.nilai_tahun = 0));
                              props.setFieldValue((props.values.akun_penyusutan = 1));
                              props.setFieldValue((props.values.akumulasi_akun_penyusutan = 1));
                              props.setFieldValue((props.values.akumulasi_penyusutan = 0));
                              props.setFieldValue((props.values.tgl_penyusutan = "Kosong"));
                            } else {
                              props.setFieldValue((props.values.aset_non_depresiasi = false));
                            }
                          }}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Metode</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          disabled={props.values.aset_non_depresiasi}
                          placeholder=""
                          size="sm"
                          name="metode"
                          onChange={(e) => {
                            props.setFieldValue(props.values.metode == e.target.value);
                            if (e.target.value == "1") {
                              let straight_line = props.values.biaya_akuisisi / props.values.masa_manfaat;
                              props.setFieldValue((props.values.nilai_tahun = straight_line));
                              props.setFieldValue("nilai_tahun", straight_line);
                            } else {
                              let reducing_balance = (100 / 100 / props.values.masa_manfaat) * 2 * props.values.biaya_akuisisi;
                              props.setFieldValue((props.values.nilai_tahun = reducing_balance));
                              props.setFieldValue("nilai_tahun", reducing_balance);
                            }
                          }}
                        >
                          <option value="0">Pilih</option>
                          <option value="1">Straight Line</option>
                          <option value="2">Reducing Balance</option>
                        </Form.Control>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="6">Masa Manfaat</Col>
                      <Col>
                        <Row>
                          <Col sm="5">
                            <Form.Control
                              type="text"
                              name="masa_manfaat"
                              disabled={props.values.aset_non_depresiasi}
                              onChange={(e) => {
                                props.setFieldValue((props.values.masa_manfaat = parseInt(e.target.value)));
                                if (props.values.metode == "1") {
                                  let straight_line = props.values.biaya_akuisisi / parseInt(e.target.value);
                                  props.setFieldValue((props.values.nilai_tahun = straight_line));
                                  props.setFieldValue("nilai_tahun", straight_line);
                                } else {
                                  let reducing_balance = (100 / parseInt(e.target.value)) * 2 * props.values.biaya_akuisisi;
                                  props.setFieldValue((props.values.nilai_tahun = reducing_balance));
                                  props.setFieldValue("nilai_tahun", reducing_balance);
                                }
                              }}
                            ></Form.Control>
                          </Col>
                          <h7 class="mt-2">Tahun</h7>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="6">Nilai / Tahun</Col>
                      <Col>
                        <Row>
                          <Col sm="5">
                            <Form.Control type="text" name="nilai_tahun" disabled value={props.values.nilai_tahun} onChange={props.handleChange} />
                          </Col>
                          <h7 class="mt-2">Persen</h7>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  <Col sm="6">
                    <Row className="mb-2">
                      <Col>Akun Penyusutan</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          disabled={props.values.aset_non_depresiasi}
                          placeholder=""
                          name="akun_penyusutan"
                          onChange={props.handleChange}
                          size="sm"
                        >
                          <option value="0">Pilih</option>
                          {data3.map((akunPenyusutan) => (
                            <option key={akunPenyusutan.id} value={akunPenyusutan.id}>
                              {akunPenyusutan.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Akumulasi Akun Penyusutan</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          disabled={props.values.aset_non_depresiasi}
                          placeholder=""
                          name="akumulasi_akun_penyusutan"
                          size="sm"
                          onChange={props.handleChange}
                        >
                          <option value="0">Pilih</option>
                          {data4.map((AkumulasiAkunPenyusutan) => (
                            <option key={AkumulasiAkunPenyusutan.id} value={AkumulasiAkunPenyusutan.id}>
                              {AkumulasiAkunPenyusutan.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Akumulasi Penyusutan</Col>
                      <Col>
                        <Form.Control
                          type="text"
                          disabled={props.values.aset_non_depresiasi}
                          placeholder="Rp. 00,-"
                          size="sm"
                          name="akumulasi_penyusutan"
                          onChange={props.handleChange}
                        />
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col>Pada Tanggal</Col>
                      <Col>
                        <Form.Control
                          type="date"
                          disabled={props.values.aset_non_depresiasi}
                          placeholder=""
                          size="sm"
                          name="tgl_penyusutan"
                          onChange={props.handleChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Form.Group>
              </Col>
            </Form>
            <div class=" mt-10">
              <button onclick="openModal(false)" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">
                Batal
              </button>
              <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none ml-2" onClick={props.handleSubmit}>
                Buat
              </button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get kategori akun penjualan and pembelian from akun model
  const getAktivaTetap = await prisma.akun.findMany({
    where: {
      kategoriId: 5,
    },
  });

  const getAkunKredit = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  const getAkunPenyusutan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [16, 17],
      },
    },
  });

  const getAkumulasiAkunPenyusutan = await prisma.akun.findMany({
    where: {
      kategoriId: 7,
    },
  });

  return {
    props: {
      data: getAktivaTetap,
      data2: getAkunKredit,
      data3: getAkunPenyusutan,
      data4: getAkumulasiAkunPenyusutan,
    },
  };
}
