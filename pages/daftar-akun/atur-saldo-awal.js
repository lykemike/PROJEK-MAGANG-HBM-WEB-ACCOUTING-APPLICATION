import React from "react";
import Layout from "../../components/Layout";
import { Button, Table, Row, Input, Form, Col } from "react-bootstrap";
import Link from "next/link";
import Axios from "axios";
import { Formik, Form as Forms, FieldArray } from "formik";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function test({ list }) {
  const url = "http://localhost:3000/api/daftar-akun/createSaldoAwal";
  return (
    <Layout>
      <Formik
        initialValues={{
          tgl_konversi: "",
          saldo_awal: list,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div>
              {" "}
              <h1>Saldo Awal</h1>
              <div class='mt-12'>
                <h4>Tanggal Konversi</h4>
                <input type='date' name='tgl_konversi' class='border rounded-lg px-3 py-2 mt-1 mb-4 text-sm grid-cols-12 '  onChange={props.handleChange}/>
              </div>
            </div>
            <table class='min-w-full table-auto'>
              <thead class='justify-between'>
                <tr class='bg-dark'>
                  <th class='px-2 py-2'>
                    <span class='text-gray-300'>Kode Akun</span>
                  </th>
                  <th class='px-8 py-2'>
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
              <tbody class='bg-white divide-y divide-gray-200'>
                <FieldArray name='saldo_awal'>
                  {({ insert, remove, push }) => (
                    <div>
                      {/* {console.log(props.values.saldo_awal)} */}
                      {props.values.saldo_awal.map((i, index) => (
                        <tr key={index}>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900 font-bold' name={`saldo_awal.${index}.akun_id`}>
                              {props.values.saldo_awal[index].kode_akun}
                            </div>
                          </td>
                          <td class='px-8 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>{props.values.saldo_awal[index].nama_akun}</div>
                          </td>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>
                              <Form.Control disabled={props.values.saldo_awal[index].tipe_saldo === "Kredit"} type='number' name={`saldo_awal.${index}.debit`} onChange={props.handleChange} />
                            </div>
                          </td>
                          <td class='px-2 py-2 whitespace-nowrap font-large'>
                            <div class='text-lg text-gray-900'>
                              <Form.Control disabled={props.values.saldo_awal[index].tipe_saldo === "Debit"} type='number' name={`saldo_awal.${index}.kredit`} onChange={props.handleChange} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </div>
                  )}
                </FieldArray>
              </tbody>
            </table>
            <button class='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none' onClick={props.handleSubmit}>
              Terbitkan
            </button>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const akuns = await prisma.akun.findMany({
    orderBy: {
      kode_akun: "asc",
    },
    include: {
      kategori_akun: true,
    },
  });

  let list = [];
  akuns.map((i) => {
    list.push({
      id: i.id,
      kode_akun: i.kode_akun,
      nama_akun: i.nama_akun,
      debit: 0,
      kredit: 0,
      tipe_saldo: i.kategori_akun.saldo_normal_nama,
    });
  });

  return {
    props: {
      list: list,
    },
  };
}
