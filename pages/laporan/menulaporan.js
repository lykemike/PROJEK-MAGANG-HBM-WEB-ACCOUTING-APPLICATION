import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown ,Row, Col} from 'react-bootstrap';
import AssessmentIcon from '@material-ui/icons/Assessment';

const menulaporan = () => {
    return (
        <Layout>
       	<div variant="container">
				<h4 class="mb-8 mt-2">
               
                      Laporan
                    </h4>
                    
                    <Row>
                        <Col>
                        <Row class="mb-3">
                            <Col>
                            <div style={{ fontSize: 30 }}>Jurnal Umum</div> 
                            <p>menampilkan semua transaksi yang dilakukan</p>
                            <Link href="/laporan/laporan-jurnalumum">
                            <Button variant="outline-primary">Lihat Laporan</Button>
                            </Link>
                            </Col>
                        </Row>

                        <Row class="mb-3">
                        <Col>
                            <div style={{ fontSize: 30 }}>Laba Rugi</div> 
                            <p>Menampilkan setiap tipe transaksi dan jumlah total untuk pendapatan dan pengeluaran anda.</p>
                            <Link href="/laporan/laporan-labarugi">
                            <Button variant="outline-primary">Lihat Laporan</Button>
                            </Link>
                            </Col>
                        </Row>

                        <Row class="mb-3">
                        <Col>
                            <div style={{ fontSize: 30 }}>Trial Balance</div> 
                            <p>Menampilkan saldo dari setiap akun, termasuk saldo awal, pergerakan, 
                                dan saldo akhir dari periode yang ditentukan.</p>
                                <Link href="/laporan/laporan-trialbalance">
                                <Button variant="outline-primary">Lihat Laporan</Button>
                                </Link>
                            </Col>
                        </Row>

                        <Row class="mb-3">
                            <Col>
                            <div style={{ fontSize: 30 }}>Perubahan Modal</div> 
                            <p>Menampilkan perubahan atau pergerakan dalam ekuitas pemilik yang terjadi dalam periode
                                tertentu.</p>
                            <Link href="/laporan/laporan-perubahanmodal">
                            <Button variant="outline-primary">Lihat Laporan</Button>
                            </Link>
                            </Col>
                        </Row>
                        </Col>

                        <Col>
                       <Row class="mb-3">
                        <Col>
                            <div style={{ fontSize: 30 }}>Neraca</div> 
                            <p>Menampilan apa yang anda miliki (aset), apa yang anda hutang (liabilitas), 
                                dan apa yang anda sudah investasikan pada perusahaan anda (ekuitas).</p>
                                <Link href="/laporan/laporan-neraca">
                                <Button variant="outline-primary">Lihat Laporan</Button>
                                </Link>
                            </Col>
                        </Row>

                        <Row class="mb-3">
                        <Col>
                            <div style={{ fontSize: 30 }}>Buku Besar</div> 
                            <p>menampilkan semua transaksi sesuai pengelompokan</p>
                            <Link href="/laporan/laporan-bukubesar">
                            <Button variant="outline-primary">Lihat Laporan</Button>
                            </Link>
                            </Col>
                        </Row>
                        <Row class="mb-3">
                        <Col>
                            <div style={{ fontSize: 30 }}>Arus Kas</div> 
                            <p>Laporan ini mengukur kas yang telah dihasilkan atau digunakan oleh suatu perusahaan dan 
                                menunjukkan detail pergerakannya dalam suatu periode.</p>
                                <Link href="/laporan/laporan-aruskas">
                                <Button variant="outline-primary">Lihat Laporan</Button>
                                </Link>
                            </Col>
                        </Row>
                        <Row class="mb-3">
                        <Col>
                            <div style={{ fontSize: 30 }}>Jurnal Penutup</div> 
                            <p>Jurnal yang dibuat pada akhir periode akuntansi untuk menutup akun-akun nominal sementara.</p>
                            <Link href="/laporan/laporan-jurnalpenutup">
                            <Button variant="outline-primary">Lihat Laporan</Button></Link>
                            </Col>
                        </Row>
                    
                        </Col>
                        
                    </Row>
                    
			</div>
        </Layout>
    )
}

export default menulaporan
