import React, { useEffect, useRef } from 'react'
import Layout from '../../components/Layout';
import { Form, Row, Col, Button } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'
import { useRouter } from 'next/router'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default function update({ data }) {
    // Form validation
    const UserSchema = Yup.object().shape({
        first_name: Yup.string().required('*required'),
        last_name: Yup.string().required('*required'),
        email: Yup.string().email().required('*required'),
        password: Yup.string().required('*required'),
    });

    // User API
    const getUser = 'http://localhost:3000/api/user/getUser';
    const updateUser = 'http://localhost:3000/api/user/updateUser';

    // Redirect Function and Take URL Parameter [id]
    const router = useRouter();
    const { id } = router.query

    // Get Existing User data based on [id]
    const formikref = useRef(null)
    const getdata = async () => {
        Axios.post(getUser, {

            id: id

        }).then(function (response) {
            formikref.current.setFieldValue('first_name', response.data.data.firstName)
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
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    role_id: '',
                }}

                validationSchema={UserSchema}
                onSubmit={async (values) => {
                    let data = { ...values, id }
                    Axios.put(updateUser, data).
                        then(function (response) {
                            console.log(response)
                            router.push('../user/tabel-user')

                        }).
                        catch(function (error) {
                            console.log(error)

                        })
                }}
            >
                {(props) => (
                    <Forms noValidate>
                        <div>
                            <h4>Update User</h4>
                            <div className="mt-12 container">
                                <Form>
                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>First Name</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder={props.values.first_name} name="first_name" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.first_name && props.touched.first_name ?
                                                <div className="text-red-500 text-sm">{props.errors.first_name}</div>
                                                : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Last Name</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder={props.values.last_name} name="last_name" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.last_name && props.touched.last_name ?
                                                <div className="text-red-500 text-sm">{props.errors.last_name}</div>
                                                : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Email</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder={props.values.email} name="email" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.email && props.touched.email ?
                                                <div className="text-red-500 text-sm">{props.errors.email}</div>
                                                : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Password</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder="Password" name="password" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.password && props.touched.password ?
                                                <div className="text-red-500 text-sm">{props.errors.password}</div>
                                                : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Roles</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Row>
                                                <Col>
                                                    <Form.Control as="select" name="role_id" onChange={props.handleChange} onBLur={props.handleBlur} >
                                                        {/* loop over list of roles */}
                                                        {data.map((role) => (
                                                            <option key={role.id} value={role.id}>{role.roleType}</option>
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
        </Layout >
    )
}

export async function getServerSideProps() {
    // Get Roles from API
    const roles = await prisma.role.findMany({
        orderBy: {
            id: "asc",
        }
    })

    return {
        props: {
            data: roles
        }
    }
}
