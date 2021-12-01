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
import { id } from "date-fns/locale";
const prisma = new PrismaClient();

export default function BuatKontakBaru({ data, data2, data3, data4, data5 }) {
  const router = useRouter();
  const { id } = router.query;

  const api_create_kontak = "http://localhost:3000/api/kontak/updatekontak";

  function cancelButton() {
    router.push("../kontak/tabel-kontak");
  }

  return (
    <Layout>
      <Head>
        <title>Update Kontak</title>
      </Head>
      <Formik
        initialValues={{
          id: id,
          gelar_id: data5[0].gelar.id,
          gelar_nama: data5[0].gelar.nama,
          nama: data5[0].nama,
          nomor_hp: data5[0].nomor_hp,
          email: data5[0].email,
          jabatan: data5[0].jabatan,
          nama_perusahaan: data5[0].nama_perusahaan,
          nomor_telepon: data5[0].nomor_telepon,
          nomor_fax: data5[0].nomor_fax,
          nomor_npwp: data5[0].nomor_npwp,
          alamat_perusahaan: data5[0].alamat_perusahaan,
          nama_bank: data5[0].nama_bank,
          kantor_cabang_bank: data5[0].kantor_cabang_bank,
          nomor_rekening: data5[0].nomor_rekening,
          atas_nama: data5[0].atas_nama,
          akun_piutang_id: data5[0].akun_piutang_id,
          akun_piutang_name: data5[0].akun_piutang_name,
          akun_hutang_id: data5[0].akun_hutang_id,
          akun_hutang_name: data5[0].akun_hutang_name,
          syarat_pembayaran_id: data5[0].syarat_pembayaran_id,
          syarat_pembayaran_nama: data5[0].syarat_pembayaran.nama,
          menu: data5[0].KontakDetail.map((i) => i.kontak_type_id.toString()),
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.put(api_create_kontak, values)
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
                <Typography color="textPrimary">Update Kontak</Typography>
              </Breadcrumbs>
              <h2>Update Kontak</h2>
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
                        <label>Tipe Kontak (dapat lebih dari 1)</label>
                      </Col>
                      <Col sm="10" class="ml-8">
                        <div role="group" aria-labelledby="checkbox-group">
                          <Row>
                            <label className="ml-3 mr-2">
                              <Field type="checkbox" name="menu" value="1" /> Client
                            </label>

                            <label className="mr-2">
                              <Field type="checkbox" name="menu" value="2" /> Supplier
                            </label>

                            <label className="mr-2">
                              <Field type="checkbox" name="menu" value="3" /> Principle
                            </label>

                            <label className="mr-2">
                              <Field type="checkbox" name="menu" value="4" /> Karyawan
                            </label>

                            <label className="mr-2">
                              <Field type="checkbox" name="menu" value="5" /> Lainnya
                            </label>
                          </Row>
                          {props.errors.menu && props.touched.menu ? (
                            <span class="text-xs font-medium text-red-500 required-dot">{props.errors.menu}</span>
                          ) : null}
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="4">
                        <h3>
                          <BusinessCenterOutlinedIcon fontSize="large" />
                          Informasi Umum
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
                            <Select
                              defaultValue={{ value: props.values.gelar_id, label: props.values.gelar_nama }}
                              options={data3}
                              name="gelar"
                              onChange={(e) => {
                                props.setFieldValue((props.values.gelar_id = e.value));
                              }}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              value={props.values.nama}
                              type="text"
                              name="nama"
                              onChange={(e) => {
                                let input = e.target.value;
                                let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                                props.setFieldValue((props.values.nama = input2));
                              }}
                              onBlur={props.handleBlur}
                            />
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
                          value={props.values.nomor_hp}
                          type="text"
                          name="nomor_hp"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Email</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.email}
                          name="email"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                        {props.errors.email && props.touched.email ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.email}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Jabatan</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.jabatan}
                          type="text"
                          name="jabatan"
                          onBlur={props.handleBlur}
                          onChange={(e) => {
                            let input = e.target.value;
                            let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                            props.setFieldValue((props.values.jabatan = input2));
                          }}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Nama Perusahaan</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.nama_perusahaan}
                          type="text"
                          name="nama_perusahaan"
                          onBlur={props.handleBlur}
                          onChange={(e) => {
                            let input = e.target.value;
                            let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                            props.setFieldValue((props.values.nama_perusahaan = input2));
                          }}
                        />
                        {props.errors.nama_perusahaan && props.touched.nama_perusahaan ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.nama_perusahaan}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Telepon</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.nomor_telepon}
                          type="text"
                          name="nomor_telepon"
                          onBlur={props.handleBlur}
                          onChange={props.handleChange}
                        />
                        {props.errors.nomor_telepon && props.touched.nomor_telepon ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.nomor_telepon}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Fax</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.nomor_fax}
                          type="text"
                          name="nomor_fax"
                          onBlur={props.handleBlur}
                          onChange={props.handleChange}
                        />
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>NPWP</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.nomor_npwp}
                          type="text"
                          name="nomor_npwp"
                          onBlur={props.handleBlur}
                          onChange={props.handleChange}
                        />
                        {props.errors.nomor_npwp && props.touched.nomor_npwp ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.nomor_npwp}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Alamat Perusahaan</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.alamat_perusahaan}
                          as="textarea"
                          rows="2"
                          name="alamat_perusahaan"
                          onBlur={props.handleBlur}
                          onChange={(e) => {
                            let input = e.target.value;
                            let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                            props.setFieldValue((props.values.alamat_perusahaan = input2));
                          }}
                        />
                        {props.errors.alamat_perusahaan && props.touched.alamat_perusahaan ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.alamat_perusahaan}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="4">
                        <h3>
                          <AccountBalanceOutlinedIcon fontSize="large" />
                          Daftar Bank
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
                          value={props.values.nama_bank}
                          type="text"
                          name="nama_bank"
                          onBlur={props.handleBlur}
                          onChange={(e) => {
                            let input = e.target.value;
                            let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                            props.setFieldValue((props.values.nama_bank = input2));
                          }}
                        />
                        {props.errors.nama_bank && props.touched.nama_bank ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.nama_bank}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Kantor Cabang Bank</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.kantor_cabang_bank}
                          as="textarea"
                          rows="2"
                          name="kantor_cabang_bank"
                          onBlur={props.handleBlur}
                          onChange={(e) => {
                            let input = e.target.value;
                            let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                            props.setFieldValue((props.values.kantor_cabang_bank = input2));
                          }}
                        />
                        {props.errors.kantor_cabang_bank && props.touched.kantor_cabang_bank ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.kantor_cabang_bank}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Nomor Rekening</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.nomor_rekening}
                          type="text"
                          name="nomor_rekening"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                        {props.errors.nomor_rekening && props.touched.nomor_rekening ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.nomor_rekening}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Atas Nama</label>
                      </Col>
                      <Col sm="10">
                        <Form.Control
                          value={props.values.atas_nama}
                          type="text"
                          name="atas_nama"
                          onBlur={props.handleBlur}
                          onChange={(e) => {
                            let input = e.target.value;
                            let input2 = input.charAt(0).toUpperCase() + input.slice(1);
                            props.setFieldValue((props.values.atas_nama = input2));
                          }}
                        />
                        {props.errors.atas_nama && props.touched.atas_nama ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.atas_nama}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="10">
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
                        <Select
                          defaultValue={{ value: props.values.akun_piutang_id, label: props.values.akun_piutang_name }}
                          options={data}
                          onChange={(e) => {
                            props.setFieldValue(`akun_piutang_id`, e.value);
                            props.setFieldValue(`akun_piutang_name`, e.label);
                          }}
                        />
                        {props.errors.akun_piutang_name && props.touched.akun_piutang_name ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.akun_piutang_name}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Akun Hutang</label>
                      </Col>
                      <Col sm="10">
                        <Select
                          defaultValue={{ value: props.values.akun_hutang_id, label: props.values.akun_hutang_name }}
                          options={data2}
                          onChange={(e) => {
                            props.setFieldValue(`akun_hutang_id`, e.value);
                            props.setFieldValue(`akun_hutang_name`, e.label);
                          }}
                        />
                        {props.errors.akun_hutang_name && props.touched.akun_hutang_name ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.akun_hutang_name}</span>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mb-2">
                      <Col sm="2">
                        <label>Syarat Pembayaran Utama</label>
                      </Col>
                      <Col sm="10">
                        <Select
                          defaultValue={{ value: props.values.syarat_pembayaran_id, label: props.values.syarat_pembayaran_nama }}
                          options={data4}
                          name="syarat_pembayaran_id"
                          onChange={(e) => {
                            props.setFieldValue(`syarat_pembayaran_id`, e.value);
                          }}
                        />
                        {props.errors.syarat_pembayaran_id && props.touched.syarat_pembayaran_id ? (
                          <span class="text-xs font-medium text-red-500 required-dot">{props.errors.syarat_pembayaran_id}</span>
                        ) : null}
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

export async function getServerSideProps(context) {
  const { id } = context.query;

  const akun_piutang = await prisma.akun.findMany({
    where: {
      kategoriId: 1,
    },
  });

  let akun_piutang2 = [];
  akun_piutang.map((i) => {
    akun_piutang2.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
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
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  const get_gelar = await prisma.gelar.findMany({});
  let gelar = [];
  get_gelar.map((i) => {
    gelar.push({
      value: i.id,
      label: i.nama,
    });
  });

  const get_syarat_pembayaran = await prisma.syaratPembayaran.findMany();
  let syarat_pembayaran = [];
  get_syarat_pembayaran.map((i) => {
    syarat_pembayaran.push({
      value: i.id,
      label: i.nama,
    });
  });

  const get_kontak = await prisma.kontak.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      gelar: true,
      syarat_pembayaran: true,
      piutang: true,
      hutang: true,
      KontakDetail: {
        select: {
          kontak_type_id: true,
        },
      },
    },
  });
  return {
    props: {
      data: akun_piutang2,
      data2: akun_hutang2,
      data3: gelar,
      data4: syarat_pembayaran,
      data5: get_kontak,
    },
  };
}
