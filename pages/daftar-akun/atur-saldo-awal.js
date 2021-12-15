import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Table, Row, Input, Form, Col, FormControl, Modal } from "react-bootstrap";
import Link from "next/link";
import Axios from "axios";
import TablePagination from "../../components/TablePagination";
import { Formik, Form as Forms, FieldArray } from "formik";
import TextField from "@material-ui/core/TextField";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Tables from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";
import { TableFooter } from "@material-ui/core";
const prisma = new PrismaClient();
import { useRouter } from "next/router";
function InfoModal(props) {
  const router = useRouter();

  const [bankStatement, setBankStatement] = useState([]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "binary", cellText: false });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 0, raw: false });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((imported_data) => {
      setBankStatement(imported_data);
    });
  };

  let data_import = [];
  bankStatement.map((i) => {
    data_import.push({
      id: i.id,
      kode_akun: i.kode_akun,
      nama_akun: i.nama_akun,
      debit_nominal: i.debit == "###" || i.debit == "DEBIT" ? 0 : parseInt(i.debit),
      kredit_nominal: i.kredit == "###" || i.kredit == "KREDIT" ? 0 : parseInt(i.kredit),
      sisa_saldo_debit: i.debit > 0 ? parseInt(i.debit) : 0,
      sisa_saldo_kredit: i.kredit > 0 ? parseInt(i.kredit) : 0,
    });
  });

  let debit_tot = data_import.reduce((a, b) => (a = a + b.debit_nominal), 0);
  let kredit_tot = data_import.reduce((a, b) => (a = a + b.kredit_nominal), 0);
  let balance = debit_tot - kredit_tot;

  let label_tag = "";
  let label_number = "";
  if (debit_tot > kredit_tot) {
    label_tag = "Kredit Kurang ";
    label_number = balance;
  } else if (debit_tot < kredit_tot) {
    label_tag = "Debit Kurang ";
    label_number = balance * -1;
  } else {
    label_tag = "Balance";
    label_number = "";
  }

  const api = "http://localhost:3000/api/daftar-akun/importSaldoAwal";

  const tgl_konversi = props.tgl_konversi;
  const handle_submit = async () => {
    Axios.post(api, {
      data_import,
      tgl_konversi,
    })
      .then(function (response) {
        console.log(response);
        // router.push("../daftar-akun/daftar-akun");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Import Steps</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm">
          <label className="font-medium mr-1">1.</label>
          <label className="font-medium mr-1 ">Download template saldo awal</label>
        </p>
        <Button
          variant="info"
          onClick={() => {
            let akun = [];
            props.list.map((i) => {
              akun.push({
                id: i.id,
                kode_akun: i.kode_akun,
                nama_akun: i.nama_akun,
                debit: i.tipe_saldo == "Debit" ? "DEBIT" : "###",
                kredit: i.tipe_saldo == "Kredit" ? "KREDIT" : "###",
              });
            });
            const header_excel = akun;
            var ws = XLSX.utils.json_to_sheet(header_excel);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Template Saldo Awal");
            XLSX.writeFile(wb, "template_saldo_awal.xlsx");
            // const header_excel = [{ TransactionDateBank: "" }, { Received: "" }, { Spent: "" }, { Description: "" }];
            // var ws = XLSX.utils.json_to_sheet(header_excel);
            // var wb = XLSX.utils.book_new();
            // XLSX.utils.book_append_sheet(wb, ws, "Bank Statement");
            // XLSX.writeFile(wb, "template_import_bank_statement.xlsx");
            // handleClose();
          }}
        >
          Download Template
        </Button>
        <p className="text-sm mt-2">
          <label className="font-medium mr-1">2.</label>Kolom
          <label className="font-medium text-base ml-1 mr-1 ">id, kode_akun,</label>
          dan
          <label className="font-medium text-base ml-1 mr-1">nama_akun</label>
          jangan
          <label className="font-medium text-base text-red-600 ml-1 mr-1">diubah</label>atau<label className="font-medium text-base text-red-600 ml-1 mr-1">dihapus</label>
          agar importan berjalan dengan lancar.
        </p>
        <p className="text-sm">
          <label className="font-medium mr-1">3.</label>
          Kolom yang isinya<label className="font-medium text-base ml-1 mr-1">DEBIT</label>atau
          <label className="font-medium text-base ml-1">KREDIT</label>, itu boleh di isi, dan kolom yang isinya<label className="font-medium text-base ml-1 mr-1">###</label>
          jangan
          <label className="font-medium text-base text-red-600 ml-1 mr-1">diubah</label>atau<label className="font-medium text-base text-red-600 ml-1 ">dihapus</label>, itu akan otomatis 0 ketika di
          import.
        </p>
        <p className="text-sm">
          <label className="font-medium mr-1">4.</label>Pastikan sebelum submit<label className="font-medium text-base ml-1 mr-1">DEBIT</label>dan
          <label className="font-medium text-base ml-1 mr-1">KREDIT</label>seimbang.
        </p>
        <Form.Group controlId="formFileSm" className="mt-4">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
        </Form.Group>
        <div className="flex">
          <h3 className="mr-2">{label_tag}</h3>
          <h3 className="text-blue-600">{label_number == 0 ? "" : "Rp. " + label_number.toLocaleString({ minimumFractionDigits: 0 }, { maximumFractionDigits: 3 })}</h3>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" disabled={balance == 0 ? false : true} onClick={handle_submit}>
          Confirm, Submit!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function test({ list }) {
  const url = "http://localhost:3000/api/daftar-akun/createSaldoAwal";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState({ open: false, list: "", tgl_konversi: "" });

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;
  var today = new Date(),
    date = today.toISOString().slice(0, 10);

  // const handlePrevChange = () => {
  //   if (page < 1) {
  //     setPage(0);
  //   } else {
  //     setPage(page - 1);
  //   }
  // };

  // const handleNextChange = () => {
  //   if (page < parseInt(list.length / rowsPerPage)) {
  //     setPage(page + 1);
  //   } else {
  //     setPage(parseInt(list.length / rowsPerPage));
  //   }
  // };

  // const handleFirstPage = () => {
  //   setPage(0);
  // };

  // const handleClickPage = (id) => {
  //   setPage(id);
  // };

  // const handleLastPage = () => {
  //   setPage(parseInt(list.length / rowsPerPage));
  // };

  // const [bankStatement, setBankStatement] = useState([]);
  // const readExcel = (file) => {
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsBinaryString(file);
  //     fileReader.onload = (e) => {
  //       const bufferArray = e.target.result;
  //       const wb = XLSX.read(bufferArray, { type: "binary", cellText: false });
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       const data = XLSX.utils.sheet_to_json(ws, { header: 0, raw: false });
  //       resolve(data);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //   });
  //   promise.then((imported_data) => {
  //     setBankStatement(imported_data);
  //   });
  // };

  // let debit = [];
  // bankStatement.map((i) => {
  //   debit.push({
  //     id: i.id,
  //     kode_akun: i.kode_akun,
  //     nama_akun: i.nama_akun,
  //     debit_nominal: i.debit == "###" || i.debit == "DEBIT" ? 0 : parseInt(i.debit),
  //     kredit_nominal: i.kredit == "###" || i.kredit == "KREDIT" ? 0 : parseInt(i.kredit),
  //   });
  // });
  // let debit_tot = debit.reduce((a, b) => (a = a + b.debit_nominal), 0);
  // let kredit_tot = debit.reduce((a, b) => (a = a + b.kredit_nominal), 0);
  // let balance = debit_tot - kredit_tot;

  // let label_tag = "";
  // let label_number = "";
  // if (debit_tot > kredit_tot) {
  //   label_tag = "Kredit Kurang ";
  //   label_number = balance;
  // } else if (debit_tot < kredit_tot) {
  //   label_tag = "Debit Kurang ";
  //   label_number = balance * -1;
  // } else {
  //   label_tag = "Balance";
  //   label_number = "";
  // }

  return (
    <Layout>
      <InfoModal
        tgl_konversi={modalShow.tgl_konversi}
        list={modalShow.list}
        show={modalShow.open}
        backdrop="static"
        keyboard={false}
        onHide={() => setModalShow({ open: false, list: "", tgl_konversi: "" })}
      />
      <Formik
        initialValues={{
          tgl_konversi: date,
          saldo_awal: list,
          total_debit: 0,
          total_kredit: 0,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../daftar-akun/daftar-akun">
                  Daftar Akun
                </Link>
                <Typography color="textPrimary">Atur Saldo Awal</Typography>
              </Breadcrumbs>

              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Saldo Awal</h2>
                </Col>
              </Row>
            </div>

            <Row>
              <Col sm="3">
                <label className="font-medium">Tanggal Konversi</label>
                <FormControl type="date" value={date} name="tgl_konversi" onChange={props.handleChange} />
              </Col>
              <Col sm="3">
                <Button variant="primary" className="mt-4" onClick={() => setModalShow({ open: true, list: list, tgl_konversi: props.values.tgl_konversi })}>
                  Import
                </Button>
              </Col>
              <Col sm="3">
                {/* <Form.Group controlId="formFileSm" className="mb-3">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
        </Form.Group> */}
              </Col>
            </Row>

            {/* <Row>
              <Col sm="12" className="flex">
                <h2 className="mr-2">{label_tag}</h2>
                <h2 className="text-blue-600">Rp. {label_number.toLocaleString({ minimumFractionDigits: 0 }, { maximumFractionDigits: 3 })}</h2>
              </Col>
            </Row> */}

            {/* <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Kode Akun</th>
                  <th>Nama Akun</th>
                  <th>Debit</th>
                  <th>Kredit</th>
                </tr>
              </thead>
              <tbody>
                {debit.map((i, index) => (
                  <tr key={index}>
                    <td className="text-sm" style={{ minWidth: 100, width: 100 }}>
                      {i.id}
                    </td>
                    <td className="text-sm" style={{ minWidth: 150, width: 150 }}>
                      {i.kode_akun}
                    </td>
                    <td className="text-sm" style={{ minWidth: 300, width: 300 }}>
                      {i.nama_akun}
                    </td>
                    <td className="text-sm" style={{ minWidth: 200, width: 200 }}>
                      Rp. {i.debit_nominal.toLocaleString({ minimumFractionDigits: 0 }, { maximumFractionDigits: 3 })}
                    </td>
                    <td className="text-sm" style={{ minWidth: 200, width: 200 }}>
                      Rp. {i.kredit_nominal.toLocaleString({ minimumFractionDigits: 0 }, { maximumFractionDigits: 3 })}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td className="text-right">Total</td>
                  <td className="text-sm">Rp. {debit_tot.toLocaleString({ minimumFractionDigits: 0 }, { maximumFractionDigits: 3 })}</td>
                  <td className="text-sm">Rp. {kredit_tot.toLocaleString({ minimumFractionDigits: 0 }, { maximumFractionDigits: 3 })}</td>
                </tr>
              </tfoot>
            </Table> */}

            <TableContainer component={Paper} className="mt-4">
              <Tables size="small" aria-label="a dense table">
                <TableHead className="bg-dark">
                  <TableRow>
                    <TableCell>
                      <Typography className="text-white font-bold" align="left">
                        Kode Akun
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold" align="left">
                        Nama Akun
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold" align="center">
                        Debit
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold" align="center">
                        Kredit
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <FieldArray name="saldo_awal">
                    {({ insert, remove, push }) => (
                      <>
                        {props.values.saldo_awal.map((i, index) => (
                          <TableRow>
                            <TableCell component="th" scope="row" align="left">
                              {props.values.saldo_awal[index].kode_akun}
                            </TableCell>
                            <TableCell align="left">{props.values.saldo_awal[index].nama_akun}</TableCell>
                            <TableCell align="center">
                              <Form.Control
                                size="sm"
                                disabled={props.values.saldo_awal[index].tipe_saldo === "Kredit"}
                                type="number"
                                min="0"
                                name={`saldo_awal.${index}.debit`}
                                onChange={(e) => {
                                  props.setFieldValue(`saldo_awal.${index}.debit`, parseInt(e.target.value));
                                  props.setFieldValue((props.values.saldo_awal[index].debit = parseInt(e.target.value)));

                                  const total_debit = props.values.saldo_awal.reduce((a, b) => (a = a + b.debit), 0);
                                  props.setFieldValue((props.values.total_debit = total_debit));
                                  props.setFieldValue("total_debit", total_debit);
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Form.Control
                                size="sm"
                                disabled={props.values.saldo_awal[index].tipe_saldo === "Debit"}
                                type="number"
                                min="0"
                                name={`saldo_awal.${index}.kredit`}
                                onChange={(e) => {
                                  props.setFieldValue(`saldo_awal.${index}.kredit`, parseInt(e.target.value));
                                  props.setFieldValue((props.values.saldo_awal[index].kredit = parseInt(e.target.value)));

                                  const total_kredit = props.values.saldo_awal.reduce((a, b) => (a = a + b.kredit), 0);
                                  props.setFieldValue((props.values.total_kredit = total_kredit));
                                  props.setFieldValue("total_kredit", total_kredit);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </FieldArray>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell />
                    <TableCell align="right">
                      <h4 className="text-black font-semibold">Total</h4>
                    </TableCell>
                    <TableCell>
                      <h4 className="text-black font-semibold">Rp. {props.values.total_debit.toLocaleString({ minimumFractionDigits: 0 })}</h4>
                    </TableCell>
                    <TableCell>
                      <h4 className="text-black font-semibold">Rp. {props.values.total_kredit.toLocaleString({ minimumFractionDigits: 0 })}</h4>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Tables>
            </TableContainer>
            {/* <div class='flex items-center justify-center mt-4'>
              <TablePagination
                onPrevChange={handlePrevChange}
                onNextChange={handleNextChange}
                onFirstPage={handleFirstPage}
                onLastPage={handleLastPage}
                onClickPage={handleClickPage}
                lastIndex={parseInt(list.length / rowsPerPage)}
                currentPage={page}
              />
            </div> */}
            <div className="d-flex justify-content-end mt-4">
              {props.values.total_debit == props.values.total_kredit ? (
                <Button variant="success" onClick={props.handleSubmit}>
                  Terbitkan
                </Button>
              ) : (
                <Button variant="success" disabled>
                  Terbitkan
                </Button>
              )}
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const akuns = await prisma.akun.findMany({
    orderBy: {
      kode_akun: "asc",
    },
    include: {
      kategori_akun: true,
    },
  });

  let list = [];
  akuns.map((i) => {
    list.push({
      id: i.id,
      kode_akun: i.kode_akun,
      nama_akun: i.nama_akun,
      debit: 0,
      kredit: 0,
      tipe_saldo: i.kategori_akun.saldo_normal_nama,
    });
  });

  return {
    props: {
      list: list,
    },
  };
}
