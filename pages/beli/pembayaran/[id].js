import React from "react";
import Layout from "../../../components/Layout";
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

  const url = "http://localhost:3000/api/beli/pengirimanPembayaran";

  function pembayaran() {
    router.push(`../pembayaran/view/${id}`);
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          id: id,
          akun_id: "",
          nama_akun_bayar_dari: "",
          cara_pembayaran_id: "",
          cara_pembayaran_nama: "",
          tgl_pembayaran: "",

          jumlah: 0,
        }}
        // validationSchema={UserSchema}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
              router.push(`../../beli/view/${id}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <Row>
              <Col>
                <h5>Transaksi</h5>
                <h3 className="text-blue-600">Pengiriman Pembayaran</h3>
              </Col>
            </Row>
            <hr />
            <Form>
              <Row sm="12">
                {data.map((i) => (
                  <Col sm="3">
                    <Form.Label className="font-medium">Supplier</Form.Label>
                    <Form.Control placeholder={i.kontak.nama} disabled />
                  </Col>
                ))}

                <Col sm="3">
                  <Form.Label className="font-medium">Bayar Dari</Form.Label>
                  <Select
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
                  <Form.Control placeholder="" type="date" name="tgl_pembayaran" onChange={props.handleChange} />
                </Col>

                {data.map((i) => (
                  <Col sm="4">
                    <Form.Label className="font-medium">No. Transaksi</Form.Label>
                    <Form.Control placeholder={i.no_transaksi} disabled />
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
                  <Form.Label className="font-medium">Sisa Tagihan</Form.Label>
                </Col>

                <Col sm="2">
                  <Form.Label className="font-medium">Jumlah</Form.Label>
                </Col>
              </Row>

              <hr />
              {data.map((i) => (
                <Row className="mb-12">
                  <Col sm="2">
                    <p>Purchase Invoice #{i.id}</p>
                  </Col>

                  <Col sm="2">
                    <p>{i.memo}</p>
                  </Col>

                  <Col sm="2">
                    <p>{i.tgl_jatuh_tempo}</p>
                  </Col>

                  <Col sm="2">
                    <p>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm="2">
                    <p>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>

                  <Col sm="2">
                    <Form.Control
                      placeholder=""
                      name="jumlah"
                      onChange={(e) => {
                        props.setFieldValue("jumlah", parseInt(e.target.value));
                        const total = i.sisa_tagihan - e.target.value;

                        props.setFieldValue("total", parseInt(total));
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
                  <h5 name="total">Rp. {parseInt(props.values.jumlah).toLocaleString({ minimumFractionDigits: 0 })}</h5>
                </Col>
              </Row>

              <Row>
                <Col className="d-flex justify-content-end mt-10">
                  <Button variant="primary mr-2" onClick={pembayaran}>
                    Invoice
                  </Button>
                  <Link href="/beli/pembelian">
                    <Button variant="danger mr-2">Batal</Button>
                  </Link>
                  <Button variant="success" onClick={props.handleSubmit}>
                    Bayar
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

  const header = await prisma.headerPembelian.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      DetailPembelian: true,
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
