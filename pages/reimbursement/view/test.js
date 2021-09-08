import React,{useState} from 'react'
import Layout from '../../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton,InputGroup, FormControl,Dropdown , Row , Col, Form, Card} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {Formik , Form as Forms} from 'formik'
import * as Yup from 'yup'



const x = () => {
    return (
        <div>
         <Layout>
                <div variant="container">
                        <h4 class="mt-2 mb-5">
                            Reimbursement #
                        </h4>

                    <div class="mb-10">
                        <Row>
                            <Col >
                                <p className="font-medium ml-2">Nama Pegawai: </p>
                                <p className="ml-2">Kevin Prawira</p>  
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </div>

      
                    <div class="mb-12">
                        <Table class="table mt-4">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Tanggal</th>
                                    <th  scope="col">Tempat</th>
                                    <th  scope="col">Biaya</th>
                                    <th  scope="col">Keterangan</th>
                                    <th  scope="col">Jumlah</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   <td> 
                                        <p>Test</p>
                                    </td>   
                                    <td>
                                        <p>Test</p>  
                                    </td>   
                                    <td>
                                        <p>Test</p>
                                    </td>
                                    <td> 
                                        <p>Test</p>  
                                    </td>
                                    <td> 
                                        <p>Test</p>  
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
                                    <p className="font-medium ml-2 mt-4">Pemohon </p>
                                    <p className="ml-2 mt-14">Kevin Prawira</p>     
                                </Col>

                                <Col sm="3">
                                    <p className="font-medium ml-2 mt-4">Yang Mengetahui </p>
                                    <p className="ml-2 mt-14">Kevin Prawira</p>  
                                </Col>
                                <Col sm="3">
                                    <p className="font-medium ml-2 mt-4"> Yang Menyetujui </p>
                                    <p className="ml-2 mt-14">Kevin Prawira</p>      
                                </Col>
                                <Col></Col>
                            </Row>
                        </div>
                     
                        <div className="float-right mb-10">
                            <Button variant="primary" type="submit">Cetak</Button>
                        </div>
                    </div>
        </Layout>
    </div>
   )
}

export default x
