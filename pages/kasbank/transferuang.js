import React, { useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Button, Table, DropdownButton, FormControl, InputGroup, Dropdown, Row, Col, Form, Card } from "react-bootstrap";
import AttachmentIcon from "@material-ui/icons/Attachment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Tables,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";

import Select from "react-select";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

// const TransferUangSchema = Yup.object().shape({
//   akun_transfer: Yup.string().required("Harus Pilih Akun"),
//   akun_setor: Yup.string().required("Harus Pilih Akun"),
//   total: Yup.string().required("Input total"),
//   tgl_transaksi: Yup.string().required("Pilih tanggal"),
//   // lastName: Yup.string()
//   //   .min(2, 'Too Short!')
//   //   .max(50, 'Too Long!')
//   //   .required('Required'),
//   // email: Yup.string().email('Invalid email').required('Required'),
// });

export default function tranfer_uang({ data, data2, data3 }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/kasbank/createTransferUang";

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_transfer: "",
          akun_setor: "",
          total: "",
          memo: "-",
          tgl_transaksi: current,
          tag: "-",
        }}
        // validationSchema={TransferUangSchema}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              // router.push(`view-transfer/${response.data.id.id}`);
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
                <Link color="inherit" href="../kasbank/kasbankhome">
                  Transaksi
                </Link>
                <Typography color="textPrimary">Buat Transfer Uang</Typography>
              </Breadcrumbs>
              <h2 className="text-blue-600">Kirim Uang</h2>
            </div>

            <div class="border-b border-gray-200">
              <Row className="py-2">
                <Col sm="4">
                  <label>Transfer dari</label>
                  <Select
                    options={data}
                    name="akun_transfer"
                    onChange={(e) => {
                      props.setFieldValue("akun_transfer", e.value);
                    }}
                  />
                  {props.errors.akun_transfer && props.touched.akun_transfer ? <div>{props.errors.akun_transfer}</div> : null}
                </Col>

                <Col sm="4">
                  <label>Setor ke</label>
                  <Select
                    options={data}
                    name="akun_setor"
                    onChange={(e) => {
                      props.setFieldValue("akun_setor", e.value);
                    }}
                  />
                  {props.errors.akun_setor && props.touched.akun_setor ? <div>{props.errors.akun_setor}</div> : null}
                </Col>

                <Col sm="4">
                  <label>Total</label>
                  <Form.Control type="number" min="0" placeholder="Rp. 0, 00" name="total" onChange={props.handleChange} />
                </Col>
              </Row>
            </div>

            <div class="border-b border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <label>Memo</label>
                    <Form.Control as="textarea" rows={3} name="memo" placeholder="-" onChange={props.handleChange} />
                    {props.errors.memo && props.touched.memo ? <div>{props.errors.memo}</div> : null}
                  </Form.Group>
                </Col>

                <Col sm="3">
                  <label>Nomor Transaksi</label>
                  <Form.Control placeholder={"Auto"} name="no_transaksi" disabled />
                </Col>

                <Col sm="3">
                  <label>Tanggal Transaksi</label>
                  <InputGroup className="mb-3">
                    <FormControl
                      value={props.values.tgl_transaksi}
                      type="date"
                      aria-label="date"
                      name="tgl_transaksi"
                      onChange={props.handleChange}
                    />
                    {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                  </InputGroup>
                </Col>

                <Col sm="3">
                  <label>Tag</label>
                  <Form.Control placeholder="-" name="tag" onChange={props.handleChange} />
                </Col>
              </Row>
            </div>

            <div class="mb-10">
              <Row>
                <Col>
                  {/* <div>
                <label>
                  <AttachmentIcon />  Lampiran
                </label>  
                
                <Card border="secondary" style={{ width: '15rem' }}>
						<p>
						     Tarik file ke sini, atau   
                        <Card.Link href="#"> pilih file</Card.Link>
                        </p>
                        <p>
						    Ukuran Max 10MB
						</p>
					</Card>
                </div> */}
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>

            <div className="float-right">
              <Button variant="danger mr-2">Batal</Button>

              <Button variant="success" type="submit" onClick={props.handleSubmit}>
                Buat Transferan
              </Button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const get_akun_kas_bank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun_kas_bank = [];
  get_akun_kas_bank.map((i) =>
    akun_kas_bank.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    })
  );

  return {
    props: {
      data: akun_kas_bank,
    },
  };
}
