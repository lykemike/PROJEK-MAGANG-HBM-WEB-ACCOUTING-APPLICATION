import React from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Col, Row, FormCheck, Card } from 'react-bootstrap';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function addProduk({ data, data2, data3 }) {
	// Form Validation
	const ProdukSchema = Yup.object().shape({
		file_upload: Yup.string().required('required'),
		nama: Yup.string().required('required'),
		kode_sku: Yup.string().required('required'),
		kategori_akun: Yup.string().required('required'),
		unit: Yup.number().integer().required('required'),
		deskripsi: Yup.string().required('required'),
		hbs: Yup.number().integer().required('required'),
		akun_pembelian: Yup.number().integer().required('required'),
		pajak_beli: Yup.string().required('required'),
		hjs: Yup.number().integer().required('required'),
		akun_penjualan: Yup.number().integer().required('required'),
		pajak_jual: Yup.string().required('required'),
	})

	// Produk Api
	const url = 'http://localhost:3000/api/produk/createProduk';

	// Redirect
	const router = useRouter()

	// Batal Button Function
	function cancelButton() {
		router.push('../produk/tabel-produk')
	}

	return (
		<Layout>
			<Formik
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

				validationSchema={ProdukSchema}
				onSubmit={async (values) => {
					console.log(values);
					Axios.post(url, values).
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
											{props.errors.file_upload && props.touched.file_upload ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.file_upload}</div>
												: null}
										</Col>
									</Row>

									{/* Nama */}
									<Row className="mb-2">
										<Col sm="2">
											<Form.Label>Nama</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" placeholder="" name="nama" onChange={props.handleChange} />
											{props.errors.nama && props.touched.nama ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.nama}</div>
												: null}
										</Col>
									</Row>

									{/* Kode / SKU */}
									<Row className="mb-2">
										<Col sm="2">
											<Form.Label>Kode / SKU</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" placeholder="" name="kode_sku" onChange={props.handleChange} />
											{props.errors.kode_sku && props.touched.kode_sku ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.kode_sku}</div>
												: null}
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
												{data3.map((kategoriProduk) => (
													<option key={kategoriProduk.id} value={kategoriProduk.id}>{kategoriProduk.nama}</option>
												))}
											</Form.Control>
											{props.errors.kategori_akun && props.touched.kategori_akun ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.kategori_akun}</div>
												: null}
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
											{props.errors.unit && props.touched.unit ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.unit}</div>
												: null}
										</Col>
									</Row>

									{/* Deskripsi */}
									<Row className="mb-12">
										<Col sm="2">
											<Form.Label>Deskripsi</Form.Label>
										</Col>
										<Col sm="4">
											<Form.Control className="mb-2" placeholder="" name="deskripsi" onChange={props.handleChange} />
											{props.errors.deskripsi && props.touched.deskripsi ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.deskripsi}</div>
												: null}
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
											<Form.Control className="mb-2" placeholder="Rp. 0,00" name="hbs" onChange={props.handleChange} />
											{props.errors.hbs && props.touched.hbs ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.hbs}</div>
												: null}
										</Col>
										<Col>
											<Form.Label>Akun Pembelian</Form.Label>
											<Form.Control className="mb-2" as="select" name="akun_pembelian" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												{data.map((akunPembelian) => (
													<option key={akunPembelian.id} value={akunPembelian.id}>{akunPembelian.nama_akun}</option>
												))}
											</Form.Control>
											{props.errors.akun_pembelian && props.touched.akun_pembelian ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.akun_pembelian}</div>
												: null}
										</Col>
										<Col>
											<Form.Label>Pajak Beli</Form.Label>
											<Form.Control className="mb-2" as="select" name="pajak_beli" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												<option value="1">1</option>
												<option value="2">2</option>
											</Form.Control>
											{props.errors.pajak_beli && props.touched.pajak_beli ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.pajak_beli}</div>
												: null}
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
											<Form.Control className="mb-2" placeholder="Rp. 0,00" name="hjs" onChange={props.handleChange} />
											{props.errors.hjs && props.touched.hjs ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.hjs}</div>
												: null}
										</Col>
										<Col>
											<Form.Label>Akun Penjualan</Form.Label>
											<Form.Control className="mb-2" as="select" name="akun_penjualan" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												{data2.map((akunPenjualan) => (
													<option key={akunPenjualan.id} value={akunPenjualan.id}>{akunPenjualan.nama_akun}</option>
												))}
											</Form.Control>
											{props.errors.akun_penjualan && props.touched.akun_penjualan ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.akun_penjualan}</div>
												: null}
										</Col>
										<Col>
											<Form.Label>Pajak Jual</Form.Label>
											<Form.Control className="mb-2" as="select" name="pajak_jual" onChange={props.handleChange}>
												<option disabled>Pilih</option>
												<option value="1">1</option>
												<option value="2">2</option>
											</Form.Control>
											{props.errors.pajak_jual && props.touched.pajak_jual ?
												<div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.pajak_jual}</div>
												: null}
										</Col>
									</Row>

									<Row>
										<Col className="d-flex justify-content-end mt-10">
											<Button variant="danger mr-2" onClick={cancelButton}>Batal</Button>
											<Button variant="success" onClick={props.handleSubmit}>Tambah</Button>
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
	// Get kategori akun penjualan and pembelian from akun model
	const getAkunPembelian = await prisma.akun.findMany({
		where:
		{
			kategoriId: 15
		}
	})

	const getAkunPenjualan = await prisma.akun.findMany({
		where:
		{
			kategoriId: 13
		}
	});

	const getKategoriProduk = await prisma.kategoriProduk.findMany()

	return {
		props: {
			data: getAkunPembelian,
			data2: getAkunPenjualan,
			data3: getKategoriProduk
		}
	}
}
