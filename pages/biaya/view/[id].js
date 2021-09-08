import React from 'react';
import Layout from '../../../components/Layout';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function Expense ({data, data2}) {

	 // Redirect Function and Take URL Parameter [id]
    const router = useRouter();
    const { id } = router.query

	function pembayaran() {
		router.push(`../pembayaran/${id}`);
	  }
		
	const totalPajak = data2.reduce((a,b) => (a = a+b.hasil_pajak),0)

	return (
		<Layout>
			<div>
				<h4 class="text-gray-500">Biaya</h4>
				<Row>
					<Col>
						<h3 class="text-blue-600">Expense #{id}</h3>
					</Col>
					 <Col>
          {data[0].sisa_tagihan > 0 ? <h3 className="mt-2 mb-3 float-right">Belum Dibayar</h3> : <h3 className="mt-2 mb-3 float-right text-green-500">Lunas</h3>}
          </Col>
				</Row>

				<hr />
				{data.map((i) => (
				<Row>
					<Col sm="3">
						<p className="font-medium">Bayar Dari</p>
					</Col>

					<Col>
						<p class="text-blue-600 ">{i.akun1.nama_akun}</p>
					</Col>

					<Col className="d-flex justify-content-end mr-3">
						<Row>
							<h4 className="mr-2">Total Amount</h4>
							<h4 class="text-blue-600">Rp. {i.sisa_tagihan}</h4>
						</Row>
					</Col>
				</Row>
				))}
				<hr />

				{data.map((i) => (
				<Row>
					<Col sm="2">
						<p className="font-medium">Penerima: </p>
					</Col>
					<Col sm="2">
						<p>{i.nama_penerima}</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Tanggal Transaksi:</p>
					</Col>
					<Col sm="2">
						<p>{i.tgl_transaksi}</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">No Transaksi:</p>
					</Col>
					<Col sm="2">
						<p>{i.no_transaksi}</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Alamat Penagihan:</p>
					</Col>
					<Col sm="2">
						<p>{i.alamat_penagihan}</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Tag:</p>
					</Col>
					<Col sm="2">
						<p>{i.tag}</p>
					</Col>

					<Col sm="2">
						<p className="font-medium">Cara Pembayaran:</p>
					</Col>
					<Col sm="2">
						<p>{i.cara_pembayaran}</p>
					</Col>
				</Row>
				))}

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

					{data2.map((i) => (
					<tbody class="bg-white divide-y divide-gray-200">
						<tr>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">{i.akun_biaya.nama_akun}</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">{i.deskripsi}</div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap">
								<div class="text-sm text-gray-900">{i.pajak.nama} - {i.pajak.presentasaAktif}% </div>
							</td>
							<td class="px-2 py-2 whitespace-nowrap d-flex justify-content-end">
								<div class="text-sm text-gray-900">Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</div>
							</td>
						</tr>
					</tbody>
					))}		
				</table>

				<hr />
				{data.map((i) => (
				<Row>
					<Col />
					<Col />
					<Col>
						<Col>
							<p>SubTotal</p>
							<p>Pajak</p>
							<p>Total</p>
							<p>Pemotongan</p>
						
							<h6>Sisa Tagihan</h6>
						</Col>
					</Col>

					<Col>
						<Col>
							<p>Rp. {i.subtotal.toLocaleString({ minimumFractionDigits: 0 })}</p>
							<p>Rp. {totalPajak.toLocaleString({ minimumFractionDigits: 0 })}</p>
							<p>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
							<p>Rp. {i.pemotongan.toLocaleString({ minimumFractionDigits: 0 })}</p>
							<h6>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</h6>
						</Col>
					</Col>
				</Row>
				))}
				<hr />

				<Row className="mt-32">
					<Col className="d-flex justify-content-end">
						<Button variant="danger" className="mr-4">
							Kembali
						</Button>
						<Button variant="success" onClick={pembayaran}>Bayar</Button>
					</Col>
				</Row>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const {id} = context.query
    // Get biaya from API
	const getheaderbiaya = await prisma.headerBiaya.findMany({
		where: {
		  id: parseInt(id),
		},
		include:{
			akun1: true,
			akun2: true,
			kontak: true,
			detail_biaya: true,
		}
	  });

	  const getdetailbiaya = await prisma.detailBiaya.findMany({ 
		  where :{
			  header_biaya_id: parseInt(id)
		  },
		  include:{
			  header_biaya: true,
			  akun_biaya: true,
			  pajak: true,

		  }
	  })
	 

    return {
        props: {
            data: getheaderbiaya,
			data2: getdetailbiaya
        }
    }
}
