import React, { useRef } from "react";
import Layout from "../../components/layout";
import TableDetailRow from "../../components/JurnalUmum/TableDetailRow";
import TableDetailPenjualanRow from "../../components/JurnalUmum/TableDetailPenjualanRow";
import Link from "next/link";
import { Button, Table, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporanjurnalumum({ header, header2}) {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const onClick = () => {
    // Axios.get()
  };
  console.log(header2);

  return (
    <Layout>
      <div variant='container'>
        <div></div>
        <h4 class='mb-6 mt-2'>Jurnal Umum</h4>
        <div class='mb-10'>
          <Row>
            <Col sm='3'>
              <Form.Label>Tanggal Mulai</Form.Label>
              <InputGroup className='mb-3'>
                <FormControl placeholder='Pick date' type='date' aria-label='date' ref={tgl_mulai} />
              </InputGroup>
            </Col>
            <Col sm='3'>
              <Form.Label>Tanggal Selesai</Form.Label>
              <InputGroup className='mb-3'>
                <FormControl placeholder='Pick date' type='date' aria-label='date' ref={tgl_akhir} />
              </InputGroup>
            </Col>

            <Col>
              <Button variant='primary mr-2 mt-7' onClick={onClick}>
                {" "}
                Filter
              </Button>
            </Col>
          </Row>

          <div class='flex flex-row-reverse'>
            <DropdownButton variant='primary ml-2' id='dropdown-basic-button' title='Export'>
              <Dropdown.Item>
                <Link href='#'>
                  <a>PDF</a>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item href='#/action-2'>XLS</Dropdown.Item>
              <Dropdown.Item href='#/action-2'>CSV</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <table class='min-w-full table-auto'>
          <thead class='justify-between'>
            <tr class='bg-dark'>
              <th class='px-2 py-2' colSpan='3'>
                <span class='text-gray-300'>Header</span>
              </th>
            </tr>
          </thead>
          <tbody class='bg-white divide-y divide-gray-200'>
            {header.map((data, index) => {
              return <TableDetailRow key={index} data={data} index={index} />;
            })}
            {header2.map((data, index) => {
              return <TableDetailPenjualanRow key={index} data={data} index={index} />;
            })}
            {/* {header3.map((data, index) => {
              return <TableDetailPenjualanRow tipe='pembelian' label='Purchase Invoice' key={index} data={data} index={index} />;
            })} */}
          </tbody>
          <tfoot>
            {/* <tr>
              <td class='px-2 py-1' align='right'>
                Grand Total
              </td>
              <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.debit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
              <td class='px-2 py-1'>Rp. {data.DetailJurnal.reduce((a, b) => (a = a + b.kredit), 0).toLocaleString({ minimumFractionDigits: 0 })}</td>
            </tr> */}
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
          akun: true
        }
      },
    },
  });

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
      // header3: getPembelian,
    },
  };
}
