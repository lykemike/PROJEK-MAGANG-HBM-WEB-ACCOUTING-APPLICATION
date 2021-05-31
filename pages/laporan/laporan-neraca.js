import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton,Row,Col,Form,FormControl,InputGroup, Dropdown } from 'react-bootstrap';

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://localhost:3000/api/laporan-neraca`)
	const data = await res.json()

	// Pass data to the page via props
	return { props: { data } }
}

export default function laporanneraca({ data }) {

    return (
        <Layout>
        <div variant="container">
            <div></div>
             <h4 class="mb-8 mt-2">
                Neraca
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
              
               <thead class="thead-light">
               <tr>
                        <th>
                             <div class="text-md font-medium text-gray-900">Aset</div>
                       </th> 
                        <th></th>
                        <th></th>
                        <th></th>
                     </tr>
            </thead> 

            <tbody>
                     <tr>
                         <td>
                            <div class="text-md font-medium text-gray-900">Aset Lancar</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     {data.map((i, index) => (
                     <tr>
                         <td class="px-4">{i.namaAkun}</td>
                         <td></td>
                         <td>Rp. {i.debit}</td>
                         <td></td>
                     </tr>
                    ))}

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Aset Lancar</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. {data.reduce((init, curr) => (init += curr['debit']), 0)}</div>
                         </td>
                     </tr>
                 </tbody>

                 <tbody>
                 <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>
                     <tr>
                         <td>
                            <div class="text-md font-medium text-gray-900">Aset Tetap</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     {data.map((i, index) => (
                     <tr>
                         <td class="px-4">{i.namaAkun}</td>
                         <td></td>
                         <td>Rp. {i.debit}</td>
                         <td></td>
                     </tr>
                    ))}

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Aset Tetap</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. {data.reduce((init, curr) => (init += curr['debit']), 0)}</div>
                         </td>
                     </tr>
                 </tbody>



               <tbody>
                    <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>
                    <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Aset Lainnya</div>
                        </td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     {data.map((i, index) => (
                     <tr>
                         <td class="px-4">{i.namaAkun}</td>
                         <td></td>
                         <td>Rp. {i.debit}</td>
                         <td></td>
                     </tr>
                    ))}
                    

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Aset Lainnya</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp.{data.reduce((init, curr) => (init += curr['debit']), 0)}</div>
                         </td>
                     </tr>

              

                     <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Aset</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
                         </td>
                     </tr>
                     
                     <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>
                 </tbody>

             <thead class="thead-light">
               <tr>
                        <th>
                             <div class="text-md font-medium text-gray-900">Liabilitas dan Modal</div>
                       </th> 
                        <th></th>
                        <th></th>
                        <th></th>
                     </tr>
            </thead> 

            <tbody>
                     <tr>
                         <td>
                            <div class="text-md font-medium text-gray-900">Liabilitas Jangka Pendek</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     {data.map((i, index) => (
                     <tr>
                         <td class="px-4">{i.namaAkun}</td>
                         <td></td>
                         <td>Rp. {i.debit}</td>
                         <td></td>
                     </tr>
                    ))}
                    

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Liabilitas Jangka Pendek</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
                         </td>
                     </tr>
                 </tbody>


               <tbody>
                    <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>
                    <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Liabilitas Jangka Panjang</div>
                        </td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     {data.map((i, index) => (
                     <tr>
                         <td class="px-4">{i.namaAkun}</td>
                         <td></td>
                         <td>Rp. {i.debit}</td>
                         <td></td>
                     </tr>
                    ))}
                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Liabilitas Jangka Panjang</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
                         </td>
                     </tr>

                     <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Liabilitas</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
                         </td>
                     </tr>
                     
                     <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>
                     
                 </tbody>

                 <tbody>
                     <tr>
                         <td>
                            <div class="text-md font-medium text-gray-900">Modal</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     {data.map((i, index) => (
                     <tr>
                         <td class="px-4">{i.namaAkun}</td>
                         <td></td>
                         <td>Rp. {i.debit}</td>
                         <td></td>
                     </tr>
                    ))}

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Modal</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
                         </td>
                     </tr>

                     <tr>
                         <td></td>
                         <td></td>
                         <td></td>
                         <td></td>
                     </tr>

                     <tr>
                         <td>
                             <div class="text-md font-medium text-gray-900">Total Liabilitas dan Modal</div>
                         </td>
                         <td></td>
                         <td></td>
                         <td>
                             <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
                         </td>
                     </tr>


                 </tbody>
             </Table> 
     </div>
     </Layout>	
    )
}


