import React from "react";
import Layout from "../../components/Layout";
import TableJualBeli from "../../components/PenjualanPembelianBiaya/Table";
import { Row, Col, FormControl } from "react-bootstrap";

import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import Link from "next/Link";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function pembelian({ data }) {
  const total_tagihan = data.reduce((a, b) => (a = a + b.sisa_tagihan), 0);

  return (
    <Layout>
      <Breadcrumbs aria-label='breadcrumb'>
        <Typography color='textPrimary'>Transaksi</Typography>
      </Breadcrumbs>

      <Row>
        <Col sm='8'>
          <h2 className='text-blue-600'>Pembelian</h2>
        </Col>
        <Col sm='4'>
          <div className='d-flex justify-content-end'>
            <Link href='/beli/penagihan-pembelian '>
              <a>
                <button type='button' className='focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg'>
                  <AddIcon fontSize='small' /> Buat Pembelian Baru
                </button>
              </a>
            </Link>
          </div>
        </Col>
      </Row>
      <hr />

      <div className='mt-4 mb-8'>
        <Row sm='12'>
          <Col sm='4'>
            <div class='bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105'>
              <div class='px-4 py-2 bg-blue-300 flex items-center justify-between'>
                <h3 class='text-xl font-gray-700 font-bold'>Pembelian Belum Dibayar</h3>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Rp. {total_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</h3>
              </div>
            </div>
          </Col>
          <Col sm='4'>
            <div class='bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105'>
              <div class='px-4 py-2 bg-red-300 flex items-center justify-between'>
                <h1 class='text-xl font-gray-700 font-bold'>Pembelian Jatuh Tempo</h1>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Rp. -</h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className='border-t border-gray-200 justify-end'>
        <Row className='mt-2 mb-2'>
          <Col sm='9'>
            <h3>Transaksi Pembelian</h3>
          </Col>
          <Col sm='3' className='d-flex justify-content-end'>
            <FormControl type='text' placeholder='Search . . . .' />
          </Col>
        </Row>
      </div>

      <table className='min-w-full table-auto'>
        <thead className='justify-between'>
          <tr className='bg-dark'>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Tgl Transaksi</span>
            </th>
            <th className='px-8 py-2'>
              <span className='text-white text-base'>Nomor</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Pelanggan</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Tgl Jatuh Tempo</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Tag</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Status</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Sisa Tagihan</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Total</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {data.map((data, index) => (
            <TableJualBeli data={data} index={index} label='Purchase Invoice' view='beli' />
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
export async function getServerSideProps() {
  // Get kontak,produk,pajak from API
  const pembelians = await prisma.headerPembelian.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      kontak: true,
      akun1: true,
      akun2: true,
    },
  });

  return {
    props: {
      data: pembelians,
    },
  };
}
