import React, { useState } from "react";
import Head from "next/head";
import Layout from "../../../../components/Layout";
import { Row, Col, Table } from "react-bootstrap";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function invoice_reimbursement({ data }) {
  const router = useRouter();
  const { cetak } = router.query;
  return (
    <div>
      <Head>
        <title>Reimbursement</title>
      </Head>
      <div className="container">
        <h2 className="text-blue-600">Reimbursement #{cetak}</h2>
        <div class="mb-2">
          <Row>
            <Col sm="4">
              <label className="font-medium mr-2">Periode: </label>
              <label> {data.periode.nama}</label>
            </Col>
            <Col />
            <Col />
          </Row>
        </div>

        <div class="mb-4">
          <Table className="border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200">No.</th>
                <th className="border border-gray-200">Tanggal</th>
                <th className="border border-gray-200">Tempat</th>
                <th className="border border-gray-200">Biaya</th>
                <th className="border border-gray-200">Keterangan</th>
                <th className="border border-gray-200">Jumlah</th>
              </tr>
            </thead>
            {data.DetailReimburse.map((i, index) => (
              <tbody>
                <tr>
                  <td className="border border-gray-200" style={{ minWidth: 60, width: 60 }}>
                    {index + 1}
                  </td>
                  <td className="border border-gray-200" style={{ minWidth: 150, width: 150 }}>
                    {i.tanggal}
                  </td>
                  <td className="border border-gray-200" style={{ minWidth: 300, width: 300 }}>
                    {i.tempat}
                  </td>
                  <td className="border border-gray-200" style={{ minWidth: 150, width: 150 }}>
                    {i.biaya}
                  </td>
                  <td className="border border-gray-200" style={{ minWidth: 250, width: 250 }}>
                    {i.keterangan}
                  </td>
                  <td className="border border-gray-200" style={{ minWidth: 150, width: 150 }}>
                    Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}
                  </td>
                </tr>
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td />
                <td />
                <td />
                <td />
                <td>
                  <label className="d-flex justify-content-end font-medium">Total</label>
                </td>
                <td>Rp. {data.total.toLocaleString({ minimumFractionDigits: 0 })}</td>
              </tr>
            </tfoot>
          </Table>
        </div>

        <div className="border-t border-gray-200 mt-4">
          <Table className="border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200">Pemohon</th>
                <th className="border border-gray-200">Mengetahui</th>
                <th className="border border-gray-200">Menyetujui</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200" style={{ minHeight: 100, height: 100 }} />
                <td className="border border-gray-200" style={{ minHeight: 100, height: 100 }} />
                <td className="border border-gray-200" style={{ minHeight: 100, height: 100 }} />
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="border border-gray-200" style={{ minWidth: 300, width: 300 }}>
                  {data.nama_pegawai}
                </td>
                <td className="border border-gray-200" style={{ minWidth: 300, width: 300 }}>
                  {data.yang_mengetahui}
                </td>
                <td className="border border-gray-200" style={{ minWidth: 300, width: 300 }}>
                  {data.yang_menyetujui}
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { cetak } = context.query;

  const header = await prisma.headerReimburse.findFirst({
    where: {
      id: parseInt(cetak),
    },
    include: {
      DetailReimburse: true,
      periode: true,
    },
  });

  return {
    props: {
      data: header,
    },
  };
}
