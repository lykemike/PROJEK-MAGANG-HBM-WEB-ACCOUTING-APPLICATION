import React,{useState} from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown , Row , Col, Form, Card, InputGroup,FormControl} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EventNoteIcon from '@material-ui/icons/EventNote';


import * as Yup from 'yup'
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// const KirimUangSchema = Yup.object().shape({
//     bank: Yup.string().required('Required'),
//     penerima : Yup.string().required('Required')
//   });

 export default function kirim_uang({data}) {
	const router = useRouter();

	// const url = "http://localhost:3000/api/";

    return (
            <Layout>
                <Formik
                    initialValues={{
                        setor_ke : '',
                        pembayar : "",
                        tgl_transaksi: "",
                        no_transaksi: "",
                        tag: "",
                        pembayaran_akun: "",
                        deskripsi: "",
                        pajak: "",
                        jumlah: 0,
                        memo: "",
                        subtotal: "",
                        total: ""
                    }}
                    onSubmit={async (values) => {
                        // alert(JSON.stringify(values, null, 2));
                        // console.log(values)
                        Axios.post(url, values)
                          .then(function (response) {
                            console.log(response);
                            router.push("");
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      }}>

                    {(props) => (
                        <Forms noValidate>
                          <div variant="container">
                        <div class="text-md font-medium text-gray-900 mb-2">
                            Transaksi</div>
                            <h4 class="mt-2 mb-5">
                                Terima Uang
                                </h4>
                
                        <div class="mb-10">
                            <Row>
                                <Col >
                                <Form.Label>
                                    Bayar dari
                                    </Form.Label>
                                        <Form.Control as="select" name="setor_ke" onChange={props.handleChange} onBlur={props.handleBlur}>
                                        <option value='kosong'>Pilih</option>
                                        {data.map((akun) => (
                                            <option key={akun.id} value={akun.id}>
                                                {akun.nama_akun}
                                            </option>
                                        ))}
                                        </Form.Control>
                                        {props.errors.setor_ke && props.touched.setor_ke ? <div>{props.errors.setor_ke}</div> : null}
                                </Col>
                                <Col></Col>
                                <Col>
                                <h3>
                                    Total Amount 
                                </h3>
                                <h2 class="text-purple-700 text-opacity-100 ">Rp, 0.00</h2>
                                </Col>
                            </Row>
                        </div>
                
                        <div class="mb-10">
                            <Row>
                                <Col>
                                <Form.Label>
                                    Yang Membayar
                                </Form.Label>
                                    <Form.Control as="select" name="pembayar" onChange={props.handleChange} onBlur={props.handleBlur}>
                                    <option value='kosong'>Pilih</option>
                                        {data.map((akun) => (
                                            <option key={akun.id} value={akun.id}>
                                                {akun.nama_akun}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    {props.errors.pembayar && props.touched.pembayar ? <div>{props.errors.pembayar}</div> : null}
                                </Col>
                                
                                <Col>
                                    <Form.Label>
                                            Tanggal Transaksi
                                    </Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                        placeholder="Pick date"
                                        type='date'
                                        aria-label="date"
                                        name="tgl_transaksi"
                                        />
                                        {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
                                    </InputGroup>
                                </Col>

                                
                                <Col> 
                                <Form.Label>
                                    Nomor Transaksi
                                </Form.Label>
                                    <Form.Control 
                                        placeholder="Auto"
                                        name="no_transaksi"
                                        disabled
                                    />
                                </Col>

                                <Col>
                                    <Form.Label>
                                        Tag
                                    </Form.Label>
                                    <Form.Control 
                                        placeholder="Tag" 
                                        name="tag"
                                    />
                                </Col>
                
                        {/* <div class="float-right mt-2 mb-8">
                                <Form.Check
                                    label="Harga Termasuk Pajak" 
                                    type="switch"
                                    id="custom-switch"   
                                />
                                </div> */}
                            </Row>
                        </div>
                
                        <div class="mb-12">
                        <Table class="table mt-4">
                                    <thead class="thead-light">
                                        <tr>
                                            <th class="text-center" scope="col">Pembayaran Untuk Akun</th>
                                            <th class="text-center" scope="col">Deskripsi</th>
                                            <th class="text-center" scope="col">Pajak</th>
                                            <th class="text-center" scope="col">Jumlah</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> 
                                                <Form.Control as="select" name="pembayaran_akun">
                                                    <option>Pilih 1</option>
                                                </Form.Control>
                                            </td>
                                            <td>
                                                <Form.Control placeholder="Isi Deskripsi" name="deskripsi"/>    
                                            </td>   
                                            <td>
                                                <Form.Control as="select" name="pajak">
                                                    <option>Pilih 1</option>
                                                </Form.Control>
                                            </td>
                                            <td> 
                                            <Form.Control 
                                                placeholder="Jumlah Uang" 
                                                name="jumlah" 
                                                onChange={(e) => {
                                                    props.setFieldValue('jumlah', e.target.value)
                                                }}
                                                />
                                            </td>
                                        </tr>
                                    
                                    </tbody>
                                </Table>
                                <Button variant="primary ml-2"><PlaylistAddIcon fontSize="medium"/> Tambah Data</Button>
                            </div>
                
                        <div class="mb-6">
                            <Row>
                                <Col>
                    
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Memo</Form.Label>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        name="memo"
                                        placeholder="Isi Memo"
                                        onChange={props.handleChange}
                                    />
                                {props.errors.memo && props.touched.memo ? <div>{props.errors.memo}</div> : null}
                                </Form.Group>
                                </Form.Group>
                                
                                </Col>
                                <Col></Col> 
                                <Col>
                                <Form.Group as={Row} >
                                        <Form.Label column sm="3">
                                        Subtotal
                                        </Form.Label>
                                        <Col sm="6">
                                        <Form.Control type="subtotal" name="subtotal" placeholder="0,00" />
                                        </Col>
                                    </Form.Group>
                
                                <Form.Group as={Row}>
                                        <Form.Label column sm="3">
                                        Total
                                        </Form.Label>
                                        <Col sm="6">
                                        <Form.Control type="total" name="total" placeholder="Rp, 0.00" />
                                        </Col>
                                </Form.Group>
                                
                             
                                </Col>
                            </Row>
                        </div>
                    
                        <div class="mb-10">
                            <Row>
                                <Col>
                                <div>
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
                                </div>
                                </Col>
                                <Col>
                                
                                </Col> 
                                <Col>
                                <Form.Group as={Row} controlId="\\">
                                     <Form.Label column sm="4">
                                        Total Fixed
                                        </Form.Label>
                                        <Col sm="8">
                                        <Form.Control type="total" placeholder="Rp, 0.00" />
                                        </Col>
                                        </Form.Group>
                                </Col>
                            </Row>
                        </div>
                
                    <div className="float-right mb-10">
                                <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Batal</Button>
                                <Link href="/kasbank/bankwithdraw">
                                <Button variant="success" type="submit" onClick={props.handleSubmit}><CheckCircleIcon fontSize="medium"/> Buat Transferan</Button>
                                </Link>
                        </div>
                    </div>
                        </Forms>
                        )}
                 </Formik>
            </Layout>
    )
}

export async function getServerSideProps() {

	const akunKasBank = await prisma.akun.findMany({
        where: {
          kategoriId: 3,
        },
      });
  
    const kontaks = await prisma.kontakDetail.findMany({
        where: {
            kontak_type_id: 2,
        },
        include: {
            kontak: true,
        },
    });
  
    return {
      props: {
        data: akunKasBank,
        data2: kontaks
      },
    };
  }
  
