import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col, Container, FormControl, Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import { PrismaClient } from "@prisma/client";
import { Formik, Form as Forms } from "formik";
const prisma = new PrismaClient();

export default function penjualan({ data }) {
  return (
    <Layout>
      <Formik>
        {(props) => (
          <Forms noValidate>
            <Container>
              <Row>
                <Col sm={8}>
                  Transaksi
                  <h3>Penjualan</h3>
                </Col>
                <Col sm={4}>
                  <div class=''>
                    <Link href='/jual/penagihan-penjualan'>
                      <a>
                        <button
                          type='button'
                          class='focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg'>
                          <AddIcon fontSize='small' /> Buat Penjualan Baru
                        </button>
                      </a>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
            <div className='border-t border-gray-200'>
              <Form>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Form.Label column sm='4'>
                    Penjualan Belum Dibayar(dalam IDR)
                    <br />
                    Rp.0,00
                  </Form.Label>
                  <Form.Label column sm='4'>
                    Penjualan Jatuh Tempo(dalam IDR)
                    <br />
                    Rp.0,00
                  </Form.Label>
                </Form.Group>
              </Form>
            </div>
            <div className='border-t border-gray-200'>
              <Row sm='12' className='mt-2 mb-2'>
                <Col sm='8'>
                  <h3>Transaksi Penjualan</h3>
                </Col>
                <Col sm='3'>
                  <FormControl type='text' placeholder='Search' />
                </Col>
                <Col sm='1'>
                  <Button>Setting</Button>
                </Col>
              </Row>
            </div>
            <table class='min-w-full table-auto'>
              <thead class='justify-between'>
                <tr class='bg-dark'>
                  <th class='px-2'>
                    <Form.Check type='checkbox' />
                  </th>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Tanggal</span>
                  </th>
                  <th class='px-8 py-2'>
                    <span class='text-gray-300'>Nomor</span>
                  </th>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Pelanggan</span>
                  </th>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Tgl Jatuh Tempo</span>
                  </th>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Tag</span>
                  </th>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Status</span>
                  </th>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Sisa Tagihan(dalam IDR)</span>
                  </th>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Total (dalam IDR)</span>
                  </th>
                </tr>
              </thead>
              <tbody class='bg-white divide-y divide-gray-200'>
                {data.map((i) => (
                  <tr key={i.id}>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <Form.Check type='checkbox' />
                    </td>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <div class='text-lg text-gray-900'>
                        <Link key={i.id} href={`/jual/view/${i.id}`}>
                          {i.tgl_transaksi}
                        </Link>
                      </div>
                    </td>
                    <td class='px-8 py-2 whitespace-nowrap font-large'>
                      <Link href='jual/sales-invoice'>
                        <div class='text-lg text-gray-900'>{i.id}</div>
                      </Link>
                    </td>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <div class='text-lg text-gray-900'>{i.kontak.nama_panggilan}</div>
                    </td>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <div class='text-lg text-gray-900'>{i.tgl_jatuh_tempo}</div>
                    </td>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <div class='text-lg text-gray-900'>{i.tag}</div>
                    </td>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <span class='bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs'>{i.sisa_tagihan == 0 ? "Selasai" : "Aktif"}</span>
                      {/* <div class='text-lg text-gray-900'>{i.sisa_tagihan == 0 ? "Selasai" : "Aktif"}</div> */}
                    </td>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <div class='text-lg text-gray-900'>Rp.{i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</div>
                    </td>
                    <td class='px-2 py-2 whitespace-nowrap font-large'>
                      <div class='text-lg text-gray-900'>Rp.{i.total.toLocaleString({ minimumFractionDigits: 0 })}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
export async function getServerSideProps() {
  // Get kontak,produk,pajak from API
  const penjualans = await prisma.headerPenjualan.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
    include: {
      kontak: true,
      akun1: true,
      akun2: true,
    },
  });

  return {
    props: {
      data: penjualans,
    },
  };
}
