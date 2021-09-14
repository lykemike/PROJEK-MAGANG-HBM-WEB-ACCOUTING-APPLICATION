import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import { Formik, Form as Forms, FieldArray } from "formik";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Button, Row, Col, Table, Form, FormControl } from "react-bootstrap";
import Add from "@material-ui/icons/Add";
import { string } from "yup/lib/locale";
// import TablePagination from "../../components/TablePagination";
// import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default function catatan_pelepasan_aset({ data, data2, data3, data4, data5, data6, data7, data8 }) {
  const router = useRouter();
  const { id } = router.query;
  const url = "http://localhost:3000/api/aset/createinvoicepelepasan";
  const hasil = data8;
  const tipe = data6 > data7 ? "kredit" : "debit";
  const depo_id = data[0].akun.id;

  console.log(data[0].akun.id);
  console.log(tipe);
  return (
    <Layout>
      <Formik
        initialValues={{
          akun_deposit_id: depo_id,
          id: id,
          nama_akun_untungrugi: "",
          nominal: hasil,
          tipe_saldo: tipe,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              // router.push(``);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div variant="container">
              <Row>
                <Col>
                  <Row>
                    <h4>Catatan Pelepasan Aset</h4>
                  </Row>
                </Col>

                <Col className="d-flex justify-content-end"></Col>
              </Row>
              <table class="table mt-10">
                <caption></caption>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Debit</th>
                    <th scope="col">Kredit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Biaya Akuisisi</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    {data3.map((i) => (
                      <td>{i.biaya_akuisisi}</td>
                    ))}
                  </tr>
                  <tr>
                    {data3.map((i) => (
                      <th>
                        akumulasi penyusutan <br />
                        sampai tanggal {i.tgl_penyusutan}
                      </th>
                    ))}
                    <td></td>
                    <td></td>
                    {data2.map((i) => (
                      <td> {i.nominal}</td>
                    ))}
                    <td></td>
                  </tr>
                  <tr>
                    {data.map((i) => (
                      <th>{i.akun.nama_akun}</th>
                    ))}

                    <td></td>
                    <td></td>
                    {data.map((i) => (
                      <td>{i.nominal}</td>
                    ))}

                    <td></td>
                  </tr>
                  <tr>
                    {data6 < data7 ? <th>kerugian penjualan Aset</th> : <th>keuntungan penjualan Aset</th>}

                    {data6 < data7 ? (
                      <td>
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            props.setFieldValue(`nama_akun_untungrugi`, e.target.value);
                          }}>
                          <option value="kosong">kosong</option>
                          {data4.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </td>
                    ) : (
                      <td>
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            props.setFieldValue(`nama_akun_untungrugi`, e.target.value);
                          }}>
                          <option value="kosong">kosong</option>
                          {data5.map((i) => (
                            <option key={i.id} value={i.id}>
                              {i.nama_akun}
                            </option>
                          ))}
                        </Form.Control>
                      </td>
                    )}

                    <td></td>
                    {data6 < data7 ? (
                      <td>
                        <Form.Control disabled as="text">
                          {props.values.nominal}
                        </Form.Control>
                      </td>
                    ) : (
                      <td></td>
                    )}

                    {data6 > data7 ? (
                      <td>
                        <Form.Control disabled as="text">
                          {props.values.nominal}
                        </Form.Control>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                </tbody>
              </table>

              <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
                <button onclick="openModal(false)" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">
                  Batal
                </button>
                <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none" onClick={props.handleSubmit}>
                  Ubah
                </button>
              </div>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.query;
  // Get kontak,produk,pajak from API

  const pelepasanAset = await prisma.jurnalPelepasanAset.findMany({
    where: {
      header_aset_id: parseInt(id),
      tipe_saldo: "Debit",
    },
    include: {
      akun: true,
    },
  });

  const JurnalAset = await prisma.jurnalAset.findMany({
    where: {
      header_aset_id: parseInt(id),
      tipe_saldo: "Debit",
    },
  });

  const Aset = await prisma.aset.findMany({
    where: {
      id: parseInt(id),
    },
  });
  const akunrugi = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [16, 17],
      },
    },
  });
  const akununtung = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13, 14],
      },
    },
  });

  const debit = JurnalAset[0].nominal + pelepasanAset[0].nominal;

  const kredit = Aset[0].biaya_akuisisi;

  const nominal = debit > kredit ? debit - kredit : kredit - debit;

  return {
    props: {
      data: pelepasanAset,
      data2: JurnalAset,
      data3: Aset,
      data4: akunrugi,
      data5: akununtung,
      data6: debit,
      data7: kredit,
      data8: nominal,
    },
  };
}
