import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, FormControl, Button, Modal } from "react-bootstrap";
import SidebarSetting from "../../components/SidebarSetting";
import TablePagination from "../../components/TablePagination";
import Divider from "@material-ui/core/Divider";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";
import { Breadcrumbs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@material-ui/core/";
import Select from "react-select";
import { Edit, Delete } from "@material-ui/icons/";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import AddIcon from "@material-ui/icons/Add";
function CreateModal(props) {
  const url = "http://localhost:3000/api/setting/createDetilBank";
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        akun_id: "",
        nama_bank: "",
        cabang_bank: "",
        nomor_rekening: "",
        atas_nama: "",
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
        <Forms noValidate>
          <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Create Bank Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Nama Akun Bank</label>
                </Col>
                <Col>
                  <Select
                    options={props.akun}
                    name="akun_bank"
                    onChange={(e) => {
                      formikProps.setFieldValue(`akun_id`, e.value);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Nama Bank</label>
                </Col>
                <Col>
                  <Form.Control placeholder="-" type="text" name="nama_bank" onChange={formikProps.handleChange} />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Cabang Bank</label>
                </Col>
                <Col>
                  <Form.Control placeholder="-" as="textarea" style={{ height: "100px" }} name="cabang_bank" onChange={formikProps.handleChange} />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Nomor Rekening</label>
                </Col>
                <Col>
                  <Form.Control placeholder="-" type="text" name="nomor_rekening" onChange={formikProps.handleChange} />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Atas Nama</label>
                </Col>
                <Col>
                  <Form.Control placeholder="-" type="text" name="atas_nama" onChange={formikProps.handleChange} />
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

function EditModal(props) {
  const url = "http://localhost:3000/api/setting/createDetilBank";
  const router = useRouter();

  console.log(props.data2.akun_id);
  return (
    <Formik
      initialValues={{
        akun_id: props.current_akun_id,
        nama_bank: props.data2_nama_bank,
        cabang_bank: props.data2_cabang_bank,
        nomor_rekening: props.data2_nomor_rekening,
        atas_nama: props.data2_atas_nama,
      }}
      onSubmit={async (values) => {
        console.log(values);
        // Axios.post(url, values)
        //   .then(function (response) {
        //     console.log(response);
        //     router.reload(window.location.pathname);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      }}
    >
      {(formikProps) => (
        <Forms noValidate>
          <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Update Bank Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Nama Akun Bank</label>
                </Col>
                <Col>
                  <Select
                    options={props.akun}
                    name="akun_bank"
                    defaultValue={{ value: props.current_akun_id, label: props.current_akun_nama }}
                    onChange={(e) => {
                      formikProps.setFieldValue(`akun_id`, e.value);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Nama Bank</label>
                </Col>
                <Col>
                  <Form.Control value={formikProps.values.nama_bank} type="text" name="nama_bank" onChange={formikProps.handleChange} />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Cabang Bank</label>
                </Col>
                <Col>
                  <Form.Control value={formikProps.values.cabang_bank} as="textarea" style={{ height: "100px" }} name="cabang_bank" onChange={formikProps.handleChange} />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Nomor Rekening</label>
                </Col>
                <Col>
                  <Form.Control value={formikProps.values.nomor_rekening} type="text" name="nomor_rekening" onChange={formikProps.handleChange} />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm="3">
                  <label className="font-medium">Atas Nama</label>
                </Col>
                <Col>
                  <Form.Control value={formikProps.values.atas_nama} type="text" name="atas_nama" onChange={formikProps.handleChange} />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button variant="warning" onClick={formikProps.handleSubmit}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </Forms>
      )}
    </Formik>
  );
}

function DeleteModal(props) {
  const url = "http://localhost:3000/api/setting/createDetilBank";
  const router = useRouter();

  const handle_delete = async () => {
    Axios.delete(url, {
      data: {
        header_penjualan_id: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.reload(window.location.pathname);
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
        <label>
          If there is a current transaction in progress, you cannot delete<label className="font-medium ml-1 mr-1">{props.nama}</label>
          bank details.
        </label>
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
export default function DetailBank({ data, data2 }) {
  const [modalCreate, setModalCreate] = useState({ open: false, akun: [] });
  const [modalEdit, setModalEdit] = useState({
    open: false,
    id: 0,
    akun: [],
    current_akun_id: 0,
    current_akun_nama: "",
    data2: data2,
  });
  const [modalDelete, setModalDelete] = useState({ open: false, id: 0, nama: "" });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handlePrevChange = () => {
    if (page < 1) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };
  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

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
      <CreateModal backdrop="static" keyboard={false} show={modalCreate.open} akun={modalCreate.akun} onHide={() => setModalCreate({ open: false, akun: [] })} />
      <EditModal
        backdrop="static"
        keyboard={false}
        show={modalEdit.open}
        id={modalEdit.id}
        akun={modalEdit.akun}
        current_akun_id={modalEdit.current_akun_id}
        current_akun_nama={modalEdit.current_akun_nama}
        data2={modalEdit.data2}
        onHide={() =>
          setModalEdit({
            open: false,
            id: 0,
            akun: [],
            current_akun_id: 0,
            current_akun_nama: "",
            data2: data2,
          })
        }
      />
      <DeleteModal backdrop="static" keyboard={false} show={modalDelete.open} id={modalDelete.id} nama={modalDelete.nama} onHide={() => setModalDelete({ open: false, id: 0, nama: "" })} />
      <Row>
        <Col sm="2">
          <SidebarSetting />
        </Col>
        <Col>
          <Button variant="primary" onClick={() => setModalCreate({ open: true, akun: data })}>
            <AddIcon fontSize="small" />
            Tambah
          </Button>
          <div style={{ height: "30rem" }} className="mt-4">
            <TableContainer component={Paper}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow className="bg-dark">
                    <TableCell>
                      <Typography className="text-white font-bold">Nama Bank</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold">Cabang Bank</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold">Nomor Rekening</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold">Atas Nama</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className="text-white font-bold">Kode Akun</Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data2.slice(firstIndex, lastIndex).map((i, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ minWidth: 250, width: 250 }}>{i.nama_bank}</TableCell>
                      <TableCell style={{ minWidth: 300, width: 300 }}>{i.cabang_bank}</TableCell>
                      <TableCell style={{ minWidth: 250, width: 250 }}>{i.nomor_rekening}</TableCell>
                      <TableCell style={{ minWidth: 200, width: 200 }}>{i.atas_nama}</TableCell>
                      <TableCell style={{ minWidth: 150, width: 150 }}>{i.akun.kode_akun}</TableCell>
                      <TableCell align="right" style={{ minWidth: 150, width: 150 }}>
                        <Button
                          variant="warning"
                          size="sm"
                          className="mr-2"
                          onClick={() =>
                            setModalEdit({
                              open: true,
                              id: i.id,
                              akun: data,
                              current_akun_id: i.akun.id,
                              current_akun_nama: i.akun.kode_akun + " - " + i.akun.nama_akun,
                              data2: data2,
                            })
                          }
                        >
                          <Edit className="text-white" fontSize="small" />
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            setModalDelete({
                              open: true,
                              id: i.id,
                              nama: i.akun.kode_akun + " - " + i.akun.nama_akun,
                            })
                          }
                        >
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
        </Col>
      </Row>
    </Layout>
  );
}

export async function getServerSideProps() {
  const get_akun_kas_bank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun = [];
  get_akun_kas_bank.map((i) => {
    akun.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
      label2: i.nama_akun,
    });
  });

  const get_detail_bank = await prisma.detailBank.findMany({
    include: {
      akun: true,
    },
  });

  return {
    props: {
      data: akun,
      data2: get_detail_bank,
    },
  };
}
