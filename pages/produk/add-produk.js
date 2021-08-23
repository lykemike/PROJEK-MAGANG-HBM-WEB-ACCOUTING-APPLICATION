import React from "react";
import Layout from "../../components/Layout";
import { Button, Form, Col, Row, FormCheck, Card } from "react-bootstrap";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function addProduk({ data, data2, data3, data5 }) {
  // Form Validation
  const ProdukSchema = Yup.object().shape({
    file_upload: Yup.string().required("required"),
    nama: Yup.string().required("required"),
    kode_sku: Yup.string().required("required"),
    kategori_produk_id: Yup.string().required("required"),
    unit: Yup.number().integer().required("required"),
    deskripsi: Yup.string().required("required"),
    hbs: Yup.number().integer().required("required"),
    akun_pembelian: Yup.number().integer().required("required"),
    pajak_beli: Yup.string().required("required"),
    hjs: Yup.number().integer().required("required"),
    akun_penjualan: Yup.number().integer().required("required"),
    pajak_jual: Yup.string().required("required"),
  });

  // Produk Api
  const url = "http://localhost:3000/api/produk/createProduk";

  // Redirect
  const router = useRouter();

  // Batal Button Function
  function cancelButton() {
    router.push("../produk/tabel-produk");
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          file_upload: [],
          nama: "",
          kode_sku: "",
          kategori_produk: "",
          unit: "",
          quantity: 0,
          deskripsi: "",
          hbs: 0,
          akun_pembelian: 1,
          hjs: 0,
          akun_penjualan: 1,
          beli_disable: true,
          jual_disable: true,
        }}
        // validationSchema={ProdukSchema}
        onSubmit={async (values) => {
          let formData = new FormData();
          for (var key in values) {
            formData.append(`${key}`, `${values[key]}`);
          }
          Array.from(values.file_upload).map((i) => formData.append("file", i));
          console.log(values);
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              router.push("../produk/tabel-produk");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <Form>
              <Row className='ml-2 mb-4'>
                <LocalMallIcon fontSize='large' />
                <h3>Buat Produk / Jasa Baru</h3>
              </Row>
              <Card>
                <Card.Body>
                  <h4>Info Product / Service</h4>

                  {/* Gambar */}
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Gambar</Form.Label>
                    </Col>
                    <Col sm='4'>
                      {/* <Form.File className="mb-2" id="formcheck-api-regular" name="file_upload" onChange={props.handleChange}>
												<Form.File.Input />
											</Form.File> */}
                      {/* <Form.Control className="mb-2" placeholder="" name="file_upload" onChange={props.handleChange} />
											{props.errors.file_upload && props.touched.file_upload ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.file_upload}</div>
												: null} */}
                      <Form.File type='file' name='file_upload' accept='image/*' onChange={(e) => props.setFieldValue("file_upload", e.target.files)} />
                      {props.errors.file_upload && props.touched.file_upload ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.file_upload}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  {/* Nama */}
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Nama</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control className='mb-2' placeholder='' name='nama' onChange={props.handleChange} />
                      {props.errors.nama && props.touched.nama ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.nama}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  {/* Kode / SKU */}
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Kode / SKU</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control className='mb-2' placeholder='' name='kode_sku' onChange={props.handleChange} />
                      {props.errors.kode_sku && props.touched.kode_sku ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.kode_sku}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  {/* Kategori */}
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Kategori</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control className='mb-2' as='select' name='kategori_produk' onChange={props.handleChange}>
                        {/* loop over kategori and show them */}
                        <option value='0'>Pilih</option>
                        {data3.map((kategoriProduk) => (
                          <option key={kategoriProduk.id} value={kategoriProduk.id}>
                            {kategoriProduk.nama}
                          </option>
                        ))}
                      </Form.Control>
                      {props.errors.kategori_produk && props.touched.kategori_produk ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.kategori_produk}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  {/* Unit */}
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Unit</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control className='mb-2' as='select' name='unit' onChange={props.handleChange}>
                        <option value='0'>Pilih Unit</option>
                        {data5.map((satuanProduk) => (
                          <option key={satuanProduk.id} value={satuanProduk.id}>
                            {satuanProduk.satuan}
                          </option>
                        ))}
                      </Form.Control>
                      {props.errors.unit && props.touched.unit ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.unit}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  {/* Quantity */}
                  <Row className='mb-3'>
                    <Col sm='2'>
                      <Form.Label>Quantity</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control type='number' name='quantity' onChange={props.handleChange} />
                    </Col>
                  </Row>

                  {/* Deskripsi */}
                  <Row className='mb-12'>
                    <Col sm='2'>
                      <Form.Label>Deskripsi</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control className='mb-2' placeholder='' name='deskripsi' onChange={props.handleChange} />
                      {props.errors.deskripsi && props.touched.deskripsi ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.deskripsi}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <h4>Harga</h4>
                  <hr />
                  <Row className='ml-2'>
                    <FormCheck
                      onChange={(e) => {
                        if (e.target.checked == true) {
                          props.setFieldValue(`beli_disable`, false);
                          
                        } else {
                          props.setFieldValue(`beli_disable`, true);
                        }
                      }}
                    />
                    <h5>Saya Beli Produk Ini</h5>
                  </Row>
                  <hr />

                  <Row sm='6'>
                    <Col>
                      <Form.Label>Harga Beli Satuan</Form.Label>
                      <Form.Control disabled={props.values.beli_disable} className='mb-2' placeholder='Rp. 0,00' name='hbs' onChange={props.handleChange} />
                      {props.errors.hbs && props.touched.hbs ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.hbs}
                        </div>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label>Akun Pembelian</Form.Label>
                      <Form.Control disabled={props.values.beli_disable} className='mb-2' as='select' name='akun_pembelian' onChange={props.handleChange}>
                        <option value='0'>Pilih</option>
                        {data.map((akunPembelian) => (
                          <option key={akunPembelian.id} value={akunPembelian.id}>
                            {akunPembelian.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                      {props.errors.akun_pembelian && props.touched.akun_pembelian ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.akun_pembelian}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <hr />
                  <Row className='ml-2'>
                    <FormCheck
                      onChange={(e) => {
                        if (e.target.checked == true) {
                          props.setFieldValue(`jual_disable`, false);
                        } else {
                          props.setFieldValue(`jual_disable`, true);
                        }
                      }}
                    />
                    <h5>Saya Jual Produk Ini</h5>
                  </Row>
                  <hr />

                  <Row sm='6'>
                    <Col>
                      <Form.Label>Harga Jual Satuan</Form.Label>
                      <Form.Control disabled={props.values.jual_disable} className='mb-2' placeholder='Rp. 0,00' name='hjs' onChange={props.handleChange} />
                      {props.errors.hjs && props.touched.hjs ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.hjs}
                        </div>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label>Akun Penjualan</Form.Label>
                      <Form.Control 
                      disabled={props.values.jual_disable} 
                      className='mb-2' 
                      as='select' 
                      name='akun_penjualan' 
                      onChange={props.handleChange}>
                        <option value='0'>Pilih</option>
                        {data2.map((akunPenjualan) => (
                          <option key={akunPenjualan.id} value={akunPenjualan.id}>
                            {akunPenjualan.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                      {props.errors.akun_penjualan && props.touched.akun_penjualan ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.akun_penjualan}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row>
                    <Col className='d-flex justify-content-end mt-10'>
                      <Button variant='danger mr-2' onClick={cancelButton}>
                        Batal
                      </Button>
                      <Button variant='success' onClick={props.handleSubmit}>
                        Tambah
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Form>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get kategori akun penjualan and pembelian from akun model
  const getAkunPembelian = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [15, 5],
      },
    },
  });

  const getAkunPenjualan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13],
      },
    },
  });

  const getSatuan = await prisma.satuanProduk.findMany({
    orderBy: {
      satuan: "asc",
    },
  });

  const getKategoriProduk = await prisma.kategoriProduk.findMany();

  return {
    props: {
      data: getAkunPembelian,
      data2: getAkunPenjualan,
      data3: getKategoriProduk,
      data5: getSatuan,
    },
  };
}
