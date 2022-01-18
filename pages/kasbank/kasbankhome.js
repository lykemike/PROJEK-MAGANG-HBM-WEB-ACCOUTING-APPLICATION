import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import Head from "next/head";
import { Button, DropdownButton, Dropdown, Row, Col, Modal, Form } from "react-bootstrap";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TablePagination from "../../components/TablePagination";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import _ from "lodash";
import { green, red } from "@material-ui/core/colors";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import UpdateIcon from "@material-ui/icons/Update";
import { useRouter } from "next/router";
import Axios from "axios";
import { Formik, Form as Forms, FieldArray } from "formik";
function UpdateModal(props) {
  const router = useRouter();
  const url = "http://localhost:3000/api/kasbank/updateKasBank";

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Update Saldo Awal</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          id: props.id,
          saldo_baru: 0,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.reload(window.location.pathname);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(formikProps) => (
          <>
            <Modal.Body>
              <p>
                Update Saldo Awal <label className="font-medium">{props.nama}.</label>
              </p>
              <Row>
                <Col sm="3">
                  <label className="font-medium">Saldo Awal</label>
                </Col>
                <Col sm="8">
                  <Form.Control type="number" placeholder={props.saldo.toLocaleString()} onChange={(e) => formikProps.setFieldValue(`saldo_baru`, e.target.value)} />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button variant="success" onClick={formikProps.handleSubmit}>
                Confirm, Update!
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}

export default function jurnalentry({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "", saldo: 0 });

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

  let current_data = [];
  data.map((i) => {
    current_data.push({
      id: i.id,
      kode_akun: i.kode_akun,
      nama_akun: i.nama_akun,
      saldo_awal: i.DetailSaldoAwal[0].debit,
      saldo_skrg: i.DetailSaldoAwal[0].sisa_saldo,
    });
  });

  let new_data = [];
  current_data.map((i) => {
    new_data.push({
      id: i.id,
      kode_akun: i.kode_akun,
      nama_akun: i.nama_akun,
      saldo_awal: i.saldo_awal,
      saldo_skrg: i.saldo_skrg,
      presentase_sisa: i.saldo_awal == 0 ? 0 : (i.saldo_skrg / i.saldo_awal) * 100,
    });
  });

  return (
    <Layout>
      <UpdateModal
        id={modalShow.id}
        show={modalShow.open}
        nama={modalShow.nama}
        saldo={modalShow.saldo}
        backdrop="static"
        keyboard={false}
        onHide={() => setModalShow({ open: false, id: 0, nama: "", saldo: 0 })}
      />
      <Head>
        <title>Kas & Bank</title>
      </Head>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Kas & Bank</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Akun Kas</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <DropdownButton id="dropdown-basic-button" title="Buat transaksi">
                <Dropdown.Item href="/kasbank/transferuang">Transfer Uang</Dropdown.Item>
                <Dropdown.Item href="/kasbank/terimauang">Terima Uang</Dropdown.Item>
                <Dropdown.Item href="/kasbank/kirimuang">Kirim Uang</Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-8" style={{ height: "30rem" }}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">Kode Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Nama Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Saldo Awal Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Saldo Saat Ini</Typography>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {new_data.slice(firstIndex, lastIndex).map((i, index) => (
                <TableRow>
                  <TableCell className="font-semibold" style={{ minWidth: 200, width: 200 }}>
                    {i.kode_akun}
                  </TableCell>
                  <TableCell className="font-semibold" style={{ minWidth: 500, width: 500 }}>
                    <Link key={index} href={`/kasbank/${i.id}`}>
                      <a>{i.nama_akun}</a>
                    </Link>
                  </TableCell>
                  <TableCell style={{ minWidth: 300, width: 300 }}>
                    {i.saldo_awal > 0
                      ? "Rp. " +
                        i.saldo_awal.toLocaleString({
                          minimumFractionDigits: 0,
                        })
                      : "Rp. 0, 00"}
                  </TableCell>
                  <TableCell style={{ minWidth: 300, width: 300 }}>
                    {i.saldo_skrg > 0
                      ? "Rp. " +
                        i.saldo_skrg.toLocaleString({
                          minimumFractionDigits: 0,
                        })
                      : "Rp. 0, 00"}
                  </TableCell>
                  <TableCell align="left" style={{ minWidth: 150, width: 150 }}>
                    {i.presentase_sisa >= 100 ? (
                      <>
                        <TrendingUpIcon className="mr-2" style={{ color: green[500] }} />
                        <label className="text-green-600">{(i.presentase_sisa - 100).toFixed(2)}%</label>
                      </>
                    ) : (
                      <>
                        <TrendingDownIcon className="mr-2" style={{ color: red[500] }} />
                        <label className="text-red-600">{(100 - i.presentase_sisa).toFixed(2)}%</label>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant="warning" size="sm" className="mr-2" onClick={() => setModalShow({ open: true, id: i.id, nama: i.nama_akun, saldo: i.saldo_skrg })}>
                      <UpdateIcon className="text-white" fontSize="small" />
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
  // Get Akuns from API
  const kasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
    include: {
      DetailSaldoAwal: true,
    },
  });

  return {
    props: {
      data: kasBank,
    },
  };
}
