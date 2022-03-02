import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout";
import TabelLabaRugi from "../../components/Laporan/TabelLabaRugi";
import Link from "next/link";
import TablePagination from "../../components/TablePagination";
import { Button, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown, Modal } from "react-bootstrap";
import { Breadcrumbs, TableBody, Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import Axios from "../../utils/axios";
import { Formik, Form as Forms, Field, FieldArray } from "formik";
import moment from "moment";

export default function LaporanPerubahanModal() {
  const [modalUpdate, setModalUpdate] = useState({ open: false, data: [] });
  const [labaBerjalan, setLabaBerjalan] = useState(0);
  const [dividen, setDividen] = useState(0);
  const [laba, setLaba] = useState(0);
  const [saham, setSaham] = useState([]);
  const startOfMonth = moment().clone().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");

  useEffect(() => {
    Axios.post("/laporan/perubahanModal", {
      data: {
        tgl_awal: startOfMonth,
        tgl_akhir: endOfMonth,
      },
    })
      .then(function (response) {
        setLabaBerjalan(response?.data?.grand_total[0].pendapatan_bersih_sesudah_pajak);
        setDividen(response?.data?.grand_total[0].dividen);
        setLaba(response?.data?.grand_total[0].laba);
        setSaham(response?.data?.transform_modal);
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
          Axios.post("/laporan/perubahanModal", values)
            .then(function (response) {
              setLabaBerjalan(response?.data?.grand_total[0].pendapatan_bersih_sesudah_pajak);
              setDividen(response?.data?.grand_total[0].dividen);
              setLaba(response?.data?.grand_total[0].laba);
              setSaham(response?.data?.transform_modal);
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
              <h4 className="mb-6 mt-2">Perubahan Modal</h4>
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

                <Link href="/laporan/perubahan-modal-ubah">
                  <Button variant="primary">Ubah Presentase</Button>
                </Link>

                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ minWidth: 250, width: 250 }}>Laba Tahun Berjalan</TableCell>
                        <TableCell align="left">{"Rp. " + labaBerjalan}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ minWidth: 250, width: 250 }}>Dividen</TableCell>
                        <TableCell align="left">{"Rp. " + dividen}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ minWidth: 250, width: 250 }}>Laba</TableCell>
                        <TableCell align="left">{"Rp. " + laba}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell />
                        <TableCell>Modal Awal</TableCell>
                        <TableCell>Setoran Modal</TableCell>
                        <TableCell>Laba Bersih</TableCell>
                        <TableCell>Prive</TableCell>
                        <TableCell>Modal Akhir</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {saham?.map((i) => (
                        <TableRow>
                          <TableCell>{i.pemegang_saham}</TableCell>
                          <TableCell>
                            {i.modal_awal.toLocaleString({
                              minimumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell>
                            {i.setoran_modal.toLocaleString({
                              minimumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell>
                            {i.laba_bersih.toLocaleString({
                              minimumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell>{i.prive}</TableCell>
                          <TableCell>
                            {i.modal_akhir.toLocaleString({
                              minimumFractionDigits: 0,
                            })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
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
