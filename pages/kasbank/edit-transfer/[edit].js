import React from "react";
import Layout from "../../../components/layout";
import { Button, FormControl, InputGroup, Row, Col, Form } from "react-bootstrap";

import { Breadcrumbs, Typography } from "@material-ui/core";

import Select from "react-select";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function tranfer_uang({ data, data2 }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/kasbank/updateTransferUang";

  return (
    <Layout>
      <Formik
        initialValues={{
          id: data2.id,
          akun_transfer: data2.akun_transfer_id,
          akun_setor: data2.akun_setor_id,
          total: data2.total,
          memo: data2.memo,
          tgl_transaksi: data2.tgl_transaksi,
          tag: data2.tag,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              router.push(`../view-transfer/${response.data.id}`);
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
                <Typography color="textPrimary">Transaksi</Typography>
              </Breadcrumbs>
              <h2 className="text-blue-600">Transfer Uang</h2>
            </div>

            <div class="border-b border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <label>Transfer dari</label>
                  <Select
                    options={data}
                    name="akun_transfer"
                    defaultValue={{ label: data2.akun_transfer.kode_akun + " - " + data2.akun_transfer.nama_akun, value: props.values.akun_transfer }}
                    onChange={(e) => {
                      props.setFieldValue("akun_transfer", e.value);
                    }}
                  />
                  {props.errors.akun_transfer && props.touched.akun_transfer ? <div>{props.errors.akun_transfer}</div> : null}
                </Col>

                <Col sm="3">
                  <label>Setor ke</label>
                  <Select
                    options={data}
                    name="akun_setor"
                    defaultValue={{ label: data2.akun_setor.kode_akun + " - " + data2.akun_setor.nama_akun, value: props.values.akun_setor }}
                    onChange={(e) => {
                      props.setFieldValue("akun_setor", e.value);
                    }}
                  />
                  {props.errors.akun_setor && props.touched.akun_setor ? <div>{props.errors.akun_setor}</div> : null}
                </Col>

                <Col sm="3">
                  <label>Total</label>
                  <Form.Control type="number" min="0" value={props.values.total} name="total" onChange={props.handleChange} />
                </Col>
              </Row>
            </div>

            <div class="border-b border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <label>Memo</label>
                    <Form.Control as="textarea" rows={3} name="memo" value={props.values.memo} onChange={props.handleChange} />
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
                    <FormControl value={props.values.tgl_transaksi} type="date" aria-label="date" name="tgl_transaksi" onChange={props.handleChange} />
                    {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                  </InputGroup>
                </Col>

                <Col sm="3">
                  <label>Tag</label>
                  <Form.Control value={props.values.tag} name="tag" onChange={props.handleChange} />
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

export async function getServerSideProps(context) {
  const { edit } = context.query;
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

  const get_transfer_uang = await prisma.transferUang.findFirst({
    where: {
      id: parseInt(edit),
    },
    include: {
      akun_transfer: true,
      akun_setor: true,
    },
  });

  return {
    props: {
      data: akun_kas_bank,
      data2: get_transfer_uang,
    },
  };
}
