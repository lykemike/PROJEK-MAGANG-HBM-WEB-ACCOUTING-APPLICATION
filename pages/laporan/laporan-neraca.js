import React, { useRef } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import AsetTetap from "../../components/Neraca/AsetTetap";
import AsetLancar from "../../components/Neraca/AsetLancar";
import AsetLainnya from "../../components/Neraca/AsetLainnya";
import LiabilitasJangkaPendek from "../../components/Neraca/LiabilitasJangkaPendek";
import LiabilitasJangkaPanjang from "../../components/Neraca/LiabilitasJangkaPanjang";
import Modal from "../../components/Neraca/Modal";
import { Button, Table, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { Formik, Form as Forms, Field } from "formik";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporan_neraca() {
  const startOfMonth = moment().clone().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");

  useEffect(() => {
    Axios.post("/laporan/neraca", {
      data: {
        tgl_awal: startOfMonth,
        tgl_akhir: endOfMonth,
      },
    })
      .then(function (response) {
        setBukuBesar(response?.data?.data || []);
        setTotalDebit(response.data.debit);
        setTotalKredit(response.data.kredit);
        console.log(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(header);

  return (
    <Layout>
      <Formik
        initialValues={{
          tgl_awal: startOfMonth,
          tgl_akhir: endOfMonth,
        }}
        onSubmit={async (values) => {
          Axios.post("/laporan/neraca", values)
            .then(function (response) {
              setBukuBesar(response?.data?.data || []);
              setTotalDebit(response.data.debit);
              setTotalKredit(response.data.kredit);
            })
            .catch(function (error) {
              // setState({ open: true, toast_message: error.response.data.message });
              console.log(error);
            });
        }}
      >
        {(props) => (
          <Forms noValidate>
            <div variant="container">
              <div></div>
              <h4 class="mb-6 mt-2">Neraca</h4>
              <div class="mb-10">
                <Row>
                  <Col sm="3">
                    <Form.Label>Tanggal Mulai</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Pick date"
                        type="date"
                        aria-label="date"
                        value={props.values.tgl_awal}
                        onChange={props.handleChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col sm="3">
                    <Form.Label>Tanggal Selesai</Form.Label>
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Pick date"
                        type="date"
                        aria-label="date"
                        value={props.values.tgl_akhir}
                        onChange={props.handleChange}
                      />
                    </InputGroup>
                  </Col>

                  <Col>
                    <Button variant="primary mr-2 mt-7" onClick={props.handleSubmit}>
                      Filter
                    </Button>
                  </Col>
                </Row>

                <div class="flex flex-row-reverse">
                  <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Export">
                    <Dropdown.Item>
                      <Link href="#">
                        <a>PDF</a>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              <table class="min-w-full table-auto">
                <thead class="justify-between">
                  <tr class="bg-dark">
                    <th class="px-2 py-2" colSpan="3">
                      <span class="text-gray-300">Data</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <div>
                    <th>Aset</th>
                    <AsetLancar label="Aset Lancar" data={header} />
                    <tr>
                      <td>Total Aset Lancar</td>
                      <td class="pl-5">XXX</td>
                    </tr>
                    <AsetTetap label="Aset Tetap" data={header2} />
                    <tr>
                      <td>Total Aset Tetap</td>
                      <td class="pl-5">XXX</td>
                    </tr>
                    <AsetLainnya label="Aset Lainnya" data={header3} />
                    <tr>
                      <td>Total Aset Lainnya</td>
                      <td class="pl-5">XXX</td>
                    </tr>
                  </div>
                  <div className="mt-4">
                    <th className="mt-2">Liabilitas dan Modal</th>
                    <LiabilitasJangkaPendek label="Liabilitas Jangka Pendek" data={header4} />
                    <tr>
                      <td>Total Liabilitas Jangka Pendek</td>
                      <td class="pl-5">XXX</td>
                    </tr>

                    <LiabilitasJangkaPanjang label="Liabilitas Jangka Panjang" data={header5} />
                    <tr>
                      <td>Total Liabilitas Jangka Panjang</td>
                      <td class="pl-5">XXX</td>
                    </tr>

                    <Modal label="Modal" data={header6} />
                    <tr>
                      <td>Total Modal</td>
                      <td class="pl-5">XXX</td>
                    </tr>
                  </div>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="px-2 py-1" align="right">
                      Grand Total
                    </td>
                    {/* <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
              <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td> */}
                  </tr>
                </tfoot>
              </table>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}
