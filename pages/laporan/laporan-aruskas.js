import React, { useRef, useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import {
  Button,
  Table,
  DropdownButton,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Dropdown,
} from "react-bootstrap";
import SettingsIcon from "@material-ui/icons/Settings";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporan_neraca({
  header,
  header2,
  header3,
  header4,
  header5,
  header6,
  header7,
  header8,
  header9,
  header10,
}) {
  const [countHeader, setCountHeader] = useState(0);
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const onClick = () => {
    // Axios.get()
  };

  const penyesuaian = (
    tipeSaldo,
    detailjurnal,
    jurnalpembelian,
    jurnalpenjualan,
    jurnalbiaya,
    jurnalkirimuang,
    jurnaltransferuang,
    jurnalterimauang
  ) => {
    let detailJurnal =
      detailjurnal?.length > 0
        ? detailjurnal
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalPembelian =
      jurnalpembelian?.length > 0
        ? jurnalpembelian
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalPenjualan =
      jurnalpenjualan?.length > 0
        ? jurnalpenjualan
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalBiaya =
      jurnalbiaya?.length > 0
        ? jurnalbiaya
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalKirimuang =
      jurnalkirimuang?.length > 0
        ? jurnalkirimuang
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalTransferuang =
      jurnaltransferuang?.length > 0
        ? jurnaltransferuang
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    let jurnalTerimauang =
      jurnalterimauang?.length > 0
        ? jurnalterimauang
            ?.filter((i) => i.tipe_saldo === tipeSaldo)
            .reduce((a, b) => (a = a + b.nominal), 0)
        : 0;

    return (
      detailJurnal +
      jurnalPembelian +
      jurnalPenjualan +
      jurnalBiaya +
      jurnalKirimuang +
      jurnalTransferuang +
      jurnalTerimauang
    );
  };

  const saldoakhir = (saldoawaldebit, saldoawalkredit, debit, kredit, tipe) => {
    if (saldoawaldebit < 1) {
      let hitung_kredit = saldoawalkredit + kredit;
      if (hitung_kredit > debit) {
        // masuk ke kredit
        if (tipe === "Kredit") {
          return hitung_kredit - debit;
        } else {
          return 0;
        }
      } else {
        if (tipe === "Kredit") {
          return 0;
        } else {
          return debit - hitung_kredit;
        }
      }
    } else {
      let hitung_debit = saldoawaldebit + debit;
      if (hitung_debit > kredit) {
        // masuk ke debit
        if (tipe === "Debit") {
          return hitung_debit - kredit;
        } else {
          return 0;
        }
      } else {
        if (tipe === "Debit") {
          // masuk ke kredit
          return 0;
        } else {
          return kredit - hitung_debit;
        }
      }
    }
  };

  const summary = (kredit, debit) => {
    return debit + kredit;
  };

  console.log(header, header2);

  return (
    <Layout>
      <div variant="container">
        <div></div>
        <h4 class="mb-8 mt-3">Arus Kas</h4>

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
            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Arus kas dari Aktivitas Operasional
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Penerimaan dari pelanggan</td>
              <td></td>
              <td></td>
              <td>
                {" "}
                Rp.{" "}
                {header.length > 0 &&
                  header.map((data, index) => {
                    setCountHeader((prevState) => {
                      return (prevState += summary(
                        saldoakhir(
                          data.DetailSaldoAwal[0].debit,
                          data.DetailSaldoAwal[0].kredit,
                          penyesuaian(
                            "Debit",
                            header.DetailJurnal,
                            header.JurnalBiaya,
                            header.JurnalKirimUang,
                            header.JurnalTerimaUang,
                            header.JurnalPenjualan,
                            header.JurnalPembelian,
                            header.JurnalTransferUang
                          ),
                          penyesuaian(
                            "Kredit",
                            header.DetailJurnal,
                            header.JurnalBiaya,
                            header.JurnalKirimUang,
                            header.JurnalTerimaUang,
                            header.JurnalPenjualan,
                            header.JurnalPembelian,
                            header.JurnalTransferUang
                          ),
                          "Debit"
                        ),
                        saldoakhir(
                          data.DetailSaldoAwal[0].debit,
                          data.DetailSaldoAwal[0].kredit,
                          penyesuaian(
                            "Debit",
                            header.DetailJurnal,
                            header.JurnalBiaya,
                            header.JurnalKirimUang,
                            header.JurnalTerimaUang,
                            header.JurnalPenjualan,
                            header.JurnalPembelian,
                            header.JurnalTransferUang
                          ),
                          penyesuaian(
                            "Kredit",
                            header.DetailJurnal,
                            header.JurnalBiaya,
                            header.JurnalKirimUang,
                            header.JurnalTerimaUang,
                            header.JurnalPenjualan,
                            header.JurnalPembelian,
                            header.JurnalTransferUang
                          ),
                          "Kredit"
                        )
                      ));
                    });
                    if (index === header.length - 1) {
                      return countHeader;
                    }
                  })}
              </td>
            </tr>

            <tr>
              <td>Aset lancar lainnya</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header2.DetailSaldoAwal[0].debit,
                    header2.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header2.DetailJurnal,
                      header2.JurnalBiaya,
                      header2.JurnalKirimUang,
                      header2.JurnalTerimaUang,
                      header2.JurnalPenjualan,
                      header2.JurnalPembelian,
                      header2.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header2.DetailJurnal,
                      header2.JurnalBiaya,
                      header2.JurnalKirimUang,
                      header2.JurnalTerimaUang,
                      header2.JurnalPenjualan,
                      header2.JurnalPembelian,
                      header2.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header2.DetailSaldoAwal[0].debit,
                    header2.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header2.DetailJurnal,
                      header2.JurnalBiaya,
                      header2.JurnalKirimUang,
                      header2.JurnalTerimaUang,
                      header2.JurnalPenjualan,
                      header2.JurnalPembelian,
                      header2.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header2.DetailJurnal,
                      header2.JurnalBiaya,
                      header2.JurnalKirimUang,
                      header2.JurnalTerimaUang,
                      header2.JurnalPenjualan,
                      header2.JurnalPembelian,
                      header2.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>Pembayaran ke pemasok</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header3.DetailSaldoAwal[0].debit,
                    header3.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header3.DetailJurnal,
                      header3.JurnalBiaya,
                      header3.JurnalKirimUang,
                      header3.JurnalTerimaUang,
                      header3.JurnalPenjualan,
                      header3.JurnalPembelian,
                      header3.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header3.DetailJurnal,
                      header3.JurnalBiaya,
                      header3.JurnalKirimUang,
                      header3.JurnalTerimaUang,
                      header3.JurnalPenjualan,
                      header3.JurnalPembelian,
                      header3.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header3.DetailSaldoAwal[0].debit,
                    header3.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header3.DetailJurnal,
                      header3.JurnalBiaya,
                      header3.JurnalKirimUang,
                      header3.JurnalTerimaUang,
                      header3.JurnalPenjualan,
                      header3.JurnalPembelian,
                      header3.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header3.DetailJurnal,
                      header3.JurnalBiaya,
                      header3.JurnalKirimUang,
                      header3.JurnalTerimaUang,
                      header3.JurnalPenjualan,
                      header3.JurnalPembelian,
                      header3.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>Kartu kredit dan liabilitas jangka pendek lainnya</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header4.DetailSaldoAwal[0].debit,
                    header4.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header4.DetailJurnal,
                      header4.JurnalBiaya,
                      header4.JurnalKirimUang,
                      header4.JurnalTerimaUang,
                      header4.JurnalPenjualan,
                      header4.JurnalPembelian,
                      header4.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header4.DetailJurnal,
                      header4.JurnalBiaya,
                      header4.JurnalKirimUang,
                      header4.JurnalTerimaUang,
                      header4.JurnalPenjualan,
                      header4.JurnalPembelian,
                      header4.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header4.DetailSaldoAwal[0].debit,
                    header4.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header4.DetailJurnal,
                      header4.JurnalBiaya,
                      header4.JurnalKirimUang,
                      header4.JurnalTerimaUang,
                      header4.JurnalPenjualan,
                      header4.JurnalPembelian,
                      header4.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header4.DetailJurnal,
                      header4.JurnalBiaya,
                      header4.JurnalKirimUang,
                      header4.JurnalTerimaUang,
                      header4.JurnalPenjualan,
                      header4.JurnalPembelian,
                      header4.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>Pendapatan lainnya</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header5.DetailSaldoAwal[0].debit,
                    header5.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header5.DetailJurnal,
                      header5.JurnalBiaya,
                      header5.JurnalKirimUang,
                      header5.JurnalTerimaUang,
                      header5.JurnalPenjualan,
                      header5.JurnalPembelian,
                      header5.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header5.DetailJurnal,
                      header5.JurnalBiaya,
                      header5.JurnalKirimUang,
                      header5.JurnalTerimaUang,
                      header5.JurnalPenjualan,
                      header5.JurnalPembelian,
                      header5.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header5.DetailSaldoAwal[0].debit,
                    header5.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header5.DetailJurnal,
                      header5.JurnalBiaya,
                      header5.JurnalKirimUang,
                      header5.JurnalTerimaUang,
                      header5.JurnalPenjualan,
                      header5.JurnalPembelian,
                      header5.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header5.DetailJurnal,
                      header5.JurnalBiaya,
                      header5.JurnalKirimUang,
                      header5.JurnalTerimaUang,
                      header5.JurnalPenjualan,
                      header5.JurnalPembelian,
                      header5.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>Pengeluaran operasional</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header6.DetailSaldoAwal[0].debit,
                    header6.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header6.DetailJurnal,
                      header6.JurnalBiaya,
                      header6.JurnalKirimUang,
                      header6.JurnalTerimaUang,
                      header6.JurnalPenjualan,
                      header6.JurnalPembelian,
                      header6.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header6.DetailJurnal,
                      header6.JurnalBiaya,
                      header6.JurnalKirimUang,
                      header6.JurnalTerimaUang,
                      header6.JurnalPenjualan,
                      header6.JurnalPembelian,
                      header6.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header6.DetailSaldoAwal[0].debit,
                    header6.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header6.DetailJurnal,
                      header6.JurnalBiaya,
                      header6.JurnalKirimUang,
                      header6.JurnalTerimaUang,
                      header6.JurnalPenjualan,
                      header6.JurnalPembelian,
                      header6.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header6.DetailJurnal,
                      header6.JurnalBiaya,
                      header6.JurnalKirimUang,
                      header6.JurnalTerimaUang,
                      header6.JurnalPenjualan,
                      header6.JurnalPembelian,
                      header6.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kas bersih yang diperoleh dari Aktivitas Operasional
                </div>
              </td>
              <td></td>
              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Arus kas dari Aktivitas Investasi
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Perolehan/Penjualan aset</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header7.DetailSaldoAwal[0].debit,
                    header7.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header7.DetailJurnal,
                      header7.JurnalBiaya,
                      header7.JurnalKirimUang,
                      header7.JurnalTerimaUang,
                      header7.JurnalPenjualan,
                      header7.JurnalPembelian,
                      header7.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header7.DetailJurnal,
                      header7.JurnalBiaya,
                      header7.JurnalKirimUang,
                      header7.JurnalTerimaUang,
                      header7.JurnalPenjualan,
                      header7.JurnalPembelian,
                      header7.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header7.DetailSaldoAwal[0].debit,
                    header7.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header7.DetailJurnal,
                      header7.JurnalBiaya,
                      header7.JurnalKirimUang,
                      header7.JurnalTerimaUang,
                      header7.JurnalPenjualan,
                      header7.JurnalPembelian,
                      header7.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header7.DetailJurnal,
                      header7.JurnalBiaya,
                      header7.JurnalKirimUang,
                      header7.JurnalTerimaUang,
                      header7.JurnalPenjualan,
                      header7.JurnalPembelian,
                      header7.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>Aktivitas investasi lainnya</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header8.DetailSaldoAwal[0].debit,
                    header8.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header8.DetailJurnal,
                      header8.JurnalBiaya,
                      header8.JurnalKirimUang,
                      header8.JurnalTerimaUang,
                      header8.JurnalPenjualan,
                      header8.JurnalPembelian,
                      header8.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header8.DetailJurnal,
                      header8.JurnalBiaya,
                      header8.JurnalKirimUang,
                      header8.JurnalTerimaUang,
                      header8.JurnalPenjualan,
                      header8.JurnalPembelian,
                      header8.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header8.DetailSaldoAwal[0].debit,
                    header8.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header8.DetailJurnal,
                      header8.JurnalBiaya,
                      header8.JurnalKirimUang,
                      header8.JurnalTerimaUang,
                      header8.JurnalPenjualan,
                      header8.JurnalPembelian,
                      header8.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header8.DetailJurnal,
                      header8.JurnalBiaya,
                      header8.JurnalKirimUang,
                      header8.JurnalTerimaUang,
                      header8.JurnalPenjualan,
                      header8.JurnalPembelian,
                      header8.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kas bersih yang diperoleh dari Aktivitas Investasi
                </div>
              </td>

              <td></td>
              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Arus kas dari Aktivitas Pendanaan
                </div>
              </td>

              <td></td>
              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900"></div>
              </td>
            </tr>

            <tr>
              <td>Pembayaran/Penerimaan pinjaman</td>
              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header9.DetailSaldoAwal[0].debit,
                    header9.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header9.DetailJurnal,
                      header9.JurnalBiaya,
                      header9.JurnalKirimUang,
                      header9.JurnalTerimaUang,
                      header9.JurnalPenjualan,
                      header9.JurnalPembelian,
                      header9.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header9.DetailJurnal,
                      header9.JurnalBiaya,
                      header9.JurnalKirimUang,
                      header9.JurnalTerimaUang,
                      header9.JurnalPenjualan,
                      header9.JurnalPembelian,
                      header9.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header9.DetailSaldoAwal[0].debit,
                    header9.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header9.DetailJurnal,
                      header9.JurnalBiaya,
                      header9.JurnalKirimUang,
                      header9.JurnalTerimaUang,
                      header9.JurnalPenjualan,
                      header9.JurnalPembelian,
                      header9.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header9.DetailJurnal,
                      header9.JurnalBiaya,
                      header9.JurnalKirimUang,
                      header9.JurnalTerimaUang,
                      header9.JurnalPenjualan,
                      header9.JurnalPembelian,
                      header9.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>Ekuitas/Modal</td>

              <td></td>
              <td></td>
              <td>
                {/* {" "}
                Rp.{" "}
                {summary(
                  saldoakhir(
                    header10.DetailSaldoAwal[0].debit,
                    header10.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header10.DetailJurnal,
                      header10.JurnalBiaya,
                      header10.JurnalKirimUang,
                      header10.JurnalTerimaUang,
                      header10.JurnalPenjualan,
                      header10.JurnalPembelian,
                      header10.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header10.DetailJurnal,
                      header10.JurnalBiaya,
                      header10.JurnalKirimUang,
                      header10.JurnalTerimaUang,
                      header10.JurnalPenjualan,
                      header10.JurnalPembelian,
                      header10.JurnalTransferUang
                    ),
                    "Debit"
                  ),
                  saldoakhir(
                    header10.DetailSaldoAwal[0].debit,
                    header10.DetailSaldoAwal[0].kredit,
                    penyesuaian(
                      "Debit",
                      header10.DetailJurnal,
                      header10.JurnalBiaya,
                      header10.JurnalKirimUang,
                      header10.JurnalTerimaUang,
                      header10.JurnalPenjualan,
                      header10.JurnalPembelian,
                      header10.JurnalTransferUang
                    ),
                    penyesuaian(
                      "Kredit",
                      header10.DetailJurnal,
                      header10.JurnalBiaya,
                      header10.JurnalKirimUang,
                      header10.JurnalTerimaUang,
                      header10.JurnalPenjualan,
                      header10.JurnalPembelian,
                      header10.JurnalTransferUang
                    ),
                    "Kredit"
                  )
                ).toLocaleString({ minimumFractionDigits: 0 })} */}
              </td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kas bersih yang diperoleh dari Aktivitas Pendanaan
                </div>
              </td>

              <td></td>
              <td></td>

              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kenaikan (penurunan) kas
                </div>
              </td>
              <td></td>

              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Saldo kas awal
                </div>
              </td>
              <td></td>

              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Saldo kas akhir
                </div>
              </td>
              <td></td>

              <td></td>
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
  //AKTIVITAS OPERASIONAL
  const penerimaanPelanggan = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13, 1],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const asetLancarLainnya = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [2],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const pembayaranPemasok = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [15, 8],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const kartuKreditdanLiabilitas = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [10],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const pendapatanLainnya = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [14],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const pengeluaranOperasional = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [13, 1],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  //AKTIVITAS INVESTASI

  const penjualanAset = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [5],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const investasiLainnya = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [6],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  //AKTIVITAS PENDANAAN
  const penerimaanpeminjaman = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [11],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  const modal = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [12],
      },
    },
    include: {
      DetailSaldoAwal: true,
      DetailJurnal: true,
      JurnalPembelian: true,
      JurnalPenjualan: true,
      JurnalBiaya: true,
      JurnalTransferUang: true,
      JurnalKirimUang: true,
      JurnalTerimaUang: true,
    },
  });

  return {
    props: {
      header: penerimaanPelanggan,
      header2: asetLancarLainnya,
      header3: pembayaranPemasok,
      header4: kartuKreditdanLiabilitas,
      header5: pendapatanLainnya,
      header6: pengeluaranOperasional,
      header7: penjualanAset,
      header8: investasiLainnya,
      header9: penerimaanpeminjaman,
      header10: modal,
    },
  };
}
