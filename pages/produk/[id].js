import React, { useEffect, useRef } from 'react'
import Layout from '../../components/Layout';
import { Button, Form, Col, Row, FormCheck, Card } from 'react-bootstrap';
import LocalMallIcon from '@material-ui/icons/LocalMall';

import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'
import { useRouter } from 'next/router'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function updateProduk({ data, data2 }) {
	// Produk API
	const getProduk = 'http://localhost:3000/api/produk/getProduk'
	const updateProduk = 'http://localhost:3000/api/produk/updateProduk';

	// Take URL Parameter [id]
	const router = useRouter();
	const { id } = router.query

	// Get Existing Produk data based on [id]
	const formikref = useRef(null)
	const getData = async () => {
		Axios.post(getProduk, {

			id: id

		}).then(function (response) {
			formikref.current.setFieldValue('nama', response.data.data.nama)
			formikref.current.setFieldValue('kode_sku', response.data.data.kode_sku)
			formikref.current.setFieldValue('deskripsi', response.data.data.deskripsi)
			formikref.current.setFieldValue('hbs', response.data.data.hbs)
			formikref.current.setFieldValue('hjs', response.data.data.hjs)

		}).
			catch(function (error) {
				console.log(error)
			})
	};
	useEffect(() => {
		getData()
	}, [])

	// Batal Button Function
	function cancelButton() {
		router.push('../produk/tabel-produk')
	}

	return (
		<Layout>
			<Formik
				innerRef={formikref}
				initialValues={{
					file_upload: "",
					nama: "",
					kode_sku: "",
					kategori_akun: "",
					unit: "",
					deskripsi: "",
					hbs: "",
					akun_pembelian: "",
					pajak_beli: "",
					hjs: "",
					akun_penjualan: "",
					pajak_jual: "",
				}}

				// validationSchema={UserSchema}
				onSubmit={async (values) => {
					let data = { ...values, id }
					Axios.put(updateProduk, data).
						then(function (response) {
							console.log(response)
							router.push('../produk/tabel-produk')

						}).
						catch(function (error) {
							console.log(error)
						})
				}}
			>
				{(props) => (
					<Forms noValidate>
						<Form>
							<Row className="ml-2 mb-4">
								<LocalMallIcon fontSize="large" />
								<h3>Buat Produk / Jasa Baru</h3>
							</Row>
							<Card>
								<Card.Body>
									<h4>Info Product / Service</h4>

									{/* Gambar */}
									<Row className="mb-2">
										<Col sm="2">
											<Form.Label>Gambar</Form.Label>
										</Col>
										<Col sm="4">
											{/* <Form.File className="mb-2" id="formcheck-api-regular" name="file_upload" onChange={props.handleChange}>
												<Form.File.Input />
											</Form.File> */}
											<Form.Control className="mb-2" placeholder="" name="file_upload" onChange={props.handleChange} />
										</Col>
									</Row>

									{/* Nama */}
									<Row className="mb-2">
										<Col sm="2">
											<Form.Label>Nama</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" placeholder={props.values.nama} name="nama" onChange={props.handleChange} />
										</Col>
									</Row>

									{/* Kode / SKU */}
									<Row className="mb-2">
										<Col sm="2">
											<Form.Label>Kode / SKU</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" placeholder={props.values.kode_sku} name="kode_sku" onChange={props.handleChange} />
										</Col>
									</Row>

									{/* Kategori */}
									<Row className="mb-2">
										<Col sm="2">
											<Form.Label>Kategori</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" as="select" name="kategori_akun" onChange={props.handleChange}>
												{/* loop over kategori and show them */}
												<option disabled>Pilih</option>
												{data.map((kategori) => (
													<option key={kategori.id} value={kategori.id}>{kategori.nama}</option>

												))}
											</Form.Control>
										</Col>
									</Row>

									{/* Unit */}
									<Row className="mb-2">
										<Col sm="2">
											<Form.Label>Unit</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" as="select" name="unit" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
											</Form.Control>
										</Col>
									</Row>

									{/* Deskripsi */}
									<Row className="mb-12">
										<Col sm="2">
											<Form.Label>Deskripsi</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" placeholder={props.values.deskripsi} name="deskripsi" onChange={props.handleChange} />
										</Col>
									</Row>

									<h4>Harga</h4>
									<hr />
									<Row className="ml-2">
										<FormCheck />
										<h5>Saya Beli Produk Ini</h5>
									</Row>
									<hr />

									<Row sm="6">
										<Col>
											<Form.Label>Harga Beli Satuan</Form.Label>
											<Form.Control className="mb-2" placeholder={"Rp. " + props.values.hbs} name="hbs" onChange={props.handleChange} />
										</Col>
										<Col>
											<Form.Label>Akun Pembelian</Form.Label>
											<Form.Control className="mb-2" as="select" name="akun_pembelian" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												{data2.map((akun) => (
													<option key={akun.id} value={akun.id}>{akun.nama_akun}</option>
												))}


											</Form.Control>
										</Col>
										<Col>
											<Form.Label>Pajak Beli</Form.Label>
											<Form.Control className="mb-2" as="select" name="pajak_beli" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												<option value="1">1</option>
												<option value="2">2</option>
											</Form.Control>
										</Col>
									</Row>

									<hr />
									<Row className="ml-2">
										<FormCheck />
										<h5>Saya Jual Produk Ini</h5>
									</Row>
									<hr />

									<Row sm="6">
										<Col>
											<Form.Label>Harga Jual Satuan</Form.Label>
											<Form.Control className="mb-2" placeholder={("Rp. ") + props.values.hjs} name="hjs" onChange={props.handleChange} />
										</Col>
										<Col>
											<Form.Label>Akun Penjualan</Form.Label>
											<Form.Control className="mb-2" as="select" name="akun_penjualan" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												{data2.map((akun) => (
													<option key={akun.id} value={akun.id}>{akun.nama_akun}</option>
												))}
											</Form.Control>
										</Col>
										<Col>
											<Form.Label>Pajak Jual</Form.Label>
											<Form.Control className="mb-2" as="select" name="pajak_jual" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												<option value="1">1</option>
												<option value="2">2</option>
											</Form.Control>
										</Col>
									</Row>

									<Row>
										<Col className="d-flex justify-content-end mt-10">
											<Button variant="danger mr-2" onClick={cancelButton}>Batal</Button>
											<Button variant="success" onClick={props.handleSubmit}>Update</Button>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Form>
					</Forms>
				)}
			</Formik>
		</Layout >

	);
}

export async function getServerSideProps() {
	// Get Kategories from API
	const kategories = await prisma.kategoriProduk.findMany({
		orderBy: [
			{
				id: 'asc'
			}
		],
	});

	// Get Akuns from API
	const akuns = await prisma.akun.findMany({
		orderBy: [
			{
				kategoriId: 'asc'
			}
		]
	})

	return {
		props: {
			data: kategories,
			data2: akuns
		}
	}
}
