import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { Button, Form, Col, Row } from "react-bootstrap";

import { useRouter } from "next/router";
import * as Yup from "yup";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";
import { Snackbar } from "@material-ui/core";

export default function addKategoriProduk() {
  // Form Validation
  const KategoriProdukSchema = Yup.object().shape({
    nama: Yup.string().required("required"),
    jumlah: Yup.number().integer().required("required"),
  });

  // Kategori Produk API
  const addKategoriProduk = "http://localhost:3000/api/produk/createKategori";

  // Redirect
  const router = useRouter();

  // Batal Button Function
  function cancelButton() {
    router.push("../kategori/tabel-kategori");
  }

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
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Formik
        initialValues={{
          nama: "",
          jumlah: 0,
        }}
        validationSchema={KategoriProdukSchema}
        onSubmit={async (values) => {
          Axios.post(addKategoriProduk, values)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.push("../kategori/tabel-kategori");
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
            <Form>
              <h2>Add Kategori Produk</h2>

              <hr />

              <div className="container">
                <Row className="mb-2">
                  <Col className="mt-1" sm="1">
                    <Form.Label>Nama</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Control placeholder="Nama kategori" name="nama" onChange={props.handleChange} onBlur={props.handleBlur} />
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col className="mt-1" sm="1">
                    <Form.Label>Jumlah</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Control placeholder="Auto (0)" name="jumlah" disabled />
                  </Col>
                </Row>

                <Row>
                  <Col sm="1" />
                  <Col sm="4" className="d-flex justify-content-end mt-10">
                    <Button variant="danger mr-2" onClick={cancelButton}>
                      Batal
                    </Button>
                    <Button variant="success" onClick={props.handleSubmit}>
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
