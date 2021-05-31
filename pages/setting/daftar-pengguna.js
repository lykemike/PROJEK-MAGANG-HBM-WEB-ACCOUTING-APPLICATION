import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,OverlayTrigger,Tooltip,Card} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link';

export default function daftarpengguna() {
    return (
       <Layout>
           <Row>
                <Col sm="3">
                <SidebarSetting></SidebarSetting>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                    <Row>
                        <Col>
                        <h2>Daftar Pengguna</h2>
                        </Col>
                        <Col>
                        <div className="flex flex-row-reverse">
                        <Link href="/setting/detil-pengguna">
                        <button type="button" class=" focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"><AddIcon/>Invite</button>
									</Link>
                        </div>
                        </Col>
                    </Row>
                    <div className="border-t border-gray-200 py-2">
                        <Row>
                                <Col sm="2">
                                    Nama
                                </Col>
                                <Col sm="2">
                                    Email
                                </Col>
                                <Col sm="2">
                                   Roles
                                </Col>
                                <Col sm="2">
                                    Status
                                </Col>
                                <Col sm="2">
                                    Type
                                </Col>
                                <Col sm="2">
                                    Join Date
                                </Col>
                            </Row>
                        </div>
                        <div className="border-t border-gray-200">

                        </div>
                </Col>
            </Row>
       </Layout>
    )
}
