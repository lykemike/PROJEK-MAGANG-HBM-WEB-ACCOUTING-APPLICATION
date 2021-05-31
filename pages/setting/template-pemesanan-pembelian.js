import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,Table} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';

export default function templatepemesananpembelian() {
    return (
        <Layout>
            <h1>Pengaturan</h1>
            <Row>
                <Col sm="3">
                <SidebarSetting></SidebarSetting>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                    <h2>Template Email Pemesanan Pembelian</h2>
                    <Row className="mb-2">
                        <Col sm="2">
                            <br/>
                        Subject
                        </Col>
                        <Col sm="10">
                        <div className="card">
                            <div className="card-body">
                            Pemesanan Pembelian #[NomorTransaksi]
                            </div>
                        </div>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm="2">
                            <br/>
                        Pesan
                        </Col>
                        <Col sm="10">
                        <div className="card">
                            <div className="card-body">
                            Yth. [NamaCustomer], <br/>
                            Terima kasih atas bisnis Anda. <br/><br/>
                            Berikut adalah pemesanan pembelian #[NomorTransaksi] sebesar [SisaTagihan]. <br/> <br/>
                            Terimakasih atas kerjasamanya. <br/>
                            [NamaPerusahaan]        
                            </div>
                        </div>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col sm="2">
                            <br/>
                        Variable
                        </Col>
                        <Col sm="10">
                        [NamaCustomer] [PerusahaanCustomer] [NomorTransaksi] [TanggalTransaksi] [TanggalJatuhTempo] [NamaPerusahaan] [EmailPerusahaan] 
                        [SisaTagihan] [TanggalHariIni]

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
