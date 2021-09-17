import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import TableKontak from "../../components/kontak/Table";
import { Tabs, Tab, Card, Button, DropdownButton, Dropdown, InputGroup, FormControl, Form, Col, Row, FormCheck } from "react-bootstrap";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

import { useRouter } from "next/router";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Kontak({ data, data2 }) {
  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState(data);
  // const [roleKontak, setroleKontak] = useState([]);

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

  // Kontak API
  const deleteKontak = "http://localhost:3000/api/kontak/deleteKontak";

  // Redirect Function
  const router = useRouter();

  // Delete Exisiting User based on [id]
  const handleDelete = (id) => {
    Axios.delete(deleteKontak, {
      data: {
        kontakid: id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("../kontak/tabel-kontak");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className='border-b border-gray-200'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography color='textPrimary'>Kontak</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm='8'>
            <h2 className='text-blue-600'>Kontak</h2>
          </Col>
          <Col sm='4'>
            <div className='d-flex justify-content-end'>
              <Row>
                <Link href='/kontak/add-kontak'>
                  <a>
                    <Button variant='primary'>
                      <AddIcon fontSize='small' />
                      Kontak Baru
                    </Button>
                  </a>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <div variant='container' className='mt-4'>
        <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example'>
          <Tab eventKey='pelanggan' title='Pelanggan' />
          <Tab eventKey='supplier' title='Supplier' />
          <Tab eventKey='karyawan' title='Karyawan' />
          <Tab eventKey='lainnya' title='Lainnya' />

          <div eventKey='pelanggan'>
            <div class='mt-4'>
              <Row>
                <Col sm='8'>
                  <h4>
                    <SettingsIcon fontSize='large' />
                    Daftar Pelanggan
                  </h4>
                </Col>
                <Col sm='4'>
                  <div className='d-flex justify-content-end'>
                    <DropdownButton variant='primary mr-2' id='dropdown-basic-button' title='Ekspor'>
                      <Dropdown.Item>
                        <a>Excel</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Hapus</a>
                      </Dropdown.Item>
                    </DropdownButton>
                    <FormControl type='text' placeholder='Search . . . .' />
                  </div>
                </Col>
              </Row>

              <TableContainer className='mt-8' component={Paper}>
                <Table size='small' aria-label='a dense table'>
                  <TableHead className='bg-dark'>
                    <TableRow>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama Perusahaan</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Alamat</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Email</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>No. Handphone</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Saldo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold' align='right'>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {data2
                    .filter((i) => i.kontak_type_id == 2)
                    .map((data) => (
                      <TableKontak data={data} />
                    ))}
                </Table>
              </TableContainer>
            </div>
          </div>

          <div eventKey='supplier'>
            <div class='mt-4'>
              <Row>
                <Col sm='8'>
                  <h4>
                    <SettingsIcon fontSize='large' />
                    Daftar Supplier
                  </h4>
                </Col>
                <Col sm='4'>
                  <div className='d-flex justify-content-end'>
                    <DropdownButton variant='primary mr-2' id='dropdown-basic-button' title='Ekspor'>
                      <Dropdown.Item>
                        <a>Excel</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Hapus</a>
                      </Dropdown.Item>
                    </DropdownButton>
                    <FormControl type='text' placeholder='Search . . . .' />
                  </div>
                </Col>
              </Row>

              <TableContainer className='mt-8' component={Paper}>
                <Table size='small' aria-label='a dense table'>
                  <TableHead className='bg-dark'>
                    <TableRow>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama Perusahaan</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Alamat</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Email</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>No. Handphone</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Saldo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold' align='right'>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {data2
                    .filter((i) => i.kontak_type_id == 1)
                    .map((data) => (
                      <TableKontak data={data} />
                    ))}
                </Table>
              </TableContainer>
            </div>
          </div>

          <div eventKey='karyawan'>
            <div class='mt-4'>
              <Row>
                <Col sm='8'>
                  <h4>
                    <SettingsIcon fontSize='large' />
                    Daftar Karywan
                  </h4>
                </Col>
                <Col sm='4'>
                  <div className='d-flex justify-content-end'>
                    <DropdownButton variant='primary mr-2' id='dropdown-basic-button' title='Ekspor'>
                      <Dropdown.Item>
                        <a>Excel</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Hapus</a>
                      </Dropdown.Item>
                    </DropdownButton>
                    <FormControl type='text' placeholder='Search . . . .' />
                  </div>
                </Col>
              </Row>

              <TableContainer className='mt-8' component={Paper}>
                <Table size='small' aria-label='a dense table'>
                  <TableHead className='bg-dark'>
                    <TableRow>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama Perusahaan</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Alamat</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Email</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>No. Handphone</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Saldo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold' align='right'>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {data2
                    .filter((i) => i.kontak_type_id == 3)
                    .map((data) => (
                      <TableKontak data={data} />
                    ))}
                </Table>
              </TableContainer>
            </div>
          </div>

          <div eventKey='lainnya'>
            <div class='mt-4'>
              <Row>
                <Col sm='8'>
                  <h4>
                    <SettingsIcon fontSize='large' />
                    Daftar Lainnya
                  </h4>
                </Col>
                <Col sm='4'>
                  <div className='d-flex justify-content-end'>
                    <DropdownButton variant='primary mr-2' id='dropdown-basic-button' title='Ekspor'>
                      <Dropdown.Item>
                        <a>Excel</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Hapus</a>
                      </Dropdown.Item>
                    </DropdownButton>
                    <FormControl type='text' placeholder='Search . . . .' />
                  </div>
                </Col>
              </Row>

              <TableContainer className='mt-8' component={Paper}>
                <Table size='small' aria-label='a dense table'>
                  <TableHead className='bg-dark'>
                    <TableRow>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Nama Perusahaan</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Alamat</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Email</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>No. Handphone</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold'>Saldo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className='text-white font-bold' align='right'>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {data2
                    .filter((i) => i.kontak_type_id == 4)
                    .map((data) => (
                      <TableKontak data={data} />
                    ))}
                </Table>
              </TableContainer>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const kontaks = await prisma.kontak.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      piutang: true,
      hutang: true,
    },
  });

  const detailkontak = await prisma.kontakDetail.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      kontak: true,
    },
  });

  return {
    props: {
      data: kontaks,
      data2: detailkontak,
    },
  };
}
