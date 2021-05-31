import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton,Row,Col,InputGroup,FormControl,Form, Dropdown } from 'react-bootstrap';

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://localhost:3000/api/laporan-bukubesar`)
	const data = await res.json()

	// Pass data to the page via props
	return { props: { data } }
}

export default function bukubesar({ data }) {

	return (
		<Layout>
			<div variant="container">
				<div></div>
				<h4 class="mb-8 mt-2">
					Buku Besar
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
							<th scope="col">Akun</th>
							<th>Transaksi</th>
							<th>Nomor</th>
							<th scope="col">Debit</th>
							<th scope="col">Kredit</th>
							<th scope="col">Saldo</th>
						</tr>
					</thead>
					<tbody>
						<td>Journal Entry</td>

						{data.map((i, index) => (
							<tr>
								<td>{i.akun}</td>
								<td>{i.transaksi}</td>
								<td>{i.nomor}</td>
								<td>{i.debit}</td>
								<td>{i.kredit}</td>
								<td>{i.saldo}</td>
							</tr>
						))}
						{/* <tr>
							<td>1-10002</td>
							<td>Bank Account</td>
							<td>0-12</td>
							<td></td>
							<td class="text-muted">Rp. 0,00</td>
							<td>-</td>
						</tr>
						<tr>
							<td>1-10751</td>
							<td>Accumalted Depreciation - Building</td>
							<td>1-05</td>
							<td class="text-muted">Rp. 0,00</td>
							<td>Rp. 0,00</td>
							<td></td>
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
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td>
								<div class="text-md text-gray-900" />
							</td>
							<td>
								<div class="text-md font-medium text-gray-900">Grand Total</div>
							</td>
							<td>
								<div class="text-md font-medium text-gray-900">Rp. 0.00</div>
							</td>
							<td>
								<div class="text-md font-medium text-gray-900">Rp. 0.00</div>
							</td>
							<td>-</td>
						</tr> */}

					</tbody>
				</Table>

			</div>
		</Layout>

	)
}

