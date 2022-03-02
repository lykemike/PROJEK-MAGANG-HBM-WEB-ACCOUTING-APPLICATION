import React, { useRef, useState, useEffect } from "react";
import Layout from "../../components/layout";
import TabelLabaRugi from "../../components/Laporan/TabelLabaRugi";
import Link from "next/link";
import TablePagination from "../../components/TablePagination";
import { Button, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown, Modal } from "react-bootstrap";
import { Breadcrumbs, TableBody, Paper, Table, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@material-ui/core";
import Axios from "../../utils/axios";
import { Formik, Form as Forms, Field, FieldArray } from "formik";
import moment from "moment";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";
import { array, number, boolean, object, string, ValidationError } from "yup";
import Select from "react-select";

export default function LaporanPerubahanModal({ data, modal, kategori }) {
  const router = useRouter();
  return (
    <Layout>
      <Formik
        initialValues={{
          sahams: data,
        }}
        validationSchema={object({
          sahams: array(
            object({
              presentase: number().min(1, "Percentage needs to be at least 1%").max(100, "Percentage can be at most 100%"),
            })
          ).test((sahams) => {
            const sum = sahams?.reduce((acc, curr) => acc + (curr.presentase || 0), 0);

            if (sum !== 100) {
              return new ValidationError(`Percentage should be 100%, but you have ${sum}%`, undefined, "presentase");
            }

            return true;
          }),
        })}
        onSubmit={async (values) => {
          Axios.post("/saham/updateSaham", values)
            .then(function (response) {
              setTimeout(() => {
                router.push("../laporan/laporan-perubahanmodal");
              }, 2000);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {({ props, values, errors, handleChange, setFieldValue, touched, handleSubmit }) => (
          <Forms noValidate>
            <table>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Nama</th>
                  <th>Akun Modal</th>
                  <th>Akun Prive</th>
                  <th>Persentase</th>
                </tr>
              </thead>
              <FieldArray name="sahams">
                {({ insert, remove, push }) => (
                  <tbody>
                    {values.sahams.length > 0 &&
                      values.sahams.map((i, index) => (
                        <tr key={index}>
                          <td style={{ minWidth: 300, width: 300 }}>
                            <Form.Control type="text" name={`sahams.${index}.nama`} value={values.sahams[index].nama} onChange={handleChange} />
                          </td>
                          <td style={{ minWidth: 300, width: 300 }}>
                            <Select
                              options={modal}
                              defaultValue={{ value: values.sahams[index].akun_modal_id, label: values.sahams[index].akun_modal.nama_akun }}
                              name={`sahams.${index}.akun_modal_id`}
                              onChange={(e) => {
                                setFieldValue((values.sahams[index].akun_modal_id = e.value));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 300, width: 300 }}>
                            <Select
                              options={kategori}
                              defaultValue={{
                                value: values.sahams[index].akun_prive_id == null ? null : values.sahams[index].akun_prive_id,
                                label: values.sahams[index].akun_prive_id == null ? "-" : values.sahams[index].akun_prive.nama_akun,
                              }}
                              name={`sahams.${index}.akun_prive_id`}
                              onChange={(e) => {
                                setFieldValue((values.sahams[index].akun_prive_id = e.value));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 200, width: 200 }}>
                            <Form.Control type="number" min="1" max="100" name={`sahams.${index}.presentase`} value={values.sahams[index].presentase} onChange={handleChange} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </FieldArray>
            </table>
            <div>
              <span class="text-base font-medium text-red-500 required-dot">{errors.presentase}</span>
            </div>

            <div>
              <Button variant="primary mr-2 mt-7" onClick={handleSubmit}>
                Ubah
              </Button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  const pemegangSaham = await prisma.pemegangSaham.findMany({
    include: {
      akun_modal: true,
      akun_prive: true,
    },
  });

  const akun_modal = await prisma.akun.findMany({
    where: {
      nama_akun: {
        startsWith: "Modal",
      },
    },
  });

  const kategori = await prisma.kategori.findMany({
    where: {
      name: "Ekuitas",
    },
    include: {
      Akun: true,
    },
  });

  let akunModal = [];
  akun_modal?.map((i) => {
    akunModal.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  let kategoriEkuitas = [];
  kategori[0].Akun.map((i) => {
    kategoriEkuitas.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  return {
    props: {
      data: pemegangSaham,
      modal: akunModal,
      kategori: kategoriEkuitas,
    },
  };
}
