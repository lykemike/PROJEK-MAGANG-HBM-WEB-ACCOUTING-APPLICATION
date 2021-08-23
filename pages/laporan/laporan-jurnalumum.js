import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton ,Row,Col,Form, FormControl,InputGroup, Dropdown } from 'react-bootstrap';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporanjurnalumum({ data }) {

    return (
        <Layout>
       	<div variant="container">
               <div></div>
				<h4 class="mb-6 mt-2">
                   Jurnal Umum
                    </h4>
					<div class="mb-10">
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
				</div>

				
				<Table class="table mt-4">
					<thead class="thead-light">
						<tr>
							<th scope="col">Akun</th>
							<th scope="col" />
                            <th></th>
							<th scope="col">Debit</th>
							<th scope="col">Kredit</th>
						</tr>
					</thead>	
				{data.map((i,index) => (
					<tbody key={index}>

						<td>Journal Entry #{i.id} || created on {i.tgl_transaksi} </td>
					
						<tr>
							<td>{i.DetailJurnal.akun.kode_akun}</td>
							<td></td>
                            <td></td>
							{/* <td>Rp. {i.debit}</td>
							<td>Rp. {i.kredit}</td> */}
						</tr>
						

						{/* <tr>
							<td>1-10002</td>
							<td>Bank Account</td>
                            <td></td>
							<td>Rp. 0,00</td>
							<td class="text-muted">Rp. 0,00</td>
						</tr>
						<tr>
							<td>1-10751</td>
							<td>Accumalted Depreciation - Building</td>
                            <td></td>
							<td class="text-muted">Rp. 0,00</td>
							<td>Rp. 0,00</td>
						</tr>

						<tr>
                            <td></td>
							<td>
								<div class="text-md text-gray-900" />
							</td>
							<td>
								<div class="text-md font-medium text-gray-900">Total</div>
							</td>
							<td>
								<div class="text-md font-medium text-gray-900">Rp. 0.00</div>
							</td>
							<td>
								<div class="text-md font-medium text-gray-900">Rp. 0.00</div>
							</td>
						</tr> */}

					</tbody>
					))}
				</Table>
			</div>
        </Layout>
    )
}

export async function getServerSideProps() {

    const header = await prisma.headerJurnal.findMany({
      orderBy: {
       	id: "asc"
      },
		  DetailJurnal: {
			include:{
				akun: true,
			}
      },
    });
  
    return {
      props: {
        data: header,
      },
    };
  }
  