import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import TablePagination from "../../components/TablePagination";

import { Button, Row, Col, Modal } from "react-bootstrap";
import { Breadcrumbs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@material-ui/core/";
import { Visibility, Edit, Delete } from "@material-ui/icons/";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Axios from "axios";

function MyVerticallyCenteredModal(props) {
  const router = useRouter();
  const api_delete_pajak = "http://localhost:3000/api/pajak/deletepajak";
  const alert = "";
  const handle_delete = async () => {
    Axios.delete(api_delete_pajak, {
      data: {
        pajakid: props.id,
      },
    })
      .then(function (response) {
        console.log(response.data.message);
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
        <p>
          Are you sure you want to delete pajak <label className="font-medium">{props.nama}</label>?
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

export default function list({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });

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
      <MyVerticallyCenteredModal nama={modalShow.nama} id={modalShow.id} show={modalShow.open} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
      <Head>
        <title>Tabel Pajak</title>
      </Head>

      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Pajak</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Pajak List</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href="/pajak/add-pajak">
                <Button variant="primary mr-2">
                  <AddIcon fontSize="small" /> Buat Pajak
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div variant="container">
        <div style={{ height: "30rem" }} className="mt-4">
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow className="bg-dark">
                  <TableCell>
                    <Typography className="text-white font-bold">Nama</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Presentase Efektif</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Akun Pajak Keluaran</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Akun Pajak Masukan</Typography>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(firstIndex, lastIndex).map((i, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {i.nama}
                    </TableCell>
                    <TableCell>{i.presentase_aktif} %</TableCell>
                    <TableCell>{i.kategori1.kode_akun + " - " + i.kategori1.nama_akun}</TableCell>
                    <TableCell>{i.kategori2.kode_akun + " - " + i.kategori2.nama_akun}</TableCell>
                    <TableCell align="right">
                      <Link href={`${i.id}`}>
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
  const getNamaPajakAkun = await prisma.pajak.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      kategori1: true,
      kategori2: true,
    },
  });

  return {
    props: {
      data: getNamaPajakAkun,
    },
  };
}
