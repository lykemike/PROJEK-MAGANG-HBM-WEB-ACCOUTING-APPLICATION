import { React, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/Link'

import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function penagihanpenjualan({ data, data2, data3 }) {

    const url = 'http://localhost:3000/api/jual/createpenjualan';



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

    // useEffect(() => {
    //     getdata()
    // }, [])

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
                    // no_transaksi:'',
                    no_ref_penagihan: '',
                    tag: '',
                    nama_produk: '',
                    deskripsi_produk: '',
                    kuantitas: 1,
                    satuan: '',
                    harga_satuan: '',
                    diskon: '',
                    pajak: '',
                    jumlah: '',
                    sisatagihan: '',
                    uangmuka: '',
                    pesan: '',
                    fileattachment: ''

                }}


                // validationSchema={}
                onSubmit={async (values) => {
                    console.log(values)
                    Axios.post(url, values).
                        then(function (response) {
                            console.log(response)
                        }).
                        catch(function (error) { console.log(error) })
                }}
            >
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
                                        <Form.Control as="select" name="nama_pelanggan" onChange={(e) => {
                                            props.setFieldValue('nama_pelanggan', e.target.value)
                                            if (e.target.value === "") {
                                                props.setFieldValue('email', ''),
                                                    props.setFieldValue('alamat_penagihan', '')
                                            } else {
                                                let hasil = data.filter((i) => {
                                                    return i.id === parseInt(e.target.value)
                                                })
                                                props.setFieldValue('email', hasil[0].email),
                                                    props.setFieldValue('alamat_penagihan', hasil[0].alamat_pembayaran)


                                            }
                                        }}>
                                            <option value="">pilih pelanggan</option>
                                            {data.map((nama_pelanggan) => (
                                                <option key={nama_pelanggan.id} value={nama_pelanggan.id}>{nama_pelanggan.nama_panggilan}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col sm="3">
                                        <Form.Control type="text" placeholder="" name="email" value={props.values.email} onChange={(e) => { props.setFieldValue('email', e.target.value) }}></Form.Control>
                                    </Col>
                                    <Col sm="3">
                                    </Col>
                                    <Col sm="3">
                                        Total Rp.0,00
                        </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="border-t border-gray-200">
                            <Form>
                                <Form.Group as={Row} controlId="formPlaintext">
                                    <Form.Label column sm="3">
                                        <label for="message">Alamat Penagihan</label><br />
                                        <textarea
                                            rows="3" id="message"
                                            class="px-16 py-2 border border-gray-800  "
                                            name="alamat_penagihan"
                                            value={props.values.alamat_penagihan} onChange={(e) => { props.setFieldValue('alamat_penagihan', e.target.value) }}
                                        ></textarea>
                                    </Form.Label>
                                    <Form.Label column sm="3">
                                        Tgl Transaksi <br />
                                        <Form.Control type="date" placeholder="Auto" name="tgl_transaksi" onChange={props.handleChange} /> <br />
                        Tgl Jatuh Tempo <br />
                                        <Form.Control type="date" placeholder="Auto" name="tgl_jatuhtempo" onChange={props.handleChange} /> <br />
                        Syarat Pembayaran <br />
                                        <Form.Control type="text" placeholder="" name="syarat_pembayaran" onChange={props.handleChange} /> <br />
                                    </Form.Label>

                                    <Form.Label column sm="3">
                                        No Transaksi <br />
                                        <Form.Control type="text" disabled placeholder="Auto" name="no_transaksi" onChange={props.handleChange} /> <br />
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
                                <Form.Group as={Row} controlId="formPlaintext">
                                    <Col sm="2">
                                        <Form.Control as="select" name="nama_produk" onChange={(e) => {
                                            props.setFieldValue('nama_produk', e.target.value)
                                            if (e.target.value === "") {
                                                props.setFieldValue('deskripsi_produk', ''),
                                                    props.setFieldValue('harga_satuan', ''),
                                                    props.setFieldValue('diskon', ''),
                                                    props.setFieldValue('harga_satuan', ''),
                                                    props.setFieldValue('kuantitas', ''),
                                                    props.setFieldValue('pajak', ''),
                                                    props.setFieldValue('satuan', ''),
                                                    props.setFieldValue('presentasaAktif', '')

                                            } else {
                                                let hasil1 = data3.filter((i) => {
                                                    return i.id === parseInt(e.target.value)
                                                })
                                                props.setFieldValue('deskripsi_produk', hasil1[0].deskripsi),
                                                    props.setFieldValue('harga_satuan', hasil1[0].harga_jual_satuan)
                                            }

                                        }}>
                                            <option value="">pilih produk</option>
                                            {data3.map((nama_produk) => (
                                                <option key={nama_produk.id} value={nama_produk.id}>{nama_produk.nama}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col sm="2">
                                        <Form.Control type="text" placeholder="" name="deskripsi_produk" value={props.values.deskripsi_produk}>

                                        </Form.Control>
                                    </Col>
                                    <Col sm="1">
                                        <Form.Control type="number" name="kuantitas" value={props.values.kuantitas} onChange={(e) => {
                                            props.setFieldValue('kuantitas', e.target.value)
                                            let hasil = e.target.value * props.values.harga_satuan
                                            let hasil1 = hasil - (hasil * (props.values.diskon / 100))
                                            let hasilpajak = hasil1 + (hasil1 * props.values.pajak / 100)
                                            props.setFieldValue('jumlah', hasilpajak)
                                            // props.setFieldValue('jumlah',kuantitas * harga_satuan - diskon/100 + pajak/100)

                                        }}>

                                        </Form.Control>
                                    </Col>
                                    <Col sm="1">
                                        <Form.Control as="select" name="satuan">
                                            <option>Default select</option>
                                        </Form.Control>
                                    </Col>
                                    <Col sm="2">
                                        <Form.Control type="text" placeholder="" name="harga_satuan" value={props.values.harga_satuan} />
                                    </Col>
                                    <Col sm="1">
                                        <Form.Control type="text" placeholder="ex:100%" name="diskon" onChange={(e) => {
                                            props.setFieldValue('diskon', e.target.value)
                                            let hasil = props.values.kuantitas * props.values.harga_satuan
                                            let hasil1 = hasil - (hasil * (e.target.value / 100))
                                            let hasilpajak = hasil1 + (hasil1 * props.values.pajak / 100)
                                            props.setFieldValue('jumlah', hasilpajak)
                                            // props.setFieldValue('jumlah',kuantitas * harga_satuan - diskon/100 + pajak/100)

                                        }} />
                                    </Col>
                                    <Col sm="1">
                                        <Form.Control as="select" name="pajak" onChange={(e) => {
                                            props.setFieldValue('nama_pajak', e.target.value)
                                            let hasil2 = data2.filter((i) => {
                                                return i.id === parseInt(e.target.value)
                                            })
                                            props.setFieldValue('pajak', hasil2[0].presentasaAktif)

                                            let hasil = props.values.kuantitas * props.values.harga_satuan
                                            console.log(hasil * hasil2[0].presentasaAktif / 100)
                                            let hasil1 = hasil - (hasil * (props.values.diskon / 100))
                                            let hasilpajak = hasil1 + (hasil1 * hasil2[0].presentasaAktif / 100)
                                            props.setFieldValue('jumlah', hasilpajak)

                                        }}>
                                            <option>pilih pajak</option>
                                            {data2.map((nama_pajak) => (
                                                <option key={nama_pajak.id} value={nama_pajak.id}>{nama_pajak.nama} - {nama_pajak.presentasaAktif}%</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col sm="2">
                                        <Form.Control type="text" placeholder="" name="jumlah" value={props.values.jumlah}></Form.Control>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"><AddIcon fontSize="small" /> Tambah data</button>
                        <Form className="py-2">
                            <Form.Group as={Row} controlId="formPlaintext">
                                <Col sm="4">
                                    <label for="Pesan" name="pesan">Pesan</label><br />
                                    <textarea
                                        rows="3" id="Pesan"
                                        class="px-16 py-2 border border-gray-800  "
                                    ></textarea> <br />
                                    <label for="memo">Memo</label><br />
                                    <textarea
                                        rows="3" id="memo"
                                        class="px-16 py-2 border border-gray-800  "
                                    ></textarea> <br />
                        File Attachment <br />
                                    <Form.File id="custom-file" label="Browse file" name="fileattachment" custom />
                                </Col>
                                <Col sm="4">

                                </Col>
                                <Col sm="4">

                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            Sub Total
                                </Col>
                                        <Col sm="4">
                                            Rp.0,00
                                </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            Diskon Per Baris
                                </Col>
                                        <Col sm="4">
                                            Rp.0,00
                                </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            Diskon
                                </Col>
                                        <Col sm="4">

                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder=""
                                                    aria-label="Amount (to the nearest dollar)"
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text >%</InputGroup.Text>
                                                    <InputGroup.Text >Rp</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                        <Col sm="4">
                                            Rp.0,00
                                </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            Pajak
                                </Col>
                                        <Col sm="4">
                                            Rp.0,00
                                </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            Total
                                </Col>
                                        <Col sm="4">
                                            Rp.0,00
                                </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            Pemotongan
                                </Col>
                                        <Col sm="4">

                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            <InputGroup className="mb-3">
                                                <FormControl
                                                    placeholder=""
                                                    aria-label="Amount (to the nearest dollar)"
                                                />
                                                <InputGroup.Append>
                                                    <InputGroup.Text >%</InputGroup.Text>
                                                    <InputGroup.Text >Rp</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                        <Col sm="4">
                                            Rp.0,00
                                </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPlaintext">
                                        <Col sm="8">
                                            Uang Muka
                                </Col>
                                        <Col sm="4">
                                            <Form.Control type="text" placeholder="" size="sm" name="uangmuka" onChange={(e) => {
                                                props.setFieldValue('uangmuka', e.target.value)

                                                let hasil = props.values.kuantitas * props.values.harga_satuan

                                                let hasil1 = hasil - (hasil * (props.values.diskon / 100))
                                                let hasilpajak = hasil1 + (hasil * props.values.pajak / 100)
                                                let sisa_tagihan = hasilpajak - e.target.value

                                                props.setFieldValue('sisatagihan', sisa_tagihan)



                                                //  props.setFieldValue('diskon',e.target.value)
                                                // let hasil = props.values.kuantitas * props.values.harga_satuan  
                                                // let hasil1 = hasil  - (hasil * (e.target.value/100)) + (hasil * props.values.pajak/100)

                                                // props.setFieldValue('jumlah',hasil1)
                                            }} />
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
                            <button onclick="openModal(false)" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
                            <Link href="/jual/sales-invoice">
                                <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none" onClick={props.handleSubmit}>Buat Penjualan</button>
                            </Link>
                        </div>
                    </Forms>
                )}
            </Formik>
        </Layout>
    )
}

export async function getServerSideProps() {
    // Get kontak,produk,pajak from API
    const kontaks = await prisma.kontak.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ],
    });


    const pajaks = await prisma.pajak.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ],
    });
    const produks = await prisma.produk.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ],
    });

    return {
        props: {
            data: kontaks,
            data2: pajaks,
            data3: produks
        }
    }
}