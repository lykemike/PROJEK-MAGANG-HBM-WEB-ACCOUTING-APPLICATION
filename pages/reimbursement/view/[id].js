import React, { useState } from "react";
import Layout from "../../../components/layout";
import Link from "next/link";
import {
  Button,
  Table,
  DropdownButton,
  InputGroup,
  FormControl,
  Dropdown,
  Row,
  Col,
  Form,
  Card,
} from "react-bootstrap";
import { Formik, Form as Forms } from "formik";
import * as Yup from "yup";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function invoice_reimbursement({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;

  function print() {
    router.push(`../print/${id}`);
  }

  let tanggal = data[0].DetailReimburse.tanggal;
  // tanggal = new Date(tanggal[0], tanggal[1] - 1, tanggal[2]);
  // tanggal.setDate(tanggal.getDate() + props.values.syarat_pembayaran);
  // let tanggal = tgltransaksi.toLocaleDateString();
  // let tgl = tanggal.split("/");

  console.log(tanggal);

  return (
    <div>
      <Layout>
        <div variant="container">
          <h4 class="mt-2 mb-5">Reimbursement #{id}</h4>

          {data.map((i) => (
            <div class="mb-10">
              <Row>
                <Col>
                  <p className="font-medium ml-2">Nama Pegawai: </p>
                  <p className="ml-2">{i.nama_pegawai}</p>
                </Col>
                <Col>
                  <p className="font-medium ml-2">Periode: </p>
                  <p className="ml-2"> {i.periode}</p>
                </Col>
                <Col></Col>
              </Row>
            </div>
          ))}

          {/* ^^^^^ notes : tanya cara get bulan dari tanggal */}

          <div class="mb-12">
            <Table class="table mt-4">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Tanggal</th>
                  <th scope="col">Tempat</th>
                  <th scope="col">Biaya</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                </tr>
              </thead>

              <tbody>
                {data[0].DetailReimburse.map((i) => (
                  <tr>
                    <td>
                      <p>{i.tanggal}</p>
                    </td>
                    <td>
                      <p>{i.tempat}</p>
                    </td>
                    <td>
                      <p>{i.biaya}</p>
                    </td>
                    <td>
                      <p>{i.keterangan}</p>
                    </td>
                    <td>
                      <p>
                        Rp.{" "}
                        {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td>Total Reimbursement</td>
                  <td>
                    Rp.{" "}
                    {data[0].DetailReimburse.reduce(
                      (a, b) => (a = a + b.jumlah),
                      0
                    ).toLocaleString({ minimumFractionDigits: 0 })}
                  </td>
                </tr>
              </tfoot>
            </Table>
            {/* <Button variant="primary ml-2"><PlaylistAddIcon fontSize="medium"/> Tambah Data</Button> */}
          </div>
          <hr />
          <div>
            {data.map((i) => (
              <Row>
                <Col sm="3">
                  <p className="font-medium ml-2 mt-4">Pemohon </p>
                  <p className="ml-2 mt-14">{i.nama_pegawai}</p>
                </Col>

                <Col sm="3">
                  <p className="font-medium ml-2 mt-4">Yang Mengetahui </p>
                  <p className="ml-2 mt-14">{i.yang_mengetahui}</p>
                </Col>
                <Col sm="3">
                  <p className="font-medium ml-2 mt-4"> Yang Menyetujui </p>
                  <p className="ml-2 mt-14">{i.yang_menyetujui}</p>
                </Col>
                <Col></Col>
              </Row>
            ))}
          </div>

          <div className="float-right mb-10">
            <Button variant="primary" type="submit" onClick={print}>
              Cetak
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerReimburse.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      DetailReimburse: true,
    },
  });

  const detail = await prisma.detailReimburse.findMany({
    where: {
      id: parseInt(id),
    },
  });

  return {
    props: {
      data: header,
      data2: detail,
    },
  };
}
