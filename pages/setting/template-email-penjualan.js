import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,Table} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';

export default function templateemailpenjualan() {
    return (
        <Layout>
            <h1>Pengaturan</h1>
            <Row>
                <Col sm="3">
                <SidebarSetting></SidebarSetting>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                    <h3>Template Email Penjualan</h3>

                    <Row className="mb-2 mt-6">
                                <Col sm="3">
                                Subject
                                </Col>
                                <Col sm="6">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} name="subject"  />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-6">
                                <Col sm="3">
                                Pesan
                                </Col>
                                <Col sm="6">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} name="pesan"  />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-2 mt-6">
                                <Col sm="3">
                                Variable
                                </Col>
                                <Col sm="6">
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} name="variable"  />
                                    </Form.Group>
                                </Col>
                            </Row>
                </Col>
            </Row>
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-center items-center gap-3">  
               <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Ubah Template</button>
            </div>
        </Layout>
    )
}
