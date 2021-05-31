import React from 'react'
import Layout from '../../components/Layout'
import SidebarSetting from '../../components/SidebarSetting'
import {Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap'
import Divider from '@material-ui/core/Divider';

export default function settingperusahaan() {
    return (
        <Layout>
            <h1>Pengaturan</h1>
           <Form>
                    <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="3">
                        <SidebarSetting/>
                        </Col>
                        <Divider orientation="vertical" flexItem />
                        <Col sm="4">
                            <h3>Pengaturan Perusahaan</h3>
                            
                            <Row className="mb-2">
                                <Col>
                                Logo
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Tampilan Logo di Laporan
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Nama Perusahaan
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Alamat
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Alamat Pengiriman
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                    
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Telepon
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Fax
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                NPWP
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Website
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Email
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="4">
                            <h3>Detil Akun Bank</h3>
                            
                            <Row className="mb-2">
                                <Col>
                                Nama Bank
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Cabang Bank
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Alamat Bank
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        
                                        <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Nomor Rekening
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Atas Nama
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Swift Code
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm"/>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                </Form> 
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">  
            <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
            <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Ubah</button>
            </div>
        </Layout>
            
    )
}
