import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Tabs, Tab, Card, Button, DropdownButton, InputGroup,FormControl,Table, Row , Col, Form} from 'react-bootstrap';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import CachedIcon from '@material-ui/icons/Cached';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const detailkategori = () => {
    return (
        <div>
            <Layout>
            <div class="text-md font-medium text-gray-900 mb-2">
           
           Akun - Kategori Akun
           <Row>
               <Col>
                   <h4 class="mt-2 mb-3">
                       (Kode Akun) Nama Akun
                       </h4>
                </Col>
           
                <Col> 
                <div class="float-right">
                <Button variant="success"><CachedIcon fontSize="medium"/> Ubah Akun</Button>
                </div>
                </Col>
          </Row>
       </div>        
            <div class="mb-3">
            <div class="mt-6 mb-3">
                <div>
                    <h4 class="text-md font-medium text-gray-900 mb-2 mr-2">Transaksi Akun</h4>
                <div className="float-right">           
                        <Row>
                             <Col sm='5'>
                                <Form.Label>
                                    Tanggal Mulai
                                </Form.Label>
                                <InputGroup className="">
                                        <FormControl
                                        placeholder="Pick date"
                                        type='date'
                                        aria-label="date"
                                        />
                                    </InputGroup>
                                </Col>

				            <Col sm="5">
                                <Form.Label>
                                    Tanggal Selesai
                                </Form.Label>
                                <InputGroup className="">
                                        <FormControl
                                        placeholder="Pick date"
                                        type='date'
                                        aria-label="date"
                                        />
                                    </InputGroup>
                                </Col> 

                                <Col class="py-4">
                                <Button variant="primary">Filter</Button>
                                </Col>
                            </Row>
    </div>
    </div>
							
                          <Table class="table mt-8">
				            	<thead class="thead-light">
                              <tr>
                            <th class="px-3 py-3">
                                <span>Tanggal</span>
                            </th>
                            <th class="px-2 py-3">
                                 <span>Nomor</span>
                            </th>
                            <th class="px-2 py-3">
                                 <span>Kontak</span>
                            </th>
                            <th class="px-2 py-3">
                                <span>Debit(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-3">
                                <span>Kredit(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-3">
                                <span>Saldo(dalam IDR)</span>
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
                            <div class="text-lg text-gray-900">Data Dummy</div>
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
                                                
                        </tr>    
                    </Table>                
				</div>
			</div>
        	
		</Layout>
        </div>
    )
}

export default detailkategori


