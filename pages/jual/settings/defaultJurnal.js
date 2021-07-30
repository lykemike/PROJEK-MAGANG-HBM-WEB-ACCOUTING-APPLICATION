import React from "react";
import Layout from "../../../components/Layout";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import * as Yup from "yup";
import Axios from "axios";
import { useRouter } from "next/router";
import { Formik, Form as Forms, Field } from "formik";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function defaultJurnal({ data, data2, data3, data4, data5, data6 }) {
  return (
    <Layout>
      <Card className='bg-white rounded-lg shadow-md '>
        <Card.Body>
          <h3 className='font-semibold text-gray-600 py-2'>Setting Penjualan</h3>
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
  const akunA = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13, 14],
      },
    },
  });

  const akunB = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13],
      },
    },
  });

  const akunC = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13],
      },
    },
  });

  const akunD = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [3],
      },
    },
  });

  const akunE = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [1, 2],
      },
    },
  });

  const akunF = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [10, 13, 14, 16, 17],
      },
    },
  });

  return {
    props: {
      data: akunA,
      data2: akunB,
      data3: akunC,
      data4: akunD,
      data5: akunE,
      data6: akunF,
    },
  };
}
