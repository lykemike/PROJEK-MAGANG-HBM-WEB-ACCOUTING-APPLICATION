import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Button, Table, DropdownButton, Dropdown, Row, Col, Form, Card, InputGroup, FormControl } from "react-bootstrap";
import AttachmentIcon from "@material-ui/icons/Attachment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import EventNoteIcon from "@material-ui/icons/EventNote";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const KirimUangSchema = Yup.object().shape({
//     bank: Yup.string().required('Required'),
//     penerima : Yup.string().required('Required')
//   });

export default function terima_uang({ data, data2, data3, data4, data5 }) {
  const router = useRouter();

  const url = "http://localhost:3000/api/kasbank/createTerimaUang";

  const id = data5 != undefined ? parseInt(data5.id) + 1 : 1;
  // const id = 1;

  const [idInvoice, setIdInvoice] = useState(id);

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_setor_id: "",
          akun_membayar_id: "",
          tgl_transaksi: "",
          no_transaksi: id,
          tag: "",
          memo: "",
          subtotal: 0,
          total: "",
          fileattachment: [],
          hasil_pajak: "",
          boolean: false,
          detail_terima_uang: [
            {
              akun_id: "",
              nama_akun: "",
              deskripsi: "",
              pajak_id: "",
              pajak_nama: "",
              pajak_jual_id: "",
              pajak_persen: "",
              hasil_pajak: 0,
              jumlah: "",
              jumlah2: "",
            },
          ],
        }}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            if (key == "detail_terima_uang") {
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
              router.push(`view-terima/${idInvoice}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div variant='container'>
              <div class='text-md font-medium text-gray-900 mb-2'>Transaksi</div>
              <h4 class='mt-2 mb-5'>Terima Uang</h4>

              <div class='mb-10'>
                <Row>
                  <Col>
                    <Form.Label>Bayar dari</Form.Label>
                    <Form.Control as='select' name='akun_setor_id' onChange={props.handleChange} onBlur={props.handleBlur}>
                      <option value='kosong'>Pilih</option>
                      {data.map((akun, index) => (
                        <option key={akun.id} value={akun.id}>
                          {akun.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                    {props.errors.akun_setor_id && props.touched.akun_setor_id ? <div>{props.errors.akun_setor_id}</div> : null}
                  </Col>
                  <Col></Col>
                  <Col>
                    <h3>Total Amount</h3>
                    <h2 class='text-purple-700 text-opacity-100 '> Rp.{props.values.total}</h2>
                  </Col>
                </Row>
              </div>

              <div class='mb-10'>
                <Row>
                  <Col>
                    <Form.Label>Yang Membayar</Form.Label>
                    <Form.Control as='select' name='akun_membayar_id' onChange={props.handleChange} onBlur={props.handleBlur}>
                      <option value='kosong'>Pilih</option>
                      {data2.map((kontaks, index) => (
                        <option key={index} value={kontaks.kontak.id}>
                          {kontaks.kontak.nama}
                        </option>
                      ))}
                    </Form.Control>
                    {props.errors.akun_membayar_id && props.touched.akun_membayar_id ? <div>{props.errors.akun_membayar_id}</div> : null}
                  </Col>

                  <Col>
                    <Form.Label>Tanggal Transaksi</Form.Label>
                    <InputGroup className='mb-3'>
                      <FormControl placeholder='Pick date' type='date' aria-label='date' name='tgl_transaksi' onChange={props.handleChange} />
                      {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                    </InputGroup>
                  </Col>

                  <Col>
                    <Form.Label>Nomor Transaksi</Form.Label>
                    <Form.Control placeholder={"Auto"} name='no_transaksi' disabled />
                  </Col>

                  <Col>
                    <Form.Label>Tag</Form.Label>
                    <Form.Control placeholder='Tag' name='tag' onChange={props.handleChange} />
                  </Col>

                  <div class='float-right mt-2 mb-8'>
                    <Form.Check
                      label='Harga Termasuk Pajak'
                      type='switch'
                      id='custom-switch'
                      onChange={(e) => {
                        if (e.target.checked === true) {
                          props.setFieldValue((props.values.boolean = true));
                          const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);
                          const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                          let harga_termasuk_pajak = jumlah_total - pajak_total;
                          props.setFieldValue((props.values.subtotal = harga_termasuk_pajak));
                          props.setFieldValue("subtotal", harga_termasuk_pajak);

                          props.setFieldValue((props.values.hasil_pajak = pajak_total));
                          props.setFieldValue("hasil_pajak", pajak_total);

                          let total = jumlah_total;
                          props.setFieldValue((props.values.total = total));
                          props.setFieldValue("total", total);
                        } else {
                          props.setFieldValue((props.values.boolean = false));
                          const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);
                          const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);

                          let harga_tidak_termasuk_pajak = jumlah_total;
                          props.setFieldValue((props.values.subtotal = harga_tidak_termasuk_pajak));
                          props.setFieldValue("subtotal", harga_tidak_termasuk_pajak);

                          props.setFieldValue((props.values.hasil_pajak = pajak_total));
                          props.setFieldValue("hasil_pajak", pajak_total);

                          let total = jumlah_total + pajak_total;
                          props.setFieldValue((props.values.total = total));
                          props.setFieldValue("total", total);
                        }
                      }}
                    />
                  </div>
                </Row>
              </div>

              <div class='mb-12'>
                <Table class='table mt-4'>
                  <thead class='thead-light'>
                    <tr>
                      <td>Pembayaran Untuk Akun</td>
                      <td>Deskripsi</td>
                      <td>Pajak</td>
                      <td>Jumlah</td>
                    </tr>
                  </thead>
                  <FieldArray name='detail_terima_uang'>
                    {({ insert, remove, push }) => (
                      <div>
                        {props.values.detail_terima_uang.length > 0 &&
                          props.values.detail_terima_uang.map((i, index) => (
                            <tbody key={index} name='detail_terima_uang'>
                              <tr>
                                <td>
                                  <Form.Control
                                    as='select'
                                    name={`detail_terima_uang.${index}.akun_id`}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_terima_uang.${index}.akun_id`, e.target.value);
                                      let hasil2 = data3.filter((i) => {
                                        return i.id === parseInt(e.target.value);
                                      });
                                      props.setFieldValue(`detail_terima_uang.${index}.akun_id`, hasil2[0].id);
                                      props.setFieldValue(`detail_terima_uang.${index}.nama_akun`, data3.filter((i) => i.id === parseInt(e.target.value))[0].nama_akun);
                                    }}>
                                    <option value='0'>Pilih</option>
                                    {data3.map((namaAkun, index) => (
                                      <option key={index} value={namaAkun.id}>
                                        {namaAkun.nama_akun}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </td>

                                <td>
                                  <Form.Control
                                    placeholder='Isi Deskripsi'
                                    name={`detail_terima_uang.${index}.deskripsi`}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_terima_uang.${index}.deskripsi`, e.target.value);
                                    }}
                                  />
                                </td>

                                <td>
                                  <Form.Control
                                    as='select'
                                    name={`detail_terima_uang.${index}.pajak_id`}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_terima_uang.${index}.pajak_id`, e.target.value);
                                      let hasil2 = data4.filter((i) => {
                                        return i.id === parseInt(e.target.value);
                                      });

                                      if (props.values.boolean == false) {
                                        props.setFieldValue(`detail_terima_uang.${index}.pajak_persen`, hasil2[0].presentasaAktif);
                                        props.setFieldValue(`detail_terima_uang.${index}.pajak_nama`, hasil2[0].nama);
                                        props.setFieldValue(`detail_terima_uang.${index}.pajak_jual_id`, hasil2[0].kategori1.id);

                                        let jumlah = props.values.detail_terima_uang[index].jumlah;
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                        const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);
                                        props.setFieldValue((props.values.subtotal = jumlah_total));
                                        props.setFieldValue("subtotal", jumlah_total);

                                        let pajak = props.values.detail_terima_uang[index].jumlah * (hasil2[0].presentasaAktif / 100);
                                        props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                        const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                        props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                        props.setFieldValue("hasil_pajak", pajak_total);

                                        let jumlah2 = props.values.detail_terima_uang[index].jumlah - pajak;
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                        let total = jumlah_total + pajak_total;
                                        props.setFieldValue((props.values.total = total));
                                        props.setFieldValue("total", total);
                                      } else {
                                        props.setFieldValue(`detail_terima_uang.${index}.pajak_persen`, hasil2[0].presentasaAktif);
                                        props.setFieldValue(`detail_terima_uang.${index}.pajak_nama`, hasil2[0].nama);
                                        props.setFieldValue(`detail_terima_uang.${index}.pajak_jual_id`, hasil2[0].kategori1.id);

                                        let jumlah = props.values.detail_terima_uang[index].jumlah;
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                        const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);

                                        let pajak = props.values.detail_terima_uang[index].jumlah * (hasil2[0].presentasaAktif / 100);
                                        props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                        const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                        props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                        props.setFieldValue("hasil_pajak", pajak_total);

                                        let jumlah2 = props.values.detail_terima_uang[index].jumlah - pajak;
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                        let harga_termasuk_pajak = jumlah_total - pajak_total;
                                        props.setFieldValue((props.values.subtotal = harga_termasuk_pajak));
                                        props.setFieldValue("subtotal", harga_termasuk_pajak);

                                        let total = jumlah_total;
                                        props.setFieldValue((props.values.total = total));
                                        props.setFieldValue("total", total);
                                      }
                                    }}>
                                    <option value='0'>Pilih</option>
                                    {data4.map((pajaks, index) => (
                                      <option key={index} value={pajaks.id}>
                                        {pajaks.nama}
                                      </option>
                                    ))}
                                  </Form.Control>
                                </td>

                                <td>
                                  <Form.Control
                                    placeholder='Jumlah Uang'
                                    name={`detail_terima_uang.${index}.jumlah`}
                                    onChange={(e) => {
                                      props.setFieldValue(`detail_terima_uang.${index}.jumlah`, parseInt(e.target.value));

                                      if (props.values.boolean == false) {
                                        let jumlah = parseInt(e.target.value);
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                        const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);
                                        props.setFieldValue((props.values.subtotal = jumlah_total));
                                        props.setFieldValue("subtotal", jumlah_total);

                                        let pajak = parseInt(e.target.value) * (props.values.detail_terima_uang[index].pajak_persen / 100);
                                        props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                        const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                        props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                        props.setFieldValue("hasil_pajak", pajak_total);

                                        let jumlah2 = jumlah - props.values.detail_terima_uang[index].hasil_pajak;
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                        let total = jumlah_total + pajak_total;
                                        props.setFieldValue((props.values.total = total));
                                        props.setFieldValue("total", total);
                                      } else {
                                        let jumlah = parseInt(e.target.value);
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah = jumlah));
                                        const jumlah_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.jumlah), 0);

                                        let pajak = parseInt(e.target.value) * (props.values.detail_terima_uang[index].pajak_persen / 100);
                                        props.setFieldValue((props.values.detail_terima_uang[index].hasil_pajak = pajak));
                                        const pajak_total = props.values.detail_terima_uang.reduce((a, b) => (a = a + b.hasil_pajak), 0);
                                        props.setFieldValue((props.values.hasil_pajak = pajak_total));
                                        props.setFieldValue("hasil_pajak", pajak_total);

                                        let jumlah2 = jumlah - props.values.detail_terima_uang[index].hasil_pajak;
                                        props.setFieldValue((props.values.detail_terima_uang[index].jumlah2 = jumlah2));

                                        let harga_termasuk_pajak = jumlah_total - pajak_total;
                                        props.setFieldValue((props.values.subtotal = harga_termasuk_pajak));
                                        props.setFieldValue("subtotal", harga_termasuk_pajak);

                                        let total = jumlah_total;
                                        props.setFieldValue((props.values.total = total));
                                        props.setFieldValue("total", total);
                                      }
                                    }}></Form.Control>
                                </td>

                                <td>
                                  <Button variant='primary' onClick={() => remove(index)} onChange={(e) => {}}>
                                    Remove
                                  </Button>
                                </td>
                              </tr>
                            </tbody>
                          ))}

                        <Button
                          variant='primary ml-2'
                          onClick={() =>
                            push({
                              nama_akun: "",
                              deskripsi: "",
                              pajak_id: "",
                              pajak_nama: "",
                              pajak_jual_id: "",
                              pajak_persen: "",
                              hasil_pajak: "",
                              jumlah: "",
                              jumlah2: "",
                            })
                          }>
                          <PlaylistAddIcon fontSize='medium' /> Tambah Data
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                </Table>
              </div>

              <div class='mb-6'>
                <Row>
                  <Col>
                    <Form.Group controlId='exampleForm.ControlTextarea1'>
                      <Form.Label>Memo</Form.Label>
                      <Form.Group controlId='exampleForm.ControlTextarea1'>
                        <Form.Control as='textarea' rows={3} name='memo' placeholder='Isi Memo' onChange={props.handleChange} />
                        {props.errors.memo && props.touched.memo ? <div>{props.errors.memo}</div> : null}
                      </Form.Group>
                    </Form.Group>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column sm='3'>
                        Subtotal
                      </Form.Label>
                      <Col sm='6'>
                        <Form.Label column sm='2' name='subtotal'>
                          Rp.{props.values.subtotal.toLocaleString({ minimumFractionDigits: 0 })}
                        </Form.Label>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column sm='3'>
                        Pajak
                      </Form.Label>
                      <Col sm='6'>
                        <Form.Label column sm='2' name='hasil_pajak'>
                          Rp.{props.values.hasil_pajak}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div class='mb-10'>
                <Row>
                  <Col>
                    <div>
                      <Form.Label>
                        <AttachmentIcon /> Lampiran
                      </Form.Label>

                      <Card border='secondary' style={{ width: "15rem" }}>
                        File Attachment <br />
                        <Form.File type='file' name='fileattachment' onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
                      </Card>
                    </div>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Form.Group as={Row} controlId='\\'>
                      <Form.Label column sm='4'>
                        Total Fixed
                      </Form.Label>
                      <Col sm='8'>
                        <Form.Label column sm='2' name='total'>
                          Rp.{props.values.total}
                        </Form.Label>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className='float-right mb-10'>
                <Button variant='danger mr-2'>
                  <HighlightOffIcon fontSize='medium' /> Batal
                </Button>

                <Button variant='success' type='submit' onClick={props.handleSubmit}>
                  <CheckCircleIcon fontSize='medium' /> Buat Transferan
                </Button>
              </div>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const akunKasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  const kontaks = await prisma.kontakDetail.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      kontak: true,
    },
  });

  const namaAkun = await prisma.akun.findMany({
    where: {
      nama_akun: {
        contains: "piutang",
      },
    },
  });

  const pajaks = await prisma.pajak.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      kategori1: true,
    },
  });

  const terimauangterakhir = await prisma.headerTerimaUang.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  return {
    props: {
      data: akunKasBank,
      data2: kontaks,
      data3: namaAkun,
      data4: pajaks,
      data5: terimauangterakhir,
    },
  };
}
