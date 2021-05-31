import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown } from 'react-bootstrap';

const mutasirek = () => {
    return (
        <Layout>
       	<div variant="container">
               <div></div>
				<h4 class="mb-8 mt-5">
                    Mutasi Rekening (dalam IDR)
                    </h4>
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
                                <span>Tanggal Import</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Terekonsiliasi</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Sumber</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Terima</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Kirim</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Saldo</span>
                            </th>
                        </tr>
                        </thead>    
                      
                    </Table>              
            
		</div>
        </Layout>	
    )
}

export default mutasirek
