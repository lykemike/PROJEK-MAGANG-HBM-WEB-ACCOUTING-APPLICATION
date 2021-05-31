import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/Link'

export default function penagihanpembelian() {
    return (
        <Layout>
            <h3>Buat Penagihan Pembelian</h3>
            <div className="border-t border-gray-200">
                <Form>
                    <Form.Group as={Row} controlId="formPlaintext">
                        <Form.Label column sm="3">
                        Supplier
                        </Form.Label>
                        <Form.Label column sm="3">
                        Email
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="3">
                        <Form.Control as="select">
                            <option>Default select</option>
                            <option>1</option>
                            <option>2</option>
                        </Form.Control>
                        </Col>
                        <Col sm="3">
                        <Form.Control type="text" placeholder="" />
                        </Col>
                        <Col sm="3">
                        </Col>
                        <Col sm="3">
                        Total Rp.0,00
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            <div className="border-t border-gray-200">
                <Form>
                    <Form.Group as={Row} controlId="formPlaintext">
                        <Form.Label column sm="3">
                            <label for="message">Alamat Supplier</label><br/>
                            <textarea 
                                rows="3" id="message" 
                                class="px-16 py-2 border border-gray-800  "
                            ></textarea>
                        </Form.Label>
                        <Form.Label column sm="3">
                        Tgl Transaksi <br/>
                        <Form.Control type="text" placeholder="Auto" /> <br/>
                        Tgl Jatuh Tempo <br/>
                        <Form.Control type="text" placeholder="Auto" /> <br/>
                        Syarat Pembayaran <br/>
                        <Form.Control type="text" placeholder="" /> <br/>
                        </Form.Label>
                        <Form.Label column sm="3">
                        No Transaksi <br/>
                        <Form.Control type="text" placeholder="Auto" /> <br/>
                        No Referensi Supplier <br/>
                        <Form.Control type="text" placeholder="" /> <br/>
                        </Form.Label>
                    </Form.Group>
                </Form>
                <div class="flex flex-row-reverse">
                <FormControlLabel value="" control={<Switch color="primary" />} label="Harga Termasuk Pajak" labelPlacement="start" />
                </div>
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
                        <Form.Control as="select">
                            <option>Default select</option>
                        </Form.Control>
                        </Col>
                        <Col sm="2">
                        <Form.Control type="text" placeholder="" />
                        </Col>
                        <Col sm="1">
                        <Form.Control as="select">
                            <option>Default select</option>
                        </Form.Control>
                        </Col>
                        <Col sm="1">
                        <Form.Control as="select">
                            <option>Default select</option>
                        </Form.Control>
                        </Col>
                        <Col sm="2">
                        <Form.Control type="text" placeholder="" />
                        </Col>
                        <Col sm="1">
                        <Form.Control type="text" placeholder="" />
                        </Col>
                        <Col sm="1">
                        <Form.Control as="select">
                            <option>Default select</option>
                        </Form.Control>
                        </Col>
                        <Col sm="2">
                        <Form.Control type="text" placeholder="" />
                        </Col>
                    </Form.Group>
                    </Form>
            </div>
            <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"><AddIcon fontSize="small"/> Tambah data</button>
            <Form className="py-2">
                <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="4">
                        <label for="Pesan">Pesan</label><br/>
                            <textarea 
                                rows="3" id="Pesan" 
                                class="px-16 py-2 border border-gray-800  "
                            ></textarea> <br/>
                        <label for="memo">Memo</label><br/>
                            <textarea 
                                rows="3" id="memo" 
                                class="px-16 py-2 border border-gray-800  "
                            ></textarea> <br/>
                        File Attachment <br/>
                        <Form.File id="custom-file" label="Browse file" custom/>
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
                                Diskon Per Baris  
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
                                
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder=""
                                    aria-label="Amount (to the nearest dollar)"
                                    />
                                    <InputGroup.Append>
                                    <InputGroup.Text >%</InputGroup.Text>
                                    <InputGroup.Text >Rp</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                </Col>
                                <Col sm="4">
                                Rp.0,00
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                 Pajak
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
                                 Pemotongan
                                </Col>
                                <Col sm="4">
                                
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                <InputGroup className="mb-3">
                                    <FormControl
                                    placeholder=""
                                    aria-label="Amount (to the nearest dollar)"
                                    />
                                    <InputGroup.Append>
                                    <InputGroup.Text >%</InputGroup.Text>
                                    <InputGroup.Text >Rp</InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                                </Col>
                                <Col sm="4">
                                    Rp.0,00
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="8">
                                 Uang Muka
                                </Col>
                                <Col sm="4">
                                <Form.Control type="text" placeholder="" size="sm" />
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
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">  
            <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
                <Link href="/beli/purchase-invoice">
                <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Buat Pembelian</button>
                </Link>
            </div>
        </Layout>
    )
}
