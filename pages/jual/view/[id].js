import React from 'react';
import Layout from '../../../components/Layout';
import { Row, Col, Form, Button, FormCheck } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/Link';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default function sales_invoice({data}) {
	return (
		<Layout>
        		
			<div>
				<h4>Transaksi</h4>
				<h4>Sales Invoice #XX</h4>
				<hr />
			</div> 
            {data.map((i) => (
    
			<Form>
                <Row sm="12">
					<Col sm="3">
						<Form.Label className="font-medium">Pelanggan: {i.id_kontak.nama} </Form.Label>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Email: {i.email}</Form.Label>
					</Col>
					<Col className="d-flex justify-content-end mr-3">
						<Row>
							<h4 className="mr-2">Total</h4>

							<h4>Rp. 0,00</h4>
						</Row>
					</Col>
				</Row>

				<hr />

				<div class="mb-10">
					<Row sm="12">
						<Col sm="3">
							<Form.Label className="font-medium">Alamat Penagihan:</Form.Label>
                            <p>{i.alamatpenagihan}  </p>
						</Col>

						<Col sm="3">
							<Form.Label className="font-medium">Tgl Transaksi: </Form.Label>
                            <p>{i.tgltransaksi} </p>
                            <Form.Label className="font-medium">Tgl Jatuh Tempo: </Form.Label>
                            <p>{i.tgljatuhtempo} </p>
                            <Form.Label className="font-medium">Syarat Pembayaran: {i.syaratpembayaran}</Form.Label>
						</Col>

                        <Col sm="3">
							<Form.Label className="font-medium">No Transaksi: {i.notransaksi} </Form.Label><br />
                            <Form.Label className="font-medium">Tag:{i.tag} </Form.Label><br />
                            <Form.Label className="font-medium">No Referensi Tagihan:{i.no_ref_penagihan} </Form.Label>
						</Col>

					</Row>
				</div>
				<hr />

				<div class="mb-10">
					<Row sm="10">
						<Col sm="2">
							<Form.Label className="font-medium">Produk</Form.Label>
						</Col>

						<Col sm="2">
							<Form.Label className="font-medium">Deskripsi</Form.Label>
						</Col>

						<Col sm="1">
							<Form.Label className="font-medium">Kuantitas</Form.Label>
						</Col>

						<Col sm="1">
							<Form.Label className="font-medium">Satuan</Form.Label>
						</Col>

						<Col sm="2">
							<Form.Label className="font-medium">Harga Satuan</Form.Label>
						</Col>

                        <Col sm="1">
							<Form.Label className="font-medium">Diskon</Form.Label>
						</Col>

                        <Col sm="1">
							<Form.Label className="font-medium">Pajak</Form.Label>
						</Col>
						<Col sm="2">
							<Form.Label className="font-medium">Jumlah</Form.Label>
						</Col>
					</Row>

					<hr />

					<Row className="mb-12">
						<Col sm="2">
							<p></p>
						</Col>

						<Col sm="2">
                            <p></p>
                        </Col>

						<Col sm="2">
							<p></p>
						</Col>
                        
                        <Col sm="2">
                            <p></p>
                        </Col>

                        <Col sm="2">
                            <p></p>
                        </Col>

						<Col sm="2">
							<p></p>
						</Col>

						<Col sm="2">
                            <p></p>
                        </Col>

						<Col sm="2">
                            <p></p>
                        </Col>
					</Row>
				</div>

			

				<div class="mt-20">
					<Row sm="12">
						<Col sm="3" />

						<Col sm="3" />
                        <Col sm="3" />

						<Col sm="3">
                        <Form.Group as={Row} controlId="formPlaintext">
								<Col sm="6">Sub Total</Col>
								<Col sm="4">Rp.-</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="formPlaintext">
								<Col sm="6">Diskon</Col>
								<Col sm="4">Rp.0,00</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="formPlaintext">
								<Col sm="6">Nama Pajak</Col>
								<Col sm="4">Rp.0,00</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="formPlaintext">
							    <Col sm="6">Total</Col>
								<Col sm="4">Rp.0,00</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="formPlaintext">
								<Col sm="6">Jumlah Pemotongan</Col>
								<Col sm="4"></Col>
						</Form.Group>
						<Form.Group as={Row} controlId="formPlaintext">
								<Col sm="6">Sudah Dibayar</Col>
								<Col sm="4">Rp.0,00</Col>
						</Form.Group>
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
			))}
	</Layout>
	);
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  // Get biaya from API
  const juals = await prisma.penjualan.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
     id_kontak: true,
	 Penjualandetail: true,
    },
  });

  return {
    props: {
      data: juals,
    },
  };
}


