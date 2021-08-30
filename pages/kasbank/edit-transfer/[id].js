import React, { useState, useRef } from "react";
import Layout from "../../../components/layout";
import Link from "next/link";
import { Button, Table, DropdownButton, FormControl, InputGroup, Dropdown, Row, Col, Form, Card } from "react-bootstrap";
import AttachmentIcon from "@material-ui/icons/Attachment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

// const TransferUangSchema = Yup.object().shape({
//     bankPengirim: Yup.string()
//       .required('Required'),
//     bankPenerima : Yup.string().required('Required'),
//     // lastName: Yup.string()
//     //   .min(2, 'Too Short!')
//     //   .max(50, 'Too Long!')
//     //   .required('Required'),
//     // email: Yup.string().email('Invalid email').required('Required'),
//   });

export default function tranfer_uang({ data, data2, transfer }) {
  // const router = useRouter();
  // const url = "http://localhost:3000/api/kasbank/createTransferUang";

  const updateTransferUang = "http://localhost:3000/api/kasbank/updateTransferUang";

  // Redirect Function and Take URL Parameter [id]
  const router = useRouter();
  const { id } = router.query;

  // Get Existing User data based on [id]
  const formikref = useRef(null);

  // Batal Button Function
  function cancelButton() {
    router.push("");
  }

  return (
    <Layout>
      <Formik
        enableReinitialize={true}
        innerRef={formikref}
        initialValues={{
          akun_transfer_id: transfer[0].akun_transfer_id,
          akun_setor_id: transfer[0].akun_setor_id,
          jumlah: transfer[0].jumlah,
          memo: transfer[0].memo,
          no_transaksi: transfer[0].no_transaksi,
          tgl_transaksi: transfer[0].tgl_transaksi,
          tag: transfer[0].tag,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(updateTransferUang, values)
            .then(function (response) {
              console.log(response);
              router.push("");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div variant="container">
              <div class="text-md font-medium text-gray-900 mb-2">Transaksi</div>
              <h4 class="mt-2 mb-5">Transfer Uang</h4>

              <div class="mb-10">
                <Row>
                  <Col>
                    <Form.Label>Transfer dari</Form.Label>
                    <Form.Control
                      as="select"
                      name="akun_transfer"
                      value={props.values.akun_transfer_id}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    >
                      <option value="0">Pilih</option>
                      {data.map((akun, index) => (
                        <option key={index} value={akun.id}>
                          {akun.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                    {props.errors.akun_transfer && props.touched.akun_transfer ? <div>{props.errors.akun_transfer}</div> : null}
                  </Col>

                  <Col>
                    <Form.Label>Setor ke</Form.Label>
                    <Form.Control
                      as="select"
                      name="akun_setor"
                      value={props.values.akun_setor_id}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    >
                      <option value="0">Pilih</option>
                      {data.map((akun, index) => (
                        <option key={index} value={akun.id}>
                          {akun.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                    {props.errors.akun_setor && props.touched.akun_setor ? <div>{props.errors.akun_setor}</div> : null}
                  </Col>

                  <Col>
                    <Form.Label>Jumlah</Form.Label>
                    <Form.Control
                      value={props.values.jumlah}
                      placeholder=""
                      name="jumlah"
                      onChange={(e) => props.setFieldValue((props.values.jumlah = parseInt(e.target.value)))}
                    />
                  </Col>
                </Row>
              </div>

              <div class="mb-10">
                <Row>
                  <Col>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Memo</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="memo"
                        placeholder="Isi Memo"
                        value={props.values.memo}
                        onChange={props.handleChange}
                      />
                      {props.errors.memo && props.touched.memo ? <div>{props.errors.memo}</div> : null}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Label>Nomor Transaksi</Form.Label>
                    <Form.Control placeholder={"Auto " + "(" + id + ")"} name="no_transaksi" disabled value={props.values.no_transaksi} />
                  </Col>

                  <Col>
                    <Form.Label>Tanggal Transaksi</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder=""
                        value={props.values.tgl_transaksi}
                        type="date"
                        aria-label="date"
                        name="tgl_transaksi"
                        onChange={props.handleChange}
                      />
                      {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                    </InputGroup>
                  </Col>

                  <Col>
                    <Form.Label>Tag</Form.Label>
                    <Form.Control placeholder="" value={props.values.tag} name="tag" onChange={props.handleChange} />
                  </Col>
                </Row>
              </div>

              <div class="mb-10">
                <Row>
                  <Col>
                    {/* <div>
                <Form.Label>
                  <AttachmentIcon />  Lampiran
                </Form.Label>  
                
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
                <Button variant="danger mr-2">
                  <HighlightOffIcon fontSize="medium" /> Batal
                </Button>
                <Link href="/kasbank/banktransfer">
                  <Button variant="success" type="submit" onClick={props.handleSubmit}>
                    <CheckCircleIcon fontSize="medium" /> Buat Transferan
                  </Button>
                </Link>
              </div>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const akunKasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  const transferUang = await prisma.transferUang.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const transfer = await prisma.transferUang.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun_setor: true,
      akun_transfer: true,
    },
  });

  return {
    props: {
      data: akunKasBank,
      data2: transferUang,
      transfer: transfer,
    },
  };
}
