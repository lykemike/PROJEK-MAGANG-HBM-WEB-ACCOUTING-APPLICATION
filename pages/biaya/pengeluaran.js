import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import TablePagination from "../../components/TablePagination";
import TableBiaya from "../../components/PenjualanPembelianBiaya/TabelBiaya";
import Link from "next/link";

import { Row, Col, Button, InputGroup, FormControl, FormCheck, Modal } from "react-bootstrap";
import { Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableHead, TableFooter, TableBody, TableRow, TableCell, Collapse, IconButton, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useRouter } from "next/router";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function DeleteModal(props) {
  const router = useRouter();
  const api_delete = "http://localhost:3000/api/biaya/deleteBiaya";

  const handle_delete = async () => {
    Axios.delete(api_delete, {
      data: {
        header_biaya_id: props.id,
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
      <Modal.Body>
        <p className="text-sm">
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

export default function Pengeluaran({ data }) {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });

  const [search, setSearch] = useState([]);
  const [product, setProduct] = useState(data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(product.filter((i) => i.akun.nama_akun.toLowerCase().includes(e.target.value.toLowerCase())));
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
        <title>Biaya</title>
      </Head>
      <DeleteModal id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Biaya</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Pengeluaran</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href="/biaya/buat-biaya">
                <a>
                  <Button variant="primary">
                    <AddIcon fontSize="small" /> Buat Biaya Baru
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-4 mb-8">
        <Row sm="12">
          <Col sm="4">
            <div class="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
              <div class="px-4 py-2 bg-blue-300 flex items-center justify-between">
                <h3 class="text-xl font-gray-700 font-bold">Total Biaya Bulan Ini</h3>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">Rp. {data.reduce((a, b) => (a = a + b.total), 0).toLocaleString({ minimumFractionDigits: 0 })}</h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border-t border-gray-200 justify-end">
        <Row className="mt-2 mb-2">
          <Col sm="9">
            <h3>Daftar Biaya</h3>
          </Col>
          <Col sm="3" className="d-flex justify-content-end">
            <FormControl placeholder="Search . . . ." aria-label="cari" aria-describedby="basic-addon1" onChange={(e) => handleChange(e)} />
          </Col>
        </Row>
      </div>
      <div style={{ height: "30rem" }}>
        <TableContainer component={Paper} className="mt-8">
          <Table aria-label="collapsible table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography className="text-white font-bold">Tanggal</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Nomor</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Akun Bayar</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Total (dalam IDR)</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            {handleList().map((data, index) => (
              <TableBiaya data={data} index={index} modalDelete={() => setModalShow({ open: true, id: data.id, nama: "Expense #" + data.id })} />
            ))}
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
    </Layout>
  );
}

export async function getServerSideProps() {
  const biayas = await prisma.headerBiaya.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      DetailBiaya: true,
      JurnalBiaya: true,
      akun: true,
      cara_pembayaran: true,
    },
  });

  return {
    props: {
      data: biayas,
    },
  };
}
