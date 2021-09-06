import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Row, Col, Button, InputGroup, FormControl, FormCheck } from "react-bootstrap";
import Link from "next/link";

import TableJualBeli from "../../components/PenjualanPembelianBiaya/Table";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import TablePagination from "../../components/TablePagination";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Pengeluaran({ data }) {
  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(product.filter((biaya) => biaya.nama.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };
  const handlePrevChange = () => {
    if (page < 1) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };

  const handleNextChange = () => {
    if (page < parseInt(data.length / rowsPerPage)) {
      setPage(page + 1);
    } else {
      setPage(parseInt(data.length / rowsPerPage));
    }
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleClickPage = (id) => {
    setPage(id);
  };

  const handleLastPage = () => {
    setPage(parseInt(data.length / rowsPerPage));
  };

  return (
    <Layout>
      <Breadcrumbs aria-label='breadcrumb'>
        <Typography color='textPrimary'>Biaya</Typography>
      </Breadcrumbs>

      <Row>
        <Col sm='8'>
          <h2 className='text-blue-600'>Pengeluaran</h2>
        </Col>
        <Col sm='4'>
          <div className='d-flex justify-content-end'>
            <Link href='/biaya/buat-biaya'>
              <a>
                <button type='button' className='focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg'>
                  <AddIcon fontSize='small' /> Buat Biaya Baru
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
                <h3 class='text-xl font-gray-700 font-bold'>Total Biaya Bulan Ini</h3>
              </div>
              <div class='px-4 py-2 flex space-x-2 mt-2'>
                <h3 class='text-lg text-gray-600 font-semibold mb-2'>Rp. -</h3>
              </div>
            </div>
          </Col>
          <Col sm='4'>
            <div class='bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105'>
              <div class='px-4 py-2 bg-red-300 flex items-center justify-between'>
                <h1 class='text-xl font-gray-700 font-bold'>Biaya Belum Dibayar</h1>
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
            <h3>Daftar Biaya</h3>
          </Col>
          <Col sm='3' className='d-flex justify-content-end'>
            <FormControl placeholder='Search . . . .' aria-label='cari' aria-describedby='basic-addon1' onChange={(e) => handleChange(e)} />
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
              <span className='text-white text-base'>Kategori</span>
            </th>
            <th className='px-2 py-2'>
              <span className='text-white text-base'>Penerima</span>
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
          {data.slice(firstIndex, lastIndex).map((data, index) => (
            <TableJualBeli data={data} index={index} label='Expense' view='biaya' />
          ))}
        </tbody>
      </table>
      <div class='flex items-center justify-center mt-4'>
        <TablePagination
          onPrevChange={handlePrevChange}
          onNextChange={handleNextChange}
          onFirstPage={handleFirstPage}
          onLastPage={handleLastPage}
          onClickPage={handleClickPage}
          lastIndex={parseInt(data.length / rowsPerPage)}
          currentPage={page}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get biaya from API
  const biayas = await prisma.headerBiaya.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      detail_biaya: true,
      akun1: true,
      akun2: true,
      kontak: true,
    },
  });

  return {
    props: {
      data: biayas,
    },
  };
}
