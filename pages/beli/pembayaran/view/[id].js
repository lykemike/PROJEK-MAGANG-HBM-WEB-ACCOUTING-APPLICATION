import React from "react";
import Layout from "../../../../components/Layout";
import { Row, Col, Form, Button, FormCheck } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function BayarNanti({ data2 }) {
  console.log(data2);
  return (
    <Layout>
      <div>
        <div className="py-2 border-b border-gray-200">
          <h4>Transaksi</h4>
          <h4>Pengiriman Pembayaran</h4>
        </div>

        <div className="py-2 border-b border-gray-200">
          <Row>
            <Col sm="4">
              <label className="font-medium mr-2">Supplier:</label>
              <label>{data2.header_pembelian.kontak.nama_perusahaan}</label>
            </Col>
            <Col sm="4">
              <label className="font-medium mr-2">Setor Ke:</label>
              <label>
                {data2.akun.kode_akun} - {data2.nama_akun_bayar_dari}
              </label>
            </Col>
            <Col sm="2"></Col>
            <Col sm="2">
              <label className="font-medium mr-2">Total:</label>
              <h3>
                Rp.{" "}
                {data2.jumlah.toLocaleString({
                  minimumFractionDigits: 0,
                })}
              </h3>
            </Col>
          </Row>
        </div>
        <div className="py-2 border-b border-gray-200">
          <Row>
            <Col sm="4">
              <label className="font-medium mr-2">Cara Pembayaran:</label>
              <label>{data2.cara_pembayaran_nama}</label>
            </Col>
            <Col sm="4">
              <label className="font-medium mr-2">Tgl Pembayaran:</label>
              <label>{data2.tgl_pembayaran}</label>
            </Col>
            <Col sm="4">
              <label className="font-medium mr-2">No Transaksi:</label>
              <label>Purchase Invoice #{data2.id}</label>
            </Col>
          </Row>
        </div>
        <div className="py-2 border-b border-gray-200">
          <Row>
            <Col sm="2">
              <label className="font-medium mr-2">Number</label>
            </Col>
            <Col sm="2">
              <label className="font-medium mr-2">Deskripsi</label>
            </Col>
            <Col sm="2">
              <label className="font-medium mr-2">Tgl Jatuh Tempo</label>
            </Col>
            <Col sm="2">
              <label className="font-medium mr-2">Total</label>
            </Col>
            <Col sm="2">
              <label className="font-medium mr-2">Sisa Tagihan</label>
            </Col>
            <Col sm="2">
              <label className="font-medium mr-2">Jumlah</label>
            </Col>
          </Row>
        </div>
        <div className="py-2 border-b border-gray-200">
          <Row>
            <Col sm="2">
              <label>Purchase Invoice #{data2.header_pembelian.no_transaksi}</label>
            </Col>
            <Col sm="2">
              <label>{data2.header_pembelian.memo}</label>
            </Col>
            <Col sm="2">
              <label>{data2.header_pembelian.tgl_jatuh_tempo}</label>
            </Col>
            <Col sm="2">
              <label>{data2.header_pembelian.total}</label>
            </Col>
            <Col sm="2">
              <label>{data2.header_pembelian.sisa_tagihan}</label>
            </Col>
            <Col sm="2">
              <label>{data2.jumlah}</label>
            </Col>
          </Row>
        </div>

        {/* <Form className="py-2">
          <Form.Group as={Row} controlId="formPlaintext">
            <Col sm="4">
              <label for="memo">Memo</label>
              <br />
              <textarea rows="3" name="memo" class="px-16 py-2 border border-gray-800  " onChange={props.handleChange}></textarea> <br />
              File Attachment <br />
              <Form.File type="file" name="fileattachment" onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
            </Col>
            <Col sm="4" />
            <Col sm="4"></Col>
          </Form.Group>
        </Form> */}
        <Row sm="12" className="mt-3">
          <Col sm="3" />

          <Col sm="3" />

          <Col sm="3"></Col>

          <Col sm="3">
            <h5 name="total">Total: Rp. {parseInt(data2.jumlah).toLocaleString({ minimumFractionDigits: 0 })}</h5>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const detail = await prisma.pengirimanBayaran.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      header_pembelian: {
        include: {
          kontak: true,
        },
      },
      akun: true,
    },
  });

  return {
    props: {
      data2: detail,
    },
  };
}
