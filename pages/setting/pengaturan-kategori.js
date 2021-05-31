import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,Table} from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link';

export default function pengaturankategori() {
    return (
        <Layout>
            Pengaturan Kategori
            <br/>
            <br/>
            Produk dan Jasa
            <h5>Pengaturan Kategori</h5>
            <div className="border-t border-gray-200">
                <Row className="py-2.5" >
                    <Col>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Col>
                    <Col>
                        <div className="flex flex-row-reverse">
                            <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"><AddIcon fontSize="small"/> Tambah data</button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="border-t border-gray-200">
            <Row>
                    <Col sm="8">
                        Nama Kategori
                    </Col>
                    <Col sm="4">
                        Jumlah Produk
                    </Col>
                </Row>
            </div>
            <div className="border-t border-gray-200">
                <Row>
                    <Col sm="8">
                        xxxxx
                    </Col>
                    <Col sm="4">
                        1
                    </Col>
                </Row>
                <Row>
                    <Col sm="8">
                        yyyyy
                    </Col>
                    <Col sm="4">
                        2
                    </Col>
                </Row>
            </div>
            <br/>
            <div className="border-t border-gray-200">
            <Row>
                    <Col sm="8">
                        zzzzz
                    </Col>
                    <Col sm="4">
                        3
                    </Col>
                </Row>
            </div>
            <div class="left-0 px-4 py-3 w-full flex justify-end items-center gap-3">
            <Link href="/setting/produk-dan-jasa">
				<button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Kembali</button>
			</Link>
                <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Simpan</button>
            </div>
        </Layout>
    )
}
