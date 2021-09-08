import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, Form, Button, FormCheck } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";

import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function pembayaran_jual({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;

  const url = "http://localhost:3000/api/jual/penerimaanPembayaran";

  function pembayaran() {
    router.push(`../pembayaran-jual/view/${id}`);
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          id: id,
          setor_ke: "",
          carapembayaran: "",
          tgl_pembayaran: "",
          tgl_jatuh_tempo: "",
          jumlah: 0,
        }}
        // validationSchema={UserSchema}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.push(`../../jual/view/${id}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <Row>
              <Col>
                <h5>Transaksi</h5>
                <h3 className='text-blue-600'>Penerimaan Pembayaran</h3>
              </Col>
            </Row>
            <hr />
            <Form>
              <Row sm='12'>
                {data.map((i) => (
                  <Col sm='3'>
                    <Form.Label className='font-medium'>Pelanggan</Form.Label>
                    <Form.Control placeholder={i.kontak.nama} disabled />
                  </Col>
                ))}

                <Col sm='3'>
                  <Form.Label className='font-medium'>Setor Ke</Form.Label>
                  <Form.Control as='select' name='setor_ke' onChange={props.handleChange}>
                    <option value='kosong'>Pilih</option>
                    {data2.map((akun) => (
                      <option key={akun.id} value={akun.id}>
                        {akun.nama_akun}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className='d-flex justify-content-end mr-3'>
                  <Row>
                    <h4 className='mr-2'>Total</h4>
                    <h4 name='total'>Rp. {props.values.jumlah}</h4>
                  </Row>
                </Col>
              </Row>

              <hr />

              <Row sm='12'>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Cara Pembayaran</Form.Label>
                  <Form.Control as='select' name='carapembayaran' onChange={props.handleChange}>
                    <option value='kosong'>Pilih</option>
                    <option value='Kas Tunai'>Kas Tunai</option>
                    <option value='Cek dan Giro'>Cek dan Giro</option>
                    <option value='Transfer Bank'>Transfer Bank</option>
                    <option value='Kartu Kredit'>Kartu Kredit</option>
                  </Form.Control>
                </Col>

                <Col sm='3'>
                  <Form.Label className='font-medium'>Tanggal Pembayaran</Form.Label>
                  <Form.Control placeholder='' type='date' name='tgl_pembayaran' onChange={props.handleChange} />
                </Col>

                <Col sm='3'>
                  <Form.Label className='font-medium'>Tanggal Jatuh Tempo</Form.Label>
                  <Form.Control placeholder='' type='date' name='tgl_jatuh_tempo' onChange={props.handleChange} />
                </Col>

                {data.map((i) => (
                  <Col sm='3'>
                    <Form.Label className='font-medium'>No. Transaksi</Form.Label>
                    <Form.Control placeholder={i.no_transaksi} disabled />
                  </Col>
                ))}
              </Row>

              <Row sm='12'>
                <Col />
                <Col />
                <Col />

                {data.map((i) => (
                  <Col sm='3'>
                    <Form.Label className='font-medium'>Tag</Form.Label>
                    <Form.Control placeholder={i.tag} disabled />
                  </Col>
                ))}
              </Row>

              <hr />

              <Row sm='12'>
                <Col sm='2'>
                  <Form.Label className='font-medium'>Nomor</Form.Label>
                </Col>

                <Col sm='2'>
                  <Form.Label className='font-medium'>Deskripsi</Form.Label>
                </Col>

                <Col sm='2'>
                  <Form.Label className='font-medium'>Tgl Jatuh Tempo</Form.Label>
                </Col>

                <Col sm='2'>
                  <Form.Label className='font-medium'>Total</Form.Label>
                </Col>

                <Col sm='2'>
                  <Form.Label className='font-medium'>Sisa Tagihan</Form.Label>
                </Col>

                <Col sm='2'>
                  <Form.Label className='font-medium'>Jumlah</Form.Label>
                </Col>
              </Row>

              <hr />
              {data.map((i) => (
                <Row className='mb-12'>
                  <Col sm='2'>
                    <p>Purchase Invoice #{i.id}</p>
                  </Col>

                  <Col sm='2'>
                    <p>{i.memo}</p>
                  </Col>

                  <Col sm='2'>
                    <p>{i.tgl_jatuh_tempo}</p>
                  </Col>

                  <Col sm='2'>
                    <p>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm='2'>
                    <p>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm='2'>
                    <Form.Control
                      type='number'
                      placeholder=''
                      name='jumlah'
                      onChange={(e) => {
                        props.setFieldValue("jumlah", e.target.value);
                        const total = i.sisa_tagihan - e.target.value;

                        props.setFieldValue("total", parseInt(total));
                      }}
                    />
                  </Col>
                </Row>
              ))}

              <Row sm='12' className='mt-7'>
                <Col sm='3' />

                <Col sm='3' />

                <Col sm='3'>
                  <h5>Total</h5>
                </Col>

                <Col sm='3'>
                  <h5 name='total'>Rp. {parseInt(props.values.jumlah).toLocaleString({ minimumFractionDigits: 0 })}</h5>
                </Col>
              </Row>

              <Row>
                <Col className='d-flex justify-content-end mt-10'>
                  {/* <Button variant='primary mr-2' onClick={pembayaran}>
                    Invoice
                  </Button> */}
                  <Link href='/jual/penjualan'>
                    <Button variant='danger mr-2'>Batal</Button>
                  </Link>
                  <Button variant='success' onClick={props.handleSubmit}>
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

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerPenjualan.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      DetailPenjualan: true,
    },
  });

  const akunKasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  return {
    props: {
      data: header,
      data2: akunKasBank,
    },
  };
}
