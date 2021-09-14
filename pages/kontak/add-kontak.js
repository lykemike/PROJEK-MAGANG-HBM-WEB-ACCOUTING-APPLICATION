import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, FormCheck, Button, Card } from "react-bootstrap";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import { useRouter } from "next/router";

import { Formik, Form as Forms, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function BuatKontakBaru({ data, data2 }) {
  // Form validation
  const KontakSchema = Yup.object().shape({
    namaPanggilan: Yup.string().min(4).required("*required"),
    nama: Yup.string().min(4).required("*required"),
    nomorHp: Yup.number().required("*required"),
    nomorIdentitas: Yup.string().required("*required"),
    email: Yup.string().min(5).email().required("*required"),
    infoLain: Yup.string().min(1).required("*required"),
    namaPerusahaan: Yup.string().min(5).required("*required"),
    nomorTelepon: Yup.number().min(1).required("*required"),
    nomorFax: Yup.number().min(1).required("*required"),
    nomorNpwp: Yup.number().min(15).required("*required"),
    alamatPembayaran: Yup.string().min(10).required("*required"),
    alamatPengiriman: Yup.string().min(10).required("*required"),
    namaBank: Yup.string().min(3).required("*required"),
    kantorCabangBank: Yup.string().min(3).required("*required"),
    pemegangAkunBank: Yup.string().min(3).required("*required"),
    nomorRekening: Yup.number().min(8).required("*required"),
  });

  // Kontak API
  const createKontak = "http://localhost:3000/api/kontak/createKontak";

  // Redirect Function
  const router = useRouter();

  // Batal Button Function
  function cancelButton() {
    router.push("../kontak/tabel-kontak");
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          namaPanggilan: "",
          gelar: "",
          nama: "",
          nomorHp: "",
          tipeIdentitas: "",
          nomorIdentitas: "",
          email: "",
          infoLain: "",
          namaPerusahaan: "",
          nomorTelepon: "",
          nomorFax: "",
          nomorNpwp: "",
          alamatPembayaran: "",
          alamatPengiriman: "",
          namaBank: "",
          kantorCabangBank: "",
          pemegangAkunBank: "",
          nomorRekening: "",
          akunPiutang: "",
          akunHutang: "",
          syaratPembayaranUtama: "",
          menu: [],
        }}
        // validationSchema={KontakSchema}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(createKontak, values)
            .then(function (response) {
              console.log(response);
              router.push("../kontak/tabel-kontak");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div>
              <h4>Kontak</h4>
              <h3>Buat Kontak Baru</h3>
              <hr />
              <Card>
                <Card.Body>
                  <Form>
                    {/* Info Kontak */}
                    <Row className='mb-2'>
                      <PersonOutlineOutlinedIcon fontSize='medium' className='mt-1.5' />
                      <h3>Info Kontak</h3>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Nama Panggilan</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='namaPanggilan' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.namaPanggilan && props.touched.namaPanggilan ? <div class='text-red-500 text-sm'>{props.errors.namaPanggilan}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Tipe Kontak (dapat lebih dari 1)</Form.Label>
                      </Col>
                      <Col sm='10' class='ml-8'>
                        <div role='group' aria-labelledby='checkbox-group'>
                          <Row>
                            <label className='ml-3 mr-2'>
                              <Field type='checkbox' name='menu' value='1' />
                              Supplier
                            </label>

                            <label className='mr-2'>
                              <Field type='checkbox' name='menu' value='2' />
                              Pelanggan
                            </label>

                            <label className='mr-2'>
                              <Field type='checkbox' name='menu' value='3' />
                              Karyawan
                            </label>

                            <label className='mr-2'>
                              <Field type='checkbox' name='menu' value='4' />
                              Lainnya
                            </label>
                          </Row>
                        </div>
                      </Col>
                    </Row>

                    {/* Info Kontak */}
                    <Row className='mb-2'>
                      <BusinessCenterOutlinedIcon fontSize='large' />
                      <h3>Informasi Umum</h3>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Nama Kontak</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Row>
                          <Col sm='2'>
                            <Form.Control as='select' defaultValue='Choose...' name='gelar' onChange={props.handleChange} onBLur={props.handleBlur}>
                              <option>Pilih</option>
                              <option value='Mr.'>Mr. </option>
                              <option value='Ms.'>Ms. </option>
                              <option value='Mrs.'>Mrs. </option>
                            </Form.Control>
                          </Col>
                          <Col>
                            <Form.Control placeholder='-' type='text' name='nama' onChange={props.handleChange} onBLur={props.handleBlur} />
                            {props.errors.nama && props.touched.nama ? <div class='text-red-500 text-sm'>{props.errors.nama}</div> : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Handphone</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='nomorHp' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.nomorHp && props.touched.nomorHp ? <div class='text-red-500 text-sm'>{props.errors.nomorHp}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Identitas</Form.Label>
                      </Col>
                      <Col>
                        <Row>
                          <Col sm='2'>
                            <Form.Control as='select' defaultValue='Choose...' name='tipeIdentitas' onChange={props.handleChange} onBLur={props.handleBlur}>
                              <option>Pilih</option>
                              <option value='Passport'>Passport</option>
                              <option value='KTP'>KTP</option>
                              <option value='SIM'>SIM</option>
                              <option value='BPJS'>BPJS</option>
                            </Form.Control>
                          </Col>
                          <Col>
                            <Form.Control placeholder='-' type='text' name='nomorIdentitas' onChange={props.handleChange} onBLur={props.handleBlur} />
                            {props.errors.nomorIdentitas && props.touched.nomorIdentitas ? <div class='text-red-500 text-sm'>{props.errors.nomorIdentitas}</div> : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Email</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='email' name='email' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.email && props.touched.email ? <div class='text-red-500 text-sm'>{props.errors.email}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Info Lain</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='infoLain' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.infoLain && props.touched.infoLain ? <div class='text-red-500 text-sm'>{props.errors.infoLain}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Nama Perusahaan</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='namaPerusahaan' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.namaPerusahaan && props.touched.namaPerusahaan ? <div class='text-red-500 text-sm'>{props.errors.namaPerusahaan}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Telepon</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='nomorTelepon' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.nomorTelepon && props.touched.nomorTelepon ? <div class='text-red-500 text-sm'>{props.errors.nomorTelepon}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Fax</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='nomorFax' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.nomorFax && props.touched.nomorFax ? <div class='text-red-500 text-sm'>{props.errors.nomorFax}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>NPWP</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='nomorNpwp' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.nomorNpwp && props.touched.nomorNpwp ? <div class='text-red-500 text-sm'>{props.errors.nomorNpwp}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Alamat Pembayaran</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='alamatPembayaran' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.alamatPembayaran && props.touched.alamatPembayaran ? <div class='text-red-500 text-sm'>{props.errors.alamatPembayaran}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Alamat Pengiriman</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='alamatPengiriman' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.alamatPengiriman && props.touched.alamatPengiriman ? <div class='text-red-500 text-sm'>{props.errors.alamatPengiriman}</div> : null}
                      </Col>
                    </Row>

                    {/* Daftar Bank */}
                    <Row className='mb-2'>
                      <AccountBalanceOutlinedIcon fontSize='large' />
                      <h3>Daftar Bank</h3>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <h5>Akun Bank</h5>
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Nama Bank</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='namaBank' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.namaBank && props.touched.namaBank ? <div class='text-red-500 text-sm'>{props.errors.namaBank}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Kantor Cabang Bank</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='kantorCabangBank' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.kantorCabangBank && props.touched.kantorCabangBank ? <div class='text-red-500 text-sm'>{props.errors.kantorCabangBank}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Pemegang Akun Bank</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='pemegangAkunBank' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.pemegangAkunBank && props.touched.pemegangAkunBank ? <div class='text-red-500 text-sm'>{props.errors.pemegangAkunBank}</div> : null}
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Nomor Rekening</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control placeholder='-' type='text' name='nomorRekening' onChange={props.handleChange} onBLur={props.handleBlur} />
                        {props.errors.nomorRekening && props.touched.nomorRekening ? <div class='text-red-500 text-sm'>{props.errors.nomorRekening}</div> : null}
                      </Col>
                      {/* <Col sm='12'>
                        <Button className='mb-2 mt-4' variant='outline-primary' block>
                          <AddIcon fontSize='small' />
                          Tambah Bank Lain
                        </Button>
                      </Col> */}
                    </Row>

                    {/* Pemetaan Akun*/}
                    <Row className='mb-2'>
                      <InsertDriveFileOutlinedIcon fontSize='large' />
                      <h3>Pemetaan Akun</h3>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Akun Piutang</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control as='select' defaultValue='Choose...' name='akunPiutang' onChange={props.handleChange} onBLur={props.handleBlur}>
                          <option>Pilih</option>
                          {data.map((akunPiutang) => (
                            <option key={akunPiutang.id} value={akunPiutang.id}>
                              {akunPiutang.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Akun Hutang</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control as='select' defaultValue='Choose...' name='akunHutang' onChange={props.handleChange} onBLur={props.handleBlur}>
                          <option>Pilih</option>
                          {data2.map((akunHutang) => (
                            <option key={akunHutang.id} value={akunHutang.id}>
                              {akunHutang.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>

                    <Row className='mb-2'>
                      <Col sm='2'>
                        <Form.Label>Syarat Pembayaran Utama</Form.Label>
                      </Col>
                      <Col sm='10'>
                        <Form.Control as='select' defaultValue='Choose...' name='syaratPembayaranUtama' onChange={props.handleChange} onBLur={props.handleBlur}>
                          <option>Pilih</option>
                          <option value='1'>Tunai / Cash</option>
                          <option value='2'>Kredit / Term of Payment</option>
                          <option value='3'>15 hari</option>
                          <option value='4'>30 hari</option>
                          <option value='5'>End of Month (EOM)</option>
                        </Form.Control>
                      </Col>
                    </Row>

                    <Row>
                      <Col className='d-flex justify-content-end mt-10'>
                        <Button variant='danger mr-2' onClick={cancelButton}>
                          Batal
                        </Button>
                        <Link href='/kontak/informasi-kontak'>
                          <Button variant='success' type='submit' onClick={props.handleSubmit}>
                            Simpan
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const getAkunPiutang = await prisma.akun.findMany({
    where: {
      kategoriId: 1,
    },
  });

  const getAkunHutang = await prisma.akun.findMany({
    where: {
      kategoriId: 8,
    },
  });

  return {
    props: {
      data: getAkunPiutang,
      data2: getAkunHutang,
    },
  };
}
