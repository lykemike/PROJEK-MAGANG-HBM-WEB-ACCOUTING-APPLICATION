import React from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Form, Button, FormCheck } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/Link';

import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function BayarNanti({data5}) {
	const router = useRouter();
	const { id } = router.query;

	return (
		<Layout>
			<Formik>
        {(props) => (
          <Forms noValidate>
			<div>
				<h4>Transaksi</h4>
				<h4>Pengiriman Pembayaran</h4>
				<hr />
			</div>
			<Form>
			
				<Row sm="12">
					{data.map((i) => (
					<Col sm="3">
						<Form.Label className="font-medium">Supplier</Form.Label>
						<Form.Control placeholder={i.kontak.nama_panggilan} />
					</Col>
					))}
					<Col sm="3">
						<Form.Label className="font-medium">Bayar Dari</Form.Label>
						<Form.Control as='select' name='pembayaran' onChange={props.handleChange}>
                        <option value='kosong'>Pilih</option>
                        {data5.map((akun) => (
                          <option key={akun.id} value={akun.id}>
                            {akun.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
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
						<Form.Label className="font-medium">Cara Pembayaran</Form.Label>
					
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Tanggal Pembayaran</Form.Label>
						<Form.Control placeholder="" type="date" />
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Tanggal Jatuh Tempo</Form.Label>
						<Form.Control placeholder="" type="date" />
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">No. Transaksi</Form.Label>
						<Form.Control placeholder="Auto" />
					</Col>
				</Row>

				<Row sm="12">
					<Col></Col>
					<Col></Col>
					<Col></Col>
					<Col sm="3">
						<Form.Label className="font-medium">Tag</Form.Label>
						<Form.Control placeholder="No Tag" />
					</Col>
				</Row>

				<hr />

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

					<Col sm="2">
						<Form.Control placeholder="" />
					</Col>
				</Row>

				{/* <Button variant="primary">
					<AddIcon fontSize="small" />Tambah data
				</Button> */}

				<Row sm="12" className="mt-3">
					<Col sm="3">
						<Form.Label className="font-medium">Memo</Form.Label>
						<Form.Control as="textarea" rows={4} />
					</Col>
					<Col sm="3">
						<Form.Label className="font-medium">Lampiran</Form.Label>
						<Form>
							<Form.File id="custom-file-translate-scss" label="ukuran maksimal 10MB/File" lang="en" custom />
						</Form>
					</Col>
				</Row>

				<Row sm="12">
					<Col sm="3" />
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
						<Link href="/beli/pembelian">
							<Button variant="danger mr-2">Batal</Button>
						</Link>
						<Link href="/beli/pengiriman-pembayaran-final">
							<Button variant="success">Bayar</Button>
						</Link>
					</Col>
				</Row>
			
			</Form>
			</Forms>
        )}
      </Formik>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { id } = context.query;
	// Get kontak,produk,pajak from API
	const header = await prisma.headerPembelian.findMany({
		where: {
		  id: parseInt(id),
		},
		include: {
		  kontak: true,
		  DetailPembelian: true,
		},
	  });

	const kontaks = await prisma.kontakDetail.findMany({
	  where: {
		kontak_type_id: 1,
	  },
	  // orderBy: {
	  //   id: "asc",
	  // },
	  include: {
		kontak: true,
	  },
	});
  
	const pajaks = await prisma.pajak.findMany({
	  orderBy: [
		{
		  id: "asc",
		},
	  ],
	});
  
	const produks = await prisma.produk.findMany({
	  orderBy: [
		{
		  id: "asc",
		},
	  ],
	  include: {
		satuan: true,
	  },
	});
  
  
	const akunKasBank = await prisma.akun.findMany({
	  where: {
		kategoriId: 3,
	  },
	});
  
  
	return {
	  props: {
		data: header,
		data2: pajaks,
		data3: produks,
		data5: akunKasBank,
	  },
	};
  }
  