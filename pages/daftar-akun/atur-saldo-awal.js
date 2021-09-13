import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Table, Row, Input, Form, Col } from "react-bootstrap";
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default function test({ list }) {
  const url = "http://localhost:3000/api/daftar-akun/createSaldoAwal";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;
  var today = new Date(),
    date = today.toISOString().slice(0, 10);

  const handlePrevChange = () => {
    if (page < 1) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };

  const handleNextChange = () => {
    if (page < parseInt(list.length / rowsPerPage)) {
      setPage(page + 1);
    } else {
      setPage(parseInt(list.length / rowsPerPage));
    }
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleClickPage = (id) => {
    setPage(id);
  };

  const handleLastPage = () => {
    setPage(parseInt(list.length / rowsPerPage));
  };
  return (
    <Layout>
      <Formik
        initialValues={{
          tgl_konversi: date,
          saldo_awal: list,
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
        }}>
        {(props) => (
          <Forms noValidate>
            <div className='border-b border-gray-200'>
              <Breadcrumbs aria-label='breadcrumb'>
                <Link color='inherit' href='../daftar-akun'>
                  Daftar Akun
                </Link>
                <Typography color='textPrimary'>Atur Saldo Awal</Typography>
              </Breadcrumbs>

              <Row>
                <Col sm='8'>
                  <h2 className='text-blue-600'>Saldo Awal</h2>
                </Col>
              </Row>
            </div>

            <div class='mt-4 mb-4'>
              <h5>Tanggal Konversi</h5>
              <TextField id='date' type='date' defaultValue={date} name='tgl_konversi' onChange={props.handleChange} />
            </div>

            <TableContainer component={Paper}>
              <Tables size='small' aria-label='a dense table'>
                <TableHead className='bg-dark'>
                  <TableRow>
                    <TableCell>
                      <Typography className='text-white font-bold' align='left'>
                        Kode Akun
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className='text-white font-bold' align='left'>
                        Nama Akun
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className='text-white font-bold' align='center'>
                        Debit
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography className='text-white font-bold' align='center'>
                        Kredit
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <FieldArray name='saldo_awal'>
                    {({ insert, remove, push }) => (
                      <>
                        {props.values.saldo_awal
                          .map((i, index) => (
                            <TableRow>
                              <TableCell component='th' scope='row' align='left'>
                                {props.values.saldo_awal[index].kode_akun}
                              </TableCell>
                              <TableCell align='left'>{props.values.saldo_awal[index].nama_akun}</TableCell>
                              <TableCell align='center'>
                                <Form.Control
                                  size='sm'
                                  disabled={props.values.saldo_awal[index].tipe_saldo === "Kredit"}
                                  type='number'
                                  min='0'
                                  name={`saldo_awal.${index}.debit`}
                                  onChange={props.handleChange}
                                />
                              </TableCell>
                              <TableCell align='center'>
                                <Form.Control
                                  size='sm'
                                  disabled={props.values.saldo_awal[index].tipe_saldo === "Debit"}
                                  type='number'
                                  min='0'
                                  name={`saldo_awal.${index}.kredit`}
                                  onChange={props.handleChange}
                                />
                              </TableCell>
                            </TableRow>
                          ))
                          .slice(firstIndex, lastIndex)}
                      </>
                    )}
                  </FieldArray>
                </TableBody>
              </Tables>
            </TableContainer>
            <div class='flex items-center justify-center mt-4'>
              <TablePagination
                onPrevChange={handlePrevChange}
                onNextChange={handleNextChange}
                onFirstPage={handleFirstPage}
                onLastPage={handleLastPage}
                onClickPage={handleClickPage}
                lastIndex={parseInt(list.length / rowsPerPage)}
                currentPage={page}
              />
            </div>
            <div className='d-flex justify-content-end mt-4'>
              <button class='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none' onClick={props.handleSubmit}>
                Terbitkan
              </button>
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
