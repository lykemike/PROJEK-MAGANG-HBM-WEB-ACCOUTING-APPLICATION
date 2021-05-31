import React from 'react';
import Layout from '../../components/Layout';
import { Button, Table, Row, Input, Form, Col } from 'react-bootstrap';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// export async function getServerSideProps() {
// 	// Fetch data from external API
// 	const res = await fetch('http://localhost:3000/api/api-daftar-akun/saldo-awal');
// 	const data = await res.json();

// 	// Pass data to the page via props
// 	return { props: { data } }
// }

export default function AturSaldoAwal({ data }) {
	return (
		<Layout>
			<div variant="container">
				<h1>Saldo Awal</h1>

				<div class="mt-12">
					<h4>Tanggal Konversi</h4>
					<input type="date" class="border rounded-lg px-3 py-2 mt-1 mb-4 text-sm grid-cols-12 " />
					<Table class="min-w-full table-auto" hover size="sm">
						<thead class="justify-between ">
							<tr class="bg-dark">
								<th class="px-4 py-2">
									<span class="text-gray-300">Kode Akun</span>
								</th>
								<th class="px-2 py-2">
									<span class="text-gray-300">Nama Akun</span>
								</th>
								<th class="px-2 py-2">
									<span class="text-gray-300">Debit</span>
								</th>

								<th class="px-2 py-2">
									<span class="text-gray-300">Kredit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{/* <tr>
								<td class="px-2 py-2 whitespace-nowrap">
									<div class="flex items-center">
										<div>
											<div class="text-sm font-medium text-gray-900">Aset</div>
										</div>
									</div>
								</td>
							</tr> */}

							{data.map(i => (
								<tr>
									<td class="px-2 py-2 whitespace-nowrap">
										<div class="flex items-center">
											<div>
												<div class="text-sm font-medium text-gray-900 ">{i.kode_akun}</div>
											</div>
										</div>
									</td>
									<td class="px-2 py-2 whitespace-nowrap">
										<div class="text-sm text-gray-900">{i.nama_akun}</div>
									</td>

									<td class="px-2 py-2 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											<Row>
												<Col sm="1">
													<p>Rp.</p>

												</Col>
												<Col sm="8">
													<Form.Control type="text" placeholder="" />
												</Col>

											</Row>
										</div>
									</td>
									<td class="px-2 py-2 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											<Row>
												<Col sm="1">
													<p>Rp.</p>

												</Col>
												<Col sm="8">
													<Form.Control type="text" placeholder="" />
												</Col>

											</Row>
										</div>
									</td>
								</tr>

							))}

							<tr class="bg-gray-200 ">
								<td class="px-2 py-2 whitespace-nowrap">
									<div class="flex items-center">
										<div>
											<div class="text-sm font-medium text-gray-900">Total</div>
										</div>
									</div>
								</td>
								<td class="px-2 py-2 whitespace-nowrap font-medium">
									<div class="text-sm text-gray-900" />
								</td>
								<td class="px-2 py-2 whitespace-nowrap font-medium">
									<div class="text-sm text-gray-900">Rp. {data.reduce((init, curr) => (init += curr['debit']), 0)}</div>
								</td>
								<td class="px-2 py-2 whitespace-nowrap font-medium">
									<div class="text-sm text-gray-900">Rp. {data.reduce((init, curr) => (init += curr['kredit']), 0)}</div>
								</td>
							</tr>
						</tbody>
					</Table >
				</div >

				<div class="mt-4">
					<Button variant="secondary">Reset</Button>
					<div className="float-right">
						<Button variant="danger mr-2">Batal</Button>
						<Link href="/daftar-akun/konfirmasi-saldo-awal">
							<Button variant="success">Terbitkan</Button>
						</Link>
					</div>
				</div>
			</div >
		</Layout >
	);
}

export async function getServerSideProps() {
	const akuns = await prisma.akun.findMany({
		orderBy: [
			{
				kode_akun: 'asc'
			}
		]
	});

	return {
		props: {
			data: akuns
		}

	}
}
