import React, { useRef } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import AsetTetap from "../../components/Neraca/AsetTetap";
import AsetLancar from "../../components/Neraca/AsetLancar";
import AsetLainnya from "../../components/Neraca/AsetLainnya";
import LiabilitasJangkaPendek from "../../components/Neraca/LiabilitasJangkaPendek";
import LiabilitasJangkaPanjang from "../../components/Neraca/LiabilitasJangkaPanjang";
import Modal from "../../components/Neraca/Modal";
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

export default function laporan_neraca({
  header,
  header2,
  header3,
  header4,
  header5,
  header6,
}) {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const onClick = () => {
    // Axios.get()
  };

  console.log(header);

  return (
    <Layout>
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
                  ref={tgl_mulai}
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
                  ref={tgl_akhir}
                />
              </InputGroup>
            </Col>

            <Col>
              <Button variant="primary mr-2 mt-7" onClick={onClick}>
                {" "}
                Filter
              </Button>
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
              <LiabilitasJangkaPendek
                label="Liabilitas Jangka Pendek"
                data={header4}
              />
              <tr>
                <td>Total Liabilitas Jangka Pendek</td>
                <td class="pl-5">XXX</td>
              </tr>

              <LiabilitasJangkaPanjang
                label="Liabilitas Jangka Panjang"
                data={header5}
              />
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
    </Layout>
  );
}

export async function getServerSideProps() {
  const asetLancar = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [3, 1, 2, 4],
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

  const asetTetap = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [5, 7],
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

  const asetLainnya = await prisma.akun.findMany({
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

  const liabilitasjkpendek = await prisma.akun.findMany({
    where: {
      kategoriId: {
        in: [8, 10],
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

  const liabilitasjkpanjang = await prisma.akun.findMany({
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

  // const penyesuaian = (
  //   tipeSaldo,
  //   detailjurnal,
  //   jurnalpembelian,
  //   jurnalpenjualan,
  //   jurnalbiaya,
  //   jurnalkirimuang,
  //   jurnaltransferuang,
  //   jurnalterimauang
  // ) => {
  //   let detailJurnal =
  //     detailjurnal?.length > 0
  //       ? detailjurnal
  //           ?.filter((i) => i.tipe_saldo === tipeSaldo)
  //           .reduce((a, b) => (a = a + b.nominal), 0)
  //       : 0;

  //   let jurnalPembelian =
  //     jurnalpembelian?.length > 0
  //       ? jurnalpembelian
  //           ?.filter((i) => i.tipe_saldo === tipeSaldo)
  //           .reduce((a, b) => (a = a + b.nominal), 0)
  //       : 0;

  //   let jurnalPenjualan =
  //     jurnalpenjualan?.length > 0
  //       ? jurnalpenjualan
  //           ?.filter((i) => i.tipe_saldo === tipeSaldo)
  //           .reduce((a, b) => (a = a + b.nominal), 0)
  //       : 0;

  //   let jurnalBiaya =
  //     jurnalbiaya?.length > 0
  //       ? jurnalbiaya
  //           ?.filter((i) => i.tipe_saldo === tipeSaldo)
  //           .reduce((a, b) => (a = a + b.nominal), 0)
  //       : 0;

  //   let jurnalKirimuang =
  //     jurnalkirimuang?.length > 0
  //       ? jurnalkirimuang
  //           ?.filter((i) => i.tipe_saldo === tipeSaldo)
  //           .reduce((a, b) => (a = a + b.nominal), 0)
  //       : 0;

  //   let jurnalTransferuang =
  //     jurnaltransferuang?.length > 0
  //       ? jurnaltransferuang
  //           ?.filter((i) => i.tipe_saldo === tipeSaldo)
  //           .reduce((a, b) => (a = a + b.nominal), 0)
  //       : 0;

  //   let jurnalTerimauang =
  //     jurnalterimauang?.length > 0
  //       ? jurnalterimauang
  //           ?.filter((i) => i.tipe_saldo === tipeSaldo)
  //           .reduce((a, b) => (a = a + b.nominal), 0)
  //       : 0;

  //   return (
  //     detailJurnal +
  //     jurnalPembelian +
  //     jurnalPenjualan +
  //     jurnalBiaya +
  //     jurnalKirimuang +
  //     jurnalTransferuang +
  //     jurnalTerimauang
  //   );
  // };

  // const saldoakhir = (saldoawaldebit, saldoawalkredit, debit, kredit, tipe) => {
  //   if (saldoawaldebit < 1) {
  //     let hitung_kredit = saldoawalkredit + kredit;
  //     if (hitung_kredit > debit) {
  //       // masuk ke kredit
  //       if (tipe === "Kredit") {
  //         return hitung_kredit - debit;
  //       } else {
  //         return 0;
  //       }
  //     } else {
  //       if (tipe === "Kredit") {
  //         return 0;
  //       } else {
  //         return debit - hitung_kredit;
  //       }
  //     }
  //   } else {
  //     let hitung_debit = saldoawaldebit + debit;
  //     if (hitung_debit > kredit) {
  //       // masuk ke debit
  //       if (tipe === "Debit") {
  //         return hitung_debit - kredit;
  //       } else {
  //         return 0;
  //       }
  //     } else {
  //       if (tipe === "Debit") {
  //         // masuk ke kredit
  //         return 0;
  //       } else {
  //         return kredit - hitung_debit;
  //       }
  //     }
  //   }
  // };

  // const totalsaldo =
  // {penyesuaian(
  //   "Debit",
  //   aset.DetailJurnal,
  //   aset.JurnalBiaya,
  //   aset.JurnalKirimUang,
  //   aset.JurnalTerimaUang,
  //   aset.JurnalPenjualan,
  //   aset.JurnalPembelian,
  //   aset.JurnalTransferUang
  // ).toLocaleString({ minimumFractionDigits: 0 })} +

  // {penyesuaian(
  //   "Kredit",
  //   aset.DetailJurnal,
  //   aset.JurnalBiaya,
  //   aset.JurnalKirimUang,
  //   aset.JurnalTerimaUang,
  //   aset.JurnalPenjualan,
  //   aset.JurnalPembelian,
  //   aset.JurnalTransferUang
  // ).toLocaleString({ minimumFractionDigits: 0 })}

  return {
    props: {
      header: asetLancar,
      header2: asetTetap,
      header3: asetLainnya,
      header4: liabilitasjkpendek,
      header5: liabilitasjkpanjang,
      header6: modal,
    },
  };
}
