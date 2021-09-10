import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Button, Row, Col, FormControl } from "react-bootstrap";
import Add from "@material-ui/icons/Add";
import TablePagination from "../../components/TablePagination";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import Tables from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

export default function list({}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  // // User API
  // const deleteUser = 'http://localhost:3000/api/user/deleteUser'

  // // Redirect Function
  // const router = useRouter();

  // // Delete Exisiting User based on [id]
  // const handleDelete = async (id) => {
  //     Axios.delete(deleteUser, {
  //         data: {
  //             userid: id
  //         }
  //     }).then(function (response) {
  //         console.log(response);
  //         router.push('tabel-user');
  //     }).
  //         catch(function (error) {
  //             console.log(error)
  //         })
  // };

  const handlePrevChange = () => {
    if (page < 1) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };

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
      <div className='border-b border-gray-200'>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography color='textPrimary'>Reimbursement</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm='8'>
            <h2 className='text-blue-600'>Reimbursement List</h2>
          </Col>
          <Col sm='4'>
            <Link href='add-reimbursement'>
              <div className='d-flex justify-content-end'>
                <button type='button' className='focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg'>
                  <Add fontSize='small' /> Buat Reimbursement Baru
                </button>
              </div>
            </Link>
          </Col>
        </Row>
      </div>

      <div>
        <Row className='mt-3'>
          <Col sm='9'></Col>

          <Col sm='3' className='float-right'>
            <FormControl placeholder='Search . . . .' aria-label='cari' aria-describedby='basic-addon1' onChange={(e) => handleChange(e)} />
          </Col>
        </Row>
      </div>

      <TableContainer className='mt-8' component={Paper}>
        <Tables size='small' aria-label='a dense table'>
          <TableHead className='bg-dark'>
            <TableRow>
              <TableCell>
                <Typography className='text-white font-bold'>No Reimbursement</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Nama Pegawai</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Yang Mengetahui</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Yang Menyetujui</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold'>Status</Typography>
              </TableCell>
              <TableCell>
                <Typography className='text-white font-bold' align='right'>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align='right'>
                <EditOutlinedIcon color='action' fontSize='small' className='mr-2' />
                <DeleteOutlineIcon color='secondary' fontSize='small' />
              </TableCell>
            </TableRow>
          </TableBody>
        </Tables>
      </TableContainer>
    </Layout>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
