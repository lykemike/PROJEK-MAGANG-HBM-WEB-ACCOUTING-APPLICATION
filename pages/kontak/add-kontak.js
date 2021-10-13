import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { Breadcrumbs, Typography } from "@material-ui/core/";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";

import Select from "react-select";
import { Formik, Form as Forms, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function BuatKontakBaru({ data, data2 }) {
  const router = useRouter();

  function SelectField(FieldProps) {
    return <Select options={data} onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)} />;
  }

  function SelectField2(FieldProps) {
    return <Select options={data2} onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)} />;
  }
  const KontakSchema = Yup.object().shape({
    namaPanggilan: Yup.string()
      .min(4, "* must be more than 4 characters")
      .max(30, "* must be less than 30 characters")
      .required("* required"),
    nama: Yup.string()
      .min(4, "* must be more than 4 characters")
      .max(30, "* must be less than 30 characters")
      .required("* required"),
    nomorHp: Yup.string().required("* required"),
    nomorIdentitas: Yup.string()
      .min(4, "* must be more than 4 characters")
      .max(20, "* must be less than 20 characters")
      .required("* required"),
    email: Yup.string().email("* must be valid email").required("* required"),
    namaPerusahaan: Yup.string().min(5, "* must be more than 5 characters").required("* required"),
    nomorTelepon: Yup.string().required("* required"),
    nomorNpwp: Yup.number().min(15).required("* required"),
    alamatPembayaran: Yup.string().min(10, "* must be more than 10 characters").required("* required"),
    alamatPengiriman: Yup.string().min(10, "* must be more than 10 characters").required("* required"),
    namaBank: Yup.string().min(5, "* must be more than 5 characters").required("* required"),
    kantorCabangBank: Yup.string().min(5, "* must be more than 5 characters").required("* required"),
    pemegangAkunBank: Yup.string().min(5, "* must be more than 5 characters").required("* required"),
    nomorRekening: Yup.string().min(5, "* must be more than 5 characters").required("* required"),
    // tipeIdentitas: Yup.object().shape({
    //   label: Yup.string().required("* required"),
    //   value: Yup.string().required("* required"),
    // }),
    menu: Yup.array().min(1, "* must select atleast 1 tipe kontak"),
  });

  const api_create_kontak = "http://localhost:3000/api/kontak/createKontak";

  function cancelButton() {
    router.push("../kontak/tabel-kontak");
  }

  return (
    <Layout>
      <Head>
        <title>Tabel Kontak</title>
      </Head>
      <Formik
        initialValues={{
          namaPanggilan: "",
          gelar: "",
          nama: "",
          nomorHp: "",
          tipeIdentitas: "",
          nomorIdentitas: "",
          email: "",
          infoLain: "-",
          namaPerusahaan: "",
          nomorTelepon: "",
          nomorFax: "-",
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
        validationSchema={KontakSchema}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(api_create_kontak, values)
            .then(function (response) {
              console.log(response);
              router.push("../kontak/tabel-kontak");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../kontak/tabel-kontak">
                  Kontak List
                </Link>
                <Typography color="textPrimary">Buat Kontak Baru</Typography>
              </Breadcrumbs>

              <h2>Buat Kontak Baru</h2>
            </div>

            <div>
              <Card className="mt-4">
                <Card.Body>
                  <Form>
                    <Row className="mb-2">
                      <Col sm="4">
                        <h3>
                          <PermIdentityOutlinedIcon fontSize="large" />
                          Informasi Kontak
                        </h3>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Nama Panggilan</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="namaPanggilan"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.namaPanggilan && props.touched.namaPanggilan ? (
                          <div class="text-red-500 text-sm">{props.errors.namaPanggilan}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Tipe Kontak (dapat lebih dari 1)</label>
                      </Col>
                      <Col sm="10" class="ml-8">
                        <div role="group" aria-labelledby="checkbox-group">
                          <Row>
                            <label className="ml-3 mr-2">
                              <Field type="checkbox" name="menu" value="1" /> Supplier
                            </label>

                            <label className="mr-2">
                              <Field type="checkbox" name="menu" value="2" /> Pelanggan
                            </label>

                            <label className="mr-2">
                              <Field type="checkbox" name="menu" value="3" /> Karyawan
                            </label>

                            <label className="mr-2">
                              <Field type="checkbox" name="menu" value="4" /> Lainnya
                            </label>
                          </Row>
                          {props.errors.menu && props.touched.menu ? (
                            <div class="text-red-500 text-sm">{props.errors.menu}</div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="4">
                        <h3>
                          <BusinessCenterOutlinedIcon fontSize="large" />
                          Informasi Kontak
                        </h3>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Nama Kontak</label>
                      </Col>
                      <Col sm="10">
                        <Row>
                          <Col sm="2">
                            <Form.Control
                              as="select"
                              defaultValue="Choose..."
                              name="gelar"
                              onChange={props.handleChange}
                              onBLur={props.handleBlur}
                            >
                              <option>Pilih</option>
                              <option value="Mr.">Mr. </option>
                              <option value="Ms.">Ms. </option>
                              <option value="Mrs.">Mrs. </option>
                            </Form.Control>
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder="-"
                              type="text"
                              name="nama"
                              onChange={props.handleChange}
                              onBLur={props.handleBlur}
                            />
                            {props.errors.nama && props.touched.nama ? (
                              <div class="text-red-500 text-sm">{props.errors.nama}</div>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Handphone</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="nomorHp"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.nomorHp && props.touched.nomorHp ? (
                          <div class="text-red-500 text-sm">{props.errors.nomorHp}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Identitas</label>
                      </Col>
                      <Col>
                        <Row>
                          <Col sm="2">
                            <Form.Control
                              as="select"
                              defaultValue="Choose..."
                              name="tipeIdentitas"
                              onChange={props.handleChange}
                              onBLur={props.handleBlur}
                            >
                              <option>Pilih</option>
                              <option value="Passport">Passport</option>
                              <option value="KTP">KTP</option>
                              <option value="SIM">SIM</option>
                              <option value="BPJS">BPJS</option>
                            </Form.Control>
                            {/* {props.errors.tipeIdentitas && props.touched.tipeIdentitas ? (
                              <div class="text-red-500 text-sm">{props.errors.tipeIdentitas}</div>
                            ) : null} */}
                          </Col>
                          <Col>
                            <Form.Control
                              placeholder="-"
                              type="text"
                              name="nomorIdentitas"
                              onChange={props.handleChange}
                              onBLur={props.handleBlur}
                            />
                            {props.errors.nomorIdentitas && props.touched.nomorIdentitas ? (
                              <div class="text-red-500 text-sm">{props.errors.nomorIdentitas}</div>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Email</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="email"
                          name="email"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.email && props.touched.email ? (
                          <div class="text-red-500 text-sm">{props.errors.email}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Info Lain</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="infoLain"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.infoLain && props.touched.infoLain ? (
                          <div class="text-red-500 text-sm">{props.errors.infoLain}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Nama Perusahaan</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="namaPerusahaan"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.namaPerusahaan && props.touched.namaPerusahaan ? (
                          <div class="text-red-500 text-sm">{props.errors.namaPerusahaan}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Telepon</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="nomorTelepon"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.nomorTelepon && props.touched.nomorTelepon ? (
                          <div class="text-red-500 text-sm">{props.errors.nomorTelepon}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Fax</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="nomorFax"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.nomorFax && props.touched.nomorFax ? (
                          <div class="text-red-500 text-sm">{props.errors.nomorFax}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>NPWP</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="nomorNpwp"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.nomorNpwp && props.touched.nomorNpwp ? (
                          <div class="text-red-500 text-sm">{props.errors.nomorNpwp}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Alamat Pembayaran</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="alamatPembayaran"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.alamatPembayaran && props.touched.alamatPembayaran ? (
                          <div class="text-red-500 text-sm">{props.errors.alamatPembayaran}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Alamat Pengiriman</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="alamatPengiriman"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.alamatPengiriman && props.touched.alamatPengiriman ? (
                          <div class="text-red-500 text-sm">{props.errors.alamatPengiriman}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="4">
                        <h3>
                          <AccountBalanceOutlinedIcon fontSize="large" />
                          Informasi Kontak
                        </h3>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <h5>Akun Bank</h5>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Nama Bank</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="namaBank"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.namaBank && props.touched.namaBank ? (
                          <div class="text-red-500 text-sm">{props.errors.namaBank}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Kantor Cabang Bank</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="kantorCabangBank"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.kantorCabangBank && props.touched.kantorCabangBank ? (
                          <div class="text-red-500 text-sm">{props.errors.kantorCabangBank}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Pemegang Akun Bank</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="pemegangAkunBank"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.pemegangAkunBank && props.touched.pemegangAkunBank ? (
                          <div class="text-red-500 text-sm">{props.errors.pemegangAkunBank}</div>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Nomor Rekening</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          placeholder="-"
                          type="text"
                          name="nomorRekening"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        />
                        {props.errors.nomorRekening && props.touched.nomorRekening ? (
                          <div class="text-red-500 text-sm">{props.errors.nomorRekening}</div>
                        ) : null}
                      </Col>
                      {/* <Col sm='12'>
                        <Button className='mb-2 mt-4' variant='outline-primary' block>
                          <AddIcon fontSize='small' />
                          Tambah Bank Lain
                        </Button>
                      </Col> */}
                    </Row>

                    <Row className="mb-2">
                      <Col sm="4">
                        <h3>
                          <InsertDriveFileOutlinedIcon fontSize="large" />
                          Informasi Kontak
                        </h3>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Akun Piutang</label>
                      </Col>
                      <Col sm="10">
                        <Field options={data} name="akunPiutang" component={SelectField} />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Akun Hutang</label>
                      </Col>
                      <Col sm="10">
                        <Field options={data2} name="akunHutang" component={SelectField2} />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Syarat Pembayaran Utama</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          as="select"
                          defaultValue="Choose..."
                          name="syaratPembayaranUtama"
                          onChange={props.handleChange}
                          onBLur={props.handleBlur}
                        >
                          <option>Pilih</option>
                          <option value="1">Tunai / Cash</option>
                          <option value="2">Kredit / Term of Payment</option>
                          <option value="3">15 hari</option>
                          <option value="4">30 hari</option>
                          <option value="5">End of Month (EOM)</option>
                        </Form.Control>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="d-flex justify-content-end mt-10">
                        <Button variant="danger mr-2" onClick={cancelButton}>
                          Batal
                        </Button>
                        <Link href="/kontak/informasi-kontak">
                          <Button variant="success" type="submit" onClick={props.handleSubmit}>
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
  const akun_piutang = await prisma.akun.findMany({
    where: {
      kategoriId: 1,
    },
  });

  let akun_piutang2 = [];
  akun_piutang.map((i) => {
    akun_piutang2.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const akun_hutang = await prisma.akun.findMany({
    where: {
      kategoriId: 8,
    },
  });

  let akun_hutang2 = [];
  akun_hutang.map((i) => {
    akun_hutang2.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  return {
    props: {
      data: akun_piutang2,
      data2: akun_hutang2,
    },
  };
}
