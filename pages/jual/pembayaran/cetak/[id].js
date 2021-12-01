import React from "react";
import Head from "next/head";
import Layout from "../../../../components/Layout";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import Link from "next/Link";
import {
  Breadcrumbs,
  Table as Tables,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableFooter,
} from "@material-ui/core/";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function View({ data }) {
  console.log(data);

  let date_invoice = new Date(data[0].tgl_pembayaran).toDateString();
  let date_contract = new Date(data[0].header_penjualan.tgl_kontrak_expired).toDateString();
  return (
    <>
      <Head>
        <title>Penerimaan Pembayaran {data[0].header_penjualan.nama_perusahaan}</title>
      </Head>
      <div className="container">
        <div className="px-2 py-2 mt-2 border border-gray-200">
          <Row>
            <Col sm="4">
              <label className="font-medium mr-2">PT. Hexaon Business Mitrasindo</label>
              <label>Soho Podomoro City Lantai 16 Unit 1628 & 1629</label>
              <label>Jalan Letjen S. Parman Kav. 28 Grogol</label>
              <label>Jakarta Barat 11470, Indonesia</label>
              <label>Telp: +62 21 2789 3347 | Fax +62 21 2789 3348</label>
            </Col>
          </Row>
        </div>

        <div className="px-2 py-2 border border-gray-200">
          <Row>
            <Col sm="1">
              <label className="font-medium mr-2">To:</label>
            </Col>
            <Col sm="4">
              <label className="font-medium">{data[0].header_penjualan.nama_perusahaan}</label>
            </Col>
          </Row>

          <Row>
            <Col sm="1">
              <label className="mr-2">Address:</label>
            </Col>
            <Col sm="4">
              <label className="mr-2">{data[0].header_penjualan.alamat_penagihan}</label>
              <label className="mr-2">
                Telp: {data[0].header_penjualan.kontak.nomor_telepon} | Fax: {data[0].header_penjualan.kontak.nomor_fax}
              </label>
            </Col>
          </Row>
        </div>

        <Table className="border border-gray-200">
          <thead>
            <tr>
              <th className="border-r border-gray-200">Invoice Date</th>
              <th className="border-r border-gray-200">Invoice No</th>
              <th className="border-r border-gray-200">PO/Contract Date</th>
              <th>PO/Contract Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-r border-gray-200">{date_invoice}</td>
              <td className="border-r border-gray-200">{data[0].header_penjualan.custom_invoice}</td>
              <td className="border-r border-gray-200">{date_contract}</td>
              <td className="border-r border-gray-200">{data[0].header_penjualan.nomor_kontrak}</td>
            </tr>
          </tbody>
        </Table>

        <Table>
          <thead className="border-l border-r border-gray-200 text-center">
            <tr>
              <th />
              <th />
              <th />
              <th className="border-l border-r border-gray-200 text-center" colSpan="2">
                Invoice Amount
              </th>
            </tr>
            <tr>
              <th className="border-r border-gray-200" style={{ minWidth: 100, width: 100 }}>
                No.
              </th>
              <th className="border-r border-gray-200">Billing Details</th>
              <th className="border-r border-gray-200">Invoice IDR</th>
              <th className="border-r border-gray-200 text-center" style={{ minWidth: 100, width: 100 }}>
                %
              </th>
              <th className="border-r border-gray-200">IDR</th>
            </tr>
          </thead>
          <tbody className="border border-gray-200 text-center">
            <tr style={{ minHeight: 200, height: 200 }}>
              <td className="text-center">{data[0].header_penjualan.id}</td>
              <td className="text-left">{data[0].header_penjualan.DetailPenjualan[0].produk_name}</td>
              <td className="text-right">{data[0].header_penjualan.total.toLocaleString({ minimumFractionDigits: 0 })}</td>
              <td className="text-center">{data[0].presentase_penagihan}%</td>
              <td className="text-right">{data[0].tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })}</td>
            </tr>
          </tbody>

          <tr className="border border-gray-200 text-center">
            <td className="text-left text-sm" />
            <td className="text-left text-sm">Jumlah Tagihan Sebelum PPN</td>
            <td className="text-right text-sm" />
            <td className="text-center text-sm" />
            <td className="text-right text-sm">{data[0].tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })}</td>
          </tr>
          <tr className="border border-gray-200 text-center">
            <td className="text-left text-sm" />
            <td className="text-left text-sm">Pajak Pertambahan Nilai</td>
            <td className="text-right text-sm" />
            <td className="text-center text-sm">{data[0].header_penjualan.pajak_persen}%</td>
            <td className="text-right text-sm">{data[0].pajak_total.toLocaleString({ minimumFractionDigits: 0 })}</td>
          </tr>
          <tr className="border border-gray-200 text-center">
            <td className="text-left text-sm" />
            <td className="text-left text-sm">Jumlah Setelah PPN</td>
            <td className="text-right text-sm" />
            <td className="text-center text-sm" />
            <td className="text-right text-sm font-medium">
              {data[0].tagihan_setelah_pajak.toLocaleString({ minimumFractionDigits: 0 })}
            </td>
          </tr>
          <tr className="border border-gray-200 text-center">
            <td className="text-left font-medium text-sm">Say: </td>
            <td className="text-left italic text-sm">{data[0].say}</td>
            <td className="text-right text-sm" />
            <td className="text-center text-sm" />
            <td className="text-right text-sm" />
          </tr>
        </Table>

        <div className="px-2 py-2 border border-gray-200 mb-4">
          <Row style={{ minHeight: 280, height: 280 }}>
            <Col sm="7">
              <label>Please remit the total payable</label>
              <br />
              <label>amount to our account at:</label>
              <br />
              <label className="font-medium">{data[0].bank.nama_bank}</label>
              <br />
              <label className="font-medium">{data[0].bank.nomor_rekening}</label>
              <br />
              <label>{data[0].bank.cabang_bank}</label>
              <br />
              <label>for the account of:</label>
              <br />
              <label>{data[0].bank.atas_nama}</label>
            </Col>
            <Col sm="5">
              <div className="border border-gray-200 px-2">
                <label>Authorized by:</label>
                <br />
                <label>PT. HEXAON BUSINESS MITRASINDO</label>
                <div className="mt-28">
                  <label>Roeddy Kasim</label>
                </div>
              </div>
              <label>Director</label>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const detail = await prisma.penerimaanPembayaran.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      header_penjualan: {
        include: {
          kontak: true,
          DetailPenjualan: true,
        },
      },
      akun: true,
      bank: {
        include: {
          akun: true,
        },
      },
    },
  });

  return {
    props: {
      data: detail,
    },
  };
}
