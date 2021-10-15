import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import {
  Tabs,
  Tab,
  Card,
  Button,
  DropdownButton,
  Dropdown,
  Table,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import Tables from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import AddIcon from "@material-ui/icons/Add";
import { PrismaClient } from "@prisma/client";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
const prisma = new PrismaClient();
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";

export default function listaset({ data }) {
  const deleteAset = "http://localhost:3000/api/aset/deleteAset";

  const handleDelete = async (id) => {
    Axios.delete(deleteAset, {
      data: {
        asetid: id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("add-aset");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Layout>
        <div class="text-md font-medium text-gray-900 mb-2">
          <div className="border-b border-gray-200">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary">Aset</Typography>
            </Breadcrumbs>
            <Row>
              <Col sm="8">
                <h2 className="text-blue-600">Aset List</h2>
              </Col>
              <Col sm="4" />
            </Row>
          </div>

          <Row>
            <Col></Col>

            <Col>
              <h4 class="mt-2 mb-3 float-right">
                <Link href="/aset/add-aset">
                  <Button variant="primary mr-2">
                    <AddIcon fontSize="small" />
                    Simpan Aset
                  </Button>
                </Link>
              </h4>
            </Col>
          </Row>
        </div>

        <div variant="container">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="listAsetTetap" title="List Aset Tetap" />
            <Tab eventKey="transaksiAsetTetap" title="Transaksi Aset Tetap" />

            <div eventKey="listAsetTetap">
              <div class="mt-6">
                <div class="float-right mb-6">
                  <Form.Control placeholder="Search" />
                </div>

                <TableContainer className="mt-8" component={Paper}>
                  <Tables size="small" aria-label="a dense table">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Tanggal Akuisisi
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Nomor
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Nama Aset
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Biaya Akuisisi
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Tag
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Masa Manfaat
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Nilai/Tahun
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            className="text-white font-bold"
                            align="right"
                          >
                            Actions
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {data.map((i, index) => (
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {i.tgl_akuisisi}
                          </TableCell>
                          <TableCell>{i.nomor_aset}</TableCell>
                          <TableCell>{i.nama_aset}</TableCell>
                          <TableCell>{i.biaya_akuisisi}</TableCell>
                          <TableCell>{i.tag}</TableCell>
                          <TableCell>{i.masa_manfaat}</TableCell>
                          <TableCell>{i.masa_manfaat}</TableCell>
                          <TableCell align="right">
                            <EditOutlinedIcon
                              color="action"
                              fontSize="small"
                              className="mr-2"
                            />
                            <DeleteOutlineIcon
                              color="secondary"
                              fontSize="small"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Tables>
                </TableContainer>
              </div>
            </div>

            <div eventKey="transaksiAsetTetap">
              <div class="mt-6">
                <div class="float-right mb-6">
                  <Form.Control placeholder="Search" />
                </div>
                <TableContainer className="mt-8" component={Paper}>
                  <Tables size="small" aria-label="a dense table">
                    <TableHead className="bg-dark">
                      <TableRow>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Tanggal
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Tindakan
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Transaksi
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Nomor
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Nomor Akun
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Nama Akun
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Debit
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className="text-white font-bold">
                            Kredit
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {data.map((i, index) => (
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {i.tgl_akuisisi}
                          </TableCell>
                          <TableCell>{i.nomor_aset}</TableCell>
                          <TableCell>{i.nama_aset}</TableCell>
                          <TableCell>{i.biaya_akuisisi}</TableCell>
                          <TableCell>{i.tag}</TableCell>
                          <TableCell>{i.masa_manfaat}</TableCell>
                          <TableCell>{i.masa_manfaat}</TableCell>
                          <TableCell align="right">
                            <EditOutlinedIcon
                              color="action"
                              fontSize="small"
                              className="mr-2"
                            />
                            <DeleteOutlineIcon
                              color="secondary"
                              fontSize="small"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Tables>
                </TableContainer>
              </div>
            </div>
          </Tabs>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  // Get Produk from API
  const asets = await prisma.aset.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return {
    props: {
      data: asets,
    },
  };
}
