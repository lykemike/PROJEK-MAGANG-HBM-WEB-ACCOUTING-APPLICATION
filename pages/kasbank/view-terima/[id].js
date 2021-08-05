import React from 'react'
import Layout from '../../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown , Row , Col, Form, Card, InputGroup,FormControl} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PrintIcon from '@material-ui/icons/Print';

export default function bank_deposit({ data }) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout>
        <div variant="container">
        <div class="text-md font-medium text-gray-900 mb-2">
           
            Transaksi 
            <Row>
                <Col>
                    <h4 class="mt-2 mb-5">
                        Bank Deposit #{id}
                        </h4>
                 </Col>
            
                 <Col>
                    <div class="float-right">
                            <h1 class="text-2xl">
                                Selesai
                            </h1>
                 </div>
                 </Col>
        </Row>
        </div>        
                
         <div class="mb-10">
            <Row>
                <Col >
                <Form.Label>
                    Setor ke
                    </Form.Label>
                        <Form.Control>
                         
                          </Form.Control>
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
                <Col >
                    <Form.Label>
                        Pembayar
                    </Form.Label>
                    <Form.Control placeholder="" />
                </Col>

                <Col >
                    <Form.Label>
                        Tanggal Transaksi
                    </Form.Label>
                    <Form.Control placeholder="" />
                </Col>

                <Col>
                    <Form.Label>
                        Nomor Transaksi
                    </Form.Label>
                    <Form.Control placeholder="Auto" />
                </Col>
            </Row>
        </div>

        <div class="mb-12">
                    <Table class="table mt-4">
                                <thead class="thead-light">
                                    <tr>
                                        <th class="text-center" scope="col">Akun</th>
                                        <th class="text-center" scope="col">Deskripsi</th>
                                        <th class="text-center" scope="col">Pajak</th>
                                        <th class="text-center" scope="col">Jumlah(IDR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">
                                            Akun
                                        </td>
                                        <td>
                                                
                                        </td>   
                                        <td class="text-center">
                                           Nama Pajak
                                        </td>
                                        <td class="text-center"> 
                                            XXXX 
                                        </td>
                                    </tr>
                                
                                </tbody>
                            </Table>
                           
                        </div>
            

         <div class="mb-6">
            <Row>
                <Col></Col>
                <Col></Col> 
                <Col>
                <Form.Group as={Row} controlId="">
                        <Form.Label column sm="4">
                        Subtotal
                        </Form.Label>
                        <Col sm="6">
                        <Form.Control type="subtotal" placeholder="0,00" />
                        </Col>
                    </Form.Group>

                <Form.Group as={Row} controlId="">
                        <Form.Label column sm="4">
                        Nama Pajak
                        </Form.Label>
                        <Col sm="6">
                        <Form.Control type="namapajak" placeholder="Rp, 0.00" />
                        </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="">
                        <Form.Label column sm="4">
                        Total
                        </Form.Label>
                        <Col sm="6">
                        <Form.Control type="total" placeholder="Rp, 0.00" />
                        </Col>
                </Form.Group>
                </Col>
            </Row>
        </div>
    <div>
   
                <Button variant="secondary mr-2"><ArrowBackIosIcon fontSize="medium"/>Kembali</Button>
                <Button variant="primary"><PrintIcon fontSize="medium"/> Cetak</Button>

     <div className="float-right">
                <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Hapus</Button>
                <Button variant="success"><CheckCircleIcon fontSize="medium"/>Ubah</Button>
        </div>
        </div>
        </div>
       
        </Layout>
    )
}

