import React, { useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import { Button, Row, Col, Form, Table } from "react-bootstrap";
import { Formik, Form as Forms, FieldArray } from "formik";
import * as Yup from "yup";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Axios from "axios";
import { Add, Backspace } from "@material-ui/icons/";
import Select from "react-select";
import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
import { Snackbar } from "@material-ui/core";
const prisma = new PrismaClient();

export default function updateReimbursement({ data, header, detail }) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState, toast_message: "" });
  };

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };

  const router = useRouter();
  const { id } = router.query;

  function cancelButton() {
    router.push("../reimbursement/tabel-reimbursement");
  }

  const api_update = "http://localhost:3000/api/reimbursement/updateReimbursement";

  return (
    <Formik
      initialValues={{
        id: id,
        nama_pegawai: header.nama_pegawai,
        yang_mengetahui: header.yang_mengetahui,
        yang_menyetujui: header.yang_menyetujui,
        periode_id: header.periode_id,
        periode_nama: header.periode.nama,
        status: header.status,
        total: header.total,
        detail_reimburse: detail,
      }}
      onSubmit={(values) => {
        Axios.put(api_update, values)
          .then(function (response) {
            setState({ open: true, toast_message: response.data.message });
            setTimeout(() => {
              router.push(`view/${response.data.id}`);
            }, 2000);
          })
          .catch(function (error) {
            setState({ open: true, toast_message: error.response.data.message });
          });
      }}
    >
      {(props) => (
        <Forms noValidate>
          <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
          <Layout>
            <div className="border-b border-gray-200">
              <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Update Reimbursement</Typography>
              </Breadcrumbs>
              <Row>
                <Col sm="8">
                  <h2 className="text-blue-600">Update Reimbursement</h2>
                </Col>
                <Col sm="4" />
              </Row>
            </div>

            <div class="mb-10 mt-2">
              <Row>
                <Col sm="3">
                  <label className="font-medium">Nama Pegawai</label>
                  <Form.Control
                    value={props.values.nama_pegawai}
                    type="text"
                    name="nama_pegawai"
                    onChange={(e) => {
                      let uppercase_word = e.target.value
                        .split(/ /g)
                        .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                        .join(" ");

                      props.setFieldValue((props.values.nama_pegawai = uppercase_word));
                    }}
                  />
                </Col>
                <Col sm="3">
                  <label className="font-medium">Periode Reimbursement</label>
                  <Select
                    options={data}
                    name="periode_id"
                    onBlur={props.handleBlur}
                    defaultValue={{ value: props.values.periode_id, label: props.values.periode_nama }}
                    onChange={(e) => {
                      props.setFieldValue(`periode_id`, e.value);
                    }}
                  />
                </Col>
              </Row>
            </div>

            <Table responsive>
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th>Tanggal</th>
                  <th>Tempat</th>
                  <th>Biaya</th>
                  <th>Keterangan</th>
                  <th>Jumlah</th>
                  <th />
                </tr>
              </thead>
              <FieldArray name="detail_reimburse">
                {({ insert, remove, push }) => (
                  <tbody>
                    {props.values.detail_reimburse.length > 0 &&
                      props.values.detail_reimburse.map((i, index) => (
                        <tr key={index}>
                          <td style={{ minWidth: 250, width: 250 }}>
                            <Form.Control
                              type="date"
                              name={`detail_reimburse.${index}.tanggal`}
                              value={props.values.detail_reimburse[index].tanggal}
                              onBlur={props.handleBlur}
                              onChange={props.handleChange}
                            />
                          </td>
                          <td style={{ minWidth: 350, width: 350 }}>
                            <Form.Control
                              type="text"
                              name={`detail_reimburse.${index}.tempat`}
                              value={props.values.detail_reimburse[index].tempat}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                let uppercase_word = e.target.value
                                  .split(/ /g)
                                  .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                                  .join(" ");

                                props.setFieldValue((props.values.detail_reimburse[index].tempat = uppercase_word));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 350, width: 350 }}>
                            <Form.Control
                              type="text"
                              name={`detail_reimburse.${index}.biaya`}
                              value={props.values.detail_reimburse[index].biaya}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                let uppercase_word = e.target.value
                                  .split(/ /g)
                                  .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                                  .join(" ");

                                props.setFieldValue((props.values.detail_reimburse[index].biaya = uppercase_word));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 350, width: 350 }}>
                            <Form.Control
                              type="text"
                              name={`detail_reimburse.${index}.keterangan`}
                              value={props.values.detail_reimburse[index].keterangan}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                let uppercase_word = e.target.value
                                  .split(/ /g)
                                  .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                                  .join(" ");

                                props.setFieldValue((props.values.detail_reimburse[index].keterangan = uppercase_word));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 200, width: 200 }}>
                            <Form.Control
                              min="0"
                              type="number"
                              name={`detail_reimburse.${index}.jumlah`}
                              value={props.values.detail_reimburse[index].jumlah}
                              onBlur={props.handleBlur}
                              onChange={(e) => {
                                props.setFieldValue(`detail_reimburse.${index}.jumlah`, parseInt(e.target.value));
                                props.setFieldValue((props.values.detail_reimburse[index].jumlah = parseInt(e.target.value)));

                                const total = props.values.detail_reimburse.reduce((a, b) => (a = a + b.jumlah), 0);
                                props.setFieldValue(`total`, total);
                                props.setFieldValue((props.values.total = total));
                              }}
                            />
                          </td>
                          <td style={{ minWidth: 50, width: 50 }}>
                            <Button variant="danger" onClick={() => remove(index)}>
                              <Backspace fontSize="small" />
                            </Button>
                          </td>
                        </tr>
                      ))}

                    <Button
                      className="ml-2 mt-4 py-2"
                      variant="primary"
                      onClick={() =>
                        push({
                          tanggal: "",
                          tempat: "",
                          biaya: "",
                          keterangan: "",
                          jumlah: 0,
                        })
                      }
                    >
                      <Add fontSize="small" /> Tambah data
                    </Button>
                  </tbody>
                )}
              </FieldArray>
              <tfoot>
                <tr>
                  <td />
                  <td />
                  <td />
                  <td className="d-flex justify-content-end">
                    <label className="font-medium">Total</label>
                  </td>
                  <td>Rp. {props.values.total.toLocaleString({ minimumFractionDigits: 0 })}</td>
                  <td />
                </tr>
              </tfoot>
            </Table>

            <div className="border-t border-gray-200">
              <Row className="py-2">
                <Col sm="3">
                  <label className="font-medium">
                    Yang Mengetahui
                    {props.errors.yang_mengetahui && props.touched.yang_mengetahui ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.yang_mengetahui}</span> : null}
                  </label>
                  <Form.Control
                    placeholder="-"
                    name="yang_mengetahui"
                    type="text"
                    value={props.values.yang_mengetahui}
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      let uppercase_word = e.target.value
                        .split(/ /g)
                        .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                        .join(" ");

                      props.setFieldValue((props.values.yang_mengetahui = uppercase_word));
                    }}
                  />
                </Col>
                <Col sm="3">
                  <label className="font-medium">
                    Yang Menyetujui
                    {props.errors.yang_menyetujui && props.touched.yang_menyetujui ? <span class="ml-1 text-xs font-medium text-red-500 required-dot">{props.errors.yang_menyetujui}</span> : null}
                  </label>
                  <Form.Control
                    placeholder="-"
                    name="yang_menyetujui"
                    type="text"
                    value={props.values.yang_menyetujui}
                    onBlur={props.handleBlur}
                    onChange={(e) => {
                      let uppercase_word = e.target.value
                        .split(/ /g)
                        .map((word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`)
                        .join(" ");

                      props.setFieldValue((props.values.yang_menyetujui = uppercase_word));
                    }}
                  />
                </Col>
                <Col />
              </Row>
            </div>

            <div className="float-right mb-10">
              <Button variant="danger mr-2" onClick={cancelButton}>
                Batal
              </Button>
              <Button variant="success" type="submit" onClick={props.handleSubmit}>
                Update
              </Button>
            </div>
          </Layout>
        </Forms>
      )}
    </Formik>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const get_reimbursement = await prisma.headerReimburse.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      DetailReimburse: true,
      periode: true,
    },
  });

  let detail = [];
  get_reimbursement.DetailReimburse.map((i) => {
    detail.push({
      header_reimburse_id: i.header_reimburse_id,
      tanggal: i.tanggal,
      tempat: i.tempat,
      biaya: i.biaya,
      keterangan: i.keterangan,
      jumlah: parseInt(i.jumlah),
    });
  });

  const get_periode = await prisma.periode.findMany({});
  let periode = [];
  get_periode.map((i) => {
    periode.push({
      value: i.id,
      label: i.nama,
    });
  });

  return {
    props: {
      data: periode,
      header: get_reimbursement,
      detail: detail,
    },
  };
}
