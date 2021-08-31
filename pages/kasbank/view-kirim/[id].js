import React from "react";
import Layout from "../../../components/layout";
import { Button, Table, Row, Col, Form } from "react-bootstrap";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import PrintIcon from "@material-ui/icons/Print";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function bank_transfer({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div variant='container'>
        <div class='text-md font-medium text-gray-900 mb-2'>Transaksi</div>
        <h4 class='mt-2 mb-5'>Kirim Uang #{id}</h4>

        <div class='mb-10'>
          {data.map((i) => (
            <Row>
              <Col>
                <Form.Label className='font-medium'> Bayar dari: </Form.Label>
                <p> {i.akun_bayar.nama_akun} </p>
              </Col>
              <Col></Col>
              <Col>
                <h3>Total Amount</h3>
                <h2 class='text-purple-700 text-opacity-100 '>Rp, {i.total}</h2>
              </Col>
            </Row>
          ))}
        </div>

        <div class='mb-10'>
          {data.map((i) => (
            <Row>
              <Col>
                <Form.Label className='font-medium'> Penerima: </Form.Label>
                <p> {i.akun_penerima.nama_akun} </p>
              </Col>

              <Col>
                <Form.Label className='font-medium'> Tanggal Transaksi: </Form.Label>
                <p> {i.tgl_transaksi} </p>
              </Col>

              <Col>
                <Form.Label className='font-medium'> Nomor Transaksi: </Form.Label>
                <p> {i.no_transaksi} </p>
              </Col>

              <Col>
                <Form.Label className='font-medium'> Tag: </Form.Label>
                <p> {i.tag} </p>
              </Col>
            </Row>
          ))}
        </div>

        <div class='mb-12'>
          <Table class='table mt-4'>
            <thead class='thead-light'>
              <tr>
                <th scope='col'>Akun</th>
                <th scope='col'>Deskripsi</th>
                <th scope='col'>Pajak</th>
                <th scope='col'>Jumlah</th>
              </tr>
            </thead>
            {data2.map((i) => (
              <tbody>
                <tr>
                  <td>{i.akun.nama_akun}</td>
                  <td>{i.deskripsi} </td>
                  <td>{i.pajak.nama} </td>
                  <td>{i.jumlah} </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>

        <div class='mt-20'>
          <Row sm='12'>
            <Col sm='4' />

            <Col sm='4' />

            <Col sm='2'>
              <h6>Subtotal</h6>
            </Col>

            {data.map((i) => (
              <Col sm='2'>
                <h6>Rp. {i.subtotal}</h6>
              </Col>
            ))}
          </Row>
        </div>

        <div class='mt-4'>
          <Row sm='12'>
            <Col sm='4' />

            <Col sm='4' />

            <Col sm='2'>
              <h6> Pajak</h6>
            </Col>

            {data.map((i) => (
              <Col sm='2'>
                <h6>Rp. {i.hasil_pajak}</h6>
              </Col>
            ))}
          </Row>
        </div>

        <div class='mt-5 mb-10'>
          <Row sm='12'>
            <Col sm='4' />

            <Col sm='4' />

            <Col sm='2'>
              <h6>Total</h6>
            </Col>

            {data.map((i) => (
              <Col sm='2'>
                <h6>Rp. {i.total}</h6>
              </Col>
            ))}
          </Row>
        </div>

        <Button variant='secondary mr-2'>
          <ArrowBackIosIcon fontSize='medium' />
          Kembali
        </Button>
        <Button variant='primary'>
          <PrintIcon fontSize='medium' /> Cetak
        </Button>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerKirimUang.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun_bayar: true,
      akun_penerima: true,
    },
  });

  const detail = await prisma.detailKirimUang.findMany({
    where: {
      header_kirim_uang_id: parseInt(id),
    },
    include: {
      header_kirim_uang: true,
      akun: true,
      pajak: true,
    },
  });

  return {
    props: {
      data: header,
      data2: detail,
    },
  };
}
