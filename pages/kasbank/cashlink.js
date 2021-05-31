import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Card, Form, Row,Col,FormGroup, Dropdown } from 'react-bootstrap';


import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const cashlink = () => {
    return (
        <Layout>
        <div variant="container">
        <div class="text-md font-medium text-gray-900 mb-2">
            Kas & Bank / Kode Akun - Nama Akun</div>
            <h4 class="mt-2 mb-4">
                Koneksi Cash Link
                </h4>  
               
				<Card>
					<Card.Body>
						<Form>
								<Row className="mb-2">
								
								<h3>
                                    <div class="text-md font-medium text-gray-900 ml-2 mb-2">Cashlink Profile</div>
                                    </h3>
							</Row>

							<Row className="mb-2">
								<Col sm="2">
									<Form.Label>Nama Bank</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control as="select" defaultValue="Choose...">
										<option>Pilih</option>
										<option>BCA</option>
										<option>BNI</option>
									</Form.Control>
								</Col>
							</Row>

                            <Row className="mb-2">
								<Col sm="2">
									<Form.Label>ID Perusahaan</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control placeholder="Masukkan ID" />
								</Col>
							</Row>

							<Row className="mb-2">
								<Col sm="2">
									<Form.Label>Hubungkan ke akun</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control as="select" defaultValue="Choose...">
										<option>Pilih</option>
										<option>Akun 1</option>
										<option>Akun 2</option>
									</Form.Control>
								</Col>
							</Row>

                            <Row className="mb-2">
							
								<h3>
                                    <div class="text-md font-medium text-gray-900 ml-2 mb-2 mt-2">Informasi Rekening</div>
                                    </h3>
							</Row>

                            <Row className="mb-2">
								<Col sm="2">
									<Form.Label>Nama Pemilik Rekening</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control placeholder="Isi nama pemilik rekening" />
								</Col>
							</Row>

							<Row className="mb-2">
								<Col sm="2">
									<Form.Label>ID KBB Korporat</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control placeholder="Isi ID KBB" />
								</Col>
							</Row>

							<Row className="mb-2">
								<Col sm="2">
									<Form.Label>Nomor Rekening</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control placeholder="Isi nomor rekening" />
								</Col>
							</Row>

							<Row className="mb-2">
								<Col sm="2">
									<Form.Label>Nama sesuai KTP/KITAS pemilik rekening</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control placeholder="Isi nama sesuai KTP" />
								</Col>
							</Row>

							<Row className="mb-2">
								<Col sm="2">
									<Form.Label>Nomor Induk Kependudukan (NIK)</Form.Label>
								</Col>
								<Col sm="10">
									<Form.Control placeholder="Isi NIK" />
								</Col>
							</Row>

                            <Row className="mb-2">
								<Col sm="2">
									<Form.Label>Memo</Form.Label>
								</Col>
								<Col sm="10">
                                <FormGroup>
                            <Form.Control as="textarea" rows="4" /> 
                                </FormGroup>
								</Col>
							</Row>


							<Row>
								<Col className="d-flex justify-content-end mt-10">
                                <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Batal</Button>
                                <Button variant="success"><CheckCircleIcon fontSize="medium"/> Buat Transferan</Button>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card> 
        </div>
        </Layout>
    )
}

export default cashlink
