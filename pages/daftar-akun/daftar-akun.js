import React, { useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import TablePagination from "../../components/TablePagination";
import { Button, DropdownButton, Dropdown, Row, Col, Pagination } from "react-bootstrap";
import Add from "@material-ui/icons/Add";
import Axios from "axios";
import { useRouter } from "next/router";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Tables from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function DaftarAkun({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

  const url1 = "http://localhost:3000/api/user/deletedaftarakun";
  const router = useRouter();
  const deletedata = (id) => {
    Axios.delete(url1, {
      data: {
        deleteid: id,
      },
    })
      .then(function (response) {
        console.log(response);
        alert(id);
        router.push("list");
      })
      .catch(function (error) {
        console.log(error);
        alert(id);
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
          <Typography color="textPrimary">Daftar Akun</Typography>
        </Breadcrumbs>

        <Row>
          <Col>
            <h2 className="text-blue-600">Daftar Akun</h2>
          </Col>
          <div className="d-flex justify-content-end">
            <Col>
              <Row>
                <DropdownButton variant="primary mr-2" id="dropdown-basic-button" title="Tindakan">
                  <Dropdown.Item>
                    <Link href="/daftar-akun/atur-saldo-awal">
                      <a>Atur Saldo Awal</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/daftar-akun/tutup-buku">Penutupan Buku</Link>
                  </Dropdown.Item>
                </DropdownButton>
                <Link href="/daftar-akun/buat-akun-baru">
                  <Button variant="primary">
                    <Add fontSize="small" />
                    Buat akun baru
                  </Button>
                </Link>
              </Row>
            </Col>
          </div>
        </Row>
      </div>

      <div style={{ height: "30rem" }}>
        <TableContainer className="mt-8" component={Paper}>
          <Tables size="small" aria-label="a dense table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">Kode Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Nama Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Kategori Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Saldo</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold" align="right">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(firstIndex, lastIndex).map((i) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <label className="font-semibold">{i.kode_akun}</label>
                  </TableCell>
                  <TableCell>{i.nama_akun}</TableCell>
                  <TableCell>{i.kategori_akun.name}</TableCell>
                  <TableCell>
                    Rp. 0,00
                    {/* {i.DetailSaldoAwal[0].debit > 0
                      ? i.DetailSaldoAwal[0].debit.toLocaleString({ minimumFractionDigits: 0 })
                      : i.DetailSaldoAwal[0].kredit.toLocaleString({ minimumFractionDigits: 0 })} */}
                  </TableCell>
                  <TableCell align="right">
                    <EditOutlinedIcon color="action" fontSize="small" className="mr-2" />
                    <DeleteOutlineIcon color="secondary" fontSize="small" />
                    {/* <Button variant='warning mr-2'>Edit</Button>
                  <Button
                    variant='danger'
                    onClick={() => {
                      deletedata(i.id);
                    }}>
                    Delete
                  </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Tables>
        </TableContainer>
      </div>
      <div class="flex items-center justify-center mt-4 ">
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
  const akuns = await prisma.akun.findMany({
    orderBy: [
      {
        kode_akun: "asc",
      },
    ],
    include: {
      kategori_akun: true,
      DetailSaldoAwal: true,
    },
  });

  return {
    props: {
      data: akuns,
    },
  };
}
