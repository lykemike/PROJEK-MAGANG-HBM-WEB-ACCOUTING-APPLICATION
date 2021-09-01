import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Tabs, Tab, Card, Button, DropdownButton, Dropdown ,Table, Row , Col, Form} from 'react-bootstrap';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CachedIcon from '@material-ui/icons/Cached';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function akundetail ({data,data2,data3}) {

    return (
        <div>
            <Layout>
            <div class="text-md font-medium text-gray-900 mb-2">
           
           Akun - Cash & Bank
           <Row>
               <Col>
               {data.map((i) => (
                   <h4 class="mt-2 mb-3">
                       {i.kode_akun} - {i.nama_akun}
                       </h4>
               ))}
                </Col>
           
                <Col> 
                <div class="float-right">
                  
                   <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Tindakan">
								<Dropdown.Item>
									<Link href="/kasbank/rekeningkoran">
										<a>Import Bank Statement</a>
									</Link>
								</Dropdown.Item>
								<Dropdown.Item>
                                <Link href="/kasbank/cashlink">
										<a>Cashlink</a>
									</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                <Link href="/kasbank/laporanrekonsilasi">
										<a>Laporan Rekonsilasi</a>
									</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                <Link href="/kasbank/mutasirek">
										<a>Mutasi Rekening</a>
									</Link>
                                </Dropdown.Item>
                                <Dropdown.Item>Ubah Akun </Dropdown.Item>
							</DropdownButton>
                </div>
                </Col>
       </Row>
       </div>        
			<div variant="container">
				<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
					<Tab eventKey="transaksiJurnal" title="Transaksi Jurnal" />
					<Tab eventKey="bankStatement" title="Bank Statement" />
					<Tab eventKey="rekonsilasi" title="Rekonsilasi" />
					<Tab eventKey="pemetaanKas" title="Pemetaan Kas" />

					<div eventKey="transaksiJurnal">
						<div class="mt-6">
							<div class="float-right mb-6">
                            <Form.Control placeholder="Search" />
							</div>
							
                          <Table class="table mt-8">
				            	<thead class="thead-light">
                              <tr>
                            <th class="px-2 py-3">
                                <span>Tanggal</span>
                            </th>
                            <th class="px-2 py-3">
                                 <span>Kontak</span>
                            </th>
                            <th class="px-2 py-3">
                                 <span>Deskripsi</span>
                            </th>
                            <th class="px-2 py-3">
                                <span>Terima(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-3">
                                <span>Kirim(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-3">
                                <span>Saldo(dalam IDR)</span>
                            </th>
                        </tr>
                        </thead>   
                    {data3.map((i) => ( 
                        <tr>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">{i.tgl_transaksi}</div>
                            </td>
                            <td class="px-8 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">{i.kontak.nama}</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">{i.deskripsi}</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">{i.uang_muka}</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Rp. 00</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">0</div>
                            </td>                
                        </tr> 
                        ))}   
                    </Table>                
				</div>
			</div>
                    
					<div eventKey="bankStatement">
                    <div class="mt-6">
							<div class="float-right mb-6">
                            <Form.Control placeholder="Search" />
							</div>
							
                          <Table class="table mt-8">
				            	<thead class="thead-light">
                              <tr>
                            <th class="px-2 py-2">
                                <span>Tanggal</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Deskripsi</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Terima(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Kirim(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Saldo(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Sumber</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Status</span>
                            </th>
                        </tr>
                        </thead>    
                        <tr>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">1 Januari 2021</div>
                            </td>
                            <td class="px-8 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">01-02</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Rp, 0.00</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Rp, 0.00</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Rp.0,00</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Data Dummy</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Data Dummy</div>
                            </td>                     
                        </tr>    
                    </Table>                
				</div>
					</div>

					<div eventKey="rekonsilasi">
						<div class="mt-8">
						    <Row>
                            <Col>
                            <Col>
                                <Table class="table mt-4">
                                    <thead class="thead-light">
                                        <tr>
                                            <th class="text-center" scope="col">Rekening Koran</th>
                                            <th class="text-center" scope="col"></th>
                                            <th class="text-center" scope="col">Terima(Dalam IDR)</th>
                                            <th class="text-center" scope="col">Bayar(Dalam IDR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-center">
                                                XXXXX
                                            </td>
                                            <td>
                                                    
                                            </td>   
                                            <td class="text-center">
                                            Rp, 0.00
                                            </td>
                                            <td class="text-center"> 
                                                Rp, 0.00
                                            </td>
                                        </tr>
                                    
                                    </tbody>
                                </Table>
                                </Col>

                                <Col>
                                <div className="mt-40 text-center">
                                    <Button variant="primary" size="lg">
                                         <ImportExportIcon fontSize="large" /> Import Bank Statement
                                    </Button>
                                    </div>
                                </Col>
                            </Col>

                            <Col>
                            <Table class="table mt-4">
                                    <thead class="thead-light">
                                        <tr>
                                            <th class="text-center" scope="col">Transaksi Jurnal</th>
                                            <th class="text-center" scope="col"></th>
                                            <th class="text-center" scope="col">Terima(Dalam IDR)</th>
                                            <th class="text-center" scope="col">Bayar(Dalam IDR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="text-center">
                                                XXXXX
                                            </td>
                                            <td>
                                                    
                                            </td>   
                                            <td class="text-center">
                                            Rp, 0.00
                                            </td>
                                            <td class="text-center"> 
                                                Rp, 0.00
                                            </td>
                                        </tr>
                                    
                                       </tbody>
                                    </Table>
                                </Col>
                            </Row>
						</div>
					</div>

                  <div eventKey="pemetaanKas">
                    <div class="mt-6 mb-3">
                    <div>
                        
                        <Button variant="primary"><CachedIcon fontSize="medium"/> Muat Ulang</Button>

                        <div className="float-right">
                        <Button variant="secondary mr-2"><RotateLeftIcon fontSize="medium"/>Reset</Button>
                        <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Hapus</Button>
                        <Button variant="success"><CheckCircleIcon fontSize="medium"/> Rekonsilasi</Button>
                        </div>
                        </div>
							
                          <Table class="table mt-6">
				            	<thead class="thead-light">
                              <tr>
                            <th class="px-2 py-2">
                                <span>Tanggal</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Terima(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Bayar(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Deskripsi</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Akun</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Tarif Pajak</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span></span>
                            </th>
                        </tr>
                        </thead>    
                        <tr>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">1 Januari 2021</div>
                            </td>
                            <td class="px-8 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">01-02</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Rp, 0.00</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Rp, 0.00</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Data Dummy</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Data Dummy</div>
                            </td>  
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                                <div class="text-lg text-gray-900">
                                    
                                <DropdownButton variant="secondary" id="dropdown-basic-button">
								<Dropdown.Item>
										<a>Pisah</a>
								</Dropdown.Item>
								<Dropdown.Item>
										<a>Hapus</a>
                                </Dropdown.Item>
							</DropdownButton>

                                </div>
                            </td>                     
                        </tr>    
                    </Table>                
				</div>
		    </div>



				</Tabs>
			</div>
		</Layout>
        </div>
    )
}

export async function getServerSideProps(context) {
    // Get Akuns from API
  const {id} = context.query

  const akun = await prisma.akun.findMany({
      where : {
          id: parseInt(id)
          
      }
  });

	const transfer = await prisma.transferUang.findMany({
        where: {
          id: parseInt(id)
        },
        include :{
            akun_setor: true,
            akun_transfer: true,
        }
      });
  
    const headerPenjualan = await prisma.headerPenjualan.findMany({
        where: {
            akun_uang_muka: parseInt(id)
        },
        include : {
            kontak: true
        }
    })

    return {
        props: {
            data: akun,
            data2: transfer,
            data3: headerPenjualan
        }
    }
}
