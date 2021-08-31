import React from 'react'
import Layout from '../../components/Layout'
import SidebarSetting from '../../components/SidebarSetting'
import {Form,Row,Col,InputGroup,FormControl} from 'react-bootstrap'
import Divider from '@material-ui/core/Divider';
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import * as Yup from 'yup'
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();


export default function settingperusahaan() {
        const router = useRouter();
        const url = "http://localhost:3000/api/";


    return (
        <Layout>
             <Formik
            initialValues={{
              file_upload: [],
              tampil_logo: "",
              nama_perusahaan: "",
              alamat: "",
              alamat_pengiriman: "",
              no_telp: "",
              no_fax: "",
              no_npwp: "",
              website: "",
              email: "",
              nama_bank: "",
              cabang_bank: "",
              alamat_bank: "",
              no_rek: "",
              atas_nama: "",
              swift_code: "",
            }}
            onSubmit={async (values) => {
              // alert(JSON.stringify(values, null, 2));
              let formData = new FormData();
              for (var key in values) {
                formData.append(`${key}`, `${values[key]}`);
              }
              Array.from(values.file_upload).map((i) => formData.append("file", i));
              console.log(values);
              Axios.post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
                .then(function (response) {
                  console.log(response);
                  router.push("");
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}>
            {(props) => (
              <Forms noValidate>
            <h1>Pengaturan</h1>
           <Form>
                    <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="3">
                        <SidebarSetting/>
                        </Col>
                        <Divider orientation="vertical" flexItem />
                        <Col sm="4">
                            <h3>Pengaturan Perusahaan</h3>
                            
                            <Row className="mb-2">
                                <Col>
                                Logo
                                </Col>
                                <Col>
                                 <Form.File
                                    type='file'
                                    name='file_upload'
                                    accept='image/*'
                                    onChange={(e) => props.setFieldValue("file_upload", e.target.files)}
                                />
                                {props.errors.file_upload && props.touched.file_upload ? (
                                    <div class='text-red-500 text-sm'>
                                    <ErrorOutlineIcon />
                                    {props.errors.file_upload}
                                    </div>
                                ) : null}
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Tampilan Logo di Laporan
                                </Col>
                                <Col>
                                <input class="form-check-input position-static ml-1" type="checkbox" id="blankCheckbox" aria-label="..." name="tampil_logo" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Nama Perusahaan
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="nama_perusahaan"  onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Alamat
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        
                                        <Form.Control as="textarea" rows={3} name="alamat" onChange={props.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Alamat Pengiriman
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                    
                                        <Form.Control as="textarea" rows={3} name="alamat_pengiriman" onChange={props.handleChange} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Telepon
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="no_telp"  onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Fax
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="no_fax" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                NPWP
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="no_npwp" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Website
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="website" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Email
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="email" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="4">
                            <h3>Detil Akun Bank</h3>
                            
                            <Row className="mb-2">
                                <Col>
                                Nama Bank
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="nama_bank" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Cabang Bank
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="cabang_bank" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Alamat Bank
                                </Col>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        
                                        <Form.Control as="textarea" rows={3} name="alamat_bank" onChange={props.handleChange}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Nomor Rekening
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="no_rek" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Atas Nama
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="atas_nama" onChange={props.handleChange}/>
                                </Col>
                            </Row>
                            <Row className="mb-2">
                                <Col>
                                Swift Code
                                </Col>
                                <Col>
                                <Form.Control type="text" placeholder="" size="sm" name="swift_code"  onChange={props.handleChange}/>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                </Form> 
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">  
            <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
            <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none" onClick={props.handleSubmit}>Ubah</button>
            </div>
               </Forms>
               )}
             </Formik>
        </Layout>
            
    )
}
