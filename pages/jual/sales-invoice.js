import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import AddIcon from '@material-ui/icons/Add'

export default function salesinvoice() {
    return (
        <Layout>
            <Form>
                <Form.Group as={Row} controlId="formPlaintext">
                        <Form.Label column sm="3">
                            <h4>Transaksi</h4>
                            <h3>Sales Invoice #XXXX</h3>
                        </Form.Label>
                        <Form.Label column sm="9">
                        <div className="flex flex-row-reverse">
                        <h3>Terbayar Sebagian</h3>
                        </div>
                        </Form.Label>
                    </Form.Group>
                </Form>
                <div className="border-t border-gray-200">
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintext">
                            <Col sm="3">
                            Pelanggan <br/>
                            test
                            </Col>
                            <Col sm="3">
                            Email <br/>
                            test
                            </Col>
                            <Col sm="3">
                            </Col>
                            <Col sm="3">
                            <div className="flex flex-row-reverse">
                            <h2>Total Rp.0,00</h2>
                            </div>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <div className="border-t border-gray-200">
                    <Form>
                        <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="3">
                                <label for="message">Alamat Penagihan: </label><br/>
                                test
                            </Form.Label>
                            <Form.Label column sm="3">
                            Tgl Transaksi: <br/>
                            test <br/>
                            Tgl Jatuh Tempo: <br/>
                            test <br/>
                            Syarat Pembayaran: <br/>
                            test <br/>
                            </Form.Label>
                            <Form.Label column sm="3">
                            No Transaksi: <br/>
                            test <br/>
                            No Referensi Penagihan: <br/>
                            test <br/>
                            Tag: <br/>
                            test <br/>
                            </Form.Label>
                        </Form.Group>
                    </Form>
                </div>
                <div className="border-t border-gray-200">
            <Form>
                <Form.Group as={Row} controlId="formPlaintext">
                    <Form.Label column sm="2">
                    Produk
                    </Form.Label>
                    <Form.Label column sm="2">
                    Deskripsi
                    </Form.Label>
                    <Form.Label column sm="1">
                    Kuantitas
                    </Form.Label>
                    <Form.Label column sm="1">
                    Satuan
                    </Form.Label>
                    <Form.Label column sm="2">
                    Harga Satuan
                    </Form.Label>
                    <Form.Label column sm="1">
                    Diskon
                    </Form.Label>
                    <Form.Label column sm="1">
                    Pajak
                    </Form.Label>
                    <Form.Label column sm="2">
                    Jumlah
                    </Form.Label>
                </Form.Group>
                </Form>
            </div>
            <div className="border-t border-gray-200">
                <Form className="py-2">
                <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="2">
                        test
                        </Col>
                        <Col sm="2">
                        test
                        </Col>
                        <Col sm="1">
                        test
                        </Col>
                        <Col sm="1">
                        test
                        </Col>
                        <Col sm="2">
                        test
                        </Col>
                        <Col sm="1">
                        test
                        </Col>
                        <Col sm="1">
                        test
                        </Col>
                        <Col sm="2">
                        test
                        </Col>
                    </Form.Group>
                    </Form>
            </div>
            <Form className="py-2">
                <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="4">
                        </Col>
                        <Col sm="4">
                        
                        </Col>
                        <Col sm="4">
                        <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                Sub Total  
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                 Diskon
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                Nama Pajak
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                  Total
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                 Jumlah Pemotongan
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                 Sudah Dibayar
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>

                            <div className="border-t border-gray-200">
                                <br/>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                 <h5>Sisa Tagihan</h5>
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>
                            </div>   
                        </Col>
                </Form.Group>
            </Form>
            <div class="border-t border-gray-200 ">
                <Form>
                    <Form.Group as={Row} controlId="formPlaintext">
                            <Form.Label column sm="4">
                            <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg">Hapus</button>
                            </Form.Label>
                            <Form.Label column sm="4">
                            <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">Cetak</button>
                            <button type="button" class="mr-2 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">Bayar</button>
                            </Form.Label>
                            <Form.Label column sm="4">
                            <div class="flex flex-row-reverse">  
                                <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Buat Penjualan</button>
                                <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
                                
                            </div>
                            </Form.Label>
                        </Form.Group>
                    </Form>
            </div>
            
        </Layout>
    )
}
