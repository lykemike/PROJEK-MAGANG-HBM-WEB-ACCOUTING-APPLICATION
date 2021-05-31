import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,OverlayTrigger,Tooltip,Card} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';

export default function pengaturanpdf() {
    const renderTooltip = (props) => (
                        <Tooltip id="button-tooltip" {...props}>
                            Footer akan muncul pada bagian bawah tiap
halaman, dengan isi nomor transaksi dan 
informasi halaman ( contoh : Faktur #10001
Page 1 of 3 
                        </Tooltip>
                        );
                

    return (
        <Layout>
            <h1>Pengaturan</h1>
            <Row>
                <Col sm="3">
                <SidebarSetting></SidebarSetting>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                    <h2>Pengaturan PDF</h2>
                    <Row>
                        <Col sm="3">
                            Gunakan Footer
                        </Col>
                        <Col>
                        <FormControlLabel value="" control={<Switch color="primary" />}  />
                        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}><Button variant="primary">?</Button></OverlayTrigger>                           
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="3">
                            Gunakan Tanda tangan
                        </Col>
                        <Col>
                        <FormControlLabel value="" control={<Switch color="primary" />}  />
                        </Col>
                    </Row>
                    <div className="border-t border-gray-200">
                        <div className="flex flex-row-reverse py-2">
                        <button onclick=""class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Hapus</button>
                        </div>
                        <Row>
                            <Col>
                                <div class="mb-10">
                                    <Row>
                                        <Col>
                                        <div>
                                            <Form.Label>
                                              Gunakan Tanda Tangan ini untuk
                                            </Form.Label>  
                                            
                                            <Card border="secondary" style={{ width: '15rem',height: '8rem' }}>
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
                                    </Row>
                                </div>
                            </Col>
                            <Col sm="8">
                            <Form.Control type="text" placeholder="" size="sm" className="mb-2"/>
                            <Row className="mb-2">
                                <Col sm="6">
                                    <Form.Control as="select">
                                        <option></option>
                                    </Form.Control>
                                </Col>
                                <Col sm="6">
                                    <Form.Control type="text" placeholder=""/>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col sm="6">
                                    <Form.Control as="select">
                                        <option></option>
                                    </Form.Control>
                                </Col>
                                <Col sm="6">
                                    <Form.Control type="text" placeholder=""/>
                                </Col>
                            </Row>

                            <Row className="mb-2">
                                <Col sm="6">
                                    <Form.Control as="select">
                                        <option></option>
                                    </Form.Control>
                                </Col>
                                <Col sm="6">
                                    <Form.Control type="text" placeholder=""/>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                        <div className="flex flex-row-reverse">
                            <VisibilityIcon/>
                            Pratinjau
                        </div>
                        <Button variant="primary"><AddIcon size="small"/>Tambah Tanda Tangan Lainnya</Button>
                    </div>
                    <div className="border-t border-gray-200 mt-2">
                    Catatan : Kami tidak menjamin tanda tangan elektronik (digital signature) yang dicetak dengan fitur ini telah memenuhi peraturan perundang-undangan
atau telah disertifikasi. 
                    </div>
                    <div class="left-0 px-4 py-3 w-full flex justify-center items-center gap-3">  
                        <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Simpan</button>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}
