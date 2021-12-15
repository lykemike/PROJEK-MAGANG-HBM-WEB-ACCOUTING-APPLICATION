import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";
import { Card, Button, DropdownButton, Dropdown, InputGroup, FormControl, Col, Row, FormCheck, Pagination, Modal } from "react-bootstrap";
import TablePagination from "../../components/TablePagination";
import { Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";
import { Add, SearchOutlined, ErrorOutline, Visibility, Edit, Delete } from "@material-ui/icons/";

import * as XLSX from "xlsx";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function DeleteModal(props) {
  const router = useRouter();
  const api_delete_produk = "http://localhost:3000/api/produk/deleteProduk";

  const handle_delete = async () => {
    Axios.delete(api_delete_produk, {
      data: {
        id: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.reload(window.location.pathname);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-sm">
        <p>
          Are you sure you want to delete <label className="font-medium">{props.nama}</label>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handle_delete}>
          Confirm, Delete!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

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
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });

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
      <Head>
        <title>Produk & Jasa</title>
      </Head>
      <DeleteModal id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Tabel Produk</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Produk</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href="/produk/add-produk">
                <a>
                  <Button type="button" variant="primary">
                    <Add fontSize="small" />
                    Buat Baru
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-4 mb-8 ">
        <Row>
          <Col>
            <h4 className="text-gray-700">Barang & Jasa</h4>
          </Col>

          <Col className="d-flex justify-content-end">
            <Link href="kategori/tabel-kategori">
              <Button variant="primary">Kategori</Button>
            </Link>

            <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Ekspor">
              <Dropdown.Item
                as="button"
                onClick={() => {
                  let produks = [];
                  data.map((i) => {
                    produks.push({
                      "Nama Produk & Jasa": i.nama,
                      Kategori: i.kategori.nama,
                      Harga: "Rp. " + i.harga.toLocaleString({ minimumFractionDigits: 0 }),
                      "Akun Penjualan": i.akun.nama_akun,
                    });
                  });
                  const header_excel = produks;
                  var ws = XLSX.utils.json_to_sheet(header_excel);
                  var wb = XLSX.utils.book_new();
                  XLSX.utils.book_append_sheet(wb, ws, "List Produk & Jasa");
                  XLSX.writeFile(wb, "list_produk_jasa.xlsx");
                }}
              >
                XLSX
              </Dropdown.Item>
              {/* <Dropdown.Item as="button">
                <CSVLink data={restructure(data)} filename="list_produk_jasa.csv">
                  CSV
                </CSVLink>
              </Dropdown.Item> */}
            </DropdownButton>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <SearchOutlined />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
              </InputGroup>
            </Col>
          </Col>
        </Row>
        <div style={{ height: "30rem" }}>
          <TableContainer className="mt-4" component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead className="bg-dark">
                <TableRow>
                  <TableCell>
                    <FormCheck />
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Nama Produk</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Kategori Produk</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Deskripsi</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Harga</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Akun Penjualan</Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {handleList()
                  .slice(firstIndex, lastIndex)
                  .map((i, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ minWidth: 50, width: 50 }}>
                        <FormCheck />
                      </TableCell>
                      <TableCell style={{ minWidth: 350, width: 350 }}>{i.nama.length > 40 ? i.nama.slice(0, 40) + "..." : i.nama}</TableCell>
                      <TableCell style={{ minWidth: 250, width: 250 }}>{i.kategori.nama}</TableCell>
                      <TableCell style={{ minWidth: 250, width: 250 }}>{i.deskripsi.length > 40 ? i.deskripsi.slice(0, 40) + "..." : i.deskripsi}</TableCell>
                      <TableCell style={{ minWidth: 150, width: 150 }}>Rp. {i.harga.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                      <TableCell style={{ minWidth: 250, width: 250 }}>{i.akun.nama_akun}</TableCell>
                      <TableCell style={{ minWidth: 200, width: 200 }} align="right">
                        <Link href={`../produk/view/${i.id}`}>
                          <a>
                            <Button variant="info" size="sm" className="mr-2">
                              <Visibility className="text-white" fontSize="small" />
                            </Button>
                          </a>
                        </Link>

                        <Link href={`../produk/${i.id}`}>
                          <a>
                            <Button variant="warning" size="sm" className="mr-2">
                              <Edit className="text-white" fontSize="small" />
                            </Button>
                          </a>
                        </Link>

                        <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.id, nama: i.nama })}>
                          <Delete className="text-white" fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div class="flex items-center justify-center mt-4">
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
  const products = await prisma.produk.findMany({
    orderBy: {
      nama: "asc",
    },
    include: {
      akun: true,
      kategori: true,
    },
  });

  return {
    props: {
      data: products,
    },
  };
}
