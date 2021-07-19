import React from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Col, Row } from 'react-bootstrap';

import { useRouter } from 'next/router'
import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'

export default function addSatuan() {
    // Form Validation
    const KategoriProdukSchema = Yup.object().shape({
        satuan: Yup.string().required('required'),
    })

    // Kategori Produk API
    const addKategoriProduk = 'http://localhost:3000/api/produk/createSatuan';

    // Redirect
    const router = useRouter()

    // Batal Button Function
    function cancelButton() {
        router.push('../satuan/tabel-satuan')
    }

    return (
        <Layout>
            <Formik
                initialValues={{
                    satuan: '',
                
                }}

                // validationSchema={KategoriProdukSchema}
                onSubmit={async (values) => {
                    Axios.post(addKategoriProduk, values).
                        then(function (response) {
                            console.log(response)
                            router.push('../satuan/tabel-satuan')

                        }).
                        catch(function (error) {
                            console.log(error)
                        })
                }}
            >
                {(props) => (
                    <Forms noValidate>
                        <Form>
                            <h2>Add Satuan Produk</h2>

                            <hr />

                            <div className="container">
                                <Row className="mb-2" >
                                    <Col className="mt-1" sm="1">
                                        <Form.Label>Satuan</Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control placeholder="Nama satuan" name="satuan" onChange={props.handleChange} onBlur={props.handleBlur} />
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

