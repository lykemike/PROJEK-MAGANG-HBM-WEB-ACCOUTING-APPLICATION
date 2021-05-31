import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Button, Row, Col } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

export async function getServerSideProps() {
	// Fetch data from external API
	const res = await fetch('http://localhost:3000/api/api-daftar-akun/tutup-buku');
	const data = await res.json();

	// Pass data to the page via props
	return { props: { data } }
}

export default function TutupBuku({ data }) {
	return (
		<Layout>
			<div variant="container">
				<Row>
					<Col>
						<h3>Tutup Buku</h3>
					</Col>
					<Col className="d-flex justify-content-end">
						<Link href="/daftar-akun/periode-finansial">
							<Button>
								<AddIcon fontSize="small" />Mulai Tutup Buku
							</Button>
						</Link>
					</Col>
				</Row>

				<div class="mt-2">
					<table class="min-w-full table-auto">
						<thead class="justify-between">
							<tr class="bg-dark">
								<th class="px-2 py-2">
									<span class="text-gray-300">Periode</span>
								</th>
								<th class="px-48 py-2">
									<span class="text-gray-300">Catatan</span>
								</th>
								<th class="px-2 py-2">
									<span class="text-gray-300">Keuntungan Bersih/(Rugi)</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							{data.map((i, index) => (
								<tr>
									<td class="px-2 py-2 whitespace-nowrap">
										<div class="text-sm text-gray-900">Dari awal - {i.periode}</div>
									</td>
									<td class="px-48 py-2 whitespace-nowrap">
										<div class="text-sm text-gray-900">{i.catatan}</div>
									</td>
									<td class="px-2 py-2 whitespace-nowrap font-medium">
										<div class="text-sm text-gray-900">Rp. {i.untungRugi}</div>
									</td>
								</tr>
							))}

						</tbody>
					</table>
				</div>
			</div>
		</Layout>
	);
}
