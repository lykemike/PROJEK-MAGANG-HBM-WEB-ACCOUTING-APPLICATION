import React, { useEffect, useRef } from 'react'
import Layout from '../../../components/Layout';
import { Button, Form, Col, Row } from 'react-bootstrap';

import { useRouter } from 'next/router'
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'

export default function updateKategoriProduk() {
    // Kategori Produk API
    const getKategori = 'http://localhost:3000/api/produk/getKategori'
    const updateKategori = 'http://localhost:3000/api/produk/updateKategori'

    // Take URL Parameter [id]
    const router = useRouter();
    const { id } = router.query

    // Get Existing Produk data based on [id]
    const formikref = useRef(null)
    const getData = async () => {
        Axios.post(getKategori, {

            id: id

        }).then(function (response) {
            formikref.current.setFieldValue('nama', response.data.data.nama)
            formikref.current.setFieldValue('jumlah', response.data.data.jumlah)

        }).
            catch(function (error) {
                console.log(error)
            })
    };
    useEffect(() => {
        getData()
    }, [])

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

                onSubmit={async (values) => {
                    let data = { ...values, id }
                    Axios.post(updateKategori, data).
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
                            <h2>Update Kategori Produk</h2>

                            <hr />

                            <div className="container">
                                <Row className="mb-2" >
                                    <Col className="mt-1" sm="1">
                                        <Form.Label>Nama</Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control placeholder={props.values.nama} name="nama" onChange={props.handleChange} onBlur={props.handleBlur} />
                                    </Col>
                                </Row>

                                <Row className="mb-2" >
                                    <Col className="mt-1" sm="1">
                                        <Form.Label>Jumlah</Form.Label>
                                    </Col>
                                    <Col sm="4">
                                        <Form.Control placeholder={props.values.jumlah} name="jumlah" onChange={props.handleChange} onBlur={props.handleBlur} />
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

