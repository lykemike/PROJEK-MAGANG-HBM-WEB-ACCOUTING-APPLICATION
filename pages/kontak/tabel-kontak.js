import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import TablePagination from "../../components/TablePagination";

import {
  Tabs,
  Tab,
  Card,
  Button,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
  Form,
  Col,
  Row,
  FormCheck,
  Modal,
} from "react-bootstrap";

import {
  Breadcrumbs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core/";

import * as XLSX from "xlsx";
import { Add, SearchOutlined, Visibility, Edit, Delete } from "@material-ui/icons/";

import { useRouter } from "next/router";
import Axios from "axios";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function MyVerticallyCenteredModal(props) {
  const router = useRouter();
  const api_delete = "http://localhost:3000/api/kontak/deletekontak";

  const handle_delete = async () => {
    Axios.delete(api_delete, {
      data: {
        kontakid: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push(`../kontak/tabel-kontak`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Confirmation</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
          risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body> */}
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <button
            class="mr-2 mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300"
            type="button"
            onClick={props.onHide}
          >
            Cancel
          </button>

          <button
            class="mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300"
            type="button"
            onClick={handle_delete}
          >
            Confirm
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default function Kontak({ data, data2 }) {
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const [search, setSearch] = useState([]);
  const [kontak, setKontak] = useState(data2);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modalShow, setModalShow] = useState({ open: false, id: 0, kontak: " " });

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(kontak.filter((i) => i.kontak.nama_perusahaan.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };

  const handleList = () => {
    return search.length > 0 ? search : kontak;
  };

  const api_delete_kontak = "http://localhost:3000/api/kontak/deletekontak";
  const handleDelete = (id) => {
    Axios.delete(api_delete_kontak, {
      data: {
        kontakid: id,
      },
    })
      .then(function (response) {
        router.push("../kontak/tabel-kontak");
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <title>Tabel Kontak</title>
      </Head>
      <MyVerticallyCenteredModal id={modalShow.id} show={modalShow.open} onHide={() => setModalShow({ open: false, id: 0 })} />
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Kontak</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Kontak</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Row>
                <Link href="/kontak/add-kontak">
                  <a>
                    <Button variant="primary">
                      <Add fontSize="small" />
                      Kontak Baru
                    </Button>
                  </a>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <div variant="container" className="mt-4">
        <Tabs defaultActiveKey="client" id="uncontrolled-tab-example">
          <Tab eventKey="client" title="Client" />
          <Tab eventKey="supplier" title="Supplier" />
          <Tab eventKey="principle" title="Principle" />
          <Tab eventKey="karyawan" title="Karyawan" />
          <Tab eventKey="lainnya" title="Lainnya" />

          <div eventKey="client">
            <div class="mt-4">
              <Row>
                <Col sm="8">
                  <h4>Daftar Client</h4>
                </Col>
                <Col sm="4">
                  <div className="d-flex justify-content-end">
                    <DropdownButton variant="primary mr-2" id="dropdown-basic-button" title="Ekspor">
                      <Dropdown.Item>
                        <span
                          onClick={() => {
                            let detail = [];
                            data2
                              .filter((i) => i.kontak_type_id == 1)
                              .map((i) => {
                                detail.push({
                                  Nama: i.kontak.nama,
                                  "Nama Perushaaan": i.kontak.nama_perusahaan,
                                  Email: i.kontak.email,
                                  "No. Handphone": i.kontak.nomor_hp,
                                  "No. NPWP": i.kontak.nomor_npwp,
                                });
                              });
                            var ws = XLSX.utils.json_to_sheet(detail);
                            var wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, "Daftar Client");
                            XLSX.writeFile(wb, "data_client.xlsx");
                          }}
                        >
                          XLSX
                        </span>
                      </Dropdown.Item>
                    </DropdownButton>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <SearchOutlined />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
                    </InputGroup>
                  </div>
                </Col>
              </Row>

              <div style={{ height: "30rem", overflowX: "auto" }} className="mt-4">
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell>
                          <Typography className="text-white font-bold">Nama Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Alamat Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Email</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">NPWP</Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleList()
                        .filter((i) => i.kontak_type_id == 1)
                        .slice(firstIndex, lastIndex)
                        .map((i, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nama_perusahaan}</TableCell>
                            <TableCell style={{ minWidth: 600, width: 600 }}>
                              {i.kontak.alamat_perusahaan.length > 80
                                ? i.kontak.alamat_perusahaan.slice(0, 80) + "..."
                                : i.kontak.alamat_perusahaan}
                            </TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.email}</TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nomor_npwp}</TableCell>
                            <TableCell align="right">
                              {/* <Link href={`../produk/view/${i.id}`}>
                                <a> */}
                              <Button variant="primary" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                              </Link> */}

                              {/* <Link href={`../produk/${i.id}`}>
                          <a> */}
                              <Button variant="success" size="sm" className="mr-2">
                                <Edit className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                        </Link> */}

                              <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.kontak.id })}>
                                <Delete className="text-white" fontSize="small" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
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

          <div eventKey="supplier">
            <div class="mt-4">
              <Row>
                <Col sm="8">
                  <h4>Daftar Supplier</h4>
                </Col>
                <Col sm="4">
                  <div className="d-flex justify-content-end">
                    <DropdownButton variant="primary mr-2" id="dropdown-basic-button" title="Ekspor">
                      <Dropdown.Item>
                        <span
                          onClick={() => {
                            let detail = [];
                            data2
                              .filter((i) => i.kontak_type_id == 2)
                              .map((i) => {
                                detail.push({
                                  Nama: i.kontak.nama,
                                  "Nama Perushaaan": i.kontak.nama_perusahaan,
                                  Email: i.kontak.email,
                                  "No. Handphone": i.kontak.nomor_hp,
                                  "No. NPWP": i.kontak.nomor_npwp,
                                });
                              });
                            var ws = XLSX.utils.json_to_sheet(detail);
                            var wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, "Daftar Supplier");
                            XLSX.writeFile(wb, "data_supplier.xlsx");
                          }}
                        >
                          XLSX
                        </span>
                      </Dropdown.Item>
                    </DropdownButton>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <SearchOutlined />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
                    </InputGroup>
                  </div>
                </Col>
              </Row>

              <div style={{ height: "30rem", overflowX: "auto" }} className="mt-4">
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell>
                          <Typography className="text-white font-bold">Nama Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Alamat Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Email</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">NPWP</Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleList()
                        .filter((i) => i.kontak_type_id == 2)
                        .slice(firstIndex, lastIndex)
                        .map((i, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nama_perusahaan}</TableCell>
                            <TableCell style={{ minWidth: 600, width: 600 }}>
                              {i.kontak.alamat_perusahaan.length > 80
                                ? i.kontak.alamat_perusahaan.slice(0, 80) + "..."
                                : i.kontak.alamat_perusahaan}
                            </TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.email}</TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nomor_npwp}</TableCell>
                            <TableCell align="right">
                              {/* <Link href={`../produk/view/${i.id}`}>
                                <a> */}
                              <Button variant="primary" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                              </Link> */}

                              {/* <Link href={`../produk/${i.id}`}>
                          <a> */}
                              <Button variant="success" size="sm" className="mr-2">
                                <Edit className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                        </Link> */}

                              <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.kontak.id })}>
                                <Delete className="text-white" fontSize="small" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
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

          <div eventKey="principle">
            <div class="mt-4">
              <Row>
                <Col sm="8">
                  <h4>Daftar Principle</h4>
                </Col>
                <Col sm="4">
                  <div className="d-flex justify-content-end">
                    <DropdownButton variant="primary mr-2" id="dropdown-basic-button" title="Ekspor">
                      <Dropdown.Item>
                        <span
                          onClick={() => {
                            let detail = [];
                            data2
                              .filter((i) => i.kontak_type_id == 3)
                              .map((i) => {
                                detail.push({
                                  Nama: i.kontak.nama,
                                  "Nama Perushaaan": i.kontak.nama_perusahaan,
                                  Email: i.kontak.email,
                                  "No. Handphone": i.kontak.nomor_hp,
                                  "No. NPWP": i.kontak.nomor_npwp,
                                });
                              });
                            var ws = XLSX.utils.json_to_sheet(detail);
                            var wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, "Daftar Principle");
                            XLSX.writeFile(wb, "data_principle.xlsx");
                          }}
                        >
                          XLSX
                        </span>
                      </Dropdown.Item>
                    </DropdownButton>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <SearchOutlined />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
                    </InputGroup>
                  </div>
                </Col>
              </Row>

              <div style={{ height: "30rem", overflowX: "auto" }} className="mt-4">
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell>
                          <Typography className="text-white font-bold">Nama Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Alamat Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Email</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">NPWP</Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleList()
                        .filter((i) => i.kontak_type_id == 3)
                        .slice(firstIndex, lastIndex)
                        .map((i, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nama_perusahaan}</TableCell>
                            <TableCell style={{ minWidth: 600, width: 600 }}>
                              {i.kontak.alamat_perusahaan.length > 80
                                ? i.kontak.alamat_perusahaan.slice(0, 80) + "..."
                                : i.kontak.alamat_perusahaan}
                            </TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.email}</TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nomor_npwp}</TableCell>
                            <TableCell align="right">
                              {/* <Link href={`../produk/view/${i.id}`}>
                                <a> */}
                              <Button variant="primary" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                              </Link> */}

                              {/* <Link href={`../produk/${i.id}`}>
                          <a> */}
                              <Button variant="success" size="sm" className="mr-2">
                                <Edit className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                        </Link> */}

                              <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.kontak.id })}>
                                <Delete className="text-white" fontSize="small" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
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

          <div eventKey="karyawan">
            <div class="mt-4">
              <Row>
                <Col sm="8">
                  <h4>Daftar Karyawan</h4>
                </Col>
                <Col sm="4">
                  <div className="d-flex justify-content-end">
                    <DropdownButton variant="primary mr-2" id="dropdown-basic-button" title="Ekspor">
                      <Dropdown.Item>
                        <span
                          onClick={() => {
                            let detail = [];
                            data2
                              .filter((i) => i.kontak_type_id == 4)
                              .map((i) => {
                                detail.push({
                                  Nama: i.kontak.nama,
                                  "Nama Perushaaan": i.kontak.nama_perusahaan,
                                  Email: i.kontak.email,
                                  "No. Handphone": i.kontak.nomor_hp,
                                  "No. NPWP": i.kontak.nomor_npwp,
                                });
                              });
                            var ws = XLSX.utils.json_to_sheet(detail);
                            var wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, "Daftar Karyawan");
                            XLSX.writeFile(wb, "data_karyawan.xlsx");
                          }}
                        >
                          XLSX
                        </span>
                      </Dropdown.Item>
                    </DropdownButton>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <SearchOutlined />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
                    </InputGroup>
                  </div>
                </Col>
              </Row>

              <div style={{ height: "30rem", overflowX: "auto" }} className="mt-4">
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell>
                          <Typography className="text-white font-bold">Nama Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Alamat Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Email</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">NPWP</Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleList()
                        .filter((i) => i.kontak_type_id == 4)
                        .slice(firstIndex, lastIndex)
                        .map((i, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nama_perusahaan}</TableCell>
                            <TableCell style={{ minWidth: 600, width: 600 }}>
                              {i.kontak.alamat_perusahaan.length > 80
                                ? i.kontak.alamat_perusahaan.slice(0, 80) + "..."
                                : i.kontak.alamat_perusahaan}
                            </TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.email}</TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nomor_npwp}</TableCell>
                            <TableCell align="right">
                              {/* <Link href={`../produk/view/${i.id}`}>
                                <a> */}
                              <Button variant="primary" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                              </Link> */}

                              {/* <Link href={`../produk/${i.id}`}>
                          <a> */}
                              <Button variant="success" size="sm" className="mr-2">
                                <Edit className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                        </Link> */}

                              <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.kontak.id })}>
                                <Delete className="text-white" fontSize="small" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
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

          <div eventKey="lainnya">
            <div class="mt-4">
              <Row>
                <Col sm="8">
                  <h4>Daftar Lainnya</h4>
                </Col>
                <Col sm="4">
                  <div className="d-flex justify-content-end">
                    <DropdownButton variant="primary mr-2" id="dropdown-basic-button" title="Ekspor">
                      <Dropdown.Item>
                        <span
                          onClick={() => {
                            let detail = [];
                            data2
                              .filter((i) => i.kontak_type_id == 5)
                              .map((i) => {
                                detail.push({
                                  Nama: i.kontak.nama,
                                  "Nama Perushaaan": i.kontak.nama_perusahaan,
                                  Email: i.kontak.email,
                                  "No. Handphone": i.kontak.nomor_hp,
                                  "No. NPWP": i.kontak.nomor_npwp,
                                });
                              });
                            var ws = XLSX.utils.json_to_sheet(detail);
                            var wb = XLSX.utils.book_new();
                            XLSX.utils.book_append_sheet(wb, ws, "Daftar Lainnya");
                            XLSX.writeFile(wb, "data_lainnya.xlsx");
                          }}
                        >
                          XLSX
                        </span>
                      </Dropdown.Item>
                    </DropdownButton>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <SearchOutlined />
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
                    </InputGroup>
                  </div>
                </Col>
              </Row>

              <div style={{ height: "30rem", overflowX: "auto" }} className="mt-4">
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="a dense table">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell>
                          <Typography className="text-white font-bold">Nama Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Alamat Perusahaan</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">Email</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">NPWP</Typography>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {handleList()
                        .filter((i) => i.kontak_type_id == 5)
                        .slice(firstIndex, lastIndex)
                        .map((i, index) => (
                          <TableRow key={index}>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nama_perusahaan}</TableCell>
                            <TableCell style={{ minWidth: 600, width: 600 }}>
                              {i.kontak.alamat_perusahaan.length > 80
                                ? i.kontak.alamat_perusahaan.slice(0, 80) + "..."
                                : i.kontak.alamat_perusahaan}
                            </TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.email}</TableCell>
                            <TableCell style={{ minWidth: 250, width: 250 }}>{i.kontak.nomor_npwp}</TableCell>
                            <TableCell align="right">
                              {/* <Link href={`../produk/view/${i.id}`}>
                                <a> */}
                              <Button variant="primary" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                              </Link> */}

                              {/* <Link href={`../produk/${i.id}`}>
                          <a> */}
                              <Button variant="success" size="sm" className="mr-2">
                                <Edit className="text-white" fontSize="small" />
                              </Button>
                              {/* </a>
                        </Link> */}

                              <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.kontak.id })}>
                                <Delete className="text-white" fontSize="small" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
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
