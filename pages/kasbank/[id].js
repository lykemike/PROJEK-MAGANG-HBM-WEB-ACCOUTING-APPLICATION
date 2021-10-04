import React, { useState, useMemo } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import TransaksiJurnal from "../../components/KasBank/TransaksiJurnal";
import BankStatement from "../../components/KasBank/BankStatement";
import PemetaanKas from "../../components/KasBank/PemetaanKas";

import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import {
  Tabs,
  Tab,
  Card,
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  FormControl,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
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
  TableSortLabel,
} from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CachedIcon from "@material-ui/icons/Cached";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import NoteIcon from "@material-ui/icons/Note";

import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";
const prisma = new PrismaClient();

export default function akundetail({ data, bank }) {
  const router = useRouter();
  const { id } = router.query;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [selectedTransactions, setselectedTransactions] = useState([]);

  const [bankStatement, setBankStatement] = useState([]);
  const [selectedBankStatement, setselectedBankStatement] = useState([]);

  const handleSelectAll = (event) => {
    let data_ = data[0];
    let selectedTransactions = [];
    if (event.target.checked) {
      // Kalo header kirim uang ada
      let headerKirimUang = data_.HeaderKirimUang?.map((i) => JSON.stringify({ id: i.id, tipe: "kirimuang" }));
      let headerTerimaUang = data_.HeaderTerimaUang?.map((i) => JSON.stringify({ id: i.id, tipe: "terimauang" }));
      let transferUang = data_.TransferUang1?.map((i) => JSON.stringify({ id: i.id, tipe: "transferuang" }));

      selectedTransactions = [...headerKirimUang, ...headerTerimaUang, ...transferUang];
    } else {
      // Kalo belum di klik checkbox
      selectedTransactions = [];
    }

    setselectedTransactions(selectedTransactions);
  };

  const isChecked = useMemo(() => {
    let data_ = data[0];
    let total = 0;
    total += data_.HeaderKirimUang?.length;
    total += data_.HeaderTerimaUang?.length;
    total += data_.TransferUang1?.length;

    if (selectedTransactions.length === total) {
      return true;
    } else {
      return false;
    }
  }, [selectedTransactions, data]);

  const isIndeterminate = useMemo(() => {
    let data_ = data[0];
    let total = 0;
    total += data_.HeaderKirimUang?.length;
    total += data_.HeaderTerimaUang?.length;
    total += data_.TransferUang1?.length;

    if (selectedTransactions.length > 0 && selectedTransactions.length < total) {
      return true;
    } else {
      return false;
    }
  }, [selectedTransactions, data]);

  const url = "http://localhost:3000/api/kasbank/ubahstatus";
  const onSubmit = async () => {
    Axios.post(url, selectedTransactions)
      .then(function (response) {
        console.log(response);
        router.push(`../kasbank/${id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedTransactions.indexOf(id);
    let newselectedTransactions = [];

    if (selectedIndex === -1) {
      newselectedTransactions = newselectedTransactions.concat(selectedTransactions, id);
    } else if (selectedIndex === 0) {
      newselectedTransactions = newselectedTransactions.concat(selectedTransactions.slice(1));
    } else if (selectedIndex === selectedTransactions.length - 1) {
      newselectedTransactions = newselectedTransactions.concat(selectedTransactions.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedTransactions = newselectedTransactions.concat(
        selectedTransactions.slice(0, selectedIndex),
        selectedTransactions.slice(selectedIndex + 1)
      );
    }
    setselectedTransactions(newselectedTransactions);
  };

  const handleSelectAllBankStatement = (event) => {
    const selectedBankStatement = event.target.checked ? bank.map((i) => i.id) : [];
    setselectedBankStatement(selectedBankStatement);
  };

  const handleSelectOneBankStatement = (event, id) => {
    const selectedIndex = selectedBankStatement.indexOf(id);
    let newselectedBankStatement = [];

    if (selectedIndex === -1) {
      newselectedBankStatement = newselectedBankStatement.concat(selectedBankStatement, id);
    } else if (selectedIndex === 0) {
      newselectedBankStatement = newselectedBankStatement.concat(selectedBankStatement.slice(1));
    } else if (selectedIndex === selectedBankStatement.length - 1) {
      newselectedBankStatement = newselectedBankStatement.concat(selectedBankStatement.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedBankStatement = newselectedBankStatement.concat(
        selectedBankStatement.slice(0, selectedIndex),
        selectedBankStatement.slice(selectedIndex + 1)
      );
    }
    setselectedBankStatement(newselectedBankStatement);
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "binary", cellDates: true, cellText: false });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 0, raw: false, dateNF: "yyyy-mm-dd" });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((imported_data) => {
      setBankStatement(imported_data);
      console.log(imported_data);
    });
  };

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const import_bank_statement_url = "http://localhost:3000/api/kasbank/importBankStatement";
  const import_bank_statement = async () => {
    Axios.post(import_bank_statement_url, {
      bankStatement,
      id,
      current,
    })
      .then(function (response) {
        console.log(response);
        router.push(`../kasbank/${id}`);
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const update_bank_statement_status = "http://localhost:3000/api/kasbank/updateBankStatementStatus";
  const onSubmitBankStatus = async () => {
    Axios.post(update_bank_statement_status, selectedBankStatement)
      .then(function (response) {
        console.log(response);
        router.push(`../kasbank/${id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Layout>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="../jual/penjualan">
          Kas & Bank
        </Link>
        <Typography color="textPrimary">Akun - Cash & Bank</Typography>
      </Breadcrumbs>
      <div className="border-b border-gray-200">
        <Row>
          <Col sm="8">
            {data.map((i) => (
              <h2>
                ({i.kode_akun}) - {i.nama_akun}
              </h2>
            ))}
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Tindakan">
                <Dropdown.Item>
                  <Link href="/kasbank/rekeningkoran">
                    <a>Import Bank Statement</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href="/kasbank/cashlink">
                    <a>Cashlink</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href="/kasbank/laporanrekonsilasi">
                    <a>Laporan Rekonsilasi</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href="/kasbank/mutasirek">
                    <a>Mutasi Rekening</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>Ubah Akun </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </div>

      <div variant="container" className="mt-4">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="transaksiJurnal" title="Transaksi Jurnal" />
          <Tab eventKey="bankStatement" title="Bank Statement" />
          <Tab eventKey="pemetaanKas" title="Pemetaan Kas" />

          <div eventKey="transaksiJurnal">
            <div class="mt-2">
              <div>
                <Row className="mt-2 mb-2">
                  <Col sm="9">
                    {selectedTransactions.length > 0 ? (
                      <Button className="mr-2" variant="primary" onClick={onSubmit}>
                        Rekonsiliasi
                      </Button>
                    ) : null}
                  </Col>
                  <Col sm="3" className="d-flex justify-content-end">
                    <FormControl type="text" placeholder="Search . . . ." />
                  </Col>
                </Row>
              </div>

              <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                  <TableHead className="bg-dark">
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={isChecked}
                          color="primary"
                          indeterminate={isIndeterminate}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Tanggal</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Kontak</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Tag</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Terima (dalam IDR)</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Kirim (dalam IDR)</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Saldo (dalam IDR)</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Status</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {data.map((data, index) => (
                    <TransaksiJurnal
                      data={data}
                      index={index}
                      label="incoming"
                      view="terimauang"
                      contact="contact"
                      selectedTransactions={selectedTransactions}
                      handleSelectOne={handleSelectOne}
                    />
                  ))}
                  {data.map((data, index) => (
                    <TransaksiJurnal
                      data={data}
                      index={index}
                      label="outgoing"
                      view="kirimuang"
                      contact="contact"
                      selectedTransactions={selectedTransactions}
                      handleSelectOne={handleSelectOne}
                    />
                  ))}
                  {data.map((data, index) => (
                    <TransaksiJurnal
                      data={data}
                      index={index}
                      label="outgoing"
                      view="transferuang"
                      contact="nocontact"
                      selectedTransactions={selectedTransactions}
                      handleSelectOne={handleSelectOne}
                    />
                  ))}
                </Table>
              </TableContainer>
            </div>
          </div>

          <div eventKey="bankStatement">
            <div class="mt-2">
              <div>
                <Row className="mt-2 mb-2">
                  <Col sm="9">
                    <Button className="mr-2" variant="primary" onClick={handleShow}>
                      Import Bank Statement
                    </Button>
                    {selectedBankStatement.length > 0 ? (
                      <Button variant="primary" onClick={onSubmitBankStatus}>
                        Rekonsiliasi
                      </Button>
                    ) : null}
                    <Modal show={show} onHide={handleClose} size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>Import Bank Statement</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="mt-4">
                          <p className="font-medium">Langkah 1. Download file template rekening koran kami</p>
                          <hr />
                          <p>
                            Mulai dengan men-download template file XLSX (Excel Microsoft Office Open XML Format
                            Spreadsheet file) rekening koran kami. File ini memiliki kolom heading sesuai yang perlu
                            untuk meng-import data rekening koran Anda.
                          </p>
                          <button
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                            onClick={() => {
                              const header_excel = [
                                { TransactionDateBank: "" },
                                { Received: "" },
                                { Spent: "" },
                                { Description: "" },
                              ];
                              var ws = XLSX.utils.json_to_sheet(header_excel);
                              var wb = XLSX.utils.book_new();
                              XLSX.utils.book_append_sheet(wb, ws, "Bank Statement");
                              XLSX.writeFile(wb, "template_import_bank_statement.xlsx");
                              handleClose();
                            }}
                          >
                            <svg
                              class="fill-current w-4 h-4 mr-2"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                            </svg>
                            <span>Download Bank Statement</span>
                          </button>
                          {/* <Button
                            variant="outline-primary"
                            onClick={() => {
                              const header_excel = [
                                { TransactionDateBank: "" },
                                { Received: "" },
                                { Spent: "" },
                                { Description: "" },
                              ];
                              var ws = XLSX.utils.json_to_sheet(header_excel);
                              var wb = XLSX.utils.book_new();
                              XLSX.utils.book_append_sheet(wb, ws, "Bank Statement");
                              XLSX.writeFile(wb, "template_import_bank_statement.xlsx");
                              handleClose();
                            }}
                          >
                            <NoteIcon className="mr-2" />
                            Download Bank Statement
                          </Button> */}
                        </div>

                        <div className="mt-4">
                          <p className="font-medium">Langkah 2. Copy data rekening koran Anda ke dalam template</p>
                          <hr />
                          <p>
                            Copy dan paste data rekening koran Anda dari file yg di ekspor ke dalam template. Pastikan
                            bahwa data rekening Anda sesuai dengan heading kolom yang di sediakan dalam template.
                          </p>
                          <p className="text-red-500">
                            Penting: Jangan rubah heading kolom yang di sediakan dalam template. Ini harus tetap sama
                            supaya import bisa jalan pada langkah selanjutnya. Kami mengasumsi bahwa tanggal ada dalam
                            format YYYY-MM-DD. Contoh: 2021-09-30
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="font-medium">Langkah 3. Import Bank Statement</p>
                          <hr />
                          <Form.Group controlId="formFileSm" className="mb-3">
                            <input
                              type="file"
                              accept=".xlsx"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                readExcel(file);
                              }}
                            />
                          </Form.Group>
                          <p>
                            File yang Anda impor harus dalam bentuk XLSX (Excel Microsoft Office Open XML Format
                            Spreadsheet file). Nama file Anda harus di akhiri dengan .xlsx
                          </p>
                        </div>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={import_bank_statement}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                  <Col sm="3" className="d-flex justify-content-end">
                    <FormControl type="text" placeholder="Search . . . ." className="mr-2" />
                    <Button variant="primary">Ekspor</Button>
                  </Col>
                </Row>
              </div>

              <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                  <TableHead className="bg-dark">
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={selectedBankStatement.length === bank.length}
                          color="primary"
                          indeterminate={selectedBankStatement.length > 0 && selectedBankStatement.length < bank.length}
                          onChange={handleSelectAllBankStatement}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Tanggal</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Deskripsi</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Tanggal Import</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Terima</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Kirim</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Saldo</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Status</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {bank.map((data, index) => (
                    <BankStatement
                      data={data}
                      index={index}
                      selectedBankStatement={selectedBankStatement}
                      handleSelectOneBankStatement={handleSelectOneBankStatement}
                    />
                  ))}
                </Table>
              </TableContainer>
            </div>
          </div>

          <div eventKey="pemetaanKas">
            <div class="mt-2 mb-2">
              <div>
                <Button variant="primary">
                  <CachedIcon fontSize="medium" /> Muat Ulang
                </Button>

                <div className="float-right">
                  <Button variant="secondary mr-2">
                    <RotateLeftIcon fontSize="medium" />
                    Reset
                  </Button>
                  <Button variant="danger mr-2">
                    <HighlightOffIcon fontSize="medium" /> Hapus
                  </Button>
                  <Button variant="success">
                    <CheckCircleIcon fontSize="medium" /> Rekonsilasi
                  </Button>
                </div>
              </div>

              <TableContainer component={Paper} className="mt-2">
                <Table size="small" aria-label="simple table">
                  <TableHead className="bg-dark">
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={selectedBankStatement.length === bank.length}
                          color="primary"
                          indeterminate={selectedBankStatement.length > 0 && selectedBankStatement.length < bank.length}
                          onChange={handleSelectAllBankStatement}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Tanggal</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Terima</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Bayar</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Deskripsi</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Status</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="text-white font-bold">Akun</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {bank
                    .filter((i) => i.status == "Belum Terekonsiliasi")
                    .map((data, index) => (
                      <PemetaanKas
                        bankId={id}
                        data={data}
                        index={index}
                        selectedBankStatement={selectedBankStatement}
                        handleSelectOneBankStatement={handleSelectOneBankStatement}
                      />
                    ))}
                </Table>
              </TableContainer>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const akun = await prisma.akun.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      HeaderTerimaUang: {
        include: {
          kontak: true,
        },
      },
      HeaderKirimUang: {
        include: {
          kontak: true,
        },
      },
      TransferUang1: true,
      TransferUang2: true,
      JurnalTransferUang: true,
    },
  });

  const bank_statement = await prisma.detailBankStatement.findMany({
    where: {
      akun_id: parseInt(id),
    },
    include: {
      akun: true,
    },
  });

  return {
    props: {
      data: akun,
      bank: bank_statement,
    },
  };
}
