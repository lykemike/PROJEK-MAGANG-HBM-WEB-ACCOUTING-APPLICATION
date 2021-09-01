import React, { useRef } from "react";
import Layout from "../../components/layout";
import TableDetailRow from "../../components/TableDetailRow";
import TableDetailPenjualanRow from "../../components/TableDetailPenjualanRow";
import Link from "next/link";
import { Button, Table, DropdownButton, Row, Col, Form, FormControl, InputGroup, Dropdown } from "react-bootstrap";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporanjurnalumum({ header}) {
  console.log(header);

  return (
    <Layout>
      <div variant='container'>
       <Row>

       </Row>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {

  const header = await prisma.headerPenjualan.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      JurnalPenjualan: true
    }
  });


  return {
    props: {
      header: header,

    },
  };
}
