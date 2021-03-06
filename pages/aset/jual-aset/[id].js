import { Snackbar } from "@material-ui/core";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { Form, Row, Col, Button } from "react-bootstrap";

import * as Yup from "yup";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { id } from "date-fns/locale";
const prisma = new PrismaClient();

export default function addaset({ data, data2 }) {
  const router = useRouter();
  const url = "http://localhost:3000/api/aset/createpelepasan";

  // const id = data != undefined ? parseInt(data.id) + 1 : 1;

  // const [idInvoice, setIdInvoice] = useState(id);

  const { id } = router.query;

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

  return (
    <Layout>
      <Formik
        initialValues={{
          id: id,
          tgl_transaksi: "",
          harga_jual: "",
          deposit_id: "",
          memo: "",
          tag: "",
        }}
        onSubmit={async (values) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.push(``);
              }, 2000);
            })
            .catch(function (error) {
              setState({ open: true, toast_message: error.response.data.message });
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              autoHideDuration={6000}
              open={open}
              onClose={handleClose}
              message={toast_message}
              key={vertical + horizontal}
            />
            <div>
              <h4>Pelepasan Aset</h4>
              {data.map((i) => (
                <h5 class="mt-5">
                  {" "}
                  {i.nomor_aset} - {i.nama_aset}
                </h5>
              ))}
              <div class="mt-12 container">
                <Form>
                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Tanggal Transaksi</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control
                        type="date"
                        placeholder=""
                        name="tgl_transaksi"
                        onChange={props.handleChange}
                        // onChange={props.handleChange}
                        // onBLur={props.handleBlur}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Harga Jual</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control placeholder="" name="harga_jual" onChange={props.handleChange} />
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Deposit ke</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control as="select" placeholder="" size="sm" name="deposit_id" onChange={props.handleChange}>
                        <option value="0">Pilih</option>
                        {data2.map((akundeposit) => (
                          <option key={akundeposit.id} value={akundeposit.id}>
                            {akundeposit.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Memo</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Form.Control as="textarea" rows={3} name="memo" onChange={props.handleChange} />
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col sm="2">
                      <Form.Label>Tags</Form.Label>
                    </Col>
                    <Col sm="4">
                      <Row>
                        <Col>
                          <Form.Control type="text" name="tag" onChange={props.handleChange}>
                            {/* loop over roles and show them */}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm="2" />
                    <Col sm="4" className="d-flex justify-content-end mt-10">
                      <Button variant="danger mr-2">Batal</Button>
                      <Button variant="success" onClick={props.handleSubmit}>
                        Simpan
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
            {/* </Forms>
        )}
      </Formik> */}
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Get Akuns from API
  const { id } = context.query;

  const asets = await prisma.aset.findMany({
    where: {
      id: parseInt(id),
    },
  });

  const akundeposit = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  return {
    props: {
      data: asets,
      data2: akundeposit,
    },
  };
}
