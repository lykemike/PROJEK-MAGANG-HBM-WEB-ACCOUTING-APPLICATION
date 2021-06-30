import React from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Form, Button, FormCheck } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/Link';

export default function BayarNanti() {
	return (
		<Layout>
			<div>
				<h4>Transaksi</h4>
				<h4>Penerimaan Pembayaran</h4>
				<hr />
			</div>
			<Form>
				<Row sm="12">
					<Col sm="3">
						<Form.Label className="font-medium">Pelanggan :</Form.Label>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Setor Ke :</Form.Label>
					</Col>

					<Col className="d-flex justify-content-end mr-3">
						<Row>
							<h4 className="mr-2">Total</h4>
							<h4>Rp. 0,00</h4>
						</Row>
					</Col>
				</Row>

				<hr />

				<div class="mb-14">
					<Row sm="12">
						<Col sm="3">
							<Form.Label className="font-medium">Cara Pembayaran : </Form.Label>
						</Col>

						<Col sm="3">
							<Form.Label className="font-medium">Tanggal Pembayaran : </Form.Label>
						</Col>

						<Col sm="3">
							<Form.Label className="font-medium">Tanggal Jatuh Tempo : </Form.Label>
						</Col>

						<Col sm="3">
							<Form.Label className="font-medium">No. Transaksi : </Form.Label>
						</Col>
					</Row>
				</div>
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

					<Row className="mb-12">
						<Col sm="2">
							<p>1-11001</p>
						</Col>

						<Col sm="2"></Col>

						<Col sm="2">
							<p>XXXX</p>
						</Col>

						<Col sm="2">
							<p>XXXX</p>
						</Col>

						<Col sm="2"></Col>

						<Col sm="2"></Col>
					</Row>
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

						<Col sm="3">
							<h4>Rp. 0,00</h4>
						</Col>
					</Row>
				</div>

				<Row>
					<Col className="d-flex justify-content-end mt-10">
						<Button variant="primary mr-2"> Cetak </Button>
						<Link href="/jual/penerimaan-pembayaran">
							<Button variant="danger mr-2">Batal</Button>
						</Link>
						<Link href="/jual/penjualan">
							<Button variant="success">Buat Transferan</Button>
						</Link>
					</Col>
				</Row>
			</Form>
		</Layout>
	);
}
