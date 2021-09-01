import React,{useState} from "react";
import Layout from "../../components/Layout";
import { Row, Col, Button, InputGroup, FormControl, FormCheck } from "react-bootstrap";
import Link from "next/link";
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
      <div>
        <h4 class='text-gray-500'>Biaya</h4>
        <Row>
          <Col>
            <h3 class='text-blue-600'>Pengeluaran</h3>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Link href='/biaya/buat-biaya'>
              <Button variant='primary'>
                <AddIcon fontSize='small' />
                Buat Biaya Baru
              </Button>
            </Link>
          </Col>
        </Row>

        <hr />

        <Row sm='12'>
          <Col sm='4'>
            <hr className='bg-black ' />
            <p className='font-medium'>Total Biaya Bulan ini (dalam IDR)</p>
            <hr className='bg-black' />
            <p style={{ fontSize: 25 }} class='text-gray-500'>
              Rp.
            </p>
            <hr className='bg-black' />
          </Col>
          <Col sm='4'>
            <hr className='bg-black' />
            <p className='font-medium'>Biaya Belum Dibayar (dalam IDR)</p>
            <hr className='bg-black' />
            <p style={{ fontSize: 25 }} class='text-gray-500'>
              Rp.
            </p>
            <hr className='bg-black' />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <h4>Daftar Biaya</h4>
          </Col>
          <Col sm='3'>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id='basic-addon1'>
                  <SearchIcon />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                placeholder='Cari' 
                aria-label='cari' 
                aria-describedby='basic-addon1' 
                onChange={(e) => handleChange(e)}
                />
            </InputGroup>
          </Col>
        </Row>

        <hr />

        <table class='min-w-full table-auto'>
          <thead class='justify-between'>
            <tr class='bg-dark'>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Tanggal</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Nomor</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Kategori</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Penerima</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Status</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Sisa Tagihan (dalam IDR)</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Total (dalam IDR)</span>
              </th>
            </tr>
          </thead>
          <tbody class='bg-white divide-y divide-gray-200'>
            {data.slice(firstIndex, lastIndex).map((biaya) => (
              <tr key={biaya.id}>
                <Link key={biaya.id} href={`/biaya/view/${biaya.id}`}>
                  <a>
                    <td class='px-2 py-2 whitespace-nowrap'>
                      <div class='text-sm text-gray-900'>{biaya.tgl_transaksi}</div>
                    </td>
                  </a>
                </Link>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{biaya.id}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{biaya.akun1.nama_akun}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{biaya.kontak.nama}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>
                    <span class='bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs'>Active</span>
                  </div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>Rp. {biaya.pemotongan_total.toLocaleString({ minimumFractionDigits: 0 })}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>Rp. {biaya.total.toLocaleString({ minimumFractionDigits: 0 })}</div>
                </td>
              </tr>
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
