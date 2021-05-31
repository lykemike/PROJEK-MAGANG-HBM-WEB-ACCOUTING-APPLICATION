import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,Table} from 'react-bootstrap'

export default function detilpengguna() {
    return (
        <Layout>
            <h2>Detil Pengguna</h2>
            <Row className="mb-2">
                <Col sm="1">
                Nama
                </Col>
                <Col sm="4">
                <Form.Control type="text" placeholder="" size="sm"/>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                Email
                </Col>
                <Col sm="4">
                <Form.Control type="text" placeholder="" size="sm"/>
                </Col>
            </Row>
            <div className="border-t border-gray-200">
                <h2>Pengaturan</h2>
                Wewenang
                <br/>
            </div>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Ultimate</h6>
                    Pengguna dapat mengakses semua halaman menu
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Administrator</h6>
                    Pengguna dapat mengakses menu pengaturan perusahaan
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Akuntan</h6>
                    Pengguna dapat mengakses menu laporan, daftar akun kas & bank, produk, pelanggan, supplier, penyesuaian stok, penjualan, pembelian, dan biaya.

                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Pembaca Laporan</h6>
                    Pengguna dapat mengakses menu seluruh laporan, stock adjustment dan rekonsiliasi bank
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Bankir</h6>
                    Pengguna dapat mengakses menu kas dan bank, membuat dan melihat laporan rekonsiliasi
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Penjualan(Penagihan dan Retur</h6>
                    Pengguna dapat mengakses halaman menu transaksi dan laporan penjualan perusahaan
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Pembelian(Penagihan dan Retur</h6>
                        Pengguna dapat mengakses halaman menu transaksi dan laporan pembelian perusahaan
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Pengeluaran</h6>
                    Pengguna dapat mengakses halaman menu transaksi dan laporan biaya perusahaan
                </Col>
            </Row>
            <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Pergudangan</h6>
                    Pengguna dapat mengakses menu produk, penyesuaian stok produk dan laporan produk
                </Col>
            </Row>
            <div className="border-t border-gray-200">
                <h5>Aksesibilitas</h5>
                <Row className="mb-2">
                <Col sm="1">
                <Form.Check aria-label="option 1" />
                </Col>
                <Col>
                    <h6>Mengubah dan menghapus data (List Manager)</h6>
                </Col>
            </Row>
            </div>
            <div class="left-0 px-4 py-3 w-full flex justify-center items-center gap-3">  
                <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
                <button class="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white focus:outline-none">Undang</button>
            </div>
        </Layout>
    )
}
