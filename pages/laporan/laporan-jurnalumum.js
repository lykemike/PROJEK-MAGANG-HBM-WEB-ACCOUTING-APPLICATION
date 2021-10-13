import React, { useRef, useState, useMemo, useCallback } from "react";
import Layout from "../../components/layout";
import TableDetailRow from "../../components/JurnalUmum/TableDetailRow";
import TableDetailPenjualanRow from "../../components/JurnalUmum/TableDetailPenjualanRow";
import Link from "next/link";
import { Button, Table, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default function laporanjurnalumum({ header, header2, header3, header4, header5, header6 }) {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const onClick = () => {
    // Axios.get()
  };
  console.log(header);
  let debitAkhir = [];

  const [grandtotaldebit, setgrandtotaldebit] = useState(0);

  const setGrandTotalDebit = useCallback((nilai) => {
    debitAkhir.push({ nilai });
  }, []);

  console.log(debitAkhir.reduce((a, b) => (a = a + b.nilai), 0));
  return (
    <Layout>
      <div variant="container">
        <div></div>
        <h4 class="mb-6 mt-2">Jurnal Umum</h4>
        <div class="mb-10">
          <Row>
            <Col sm="3">
              <Form.Label>Tanggal Mulai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder="Pick date" type="date" aria-label="date" ref={tgl_mulai} />
              </InputGroup>
            </Col>
            <Col sm="3">
              <Form.Label>Tanggal Selesai</Form.Label>
              <InputGroup className="mb-3">
                <FormControl placeholder="Pick date" type="date" aria-label="date" ref={tgl_akhir} />
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
                <span class="text-gray-300">Header</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {header.map((data, index) => {
              return (
                <TableDetailPenjualanRow
                  key={index}
                  data={data}
                  index={index}
                  tipe="jurnal"
                  view="view2"
                  label="Journal Entry"
                  setgrandtotal={setGrandTotalDebit}
                />
              );
            })}
            {header2.map((data, index) => {
              return (
                <TableDetailPenjualanRow key={index} data={data} index={index} view="view2" setgrandtotal={setGrandTotalDebit} />
              );
            })}
            {header3.map((data, index) => {
              return (
                <TableDetailPenjualanRow
                  tipe="pembelian"
                  label="Purchase Invoice"
                  key={index}
                  data={data}
                  index={index}
                  view="view2"
                  setgrandtotal={setGrandTotalDebit}
                />
              );
            })}
            {header4.map((data, index) => {
              return (
                <TableDetailPenjualanRow
                  tipe="kirimUang"
                  label="Kirim Uang Invoice"
                  key={index}
                  data={data}
                  index={index}
                  view="view2"
                  setgrandtotal={setGrandTotalDebit}
                />
              );
            })}
            {header5.map((data, index) => {
              return (
                <TableDetailPenjualanRow
                  tipe="transferUang"
                  label="Transfer Uang Invoice"
                  key={index}
                  data={data}
                  index={index}
                  view="view2"
                  setgrandtotal={setGrandTotalDebit}
                />
              );
            })}
            {header6.map((data, index) => {
              return (
                <TableDetailPenjualanRow
                  tipe="terimaUang"
                  label="Terima Uang Invoice"
                  key={index}
                  data={data}
                  index={index}
                  view="view2"
                  setgrandtotal={setGrandTotalDebit}
                />
              );
            })}
            {/* {header7.map((data, index) => {
              return (
                <TableDetailPenjualanRow
                  tipe="biaya"
                  label="Expense Invoice"
                  key={index}
                  data={data}
                  index={index}
                />
              );
            })} */}
          </tbody>
          <tfoot>
            <tr>
              <td class="px-2 py-1" align="right">
                Grand Total
              </td>
              <td class="px-2 py-1">Rp. {console.log(debitAkhir)}</td>

              {/* <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td> */}
            </tr>
          </tfoot>
        </table>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const header = await prisma.headerJurnal.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      DetailJurnal: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getPenjualan = await prisma.headerPenjualan.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalPenjualan: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getPembelian = await prisma.headerPembelian.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalPembelian: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getKirimUang = await prisma.headerKirimUang.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalKirimUang: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getTransferUang = await prisma.transferUang.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalTransferUang: {
        include: {
          akun: true,
        },
      },
    },
  });

  const getTerimaUang = await prisma.headerTerimaUang.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      JurnalTerimaUang: {
        include: {
          akun: true,
        },
      },
    },
  });

  // const getBiaya = await prisma.headerBiaya.findMany({
  //   orderBy: {
  //     id: "asc",
  //   },
  //   include: {
  //     JurnalBiaya: {
  //       include: {
  //         akun1: true,
  //       },
  //     },
  //   },
  // });

  // const getPembelian = await prisma.headerPembelian.findMany({
  //   orderBy: {
  //     id: "asc",
  //   },
  //   include: {
  //     JurnalPembelian: true,
  //   },
  // });

  return {
    props: {
      header: header,
      header2: getPenjualan,
      header3: getPembelian,
      header4: getKirimUang,
      header5: getTransferUang,
      header6: getTerimaUang,
      // header7: getBiaya,
    },
  };
}
