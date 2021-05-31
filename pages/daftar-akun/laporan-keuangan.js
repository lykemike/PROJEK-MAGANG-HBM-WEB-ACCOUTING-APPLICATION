import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Tabs, Tab, Card, Button } from 'react-bootstrap';

export default function LaporanKeuangan () {
	return (
		<Layout>
			<div variant="container">
				<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
					<Tab eventKey="trialBalance" title="Trial Balance" />
					<Tab eventKey="labaRugi" title="Laba-Rugi" />
					<Tab eventKey="neraca" title="Neraca" />
					<Tab eventKey="arusKas" title="Arus Kas" />

					<div eventKey="trialBalance">
						<div class="mt-8">
							<div class="flex flex-row-reverse mb-2">
								<Button variant="primary">Cetak</Button>
							</div>
							<Card>
								<Card.Body>
									<h1>Trial Balance</h1>
								</Card.Body>
							</Card>
						</div>
					</div>

					<div eventKey="labaRugi">
						<div class="mt-8">
							<div class="flex flex-row-reverse mb-2">
								<Button variant="primary">Cetak</Button>
							</div>
							<Card>
								<Card.Body>
									<h1>Laba - Rugi</h1>
								</Card.Body>
							</Card>
						</div>
					</div>

					<div eventKey="neraca">
						<div class="mt-8">
							<div class="flex flex-row-reverse mb-2">
								<Button variant="primary">Cetak</Button>
							</div>
							<Card>
								<Card.Body>
									<h1>Neraca</h1>
								</Card.Body>
							</Card>
						</div>
					</div>

					<div eventKey="arusKas">
						<div class="mt-8">
							<div class="flex flex-row-reverse mb-2">
								<Button variant="primary">Cetak</Button>
							</div>
							<Card>
								<Card.Body>
									<h1>Arus Kas</h1>
								</Card.Body>
							</Card>
						</div>
					</div>
				</Tabs>

				<div class="float-right mt-8">
					<Button variant="danger mr-2">Kembali</Button>
					<Link href="/daftar-akun/tutup-buku-berhasil">
						<Button variant="success">Konfirmasi Tutup Buku</Button>
					</Link>
				</div>
			</div>
		</Layout>
	);
}
