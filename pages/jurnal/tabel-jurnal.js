import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
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

import { VisibilityOutlined, EditOutlined, DeleteOutline, Add } from "@material-ui/icons/";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";

import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function MyVerticallyCenteredModal(props) {
  const router = useRouter();
  const api_delete_jurnal = "http://localhost:3000/api/jurnal/deleteJurnal";

  const handle_delete = async () => {
    Axios.delete(api_delete_jurnal, {
      data: {
        jurnal_id: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("tabel-jurnal");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Journal Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the current journal?</p>
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

export default function tabelProduk({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const [modalShow, setModalShow] = useState({ open: false, id: 0 });

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
      <MyVerticallyCenteredModal id={modalShow.id} show={modalShow.open} onHide={() => setModalShow({ open: false, id: 0 })} />
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
                  <TableCell align="center">
                    <Typography className="text-white font-bold">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(firstIndex, lastIndex).map((i, index) => (
                  <TableRow key={index}>
                    <TableCell>Journal Entry #{i.id}</TableCell>
                    <TableCell>{i.tgl_transaksi}</TableCell>
                    <TableCell>Rp. {i.total_debit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                    <TableCell>Rp. {i.total_kredit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                    <TableCell align="center">
                      <Link href={`../jurnal/view-jurnal/${i.id}`}>
                        <a>
                          <VisibilityOutlined color="primary" fontSize="small" className="mr-2 cursor-pointer" />
                        </a>
                      </Link>
                      <Link href={`../jurnal/${i.id}`}>
                        <a>
                          <EditOutlined color="action" fontSize="small" className="mr-2 cursor-pointer" />
                        </a>
                      </Link>
                      <DeleteOutline
                        onClick={() => setModalShow({ open: true, id: i.id })}
                        color="secondary"
                        fontSize="small"
                        className="cursor-pointer"
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
