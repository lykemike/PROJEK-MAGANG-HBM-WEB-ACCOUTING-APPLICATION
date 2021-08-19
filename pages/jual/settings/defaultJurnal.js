import React from "react";
import Layout from "../../../components/Layout";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import Axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form as Forms, Field } from "formik";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function defaultJurnal({ data, data2, data3, data4, data5, data6, data7 }) {
  return (
    <Layout>
      <Card className='bg-white rounded-lg shadow-md '>
        <Card.Body>
          <h3 className='font-semibold text-gray-600 py-2'>Setting Penjualan</h3>
          <div className='border-t border-gray-200'>
            <h5>CURRENT SETTING</h5>
            {data7.map((i) => (
              <p>{i.akun.nama_akun}</p>
            ))}
          </div>
          <div className='border-t border-gray-200'>
            <Row sm='12' className='mt-3'>
              <Col sm='6'>
                <Row>
                  <Col sm='6'>
                    <label className='font-semibold text-gray-600 py-2'>Pendapatan Penjualan</label>
                  </Col>
                  <Col>
                    <Form.Control as='select'>
                      {data.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>

                <Row>
                  <Col sm='6'>
                    <label className='font-semibold text-gray-600 py-2'>Diskon Penjualan</label>
                  </Col>
                  <Col>
                    <Form.Control as='select'>
                      {data2.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>

                <Row>
                  <Col sm='6'>
                    <label className='font-semibold text-gray-600 py-2'>Pemotongan</label>
                  </Col>
                  <Col>
                    <Form.Control as='select'>
                      {data3.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Col>

              <Col sm='6'>
                <Row>
                  <Col sm='6'>
                    <label className='font-semibold text-gray-600 py-2'>Pembayaran di Muka</label>
                  </Col>
                  <Col>
                    <Form.Control as='select'>
                      {data4.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>

                <Row>
                  <Col sm='6'>
                    <label className='font-semibold text-gray-600 py-2'>Piutang Belum Ditagih</label>
                  </Col>
                  <Col>
                    <Form.Control as='select'>
                      {data5.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>

                <Row>
                  <Col sm='6'>
                    <label className='font-semibold text-gray-600 py-2'>Pajak Penjualan</label>
                  </Col>
                  <Col>
                    <Form.Control as='select'>
                      {data6.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nama_akun}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className='left-0 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3 mt-3'>
            <Button variant='success'>Save</Button>
          </div>
        </Card.Body>
      </Card>
    </Layout>
  );
}

export async function getServerSideProps() {
  const pendapatan_penjualan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13, 14],
      },
    },
  });

  const diskon_penjualan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13],
      },
    },
  });

  const pemotongan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13],
      },
    },
  });

  const pembayaran_dimuka = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [3],
      },
    },
  });

  const piutang_blm_ditagih = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [1, 2],
      },
    },
  });

  const pajak_penjualan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [10, 13, 14, 16, 17],
      },
    },
  });

  const curr_setting = await prisma.settingDefault.findMany({
    where: {
      id: {
        in: [1, 2, 3, 4, 5, 6],
      },
    },
    include: {
      akun: true,
    },
  });

  return {
    props: {
      data: pendapatan_penjualan,
      data2: diskon_penjualan,
      data3: pemotongan,
      data4: pembayaran_dimuka,
      data5: piutang_blm_ditagih,
      data6: pajak_penjualan,
      data7: curr_setting,
    },
  };
}
