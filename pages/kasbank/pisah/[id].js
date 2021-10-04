import React from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import {
  Tabs,
  Tab,
  Card,
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  FormControl,
  Modal,
  Alert,
  Form,
} from "react-bootstrap";
import {
  Breadcrumbs,
  Typography,
  Checkbox,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";

// import BackspaceIcon from "@material-ui/icons/Backspace";
import { BackspaceIcon } from "@heroicons/react/solid";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import { Formik, Form as Forms, FieldArray, Field } from "formik";
import Axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function MultipleAkun({ bank, data2, terima, kirim }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(bank);

  function Terima(FieldProps) {
    return (
      <Select
        options={terima}
        isClearable={false}
        onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)}
      />
    );
  }

  function Kirim(FieldProps) {
    return (
      <Select
        options={kirim}
        isClearable={false}
        onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)}
      />
    );
  }

  // const UserSchema = Yup.object().shape({
  //   multiple_akun: Yup.array(
  //     Yup.object({
  //       deskripsi: Yup.string().min(1, "Minimal 1 karakter").max(30),
  //       jumlah: Yup.number().min(1, "Jumlah lebih dari 1"),
  //     })
  //   ).min(1),
  // });

  const url = "http://localhost:3000/api/kasbank/createPemetaanKas";

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  console.log(current);
  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          {bank[0].kredit == 0 ? (
            <Typography color="textPrimary">Debit</Typography>
          ) : (
            <Typography color="textPrimary">Kredit</Typography>
          )}
        </Breadcrumbs>

        <Row>
          <h2 className="text-blue-600">Terima/Bayar Utang</h2>
        </Row>
        <Row>
          <Col>
            <p>(Nomor Akun) Nama Akun</p>
          </Col>
          <Col>
            <div className="d-flex justify-content-end">Rp. {bank[0].debit}</div>
          </Col>
        </Row>
      </div>

      <div className="border-b border-t border-gray-200 mt-2">
        <Row>
          <Col sm="3">
            <div className="text-lg font-medium py-1">Deskripsi</div>
          </Col>
          <Col sm="3">
            <div className="text-lg font-medium py-1">Akun</div>
          </Col>
          <Col sm="2">
            <div className="text-lg font-medium py-1">Jumlah</div>
          </Col>
          <Col sm="4" />
        </Row>
      </div>

      <Formik
        initialValues={{
          bank_type: bank[0].kredit == 0 ? "Debit" : "Kredit",
          multiple_akun: [
            {
              detail_bank_statement_id: parseInt(id),
              deskripsi: "",
              akun_id: "",
              jumlah: "",
              tgl_transaksi: current,
            },
          ],
        }}
        // validationSchema={UserSchema}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            {bank[0].kredit == 0 ? (
              <FieldArray name="multiple_akun">
                {({ insert, remove, push }) => (
                  <div className="mt-2">
                    {props.values.multiple_akun.length > 0 &&
                      props.values.multiple_akun.map((i, index) => (
                        <Row key={index} className="mt-2">
                          <Col sm="3">
                            <Form.Control
                              type="text"
                              name={`multiple_akun.${index}.deskripsi`}
                              onChange={props.handleChange}
                            />
                            {/* {`props.error.multiple_akun.${index}.deskripsi` && `props.touched.multiple_akun.${index}.deskripsi` ? (
                              <div class="text-red-500 text-sm">{`props.errors.multiple_akun.${index}.deskripsi`}</div>
                            ) : null} */}
                          </Col>
                          <Col sm="3">
                            <Field options={terima} name={`multiple_akun.${index}.akun_id`} component={Terima} />
                          </Col>
                          <Col sm="2">
                            <Form.Control
                              type="number"
                              name={`multiple_akun.${index}.jumlah`}
                              onChange={props.handleChange}
                            />
                            {/* {`props.error.multiple_akun.${index}.jumlah` && `props.touched.multiple_akun.${index}.jumlah` ? (
                              <div class="text-red-500 text-sm">{`props.errors.multiple_akun.${index}.jumlah`}</div>
                            ) : null} */}
                          </Col>
                          <Col sm="4">
                            <div className="d-flex justify-content-end">
                              <BackspaceIcon className="cursor-pointer w-8 h-8" onClick={() => remove(index)} />
                            </div>
                          </Col>
                        </Row>
                      ))}

                    <button
                      class="mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
                      type="submit"
                      onClick={() =>
                        push({
                          bank_header: "",
                          deskripsi: "",
                          akun_id: "",
                          jumlah: "",
                        })
                      }
                    >
                      Tambah
                    </button>
                  </div>
                )}
              </FieldArray>
            ) : (
              <FieldArray name="multiple_akun">
                {({ insert, remove, push }) => (
                  <div className="mt-2">
                    {props.values.multiple_akun.length > 0 &&
                      props.values.multiple_akun.map((i, index) => (
                        <Row key={index} className="mt-2">
                          <Col sm="3">
                            <Form.Control
                              type="text"
                              name={`multiple_akun.${index}.deskripsi`}
                              onChange={props.handleChange}
                            />
                          </Col>
                          <Col sm="3">
                            <Field options={kirim} name={`multiple_akun.${index}.akun_id`} component={Kirim} />
                          </Col>
                          <Col sm="2">
                            <Form.Control
                              type="number"
                              name={`multiple_akun.${index}.jumlah`}
                              onChange={props.handleChange}
                            />
                          </Col>
                          <Col sm="4">
                            <div className="d-flex justify-content-end">
                              <BackspaceIcon className="cursor-pointer w-8 h-8" onClick={() => remove(index)} />
                            </div>
                          </Col>
                        </Row>
                      ))}
                    <button
                      class="mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
                      type="submit"
                      onClick={() =>
                        push({
                          bank_header: "",
                          deskripsi: "",
                          akun_id: "",
                          jumlah: "",
                        })
                      }
                    >
                      Tambah
                    </button>
                  </div>
                )}
              </FieldArray>
            )}

            <button
              class="mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
              type="submit"
              onClick={props.handleSubmit}
            >
              Buat
            </button>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const all = await prisma.akun.findMany({});

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
      JurnalTransferUang: true,
    },
  });

  const terima = await prisma.akun.findMany({
    where: {
      kategoriId: 14,
    },
  });

  let terima_structure = [];
  terima.map((i) => {
    terima_structure.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  const kirim = await prisma.akun.findMany({
    where: {
      kategoriId: 17,
    },
  });

  let kirim_structure = [];
  kirim.map((i) => {
    kirim_structure.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  const bank_statement = await prisma.detailBankStatement.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      akun: true,
    },
  });

  let detail = [];
  all.map((i) => {
    detail.push({
      value: i.id,
      label: i.kode_akun + " - " + i.nama_akun,
    });
  });

  return {
    props: {
      data: akun,
      bank: bank_statement,
      data2: detail,
      terima: terima_structure,
      kirim: kirim_structure,
    },
  };
}
