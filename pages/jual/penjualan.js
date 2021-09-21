import React, { useState } from "react";
import Layout from "../../components/Layout";
import TableReusable from "../../components/PenjualanPembelianBiaya/Table";
import { Row, Col, FormControl } from "react-bootstrap";
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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function penjualan({ data }) {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    setOpen(!open);
  };

  const total_tagihan = data.reduce((a, b) => (a = a + b.sisa_tagihan), 0);

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const due_date = data.filter((i) => i.tgl_jatuh_tempo < current).reduce((a, b) => (a = a + b.sisa_tagihan), 0);

  return (
    <Layout>
      <div className='border-b border-gray-200'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography color='textPrimary'>Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm='8'>
            <h2 className='text-blue-600'>Penjualan</h2>
          </Col>
          <Col sm='4'>
            <div className='d-flex justify-content-end'>
              <Link href='/jual/penagihan-penjualan'>
                <a>
                  <button
                    type='button'
                    className='focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg'>
                    <AddIcon fontSize='small' /> Buat Penjualan Baru
                  </button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div className='mt-4 mb-8 '>
        <Row sm='12'>
          <Col sm='4'>
            <div class='bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105'>
              <div class='px-4 py-2 bg-blue-300 flex items-center justify-between'>
                <h1 class='text-xl font-gray-700 font-bold'>Penjualan Belum Dibayar</h1>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>
                  Rp. {total_tagihan.toLocaleString({ minimumFractionDigits: 0 })}
                </h3>
              </div>
            </div>
          </Col>
          <Col sm='4'>
            <div class='bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105'>
              <div class='px-4 py-2 bg-red-300 flex items-center justify-between'>
                <h1 class='text-xl font-gray-700 font-bold'>Penjualan Jatuh Tempo</h1>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>
                  Rp. {due_date > 0 ? due_date.toLocaleString({ minimumFractionDigits: 0 }) : "0,00"}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className='border-t border-gray-200 justify-end'>
        <Row className='mt-2 mb-2'>
          <Col sm='9'>
            <h3>Transaksi Penjualan</h3>
          </Col>
          <Col sm='3' className='d-flex justify-content-end'>
            <FormControl type='text' placeholder='Search . . . .' />
          </Col>
        </Row>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead className='bg-dark'>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography className='text-white font-bold'>Tanggal Transaksi</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Nomor</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Pelanggan</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Tanggal Jatuh Tempo</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Tag</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Sisa Tagihan</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Total</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography className='text-white font-bold'>Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {data.map((data, index) => (
            <TableReusable data={data} index={index} label='Sales Invoice' label2='Penerimaan Pembayaran' view='jual' />
          ))}
        </Table>
      </TableContainer>
    </Layout>
  );
}
export async function getServerSideProps() {
  // Get kontak,produk,pajak from API
  const penjualans = await prisma.headerPenjualan.findMany({
    orderBy: [
      {
        tgl_jatuh_tempo: "asc",
      },
    ],
    include: {
      kontak: true,
      akun1: true,
      akun2: true,
      PenerimaanPembayaran: true,
    },
  });

  return {
    props: {
      data: penjualans,
    },
  };
}
