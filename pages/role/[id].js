import React, { useEffect, useRef } from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import * as Yup from "yup";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";

export default function updateRole() {
  // Form Validation
  const RoleSchema = Yup.object().shape({
    role_type: Yup.string().required(" required"),
    role_desc: Yup.string().required(" required"),
  });

  // Role API
  const getRole = "http://localhost:3000/api/role/getRole";
  const updateRole = "http://localhost:3000/api/role/updateRole";

  // Redirect Function and Take URL Parameter [id]
  const router = useRouter();
  const { id } = router.query;

  // Get Existing Role data based on [id]
  const formikref = useRef(null);
  const getdata = async () => {
    Axios.post(getRole, {
      id: id,
    })
      .then(function (response) {
        formikref.current.setFieldValue("role_type", response.data.data.roleType);
        formikref.current.setFieldValue("role_desc", response.data.data.roleDesc);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  // Batal Button Function
  function cancelButton() {
    router.push("../role/tabel-role");
  }

  return (
    <Layout>
      <Formik
        innerRef={formikref}
        initialValues={{
          role_type: "",
          role_desc: "",
        }}
        validationSchema={RoleSchema}
        onSubmit={async (values) => {
          let data = { ...values, id };
          Axios.put(updateRole, data)
            .then(function (response) {
              console.log(response);
              router.push("../role/tabel-role");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div>
              <h4>Update Role</h4>
              <div class='mt-12 container'>
                <Form>
                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Role Name</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control placeholder={props.values.role_type} name='role_type' onChange={props.handleChange} onBLur={props.handleBlur} />
                      {props.errors.role_type && props.touched.role_type ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.role_type}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='2'>
                      <Form.Label>Role Description</Form.Label>
                    </Col>
                    <Col sm='4'>
                      <Form.Control placeholder={props.values.role_desc} name='role_desc' onChange={props.handleChange} onBLur={props.handleBlur} />
                      {props.errors.role_desc && props.touched.role_desc ? (
                        <div class='text-red-500 text-sm'>
                          <ErrorOutlineIcon />
                          {props.errors.role_desc}
                        </div>
                      ) : null}
                    </Col>
                  </Row>

                  <Row>
                    <Col sm='2' />
                    <Col sm='4' className='d-flex justify-content-end mt-10'>
                      <Button variant='danger mr-2' onClick={cancelButton}>
                        Batal
                      </Button>
                      <Button variant='success' onClick={props.handleSubmit}>
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
