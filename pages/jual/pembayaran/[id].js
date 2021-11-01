import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, Form, Button, FormCheck, Table, InputGroup } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";

import {
  Breadcrumbs,
  Table as Tables,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core/";

import Select from "react-select";
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
    router.push(`../pembayaran/view/${id}`);
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
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="../jual/penjualan">
                Transaksi
              </Link>
              <Typography color="textPrimary">Penerimaan Pembayaran</Typography>
            </Breadcrumbs>
            <h2 className="text-blue-600">Penerimaan Pembayaran</h2>

            <div className="border-t border-gray-200">
              <Form>
                <Row className="mt-2">
                  {data.map((i) => (
                    <Col sm="3">
                      <label>Pelanggan</label>
                      <Form.Control placeholder={i.kontak.nama} disabled />
                    </Col>
                  ))}

                  <Col sm="3">
                    <label>Setor Ke</label>
                    <Select
                      options={data2}
                      name="setor_ke"
                      onChange={(e) => {
                        props.setFieldValue("setor_ke", e.value);
                      }}
                    />
                  </Col>
                  <Col className="d-flex justify-content-end mr-3">
                    <Row className="mt-4">
                      <h4 className="mr-2">Total</h4>
                      <h4 name="total">Rp. {props.values.jumlah}</h4>
                    </Row>
                  </Col>
                </Row>

                <hr />

                <Row sm="12">
                  <Col sm="3">
                    <label>Cara Pembayaran</label>
                    <Form.Control as="select" name="carapembayaran" onChange={props.handleChange}>
                      <option value="kosong">Pilih</option>
                      <option value="Kas Tunai">Kas Tunai</option>
                      <option value="Cek dan Giro">Cek dan Giro</option>
                      <option value="Transfer Bank">Transfer Bank</option>
                      <option value="Kartu Kredit">Kartu Kredit</option>
                    </Form.Control>
                  </Col>

                  <Col sm="3">
                    <label>Tanggal Pembayaran</label>
                    <Form.Control placeholder="" type="date" name="tgl_pembayaran" onChange={props.handleChange} />
                  </Col>

                  <Col sm="3">
                    <label>Tanggal Jatuh Tempo</label>
                    <Form.Control placeholder="" type="date" name="tgl_jatuh_tempo" onChange={props.handleChange} />
                  </Col>

                  <Col sm="3">
                    <label>No. Transaksi</label>
                    <Form.Control placeholder={"Purchase Invoice #" + data[0].id} disabled />
                  </Col>
                </Row>

                <Row sm="12">
                  <Col />
                  <Col />
                  <Col />

                  <Col sm="3">
                    <label>Tag</label>
                    <Form.Control placeholder={data[0].tag} disabled />
                  </Col>
                </Row>

                <hr />

                <Table responsive>
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th>Nomor</th>
                      <th>Deskripsi</th>
                      <th>Tanggal Jatuh Tempo</th>
                      <th>Total Tagihan</th>
                      <th>Sisa Tagihan</th>
                      <th>Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((i, index) => (
                      <tr key={index}>
                        <td>Purchase Invoice #{i.id}</td>
                        <td>{i.memo}</td>
                        <td>{i.tgl_jatuh_tempo}</td>
                        <td>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</td>
                        <td>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</td>
                        <td>
                          <InputGroup>
                            <InputGroup.Append>
                              <InputGroup.Text>Rp. </InputGroup.Text>
                            </InputGroup.Append>
                            <Form.Control
                              type="number"
                              name="jumlah"
                              min="0"
                              onChange={(e) => {
                                props.setFieldValue("jumlah", e.target.value);
                                const total = i.sisa_tagihan - e.target.value;

                                props.setFieldValue("total", parseInt(total));
                              }}
                            />
                          </InputGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <hr />

                <Row className="mt-7">
                  <Col sm="4" />

                  <Col sm="4" />

                  <Col sm="4">
                    <Row>
                      <Col sm="8" className="d-flex justify-content-end">
                        <h5>Total</h5>
                      </Col>
                      <Col sm="4">
                        <h5 name="total">Rp. {parseInt(props.values.jumlah).toLocaleString({ minimumFractionDigits: 0 })}</h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col className="d-flex justify-content-end mt-10">
                    {/* <Button variant='primary mr-2' onClick={pembayaran}>
                    Invoice
                  </Button> */}
                    <Link href="/jual/penjualan">
                      <Button variant="danger mr-2">Batal</Button>
                    </Link>
                    <Button variant="success" onClick={props.handleSubmit}>
                      Bayar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
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

  const get_akun_setor_ke = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun_setor_ke = [];
  get_akun_setor_ke.map((i) => {
    akun_setor_ke.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  return {
    props: {
      data: header,
      data2: akun_setor_ke,
    },
  };
}
