import React from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Form, Button, FormCheck } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/Link';

export default function BayarNanti () {
	return (
		<Layout>
			<div>
				<h4>Buat Biaya</h4>
				<hr />
			</div>
			<Form>
				<Row sm="12">
					<Col sm="3" />

					<Col>
						<Row className="py-2 px-2">
							<FormCheck />
							<p className="font-medium">Bayar Nanti</p>
						</Row>
					</Col>

					<Col className="d-flex justify-content-end mr-3">
						<Row>
							<h4 className="mr-2">Total</h4>
							<h4>Rp. 0,00</h4>
						</Row>
					</Col>
				</Row>

				<hr />

				<Row sm="12">
					<Col sm="3">
						<Form.Label className="font-medium">Penerima</Form.Label>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Tanggal Transaksi</Form.Label>
						<Form.Control placeholder="Auto" />
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Cara Pembayaran</Form.Label>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">No. Transaksi</Form.Label>
						<Form.Control placeholder="Auto" />
					</Col>

					<Col sm="3" className="mt-3">
						<Form.Label className="font-medium">Alamat Penagihan</Form.Label>
						<Form.Control as="textarea" rows={4} />
					</Col>

					<Col sm="3" className="mt-3">
						<Form.Label className="font-medium">Tanggal Jatuh Tempo</Form.Label>
						<Form.Control placeholder="Auto" />
					</Col>

					<Col sm="3" className="mt-3">
						<Form.Label className="font-medium">Syarat Pembayaran</Form.Label>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>
				</Row>

				<Row className="d-flex justify-content-end mr-3">
					<div class="float-right mt-2 mb-4">
						<Form.Check label="Harga Termasuk Pajak" type="switch" id="custom-switch" />
					</div>
				</Row>

				<hr />

				<Row sm="12">
					<Col sm="3">
						<Form.Label className="font-medium">Akun Biaya</Form.Label>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Deskripsi</Form.Label>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Pajak</Form.Label>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Jumlah</Form.Label>
					</Col>
				</Row>

				<hr />

				<Row className="mb-3">
					<Col>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>

					<Col>
						<Form.Control placeholder="" />
					</Col>

					<Col>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>

					<Col>
						<Form.Control placeholder="" />
					</Col>
				</Row>

				<Row className="mb-3">
					<Col>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>

					<Col>
						<Form.Control placeholder="" />
					</Col>

					<Col>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>

					<Col>
						<Form.Control placeholder="" />
					</Col>
				</Row>

				<Button variant="primary">
					<AddIcon fontSize="small" />Tambah data
				</Button>

				<Row sm="12" className="mt-3">
					<Col sm="3">
						<Form.Label className="font-medium">Memo</Form.Label>
						<Form.Control as="textarea" rows={4} />
					</Col>
					<Col sm="3">
						<Form.Label className="font-medium">Lampiran</Form.Label>
						<Form>
							<Form.File
								id="custom-file-translate-scss"
								label="ukuran maksimal 10MB/File"
								lang="en"
								custom
							/>
						</Form>
					</Col>
					<Col className="mt-3">
						<Col>
							<p>SubTotal</p>
							<p>Pajak</p>
							<p>Total</p>
							<p>Pemotongan</p>
						</Col>
					</Col>
					<Col className="mt-3">
						<Col>
							<p>Rp. 0,00</p>
							<p>Rp. 0,00</p>
							<p>Rp. 0,00</p>
						</Col>
					</Col>
				</Row>

				<Row sm="12">
					<Col sm="3" />

					<Col sm="3">
						<Form.Control as="select" defaultValue="Choose...">
							<option />
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</Form.Control>
					</Col>
					<Col sm="3">
						<Form.File id="custom-file-translate-html" label="" data-browse="% Rp." custom />
					</Col>
					<Col sm="3">
						<Col className="mt-2">
							<p>Rp. 0,00</p>
						</Col>
					</Col>
				</Row>

				<Row sm="12" className="mt-3">
					<Col sm="3" />

					<Col sm="3" />

					<Col sm="3">
						<h4>Total</h4>
					</Col>

					<Col sm="3">
						<h4>Rp. 0,00</h4>
					</Col>
				</Row>

				<Row>
					<Col className="d-flex justify-content-end mt-10">
						<Button variant="danger mr-2">Batal</Button>
						<Link href="/biaya/expense-nanti">
							<Button variant="success">Buat Transferan</Button>
						</Link>
					</Col>
				</Row>
			</Form>
		</Layout>
	);
}
