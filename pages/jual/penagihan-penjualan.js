import { React, useEffect } from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";

import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function penagihanpenjualan({ data, data2, data3 }) {
	const url = 'http://localhost:3000/api/jual/createpenjualan';
	const router = useRouter();
	//   const getdata = async () => {
	//     Axios.get( getkontak, {
	//         params: {
	//           id: 1
	//         }
	//       })
	//       .then(function (response) {
	//         console.log(response);
	//         console.log(id);
	//       })
	//       .catch(function (error) {
	//         console.log(error);
	//       })
	//       .then(function () {
	//         // always executed
	//       });
	// };

	return (
		<Layout>
			<Formik
				initialValues={{
					nama_pelanggan: '',
					email: '',
					alamat_penagihan: '',
					tgl_transaksi: '',
					tgl_jatuhtempo: '',
					syarat_pembayaran: '',
					no_transaksi: '',
					no_ref_penagihan: '',
					tag: '',
					total: '',
					produks: [
						{
							produk_ID: '',
							nama_produk: '',
							deskripsi_produk: '',
							kuantitas: '',
							satuan: '',
							harga_satuan: '',
							diskon: '',
							pajak: '',
							pajakID: '',
							jumlah: '',
							diskonperbaris: '',
							pajakperbaris: ''
						}
					],
					diskontambahan: '',
					sisatagihan: '',
					uangmuka: '',
					pesan: '',
					memo: '',
					fileattachment: ''
				}}
				// validationSchema={}
				onSubmit={async (values) => {
					console.log(values);
					Axios.post(url, values)
						.then(function (response) {
							console.log(response);
							router.push('sales-invoice');
						})
						.catch(function (error) {
							console.log(error);
						});
				}}>
				{(props) => (
					<Forms noValidate>
						<h3>Buat Penagihan Penjualan</h3>
						<div className="border-t border-gray-200">
							<Form>
								<Form.Group as={Row} controlId="formPlaintext">
									<Form.Label column sm="3">
										Pelanggan
									</Form.Label>
									<Form.Label column sm="3">
										Email
									</Form.Label>
								</Form.Group>
								<Form.Group as={Row} controlId="formPlaintext">
									<Col sm="3">
										<Form.Control
											as="select"
											name="nama_pelanggan"
											onChange={(e) => {
												props.setFieldValue('nama_pelanggan', e.target.value);
												if (e.target.value === '') {
													props.setFieldValue('email', ''), props.setFieldValue('alamat_penagihan', '');
												} else {
													let hasil = data.filter((i) => {
														return i.id === parseInt(e.target.value);
													});
													props.setFieldValue('email', hasil[0].email), props.setFieldValue('alamat_penagihan', hasil[0].alamat_pembayaran);
												}
											}}>
											<option value="">pilih pelanggan</option>
											{data.map((nama_pelanggan) => (
												<option key={nama_pelanggan.id} value={nama_pelanggan.id}>
													{nama_pelanggan.nama_panggilan}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col sm="3">
										<Form.Control
											type="text"
											placeholder=""
											name="email"
											value={props.values.email}
											onChange={(e) => {
												props.setFieldValue('email', e.target.value);
											}}></Form.Control>
									</Col>
									<Col sm="3"></Col>
									<Col sm="3">
										<Form.Label column sm="2" name="total">
											Rp.{props.values.total},00
										</Form.Label>
									</Col>
								</Form.Group>
							</Form>
						</div>
						<div className="border-t border-gray-200">
							<Form>
								<Form.Group as={Row} controlId="formPlaintext">
									<Form.Label column sm="3">
										<label for="message">Alamat Penagihan</label>
										<br />
										<textarea
											rows="3"
											id="message"
											class="px-16 py-2 border border-gray-800  "
											name="alamat_penagihan"
											value={props.values.alamat_penagihan}
											onChange={(e) => {
												props.setFieldValue('alamat_penagihan', e.target.value);
											}}></textarea>
									</Form.Label>
									<Form.Label column sm="3">
										Tgl Transaksi <br />
										<Form.Control
											type="date"
											placeholder="Auto"
											name="tgl_transaksi"
											onChange={
												props.handleChange
												// 	(e) => {
												// 	props.setFieldValue('tgl_transaksi', e.target.value);
												// 	let tgltransaksi = e.target.value.split('-');
												// 	tgltransaksi = new Date(tgltransaksi[0], tgltransaksi[1] - 1, tgltransaksi[2]);
												// 	tgltransaksi.setDate(tgltransaksi.getDate() + 30);
												// 	let tanggal = tgltransaksi.toLocaleDateString();
												// 	let tgl = tanggal.split('/');
												// 	props.setFieldValue('tgl_jatuhtempo', `${tgl[2]}-${tgl[0].length > 1 ? tgl[0] : '0' + tgl[0]}-${tgl[1]}`);
												// }
											}
										/>
										<br />
										Tgl Jatuh Tempo <br />
										<Form.Control type="date" placeholder="Auto" name="tgl_jatuhtempo" onChange={props.handleChange} value={props.values.tgl_jatuhtempo} /> <br />
										Syarat Pembayaran <br />
										<Form.Control as="select" defaultValue="Choose..." name="syarat_pembayaran" onChange={props.handleChange} onBLur={props.handleBlur}>
											<option>Pilih</option>
											<option value="Tunai / Cash">Tunai / Cash</option>
											<option value="Kredit / Term of Payment">Kredit / Term of Payment</option>
											<option value="15 hari">15 hari</option>
											<option value="30 hari">30 hari</option>
											<option value="End of Month (EOM)">End of Month (EOM)</option>
										</Form.Control>
										<br />
									</Form.Label>

									<Form.Label column sm="3">
										No Transaksi <br />
										<Form.Control type="text" placeholder="Auto" name="no_transaksi" onChange={props.handleChange} /> <br />
										No Referensi Penagihan <br />
										<Form.Control type="text" placeholder="" name="no_ref_penagihan" onChange={props.handleChange} /> <br />
										Tag <br />
										<Form.Control type="text" placeholder="" name="tag" onChange={props.handleChange} /> <br />
									</Form.Label>
								</Form.Group>
							</Form>
							<div class="flex flex-row-reverse">
								<FormControlLabel value="" control={<Switch color="primary" />} label="Harga Termasuk Pajak" labelPlacement="start" />
							</div>
						</div>
						<div className="border-t border-gray-200">
							<Form>
								<Form.Group as={Row} controlId="formPlaintext">
									<Form.Label column sm="2">
										Produk
									</Form.Label>
									<Form.Label column sm="2">
										Deskripsi
									</Form.Label>
									<Form.Label column sm="1">
										Kuantitas
									</Form.Label>
									<Form.Label column sm="1">
										Satuan
									</Form.Label>
									<Form.Label column sm="2">
										Harga Satuan
									</Form.Label>
									<Form.Label column sm="1">
										Diskon
									</Form.Label>
									<Form.Label column sm="1">
										Pajak
									</Form.Label>
									<Form.Label column sm="2">
										Jumlah
									</Form.Label>
								</Form.Group>
							</Form>
						</div>

						<div className="border-t border-gray-200">
							<Form className="py-2">
								<FieldArray name="produks">
									{({ insert, remove, push }) => (
										<div>
											{props.values.produks.length > 0 &&
												props.values.produks.map((i, index) => (
													<Form.Group as={Row} controlId="formPlaintext" key={index} name="produk_id">
														<Col sm="2">
															<Form.Control
																as="select"
																name={`produks.${index}.produk_ID`}
																onChange={(e) => {
																	props.setFieldValue(`produks.${index}.produk_ID`, e.target.value);
																	if (e.target.value === '') {
																		props.setFieldValue(`produks.${index}.deskripsi_produk`, ''),
																			props.setFieldValue(`produks.${index}.harga_satuan`, ''),
																			props.setFieldValue(`produks.${index}.diskon`, ''),
																			props.setFieldValue(`produks.${index}.harga_satuan`, ''),
																			props.setFieldValue(`produks.${index}.kuantitas`, ''),
																			props.setFieldValue(`produks.${index}.pajak`, ''),
																			props.setFieldValue(`produks.${index}.satuan`, ''),
																			props.setFieldValue(`produks.${index}.presentasaAktif`, '');
																	} else {
																		let hasil1 = data3.filter((i) => {
																			return i.id === parseInt(e.target.value);
																		});
																		props.setFieldValue(`produks.${index}.deskripsi_produk`, hasil1[0].deskripsi),
																			props.setFieldValue(`produks.${index}.harga_satuan`, hasil1[0].harga_jual_satuan);
																		props.setFieldValue(`produks.${index}.nama_produk`, data3.filter((i) => i.id === parseInt(e.target.value))[0].nama);
																		// console.log(data3.filter((i) => i.id === parseInt(e.target.value)));
																	}
																}}>
																<option value="">pilih produk</option>
																{data3.map((nama_produk) => (
																	<option key={nama_produk.id} value={nama_produk.id}>
																		{nama_produk.nama}
																	</option>
																))}
															</Form.Control>
														</Col>
														<Col sm="2">
															<Form.Control type="text" name={`produks.${index}.deskripsi_produk`} value={props.values.produks[index].deskripsi_produk}></Form.Control>
														</Col>
														<Col sm="1">
															<Form.Control
																type="number"
																name={`produks.${index}.kuantitas`}
																value={props.values.kuantitas}
																onChange={(e) => {
																	props.setFieldValue(`produks.${index}.kuantitas`, e.target.value);
																	let hasil = e.target.value * props.values.produks[index].harga_satuan;
																	let hasil1 = hasil - hasil * (props.values.produks[index].diskon / 100);
																	let hasilpajak = hasil1 + (hasil1 * props.values.produks[index].pajak) / 100;
																	props.setFieldValue((props.values.produks[index].jumlah = hasilpajak));

																	const subt = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);

																	props.setFieldValue('subtotal', subt);

																	let dpb = hasil * (props.values.produks[index].diskon / 100);
																	props.setFieldValue((props.values.produks[index].diskonperbaris = dpb));
																	const dbpt = props.values.produks.reduce((a, b) => (a = a + b.diskonperbaris), 0);
																	props.setFieldValue('diskonperbaris', dbpt);

																	let diskontambahan = (subt * props.values.diskontambahan) / 100;
																	props.setFieldValue((props.values.hasildiskontambahan = diskontambahan));

																	let ppb = (hasil1 * props.values.produks[index].pajak) / 100;
																	props.setFieldValue((props.values.produks[index].pajakperbaris = ppb));
																	const ppbt = props.values.produks.reduce((a, b) => (a = a + b.pajakperbaris), 0);

																	props.setFieldValue('pajakperbaris', ppbt);

																	let total = subt - diskontambahan;
																	props.setFieldValue((props.values.total = total));

																	let pemotongan = (subt * props.values.pemotongan) / 100;
																	props.setFieldValue((props.values.hasilpemotongan = pemotongan));
																}}></Form.Control>
														</Col>
														<Col sm="1">
															<Form.Control as="select" name={`produks.${index}.satuan`}>
																<option>Default select</option>
															</Form.Control>
														</Col>
														<Col sm="2">
															<Form.Control type="text" placeholder="" name={`produks.${index}.harga_satuan`} value={props.values.produks[index].harga_satuan} />
														</Col>
														<Col sm="1">
															<Form.Control
																type="text"
																placeholder="ex:100%"
																name={`produks.${index}.diskon`}
																onChange={(e) => {
																	props.setFieldValue(`produks.${index}.diskon`, e.target.value);
																	let hasil = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
																	let hasil1 = hasil - hasil * (e.target.value / 100);
																	let hasilpajak = hasil1 + (hasil1 * props.values.produks[index].pajak) / 100;
																	props.setFieldValue((props.values.produks[index].jumlah = hasilpajak));

																	const subt = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
																	props.setFieldValue('subtotal', subt);

																	let dpb = hasil * (e.target.value / 100);
																	props.setFieldValue((props.values.produks[index].diskonperbaris = dpb));
																	const dbpt = props.values.produks.reduce((a, b) => (a = a + b.diskonperbaris), 0);
																	props.setFieldValue('diskonperbaris', dbpt);

																	let diskontambahan = (subt * props.values.diskontambahan) / 100;
																	props.setFieldValue((props.values.hasildiskontambahan = diskontambahan));

																	let ppb = (hasil1 * props.values.produks[index].pajak) / 100;
																	props.setFieldValue((props.values.produks[index].pajakperbaris = ppb));
																	const ppbt = props.values.produks.reduce((a, b) => (a = a + b.pajakperbaris), 0);

																	props.setFieldValue('pajakperbaris', ppbt);

																	let total = subt - diskontambahan;
																	props.setFieldValue((props.values.total = total));

																	let pemotongan = (subt * props.values.pemotongan) / 100;
																	props.setFieldValue((props.values.hasilpemotongan = pemotongan));
																}}
															/>
														</Col>
														<Col sm="1">
															<Form.Control
																as="select"
																name={`produks.${index}.pajakID`}
																onChange={(e) => {
																	props.setFieldValue(`produks.${index}.pajakID`, e.target.value);
																	let hasil2 = data2.filter((i) => {
																		return i.id === parseInt(e.target.value);
																	});
																	props.setFieldValue(`produks.${index}.pajak`, hasil2[0].presentasaAktif);
																	props.setFieldValue(`produks.${index}.pajak`, data2.filter((i) => i.id === parseInt(e.target.value))[0].nama);
																	console.log(data2.filter((i) => i.id === parseInt(e.target.value)));

																	let hasil = props.values.produks[index].kuantitas * props.values.produks[index].harga_satuan;
																	let hasil1 = hasil - hasil * (props.values.produks[index].diskon / 100);
																	let hasilpajak = hasil1 + (hasil1 * hasil2[0].presentasaAktif) / 100;
																	props.setFieldValue((props.values.produks[index].jumlah = hasilpajak));

																	const subt = props.values.produks.reduce((a, b) => (a = a + b.jumlah), 0);
																	props.setFieldValue('subtotal', subt);

																	let dpb = hasil * (props.values.produks[index].diskon / 100);
																	props.setFieldValue((props.values.produks[index].diskonperbaris = dpb));
																	const dbpt = props.values.produks.reduce((a, b) => (a = a + b.diskonperbaris), 0);
																	props.setFieldValue('diskonperbaris', dbpt);

																	let diskontambahan = (subt * props.values.diskontambahan) / 100;
																	props.setFieldValue((props.values.hasildiskontambahan = diskontambahan));

																	let ppb = (hasil1 * hasil2[0].presentasaAktif) / 100;
																	props.setFieldValue((props.values.produks[index].pajakperbaris = ppb));
																	const ppbt = props.values.produks.reduce((a, b) => (a = a + b.pajakperbaris), 0);

																	props.setFieldValue('pajakperbaris', ppbt);

																	let total = subt - diskontambahan;
																	props.setFieldValue((props.values.total = total));

																	let pemotongan = (subt * props.values.pemotongan) / 100;
																	props.setFieldValue((props.values.hasilpemotongan = pemotongan));
																}}>
																<option>pilih pajak</option>
																{data2.map((nama_pajak) => (
																	<option key={nama_pajak.id} value={nama_pajak.id}>
																		{nama_pajak.nama} - {nama_pajak.presentasaAktif}%
																	</option>
																))}
															</Form.Control>
														</Col>
														<Col sm="2">
															<Form.Control
																type="text"
																placeholder=""
																name={`produks.${index}.jumlah`}
																value={props.values.produks[index].jumlah}
																onChange={(e) => {}}></Form.Control>
															<button type="button" className="secondary" onClick={() => remove(index)}>
																X
															</button>
														</Col>
													</Form.Group>
												))}
											<button
												type="button"
												class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
												onClick={() =>
													push({
														deskripsi_produk: '',
														harga_satuan: '',
														diskon: '',
														kuantitas: '',
														pajak: '',
														satuan: '',
														jumlah: ''
													})
												}>
												<AddIcon fontSize="small" /> Tambah data
											</button>
										</div>
									)}
								</FieldArray>
							</Form>
						</div>

						<Form className="py-2">
							<Form.Group as={Row} controlId="formPlaintext">
								<Col sm="4">
									<label for="Pesan" name="pesan">
										Pesan
									</label>
									<br />
									<textarea rows="3" name="pesan" class="px-16 py-2 border border-gray-800  " onChange={props.handleChange}></textarea> <br />
									<label for="memo">Memo</label>
									<br />
									<textarea rows="3" name="memo" class="px-16 py-2 border border-gray-800  " onChange={props.handleChange}></textarea> <br />
									File Attachment <br />
									<Form.File id="custom-file" label="Browse file" name="fileattachment" custom />
								</Col>
								<Col sm="4"></Col>
								<Col sm="4">
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">Sub Total</Col>
										<Col sm="4">
											<Form.Label column sm="2" name="subtotal">
												Rp.{props.values.subtotal},00
											</Form.Label>
										</Col>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">Diskon Per Baris</Col>
										<Form.Label column sm="2" name="diskonperbaris">
											Rp.{props.values.diskonperbaris},00
										</Form.Label>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">Diskon</Col>
										<Col sm="4"></Col>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">
											<InputGroup className="mb-3">
												<FormControl
													type="text"
													placeholder=""
													aria-label="Amount (to the nearest dollar)"
													name="diskontambahan"
													onChange={(e) => {
														props.setFieldValue('diskontambahan', e.target.value);

														let diskontambahan = (props.values.subtotal * e.target.value) / 100;
														props.setFieldValue('hasildiskontambahan', diskontambahan);
														let total = props.values.subtotal - diskontambahan;
														props.setFieldValue((props.values.total = total));
													}}
												/>

												<InputGroup.Append>
													<InputGroup.Text>%</InputGroup.Text>
													<InputGroup.Text>Rp</InputGroup.Text>
												</InputGroup.Append>
											</InputGroup>
										</Col>
										<Col sm="4">
											<Form.Label column sm="2" name="hasildiskontambahan">
												Rp.{props.values.hasildiskontambahan},00
											</Form.Label>
										</Col>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">Pajak</Col>
										<Form.Label column sm="2" name="pajakperbaris">
											Rp.{props.values.pajakperbaris},00
										</Form.Label>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">Total</Col>
										<Col sm="4">
											<Form.Label column sm="2" name="total">
												Rp.{props.values.total},00
											</Form.Label>
										</Col>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">Pemotongan</Col>
										<Col sm="4"></Col>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">
											<InputGroup className="mb-3">
												<FormControl
													type="text"
													placeholder=""
													aria-label="Amount (to the nearest dollar)"
													name="pemotongan"
													onChange={(e) => {
														props.setFieldValue('pemotongan', e.target.value);
														let pemotongan = (props.values.subtotal * e.target.value) / 100;
														props.setFieldValue('hasilpemotongan', pemotongan);
													}}
												/>
												<InputGroup.Append>
													<InputGroup.Text>%</InputGroup.Text>
													<InputGroup.Text>Rp</InputGroup.Text>
												</InputGroup.Append>
											</InputGroup>
										</Col>
										<Col sm="4">
											<Form.Label column sm="2" name="hasilpemotongan">
												Rp.{props.values.hasilpemotongan},00
											</Form.Label>
										</Col>
									</Form.Group>
									<Form.Group as={Row} controlId="formPlaintext">
										<Col sm="8">Uang Muka</Col>
										<Col sm="4">
											<Form.Control
												type="text"
												placeholder=""
												size="sm"
												name="uangmuka"
												onChange={(e) => {
													props.setFieldValue('uangmuka', e.target.value);

													let sisa_tagihan = props.values.total - props.values.hasilpemotongan - e.target.value;
													props.setFieldValue('sisatagihan', sisa_tagihan);
												}}
											/>
										</Col>
									</Form.Group>

									<div className="border-t border-gray-200">
										<br />
										<Form.Group as={Row} controlId="formPlaintext">
											<Col sm="8">
												<h5>Sisa Tagihan</h5>
											</Col>
											<Col sm="4">
												<Form.Label column sm="2" name="sisatagihan">
													Rp.{props.values.sisatagihan},00
												</Form.Label>
											</Col>
										</Form.Group>
									</div>
								</Col>
							</Form.Group>
						</Form>
						<div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
							<Link href="/jual/penjualan">
								<button onclick="openModal(false)" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">
									Batal
								</button>
							</Link>
							<Link href="/jual/penjualan">
							<button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none" onClick={props.handleSubmit}>
								Buat Penjualan
							</button>
							</Link>
						</div>
					</Forms>
				)}
			</Formik>
		</Layout>
	);
}

export async function getServerSideProps() {
  // Get kontak,produk,pajak from API
  const kontaks = await prisma.kontak.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
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
  });

  return {
    props: {
      data: kontaks,
      data2: pajaks,
      data3: produks,
    },
  };
}
