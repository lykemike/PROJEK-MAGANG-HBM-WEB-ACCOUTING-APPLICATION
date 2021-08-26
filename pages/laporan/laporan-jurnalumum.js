import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton ,Row,Col,Form, FormControl,InputGroup, Dropdown } from 'react-bootstrap';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporanjurnalumum({ data,data2 }) {

	 console.log(data)
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
					<tbody>

					<td>Journal Entry #{i.header_jurnal_header_jurnalid} || created on {i.header_jurnal.tgl_transaksi} </td>
						<tr>
							<td></td>
							<td></td>
                            <td></td>
							{/* <td>Rp. {i.debit}</td>
							<td>Rp. {i.kredit}</td> */}
						</tr>	
					</tbody>
				))}

	
				
				</Table>
			</div>
        </Layout>
    )
}

export async function getServerSideProps() {

    const detail = await prisma.detailJurnal.findMany({
      orderBy: {
       	id: "asc"
      },
	  include: {
		  akun: true,
		  header_jurnal: true,
	  }
    });

	const header = await prisma.headerJurnal.findMany({
		orderBy: {
			 id: "asc"
		},  
	  });
	  



	// const headerPenjualan = await prisma.headerPenjualan.findMany({
	// 	orderBy: {
	// 		id: 'asc'
	// 	},
	// 	JurnalPenjualan: {
	// 		select:{
	// 			nama_akun: true,
	// 		}
	// 	}
	// })

  
    return {
      props: {
        data: detail,
		data2: header
      },
    };
  }
  