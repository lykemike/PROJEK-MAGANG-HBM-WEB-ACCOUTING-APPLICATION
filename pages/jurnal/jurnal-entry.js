import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Form, Row, Col, Button } from 'react-bootstrap'
import CloseIcon from '@material-ui/icons/Close';


export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch(`http://localhost:3000/api/jurnal-entry`)
	const data = await res.json()

	// Pass data to the page via props
	return { props: { data } }
}

export default function jurnalentry({ data }) {
	// const [nama, setNama] = useState('')
	// useEffect(async () => {
	// 	let response = await fetch('/api/hello')
	// 	let data = await response.json()
	// 	setNama(data.name)
	// }, [])
	return (
		<Layout>
			<h3>Transaksi</h3>
			<h2 class="mb-4">Jurnal Entry #XX</h2>
			<Form>
				<Form.Group as={Row} controlId="formPlaintext">
					<Col sm="3">
						Tgl. Transaksi: <br />
                            XX/XX/XXXX
                        </Col>
					<Col sm="3">
						No. Transaksi <br />
                            XX
                        </Col>
					<Col sm="3">
					</Col>
					<Col sm="3">
						<button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">Cetak</button>
					</Col>

				</Form.Group>
			</Form>
			<table class="min-w-full table-auto">
				<thead class="justify-between">
					<tr class="bg-dark">
						<th class="px-2 py-2">
							<span class="text-gray-300">No Akun</span>
						</th>
						<th class="px-8 py-2">
							<span class="text-gray-300">Akun</span>
						</th>
						<th class="px-2 py-2">
							<span class="text-gray-300">Deskripsi</span>
						</th>
						<th class="px-2 py-2">
							<span class="text-gray-300">Debit(in IDR)</span>
						</th>
						<th class="px-2 py-2">
							<span class="text-gray-300">Kredit(in IDR)</span>
						</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{data.map((i, index) => (
						<tr>
							<td class="px-2 py-2 whitespace-nowrap font-large">
								<div class="text-lg text-gray-900">0{index + 1}</div>
							</td>
							<td class="px-8 py-2 whitespace-nowrap font-large">
								<div class="text-lg text-gray-900">{i.akun}</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap font-large">
								<div class="text-lg text-gray-900">{i.deskripsi}</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap font-large">
								<div class="text-lg text-gray-900">Rp. {i.debit}</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap font-large">
								<div class="text-lg text-gray-900">Rp. {i.kredit}</div>
							</td>
						</tr>

					))}
					<tr>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">02</div>
						</td>
						<td class="px-8 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">qyan</div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">test</div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">Rp. 0,00</div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">Rp. 0,00</div>
						</td>
					</tr>
					<tr class="bg-gray-200">
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900"></div>
						</td>
						<td class="px-8 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900"></div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900"></div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">
								Total Debit <br />
                                        Rp. {data.reduce((init, curr) => (init += curr['debit']), 0)}
							</div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">
								Total Kredit <br />
                                        Rp. 0,00
                                        </div>
						</td>
					</tr>
				</tbody>
			</table>

			<Form>
				<Form.Group as={Row} controlId="formPlaintext">
					<Col sm="3">
						<div class="px-0 py-3">
							<button type="button" class="focus:outline-none text-white text-sm py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg">Hapus</button>
						</div>
					</Col>
					<Col sm="3">
					</Col>
					<Col sm="3">
					</Col>
					<Col sm="3">
						<div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
							<button onclick="openModal(false)" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none"><CloseIcon fontSize="small" /> Batal</button>
							<button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Submit</button>
						</div>
					</Col>

				</Form.Group>
			</Form>
		</Layout>
	)
}