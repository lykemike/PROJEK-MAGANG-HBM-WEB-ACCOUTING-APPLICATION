import React from 'react';
import Layout from '../../../../components/Layout';
import { Row, Col, Form, Button, FormCheck } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/Link';


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default function BayarNanti({data ,data2}) {
	
	return (
		<Layout>
			<div>
				<h4>Transaksi</h4>
				<h4>Penerimaan Pembayaran</h4>
				<hr />
			</div>
			{data.map((i) => (
			<Form>
				<Row sm="12">
					<Col sm="3">
						<Form.Label className="font-medium">Pelanggan : {i.kontak.nama}</Form.Label>

					</Col>

					<Col sm="3">
					{data2.map((i) => (
						<Form.Label className="font-medium">Setor Ke : {i.akun.nama_akun} </Form.Label>
						))}
					</Col>

					<Col className="d-flex justify-content-end mr-3">
						<Row>
							<h4 className="mr-2">Total</h4>
					
							{data2.map((i) => (
								<h4>Rp. {i.jumlah}</h4>
							))}
						</Row>
					</Col>
				</Row>

				<hr />
				{data.map((i) => (
				<div class="mb-14">
					<Row sm="12">
					{data2.map((i) => (
						<Col sm="3">
							<Form.Label className="font-medium">Cara Pembayaran : {i.cara_pembayaran} </Form.Label>
						</Col>
					))}
				
						<Col sm="3">
							<Form.Label className="font-medium">Tanggal Pembayaran : {i.tgl_transaksi} </Form.Label>
						</Col>

						<Col sm="3">
							<Form.Label className="font-medium">Tanggal Jatuh Tempo : {i.tgl_jatuh_tempo}</Form.Label>
						</Col>
						
						<Col sm="3">
							<Form.Label className="font-medium">No. Transaksi : {i.no_transaksi} </Form.Label>
						</Col>
					
					</Row>
				</div>
				))}
				<hr />

				<div class="mb-10">
					<Row sm="12">
						<Col sm="2">
							<Form.Label className="font-medium">Nomor</Form.Label>
						</Col>

						<Col sm="2">
							<Form.Label className="font-medium">Deskripsi</Form.Label>
						</Col>

						<Col sm="2">
							<Form.Label className="font-medium">Tgl Jatuh Tempo</Form.Label>
						</Col>

						<Col sm="2">
							<Form.Label className="font-medium">Total</Form.Label>
						</Col>

						<Col sm="2">
							<Form.Label className="font-medium">Sisa Tagihan</Form.Label>
						</Col>

						<Col sm="2">
							<Form.Label className="font-medium">Jumlah</Form.Label>
						</Col>
					</Row>

					<hr />
				{data2.map((i) => (
					<Row className="mb-12">
						<Col sm="2">
							<p>Sales Invoice #{i.id}</p>
						</Col>

						<Col sm="2">
							<p></p>
						</Col>
						
						{data.map((i) => (
						<Col sm="2">
							<p>{i.tgl_jatuh_tempo}</p>
						</Col>
					))}

					{data.map((i) => (
						<Col sm="2">
							<p>Rp. {i.total}</p>
						</Col>
					))}

					{data.map((i) => (
						<Col sm="2">
							<p>Rp. {i.sisa_tagihan}</p>
						</Col>
					))}
					
						<Col sm="2">{i.jumlah}</Col>

						<Col sm="2"></Col>
					</Row>
					))}
				</div>
				
				{/* <Button variant="primary">
					<AddIcon fontSize="small" />Tambah data
				</Button> */}

				<div class="mt-20">
					<Row sm="12">
						<Col sm="3" />

						<Col sm="3" />

						<Col sm="3">
							<h4>Total</h4>
						</Col>

						{data2.map((i) => (
						<Col sm="2">
							<h4>Rp. {i.jumlah}</h4>
						</Col>
					))}
					</Row>
				</div>

				{/* <Row>
					<Col className="d-flex justify-content-end mt-10">
						
						<Link href="/jual/penerimaan-pembayaran">
							<Button variant="danger mr-2">Batal</Button>
						</Link>
						<Link href="/jual/penjualan">
							<Button variant="success">Buat Transferan</Button>
						</Link>
					</Col>
				</Row> */}
			</Form>
			  ))}
		</Layout>
	);
}



export async function getServerSideProps(context) {
	const { id } = context.query;
  
	const header = await prisma.headerPenjualan.findMany({
	  where: {
		id: parseInt(id),
	  },
	  include: {
		kontak: true,
		DetailPenjualan: true,
	  },
	});
  
	const detail = await prisma.penerimaanPembayaran.findMany({
	  where: {
		header_penjualan_id: parseInt(id),
	  },
	  include: {
		header_penjualan: true,
		akun: true
	  },
	});
  
  
	return {
	  props: {
		data: header,
		data2: detail,
	  },
	};
  }
  