import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import TransaksiJurnal from "../../components/KasBank/TransaksiJurnal";
import BankStatement from "../../components/KasBank/BankStatement";
import { Tabs, Tab, Card, Button, DropdownButton, Dropdown, Table, Row, Col, FormControl } from "react-bootstrap";

import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CachedIcon from "@material-ui/icons/Cached";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Tables from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Formik, Field, Form } from "formik";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function akundetail({ data, data2, data3 }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(data);

  return (
    <div>
      <Layout>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link color='inherit' href='../jual/penjualan'>
            Kas & Bank
          </Link>
          <Typography color='textPrimary'>Akun - Cash & Bank</Typography>
        </Breadcrumbs>
        <div className='border-b border-gray-200'>
          <Row>
            <Col sm='8'>
              {data.map((i) => (
                <h2>
                  ({i.kode_akun}) - {i.nama_akun}
                </h2>
              ))}
            </Col>
            <Col sm='4'>
              <div className='d-flex justify-content-end'>
                <DropdownButton variant='primary ml-2' id='dropdown-basic-button' title='Tindakan'>
                  <Dropdown.Item>
                    <Link href='/kasbank/rekeningkoran'>
                      <a>Import Bank Statement</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href='/kasbank/cashlink'>
                      <a>Cashlink</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href='/kasbank/laporanrekonsilasi'>
                      <a>Laporan Rekonsilasi</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href='/kasbank/mutasirek'>
                      <a>Mutasi Rekening</a>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>Ubah Akun </Dropdown.Item>
                </DropdownButton>
              </div>
            </Col>
          </Row>
        </div>
        <Formik
          initialValues={{
            toggle: false,
            checked: [],
          }}
          onSubmit={async (values) => {
            await sleep(500);
            alert(JSON.stringify(values, null, 2));
          }}>
          {({ values }) => (
            <Form>
              <div variant='container' className='mt-4'>
                <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example'>
                  <Tab eventKey='transaksiJurnal' title='Transaksi Jurnal' />
                  <Tab eventKey='bankStatement' title='Bank Statement' />
                  <Tab eventKey='pemetaanKas' title='Pemetaan Kas' />

                  <div eventKey='transaksiJurnal'>
                    <div class='mt-2'>
                      <div>
                        <Row className='mt-2 mb-2'>
                          <Col sm='9'>
                            <Button variant='primary'>Rekonsiliasi</Button>
                          </Col>
                          <Col sm='3' className='d-flex justify-content-end'>
                            <FormControl type='text' placeholder='Search . . . .' />
                          </Col>
                        </Row>
                      </div>

                      <TableContainer component={Paper}>
                        <Tables size='small' aria-label='simple table'>
                          <TableHead className='bg-dark'>
                            <TableRow>
                              <TableCell>
                                <Field type='checkbox' name='toggle' />
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Tanggal</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Kontak</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Tag</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Terima (dalam IDR)</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Kirim (dalam IDR)</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Saldo (dalam IDR)</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Status</Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          {data.map((data, index) => (
                            <TransaksiJurnal data={data} index={index} label='incoming' view='terimauang' contact='contact' />
                          ))}
                          {data.map((data, index) => (
                            <TransaksiJurnal data={data} index={index} label='outgoing' view='kirimuang' contact='contact' />
                          ))}
                          {data.map((data, index) => (
                            <TransaksiJurnal data={data} index={index} label='outgoing' view='transferuang' contact='nocontact' />
                          ))}
                        </Tables>
                      </TableContainer>
                    </div>
                  </div>

                  <div eventKey='bankStatement'>
                    <div class='mt-2'>
                      <div>
                        <Row className='mt-2 mb-2'>
                          <Col sm='9'>
                            <Button variant='primary' className='mr-2'>
                              Rekonsiliasi
                            </Button>
                            <Button variant='primary'>Import Bank Statement</Button>
                          </Col>
                          <Col sm='3' className='d-flex justify-content-end'>
                            <FormControl type='text' placeholder='Search . . . .' className='mr-2' />
                            <Button variant='primary'>Ekspor</Button>
                          </Col>
                        </Row>
                      </div>

                      <TableContainer component={Paper}>
                        <Tables size='small' aria-label='simple table'>
                          <TableHead className='bg-dark'>
                            <TableRow>
                              <TableCell>
                                <Field type='checkbox' name='toggle' />
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Tanggal</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Deskripsi</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Tanggal Import</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Terima</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Kirim</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Saldo</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Sumber</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography className='text-white font-bold'>Status</Typography>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          {data.map((data, index) => (
                            <BankStatement data={data} index={index} label='incoming' view='terimauang' contact='contact' />
                          ))}
                          {data.map((data, index) => (
                            <BankStatement data={data} index={index} label='outgoing' view='kirimuang' contact='contact' />
                          ))}
                          {data.map((data, index) => (
                            <BankStatement data={data} index={index} label='outgoing' view='transferuang' contact='nocontact' />
                          ))}
                        </Tables>
                      </TableContainer>
                    </div>
                  </div>

                  <div eventKey='pemetaanKas'>
                    <div class='mt-6 mb-3'>
                      <div>
                        <Button variant='primary'>
                          <CachedIcon fontSize='medium' /> Muat Ulang
                        </Button>

                        <div className='float-right'>
                          <Button variant='secondary mr-2'>
                            <RotateLeftIcon fontSize='medium' />
                            Reset
                          </Button>
                          <Button variant='danger mr-2'>
                            <HighlightOffIcon fontSize='medium' /> Hapus
                          </Button>
                          <Button variant='success'>
                            <CheckCircleIcon fontSize='medium' /> Rekonsilasi
                          </Button>
                        </div>
                      </div>

                      <Table class='table mt-6'>
                        <thead class='thead-light'>
                          <tr>
                            <th class='px-2 py-2'>
                              <span>Tanggal</span>
                            </th>
                            <th class='px-2 py-2'>
                              <span>Terima(dalam IDR)</span>
                            </th>
                            <th class='px-2 py-2'>
                              <span>Bayar(dalam IDR)</span>
                            </th>
                            <th class='px-2 py-2'>
                              <span>Deskripsi</span>
                            </th>
                            <th class='px-2 py-2'>
                              <span>Akun</span>
                            </th>
                            <th class='px-2 py-2'>
                              <span>Tarif Pajak</span>
                            </th>
                            <th class='px-2 py-2'>
                              <span></span>
                            </th>
                          </tr>
                        </thead>
                        <tr>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>1 Januari 2021</div>
                          </td>
                          <td class='px-8 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>01-02</div>
                          </td>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>Rp, 0.00</div>
                          </td>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>Rp, 0.00</div>
                          </td>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>Data Dummy</div>
                          </td>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>Data Dummy</div>
                          </td>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>
                              <DropdownButton variant='secondary' id='dropdown-basic-button'>
                                <Dropdown.Item>
                                  <a>Pisah</a>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <a>Hapus</a>
                                </Dropdown.Item>
                              </DropdownButton>
                            </div>
                          </td>
                        </tr>
                      </Table>
                    </div>
                  </div>
                </Tabs>
              </div>
            </Form>
          )}
        </Formik>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const akun = await prisma.akun.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      HeaderTerimaUang: {
        include: {
          kontak: true,
        },
      },
      HeaderKirimUang: {
        include: {
          kontak: true,
        },
      },
      TransferUang1: true,
      TransferUang2: true,
    },
  });

  return {
    props: {
      data: akun,
    },
  };
}
