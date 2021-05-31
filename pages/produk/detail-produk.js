import React from 'react';
import Layout from '../../components/Layout';
import { Card, Col, Row, Table, Tabs, Tab, Button } from 'react-bootstrap';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Link from 'next/link';

export default function DetailProduk() {
	return (
		<Layout>
			<div>
				<Row className="ml-2 mb-4">
					<LocalMallIcon fontSize="large" />
					<h4>Detail Produk</h4>
				</Row>
				<Card>
					<Card.Body>
						<h4>Nama Produk</h4>
						<h5>Kode Produk</h5>
						<div className="d-flex justify-content-end">
							<Link href="/produk/ubah-produk">
								<Button variant="primary">Ubah Produk</Button>
							</Link>
						</div>
						<hr />
						<Row>
							<Col>
								<Table className="min-w-full table-auto" hover size="sm">
									<thead className="justify-between ">
										<tr className="bg-dark">
											<th className="py-2 px-2">
												<span className="text-gray-300">Informasi</span>
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										<tr>
											<td className="px-2 py-2 whitespace-nowrap">
												<div className="text-sm text-gray-900">Harga Rata-Rata</div>
											</td>
										</tr>
										<tr>
											<td className="px-2 py-2 whitespace-nowrap">
												<div className="text-sm text-gray-900">Stok Saat ini</div>
											</td>
										</tr>
										<tr>
											<td className="px-2 py-2 whitespace-nowrap">
												<div className="text-sm text-gray-900">Batas Stok Minimum</div>
											</td>
										</tr>
										<tr>
											<td className="px-2 py-2 whitespace-nowrap">
												<div className="text-sm text-gray-900">Kategori Produk</div>
											</td>
										</tr>
										<tr>
											<td className="px-2 py-2 whitespace-nowrap">
												<div className="text-sm text-gray-900">Keterangan</div>
											</td>
										</tr>
									</tbody>
								</Table>

								<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
									<Tab eventKey="transaksi" title="Transaksi" />
									<Tab eventKey="satuanproduk" title="Satuan Produk" />

									<div eventKey="transaksi">
										<div className="mt-8">
											<Table className="min-w-full table-auto" hover size="sm">
												<thead className="justify-between ">
													<tr className="bg-dark">
														<th className="py-2 px-2">
															<span className="text-gray-300">Tanggal</span>
														</th>
														<th className="py-2 px-2">
															<span className="text-gray-300">Tipe</span>
														</th>
														<th className="py-2 px-2">
															<span className="text-gray-300">Jumlah</span>
														</th>
													</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200">
													<tr>
														<td className="px-2 py-2 whitespace-nowrap">
															<div className="text-sm text-gray-900">3/24/2021</div>
														</td>
														<td className="px-2 py-2 whitespace-nowrap">
															<div className="text-sm text-gray-900">-</div>
														</td>
														<td className="px-2 py-2 whitespace-nowrap">
															<div className="text-sm text-gray-900">-</div>
														</td>
													</tr>
												</tbody>
											</Table>
										</div>
									</div>

									<div eventKey="satuanproduk">
										<div className="mt-8">
											<Table className="min-w-full table-auto" hover size="sm">
												<thead className="justify-between ">
													<tr className="bg-dark">
														<th className="py-2 px-2">
															<span className="text-gray-300">
																Satuan Dasar Produk: Unit Produk
															</span>
														</th>
														<th className="py-2 px-2">
															<span className="text-gray-300">Satuan</span>
														</th>
														<th className="py-2 px-2">
															<span className="text-gray-300">Harga Beli</span>
														</th>
														<th className="py-2 px-2">
															<span className="text-gray-300">Harga Jual</span>
														</th>
													</tr>
												</thead>
												<tbody className="bg-white divide-y divide-gray-200">
													<tr>
														<td className="px-2 py-2 whitespace-nowrap">
															<div className="text-sm text-gray-900">X _________________</div>
														</td>
														<td className="px-2 py-2 whitespace-nowrap">
															<div className="text-sm text-gray-900">
																= X _________________Unit Produk
															</div>
														</td>
														<td className="px-2 py-2 whitespace-nowrap">
															<div className="text-sm text-gray-900">X _________________</div>
														</td>
														<td className="px-2 py-2 whitespace-nowrap">
															<div className="text-sm text-gray-900">X _________________</div>
														</td>
													</tr>
												</tbody>
											</Table>
										</div>
									</div>
								</Tabs>
							</Col>

							<Col>
								<Card className="bg-gray-300">
									<Card.Body>
										<h5>Penjualan</h5>
										<hr className="bg-black" />
										<p className="text-sm text-gray-900">Harga Jual Satuan</p>
										<p className="text-sm text-gray-900 font-medium">Rp. 0,00</p>

										<p className="text-sm text-gray-900">Akun Penjualan</p>
										<p className="text-sm text-gray-900 font-medium">-</p>

										<p className="text-sm text-gray-900">Pajak Jual</p>
										<p className="text-sm text-gray-900 font-medium">-</p>
									</Card.Body>
								</Card>

								<Card className="bg-gray-300 mt-4">
									<Card.Body>
										<h5>Pembelian</h5>
										<hr className="bg-black" />
										<p className="text-sm text-gray-900">Harga Jual Satuan</p>
										<p className="text-sm text-gray-900 font-medium">Rp. 0,00</p>

										<p className="text-sm text-gray-900">Akun Pembelian</p>
										<p className="text-sm text-gray-900 font-medium">-</p>

										<p className="text-sm text-gray-900">Pajak Beli</p>
										<p className="text-sm text-gray-900 font-medium">-</p>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</div>
		</Layout>
	);
}
