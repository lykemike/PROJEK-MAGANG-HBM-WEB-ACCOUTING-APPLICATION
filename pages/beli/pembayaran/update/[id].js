import { Snackbar } from "@material-ui/core";
import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { Row, Col, Form, Button, FormCheck } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import Select from "react-select";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import { PeopleSharp } from "@material-ui/icons";
const prisma = new PrismaClient();

export default function pembayaran_beli({ data, data2, cara_pembayaran }) {
  const router = useRouter();
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
  const url = "http://localhost:3000/api/beli/updatePembayaran";

  function pembayaran() {
    router.push(`../pembayaran/view/${id}`);
  }

  const sisatagihanlama = data[0].header_pembelian.sisa_tagihan + data[0].jumlah;

  return (
    <Layout>
      <Formik
        initialValues={{
          id: id,
          kontak_id: data[0].header_pembelian.kontak.id,
          akun_id: data[0].akun_id,
          header_pembelian_id: data[0].header_pembelian.id,
          nama_akun_bayar_dari: data[0].nama_akun_bayar_dari,
          cara_pembayaran_id: data[0].cara_pembayaran_id,
          cara_pembayaran_nama: data[0].cara_pembayaran_nama,
          tgl_pembayaran: data[0].tgl_pembayaran,

          jumlah: data[0].jumlah,
          jumlah_baru: data[0].jumlah,
        }}
        // validationSchema={UserSchema}
        onSubmit={async (values) => {
          Axios.post(url, values)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.push(`../view/${response.data.id}`);
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
            <Row>
              <Col>
                <h5>Transaksi</h5>
                <h3 className="text-blue-600">Pengiriman Pembayaran</h3>
              </Col>
            </Row>
            <hr />
            <Form>
              <Row sm="12">
                <Col sm="3">
                  <Form.Label className="font-medium">Supplier</Form.Label>
                  <Form.Control placeholder={data[0].header_pembelian.nama_supplier} disabled />
                </Col>

                <Col sm="3">
                  <Form.Label className="font-medium">Bayar Dari</Form.Label>
                  <Select
                    defaultValue={{
                      value: props.values.akun_id,
                      label: props.values.nama_akun_bayar_dari,
                    }}
                    options={data2}
                    name="akunkasbank"
                    onChange={(e) => {
                      props.setFieldValue(`akun_id`, e.value);
                      props.setFieldValue(`nama_akun_bayar_dari`, e.label);
                    }}
                  />
                </Col>
                <Col className="d-flex justify-content-end mr-3">
                  <Row>
                    <h4 className="mr-2">Total</h4>
                    <h4 name="total">Rp. {parseInt(props.values.jumlah).toLocaleString({ minimumFractionDigits: 0 })}</h4>
                  </Row>
                </Col>
              </Row>

              <hr />

              <Row sm="12">
                <Col sm="4">
                  <Form.Label className="font-medium">Cara Pembayaran</Form.Label>
                  <Select
                    defaultValue={{
                      value: props.values.cara_pembayaran_id,
                      label: props.values.cara_pembayaran_nama,
                    }}
                    options={cara_pembayaran}
                    name="akunkasbank"
                    onChange={(e) => {
                      props.setFieldValue(`cara_pembayaran_id`, e.value);
                      props.setFieldValue(`cara_pembayaran_nama`, e.label);
                    }}
                  />
                </Col>

                <Col sm="4">
                  <Form.Label className="font-medium">Tanggal Pembayaran</Form.Label>
                  <Form.Control
                    placeholder=""
                    type="date"
                    name="tgl_pembayaran"
                    onChange={props.handleChange}
                    defaultValue={props.values.tgl_pembayaran}
                  />
                </Col>

                {data.map((i) => (
                  <Col sm="4">
                    <Form.Label className="font-medium">No. Transaksi</Form.Label>
                    <Form.Control placeholder="Auto" disabled />
                  </Col>
                ))}
              </Row>

              <hr />

              <Row sm="12">
                <Col sm="2">
                  <Form.Label className="font-medium">Nomor</Form.Label>
                </Col>

                <Col sm="2">
                  <Form.Label className="font-medium">Deskripsi</Form.Label>
                </Col>

                <Col sm="2">
                  <Form.Label className="font-medium">Tgl Jatuh Tempo</Form.Label>
                </Col>

                <Col sm="2">
                  <Form.Label className="font-medium">Total</Form.Label>
                </Col>

                <Col sm="2">
                  <Form.Label className="font-medium">Sisa Tagihan sebelum pembayaran</Form.Label>
                </Col>

                <Col sm="2">
                  <Form.Label className="font-medium">Jumlah</Form.Label>
                </Col>
              </Row>

              <hr />
              {data.map((i) => (
                <Row className="mb-12">
                  <Col sm="2">
                    <p>Purchase Invoice #{i.header_pembelian.no_transaksi}</p>
                  </Col>

                  <Col sm="2">
                    <p>{i.header_pembelian.memo}</p>
                  </Col>

                  <Col sm="2">
                    <p>{i.header_pembelian.tgl_jatuh_tempo}</p>
                  </Col>

                  <Col sm="2">
                    <p>Rp. {i.header_pembelian.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm="2">
                    <p>Rp. {sisatagihanlama.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm="2">
                    <Form.Control
                      defaultValue={props.values.jumlah}
                      name="jumlah"
                      onChange={(e) => {
                        props.setFieldValue("jumlah_baru", e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              {/* <Button variant="primary">
					<AddIcon fontSize="small" />Tambah data
				</Button> */}

              {/* <Row sm="12" className="mt-3">
					<Col sm="3">
						<Form.Label className="font-medium">Memo</Form.Label>
						<Form.Control as="textarea" rows={4} />
					</Col>
				</Row>

				<Row sm="12">
				<Col sm="3">
						<Form.Label className="font-medium">Lampiran</Form.Label>
						<Form>
							<Form.File id="custom-file-translate-scss" label="ukuran maksimal 10MB/File" lang="en" custom />
						</Form>
					</Col>
				</Row> */}

              <Row sm="12" className="mt-3">
                <Col sm="3" />

                <Col sm="3" />

                <Col sm="3">
                  <h5>Total</h5>
                </Col>

                <Col sm="3">
                  <h5 name="total">Rp. {props.values.jumlah_baru.toLocaleString({ minimumFractionDigits: 0 })}</h5>
                </Col>
              </Row>

              <Row>
                <Col className="d-flex justify-content-end mt-10">
                  <Link href="/beli/pembelian">
                    <Button variant="danger mr-2">Batal</Button>
                  </Link>
                  <Button variant="success" onClick={props.handleSubmit}>
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.pengirimanBayaran.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      header_pembelian: {
        include: {
          kontak: true,
        },
      },
      akun: true,
    },
  });

  const get_akunKasBank = await prisma.akun.findMany({
    where: {
      kategoriId: 3,
    },
  });

  let akun_kas_bank = [];
  get_akunKasBank.map((i) => {
    akun_kas_bank.push({
      value: i.id,
      label: i.nama_akun,
    });
  });

  const get_cara_pembayaran = await prisma.caraPembayaran.findMany({
    orderBy: {
      id: "asc",
    },
  });
  let cara_pembayarans = [];
  get_cara_pembayaran.map((i) => {
    cara_pembayarans.push({
      value: i.id,
      label: i.nama,
    });
  });

  return {
    props: {
      data: header,
      data2: akun_kas_bank,
      cara_pembayaran: cara_pembayarans,
    },
  };
}
