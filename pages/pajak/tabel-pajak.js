import React from 'react'
import Head from 'next/head'
import Link from 'next/link';
import Layout from '../../components/Layout';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Button, Row, Col } from 'react-bootstrap';
import Add from '@material-ui/icons/Add';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default function tabelpajak({ data }) {
    return (
        <Layout>
            <Head>
                <title>Tabel Pajak</title>
            </Head>

            <div variant="container">
                <Row>
                    <Col>
                        <Row>
                            <CreditCardIcon fontSize="large" />
                            <h4> Pajak</h4>
                        </Row>
                    </Col>

                    <Col className="d-flex justify-content-end">
                        <Link href="/pajak/add-pajak">
                            <a>
                                <Button variant="primary mr-2"><Add fontSize="small" /> Buat Pajak</Button>
                            </a>
                        </Link>
                    </Col>
                </Row>
                <div className="mt-8">
                    <table className="min-w-full table-auto">
                        <thead className="justify-between">
                            <tr className="bg-dark">
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Nama</span>
                                </th>
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Presentase Efektif</span>
                                </th>
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Akun Pajak Penjualan</span>
                                </th>
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Akun Pajak Pembelian</span>
                                </th>
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((pajak) => (
                                <tr key={pajak.id}>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pajak.nama}</div>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pajak.presentasaAktif} %</div>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pajak.kategori1.nama_akun}</div>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{pajak.kategori2.nama_akun}</div>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <Link key={pajak.id} href={`${pajak.id}`}>
                                                <Button variant="warning mr-2">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    // Get nama pajak akun from pajak model
    const getNamaPajakAkun = await prisma.pajak.findMany({
        orderBy:
            [
                {
                    id: "asc",
                }
            ],
        include: {
            kategori1: true,
            kategori2: true,
        }
    })

    return {
        props: {
            data: getNamaPajakAkun
        }
    }
}
