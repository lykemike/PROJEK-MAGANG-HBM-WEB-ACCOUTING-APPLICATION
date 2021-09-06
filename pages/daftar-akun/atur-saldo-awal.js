import React from "react";
import Layout from "../../components/Layout";
import { Button, Table, Row, Input, Form, Col } from "react-bootstrap";
import Link from "next/link";
import { Formik, Form as Forms, FieldArray } from "formik";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function AturSaldoAwal({ list }) {
  return (
    <Layout>
      <Formik
        initialValues={{
          tgl_transaksi: "",
          saldo_awal: list,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(URL, values)
            .then(function (response) {
              console.log(response);
              // router.push("tabel-user");
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div variant='container'>
              <h1>Saldo Awal</h1>
              <div class='mt-12'>
                <h4>Tanggal Konversi</h4>
                <input type='date' name='tgl_transaksi' class='border rounded-lg px-3 py-2 mt-1 mb-4 text-sm grid-cols-12 ' />
                <Table class='min-w-full table-auto' hover size='sm'>
                  <thead class='justify-between '>
                    <tr class='bg-dark'>
                      <th class='px-4 py-2'>
                        <span class='text-gray-300'>Kode Akun</span>
                      </th>
                      <th class='px-2 py-2'>
                        <span class='text-gray-300'>Nama Akun</span>
                      </th>
                      <th class='px-2 py-2'>
                        <span class='text-gray-300'>Debit</span>
                      </th>
                      <th class='px-2 py-2'>
                        <span class='text-gray-300'>Kredit</span>
                      </th>
                    </tr>
                  </thead>

                  <Form className='py-2'>
                    <FieldArray name='saldo_awal'>
                      {({ insert, remove, push }) => (
                        <div>
                          {console.log(props.values.saldo_awal)}
                          {props.values.saldo_awal.map((i, index) => (
                            <tbody class='bg-white divide-y divide-gray-200'>
                              <tr>
                                <td class='px-2 py-2 whitespace-nowrap'>
                                  <div class='flex items-center'>
                                    <div>
                                      <div class='text-sm font-medium text-gray-900' name='akun_id'>
                                        {props.values.saldo_awal[index].kode_akun}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td class='px-2 py-2 whitespace-nowrap'>
                                  <div class='text-sm text-gray-900'></div>
                                </td>

                                <td class='px-2 py-2 whitespace-nowrap'>
                                  <div class='text-sm text-gray-900'>
                                    <Row>
                                      <Col sm='1'>
                                        <p>Rp.</p>
                                      </Col>
                                      <Col sm='8'>
                                        <Form.Control name='debit' type='text' placeholder='' />
                                      </Col>
                                    </Row>
                                  </div>
                                </td>

                                <td class='px-2 py-2 whitespace-nowrap'>
                                  <div class='text-sm text-gray-900'>
                                    <Row>
                                      <Col sm='1'>
                                        <p>Rp.</p>
                                      </Col>
                                      <Col sm='8'>
                                        <Form.Control type='text' name='kredit' placeholder='' />
                                      </Col>
                                    </Row>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </div>
                      )}
                    </FieldArray>
                  </Form>
                </Table>

                <div class='mt-4'>
                  <Button variant='secondary'>Reset</Button>
                  <div className='float-right'>
                    <Button variant='danger mr-2'>Batal</Button>
                    <Link href='/daftar-akun/konfirmasi-saldo-awal'>
                      <Button variant='success' onClick={props.handleSubmit}>
                        Terbitkan
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const akuns = await prisma.akun.findMany({
    orderBy: [
      {
        kode_akun: "asc",
      },
    ],
  });

  let list = [];
  akuns.map((i) => {
    list.push({
      id: i.id,
      kode_akun: i.kode_akun,
      nama_akun: i.nama_akun,
      debit: 0,
      kredit: 0,
    });
  });

  return {
    props: {
      data: akuns,
      list: list,
    },
  };
}
