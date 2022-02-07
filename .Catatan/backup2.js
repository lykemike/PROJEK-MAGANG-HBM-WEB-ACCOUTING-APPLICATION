import { Breadcrumbs, Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import TabelJurnalUmum from "../../components/Laporan/TabelJurnalUmum";
import Layout from "../../components/layout";
import Axios from "../../utils/axios";
import { Formik, Form as Forms, Field } from "formik";
import moment from "moment";

export default function laporanjurnalumum() {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const [jurnal, setJurnal] = useState([]);
  const [total_debit, setTotalDebit] = useState(0);
  const [total_credit, setTotalcredit] = useState(0);

  const startOfMonth = moment().clone().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");

  useEffect(() => {
    Axios.post("/laporan/jurnalumum", {
      data: {
        tgl_awal: startOfMonth,
        tgl_akhir: endOfMonth,
      },
    })
      .then(function (response) {
        setJurnal(response?.data?.data || []);
        setTotalDebit(response.data.debit);
        setTotalcredit(response.data.credit);
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
          Axios.post("/laporan/jurnalumum", values)
            .then(function (response) {
              setJurnal(response?.data?.data || []);
              setTotalDebit(response.data.debit);
              setTotalcredit(response.data.credit);
            })
            .catch(function (error) {
              // setState({ open: true, toast_message: error.response.data.message });
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="../laporan/menulaporan">
                  Laporan
                </Link>
                <Typography color="textPrimary">Jurnal Umum</Typography>
              </Breadcrumbs>

              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Jurnal Umum</h2>
                </Col>
              </Row>
            </div>

            <div class="mt-4 mb-4">
              <Row>
                <Col sm="3">
                  <Form.Label>date Mulai</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl placeholder="Pick date" type="date" name="tgl_awal" value={props.values.tgl_awal} onChange={props.handleChange} />
                  </InputGroup>
                </Col>
                <Col sm="3">
                  <Form.Label>date Selesai</Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl placeholder="Pick date" type="date" name="tgl_akhir" value={props.values.tgl_akhir} onChange={props.handleChange} />
                  </InputGroup>
                </Col>

                <Col>
                  <Button variant="primary mr-2 mt-7" className="mt-1" onClick={props.handleSubmit}>
                    Filter
                  </Button>
                </Col>

                <div class="flex flex-row-reverse mt-1">
                  <Col>
                    <Form.Label />
                    <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Export">
                      <Dropdown.Item>
                        <Link href="#">
                          <a>PDF</a>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
                    </DropdownButton>
                  </Col>
                </div>
              </Row>
            </div>

            <TableContainer component={Paper}>
              <Table size="small" aria-label="collapsible table">
                <TableHead className="bg-dark">
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      <Typography className="text-dark">date Transaksi</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-dark">XXXXXXXXXXXXXXX</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-dark">XXXXXXXX</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-dark">XXX</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-dark">XXXXXX</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-dark">XXXXXXXXXXXX</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-dark">XXXXX</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-dark">XXXXXXX</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {jurnal?.map((data, index) => (
                  <TabelJurnalUmum key={index} data={data.data} label={data.label} />
                ))}
                <TableFooter>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell align="right">
                      <Typography className="text-black font-bold">Grand Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography className="text-black font-bold">Rp. {total_debit.toLocaleString({ minimumFractionDigits: 0 })}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography className="text-black font-bold">Rp. {total_credit.toLocaleString({ minimumFractionDigits: 0 })}</Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

ledger?.map((data) => {
  if (data.normal_balance == "Debit") {
    if (data.debit > 0) {
      // if normal balance is Debit & Debit is more than 0
      transform2.push({
        heading: data.heading,
        date: data.date,
        debit: data.debit,
        credit: data.credit,
        transaction_source: data.transaction_source,
        begining_balance: data.begining_balance,
        begining_balance_date: data.begining_balance_date,
        normal_balance: data.begining_balance_date,
        reference_no: data.reference_no,
        balance: data.begining_balance + data.debit,
      });
    } else {
      // if normal balance is Debit & Debit is less than 0
      transform2.push({
        heading: data.heading,
        date: data.date,
        debit: data.debit,
        credit: data.credit,
        transaction_source: data.transaction_source,
        begining_balance: data.begining_balance,
        begining_balance_date: data.begining_balance_date,
        normal_balance: data.begining_balance_date,
        reference_no: data.reference_no,
        balance: data.begining_balance - data.credit,
      });
    }
  } else if (data.normal_balance == "credit") {
    if (data.credit > 0) {
      // if normal balance is Kredit & Kredit is more than 0
      transform2.push({
        heading: data.heading,
        date: data.date,
        debit: data.debit,
        credit: data.credit,
        transaction_source: data.transaction_source,
        begining_balance: data.begining_balance,
        begining_balance_date: data.begining_balance_date,
        normal_balance: data.begining_balance_date,
        reference_no: data.reference_no,
        balance: data.begining_balance + data.credit,
      });
    } else {
      transform2.push({
        // if normal balance is Kredit & Kredit is less than 0
        heading: data.heading,
        date: data.date,
        debit: data.debit,
        credit: data.credit,
        transaction_source: data.transaction_source,
        begining_balance: data.begining_balance,
        begining_balance_date: data.begining_balance_date,
        normal_balance: data.begining_balance_date,
        reference_no: data.reference_no,
        balance: data.begining_balance - data.debit,
      });
    }
  }
});
