import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';

export default function pembelian() {
    return (
        <Layout>
            <h1>Pengaturan</h1>
            <Row>
                <Col sm="3">
                <SidebarSetting></SidebarSetting>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                <Row className="mb-2">
                        <Col sm="4">
                            Syarat Pembayaran Pembelian Utama
                        </Col>
                        <Col sm="8">
                            <h2>Pembelian</h2>
                            <Form.Control as="select">
                                <option></option>
                                <option>Net 30</option>
                                <option>Cash On Delivery</option>
                                <option>Net 15</option>
                                <option>Net 60</option>
                                <option>Custom</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm="4">
                            Pengiriman
                        </Col>
                        <Col sm="8">
                            <Form.Check aria-label="option 1" />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm="4">
                            Diskon
                        </Col>
                        <Col sm="8">
                            <Form.Check aria-label="option 1" />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm="4">
                            Diskon Per Baris
                        </Col>
                        <Col sm="8">
                            <Form.Check aria-label="option 1" />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm="4">
                            Pesan Pembelian Standar
                        </Col>
                        <Col sm="8">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                            
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-center items-center gap-3">  
                <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
                <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Ubah</button>
            </div>
        </Layout>
    )
}
