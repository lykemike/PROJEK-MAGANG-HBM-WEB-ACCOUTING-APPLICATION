import React from 'react';
import Layout from '../../components/Layout';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { Formik, Form as Forms } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const BuatAkunBaruSchema = Yup.object().shape({
	nama_akun: Yup.string().required('*Required'),
	kode_akun: Yup.string().required('*Required'),
	// kategori_akun: Yup.string().required('kategori_akun harus dipilih'),
	// detail: Yup.string().required('detail harus dipilih'),
	// deskripsi: Yup.string().required('*deskripsi tidak boleh kosong'),
});

export default function BuatAkunBaru({ data, data2 }) {
	const url = 'http://localhost:3000/api/daftar-akun/akun-baru';
	return (
		<Layout>
			<Formik
				initialValues={{
					nama_akun: '',
					kode_akun: '',
					sub_akun: '',
					header_akun: '',
					// deskripsi: '',
				}}
				validationSchema={BuatAkunBaruSchema}
				onSubmit={async (values) => {
					console.log(values)
					Axios.post(url, values).
						then(function (response) { console.log(response) }).
						catch(function (error) { console.log(error) })
				}}
			>
				{(props) => (
					<Forms noValidate>
						<h1>Buat Akun Baru</h1>
						<div class="mt-12 container">
							<Form>
								<Row className="mb-3">
									<Col sm="2">Nama Akun</Col>
									<Col sm="6">
										<Form.Control type="text" placeholder="Nama" name="nama_akun" onChange={props.handleChange} onBLur={props.handleBlur} />
										{props.errors.nama_akun && props.touched.nama_akun ? <div class="text-red-500 text-sm">{props.errors.nama_akun}</div> : null}
									</Col>
								</Row>

								<Row className="mb-3">
									<Col sm="2">Kode Akun</Col>
									<Col sm="6">
										<Form.Control type="text" placeholder="Auto" name="kode_akun" onChange={props.handleChange} onBLur={props.handleBlur} />
										{props.errors.kode_akun && props.touched.kode_akun ? <div class="text-red-500 text-sm">{props.errors.kode_akun}</div> : null}
									</Col>
								</Row>

								<Row className="mb-3">
									<Col sm="2">Sub Akun Dari</Col>
									<Col sm="6">
										<Form.Control as="select" name="sub_akun" onChange={props.handleChange} onBLur={props.handleBlur}>
											{/* loop over kategori and show them */}
											{data2.map((kategori) => (
												<option key={kategori.id} value={kategori.id}>{kategori.name}</option>
											))}
										</Form.Control>
										{props.errors.sub_akun && props.touched.sub_akun ? <div class="text-red-500 text-sm">{props.errors.sub_akun}</div> : null}
									</Col>
								</Row>

								<Row className="mb-3">
									<Col sm="2">Akun Header Dari</Col>
									<Col sm="6">
										<Form.Control as="select" name="header_akun" onChange={props.handleChange} onBLur={props.handleBlur}>
											{/* loop over tipe akun and show them */}
											{data.map((tipeAkun, index) => (
												<option key={tipeAkun.id} value={tipeAkun.id}>{tipeAkun.name}</option>
											))}

										</Form.Control>
										{props.errors.header_akun && props.touched.header_akun ? <div class="text-red-500 text-sm">{props.errors.header_akun}</div> : null}
									</Col>
								</Row>

								{/* <Row className="mb-3">
									<Col sm="2">Detail</Col>
									<Col sm="6">
										<Form.Control as="select" nama_akun="detail" onChange={props.handleChange} onBLur={props.handleBlur}>
											<option value='' disabled>None</option>
											<option value="sub1">Sub - Akun Dari:</option>
											<option value="sub2">Akun Header Dari:</option>
										</Form.Control>
										{props.errors.detail && props.touched.detail ? <div class="text-red-500 text-sm">{props.errors.detail}</div> : null}
									</Col>
								</Row> */}

								{/* <Row className="mb-3">
									<Col sm="2">Deskripsi</Col>
									<Col sm="6">
										<Form.Control as="textarea" rows={3} name="deskripsi" onChange={props.handleChange} onBLur={props.handleBlur} />
										{props.errors.deskripsi && props.touched.deskripsi ? <div class="text-red-500 text-sm">{props.errors.deskripsi}</div> : null}
									</Col>
								</Row> */}

								<Row className="mb-3">
									<Form.Label column sm="2" />
									<Col sm="6">
										<Button variant="danger mr-4" onClick={props.handleReset}>Batal</Button>
										<Button variant="success" type="submit" onClick={props.handleSubmit}>Buat</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</Forms>
				)}
			</Formik>
		</Layout >
	);
}

export async function getServerSideProps() {
	// get kategoris from our api
	const kategories = await prisma.kategori.findMany({
		orderBy: [
			{
				id: 'asc'
			}
		]
	});

	// get tipeAkun from our api
	const tipeAkuns = await prisma.tipeAkun.findMany({
		orderBy: [
			{
				id: 'asc'
			}
		]
	});

	return {
		props: {
			data: kategories,
			data2: tipeAkuns,
		}

	}
}
