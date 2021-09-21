import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, FormControl, Button, Card } from "react-bootstrap";
import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function detailProduk({ data }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <div className='border-b border-gray-200'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href='../../produk/tabel-produk'>
            Table Produk
          </Link>
          <Typography color='textPrimary'>Produk & Jasa</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm='8'>
            <h2 className='text-blue-600'>Detail Produk</h2>
          </Col>
          <Col sm='4' />
        </Row>
      </div>

      <Card body className='mt-4'>
        <Row>
          <Col sm='8'>
            <h3>{data[0].nama}</h3>
            <h5>{data[0].kode_sku}</h5>
          </Col>
          <Col sm='4'>
            <div className='d-flex justify-content-end'>
              <Button variant='primary'>Primary</Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm='8'></Col>
          <Col sm='4'>
            <div class='bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105'>
              <div class='px-4 py-2 bg-blue-300 flex items-center justify-between'>
                <h1 class='text-xl font-gray-700 font-bold'>Penjualan</h1>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Harga Jual Satuan</h3>
              </div>
              <div class='px-4 flex space-x-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>
                  Rp. {data[0].harga_jual_satuan.toLocaleString({ minimumFractionDigits: 0 })}
                </h3>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Akun Penjualan</h3>
              </div>
              <div class='px-4 flex space-x-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>-</h3>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Pajak Jual</h3>
              </div>
              <div class='px-4 flex space-x-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>-</h3>
              </div>
            </div>
            <div class='mt-8 bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105'>
              <div class='px-4 py-2 bg-blue-300 flex items-center justify-between'>
                <h1 class='text-xl font-gray-700 font-bold'>Pembelian</h1>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Harga Beli Satuan</h3>
              </div>
              <div class='px-4 flex space-x-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>
                  Rp. {data[0].harga_beli_satuan.toLocaleString({ minimumFractionDigits: 0 })}
                </h3>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Akun Pembelian</h3>
              </div>
              <div class='px-4 flex space-x-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>-</h3>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Pajak Beli</h3>
              </div>
              <div class='px-4 flex space-x-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>-</h3>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const products = await prisma.produk.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kategori_produk: true,
      pembelian: true,
      penjualan: true,
      satuan: true,
    },
  });

  return {
    props: {
      data: products,
    },
  };
}
