import React from "react";
import Layout from "../../components/Layout";
import { Row, Col, Form, Button, FormCheck, InputGroup } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/Link";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function BuatBiaya({ data, data2, data3, data4, data5 }) {
  const url = "http://localhost:3000/api/biaya/create-biaya";

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_kas_bank: "",
          nama_penerima: "",
          tgl_transaksi: "",
          cara_pembayaran: "",
          no_transaksi: "",
          alamat_penagihan: "",
          tag: "",
          detail_biaya: [
            {
              akun_biaya_id: "",
              deskripsi: "",
              pajak_id: "",
              persen_pajak: "",
              jumlah: "",
              total_per_baris: "",
            },
          ],
          memo: "",
          lampiran: "",
          subtotal: "",
          pajak: "",
          total: "",
          pemotongan: "",
          jumlah_pemotongan: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div>
              <h4>Buat Biaya</h4>
              <hr />
            </div>

            <Form>
              {/* bayar dari, bayar nanti, and total */}
              <Row sm='12'>
                <Col sm='4'>
                  <Form.Label className='font-medium'>Bayar Dari</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
                    name='akun_kas_bank'
                    onChange={props.handleChange}>
                    <option disabled>Pilih</option>
                    {data.map((akun) => (
                      <option key={akun.id} value={akun.id}>
                        {akun.nama_akun}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm='3'>
                  <Form.Label />
                  <Row className='ml-1 mt-3'>
                    <FormCheck />
                    <p className='font-medium'>Bayar Nanti</p>
                  </Row>
                </Col>
                <Col sm='3' />
                <Col sm='2' className='justify-content-end'>
                  <Row>
                    <h4 className='mr-2 '>Total</h4>
                    <h4 class='text-blue-600' name='jumlah_pemotongan'>
                      Rp.{" "}
                      {props.values.jumlah_pemotongan.toLocaleString({ minimumFractionDigits: 0 })}
                    </h4>
                  </Row>
                </Col>
              </Row>

              <hr />

              {/* nama_penerima, tanggal transaksi, cara pembayaran and no transaksi */}
              <Row sm='12'>
                <Col sm='4'>
                  <Form.Label className='font-medium'>Penerima</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
                    name='nama_penerima'
                    onChange={(e) => {
                      props.setFieldValue(`nama_penerima`, e.target.value);
                      if (e.target.value === "") {
                        props.setFieldValue(`alamat_penagihan`, "");
                      } else {
                        let result = data3.filter((i) => {
                          return i.id === parseInt(e.target.value);
                        });
                        props.setFieldValue(`alamat_penagihan`, result[0].alamat_pembayaran);
                      }
                    }}>
                    <option disabled>Pilih</option>
                    {data3.map((kontak) => (
                      <option key={kontak.id} value={kontak.id}>
                        {kontak.nama}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Tanggal Transaksi</Form.Label>
                  <Form.Control
                    placeholder='Auto'
                    type='date'
                    name='tgl_transaksi'
                    onChange={props.handleChange}
                  />
                </Col>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Cara Pembayaran</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
                    name='cara_pembayaran'
                    onChange={props.handleChange}>
                    <option disabled>Pilih</option>
                    <option value='Cash'>Tunai / Cash</option>
                    <option value='Credit'>Credit / Term of Payment</option>
                  </Form.Control>
                </Col>
                <Col sm='2'>
                  <Form.Label className='font-medium'>No. Transaksi</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Auto'
                    name='no_transaksi'
                    onChange={props.handleChange}
                  />
                </Col>
              </Row>

              {/* alamat penagihan and tag */}
              <Row sm='12'>
                <Col sm='4' className='mt-3'>
                  <Form.Label className='font-medium'>Alamat Penagihan</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={4}
                    name='alamat_penagihan'
                    value={props.values.alamat_penagihan}
                  />
                </Col>
                <Col sm='3' />
                <Col sm='3' />
                <Col sm='2' className='mt-3'>
                  <Form.Label className='font-medium'>Tag</Form.Label>
                  <Form.Control placeholder='Tag' name='tag' onChange={props.handleChange} />
                </Col>
              </Row>

              <Row className='d-flex justify-content-end mr-3 mt-12'>
                <div class='float-right mt-2 '>
                  <Form.Check label='Harga Termasuk Pajak' type='switch' id='custom-switch' />
                </div>
              </Row>

              <hr />

              {/* akun biaya, deskripsi, pajak, jumlah and empty col for delete button */}
              <Row sm='12'>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Akun Biaya</Form.Label>
                </Col>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Deskripsi</Form.Label>
                </Col>
                <Col sm='2'>
                  <Form.Label className='font-medium'>Pajak</Form.Label>
                </Col>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Jumlah</Form.Label>
                </Col>
                <Col sm='1'>
                  <Form.Label className='font-medium' />
                </Col>
              </Row>

              <hr />
              <Form>
                <FieldArray name='detail_biaya'>
                  {({ insert, remove, push }) => (
                    <div>
                      {props.values.detail_biaya.length > 0 &&
                        props.values.detail_biaya.map((i, index) => (
                          <Row className='mb-3' key={index}>
                            <Col sm='3'>
                              <Form.Control
                                as='select'
                                //   defaultValue='Choose...'
                                //   name='akun_biaya_id'
                                name={`detail_biaya.${index}.akun_biaya_id`}
                                onChange={(e) => {
                                  props.setFieldValue(
                                    `detail_biaya.${index}.akun_biaya_id`,
                                    e.target.value
                                  );
                                  if (e.target.value === "") {
                                    props.setFieldValue(`detail_biaya.${index}.akun_biaya_id`);
                                  } else {
                                    let result = data2.filter((i) => {
                                      return i.id === parseInt(e.target.value);
                                    });
                                  }
                                  props.setFieldValue(
                                    `detail_biaya.${index}.nama_akun`,
                                    data2.filter((i) => i.id === parseInt(e.target.value))[0]
                                      .nama_akun
                                  );
                                  //     console.log(data2.filter((i) => i.id === parseInt(e.target.value)));
                                }}>
                                <option disabled>Pilih</option>
                                {data2.map((akun) => (
                                  <option key={akun.id} value={akun.id}>
                                    {akun.nama_akun}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                            <Col sm='3'>
                              <Form.Control
                                placeholder=''
                                type='text'
                                name={`detail_biaya.${index}.deskripsi`}
                                onChange={props.handleChange}
                              />
                            </Col>
                            <Col sm='2'>
                              <Form.Control
                                as='select'
                                name={`detail_biaya.${index}.pajak_id`}
                                onChange={(e) => {
                                  props.setFieldValue(
                                    `detail_biaya.${index}.pajak_id`,
                                    e.target.value
                                  );
                                  if (e.target.value === "") {
                                    props.setFieldValue(`detail_biaya.${index}.pajak_id`);
                                  } else {
                                    let result = data4.filter((i) => {
                                      return i.id === parseInt(e.target.value);
                                    });
                                  }
                                  props.setFieldValue(
                                    `detail_biaya.${index}.nama`,
                                    data4.filter((i) => i.id === parseInt(e.target.value))[0].nama
                                  );

                                  // Rumus pajak
                                  let pajak1 = data4.filter((i) => {
                                    return i.id === parseInt(e.target.value);
                                  });
                                  props.setFieldValue(
                                    `detail_biaya.${index}.persen_pajak`,
                                    pajak1[0].presentasaAktif
                                  );
                                  let pajak2 = pajak1[0].presentasaAktif / 100;
                                  let pajak3 = pajak2 * props.values.detail_biaya[index].jumlah;
                                  props.setFieldValue(
                                    (props.values.detail_biaya[index].pajak = pajak3)
                                  );
                                  const pajak_total = props.values.detail_biaya.reduce(
                                    (a, b) => (a = a + b.pajak),
                                    0
                                  );
                                  props.setFieldValue("pajak", pajak_total);

                                  // Rumus total
                                  let total1 = pajak3 + props.values.detail_biaya[index].total_per_baris;
                                  props.setFieldValue((props.values.detail_biaya[index].total = total1));
                                  const total2 = props.values.detail_biaya.reduce((a, b) => (a = a + b.total),0);
                                  props.setFieldValue("total", total2);

                                  // Rumus potongan
                                  let jumlah_pemotongan = total2 - props.values.pemotongan;
                                  props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                                }}>
                                <option disabled>Pilih</option>
                                {data4.map((pajak) => (
                                  <option key={pajak.id} value={pajak.id}>
                                    {pajak.nama}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                            <Col sm='3'>
                              <Form.Control
                                placeholder=''
                                name={`detail_biaya.${index}.jumlah`}
                                value={props.values.jumlah}
                                onChange={(e) => {
                                  // Rumus jumlah
                                  props.setFieldValue(
                                    `detail_biaya.${index}.total_per_baris`,
                                    parseInt(e.target.value)
                                  );
                                  let result = parseInt(e.target.value);
                                  props.setFieldValue(
                                    (props.values.detail_biaya[index].jumlah = result)
                                  );
                                  const subtotal = props.values.detail_biaya.reduce(
                                    (a, b) => (a = a + b.jumlah),
                                    0
                                  );
                                  props.setFieldValue("subtotal", subtotal);

                                  // Rumus pajak
                                  let pajak1 =
                                    result * (props.values.detail_biaya[index].persen_pajak / 100);
                                  props.setFieldValue(
                                    (props.values.detail_biaya[index].pajak = pajak1)
                                  );
                                  const pajak_total = props.values.detail_biaya.reduce(
                                    (a, b) => (a = a + b.pajak),
                                    0
                                  );
                                  props.setFieldValue("pajak", pajak_total);

                                  // Rumus total
                                  let total = subtotal + pajak_total;
                                  props.setFieldValue("total", total);

                                  // Rumus potongan
                                  let jumlah_pemotongan = total - props.values.pemotongan;
                                  props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                                }}
                              />
                            </Col>
                            <Col sm='1'>
                              <Button variant='danger' onClick={() => remove(index)}>
                                <CloseIcon fontSize='small' />
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      <Button
                        type='button'
                        variant='primary'
                        onClick={() =>
                          push({
                            akun_biaya_id: "",
                            deskripsi: "",
                            pajak_id: "",
                            jumlah: "",
                          })
                        }>
                        <AddIcon /> Tambah data
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Form>

              {/* memo, subtotal, pajak, total, pemotongan and total */}
              <Row sm='12' className='mt-3'>
                <Col sm='4'>
                  <Form.Label className='font-medium'>Memo</Form.Label>
                  <Form.Control as='textarea' rows={4} name='memo' />
                </Col>
                <Col sm='3' />
                <Col sm='3' className='mt-3'>
                  <Col>
                    <p>SubTotal</p>
                    <p>Pajak</p>
                    <p>Total</p>
                    <p>Pemotongan</p>
                  </Col>
                </Col>
                <Col sm='2' className='mt-3'>
                  <Col>
                    <p name='subtotal'>
                      Rp. {props.values.subtotal.toLocaleString({ minimumFractionDigits: 0 })}
                    </p>
                    <p name='pajak'>
                      Rp. {props.values.pajak.toLocaleString({ minimumFractionDigits: 0 })}
                    </p>
                    <p name='total'>
                      Rp. {props.values.total.toLocaleString({ minimumFractionDigits: 0 })}
                    </p>
                  </Col>
                </Col>
              </Row>

              {/* lampiran, select, pemotongan input, and total */}
              <Row sm='12'>
                <Col sm='4'>
                  <Form.Label className='font-medium'>Lampiran</Form.Label>
                  <Form>
                    <Form.File
                      id='custom-file-translate-scss'
                      label='ukuran maksimal 10MB/File'
                      lang='en'
                      custom
                      name='lampiran'
                    />
                  </Form>
                </Col>
                <Col sm='3'>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
                    name='akun_pemotongan'
                    onChange={props.handleChange}>
                    <option>pilih</option>
                    {data5.map((akun) => (
                      <option key={akun.id} value={akun.id}>
                        {akun.nama_akun}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm='3'>
                  <InputGroup className='mb-3'>
                    <Form.Control
                      type='text'
                      placeholder=''
                      aria-label='Amount (to the nearest dollar)'
                      name='pemotongan'
                      onChange={(e) => {
                        props.setFieldValue(`pemotongan`, e.target.value);
                        let jumlah_pemotongan = props.values.total - e.target.value;
                        props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                      }}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>%</InputGroup.Text>
                      <InputGroup.Text>Rp</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
                <Col sm='2'>
                  <Col className='mt-2'>
                    <p>Rp. 0,00</p>
                  </Col>
                </Col>
              </Row>

              {/* total */}
              <Row sm='12' className='mt-3'>
                <Col sm='4' />
                <Col sm='3' />
                <Col sm='3' />
                <Col sm='2' className='justify-content-end'>
                  <Row>
                    <h4 className='mr-2 '>Total</h4>
                    <h4 class='text-blue-600' name='jumlah_pemotongan'>
                      Rp.{" "}
                      {props.values.jumlah_pemotongan.toLocaleString({ minimumFractionDigits: 0 })}
                    </h4>
                  </Row>
                </Col>
              </Row>

              {/* button batal and bayar */}
              <Row>
                <Col className='d-flex justify-content-end mt-10'>
                  <Button variant='danger mr-2'>Batal</Button>
                  <Button variant='success' className='ml-2' onClick={props.handleSubmit}>
                    Bayar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get kategori akun from akun model
  const getAkun = await prisma.akun.findMany({
    where: {
      // Akun kas & bank
      kategoriId: 3,
    },
  });

  const getAkun2 = await prisma.akun.findMany({
    where: {
      // Akun beban, & beban lainnya
      kategoriId: {
        in: [16, 17],
      },
    },
  });

  const getAkun3 = await prisma.akun.findMany({
    where: {
      // Akun pendapatan
      kategoriId: 13,
    },
  });

  // Get kontak from kontak model
  const getKontak = await prisma.kontak.findMany({
    orderBy: [
      {
        nama: "asc",
      },
    ],
  });

  //Get Pajak form pajak model
  const getPajak = await prisma.pajak.findMany({
    orderBy: [
      {
        nama: "asc",
      },
    ],
  });

  return {
    props: {
      data: getAkun,
      data2: getAkun2,
      data3: getKontak,
      data4: getPajak,
      data5: getAkun3,
    },
  };
}
