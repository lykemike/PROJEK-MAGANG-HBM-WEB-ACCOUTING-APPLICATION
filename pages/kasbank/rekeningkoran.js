import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Card, Form, Row,Col,FormGroup, Dropdown } from 'react-bootstrap';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const rekeningkoran = () => {
    return (
        <Layout>
        <div variant="container">
        <div class="text-md font-medium text-gray-900 mb-2">
            Kas & Bank / Kode Akun - Nama Akun</div>
            <h4 class="mt-2 mb-4">
                Rekening Koran
                </h4>  
               
				<Card>
					<Card.Body>
                        <Row className="">		
								<p class="text-md font-medium text-gray-900 ml-2 ">
                                    Impor Rekening Koran anda
                                </p>
                                <p class="ml-2">
                                Ada dua cara untuk mengimpor rekening koran ke dalam Jurnal, dengan Template Jurnal dan Template Bank. Skip ke Langkah 3 jika menggunakan 
                                        Template Bank atau ikuti langkah berikut jika menggunakan Template Jurnal.
                                </p>
						</Row>		

                      <Row>   
						<p class="ml-2 mt-1 font-medium"> 
                            Langkah 1. Download file template rekening koran kami
                        </p>
						                                                              
                        <p class="ml-2 mb-2">
                            Mulai dengan men-download template file CSV (Comma Separated Values) rekening koran kami. File ini memiliki kolom heading sesuai yang Jurnal perlu
                            untuk meng-impor data rekening koran Anda.
                        </p>
                        <p class="ml-2"><SystemUpdateAltIcon  fontSize="medium"/> Download File Template</p>
                        </Row>
                        
                        <Row>
                        <p class="ml-2 mt-3 font-medium"> 
                                    Langkah 2. Download file template rekening koran kami
                         </p>               
                        </Row> 
                

						<Row>                                       
                        <p class="ml-2 mb-2">
						Ekspor data rekening koran Anda dari sistem yang lama sebagai CSV. Menggunakan Excel atau editor spreadsheet lainnya, copy dan paste data rekening 
						koran Anda dari file yg di ekspor kedalam template Jurnal. Pastikan bahwa data rekening koran Anda sesuai dengan heading kolom yg di sediakan dalam 
						template.
                        </p>

                        <p class="ml-2 text-red-600 font-medium"> 
						PENTING: Jangan rubah heading kolom yang disediakan dalam template Jurnal. Ini harus tetap sama supaya impor bisa jalan pada langkah selanjutnya. 
						Kami mengasumsi bahwa tanggal ada dalam format dd/mm/yyyy. Contoh: 25/12/2015.
						</p>
                        </Row>

                        <Row>
                        <p class="ml-2 mt-3 font-medium"> 
                                    Langkah 3. Impor file template yg sudah di update
                         </p>               
                        </Row> 
            
						<Row>                                       
                        <p class="ml-2 mb-2">
						<Form.File id="formcheck-api-regular">
						<Form.File.Label className="font-medium">Import File</Form.File.Label>
						<Form.File.Input />
						</Form.File>
                        </p>
                        </Row>

						<Row>
						<p class="ml-2 mt-1 font-sm text-gray-600"> 
						File yang Anda impor harus dalam bentuk CSV (Comma Separated Values). Nama file anda harus diakhiri dengan .csv atau .txt.
                         </p>  
						</Row>
                        
						<Row>
                        <p class="ml-2 mt-3 font-medium"> 
						Langkah 4. Pilih Nama Akun
                         </p>               
                        </Row>

						<Row>
						<p class="ml-2 font-sm text-gray-600"> 
						Pilih nama akun yang ingin di impor data rekening koran
                         </p>  
						</Row>

						<Row>
						<p class="ml-2 font-sm text-gray-600"> 
						<Form.Control as="select">
							<option>Pilih akun </option>
							<option>Akun 1 </option>
							<option>Akun 2 </option>
							<option>Akun 3 </option>
						</Form.Control>
                         </p>  
						</Row>


						<Row>
                        <p class="ml-2 mt-3 font-medium"> 
						Langkah 5. Pilih Bank
						</p>
                        </Row>

						<Row>
						<p class="ml-2 font-sm text-gray-600"> 
						Pilih Bank yang anda gunakan templatenya (Jurnal default jika menggunakan template Jurnal)
                         </p>  
						</Row>

						<Row>
						<p class="ml-2 mb -4 font-sm text-gray-600"> 
						<Form.Control as="select">
							<option>Pilih akun </option>
							<option>Akun 1 </option>
							<option>Akun 2 </option>
							<option>Akun 3 </option>
						</Form.Control>
                         </p>  
						</Row>

                        <div className="mt-3 float-right">
                        <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Batal</Button>
                        <Link href="/kasbank/validasidata">
                        <Button variant="success"><CheckCircleIcon fontSize="medium"/> Import</Button>
                        </Link>
                        </div>

        
					</Card.Body>
				</Card> 
        </div>
        </Layout>
    )
}

export default rekeningkoran
