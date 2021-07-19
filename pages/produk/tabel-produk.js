import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Card, Button, DropdownButton, Dropdown, InputGroup, FormControl, Col, Row, FormCheck, Pagination } from "react-bootstrap";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { CSVLink, CSVDownload } from "react-csv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>
  );
}

export default function tabelProduk({ data }) {
  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(product.filter((i) => i.nama.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };

  const handleList = () => {
    return search.length > 0 ? search : product;
  };

  console.log(data);

  const restructure = (data) => {
    let result = [];
    data.map((i) => {
      result.push({
        Nama: i.nama,
        "Kode SKU": i.kode_sku,
        "Kategori Akun": i.kategori_produk.nama,
        Unit: i.unit,
      });
    });
    return result;
  };

  return (
    <Layout>
      <Row>
        <Col>
          <h2>Produk</h2>
          <CSVLink data={restructure(data)} filename='product.csv'>
            CSV
          </CSVLink>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Link href='kategori/tabel-kategori'>
            <a>
              <SettingsIcon fontSize='Large' />
            </a>
          </Link>
          <h4 className='mr-4'>Kategori Produk</h4>
          <Link href='/produk/add-produk'>
            <a>
              <Button variant='primary'>
                <AddIcon fontSize='small' />
                Buat Baru
              </Button>
            </a>
          </Link>
        </Col>
      </Row>

      <hr />
      <div>
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <Row>
                  <SettingsIcon fontSize='medium' className='mt-1' />
                  <h4>Barang & Jasa</h4>
                </Row>
              </Col>

              <Col className='d-flex justify-content-end'>
                <DropdownButton variant='primary ml-2' id='dropdown-basic-button' title='Ekspor'>
                  <Dropdown.Item></Dropdown.Item>
                  <Dropdown.Item>
                    <a>Hapus</a>
                  </Dropdown.Item>
                </DropdownButton>
                <Col sm='6'>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        <SearchIcon />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder='cari' aria-label='cari' aria-describedby='basic-addon1' onChange={(e) => handleChange(e)} />
                  </InputGroup>
                </Col>
              </Col>
            </Row>

            <div className='mt-2'>
              <table className='min-w-full table-auto'>
                <thead className='justify-between'>
                  <tr className='bg-dark'>
                    <th className='px-2 py-2'>
                      <FormCheck />
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Kode Produk</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Nama Produk</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Qty</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Batas Minimum</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Unit</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Harga rata-rata</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Harga Beli Terakhir</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Harga beli</span>
                    </th>
                    <th className='px-2 py-2'>
                      <span className='text-gray-300'>Action</span>
                    </th>
                    {/* <th className='px-2 py-2'>
                      <span className='text-gray-300'>Image</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {data.map((produk) => (
                    <tr>
                      <th className='px-2 py-2'>
                        <FormCheck />
                      </th>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{produk.kode_sku}</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{produk.nama}</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>69</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>30</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{produk.unit}</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>-</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>-</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>Rp. {produk.harga_beli_satuan}</div>
                      </td>
                      <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          <Link key={produk.id} href={`${produk.id}`}>
                            <a>
                              <Button variant='warning mr-2'>Edit</Button>
                            </a>
                          </Link>
                        </div>
                      </td>
                      {/* <td className='px-2 py-2 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          <img src={`http://localhost:3000/uploads/${produk.image}`} alt='produk' />
                        </div>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get Produk from API
  const products = await prisma.produk.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      kategori_produk: true,
      pembelian: true,
      penjualan: true,
    },
  });

  return {
    props: {
      data: products,
    },
  };
}
