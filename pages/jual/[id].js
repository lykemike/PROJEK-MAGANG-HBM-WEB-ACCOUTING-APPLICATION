import React from 'react';
import Layout from '../../components/Layout';
import { Row, Col, Form, Button, FormCheck } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/Link';

import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'
import { useRouter } from 'next/router'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default function editpembayaran() {

	// const penjualanSchema = Yup.object().shape({
    //     nama: Yup.string().min(5).required('*required'),
    //     presentaseAktif: Yup.number().required('*required').positive().integer(),
    // })

	const getJual = 'http://localhost:3000/api/jual/getJual';
    const updateJual = 'http://localhost:3000/api/jual/updateJual';
	
	  // Redirect Function and Take URL Parameter [id]
	  const router = useRouter();
	  const { id } = router.query
  
	  // Get Existing User data based on [id]
	  const formikref = useRef(null)
	  const getdata = async () => {
		  Axios.post(getUser, {
  
			  id: id
  
		  }).then(function (response) {
			  formikref.current.setFieldValue('nama_pelanggan', response.data.data.namapelanggan)
			  formikref.current.setFieldValue('last_name', response.data.data.lastName)
			  formikref.current.setFieldValue('email', response.data.data.email)
  
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
		  router.push('../user/tabel-user')
	  }
  
	
	
	return (
		<Layout>
			 <Formik
                innerRef={formikref}
                initialValues={{
                    nama_pelanggan: '',
                    tgl_pembayaran: '',
                    tgl_jatuhtempo: '',
                    no_transaksi: '',
                    tag: '',
                }}

                // validationSchema={}
                onSubmit={async (values) => {
                    let data = { ...values, id }
                    Axios.put(updatePenjualan, data).
                        then(function (response) {
                            console.log(response)
                            router.push('..')

                        }).
                        catch(function (error) {
                            console.log(error)

                        })
                }}
            >
                {(props) => (
                    <Forms noValidate>
				<div>
					<h4>Transaksi</h4>
					<h4>Penerimaan Pembayaran</h4>
					<hr />
				</div>
			<Form>
				<Row sm="12">
					<Col sm="3">
						<Form.Label className="font-medium">Pelanggan</Form.Label>
						
						<Form.Control placeholder={props.values.nama_pelanggan} name="nama_pelanggan" onChange={props.handleChange} onBLur={props.handleBlur} />
                         {props.errors.nama_pelanggan && props.touched.nama_pelanggan ?
                        <div className="text-red-500 text-sm">{props.errors.nama_pelanggan}</div>
                    	   : null}
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Setor Ke</Form.Label>
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
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
						<Form.Control as="select" defaultValue="Choose...">
							<option>Pilih</option>
							<option>Kas Tunai</option>
							<option>Cek & Giro</option>
							<option>Transfer Bank</option>
							<option>Kartu Kredit</option>
						</Form.Control>
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Tanggal Pembayaran</Form.Label>
						<Form.Control placeholder={props.values.tgl_pembayaran} type="date" name="tgl_pembayaran" onChange={props.handleChange} onBLur={props.handleBlur} />
                            {props.errors.tgl_pembayaran && props.touched.tgl_pembayaran ?
                        <div className="text-red-500 text-sm">{props.errors.tgl_pembayaran}</div>
                           : null}
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">Tanggal Jatuh Tempo</Form.Label>
						<Form.Control placeholder={props.values.tgl_jatuhtempo} type="date" name="tgl_pembayaran" onChange={props.handleChange} onBLur={props.handleBlur} />
                            {props.errors.tgl_jatuhtempo && props.touched.tgl_jatuhtempo ?
                        <div className="text-red-500 text-sm">{props.errors.tgl_jatuhtempo}</div>
                           : null}
					</Col>

					<Col sm="3">
						<Form.Label className="font-medium">No. Transaksi</Form.Label>
						<Form.Control placeholder={props.values.no_transaksi} disabled name="tgl_pembayaran" onChange={props.handleChange} onBLur={props.handleBlur} />
                            {props.errors.tgl_pembayaran && props.touched.no_transaksi ?
                        <div className="text-red-500 text-sm">{props.errors.no_transaksi}</div>
                           : null}
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
						<Link href="/jual/penerimaan-pembayaran-final">
							<Button variant="danger mr-2">Batal</Button>
						</Link>
						<Link href="/jual/penerimaan-pembayaran-final">
							<Button variant="success">Buat Pembayaran</Button>
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