import React from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Col, Row } from 'react-bootstrap';

import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'

export default function addKategoriProduk() {
    // Form Validation
    const KategoriProdukSchema = Yup.object().shape({
        nama: Yup.string().required('required'),
        jumlah: Yup.number().integer().required('required'),
    })

    // Kategori Produk API
    const addKategoriProduk = 'http://localhost:3000/api/produk/createKategori';

    // Redirect
    const router = useRouter()

    // Batal Button Function
    function cancelButton() {
        router.push('../kategori/tabel-kategori')
    }

    return (
        <Layout>
            <Formik
                initialValues={{
                    nama: '',
                    jumlah: ''
                }}

                validationSchema={KategoriProdukSchema}
                onSubmit={async (values) => {
                    Axios.post(addKategoriProduk, values).
                        then(function (response) {
                            console.log(response)
                            router.push('../kategori/tabel-kategori')

                        }).
                        catch(function (error) {
                            console.log(error)
                        })
                }}
            >
                {(props) => (
                    <Forms noValidate>
                        <Form>
                            <h2>Add Kategori Produk</h2>

                            <hr />

                            <div className="container">
                                <Row className="mb-2" >
                                    <Col className="mt-1" sm="1">
                                        <Form.Label>Nama</Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control placeholder="Nama kategori" name="nama" onChange={props.handleChange} onBlur={props.handleBlur} />
                                    </Col>
                                </Row>

                                <Row className="mb-2" >
                                    <Col className="mt-1" sm="1">
                                        <Form.Label>Jumlah</Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control placeholder="Jumlah" name="jumlah" onChange={props.handleChange} onBlur={props.handleBlur} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm="1" />
                                    <Col sm="4" className="d-flex justify-content-end mt-10">
                                        <Button variant="danger mr-2" onClick={cancelButton}>Batal</Button>
                                        <Button variant="success" onClick={props.handleSubmit}>Simpan</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </Forms>
                )}
            </Formik>
        </Layout >

    );
}

