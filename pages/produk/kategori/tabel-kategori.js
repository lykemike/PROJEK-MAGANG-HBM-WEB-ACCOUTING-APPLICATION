import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import TablePagination from "../../../components/TablePagination";
import { Formik, Form as Forms } from "formik";
import { Card, Button, InputGroup, FormControl, Col, Row, Modal, Form } from "react-bootstrap";

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
import { Add, Search, Delete } from "@material-ui/icons/";

import * as Yup from "yup";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function CreateModal(props) {
  const KategoriSchema = Yup.object().shape({
    nama: Yup.string()
      .min(1, "* must be atleast 1 characters")
      .max(15, "* must be less than 15 characters")
      .required("* required"),
  });

  const api_create_kategori = "http://localhost:3000/api/produk/createKategori";
  return (
    <Formik
      initialValues={{
        nama: "",
        jumlah: 0,
      }}
      validationSchema={KategoriSchema}
      onSubmit={async (values) => {
        Axios.post(api_create_kategori, values)
          .then(function (response) {
            console.log(response);
            router.push("../satuan/tabel-satuan");
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
    >
      {(formikProps) => (
        <Forms noValidate>
          <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Tambah Kategori</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-2">
                <Col xs={2} className="mt-1">
                  <label className="font-medium">Kategori</label>
                </Col>
                <Col xs={8}>
                  <Form.Control
                    placeholder="Nama kategori"
                    name="nama"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                  />
                </Col>
                {formikProps.errors.nama && formikProps.touched.nama ? (
                  <div class="text-red-500 text-sm mt-2">{formikProps.errors.nama}</div>
                ) : null}
              </Row>

              <Row className="mb-2">
                <Col xs={2} className="mt-1">
                  <label className="font-medium">Jumlah</label>
                </Col>
                <Col xs={8}>
                  <Form.Control placeholder="Auto (0)" name="jumlah" disabled />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button variant="success" onClick={formikProps.handleSubmit}>
                Tambah
              </Button>
            </Modal.Footer>
          </Modal>
        </Forms>
      )}
    </Formik>
  );
}

function DeleteModal(props) {
  const router = useRouter();
  const api_delete_kategori = "http://localhost:3000/api/produk/deleteKategori";

  const handle_delete = async () => {
    Axios.delete(api_delete_kategori, {
      data: {
        id: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("../kategori/tabel-kategori");
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
          Are you sure you want to delete <label className="font-medium">{props.nama}</label> ?
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

export default function tabelKategori({ data }) {
  const [search, setSearch] = useState([]);
  const [kategori, setKategori] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const [modalCreate, setModalCreate] = useState(false);
  const [modalDelete, setModalDelete] = useState({ open: false, id: 0, nama: "" });

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(kategori.filter((i) => i.nama.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setSearch([]);
    }
  };

  const handleList = () => {
    return search.length > 0 ? search : kategori;
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
      <CreateModal backdrop="static" keyboard={false} show={modalCreate} onHide={() => setModalCreate(false)} />
      <DeleteModal
        id={modalDelete.id}
        show={modalDelete.open}
        nama={modalDelete.nama}
        backdrop="static"
        keyboard={false}
        onHide={() => setModalDelete({ open: false, id: 0, nama: "" })}
      />
      <Head>
        <title>Kategori Produk</title>
      </Head>

      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Kategori Produk</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Menambahkan Kategori Baru</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={() => setModalCreate(true)}>
                <Add fontSize="small" />
                Tambah
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <div className="py-4 border-b border-gray-200">
        <Row>
          <Col sm="2">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Search />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Cari" onChange={(e) => handleChange(e)} />
            </InputGroup>
          </Col>
        </Row>
      </div>

      <div style={{ height: "30rem" }}>
        <TableContainer className="mt-4" component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">Nama</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Jumlah</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {handleList()
                .slice(firstIndex, lastIndex)
                .map((i, index) => (
                  <TableRow key={index}>
                    <TableCell>{i.nama}</TableCell>
                    <TableCell>{i.jumlah}</TableCell>
                    <TableCell align="right">
                      {/* <DeleteOutline
                        onClick={() => setModalDelete({ open: true, id: i.id })}
                        color="secondary"
                        fontSize="small"
                        className="cursor-pointer"
                      /> */}

                      <Button variant="danger" size="sm" onClick={() => setModalDelete({ open: true, id: i.id, nama: i.nama })}>
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
  const get_kategori_produk = await prisma.kategoriProduk.findMany({
    orderBy: {
      nama: "asc",
    },
  });

  return {
    props: {
      data: get_kategori_produk,
    },
  };
}
