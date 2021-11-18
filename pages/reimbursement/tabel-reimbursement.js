import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Button, Row, Col, FormControl } from "react-bootstrap";
import Add from "@material-ui/icons/Add";
import TablePagination from "../../components/TablePagination";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Table as Tables,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@material-ui/core";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function TabelReimbursement({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState([]);
  const [reimbursement, setReimbursement] = useState(data);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearch(reimbursement.filter((i) => i.nama_pegawai.toLowerCase().includes(e.target.value.toLowerCase())));
    } else {
      setReimbursement([]);
    }
  };

  const handleList = () => {
    return search.length > 0 ? search : reimbursement;
  };

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const deleteReimbursement = "http://localhost:3000/api/reimbursement/deleteReimbursement";

  const handleDelete = async (id) => {
    Axios.delete(deleteReimbursement, {
      data: {
        reimbursementId: id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("table-reimbursement");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Reimbursement</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Reimbursement List</h2>
          </Col>
          <Col sm="4">
            <Link href="add-reimbursement">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                >
                  <Add fontSize="small" /> Buat Reimbursement Baru
                </button>
              </div>
            </Link>
          </Col>
        </Row>
      </div>

      <div>
        <Row className="mt-3">
          <Col sm="9"></Col>

          <Col sm="3" className="float-right">
            <FormControl
              placeholder="Search . . . ."
              aria-label="cari"
              aria-describedby="basic-addon1"
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
      </div>

      <div style={{ height: "30rem" }}>
        <TableContainer className="mt-8" component={Paper}>
          <Tables size="small" aria-label="a dense table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">No Reimbursement</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Periode</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Nama Pegawai</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Yang Mengetahui</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Yang Menyetujui</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Status</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold" align="right">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {handleList()
              .slice(firstIndex, lastIndex)
              .map((i) => (
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {i.id}
                    </TableCell>
                    <TableCell>{i.periode}</TableCell>
                    <TableCell>{i.nama_pegawai}</TableCell>
                    <TableCell>{i.yang_mengetahui}</TableCell>
                    <TableCell>{i.yang_menyetujui}</TableCell>
                    <TableCell>{i.status}</TableCell>
                    <TableCell align="right">
                      <Link href={`../../reimbursement/view/${i.id}`}>
                        <a>
                          <VisibilityOutlinedIcon color="primary" fontSize="small" className="mr-2" />
                        </a>
                      </Link>
                      <Link href={`../../reimbursement/${i.id}`}>
                        <a>
                          <EditOutlinedIcon color="action" fontSize="small" className="mr-2" />
                        </a>
                      </Link>
                      <DeleteOutlineIcon color="secondary" fontSize="small" onClick={() => handleDelete(i.id)} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Tables>
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
    </Layout>
  );
}

export async function getServerSideProps() {
  const reimbursement = await prisma.headerReimburse.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return {
    props: {
      data: reimbursement,
    },
  };
}
