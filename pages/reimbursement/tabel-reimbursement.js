import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import TablePagination from "../../components/TablePagination";

import { Formik, Form as Forms } from "formik";
import { Button, Row, Col, FormControl, Modal } from "react-bootstrap";
import { Snackbar, Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table as Tables, TableBody, TableRow, TableCell, TableHead } from "@material-ui/core";
import { Add, Visibility, Edit, Delete, Icon, AssignmentTurnedIn } from "@material-ui/icons/";

import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function CompleteModal(props) {
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

  const api_confirm = "http://localhost:3000/api/reimbursement/confirmReimbursement";
  const router = useRouter();

  const handle_confirm = async () => {
    Axios.post(api_confirm, {
      id: props.id,
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
        <Modal.Title id="contained-modal-title-vcenter">Complete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm">
          Are you sure you want to complete <label className="font-medium">{props.nama}</label>? This will apply the current status to <label className="font-medium">"Done"</label>, and can't be{" "}
          <label className="font-medium">Edited</label>.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handle_confirm}>
          Confirm, Done!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function DeleteModal(props) {
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

  const api_delete = "http://localhost:3000/api/reimbursement/deleteReimbursement";
  const router = useRouter();

  const handle_delete = async () => {
    Axios.delete(api_delete, {
      data: {
        id: props.id,
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
        <Modal.Title id="contained-modal-title-vcenter">Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm">
          Are you sure you want to delete <label className="font-medium">{props.nama}</label>? Once confirmed this can't be undone.
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

export default function TabelReimbursement({ data }) {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });
  const [modalShow2, setModalShow2] = useState({ open: false, id: 0, nama: "" });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState([]);
  const [reimbursement, setReimbursement] = useState(data);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(reimbursement.filter((i) => i.nama_pegawai.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };

  const handleList = () => {
    return search.length > 0 ? search : reimbursement;
  };

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
      <DeleteModal id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
      <CompleteModal id={modalShow2.id} show={modalShow2.open} nama={modalShow2.nama} backdrop="static" keyboard={false} onHide={() => setModalShow2({ open: false, id: 0, nama: "" })} />
      <Head>
        <title>Reimbursement</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Reimbursement</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Reimbursement List</h2>
          </Col>
          <Col sm="4">
            <Link href="add-reimbursement">
              <div className="d-flex justify-content-end">
                <Button variant="primary">
                  <Add fontSize="small" /> Buat Baru
                </Button>
              </div>
            </Link>
          </Col>
        </Row>
      </div>

      <div>
        <Row className="mt-3">
          <Col sm="9"></Col>

          <Col sm="3" className="float-right">
            <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
          </Col>
        </Row>
      </div>

      <div style={{ height: "30rem" }}>
        <TableContainer className="mt-4" component={Paper}>
          <Tables size="small" aria-label="a dense table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">No. Reimbursement</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Periode</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Nama Pegawai</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Yang Mengetahui</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Yang Menyetujui</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Status</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            {handleList()
              .slice(firstIndex, lastIndex)
              .map((i) => (
                <TableBody>
                  <TableRow>
                    <TableCell style={{ minWidth: 200, width: 200 }}>Reimbursement #{i.id}</TableCell>
                    <TableCell style={{ minWidth: 150, width: 150 }}>{i.periode.nama}</TableCell>
                    <TableCell style={{ minWidth: 250, width: 250 }}>{i.nama_pegawai}</TableCell>
                    <TableCell style={{ minWidth: 250, width: 250 }}>{i.yang_mengetahui}</TableCell>
                    <TableCell style={{ minWidth: 250, width: 250 }}>{i.yang_menyetujui}</TableCell>
                    <TableCell style={{ minWidth: 200, width: 200 }}>
                      {i.status == "Process" ? (
                        <span class="bg-yellow-200 text-yellow-600 py-1 px-3 rounded text-xs">{i.status}</span>
                      ) : (
                        <span class="bg-green-200 text-green-600 py-1 px-3 rounded text-xs">{i.status}</span>
                      )}
                    </TableCell>
                    <TableCell style={{ minWidth: 250, width: 250 }} align="right">
                      {i.status == "Process" ? (
                        <>
                          {" "}
                          <Button variant="success" size="sm" className="mr-2" onClick={() => setModalShow2({ open: true, id: i.id, nama: "Reimbursement #" + i.id })}>
                            <a>
                              <AssignmentTurnedIn className="text-white" fontSize="small" />
                            </a>
                          </Button>
                          <Link href={`../../reimbursement/view/${i.id}`}>
                            <a>
                              <Button variant="info" size="sm" className="mr-2">
                                <a>
                                  <Visibility className="text-white" fontSize="small" />
                                </a>
                              </Button>
                            </a>
                          </Link>
                          <Link href={`../../reimbursement/${i.id}`}>
                            <a>
                              <Button variant="warning" size="sm" className="mr-2">
                                <a>
                                  <Edit className="text-white" fontSize="small" />
                                </a>
                              </Button>
                            </a>
                          </Link>
                          <Link href="#">
                            <a>
                              <Button variant="danger" size="sm" className="mr-2" onClick={() => setModalShow({ open: true, id: i.id, nama: "Reimbursement #" + i.id })}>
                                <a>
                                  <Delete className="text-white" fontSize="small" />
                                </a>
                              </Button>
                            </a>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link href={`../../reimbursement/view/${i.id}`}>
                            <a>
                              <Button variant="info" size="sm" className="mr-2">
                                <a>
                                  <Visibility className="text-white" fontSize="small" />
                                </a>
                              </Button>
                            </a>
                          </Link>

                          <Link href="#">
                            <a>
                              <Button variant="danger" size="sm" className="mr-2" onClick={() => setModalShow({ open: true, id: i.id, nama: "Reimbursement #" + i.id })}>
                                <a>
                                  <Delete className="text-white" fontSize="small" />
                                </a>
                              </Button>
                            </a>
                          </Link>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Tables>
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
  const reimbursement = await prisma.headerReimburse.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      periode: true,
    },
  });

  return {
    props: {
      data: reimbursement,
    },
  };
}
