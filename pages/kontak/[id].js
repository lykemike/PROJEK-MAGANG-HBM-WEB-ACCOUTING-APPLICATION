import React, { useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { Form, Row, Col, FormCheck, Button, Card } from 'react-bootstrap';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { Formik, Form as Forms } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default function BuatKontakBaru({ data, data2 }) {
	// Form validation
	const KontakSchema = Yup.object().shape({
		namaPanggilan: Yup.string().min(4).required('*required'),
		nama: Yup.string().min(4).required('*required'),
		nomorHp: Yup.number().required('*required'),
		nomorIdentitas: Yup.string().required('*required'),
		email: Yup.string().min(5).email().required('*required'),
		infoLain: Yup.string().min(1).required('*required'),
		namaPerusahaan: Yup.string().min(5).required('*required'),
		nomorTelepon: Yup.number().min(1).required('*required'),
		nomorFax: Yup.number().min(1).required('*required'),
		nomorNpwp: Yup.number().min(15).required('*required'),
		alamatPembayaran: Yup.string().min(10).required('*required'),
		alamatPengiriman: Yup.string().min(10).required('*required'),
		namaBank: Yup.string().min(3).required('*required'),
		kantorCabangBank: Yup.string().min(3).required('*required'),
		pemegangAkunBank: Yup.string().min(3).required('*required'),
		nomorRekening: Yup.number().min(8).required('*required'),
	});

	//Kontak API
	const getkontak = 'http://localhost:3000/api/kontak/getKontak';
	const updatekontak = 'http://localhost:3000/api/kontak/updateKontak';

	//Take Parameter [ID]
	const router = useRouter();
	const { id } = router.query

	// Get Existing Role data based on [id]
	const formikref = useRef(null)
	const getdata = async () => {
		Axios.post(getkontak, {

			id: id

		}).then(function (response) {
			formikref.current.setFieldValue('namaPanggilan', response.data.data.nama_panggilan)
			formikref.current.setFieldValue('nama', response.data.data.nama)
			formikref.current.setFieldValue('nomorHp', response.data.data.nomor_hp)
			formikref.current.setFieldValue('nomorIdentitas', response.data.data.nomor_identitas)
			formikref.current.setFieldValue('email', response.data.data.email)
			formikref.current.setFieldValue('infoLain', response.data.data.info_lain)
			formikref.current.setFieldValue('namaPerusahaan', response.data.data.nama_perusahaan)
			formikref.current.setFieldValue('nomorTelepon', response.data.data.nomor_telepon)
			formikref.current.setFieldValue('nomorFax', response.data.data.nomor_fax)
			formikref.current.setFieldValue('nomorNpwp', response.data.data.nomor_npwp)
			formikref.current.setFieldValue('alamatPembayaran', response.data.data.alamat_pembayaran)
			formikref.current.setFieldValue('alamatPengiriman', response.data.data.alamat_pengiriman)
			formikref.current.setFieldValue('namaBank', response.data.data.nama_bank)
			formikref.current.setFieldValue('kantorCabangBank', response.data.data.kantor_cabang_bank)
			formikref.current.setFieldValue('pemegangAkunBank', response.data.data.pemegang_akun_bank)
			formikref.current.setFieldValue('nomorRekening', response.data.data.nomor_rekening)
		}).
			catch(function (error) {
				console.log(error)
			})
	};
	useEffect(() => {
		getdata()
	}, [])

	// Batal Button Function
	function cancelButton() {
		router.push('')
	}

	return (
		<Layout>
			<Formik
				innerRef={formikref}
				initialValues={{
					namaPanggilan: '',
					gelar: '',
					nama: '',
					nomorHp: '',
					tipeIdentitas: '',
					nomorIdentitas: '',
					email: '',
					infoLain: '',
					namaPerusahaan: '',
					nomorTelepon: '',
					nomorFax: '',
					nomorNpwp: '',
					alamatPembayaran: '',
					alamatPengiriman: '',
					namaBank: '',
					kantorCabangBank: '',
					pemegangAkunBank: '',
					nomorRekening: '',
					akunPiutang: '',
					akunHutang: '',
					syaratPembayaranUtama: '',
				}}
				validationSchema={KontakSchema}
				onSubmit={async (values) => {
					let data = { ...values, id }
					Axios.post(updatekontak, data).
						then(function (response) {
							console.log(response)
							router.push('../kontak/tabel-kontak')

						}).
						catch(function (error) {
							console.log(error)

						})
				}}
			>
				{(props) => (
					<Forms noValidate>
						<div>
							<h4>Kontak</h4>
							<h3>Edit Kontak</h3>
							<hr />
							<Card>
								<Card.Body>
									<Form>
										{/* Info Kontak */}
										<Row className="mb-2">
											<PersonOutlineOutlinedIcon fontSize="medium" className="mt-1.5" />
											<h3>Info Kontak</h3>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Nama Panggilan</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.namaPanggilan} type="text" name="namaPanggilan" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.namaPanggilan && props.touched.namaPanggilan ?
													<div class="text-red-500 text-sm">
														{props.errors.namaPanggilan}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Tipe Kontak (dapat lebih dari 1)</Form.Label>
											</Col>
											<Col sm="10" class="ml-8">
												<Row>
													<FormCheck />
													<p class="ml-2 mr-4" value="1">Pelanggan</p>
													<FormCheck />
													<p class="ml-2 mr-4" value="2">Supplier</p>
													<FormCheck />
													<p class="ml-2 mr-4" value="3">Karyawan</p>
													<FormCheck />
													<p class="ml-2 mr-4" value="4">Lainnya</p>
												</Row>
											</Col>
										</Row>

										{/* Info Kontak */}
										<Row className="mb-2">
											<BusinessCenterOutlinedIcon fontSize="large" />
											<h3>Informasi Umum</h3>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Nama Kontak</Form.Label>
											</Col>
											<Col sm="10">
												<Row>
													<Col sm="2">
														<Form.Control as="select" defaultValue="Choose..." name="gelar" onChange={props.handleChange} onBLur={props.handleBlur}>
															<option disabled>(Kosong)</option>
															<option value="Mr.">Mr. </option>
															<option value="Ms.">Ms. </option>
															<option value="Mrs.">Mrs. </option>
														</Form.Control>
													</Col>
													<Col>
														<Form.Control placeholder={props.values.nama} type="text" name="nama" onChange={props.handleChange} onBLur={props.handleBlur} />
														{props.errors.nama && props.touched.nama ?
															<div class="text-red-500 text-sm">
																{props.errors.nama}
															</div>
															: null}
													</Col>
												</Row>
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Handphone</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.nomorHp} type="text" name="nomorHp" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.nomorHp && props.touched.nomorHp ?
													<div class="text-red-500 text-sm">
														{props.errors.nomorHp}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Identitas</Form.Label>
											</Col>
											<Col >
												<Row>
													<Col sm="2">
														<Form.Control as="select" defaultValue="Choose..." name="tipeIdentitas" onChange={props.handleChange} onBLur={props.handleBlur}>
															<option disabled>Pilih</option>
															<option value="Passport">Passport</option>
															<option value="KTP">KTP</option>
															<option value="SIM">SIM</option>
															<option value="BPJS">BPJS</option>
														</Form.Control>
													</Col>
													<Col>
														<Form.Control placeholder={props.values.nomorIdentitas} type="text" name="nomorIdentitas" onChange={props.handleChange} onBLur={props.handleBlur} />
														{props.errors.nomorIdentitas && props.touched.nomorIdentitas ?
															<div class="text-red-500 text-sm">
																{props.errors.nomorIdentitas}
															</div>
															: null}
													</Col>
												</Row>
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Email</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder="Email" type={props.values.email} name="email" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.email && props.touched.email ?
													<div class="text-red-500 text-sm">
														{props.errors.email}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Info Lain</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.infoLain} type="text" name="infoLain" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.infoLain && props.touched.infoLain ?
													<div class="text-red-500 text-sm">
														{props.errors.infoLain}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Nama Perusahaan</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.namaPerusahaan} type="text" name="namaPerusahaan" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.namaPerusahaan && props.touched.namaPerusahaan ?
													<div class="text-red-500 text-sm">
														{props.errors.namaPerusahaan}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Telepon</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.nomorTelepon} type="text" name="nomorTelepon" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.nomorTelepon && props.touched.nomorTelepon ?
													<div class="text-red-500 text-sm">
														{props.errors.nomorTelepon}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Fax</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder="Fax" type={props.values.nomorFax} name="nomorFax" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.nomorFax && props.touched.nomorFax ?
													<div class="text-red-500 text-sm">
														{props.errors.nomorFax}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>NPWP</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder="NPWP" type={props.values.nomorNpwp} name="nomorNpwp" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.nomorNpwp && props.touched.nomorNpwp ?
													<div class="text-red-500 text-sm">
														{props.errors.npwp}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Alamat Pembayaran</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.alamatPembayaran} type="text" name="alamatPembayaran" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.alamatPembayaran && props.touched.alamatPembayaran ?
													<div class="text-red-500 text-sm">
														{props.errors.alamatPembayaran}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Alamat Pengiriman</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.alamatPengiriman} type="text" name="alamatPengiriman" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.alamatPengiriman && props.touched.alamatPengiriman ?
													<div class="text-red-500 text-sm">
														{props.errors.alamatPengiriman}
													</div>
													: null}
											</Col>
										</Row>

										{/* Daftar Bank */}
										<Row className="mb-2">
											<AccountBalanceOutlinedIcon fontSize="large" />
											<h3>Daftar Bank</h3>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<h5>Akun Bank</h5>
											</Col>
											<Col className="d-flex justify-content-end mr-3">
												<Row>
													<DeleteIcon fontSize="medium" />
													<h5>Hapus</h5>
												</Row>
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Nama Bank</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.namaBank} type="text" name="namaBank" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.namaBank && props.touched.namaBank ?
													<div class="text-red-500 text-sm">
														{props.errors.namaBank}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Kantor Cabang Bank</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.kantorCabangBank} type="text" name="kantorCabangBank" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.kantorCabangBank && props.touched.kantorCabangBank ?
													<div class="text-red-500 text-sm">
														{props.errors.kantorCabangBank}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Pemegang Akun Bank</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.pemegangAkunBank} type="text" name="pemegangAkunBank" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.pemegangAkunBank && props.touched.pemegangAkunBank ?
													<div class="text-red-500 text-sm">
														{props.errors.pemegangAkunBank}
													</div>
													: null}
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Nomor Rekening</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control placeholder={props.values.nomorRekening} type="text" name="nomorRekening" onChange={props.handleChange} onBLur={props.handleBlur} />
												{props.errors.nomorRekening && props.touched.nomorRekening ?
													<div class="text-red-500 text-sm">
														{props.errors.nomorRekening}
													</div>
													: null}
											</Col>
											<Col sm="12">
												<Button className="mb-2 mt-4" variant="outline-primary" block>
													<AddIcon fontSize="small" />Tambah Bank Lain
									</Button>
											</Col>
										</Row>

										{/* Pemetaan Akun*/}
										<Row className="mb-2">
											<InsertDriveFileOutlinedIcon fontSize="large" />
											<h3>Pemetaan Akun</h3>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Akun Piutang</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control as="select" defaultValue="Choose..." name="akunPiutang" onChange={props.handleChange} onBLur={props.handleBlur} >
													{data.map((akunPiutang) => (
														<option key={akunPiutang.id} value={akunPiutang.id}>{akunPiutang.nama_akun}</option>
													))}
												</Form.Control>
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Akun Hutang</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control as="select" defaultValue="Choose..." name="akunHutang" onChange={props.handleChange} onBLur={props.handleBlur}>
													{data2.map((akunHutang) => (
														<option key={akunHutang.id} value={akunHutang.id}>{akunHutang.nama_akun}</option>
													))}
												</Form.Control>
											</Col>
										</Row>

										<Row className="mb-2">
											<Col sm="2">
												<Form.Label>Syarat Pembayaran Utama</Form.Label>
											</Col>
											<Col sm="10">
												<Form.Control as="select" defaultValue="Choose..." name="syaratPembayaranUtama" onChange={props.handleChange} onBLur={props.handleBlur}>
													<option>Pilih</option>
													<option value="1">Tunai / Cash</option>
													<option value="2">Kredit / Term of Payment</option>
													<option value="3">15 hari</option>
													<option value="4">30 hari</option>
													<option value="5">End of Month (EOM)</option>
												</Form.Control>
											</Col>
										</Row>

										<Row>
											<Col className="d-flex justify-content-end mt-10">
												<Button variant="danger mr-2" onClick={cancelButton}>Batal</Button>
												<Link href="/kontak/informasi-kontak">
													<Button variant="success" type="submit" onClick={props.handleSubmit}>Simpan</Button>
												</Link>
											</Col>
										</Row>
									</Form>
								</Card.Body>
							</Card>
						</div>
					</Forms>
				)}
			</Formik>
		</Layout>
	);
}

export async function getServerSideProps() {
	const getAkunPiutang = await prisma.akun.findMany({
		where:
		{
			kategoriId: 1
		}
	});

	const getAkunHutang = await prisma.akun.findMany({
		where:
		{
			kategoriId: 8
		}
	});

	return {
		props: {
			data: getAkunPiutang,
			data2: getAkunHutang
		}
	}
}