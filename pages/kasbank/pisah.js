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

const pisah = () => {
    return (
        <div>
         <Layout>
        <div variant="container">
        <div class="mb-10">
            <Row>
                <Col >
                <div class="text-md font-medium text-gray-900 mb-2">
            Terima / Bayar Uang</div>
             <h4 class="mt-2 mb-5">
                (Nomor Akun) Nama Akun
                 </h4>
                         
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
        <Table class="table mt-4">
					<thead class="thead-light">
						<tr>
							<th class="text-center" scope="col">Deskripsi</th>
                            <th class="text-center" scope="col">Akun</th>
							<th class="text-center" scope="col">Pajak</th>
							<th class="text-center" scope="col">Jumlah</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td> 
                            <Form.Control placeholder="Isi Deskripsi" />  
                            </td>   
     
							<td>
                            <Form.Control as="select" >
                                    <option value="1">Pilih 1</option>
                                </Form.Control> 
                            </td>   
							<td>
                                <Form.Control as="select">
                                    <option>Pilih 1</option>
                                </Form.Control>
                            </td>
							<td> 
                                <Form.Control placeholder="Input Jumlah" />  
                            </td>
						</tr>

						<tr>
							<td> 
                                <Form.Control as="select">
                                    <option>Pilih 1</option>
                                </Form.Control>
                            </td>
							<td>
                                <Form.Control placeholder="Isi Deskripsi" />    
                            </td>   
							<td>
                                <Form.Control as="select">
                                    <option>Pilih 1</option>
                                </Form.Control>
                            </td>
							<td> 
                                <Form.Control placeholder="Input Jumlah" />  
                            </td>
						</tr>
                      
					</tbody>
				</Table>
                <Button variant="primary ml-2"><PlaylistAddIcon fontSize="medium"/> Tambah Data</Button>
             </div>

        <div class="mb-6">
            <Row>
                <Col></Col>
                <Col></Col> 
                <Col>
               <Form.Group as={Row} >
                        <Form.Label column sm="3">
                        Total
                        </Form.Label>
                        <Col sm="6">
                        <Form.Control  placeholder="Rp, 0.00" />
                        </Col>
                </Form.Group>
                </Col>
            </Row>
        </div>
      
      

     <div className="float-right mb-10">
                <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Batal</Button>
                <Link href="/kasbank/bankdeposit">
                <Button variant="success" type="submit"><CheckCircleIcon fontSize="medium"/> Buat Transferan</Button>
                </Link>
        </div>
        </div>
        </Layout>
        </div>
    )
}

export default pisah
