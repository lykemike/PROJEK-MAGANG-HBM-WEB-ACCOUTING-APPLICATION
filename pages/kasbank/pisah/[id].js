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
import { array } from "yup";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function pisah({ bank, data2 }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(bank);

  function SelectField(FieldProps) {
    return (
      <Select
        options={data2}
        isClearable={false}
        onChange={(option) => FieldProps.form.setFieldValue(FieldProps.field.name, option.value)}
      />
    );
  }
  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="textPrimary">Pisah</Typography>
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
          pisah: [
            {
              bank_header: "",
              deskripsi: "",
              akun_id: "",
              jumlah: "",
            },
          ],
        }}
        // validationSchema={}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(createUser, values)
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
            <FieldArray name="pisah">
              {({ insert, remove, push }) => (
                <div className="mt-2">
                  {props.values.pisah.length > 0 &&
                    props.values.pisah.map((i, index) => (
                      <Row key={index} className="mt-2">
                        <Col sm="3">
                          <Form.Control type="text" name={`pisah.${index}.deskrpsi`} />
                        </Col>
                        <Col sm="3">
                          <Field options={data2} name={`pisah.${index}.akun_id`} component={SelectField} />
                        </Col>
                        <Col sm="2">
                          <Form.Control type="number" name={`pisah.${index}.jumlah`} />
                        </Col>
                        <Col sm="4">
                          <div className="d-flex justify-content-end">
                            <BackspaceIcon className="cursor-pointer w-8 h-8" onClick={() => remove(index)} />
                          </div>
                        </Col>
                      </Row>
                    ))}

                  <button
                    type="button"
                    class="mt-4 focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
                    onClick={() =>
                      push({
                        deskripsi: "",
                        akun_id: "",
                        jumlah: "",
                      })
                    }
                  >
                    Tambah data
                  </button>
                </div>
              )}
            </FieldArray>
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
    },
  };
}
