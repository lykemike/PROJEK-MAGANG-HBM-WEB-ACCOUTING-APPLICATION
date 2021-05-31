import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown } from 'react-bootstrap';

const laporanrekonsilasi = () => {
    return (
        <Layout>
       	<div variant="container">
               <div></div>
				<h4 class="mb-8 mt-5">
                    Laporan Rekonsilasi(dalam IDR)
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

                        <Table class="table mt-4">
					<thead class="thead-light">
						<tr>
							<th scope="col">Tanggal</th>
							<th>Deskripsi</th>
                            <th></th>
							<th scope="col"></th>
							<th scope="col"></th>
                            <th scope="col">Jumlah</th>
						</tr>
					</thead>
					<tbody>
					
						<tr>
							<td>1-10001</td>
							<td>Saldo di Jurnal</td>
                            <td></td>
							<td></td>
							<td></td>
                            <td>Rp 0,00</td>
						</tr>
                        <tr>
							<td>Ditambah Pembayaran Utang</td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td></td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td></td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td>
                            <div class="text-md font-medium text-gray-900">Total Pembayaran Utang
                            </div>
                            </td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td> <div class="text-md font-medium text-gray-900">Rp. 0,00
                            </div></td>
						</tr>
                        <tr>
							<td>Dikurangi Pemasukkan Terhutang</td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td></td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td></td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td>
                            <div class="text-md font-medium text-gray-900">Total Transaksi Rekening Koran yang Belum Direkonsiliasi	
                            </div>
                            </td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td> <div class="text-md font-medium text-gray-900">Rp. 0,00
                            </div></td>
						</tr>
                        <tr>
							<td></td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td></td>
							<td></td>
                            <td></td>
							<td></td>
							<td></td>
                            <td></td>
						</tr>
                        <tr>
							<td>1-10001</td>
							<td>Saldo Rekening Koran</td>
                            <td></td>
							<td></td>
							<td></td>
                            <td>Rp 0,00</td>
						</tr>

					</tbody>
				</Table>
            
		</div>
        </Layout>	
    )
}

export default laporanrekonsilasi
