import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import TablePagination from "../../components/TablePagination";

import { Button, Row, Col, Modal } from "react-bootstrap";
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
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Axios from "axios";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function MyVerticallyCenteredModal(props) {
  const router = useRouter();
  const api_delete_user = "http://localhost:3000/api/user/deleteUser";

  const handle_delete = async () => {
    Axios.delete(api_delete_user, {
      data: {
        userid: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("tabel-user");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete User Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the current user?</p>
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

export default function list({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalShow, setModalShow] = useState({ open: false, id: 0 });

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
      <MyVerticallyCenteredModal id={modalShow.id} show={modalShow.open} onHide={() => setModalShow({ open: false, id: 0 })} />
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
                  <AddIcon fontSize="small" /> Buat User Baru
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
                <TableCell>
                  <Typography className="text-white font-bold">Actions</Typography>
                </TableCell>
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
                  <TableCell>
                    <Link href={`${i.id}`}>
                      <EditOutlinedIcon color="action" fontSize="small" className="mr-2 cursor-pointer" />
                    </Link>
                    <DeleteOutlineIcon
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
