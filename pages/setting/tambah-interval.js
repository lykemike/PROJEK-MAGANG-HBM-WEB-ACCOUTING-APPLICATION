import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add'

export default function tambahinterval() {
    return (
        <Layout>
            +tambah interval
            <br/>
            <br/>
            Pengingat Faktur
            <h5>Tambah Pelanggan</h5>
            <div className="border-t border-gray-200 ">
                <Row>
                    <Col sm="2">
                    Kirim Pengingat 
                    </Col>
                    <Col sm="1">
                        <Form.Control as="select" size="sm" custom>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Col>
                    <Col sm="1">
                        hari
                    </Col>
                    <Col sm="2">
                        <Form.Control as="select" size="sm" custom>
                            <option>Sebelum</option>
                            <option>Sesudah</option>
                        </Form.Control>
                    </Col>
                    <Col sm="3">
                        tanggal jatuh tempo faktur
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h4>Template Email</h4>
                    </Col>
                    <Col>
                    <div className="flex flex-row-reverse">
                        *gunakan [placeholder] sebagai bagian dari konten email
                    </div>
                    </Col>
                </Row>
            </div>
            <div className="card mb-2">
                <div className="card-body">
                    [NamaPerusahaan] - Transaksi [Nomor Transaksi] jatuh tempo tanggal [Tanggal Jatuh Tempo]
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    Yth [Nama Pelanggan],<br/>
                    Kami ingin mengingatkan Anda bahwa faktur Anda yang jatuh tempo tanggal [TanggalJatuhTempo] belum lunas. Mohon lakukan 
                    pembayaran anda sesegera mungkin. <br/> <br/>
                    Jika Anda telah melakukan pembayaran, mohon abaikan email ini. Jika ada pertanyaan silahkan hubungi kami di [EmailPerusahaan]. <br/> <br/>
                    Salam <br/>
                    [NamaPerusahaan]
                </div>
            </div>
            <Form.Check type="checkbox" label="Sertakan faktur pdf sebagai lampiran email" />
            <Row className="mb-2">
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[NomorTransaksi]</button>
                </Col >
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[NamaPerusahaan]</button>
                </Col>
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[TanggalTransaksi]</button>
                </Col>
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[SisaTagihan]</button>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[EmailPerusahaan]</button>
                </Col>
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[PerusahaanPelanggan]</button>
                </Col>
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[NamaPelanggan]</button>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[TanggalHariIni]</button>
                </Col>
                <Col sm="3">
                <button type="button" class="focus:outline-none text-blue-600 text-sm py-2.5 px-5 rounded-md border border-blue-600 hover:bg-blue-50">[TanggalJatuhTempo]</button>
                </Col>
            </Row>
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">  
                <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Kembali</button>
                <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Simpan</button>
            </div>
        </Layout>
    )
}
