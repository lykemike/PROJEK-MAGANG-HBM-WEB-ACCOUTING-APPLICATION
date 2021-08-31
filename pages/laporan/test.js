import React from "react";
import { PrismaClient } from "@prisma/client";
import Layout from "../../components/Layout";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

import Test from "../../components/Test";
import Test2 from "../../components/Test2";
const prisma = new PrismaClient();

export default function laporanbukubesar({ header, header2 }) {
  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          {header.map((data, index) => (
            <Test data={data} key={index} />
          ))}
          {header2.map((data, index) => (
            <Test2 key={index} data={data} index={index} />
          ))}
        </Table>
      </TableContainer>
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
