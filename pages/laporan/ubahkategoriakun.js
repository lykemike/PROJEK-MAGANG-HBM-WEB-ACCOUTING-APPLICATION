import React from 'react';
import Layout from '../../components/Layout';
import { Form, Row, Col, Button } from 'react-bootstrap';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

export default function  () {
	return (
		<Layout>
			 <div class="text-md font-medium text-gray-900 mb-2">
           
           Akun - Kategori Akun
           <Row>
               <Col>
                   <h4 class="mt-2 mb-3">
                       Ubah Akun
                       </h4>
                </Col>
                </Row>
           </div>

			<div class="mt-12 container">
				<Form>
					<Row className="mb-3">
						<Col sm="2">Nama</Col>
						<Col sm="6">
							<Form.Control type="text" placeholder="Nama" />
						</Col>
					</Row>

					<Row className="mb-3">
						<Col sm="2">Nomor</Col>
						<Col sm="6">
							<Form.Control type="text" placeholder="Auto" disabled />
						</Col>
					</Row>

					<Row className="mb-3">
						<Col sm="2">Kategori</Col>
						<Col sm="6">
							<Form.Control as="select">
								<option value='' >Kategori select</option>
								<option>Akun Piutang</option>
								<option>Aktiva Lancar Lainnya</option>
								<option>Kas & Bank</option>
								<option>Persediaan</option>
								<option>Aktiva Tetap</option>
								<option>Aktiva Lainnya</option>
								<option>Depresiasi & Amortisasi</option>
								<option>Akun Hutang</option>
								<option>Kartu Kredit</option>
								<option>Kewajiban Lancar Lainnya</option>
								<option>Kewajiban Jangka Panjang</option>
								<option>Ekuitas</option>
								<option>Pendapatan</option>
								<option>Pendapatan Lainnya</option>
								<option>Harga Pokok Penjualan</option>
								<option>Beban</option>
								<option>Beban Lainnya</option>

							</Form.Control>
						</Col>
					</Row>

					<Row className="mb-3">
						<Col sm="2">Detail</Col>
						<Col sm="6">
							<Form.Control as="select">
								<option>None</option>
								<option>Sub - Akun Dari:</option>
								<option>Akun Header Dari:</option>
							</Form.Control>
						</Col>
					</Row>

                    <Row className="mb-4">
						<Col sm="2">Saldo</Col>
						<Col sm="6">
							Rp. 0,00
						</Col>
					</Row>

					<Row className="mb-4">
						<Col sm="2">Deskripsi</Col>
						<Col sm="6">
							<Form.Control as="textarea" rows={3} />
						</Col>
					</Row>

					<Row className="mb-3">
						<Form.Label column sm="2" />
						<Col sm="6">
							<Button variant="danger mr-4">Batal</Button>
							<Button variant="success">Perbarui Akun</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</Layout>
	);
}
