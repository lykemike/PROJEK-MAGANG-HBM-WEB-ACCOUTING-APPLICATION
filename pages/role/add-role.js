import React from 'react'
import Layout from '../../components/Layout';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'
import { useRouter } from 'next/router'

export default function addRole() {
    // Form Validation 
    const RoleSchema = Yup.object().shape({
        role_type: Yup.string().required(' required'),
        // role_desc: Yup.string().required(' required'),
    })

    // Role API
    const url = 'http://localhost:3000/api/user/createRole';

    // Redirect Function
    const router = useRouter()

    // Batal Button Function
    function cancelButton() {
        router.push('../role/tabel-role')
    }

    return (
        <Layout>
            <Formik
                initialValues={{
                    role_type: '',
                    role_desc: '',
                }}

                validationSchema={RoleSchema}
                onSubmit={async (values) => {
                    Axios.post(url, values).
                        then(function (response) {
                            console.log(response)
                            router.push('../role/tabel-role')

                        }).
                        catch(function (error) {
                            console.log(error)
                        })
                }}
            >
                {(props) => (
                    <Forms noValidate>
                        <div>
                            <h4>Buat Role Baru</h4>
                            <div class="mt-12 container">
                                <Form>
                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Role Name</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder="Role Name" name="role_type" onChange={props.handleChange} onBlur={props.handleBlur} />
                                            {props.errors.role_type && props.touched.role_type ? <div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.role_type}</div> : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Role Description</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder="Role Desc" name="role_desc" onChange={props.handleChange} onChange={props.handleChange} onBlur={props.handleBlur} />
                                            {/* {props.errors.role_desc && props.touched.role_desc ? <div class="text-red-500 text-sm"><ErrorOutlineIcon />{props.errors.role_desc}</div> : null} */}
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


