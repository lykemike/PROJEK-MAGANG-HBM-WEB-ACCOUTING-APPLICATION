import React,{useState} from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton,InputGroup, FormControl,Dropdown , Row , Col, Form, Card} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {Formik , Form as Forms} from 'formik'
import * as Yup from 'yup'


import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function reimbursement({ data}) {

    return (
        <div>
         <Layout>
             <Formik
             initialValues={{
                 
              }}
                 onSubmit={(values) => {
                 console.log(values)
             }}>
                {(props) => (
                <Forms noValidate>
                    <div variant="container">
                        <h4 class="mt-2 mb-5">
                            Pembuatan Reimbursement
                        </h4>

                    <div class="mb-10">
                        <Row>
                            <Col >
                            <Form.Label>
                                Nama Pegawai
                                </Form.Label>
                                    <Form.Control as="select" name="setor" onChange={props.handleChange}>
                                    {data.map((nama_supplier, index) => (
                                        <option key={index} value={nama_supplier.kontak.id}>
                                        {nama_supplier.kontak.nama_panggilan}
                                        </option>
                                    ))}
                                    </Form.Control>     
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </div>

      
                    <div class="mb-12">
                        <Table class="table mt-4">
                            <thead className="thead-light">
                                <tr>
                                    <th class="text-center" scope="col">Tanggal</th>
                                    <th class="text-center" scope="col">Tempat</th>
                                    <th class="text-center" scope="col">Biaya</th>
                                    <th class="text-center" scope="col">Keterangan</th>
                                    <th class="text-center" scope="col">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   <td> 
                                     <Form.Control 
                                        placeholder="Pick date"
                                        type='date'
                                        name="tgl_transaksi"
                                        aria-label="date" />
                                    </td>   
                                    <td>
                                     <Form.Control 
                                       placeholder=""
                                       name="nama_tempat" 
                                       type="text" />    
                                    </td>   
                                    <td>
                                     <Form.Control 
                                            placeholder=""
                                            name="nama_biaya" 
                                            type="text" 
                                    />  
                                    </td>
                                    <td> 
                                        <Form.Control placeholder=""
                                        name="deskripsi"
                                        />  
                                    </td>
                                    <td> 
                                        <Form.Control placeholder="Input Jumlah" />  
                                    </td>
                                    </tr>
                                </tbody>
                            </Table>
                            {/* <Button variant="primary ml-2"><PlaylistAddIcon fontSize="medium"/> Tambah Data</Button> */}
                        </div>
                    <hr />
                        <div>
                            <Row>
                                <Col sm="3">
                                    <Form.Label>
                                        Yang Mengetahui
                                    </Form.Label>
                                        <Form.Control 
                                             placeholder=""
                                             name="yang_mengetahui" 
                                             type="text" 
                                        />  
                                </Col>
                                <Col sm="3">
                                    <Form.Label>
                                        Yang Menyetujui
                                    </Form.Label>
                                        <Form.Control 
                                                placeholder=""
                                                name="yang_menyetujui" 
                                                type="text" 
                                        />  
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                     
                        <div className="float-right mb-10">
                            <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Batal</Button>
                            <Button variant="success" type="submit" onClick={props.handleSubmit}><CheckCircleIcon fontSize="medium"/> Buat Transferan</Button>
                        </div>
                    </div>
                </Forms>
                )}
            </Formik>
        </Layout>
    </div>
   )
}

export async function getServerSideProps() {
    // Get kontak,produk,pajak from API
    const kontaks = await prisma.kontakDetail.findMany({
      where: {
        kontak_type_id: 3,
      },
      // orderBy: {
      //   id: "asc",
      // },
      include: {
        kontak: true,
      },
    });
  
  
    return {
      props: {
        data: kontaks,
     
      },
    };
  }
  