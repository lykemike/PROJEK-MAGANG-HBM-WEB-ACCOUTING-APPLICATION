import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link';


export default function pengingatfaktur() {
    return (
        <Layout>
            <h1>Pengaturan</h1>
            <Row>
                <Col sm="3">
                    <SidebarSetting/>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                    <h2>Pengingat Faktur</h2>
                    <Row className="mb-2">
                        <Col>
                            Kirim Email Pengingat Faktur
                        </Col>
                        <Col>
                        <FormControlLabel value="" control={<Switch color="primary" />}  />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            Tipe Faktur
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                                <option>Penjualan</option>
                                <option>Pemesanan Penjualan</option>
                                <option>Keduanya</option>
                            </Form.Control>
                            <br/>
                            <Link href="/setting/tambah-interval">
                            <button type="button" class=" focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">Tambah Interval</button>
									</Link>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            Pengecualian
                        </Col>
                        <Col>
                           <Row className="mb-2">
                               <Col>
                                    <Form.Check type="checkbox" label="Total Dibawah" />
                               </Col>
                               <Col>
                                <Form.Control type="text" placeholder="Rp.0,00" size="sm"/>
                               </Col>
                           </Row>
                           <Row className="mb-2">
                               <Col>
                                    <Form.Check type="checkbox" label="0 Pelanggan dipilih" />
                               </Col>
                               <Col>
                                    <Form.Control as="select" size="sm">
                                        <option></option>
                                    </Form.Control>
                               </Col>
                           </Row>
                           <Row className="mb-2">
                               <Col>
                                    <Form.Check type="checkbox" label="0 Faktur dipilih" />
                               </Col>
                               <Col>
                                    <Form.Control as="select" size="sm">
                                        <option></option>
                                    </Form.Control>
                               </Col>
                           </Row>
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
