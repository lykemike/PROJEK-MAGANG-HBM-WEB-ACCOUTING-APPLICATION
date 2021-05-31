import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,OverlayTrigger,Tooltip,Card} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';

export default function pemetaanakun() {
    return ( 
        <Layout>
            <h1>Pengaturan</h1>
            <Row>
                <Col sm="3">
                <SidebarSetting></SidebarSetting>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                    <h4>Daftar Pemetaan</h4>
                    Pilih akun default untuk setiap label untuk membantu sistem membuat entri jurnal Anda secara otomatis dari transaksi. Semua kolom wajib diisi
                    <h4>Penjualan</h4>
                    <div className="border-t border-gray-200 py-2">
                       <Row className="mb-2">
                        <Col>
                        Pendapatan Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                        Pembayaran Dimuka
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row> 
                    <Row className="mb-2">
                        <Col>
                        Diskon Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                        Pengiriman Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row>

                    <Row className="mb-2">
                        <Col>
                        Retur Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                        Pengiriman Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row>
                    </div>

                    <Row className="mb-2">
                        <Col>
                        Pengiriman Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                        Hutang Pajak Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row>

                    <h4>Pembelian</h4>
                    <div className="border-t border-gray-200 py-2">
                       <Row className="mb-2">
                        <Col>
                        Pembelian (COGS)
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Hutang Belum Ditagih
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row> 

                    <Row className="mb-2">
                        <Col>
                        Pengiriman Pembelian
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Pajak Pembelian
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row> 

                    <Row className="mb-2">
                        <Col sm="3">
                        Uang Muka Pembelian
                        </Col>
                        <Col sm="3">
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row>
                    </div>

                    <h4>AR/AP</h4>
                    <div className="border-t border-gray-200 py-2">
                    <Row className="mb-2">
                        <Col>
                        Pembelian (COGS)
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Hutang Belum Ditagih
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row> 
                    </div>

                    <h4>Persediaan</h4>
                    <div className="border-t border-gray-200 py-2">
                    <Row className="mb-2">
                        <Col>
                        Persediaan
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Persediaan Rusak
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row> 
                    <Row className="mb-2">
                        <Col>
                        Persediaan Umum
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Persediaan Produksi
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row>
                    </div>

                    <h4>Lainya</h4>
                    <div className="border-t border-gray-200 py-2">
                    <Row className="mb-2">
                        <Col>
                        Ekuitas Saldo Awal
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Aset Tetap
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row>
                    </div>
                    Penetapan ulang akun akan berlaku setelah Anda menyerahkan pemetaan akun ini
                </Col>
            </Row>
            <div class="left-0 px-4 py-3 w-full flex justify-center items-end gap-3">  
                        <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Simpan</button>
                    </div>
        </Layout>
    )
}
