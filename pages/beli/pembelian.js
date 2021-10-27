import React, { useState } from "react";
import Link from "next/Link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import TableReusable from "../../components/PenjualanPembelianBiaya/Table";
import { Row, Col, FormControl, Modal, Button } from "react-bootstrap";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function MyVerticallyCenteredModal(props) {
  const router = useRouter();
  const api_delete = "http://localhost:3000/api/beli/deletebeli";

  const handle_delete = async () => {
    Axios.delete(api_delete, {
      data: {
        header_pembelian_id: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
        props.onHide;
        router.push(`../beli/pembelian`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Pembelian Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the current pembelian?</p>
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
export default function pembelian({ data }) {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState({
    open: false,
    id: 0,
    kontak: " ",
  });
  const [search, setSearch] = useState([]);
  const [pembelian, setPembelian] = useState(data);
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(pembelian.filter((i) => i.kontak.nama.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };
  const handleList = () => {
    return search.length > 0 ? search : pembelian;
  };
  const onClick = () => {
    setOpen(!open);
  };
  const total_tagihan = data.reduce((a, b) => (a = a + b.sisa_tagihan), 0);

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const due_date = data.filter((i) => i.tgl_jatuh_tempo < current).reduce((a, b) => (a = a + b.sisa_tagihan), 0);

  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Transaksi</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Pembelian</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Link href="/beli/penagihan-pembelian ">
                <a>
                  <button
                    type="button"
                    className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                  >
                    <AddIcon fontSize="small" /> Buat Pembelian Baru
                  </button>
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
                <h3 class="text-xl font-gray-700 font-bold">Pembelian Belum Dibayar</h3>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">
                  Rp. {total_tagihan.toLocaleString({ minimumFractionDigits: 0 })}
                </h3>
              </div>
            </div>
          </Col>
          <Col sm="4">
            <div class="bg-white rounded-sm overflow-hidden shadow-md hover:shadow-lg transform transition duration-500 hover:scale-105">
              <div class="px-4 py-2 bg-red-300 flex items-center justify-between">
                <h1 class="text-xl font-gray-700 font-bold">Pembelian Jatuh Tempo</h1>
              </div>
              <div class="px-4 py-2 flex space-x-2 mt-2">
                <h3 class="text-lg text-gray-600 font-semibold mb-2">
                  Rp. {due_date > 0 ? due_date.toLocaleString({ minimumFractionDigits: 0 }) : "0,00"}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="border-t border-gray-200 justify-end">
        <Row className="mt-2 mb-2">
          <Col sm="9">
            <h3>Transaksi Pembelian</h3>
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
                <Typography className="text-white font-bold">Tanggal Transaksi</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Nomor</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Pelanggan</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Tanggal Jatuh Tempo</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Tag</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Sisa Tagihan</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-white font-bold">Total</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography className="text-white font-bold">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {data.map((data, index) => (
            <TableReusable data={data} index={index} label="Purchase Invoice" label2="Pengiriman Bayaran" view="beli" />
          ))}
        </Table>
      </TableContainer>
    </Layout>
  );
}
export async function getServerSideProps() {
  const pembelians = await prisma.headerPembelian.findMany({
    orderBy: [
      {
        tgl_jatuh_tempo: "asc",
      },
    ],
    include: {
      kontak: true,
      akun1: true,
      akun2: true,
      PengirimanBayaran: true,
    },
  });

  return {
    props: {
      data: pembelians,
    },
  };
}
