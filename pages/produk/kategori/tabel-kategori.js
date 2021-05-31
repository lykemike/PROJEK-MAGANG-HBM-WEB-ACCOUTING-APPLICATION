import React from 'react';
import Link from 'next/link';
import Layout from '../../../components/Layout'
import {
    Card,
    Button,
    InputGroup,
    FormControl,
    Col,
    Row,
} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function tabelKategori({ data }) {
    return (
        <Layout>
            <Row>
                <Col>
                    <h2>Produk</h2>
                    <p>Menambahkan Kategori Baru</p>
                </Col>
            </Row>
            <hr />

            <Row>
                <Col sm="2">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <SearchIcon />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="cari"
                            aria-label="cari"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Link href="/produk/kategori/add-kategori">
                        <a>
                            <Button variant="primary">
                                <AddIcon fontSize="small" />Tambah
						    </Button>
                        </a>
                    </Link>
                </Col>
            </Row>

            <hr className="mt-12" />

            <Card>
                <Card.Body>
                    <div className="mt-2">
                        <table className="min-w-full table-auto">
                            <thead className="justify-between">
                                <tr className="bg-dark">
                                    <th className="px-2 py-2">
                                        <span className="text-gray-300">Nama</span>
                                    </th>
                                    <th className="px-40 py-2">
                                        <span className="text-gray-300">Jumlah</span>
                                    </th>
                                    <th className="px-2 py-2">
                                        <span className="text-gray-300">Acion</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((kategoriProduk) => (
                                    <tr>
                                        <td className="px-2 py-2 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{kategoriProduk.nama}</div>
                                        </td>
                                        <td className="px-40 py-2 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{kategoriProduk.jumlah}</div>
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                <Link key={kategoriProduk.id} href={`${kategoriProduk.id}`}>
                                                    <a>
                                                        <Button variant="warning mr-2">Edit</Button>
                                                    </a>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card.Body>
            </Card>

        </Layout>
    );
}

export async function getServerSideProps() {
    // Get Kategori Produk from API
    const kategoriProduk = await prisma.kategoriProduk.findMany({
        orderBy:
        {
            id: 'asc'
        }
    });

    return {
        props: {
            data: kategoriProduk,
        }
    }
}
