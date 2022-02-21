import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout";
import TabelArusKas from "../../components/Laporan/TabelArusKas";
import Link from "next/link";
import TablePagination from "../../components/TablePagination";
import { Button, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { Breadcrumbs, Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import Axios from "../../utils/axios";
import { Formik, Form as Forms, Field } from "formik";
import moment from "moment";

export default function LaporanArusKas() {
  const [arusKas, setArusKas] = useState([]);

  const startOfMonth = moment().clone().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");

  useEffect(() => {
    Axios.post("/laporan/aruskas", {
      data: {
        tgl_awal: startOfMonth,
        tgl_akhir: endOfMonth,
      },
    })
      .then(function (response) {
        setArusKas(response?.data?.data || []);
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
          Axios.post("/laporan/arusKas", values)
            .then(function (response) {})
            .catch(function (error) {
              // setState({ open: true, toast_message: error.response.data.message });
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div variant="container">
              <h4 className="mb-6 mt-2">Laba Rugi</h4>
              <div className="mb-10">
                <Row>
                  <Col sm="3">
                    <Form.Label>Tanggal Mulai</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl type="date" aria-label="date" name="tgl_awal" value={props.values.tgl_awal} onChange={props.handleChange} />
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

                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                    </TableHead>

                    <TabelArusKas />
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
