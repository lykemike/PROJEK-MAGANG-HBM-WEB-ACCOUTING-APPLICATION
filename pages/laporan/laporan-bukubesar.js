import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout";
import TableDetailBBRow from "../../components/BukuBesar/TableDetailBBRow";
import TabelBukuBesar from "../../components/Laporan/TabelBukuBesar";
import Link from "next/link";
import TablePagination from "../../components/TablePagination";
import { Button, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { Breadcrumbs, Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import Axios from "../../utils/axios";
import { Formik, Form as Forms, Field } from "formik";
import moment from "moment";
export default function LaporanBukuBesar() {
  const [bukuBesar, setBukuBesar] = useState([]);
  const [total_debit, setTotalDebit] = useState(0);
  const [total_kredit, setTotalKredit] = useState(0);

  const startOfMonth = moment().clone().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");

  const onClick = () => {
    Axios.get("/laporan/bukuBesar").then((response) => {
      console.log(response);
      setBukuBesar(response?.data?.data || []);
      setTotalDebit(response.data.debit);
      setTotalKredit(response.data.kredit);
    });
  };

  useEffect(() => {
    Axios.post("/laporan/bukuBesar", {
      data: {
        tgl_awal: startOfMonth,
        tgl_akhir: endOfMonth,
      },
    })
      .then(function (response) {
        setBukuBesar(response?.data?.data || []);
        setTotalDebit(response.data.debit);
        setTotalKredit(response.data.kredit);
        console.log(response);
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
              <h4 class="mb-6 mt-2">Buku Besar</h4>
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
                <Table size="small" aria-label="collapsible table">
                  <TableHead className="bg-dark">
                    <TableRow>
                      <TableCell />
                      <TableCell>
                        <Typography className="text-white">Nama Akun / Tanggal</Typography>
                      </TableCell>
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />

                      {/* <TableCell>
                  <Typography className="text-white">Transaksi</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white">Nomor</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white">Debit</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white">Kredit</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white">Saldo</Typography>
                </TableCell> */}
                    </TableRow>
                  </TableHead>
                  {bukuBesar?.map((data, index) => (
                    <TabelBukuBesar key={index} data={data} label={data.label} />
                  ))}
                  <TableFooter>
                    <TableRow>
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
                        <Typography className="text-black font-bold">Rp. {total_kredit.toLocaleString({ minimumFractionDigits: 0 })}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
