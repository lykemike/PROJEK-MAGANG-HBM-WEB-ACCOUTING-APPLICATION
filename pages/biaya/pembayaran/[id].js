import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function pengirimanBayaran({ data, data2, data3 }) {
  // Redirect Function and Take URL Parameter [id]
  const router = useRouter();
  const { id } = router.query;

  const url = "http://localhost:3000/api/biaya/pengiriman_biaya";

  function pembayaran() {
    router.push(`../pembayaran/view/${id}`);
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          id: id,
          bayar_dari: data[0].akun_kas_bank,
          cara_pembayaran: data[0].cara_pembayaran,
          tgl_transaksi: data[0].tgl_transaksi,
          tgl_jatuh_tempo: "",
          jumlah: 0,
        }}
        // validationSchema={UserSchema}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.push("../pengeluaran");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div>
              <h4>Transaksi</h4>
              <Row>
                <Col>
                  <h5>Pengiriman Bayaran</h5>
                </Col>
                <Col className='d-flex justify-content-end'></Col>
              </Row>

              <hr />

              <Row>
                {data.map((i) => (
                  <Col sm='3'>
                    <Form.Label className='font-medium'>Penerima: </Form.Label>
                    <Form.Control type='text' name='penerima' placeholder={i.kontak.nama} disabled></Form.Control>
                  </Col>
                ))}
                <Col sm='3'>
                  <Form.Label className='font-medium'>Bayar Dari: </Form.Label>
                  <Form.Control type='text' disabled name='bayar_dari' value={data[0].akun_kas_bank.toString()} onChange={props.handleChange}>
                    {/* <option value='kosong'>Pilih</option>
							{data3.map((akun) => (
							<option key={akun.id} value={akun.id}>
								{akun.nama_akun}
							</option>
							))} */}
                  </Form.Control>
                </Col>

                <Col className='d-flex justify-content-end mr-3'>
                  <Row>
                    <h4 className='mr-2'>Total Amount</h4>
                    <h4 name='total' className='text-blue'>
                      Rp. {parseInt(props.values.jumlah).toLocaleString({ minimumFractionDigits: 0 })}
                    </h4>
                  </Row>
                </Col>
              </Row>

              <hr />
              {data.map((i) => (
                <Row>
                  <Col sm='3'>
                    <Form.Label className='font-medium'>Cara Pembayaran</Form.Label>
                    <Form.Control type='text' name='cara_pembayaran' value={i.cara_pembayaran} disabled placeholder={i.cara_pembayaran} disabled></Form.Control>
                  </Col>

                  <Col sm='3'>
                    <Form.Label className='font-medium'>Tgl Pembayaran</Form.Label>
                    <Form.Control type='text' name='tgl_pembayaran' value={i.tgl_transaksi} disabled placeholder={i.tgl_transaksi}></Form.Control>
                  </Col>

                  <Col sm='3'>
                    <Form.Label className='font-medium'>Tgl Jatuh Tempo</Form.Label>
                    <Form.Control type='date' name='tgl_jatuh_tempo' onChange={props.handleChange}></Form.Control>
                  </Col>

                  <Col sm='3'>
                    <Form.Label className='font-medium'>No Transaksi</Form.Label>
                    <Form.Control type='text' name='no_transaksi' placeholder={i.no_transaksi} disabled></Form.Control>
                  </Col>
                </Row>
              ))}

              {data.map((i) => (
                <Row>
                  <Col sm='3'></Col>

                  <Col sm='3'></Col>

                  <Col sm='3'></Col>

                  <Col sm='3'>
                    <Form.Label className='font-medium'>Tag</Form.Label>
                    <Form.Control type='text' disabled placeholder={i.tag} name='tag' />
                  </Col>
                </Row>
              ))}
              <hr />
              <Row sm='12'>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Nomor</Form.Label>
                </Col>

                {/* <Col sm="2">
						<Form.Label className="font-medium">Deskripsi</Form.Label>
					</Col> */}

                {/* <Col sm="3">
						<Form.Label className="font-medium">Tgl Jatuh Tempo</Form.Label>
					</Col> */}

                <Col sm='3'>
                  <Form.Label className='font-medium'>Total</Form.Label>
                </Col>

                <Col sm='3'>
                  <Form.Label className='font-medium'>Sisa Tagihan</Form.Label>
                </Col>

                <Col sm='3'>
                  <Form.Label className='font-medium'>Jumlah</Form.Label>
                </Col>
              </Row>

              <hr />
              {data.map((i) => (
                <Row className='mb-12'>
                  <Col sm='3  '>
                    <p>Expense #{i.id}</p>
                  </Col>

                  <Col sm='3'>
                    <p>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm='3'>
                    <p>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm='3'>
                    <Form.Control
                      placeholder=''
                      name='jumlah'
                      type='number'
                      onChange={(e) => {
                        props.setFieldValue("jumlah", e.target.value);
                        const totalbayar = i.sisa_tagihan - e.target.value;

                        props.setFieldValue("totalbayar", parseInt(totalbayar));
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <hr />

              <Row sm='12' className='mt-3'>
                <Col sm='3' />

                <Col sm='3' />

                <Col sm='3'>
                  <h5>Total</h5>
                </Col>

                <Col sm='3'>
                  <h4 name='totalbayar'>Rp. {parseInt(props.values.jumlah).toLocaleString({ minimumFractionDigits: 0 })}</h4>
                </Col>
              </Row>

              <hr />

              <Row className='mt-32'>
                <Col className='d-flex justify-content-end'>
                  <Button variant='danger' className='mr-4'>
                    Kembali
                  </Button>
                  <Button variant='success' onClick={props.handleSubmit}>
                    Bayar
                  </Button>
                </Col>
              </Row>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  // Get biaya from API
  const getheaderbiaya = await prisma.headerBiaya.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun1: true,
      akun2: true,
      kontak: true,
      detail_biaya: true,
    },
  });

  const getdetailbiaya = await prisma.detailBiaya.findMany({
    where: {
      header_biaya_id: parseInt(id),
    },
    include: {
      header_biaya: true,
      akun_biaya: true,
      pajak: true,
    },
  });

  const akunKasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  return {
    props: {
      data: getheaderbiaya,
      data2: getdetailbiaya,
      data3: akunKasBank,
    },
  };
}
