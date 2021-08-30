import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton,Row,Col,Form,FormControl,InputGroup , Dropdown } from 'react-bootstrap';

const laporantrialbalance = () => {
    return (
        <Layout>
        <div variant="container">
            <div></div>
             <h4 class="mb-8 mt-2">
                Trial Balance
                 </h4>

                 <Row>
                <Col sm='3'>
                <Form.Label>
                Tanggal Mulai
            </Form.Label>
            <InputGroup className="mb-3">
                    <FormControl

                    placeholder="Pick date"
                    type='date'
                    aria-label="date"
                    />
                </InputGroup>
              
                </Col>
				<Col sm="3">
                <Form.Label>
                Tanggal Selesai
            </Form.Label>
            <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Pick date"
                    type='date'
                    aria-label="date"
                    />
                </InputGroup>
              
                </Col>

				<Col>
					<Button variant="primary mr-2 mt-7"> Filter</Button>
				</Col>
            </Row>
        
                 <div class="flex flex-row-reverse">
                         <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Export">
                             <Dropdown.Item>
                                 <Link href="#">
                                     <a>PDF</a>
                                 </Link>
                             </Dropdown.Item>
                             <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
                             <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
                         </DropdownButton>
                     </div>

             <Table class="table mt-4">
                 <thead>
                     <tr>
                       <th colspan="3">Daftar Akun</th>
                       <th colspan="3" className="text-left ml-3">Saldo Awal</th>
                       <th colspan="3" className="text-left">Penyesuaian Saldo</th>
                       <th colspan="3" className="text-left">Saldo Akhir</th>
                     </tr>
                 </thead>

                 <tbody>
                     <tr>
                            <th colspan="3"></th>
                            <td colspan="1">Debit</td> 
                            <td colspan="2">Kredit</td> 
                            <td colspan="1">Debit</td> 
                            <td colspan="2">Kredit</td> 
                            <td colspan="1">Debit</td> 
                            <td colspan="2">Kredit</td> 
                     </tr>
                </tbody>

                <tbody>
                     <tr>
                         <td colspan="12">
                            <div class="text-md font-medium text-gray-900">Aset</div>
                         </td>
                     </tr>
                     <tr>
                            <th colspan="3">Nomor Akun</th>
                            <td colspan="1">Rp. 0,00</td> 
                            <td colspan="2">Rp. 0,00</td> 
                            <td colspan="1">Rp. 0,00</td> 
                            <td colspan="2">Rp. 0,00</td> 
                            <td colspan="1">Rp. 0,00</td> 
                            <td colspan="2">Rp. 0,00</td> 
                     </tr>
                 </tbody>

                 <tbody>
                     <tr>
                         <td colspan="12">
                            <div class="text-md font-medium text-gray-900">Kewajiban</div>
                         </td>
                     </tr>
                     <tr>
                            <th colspan="3">Nomor Akun</th>
                            <td colspan="1">Rp. 0,00</td> 
                            <td colspan="2">Rp. 0,00</td> 
                            <td colspan="1">Rp. 0,00</td> 
                            <td colspan="2">Rp. 0,00</td> 
                            <td colspan="1">Rp. 0,00</td> 
                            <td colspan="2">Rp. 0,00</td> 
                     </tr>
                
                    <tr>
                         <td colspan="12"></td>
                    </tr>

                    <tr>
                            <td>
                                 <div class="text-md font-medium text-gray-900">Total</div>
                            </td> 
                            <td></td> 
                            <td></td>
                            <td>XXX</td> 
                            <td>XXX</td> 
                            <td></td>
                            <td>XXX</td> 
                            <td>XXX</td> 
                            <td></td>
                            <td>XXX</td> 
                            <td>XXX</td> 
                            <td></td>
                     </tr>
                 </tbody>
             </Table>
         </div>
     </Layout>
    )
}

export default laporantrialbalance
