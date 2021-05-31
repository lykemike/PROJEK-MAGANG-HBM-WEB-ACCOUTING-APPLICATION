import React from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Button, InputGroup, FormControl, FormCheck } from 'react-bootstrap';
import Link from 'next/link';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';


export default function Pengeluaran() {
	return (
		<Layout>
			<div>
				<h4 class="text-gray-500">Biaya</h4>
				<Row>
					<Col>
						<h3 class="text-blue-600">Pengeluaran</h3>
					</Col>
					<Col className="d-flex justify-content-end">
						<Link href="/biaya/buat-biaya">
							<Button variant="primary">
								<AddIcon fontSize="small" />Buat Biaya Baru
							</Button>
						</Link>
					</Col>
				</Row>

				<hr />

				<Row sm="4">
					<Col>
						<hr className="bg-black " />
						<p className="font-medium">Total Biaya Bulan ini (dalam IDR)</p>
						<hr className="bg-black" />
						<p style={{ fontSize: 25 }} class="text-gray-500">
							Rp.
						</p>
						{/* <p style={{ fontSize: 25 }} class="text-gray-500">
							Rp. {data.reduce((init, curr) => (init += curr['total']), 0)}
						</p> */}
						<hr className="bg-black" />
					</Col>
					<Col>
						<hr className="bg-black" />
						<p className="font-medium">Biaya Belum Dibayar (dalam IDR)</p>
						<hr className="bg-black" />
						<p style={{ fontSize: 25 }} class="text-gray-500">
							Rp.
						</p>
						{/* <p style={{ fontSize: 25 }} class="text-gray-500">
							Rp. {data.reduce((init, curr) => (init += curr['sisaTagihan']), 0)}
						</p> */}
						<hr className="bg-black" />
					</Col>
				</Row>

				<hr />

				<Row>
					<Col>
						<h4>Daftar Biaya</h4>
					</Col>
					<Col sm="3">
						<InputGroup>
							<InputGroup.Prepend>
								<InputGroup.Text id="basic-addon1">
									<SearchIcon />
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl placeholder="Cari" aria-label="cari" aria-describedby="basic-addon1" />
						</InputGroup>
					</Col>
				</Row>

				<hr />

				<table class="min-w-full table-auto">
					<thead class="justify-between">
						<tr class="bg-dark">
							<th class="px-2 py-2">
								<FormCheck />
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Tanggal</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Nomor</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Kategori</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Penerima</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Status</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Sisa Tagihan (dalam IDR)</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Total (dalam IDR)</span>
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">

						<tr>
							<th class="px-2 py-2">
								<FormCheck />
							</th>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">08/8/99</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">5</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">-</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">-</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">
									<span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">-</span>
								</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp.-</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp.-</div>
							</td>
						</tr>

						<tr>
							<th class="px-2 py-2">
								<FormCheck />
							</th>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">3/25/2021</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">001</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Hutang</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Jennie Kim</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">
									<span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Pending</span>
								</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 3,500,000</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 10,000,000</div>
							</td>
						</tr>

						<tr>
							<th class="px-2 py-2">
								<FormCheck />
							</th>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">3/25/2021</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">002</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Hutang</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Lisa Manoban</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">
									<span class="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs">
										Scheduled
									</span>
								</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 5,678,833</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 5,678,833</div>
							</td>
						</tr>

						<tr>
							<th class="px-2 py-2">
								<FormCheck />
							</th>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">3/25/2021</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">003</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Hutang</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Roseanne Park</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">
									<span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">
										Completed
									</span>
								</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 0,00</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 18,339,212</div>
							</td>
						</tr>

						<tr>
							<th class="px-2 py-2">
								<FormCheck />
							</th>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">3/25/2021</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">004</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">-</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Jisoo</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">
									<span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
										Active
									</span>
								</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 0,00</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Rp. 0,00</div>
							</td>
						</tr>

					</tbody>
				</table>
			</div>
		</Layout>
	);
}
