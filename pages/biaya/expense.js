import React from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function Expense () {

	 // Redirect Function and Take URL Parameter [id]
    const router = useRouter();
    const { id } = router.query
		
	return (
		<Layout>
			<div>
				<h4 class="text-gray-500">Biaya</h4>
				<Row>
					<Col>
						<h3 class="text-blue-600">Pengeluaran #EXP001</h3>
					</Col>
					<Col className="d-flex justify-content-end">
						<h3 class="text-black">LUNAS</h3>
					</Col>
				</Row>

				<hr />

				<Row>
					<Col sm="1">
						<p className="font-medium">Bayar Dari</p>
					</Col>

					<Col>
						<p class="text-blue-600 ">NAMA AKUN KAS & BANK</p>
					</Col>

					<Col className="d-flex justify-content-end mr-3">
						<Row>
							<h4 className="mr-2">Total Amount</h4>
							<h4 class="text-blue-600">Rp. 0,00</h4>
						</Row>
					</Col>
				</Row>

				<hr />

				<Row>
					<Col sm="2">
						<p className="font-medium">Penerima:</p>
					</Col>
					<Col sm="2">
						<p>Roseanne Park</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Tanggal Transaksi:</p>
					</Col>
					<Col sm="2">
						<p>3/25/2021</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">No Transaksi:</p>
					</Col>
					<Col sm="2">
						<p>TRAN001</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Alamat Penagihan:</p>
					</Col>
					<Col sm="2">
						<p>Jl. Jend. Sudirman</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Tag:</p>
					</Col>
					<Col sm="2">
						<p>XX</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Cara Pembayaran:</p>
					</Col>
					<Col sm="2">
						<p>Kartu Debit</p>
					</Col>
				</Row>

				<table class="min-w-full table-auto mt-12">
					<thead class="justify-between">
						<tr class="bg-dark">
							<th class="px-2 py-2">
								<span class="text-gray-300">Akun Biaya</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Deskripsi</span>
							</th>
							<th class="px-2 py-2">
								<span class="text-gray-300">Pajak</span>
							</th>
							<th class="px-2 py-2 d-flex justify-content-end">
								<span class="text-gray-300">Jumlah (dalam IDR)</span>
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Roseanne Park</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">Testing</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">13%</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap d-flex justify-content-end">
								<div class="text-sm text-gray-900">Rp. 130,000</div>
							</td>
						</tr>
					</tbody>
				</table>

				<hr />

				<Row>
					<Col />
					<Col />
					<Col>
						<Col>
							<p>SubTotal</p>
							<p>Nama Pajak</p>
							<p>Total</p>
							<p>Jumlah Pemotongan</p>
							<p>Sudah Dibayar</p>
							<h4>Sisa Tagihan</h4>
						</Col>
					</Col>
					<Col>
						<Col>
							<p>Rp. 1,000,000</p>
							<p>Pajak Testing</p>
							<p>Rp. 130,000</p>
							<p>Rp. 0,00</p>
							<p>Rp. 1,000,000</p>
							<h4>Rp. 130,000</h4>
						</Col>
					</Col>
				</Row>

				<hr />

				<Row className="mt-32">
					<Col>
						<Button variant="secondary">Hapus</Button>
					</Col>

					<Col>
						<Button variant="primary">Cetak</Button>
					</Col>

					<Col className="d-flex justify-content-end">
						<Button variant="danger" className="mr-4">
							Kembali
						</Button>
						<Button variant="success">Ubah</Button>
					</Col>
				</Row>
			</div>
		</Layout>
	);
}

// export async function getServerSideProps() {
//     // // Get biaya from API
//     // const biayas = await prisma.headerBiaya.findMany({
//     //     orderBy:
//     //         [
//     //             {
//     //                 id: 'asc'
//     //             }
//     //         ],
//     //     include: {
//     //         detail_biaya: true,
// 	// 					akun: true,
// 	// 					kontak: true,
//     //     }
//     // });

//     // return {
//     //     props: {
//     //         data: biayas,
//     //     }
//     // }
// }
