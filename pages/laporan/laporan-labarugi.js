import React, { useRef } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import bebanLainnya from "../../components/LabaRugi/bebanLainnya";
import {
  Button,
  Table,
  DropdownButton,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
} from "react-bootstrap";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporan_neraca({ header, header2, header3 }) {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const onClick = () => {
    // Axios.get()
  };

  // var akumulasibeban = [
  //   { total: header.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0) },
  // ];

  // console.log(akumulasibeban);

  return (
    <Layout>
      <div variant="container">
        <h4 class="mb-8 mt-2">Laba Rugi</h4>
        <Row>
          <Col sm="3">
            <Form.Label>Tanggal Mulai</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Pick date"
                type="date"
                aria-label="date"
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
              />
            </InputGroup>
          </Col>

          <Col>
            <Button variant="primary mr-2 mt-7"> Filter</Button>
          </Col>
        </Row>

        <div class="flex flex-row-reverse">
          <DropdownButton
            variant="primary ml-2"
            id="dropdown-basic-button"
            title="Export"
          >
            <Dropdown.Item>
              <Link href="#">
                <a>PDF</a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
            <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
          </DropdownButton>
        </div>

        <Table class="table mt-4">
          <tbody>
            {header2.map((i) => (
              <tr>
                <td>Pendapatan dari Penjualan</td>
                <td></td>
                <td></td>
                <td>Rp. {i.nominal}</td>
              </tr>
            ))}

            {header3.map((i) => (
              <tr>
                <td>Harga Pokok Penjualan</td>
                <td></td>
                <td></td>
                <td>Rp. {i.nominal}</td>
              </tr>
            ))}

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Total Laba Kotor
                </div>
              </td>
              <td>
                <div class="text-md text-gray-900" />
              </td>
              <td>
                <div class="text-md font-medium text-gray-900"></div>
              </td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table class="table">
          <tbody>
            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Beban Operasional
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            {header.map((i) => (
              <tr>
                <td className="pl-5">
                  {i.kode_akun}-{i.nama_akun}
                </td>

                <td>
                  {/* Rp. {i.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0)} */}
                </td>
                <td></td>
                <td></td>
              </tr>
            ))}

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Pendapatan Bersih Operasional
                </div>
              </td>
              <td></td>
              <td className="pr-5">
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        <Table class="table">
          <tbody>
            <tr>
              <td>Pendapatan lainnya</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Beban lainnya</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Pendapatan Bersih Sebelum Pajak
                </div>
              </td>
              <td>
                <div class="text-md text-gray-900" />
              </td>
              <td>
                <div class="text-md font-medium text-gray-900"></div>
              </td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table class="table">
          <tbody>
            <tr>
              <td>Beban Pajak</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Pendapatan Bersih Sesudah Pajak
                </div>
              </td>
              <td>
                <div class="text-md text-gray-900" />
              </td>
              <td>
                <div class="text-md font-medium text-gray-900"></div>
              </td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const bebanLainnya = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: 17,
      },
    },
    // include: {
    //   DetailJurnal: true,
    // },
  });

  const pendapatanPenjualan = await prisma.jurnalPenjualan.findMany({
    where: {
      akun_id: {
        in: 120,
      },
    },
  });

  const hargaPokok = await prisma.jurnalPenjualan.findMany({
    where: {
      akun_id: {
        in: 26,
      },
    },
  });

  return {
    props: {
      header: bebanLainnya,
      header2: pendapatanPenjualan,
      header3: hargaPokok,
    },
  };
}
