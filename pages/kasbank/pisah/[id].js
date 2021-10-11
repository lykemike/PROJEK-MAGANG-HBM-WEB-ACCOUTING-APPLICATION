import React from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { Tabs, Tab, Card, Button, DropdownButton, Dropdown, Row, Col, FormControl, Modal, Alert, Form } from "react-bootstrap";
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

  function cancelButton() {
    router.push(`../${bank[0].akun_id}`);
  }

  // const UserSchema = Yup.object().shape({
  //   multiple_akun: Yup.array(
  //     Yup.object({
  //       deskripsi: Yup.string().min(1, "Minimal 1 karakter").max(30),
  //       nominal: Yup.number().min(1, "nominal lebih dari 1"),
  //     })
  //   ).min(1),
  // });

  const url = "http://localhost:3000/api/kasbank/createPemetaanKas";

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  return (
    <Layout>
      {bank[0].kredit == 0 ? (
        <div className="border-b border-gray-200">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">Debit</Typography>
          </Breadcrumbs>
          <Row>
            <Col>
              <h2 className="text-blue-600">Terima</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                ({bank[0].akun.kode_akun}) - {bank[0].akun.nama_akun}
              </p>
            </Col>
            <Col>
              <div className="d-flex justify-content-end">Rp. {bank[0].debit.toLocaleString({ minimumFractionDigits: 0 })}</div>
            </Col>
          </Row>
        </div>
      ) : (
        <div className="border-b border-gray-200">
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="textPrimary">Kredit</Typography>
          </Breadcrumbs>
          <Row>
            <Col>
              <h2 className="text-blue-600">Bayar Utang</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                ({bank[0].akun.kode_akun}) - {bank[0].akun.nama_akun}
              </p>
            </Col>
            <Col>
              <div className="d-flex justify-content-end">Rp. {bank[0].kredit.toLocaleString({ minimumFractionDigits: 0 })}</div>
            </Col>
          </Row>
        </div>
      )}

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
          total: bank[0].debit == 0 ? bank[0].kredit : bank[0].debit,
          header_akun: bank[0],
          current_date: current,
          total: 0,
          multiple_akun: [
            {
              detail_bank_statement_id: id,
              deskripsi: "-",
              akun_id: "",
              nominal: 0,
              tgl_transaksi: current,
            },
          ],
        }}
        // validationSchema={UserSchema}
        onSubmit={async (values) => {
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.push(`invoice/${id}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <FieldArray name="multiple_akun">
              {({ insert, remove, push }) => (
                <div className="mt-2">
                  {props.values.multiple_akun.length > 0 &&
                    props.values.multiple_akun.map((i, index) => (
                      <Row key={index} className="mt-2 ">
                        <Col sm="3">
                          <Form.Control type="text" name={`multiple_akun.${index}.deskripsi`} onChange={props.handleChange} />
                          {/* {`props.error.multiple_akun.${index}.deskripsi` &&
                            `props.touched.multiple_akun.${index}.deskripsi` ? (
                              <div class="text-red-500 text-sm">{`props.errors.multiple_akun.${index}.deskripsi`}</div>
                            ) : null} */}
                        </Col>
                        <Col sm="3">
                          {bank[0].kredit == 0 ? (
                            <Field options={terima} name={`multiple_akun.${index}.akun_id`} component={Terima} />
                          ) : (
                            <Field options={kirim} name={`multiple_akun.${index}.akun_id`} component={Kirim} />
                          )}
                        </Col>
                        <Col sm="2">
                          <Form.Control
                            type="number"
                            name={`multiple_akun.${index}.nominal`}
                            onChange={(e) => {
                              // props.setFieldValue(`multiple_akun.${index}.nominal`, parseInt(e.target.value));
                              props.setFieldValue((props.values.multiple_akun[index].nominal = parseInt(e.target.value)));

                              let total = props.values.multiple_akun.reduce((a, b) => (a = a + b.nominal), 0);
                              props.setFieldValue((props.values.total = total));
                              props.setFieldValue("_total", total);
                            }}
                          />
                          {/* {`props.error.multiple_akun.${index}.nominal` && `props.touched.multiple_akun.${index}.nominal` ? (
                              <div class="text-red-500 text-sm">{`props.errors.multiple_akun.${index}.nominal`}</div>
                            ) : null} */}
                        </Col>
                        <Col sm="4">
                          <div className="d-flex justify-content-end">
                            <BackspaceIcon className="cursor-pointer w-8 h-8" onClick={() => remove(index)} />
                          </div>
                        </Col>
                      </Row>
                    ))}
                  <hr />
                  <Row className="mt-2">
                    <Col sm="6">
                      <button
                        class="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
                        type="button"
                        onClick={() =>
                          push({
                            detail_bank_statement_id: id,
                            deskripsi: "-",
                            akun_id: "",
                            nominal: 0,
                            tgl_transaksi: current,
                          })
                        }
                      >
                        Tambah Data
                      </button>
                    </Col>

                    <Col sm="6">
                      <Row className="px-4 py-2">
                        <p className="mr-8">Total</p>
                        <p name="_total">
                          Rp.{" "}
                          {props.values.total.toLocaleString({
                            minimumFractionDigits: 0,
                          })}
                        </p>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                </div>
              )}
            </FieldArray>

            <div className="d-flex justify-content-end">
              <button
                class="mr-2 mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300"
                type="submit"
                onClick={cancelButton}
              >
                Batal
              </button>

              <button
                class="mt-2 px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
                type="submit"
                onClick={props.handleSubmit}
              >
                Buat
              </button>
            </div>
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
