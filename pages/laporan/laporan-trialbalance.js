import React, { useRef } from "react";
import Layout from "../../components/layout";
import TableDetailTBRow from "../../components/TrialBalance/TableDetailTBRow";

import Link from "next/link";
import {
  Button,
  Table,
  DropdownButton,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporantrialbalance({ header, header2, header3 }) {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const onClick = () => {
    // Axios.get()
  };
  console.log(header);

  return (
    <Layout>
      <div variant="container">
        <div></div>
        <h4 class="mb-6 mt-2">Trial Balance</h4>
        <div class="mb-10">
          <Row>
            <Col sm="3">
              <Form.Label>Tanggal Mulai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Pick date"
                  type="date"
                  aria-label="date"
                  ref={tgl_mulai}
                />
              </InputGroup>
            </Col>
            <Col sm="3">
              <Form.Label>Tanggal Selesai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Pick date"
                  type="date"
                  aria-label="date"
                  ref={tgl_akhir}
                />
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
            <DropdownButton
              variant="primary ml-2"
              id="dropdown-basic-button"
              title="Export"
            >
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
            <TableDetailTBRow label="Aset" data={header} />
            <TableDetailTBRow label="Kewajiban" data={header2} />
            <TableDetailTBRow label="Ekuitas" data={header3} />
          </tbody>
          <tfoot>
            <tr>
              <td class="px-2 py-1" align="right">
                Grand Total
              </td>
              {/* <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
              <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td> */}
            </tr>
          </tfoot>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const aset = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [3, 1, 2, 4, 5, 6, 7, 15],
      },
    },
    include: {
      DetailSaldoAwal: true,

      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const kewajiban = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [8, 10, 11],
      },
    },
    include: {
      DetailSaldoAwal: true,

      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const ekuitas = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [12, 13, 14, 16, 17],
      },
    },
    include: {
      DetailSaldoAwal: true,

      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  // //Journal Entry
  // const journal_debit = flatten(
  //   getJurnal.map((i) => {
  //     return i.DetailJurnal.filter((j) => j.tipe_saldo === "Debit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // const journal_kredit = flatten(
  //   getJurnal.map((i) => {
  //     return i.DetailJurnal.filter((j) => j.tipe_saldo === "Kredit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // //Sales Invoice
  // const penjualan_debit = flatten(
  //   getPenjualan.map((i) => {
  //     return i.JurnalPenjualan.filter((j) => j.tipe_saldo === "Debit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // const penjualan_kredit = flatten(
  //   getPenjualan.map((i) => {
  //     return i.JurnalPenjualan.filter((j) => j.tipe_saldo === "Kredit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // //Purchase Invoice
  // const pembelian_debit = flatten(
  //   getPembelian.map((i) => {
  //     return i.JurnalPembelian.filter((j) => j.tipe_saldo === "Debit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // const pembelian_kredit = flatten(
  //   getPembelian.map((i) => {
  //     return i.JurnalPembelian.filter((j) => j.tipe_saldo === "Kredit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // //Kirim Uang Invoice
  // const kirimuang_debit = flatten(
  //   getKirimUang.map((i) => {
  //     return i.JurnalKirimUang.filter((j) => j.tipe_saldo === "Debit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // const kirimuang_kredit = flatten(
  //   getKirimUang.map((i) => {
  //     return i.JurnalKirimUang.filter((j) => j.tipe_saldo === "Kredit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // //Terima Uang Invoice
  // const terimauang_debit = flatten(
  //   getTerimaUang.map((i) => {
  //     return i.JurnalTerimaUang.filter((j) => j.tipe_saldo === "Debit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // const terimauang_kredit = flatten(
  //   getTerimaUang.map((i) => {
  //     return i.JurnalTerimaUang.filter((j) => j.tipe_saldo === "Kredit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // //Transfer Uang Invoice
  // const transferuang_debit = flatten(
  //   getTransferUang.map((i) => {
  //     return i.JurnalTransferUang.filter((j) => j.tipe_saldo === "Debit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // const transferuang_kredit = flatten(
  //   getTransferUang.map((i) => {
  //     return i.JurnalTransferUang.filter((j) => j.tipe_saldo === "Kredit");
  //   })
  // ).reduce((a, b) => a + b.nominal, 0);

  // const totaldebit =
  //   kirimuang_debit +
  //   pembelian_debit +
  //   penjualan_debit +
  //   terimauang_debit +
  //   transferuang_debit +
  //   journal_debit;

  // const totalkredit =
  //   kirimuang_kredit +
  //   pembelian_kredit +
  //   penjualan_kredit +
  //   terimauang_kredit +
  //   transferuang_kredit +
  //   journal_kredit;

  // const getPembelian = await prisma.headerPembelian.findMany({
  //   orderBy: {
  //     id: "asc",
  //   },
  //   include: {
  //     JurnalPembelian: true,
  //   },
  // });

  return {
    props: {
      header: aset,
      header2: kewajiban,
      header3: ekuitas,
      // debit: grandtotaldebit,
      // kredit: grandtotalkredit,
    },
  };
}
