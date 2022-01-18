import React, { useState, useCallback } from "react";
import Link from "next/Link";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import TablePenjualan from "../../components/PenjualanPembelianBiaya/TabelPenjualan";
import { Row, Col, FormControl, Modal, Button } from "react-bootstrap";
import { Snackbar, Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableHead, TableFooter, TableBody, TableRow, TableCell, Collapse, IconButton, Box } from "@material-ui/core";

import { Add, SearchOutlined, ErrorOutline, Visibility, Edit, Delete, Icon, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons/";

import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function DeleteModal(props) {
  const router = useRouter();
  const api_delete = "http://localhost:3000/api/jual/deletePenjualan";
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
    Axios.delete(api_delete, {
      data: {
        header_penjualan_id: props.id,
      },
    })
      .then(function (response) {
        setState({ open: true, toast_message: response.data.message });
        router.reload(window.location.pathname);
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

export default function penjualan({ data }) {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });

  const [search, setSearch] = useState([]);
  const [penjualan, setPenjualan] = useState(data);
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(penjualan.filter((i) => i.nama_perusahaan.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };

  const handleList = () => {
    return search.length > 0 ? search : penjualan;
  };

  const total_tagihan = data.reduce((a, b) => (a = a + b.sisa_tagihan), 0);

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const status = useCallback((tgl_kontrak_expired, status) => {
    if (tgl_kontrak_expired < current) {
      return <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Jatuh Tempo</span>;
    } else if (status == "Complete") {
      return <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Complete</span>;
    } else if (status == "Active") {
      return <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>;
    } else if (status == "Partial") {
      return <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Partial</span>;
    } else {
      null;
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Penjualan</title>
      </Head>
      <DeleteModal id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />

      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Penjualan</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href="/jual/penagihan-penjualan">
                <a>
                  <Button variant="primary">
                    <Add fontSize="small" /> Buat Penjualan Baru
                  </Button>
                </a>
              </Link>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-4 mb-8 ">
        <Row sm="12">
          <Col sm="4">
            <div class="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
              <div class="px-4 py-2 bg-blue-300 flex items-center justify-between">
                <h1 class="text-xl font-gray-700 font-bold">Penjualan Belum Dibayar</h1>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">Rp. {total_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border-t border-gray-200 justify-end">
        <Row className="mt-2 mb-2">
          <Col sm="9">
            <h3>Transaksi Penjualan</h3>
          </Col>
          <Col sm="3" className="d-flex justify-content-end">
            <FormControl type="text" placeholder="Search . . . ." onChange={(e) => handleChange(e)} />
          </Col>
        </Row>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography className="text-white font-bold">Tanggal Mulai Kontrak</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Nomor</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Pelanggan</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Tanggal Habis Kontrak</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Sisa Tagihan</Typography>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          {handleList().map((data) => (
            <TablePenjualan data={data} modalDelete={() => setModalShow({ open: true, id: data.id, nama: "Sales Invoice #" + data.id + " " + data.nama_perusahaan })} />
          ))}
        </Table>
      </TableContainer>
    </Layout>
  );
}
export async function getServerSideProps() {
  const penjualans = await prisma.headerPenjualan.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      kontak: true,
      PenerimaanPembayaran: true,
    },
  });

  return {
    props: {
      data: penjualans,
    },
  };
}
