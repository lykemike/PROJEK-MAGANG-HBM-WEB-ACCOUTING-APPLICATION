import React, { useRef, useState } from "react";
import Layout from "../../components/layout";
import TableDetailBBRow from "../../components/BukuBesar/TableDetailBBRow";
import Link from "next/link";
import TablePagination from "../../components/TablePagination";
import { Button, Table, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Axios from "../../utils/axios";
export default function laporanbukubesar({ header }) {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const [buku_besar, setBukuBesar] = useState([]);
  const onClick = () => {
    Axios.get("/laporan/bukuBesar").then((response) => {
      setBukuBesar(response.data?.data);
    });
  };

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
    if (page < parseInt(header.length / rowsPerPage)) {
      setPage(page + 1);
    } else {
      setPage(parseInt(header.length / rowsPerPage));
    }
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleClickPage = (id) => {
    setPage(id);
  };

  const handleLastPage = () => {
    setPage(parseInt(header.length / rowsPerPage));
  };

  console.log(header);
  return (
    <Layout>
      <div variant="container">
        <div></div>
        <h4 class="mb-6 mt-2">Buku Besar</h4>
        <div class="mb-10">
          <Row>
            <Col sm="3">
              <Form.Label>Tanggal Mulai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder="Pick date" type="date" aria-label="date" ref={tgl_mulai} />
              </InputGroup>
            </Col>
            <Col sm="3">
              <Form.Label>Tanggal Selesai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder="Pick date" type="date" aria-label="date" ref={tgl_akhir} />
              </InputGroup>
            </Col>

            <Col>
              <Button variant="primary mr-2 mt-7" onClick={onClick}>
                {" "}
                Filter
              </Button>
            </Col>
          </Row>

          <div class="flex flex-row-reverse">
            <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Export">
              <Dropdown.Item>
                <Link href="#">
                  <a>PDF</a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
              <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <table class="min-w-full table-auto">
          <thead class="justify-between">
            <tr class="bg-dark">
              <th class="px-2 py-2" colSpan="3">
                <span class="text-gray-300">Data</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {header.slice(firstIndex, lastIndex).map((data, index) => {
              return <TableDetailBBRow key={index} data={data} index={index} />;
            })}
            {/* {header2.map((data, index) => {
              return <TableDetailPenjualanRow key={index} data={data} index={index} />;
            })}
            {header3.map((data, index) => {
              return <TableDetailPenjualanRow tipe='pembelian' label='Purchase Invoice' key={index} data={data} index={index} />;
            })} */}
          </tbody>
          <tfoot>
            {/* <tr>
              <td class='px-2 py-1' align='right'>
                Grand Total
              </td>
              <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
              <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
            </tr> */}
          </tfoot>
        </table>
        <div class="float-right mt-2">
          <TablePagination
            onPrevChange={handlePrevChange}
            onNextChange={handleNextChange}
            onFirstPage={handleFirstPage}
            onLastPage={handleLastPage}
            onClickPage={handleClickPage}
            lastIndex={parseInt(header.length / rowsPerPage)}
            currentPage={page}
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const header = await prisma.akun.findMany({
    orderBy: {
      kategoriId: "asc",
    },
    include: {
      // JurnalPenjualan: {
      //   include: {
      //     header_penjualan: true,
      //   },
      // },
      // DetailJurnal: {
      //   include: {
      //     header_jurnal: true
      //   }
      // },
      JurnalKirimUang: {
        include: {
          header_kirim_uang: true,
        },
      },
      JurnalTerimaUang: {
        include: {
          header_terima_uang: true,
        },
      },
      JurnalTransferUang: {
        include: {
          transfer_uang: true,
        },
      },
    },
  });

  return {
    props: {
      header: header,
      // header2: getPenjualan,
      // header3: getPembelian,
    },
  };
}
