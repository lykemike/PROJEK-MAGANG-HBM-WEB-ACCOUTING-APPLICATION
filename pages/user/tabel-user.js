import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import TablePagination from "../../components/TablePagination";

import { Button, Row, Col, Modal } from "react-bootstrap";
import { Snackbar, Breadcrumbs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@material-ui/core/";
import { Add, SearchOutlined, ErrorOutline, Visibility, Edit, Delete } from "@material-ui/icons/";
import Axios from "axios";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function DeleteModal(props) {
  const router = useRouter();
  const api_delete_user = "http://localhost:3000/api/user/deleteUser";

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState, toast_message: "" });
  };

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };

  const handle_delete = async () => {
    Axios.delete(api_delete_user, {
      data: {
        userid: props.id,
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
        <Modal.Title id="contained-modal-title-vcenter">Delete User Confirmation</Modal.Title>
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

export default function list({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

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
        <title>Tabel User</title>
      </Head>
      <DeleteModal id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">User</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Users List</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href="add-user">
                <Button variant="primary mr-2">
                  <Add fontSize="small" /> Buat User Baru
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div style={{ height: "30rem" }} className="mt-4">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow className="bg-dark">
                <TableCell>
                  <Typography className="text-white font-bold">First Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Last Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Role</Typography>
                </TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(firstIndex, lastIndex).map((i, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {i.firstName}
                  </TableCell>
                  <TableCell>{i.lastName}</TableCell>
                  <TableCell>{i.email}</TableCell>
                  <TableCell>{i.role.roleType}</TableCell>
                  <TableCell align="right">
                    <Link href={`${i.id}`}>
                      <Button variant="warning" size="sm" className="mr-2">
                        <Edit className="text-white" fontSize="small" />
                      </Button>
                    </Link>

                    <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.id, nama: i.email })}>
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
    </Layout>
  );
}

export async function getServerSideProps() {
  const users = await prisma.user.findMany({
    orderBy: [
      {
        firstName: "asc",
      },
    ],
    include: {
      role: true,
    },
  });

  return {
    props: {
      data: users,
    },
  };
}
