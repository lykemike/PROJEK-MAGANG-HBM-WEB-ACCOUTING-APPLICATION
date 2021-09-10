import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Tabs, Tab, Card, Button, DropdownButton, Dropdown, Table, Row, Col, Form } from "react-bootstrap";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import CachedIcon from "@material-ui/icons/Cached";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import AddIcon from "@material-ui/icons/Add";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";

export default function listaset({ data }) {
  const deleteAset = "http://localhost:3000/api/aset/deleteAset";

  const handleDelete = async (id) => {
    Axios.delete(deleteAset, {
      data: {
        asetid: id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("add-aset");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Layout>
        <div class="text-md font-medium text-gray-900 mb-2">
          <h4> Aset Tetap</h4>

          <Row>
            <Col></Col>

            <Col>
              <h4 class="mt-2 mb-3 float-right">
                <Link href="/aset/add-aset">
                  <Button variant="primary mr-2">
                    <AddIcon fontSize="small" />
                    Simpan Aset
                  </Button>
                </Link>
              </h4>
            </Col>
          </Row>
        </div>

        <div variant="container">
          <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="listAsetTetap" title="List Aset Tetap" />
            <Tab eventKey="transaksiAsetTetap" title="Transaksi Aset Tetap" />

            <div eventKey="listAsetTetap">
              <div class="mt-6">
                <div class="float-right mb-6">
                  <Form.Control placeholder="Search" />
                </div>

                <Table class="table mt-8">
                  <thead class="thead-light">
                    <tr>
                      <th class="px-2 py-2">
                        <span>Tanggal Akuisisi</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Nomor</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Nama Aset</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Biaya Akuisisi</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Tag</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Masa Manfaat</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Nilai/Tahun</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Action</span>
                      </th>
                    </tr>
                  </thead>
                  {data.map((i, index) => (
                    <tr>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">{i.tgl_akuisisi}</div>
                      </td>
                      <td class="px-8 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">{i.nomor_aset}</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">{i.nama_aset}</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">{i.biaya_akuisisi}</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">{i.tag}</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">{i.masa_manfaat}</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">{i.nilai_tahun}</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">
                          <Link key={index} href={`/aset/jual-aset/${i.id}`}>
                            <Button variant="outline-success mr-2">Jual</Button>
                          </Link>
                          <Button variant="warning mr-2">Edit</Button>
                          <Button variant="danger" onClick={() => handleDelete(i.id)}>
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>

            <div eventKey="transaksiAsetTetap">
              <div class="mt-6">
                <div class="float-right mb-6">
                  <Form.Control placeholder="Search" />
                </div>

                <Table class="table mt-8">
                  <thead class="thead-light">
                    <tr>
                      <th class="px-2 py-2">
                        <span>Tanggal</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Tindakan</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Transaksi</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Nomor</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Nomor Akun</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Nama Akun</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Debit</span>
                      </th>
                      <th class="px-2 py-2">
                        <span>Kredit</span>
                      </th>
                    </tr>
                  </thead>
                  {data.map((aset) => (
                    <tr>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">1 Januari 2021</div>
                      </td>
                      <td class="px-8 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">01-02</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">Rp, 0.00</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">Rp, 0.00</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">Rp.0,00</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">Data Dummy</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">Data Dummy</div>
                      </td>
                      <td class="px-2 py-2 whitespace-nowrap font-medium">
                        <div class="text-lg text-gray-900">Data Dummy</div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </div>
            </div>
          </Tabs>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  // Get Produk from API
  const asets = await prisma.aset.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return {
    props: {
      data: asets,
    },
  };
}
