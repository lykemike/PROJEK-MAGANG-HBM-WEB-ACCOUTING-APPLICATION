import React from 'react';
import Layout from '../../../components/Layout';
import { Row, Col, Form, Button, FormCheck } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/Link';

import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function pembayaran_jual({data, data2 , data3}) {
	const router = useRouter();
	const { id } = router.query;
	  
	return (
		<Layout>
			 <Formik>
        {(props) => (
          <Forms noValidate>
			<div>
				<h4>Transaksi</h4>
				<h4>Penerimaan Pembayaran</h4>
				<hr />
			</div>
			<Form>
			
				<Row sm="12">
					{data.map((i) => (
					<Col sm="3">
						<Form.Label className="font-medium">Pelanggan</Form.Label>
						<Form.Control placeholder={i.kontak.nama} disabled/>
					</Col>
			        ))}

					<Col sm="3">
						<Form.Label className="font-medium">Setor Ke</Form.Label>
						<Form.Control as='select' name='pembayaran' onChange={props.handleChange}>
                        <option value='kosong'>Pilih</option>
                        {data3.map((akun) => (
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
                        {/* {i.syarat_pembayaran} */}
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Tanggal Pembayaran</Form.Label>
						<Form.Control placeholder="" type="date" />
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Tanggal Jatuh Tempo</Form.Label>
						<Form.Control placeholder="" type="date" />
					</Col>

					{data.map((i) => (
					<Col sm="3">
						<Form.Label className="font-medium">No. Transaksi</Form.Label>
						<Form.Control placeholder={i.no_transaksi} disabled/>
					</Col>
					))}
				</Row>
					

				<Row sm="12">
					<Col></Col>
					<Col></Col>
					<Col></Col>

					{data.map((i) => (
					<Col sm="3">
						<Form.Label className="font-medium">Tag</Form.Label>
						<Form.Control placeholder={i.tag} disabled />
					</Col>
					))}

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
			{data.map((i) => (
				<Row className="mb-12">
				
					<Col sm="2">
						<p>Purchase Invoice #{i.id}</p>
					</Col>

					<Col sm="2">
						<p>{i.memo}</p>
					</Col>

					<Col sm="2">
						<p>{i.tgl_jatuh_tempo}</p>
					</Col>

					<Col sm="2">
						<p>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
					</Col>

					<Col sm="2">
						<p>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</p>
					</Col>

					<Col sm="2">
						<Form.Control placeholder="" />
					</Col>
				</Row>
			))}
				{/* <Button variant="primary">
					<AddIcon fontSize="small" />Tambah data
				</Button> */}

				<Row sm="12" className="mt-3">
					<Col sm="3">
						<Form.Label className="font-medium">Memo</Form.Label>
						<Form.Control as="textarea" rows={4} />
					</Col>
				</Row>

				<Row sm="12">
				<Col sm="3">
						<Form.Label className="font-medium">Lampiran</Form.Label>
						<Form>
							<Form.File id="custom-file-translate-scss" label="ukuran maksimal 10MB/File" lang="en" custom />
						</Form>
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
						<Link href="/beli/pembelian">
							<Button variant="danger mr-2">Batal</Button>
						</Link>
						<Link href='/jual/penjualan'>
							<Button variant='success'>Bayar</Button>
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
  
    const header = await prisma.headerPenjualan.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        kontak: true,
        DetailPenjualan: true,
      },
    });
  
    const detail = await prisma.detailPenjualan.findMany({
      where: {
        header_penjualan_id: parseInt(id),
      },
      include: {
        header_penjualan: true,
        produk: true,
        pajak: true,
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
        data2: detail,
        data3: akunKasBank
      },
    };
  }
  