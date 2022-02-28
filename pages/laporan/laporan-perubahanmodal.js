import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout";
import TabelLabaRugi from "../../components/Laporan/TabelLabaRugi";
import Link from "next/link";
import TablePagination from "../../components/TablePagination";
import { Button, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown, Modal } from "react-bootstrap";
import { Breadcrumbs, TableBody, Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import Axios from "../../utils/axios";
import { Formik, Form as Forms, Field } from "formik";
import moment from "moment";

function CreateModal(props) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState, toast_message: "" });
  };

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };

  const api_create_kategori = "http://localhost:3000/api/produk/createKategori";
  return (
    <Formik
      initialValues={{
        nama: "",
        jumlah: 0,
      }}
      onSubmit={async (values) => {
        Axios.post(api_create_kategori, values)
          .then(function (response) {
            setState({ open: true, toast_message: response.data.message });
            setTimeout(() => {
              router.reload(window.location.pathname);
            }, 2000);
          })
          .catch(function (error) {
            console.log(error);
            // setState({ open: true, toast_message: error.response.data.message });
          });
      }}
    >
      {(formikProps) => (
        <Forms noValidate>
          <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Pemegang Saham</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>Nama </Col>
                <Col>Akun Modal</Col>
                <Col>Akun Prive</Col>
                <Col>Persentase</Col>
              </Row>
              <Row>
                <Col sm="3">
                  <Form.Control placeholder="" type="text" name="nama_pemegangsaham" />
                </Col>

                <Col sm="3">
                  <Form.Control
                    as="select"
                    name="akun_modal"
                    // onChange={props.handleChange}
                    // onBLur={props.handleBlur}
                  >
                    {/* {data.map((akun_modal) => (
                      <option key={akun_modal.id} value={akun_modal.id}>
                        {akun_modal.nama_akun}
                      </option>
                    ))} */}
                  </Form.Control>
                </Col>
                <Col sm="3">
                  <Form.Control placeholder="" type="text" name="akun_prive" />
                </Col>
                <Col sm="3">
                  <Form.Control placeholder="-" type="text" name="persentase" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button variant="success" onClick={formikProps.handleSubmit}>
                Ubah
              </Button>
            </Modal.Footer>
          </Modal>
        </Forms>
      )}
    </Formik>
  );
}

export default function LaporanPerubahanModal() {
  const [modalCreate, setModalCreate] = useState(false);
  const [labaBerjalan, setLabaBerjalan] = useState(0);
  const [dividen, setDividen] = useState(0);
  const [laba, setLaba] = useState(0);
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
          Axios.post("/laporan/perubahanModal", values)
            .then(function (response) {})
            .catch(function (error) {
              // setState({ open: true, toast_message: error.response.data.message });
              setLabaBerjalan(response?.data?.grand_total[0].pendapatan_bersih_sesudah_pajak);
              setDividen(response?.data?.grand_total[0].dividen);
              setLaba(response?.data?.grand_total[0].laba);
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <CreateModal backdrop="static" keyboard={false} show={modalCreate} onHide={() => setModalCreate(false)} />
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

                <Button variant="primary" onClick={() => setModalCreate(true)}>
                  Ubah Presentase
                </Button>

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
                      <TableRow>
                        <TableCell>Pemegang Saham 1</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                      <TableRow>
                        <TableCell>Pemegang Saham 2</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
                      <TableRow>
                        <TableCell>Pemegang Saham 3</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                      </TableRow>
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
