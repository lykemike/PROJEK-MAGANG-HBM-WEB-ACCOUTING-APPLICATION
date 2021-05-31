import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Form, Row, Col, Card, Button } from 'react-bootstrap';
import ErrorIcon from '@material-ui/icons/Error';

export default function PeriodeFinansial () {
	return (
		<Layout>
			<div variant="container">
				<h1>Periode Finansial</h1>
				<div class="mt-12 container">
					<p class="font-medium">Anda akan melakukan proses tutup buku untuk periode finansial: </p>
					<Form>
						<Row className="mb-3">
							<Form.Label column sm="2">
								Dari Tanggal
							</Form.Label>
							<Col sm="2">
								<Form.Control type="text" placeholder="MM/DD/YYYY" />
							</Col>
						</Row>

						<Row className="mb-3">
							<Form.Label column sm="2">
								Sampai Tanggal
							</Form.Label>
							<Col sm="2">
								<Form.Control type="text" placeholder="MM/DD/YYYY" />
							</Col>
						</Row>
					</Form>

					<Card body class="bg-red-100">
						<p>
							<ErrorIcon /> Setelah proses tutup buku, Anda tidak dapta melakukan perubahan terhadap buku
							Anda pada tanggal SEBELUM MM/DD/YYYY
						</p>
					</Card>
					<div class="mt-2">
						<Button variant="danger mr-2">Batal</Button>
						<Link href="/daftar-akun/laporan-keuangan">
							<Button variant="success">Lanjut</Button>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
