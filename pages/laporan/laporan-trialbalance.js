import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout";

import TableTrialBalance from "../../components/Laporan/TabelTrialBalance";
import Link from "next/link";
import TablePagination from "../../components/TablePagination";
import { Button, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { Breadcrumbs, Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography, TableBody } from "@material-ui/core";
import Axios from "../../utils/axios";
import { Formik, Form as Forms, Field } from "formik";
import moment from "moment";
import { data } from "autoprefixer";

export default function LaporanTrialBalance() {
  const [trialBalance, setTrialBalance] = useState([]);
  const [total_debit, setTotalDebit] = useState(0);
  const [total_kredit, setTotalKredit] = useState(0);

  const startOfMonth = moment().clone().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");

  // const onClick = () => {
  //   Axios.get("/laporan/bukuBesar").then((response) => {
  //     console.log(response);
  //     setBukuBesar(response?.data?.data || []);
  //     setTotalDebit(response.data.debit);
  //     setTotalKredit(response.data.kredit);
  //   });
  // };

  useEffect(() => {
    Axios.post("/laporan/trialBalance", {
      data: {
        tgl_awal: startOfMonth,
        tgl_akhir: endOfMonth,
      },
    })
      .then(function (response) {
        setTrialBalance(response?.data?.data || []);
        setTotalDebit(response.data.debit);
        setTotalKredit(response.data.kredit);
        // console.log(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Formik
        initialValues={{
          tgl_awal: startOfMonth,
          tgl_akhir: endOfMonth,
        }}
        onSubmit={async (values) => {
          Axios.post("/laporan/bukuBesar", values)
            .then(function (response) {
              setBukuBesar(response?.data?.data || []);
              setTotalDebit(response.data.debit);
              setTotalKredit(response.data.kredit);
            })
            .catch(function (error) {
              // setState({ open: true, toast_message: error.response.data.message });
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div variant="container">
              <h4 class="mb-6 mt-2">Trial Balance</h4>
              <div class="mb-10">
                <Row>
                  <Col sm="3">
                    <Form.Label>Tanggal Mulai</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl type="date" aria-label="date" value={props.values.tgl_awal} onChange={props.handleChange} />
                    </InputGroup>
                  </Col>
                  <Col sm="3">
                    <Form.Label>Tanggal Selesai</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl type="date" aria-label="date" name="tgl_akhir" value={props.values.tgl_akhir} onChange={props.handleChange} />
                    </InputGroup>
                  </Col>

                  <Col>
                    <Button variant="primary mr-2 mt-7" onClick={props.handleSubmit}>
                      Filter
                    </Button>
                  </Col>
                </Row>
              </div>

              <TableContainer component={Paper}>
                <Table aria-label="spanning table" size="small">
                  <TableHead className="bg-blue-400">
                    <TableRow>
                      <TableCell />
                      <TableCell align="center" colSpan={2} className="border-l border-gray-200 text-white">
                        Saldo Awal
                      </TableCell>
                      <TableCell align="center" colSpan={2} className="border-l border-gray-200 text-white">
                        Penyesuian
                      </TableCell>
                      <TableCell align="center" colSpan={2} className="border-l border-gray-200 text-white">
                        Saldo Akhir
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="text-white">
                        Daftar Akun
                      </TableCell>
                      <TableCell align="center" className="border-l border-gray-200 text-white">
                        Debit
                      </TableCell>
                      <TableCell align="center" className="border-l border-gray-200 text-white">
                        Kredit
                      </TableCell>
                      <TableCell align="center" className="border-l border-gray-200 text-white">
                        Debit
                      </TableCell>
                      <TableCell align="center" className="border-l border-gray-200 text-white">
                        Kredit
                      </TableCell>
                      <TableCell align="center" className="border-l border-gray-200 text-white">
                        Debit
                      </TableCell>
                      <TableCell align="center" className="border-l border-gray-200 text-white">
                        Kredit
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {trialBalance?.map((data, index) => (
                    <TableTrialBalance key={index} data={data.data} label={data.label} />
                  ))}
                </Table>
              </TableContainer>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
