import React, { useEffect, useRef } from 'react'
import Layout from '../../components/Layout';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'
import { useRouter } from 'next/router'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default function update({ data, data2 }) {
    // Form validation
    const PajakScehma = Yup.object().shape({
        nama: Yup.string().min(5).required('*required'),
        presentaseAktif: Yup.number().required('*required').positive().integer(),
    })

    // Pajak API
    const getPajak = 'http://localhost:3000/api/pajak/getPajak';
    const updatePajak = 'http://localhost:3000/api/pajak/updatePajak';

    // Redirect Function and Take URL Parameter [id]
    const router = useRouter();
    const { id } = router.query;

    // Get Existing Pajak data based on [id]
    const formikref = useRef(null)
    const getdata = async () => {
        Axios.post(getPajak, {

            id: id

        }).then(function (response) {
            formikref.current.setFieldValue('nama', response.data.data.nama)
            formikref.current.setFieldValue('presentaseAktif', response.data.data.presentasaAktif)
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
        router.push('../pajak/tabel-pajak')
    }

    return (
        <Layout>
            <Formik
                innerRef={formikref}
                initialValues={{
                    nama: '',
                    presentaseAktif: '',
                    akunPajakPenjualan: '',
                    akunPajakPembelian: ''
                }}

                validationSchema={PajakScehma}
                onSubmit={async (values) => {
                    let data = { ...values, id }

                    Axios.put(updatePajak, data).
                        then(function (response) {
                            console.log(response)
                            router.push('../pajak/tabel-pajak')

                        }).
                        catch(function (error) {
                            console.log(error)

                        })
                }}
            >
                {(props) => (
                    <Forms noValidate>
                        <div variant="container">
                            <Row>
                                <Col>
                                    <Row>
                                        <CreditCardIcon fontSize="large" />
                                        <h4> Update Pajak</h4>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="mt-12 container">
                                <Form>
                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Nama</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder={props.values.nama} name="nama" onChange={props.handleChange} onBLur={props.handleBlur} />
                                        </Col>
                                        {props.errors.nama && props.touched.nama ?
                                            <p className="text-red-500 text-sm italic mt-2">
                                                {props.errors.nama}
                                            </p>
                                            : null}
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Presentase Aktif</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <InputGroup >
                                                <Form.Control placeholder={props.values.presentaseAktif} name="presentaseAktif" onChange={props.handleChange} onBLur={props.handleBlur} />
                                                <InputGroup.Append>
                                                    <InputGroup.Text >%</InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                        {props.errors.presentaseAktif && props.touched.presentaseAktif ?
                                            <p className="text-red-500 text-sm italic mt-2">
                                                {props.errors.presentaseAktif}
                                            </p>
                                            : null}
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Akun Pajak Penjualan</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Row>
                                                <Col>
                                                    <Form.Control as="select" name="akunPajakPenjualan" onChange={props.handleChange} onBLur={props.handleBlur} >
                                                        <option disabled>{props.values.akunPajakPenjualan}</option>
                                                        {data.map((akunPenjual) => (
                                                            <option key={akunPenjual.id} value={akunPenjual.id}>{akunPenjual.nama_akun}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Akun Pajak Pembelian</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Row>
                                                <Col>
                                                    <Form.Control as="select" name="akunPajakPembelian" onChange={props.handleChange} onBLur={props.handleBlur} >
                                                        {data2.map((akunPembelian) => (
                                                            <option key={akunPembelian.id} value={akunPembelian.id}>{akunPembelian.nama_akun}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="2" />
                                        <Col sm="4" className="d-flex justify-content-end mt-10">
                                            <Button variant="danger mr-2" onClick={cancelButton}>Batal</Button>
                                            <Button variant="success" onClick={props.handleSubmit}>Simpan</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </Forms>
                )}
            </Formik>
        </Layout>
    )
}

export async function getServerSideProps() {
    // Get kategori akun penjualan and pembelian from akun model
    const getAkunPenjualan = await prisma.akun.findMany({
        where:
        {
            kategoriId:
            {
                in: [10, 11, 13, 14, 16, 17]
            }
        },
    });

    const getAkunPembelian = await prisma.akun.findMany({
        where:
        {
            kategoriId:
            {
                in: [2, 13, 14, 16, 17]
            }
        }
    })

    return {
        props: {
            data: getAkunPenjualan,
            data2: getAkunPembelian,
        }

    }
}
