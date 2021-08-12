import React, { useState } from "react";
import Layout from "../../components/layout";
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

export default function tranfer_uang({ data, data2, data3 }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/kasbank/createTransferUang";

  const id = data2 != undefined ? parseInt(data2.id) + 1 : 1;

  const [idInvoice, setIdInvoice] = useState(id);

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_transfer: "",
          akun_setor: "",
          jumlah: "",
          memo: "",
          no_transaksi: 0,
          tgl_transaksi: "",
          tag: "",
        }}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.push(`view-transfer/${idInvoice}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div variant='container'>
              <div class='text-md font-medium text-gray-900 mb-2'>Transaksi</div>
              <h4 class='mt-2 mb-5'>Transfer Uang</h4>

              <div class='mb-10'>
                <Row>
                  <Col>
                    <Form.Label>Transfer dari</Form.Label>
                    <Form.Control as='select' name='akun_transfer' onChange={props.handleChange} onBlur={props.handleBlur}>
                      <option value='kosong'>Pilih</option>
                      {data.map((akun) => (
                        <option key={akun.id} value={akun.id}>
                          {akun.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                    {props.errors.akun_transfer && props.touched.akun_transfer ? <div>{props.errors.akun_transfer}</div> : null}
                  </Col>

                  <Col>
                    <Form.Label>Setor ke</Form.Label>
                    <Form.Control as='select' name='akun_setor' onChange={props.handleChange} onBlur={props.handleBlur}>
                      <option value='kosong'>Pilih</option>
                      {data.map((akun) => (
                        <option key={akun.id} value={akun.id}>
                          {akun.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                    {props.errors.akun_setor && props.touched.akun_setor ? <div>{props.errors.akun_setor}</div> : null}
                  </Col>

                  <Col>
                    <Form.Label>Jumlah</Form.Label>
                    <Form.Control placeholder='Jumlah Uang' name='jumlah' onChange={props.handleChange} />
                  </Col>
                </Row>
              </div>

              <div class='mb-10'>
                <Row>
                  <Col>
                    <Form.Group controlId='exampleForm.ControlTextarea1'>
                      <Form.Label>Memo</Form.Label>
                      <Form.Control as='textarea' rows={3} name='memo' placeholder='Isi Memo' onChange={props.handleChange} />
                      {props.errors.memo && props.touched.memo ? <div>{props.errors.memo}</div> : null}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Label>Nomor Transaksi</Form.Label>
                    <Form.Control placeholder={"Auto"} name='no_transaksi' disabled />
                  </Col>

                  <Col>
                    <Form.Label>Tanggal Transaksi</Form.Label>
                    <InputGroup className='mb-3'>
                      <FormControl placeholder='Pick date' type='date' aria-label='date' name='tgl_transaksi' onChange={props.handleChange} />
                      {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                    </InputGroup>
                  </Col>

                  <Col>
                    <Form.Label>Tag</Form.Label>
                    <Form.Control placeholder='Tag' name='tag' onChange={props.handleChange} />
                  </Col>
                </Row>
              </div>

              <div class='mb-10'>
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

              <div className='float-right'>
                <Button variant='danger mr-2'>
                  <HighlightOffIcon fontSize='medium' /> Batal
                </Button>
                <Link href='/kasbank/banktransfer'>
                  <Button variant='success' type='submit' onClick={props.handleSubmit}>
                    <CheckCircleIcon fontSize='medium' /> Buat Transferan
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

export async function getServerSideProps() {
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

  return {
    props: {
      data: akunKasBank,
      data2: transferUang,
    },
  };
}
