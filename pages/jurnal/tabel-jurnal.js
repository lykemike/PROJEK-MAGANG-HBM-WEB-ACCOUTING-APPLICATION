import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";
import { Card, Button, DropdownButton, Dropdown, InputGroup, FormControl, Col, Row, FormCheck, Pagination, Modal } from "react-bootstrap";
import TablePagination from "../../components/TablePagination";
import { Snackbar, Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";

import { VisibilityOutlined, EditOutlined, DeleteOutline, Add, Visibility, Edit, Delete } from "@material-ui/icons/";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";

import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function MyVerticallyCenteredModal(props) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };
  const router = useRouter();
  const api_delete_jurnal = "http://localhost:3000/api/jurnal/deleteJurnal";

  const handle_delete = async () => {
    Axios.delete(api_delete_jurnal, {
      data: {
        jurnal_id: props.id,
      },
    })
      .then(function (response) {
        setState({ open: true, toast_message: response.data.message });

        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 2000);
      })
      .catch(function (error) {
        setState({ open: true, toast_message: error.response.data.message });
      });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Journal Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {props.nama}?</p>
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

export default function tabelProduk({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

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
      <Head>
        <title>Tabel Jurnal</title>
      </Head>
      <MyVerticallyCenteredModal id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Jurnal</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Tabel Jurnal</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href="/jurnal/create-jurnal">
                <a>
                  <Button variant="primary">
                    <Add fontSize="small" />
                    Buat Jurnal Baru
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <div style={{ height: "30rem" }}>
          <TableContainer className="mt-4" component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead className="bg-dark">
                <TableRow>
                  <TableCell>
                    <Typography className="text-white font-bold">No. Transaksi</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Tanggal Transaksi</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Total Debit</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="text-white font-bold">Total Kredit</Typography>
                  </TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(firstIndex, lastIndex).map((i, index) => (
                  <TableRow key={index}>
                    <TableCell>Journal Entry #{i.id}</TableCell>
                    <TableCell>{i.tgl_transaksi}</TableCell>
                    <TableCell>Rp. {i.total_debit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                    <TableCell>Rp. {i.total_kredit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                    <TableCell align="right">
                      <Link href={`../jurnal/view-jurnal/${i.id}`}>
                        <a>
                          <Button variant="info" size="sm" className="mr-2">
                            <Visibility className="text-white" fontSize="small" />
                          </Button>
                        </a>
                      </Link>

                      <Link href={`../jurnal/${i.id}`}>
                        <a>
                          <Button variant="warning" size="sm" className="mr-2">
                            <Edit className="text-white" fontSize="small" />
                          </Button>
                        </a>
                      </Link>

                      <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.id, nama: "Journal Entry #" + i.id })}>
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
  const get_jurnal = await prisma.headerJurnal.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return {
    props: {
      data: get_jurnal,
    },
  };
}
