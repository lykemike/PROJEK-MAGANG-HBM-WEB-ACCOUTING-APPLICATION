import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import {
  Card,
  Button,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
  Col,
  Row,
  FormCheck,
  Pagination,
  Modal,
} from "react-bootstrap";
import TablePagination from "../../components/TablePagination";
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
  TableBody,
} from "@material-ui/core";

import { Add, SettingsOutlined, SearchOutlined, VisibilityOutlined, EditOutlined, DeleteOutlined } from "@material-ui/icons/";

import { CSVLink, CSVDownload } from "react-csv";
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
        router.push("tabel-produk");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Produk Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the current Produk?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handle_delete}>
          Confirm Delete
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

  const [modalShow, setModalShow] = useState({ open: false, id: 0 });
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

  const restructure = (data) => {
    let result = [];
    data.map((i) => {
      result.push({
        Nama: i.nama,
        "Kode SKU": i.kode_sku,
        "Kategori Akun": i.kategori_produk.nama,
        Unit: i.satuan.satuan,
      });
    });
    return result;
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
      <DeleteModal id={modalShow.id} show={modalShow.open} onHide={() => setModalShow({ open: false, id: 0 })} />
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
            <Row>
              <SettingsOutlined fontSize="medium" className="mt-1" />
              <h4>Barang & Jasa</h4>
            </Row>
          </Col>

          <Col className="d-flex justify-content-end">
            <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Tambah">
              <Dropdown.Item>
                <a>
                  <Link href="kategori/tabel-kategori">Kategori Produk</Link>
                </a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a>
                  <Link href="satuan/tabel-satuan">Satuan Produk</Link>
                </a>
              </Dropdown.Item>
            </DropdownButton>

            <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Ekspor">
              <Dropdown.Item></Dropdown.Item>
              <Dropdown.Item eventKey="1" as="button">
                <CSVLink data={restructure(data)} filename="product.csv">
                  CSV
                </CSVLink>
              </Dropdown.Item>
            </DropdownButton>
            <Col sm="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <SearchOutlined />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="cari"
                  aria-label="cari"
                  aria-describedby="basic-addon1"
                  onChange={(e) => handleChange(e)}
                />
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
                    <Typography className="text-white font-bold">Kode Produk</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Nama Produk</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold" align="center">
                      Quantity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Satuan</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Harga Beli Satuan</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Harga Jual Satuan</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {handleList()
                  .slice(firstIndex, lastIndex)
                  .map((i, index) => (
                    <TableRow key={index}>
                      <TableCell component="th">
                        <FormCheck />
                      </TableCell>
                      <TableCell>{i.kode_sku}</TableCell>
                      <TableCell>{i.nama}</TableCell>
                      <TableCell align="center">{i.quantity}</TableCell>
                      <TableCell>{i.satuan}</TableCell>
                      <TableCell>Rp. {i.harga_beli_satuan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                      <TableCell>Rp. {i.harga_jual_satuan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                      <TableCell>
                        <Link href={`../produk/view/${i.id}`}>
                          <a>
                            <VisibilityOutlined color="primary" fontSize="small" className="mr-2" />
                          </a>
                        </Link>
                        <Link href={`${i.id}`}>
                          <a>
                            <EditOutlined color="action" fontSize="small" className="mr-2" />
                          </a>
                        </Link>

                        <DeleteOutlined
                          className="cursor-pointer"
                          onClick={() => setModalShow({ open: true, id: i.id })}
                          color="secondary"
                          fontSize="small"
                        />
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
  // Get Produk from API
  const products = await prisma.produk.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
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
