import React, { useState } from "react";
import { PrismaClient } from "@prisma/client";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { Button, Row, Col, Table, Form, FormControl } from "react-bootstrap";
import Add from "@material-ui/icons/Add";
// import TablePagination from "../../components/TablePagination";
// import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default function catatan_pelepasan_aset({ data, data2 }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      {(props) => (
        <div variant="container">
          <Row>
            <Col>
              <Row>
                <h4>Catatan Pelepasan Aset</h4>
              </Row>
            </Col>

            <Col className="d-flex justify-content-end"></Col>
          </Row>

          {/* <div className="mt-8">
                <Row className="mb-12">
						<Col sm="4">
							<p></p>
						</Col>

						<Col sm="2"></Col>

						<Col sm="3">
							<p>Debit</p>
						</Col>

						<Col sm="3">
							<p>Kredit</p>
						</Col>
					</Row>

                    <Row className="mb-12">
						<Col sm="2">
							<p>1-11001</p>
						</Col>

						<Col sm="2"></Col>

						<Col sm="2">
							<p>XXXX</p>
						</Col>

						<Col sm="2">
							<p>XXXX</p>
						</Col>

						<Col sm="2"></Col>

						<Col sm="2"></Col>
					</Row>
                </div> */}
          <table class="table mt-10">
            <caption></caption>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col">Debit</th>
                <th scope="col">Kredit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Biaya Akuisisi</th>
                <td>
                  <Form.Control as="select"></Form.Control>
                </td>
                <td></td>
                <td>XXXX</td>
                <td>XXX</td>
              </tr>
              <tr>
                <th>Testing Dat</th>
                <td>
                  <Form.Control as="select"></Form.Control>
                </td>
                <td></td>
                <td>XXXXX</td>

                <td>XXXX</td>
              </tr>
            </tbody>
          </table>

          <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">
            <button onclick="openModal(false)" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">
              Batal
            </button>
            <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Ubah</button>
          </div>
        </div>
      )}
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.query;
  // Get kontak,produk,pajak from API

  const pelepasanAset = await prisma.pelepasanAset.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      JurnalPelepasanAset: true,
    },
  });

  const Aset = await prisma.Aset.findmany({
    where: {
      id: parseInt(id),
    },
    include: {
      JurnalAset: true,
    },
  });

  return {
    props: {
      data: pelepasanAset,
      data2: Aset,
    },
  };
}
