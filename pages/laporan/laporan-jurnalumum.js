import React, { useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";

import Layout from "../../components/layout";
import TabelJurnalUmum from "../../components/Laporan/TabelJurnalUmum";

import { Button, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  TableFooter,
  TableBody,
} from "@material-ui/core";

import { flatten } from "lodash";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporanjurnalumum({
  jurnal,
  penjualan,
  pembelian,
  kirim_uang,
  transfer_uang,
  terima_uang,
  debit,
  kredit,
}) {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const onClick = () => {
    // Axios.get()
  };

  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="../laporan/menulaporan">
            Laporan
          </Link>
          <Typography color="textPrimary">Jurnal Umum</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Jurnal Umum</h2>
          </Col>
        </Row>
      </div>

      <div class="mt-4 mb-4">
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
            <Button variant="primary mr-2 mt-7" className="mt-1" onClick={onClick}>
              Filter
            </Button>
          </Col>

          <div class="flex flex-row-reverse mt-1">
            <Col>
              <Form.Label />
              <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Export">
                <Dropdown.Item>
                  <Link href="#">
                    <a>PDF</a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
                <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
              </DropdownButton>
            </Col>
          </div>
        </Row>
      </div>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography className="text-dark">Tanggal Transaksi</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXXXXXXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXXXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXX</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {jurnal.map((data, index) => (
            <TabelJurnalUmum key={index} data={data} index={index} tipe="jurnal" view="view2" label="Journal Entry" />
          ))}
          {penjualan.map((data, index) => (
            <TabelJurnalUmum key={index} data={data} index={index} view="view2" />
          ))}
          {pembelian.map((data, index) => (
            <TabelJurnalUmum tipe="pembelian" label="Purchase Invoice" key={index} data={data} index={index} view="view2" />
          ))}
          {kirim_uang.map((data, index) => (
            <TabelJurnalUmum tipe="kirimUang" label="Kirim Uang Invoice" key={index} data={data} index={index} view="view2" />
          ))}
          {transfer_uang.map((data, index) => (
            <TabelJurnalUmum
              tipe="transferUang"
              label="Transfer Uang Invoice"
              key={index}
              data={data}
              index={index}
              view="view2"
            />
          ))}
          {terima_uang.map((data, index) => (
            <TabelJurnalUmum tipe="terimaUang" label="Terima Uang Invoice" key={index} data={data} index={index} view="view2" />
          ))}
          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell align="right">
                <Typography className="text-black font-bold">Grand Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className="text-black font-bold">Rp. {debit.toLocaleString({ minimumFractionDigits: 0 })}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className="text-black font-bold">
                  Rp. {kredit.toLocaleString({ minimumFractionDigits: 0 })}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export async function getServerSideProps() {
  const getJurnal = await prisma.headerJurnal.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      DetailJurnal: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getPenjualan = await prisma.headerPenjualan.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalPenjualan: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getPembelian = await prisma.headerPembelian.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalPembelian: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getKirimUang = await prisma.headerKirimUang.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalKirimUang: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getTransferUang = await prisma.transferUang.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalTransferUang: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getTerimaUang = await prisma.headerTerimaUang.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalTerimaUang: {
        include: {
          akun: true,
        },
      },
    },
  });

  //Journal Entry
  const total_journal_debit = flatten(
    getJurnal.map((i) => {
      return i.DetailJurnal.filter((j) => j.tipe_saldo === "Debit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  const total_journal_kredit = flatten(
    getJurnal.map((i) => {
      return i.DetailJurnal.filter((j) => j.tipe_saldo === "Kredit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  //Sales Invoice
  const total_penjualan_debit = flatten(
    getPenjualan.map((i) => {
      return i.JurnalPenjualan.filter((j) => j.tipe_saldo === "Debit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  const total_penjualan_kredit = flatten(
    getPenjualan.map((i) => {
      return i.JurnalPenjualan.filter((j) => j.tipe_saldo === "Kredit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  //Purchase Invoice
  const total_pembelian_debit = flatten(
    getPembelian.map((i) => {
      return i.JurnalPembelian.filter((j) => j.tipe_saldo === "Debit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  const total_pembelian_kredit = flatten(
    getPembelian.map((i) => {
      return i.JurnalPembelian.filter((j) => j.tipe_saldo === "Kredit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  //Kirim Uang Invoice
  const total_kirimuang_debit = flatten(
    getKirimUang.map((i) => {
      return i.JurnalKirimUang.filter((j) => j.tipe_saldo === "Debit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  const total_kirimuang_kredit = flatten(
    getKirimUang.map((i) => {
      return i.JurnalKirimUang.filter((j) => j.tipe_saldo === "Kredit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  //Terima Uang Invoice
  const total_terimauang_debit = flatten(
    getTerimaUang.map((i) => {
      return i.JurnalTerimaUang.filter((j) => j.tipe_saldo === "Debit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  const total_terimauang_kredit = flatten(
    getTerimaUang.map((i) => {
      return i.JurnalTerimaUang.filter((j) => j.tipe_saldo === "Kredit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  //Transfer Uang Invoice
  const total_transferuang_debit = flatten(
    getTransferUang.map((i) => {
      return i.JurnalTransferUang.filter((j) => j.tipe_saldo === "Debit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  const total_transferuang_kredit = flatten(
    getTransferUang.map((i) => {
      return i.JurnalTransferUang.filter((j) => j.tipe_saldo === "Kredit");
    })
  ).reduce((a, b) => a + b.nominal, 0);

  const grandtotaldebit =
    total_kirimuang_debit +
    total_pembelian_debit +
    total_penjualan_debit +
    total_terimauang_debit +
    total_transferuang_debit +
    total_journal_debit;

  const grandtotalkredit =
    total_kirimuang_kredit +
    total_pembelian_kredit +
    total_penjualan_kredit +
    total_terimauang_kredit +
    total_transferuang_kredit +
    total_journal_kredit;

  return {
    props: {
      jurnal: getJurnal,
      penjualan: getPenjualan,
      pembelian: getPembelian,
      kirim_uang: getKirimUang,
      transfer_uang: getTransferUang,
      terima_uang: getTerimaUang,
      // header7: getBiaya,
      debit: grandtotaldebit,
      kredit: grandtotalkredit,
    },
  };
}
