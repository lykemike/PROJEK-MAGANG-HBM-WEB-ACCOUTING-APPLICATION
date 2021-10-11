import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Button, DropdownButton, Dropdown, Row, Col } from "react-bootstrap";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TablePagination from "../../components/TablePagination";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function jurnalentry({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const firstIndex = page * rowsPerPage;
  const lastIndex = page * rowsPerPage + rowsPerPage;

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

  console.log(data);

  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Kas & Bank</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Akun Kas</h2>
          </Col>
          <Col sm="4">
            <div className="d-flex justify-content-end">
              <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Buat Transaksi">
                <Dropdown.Item>
                  <Link href="/kasbank/transferuang">
                    <a>Transfer Uang</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href="/kasbank/terimauang">
                    <a>Terima Uang</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href="/kasbank/kirimuang">
                    <a>Kirim Uang</a>
                  </Link>
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </div>

      <div className="mt-8" style={{ height: "30rem" }}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead className="bg-dark">
              <TableRow>
                <TableCell>
                  <Typography className="text-white font-bold">Kode Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Nama Akun</Typography>
                </TableCell>
                <TableCell>
                  <Typography className="text-white font-bold">Saldo Akun</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(firstIndex, lastIndex).map((i, index) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    <label className="font-semibold">{i.kode_akun}</label>
                  </TableCell>
                  <TableCell>
                    <Link key={index} href={`/kasbank/${i.id}`}>
                      <a>{i.nama_akun}</a>
                    </Link>
                  </TableCell>
                  <TableCell>
                    Rp.{" "}
                    {i.DetailSaldoAwal[0] >= 0
                      ? i.DetailSaldoAwal[0].debit.toLocaleString({ minimumFractionDigits: 0 })
                      : "0, 00"}
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
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get Akuns from API
  const kasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
    include: {
      DetailSaldoAwal: true,
    },
  });

  return {
    props: {
      data: kasBank,
    },
  };
}
