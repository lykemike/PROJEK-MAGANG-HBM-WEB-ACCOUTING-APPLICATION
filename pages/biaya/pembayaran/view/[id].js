import React from "react";
import Layout from "../../components/Layout";
import { Row, Col, Form, Button } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export default function pengirimanBayaran_invoice() {
  // Redirect Function and Take URL Parameter [id]
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div>
        <h4>Transaksi</h4>
        <Row>
          <Col>
            <h5>Expense #ID</h5>
          </Col>
          <Col className="d-flex justify-content-end"></Col>
        </Row>

        <hr />

        <Row>
          <Col sm="3">
            <Form.Label className="font-medium">Bayar Dari: </Form.Label>
            <p>Test</p>
          </Col>

          <Col className="d-flex justify-content-end mr-3">
            <Row>
              <h4 className="mr-2">Total Amount</h4>
              <h4 class="text-blue-600">Rp. 0,00</h4>
            </Row>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col sm="3">
            <Form.Label className="font-medium">Penerima: </Form.Label>
            <p>Test</p>
          </Col>

          <Col sm="3">
            <Form.Label className="font-medium">Cara Pembayaran</Form.Label>
            <p>Test</p>
          </Col>

          <Col sm="3">
            <Form.Label className="font-medium">Tgl Transaksi</Form.Label>
            <p>Test</p>
          </Col>

          <Col sm="3">
            <Form.Label className="font-medium">Tgl Jatuh Tempo</Form.Label>
            <p>Test</p>
          </Col>
        </Row>

        <Row>
          <Col sm="3">
            <Form.Label className="font-medium">No Transaksi</Form.Label>
            <p>Test</p>
          </Col>

          <Col sm="3">
            <Form.Label className="font-medium">Tag</Form.Label>
            <p>Test</p>
          </Col>

          <Col sm="3"></Col>

          <Col sm="3"></Col>
        </Row>

        <hr />
        <Row sm="12">
          <Col sm="3">
            <Form.Label className="font-medium">Nomor</Form.Label>
          </Col>

          {/* <Col sm="2">
						<Form.Label className="font-medium">Deskripsi</Form.Label>
					</Col> */}

          {/* <Col sm="3">
						<Form.Label className="font-medium">Tgl Jatuh Tempo</Form.Label>
					</Col> */}

          <Col sm="3">
            <Form.Label className="font-medium">Total</Form.Label>
          </Col>

          <Col sm="3">
            <Form.Label className="font-medium">Sisa Tagihan</Form.Label>
          </Col>

          <Col sm="3">
            <Form.Label className="font-medium">Jumlah</Form.Label>
          </Col>
        </Row>

        <hr />
        {/* {data.map((i) => ( */}
        <Row className="mb-12">
          <Col sm="3  ">
            <p></p>
          </Col>

          <Col sm="3">
            <p></p>
          </Col>

          <Col sm="3">
            <p></p>
          </Col>

          <Col sm="3">
            <p></p>
          </Col>
        </Row>
        <hr />

        <Row sm="12" className="mt-3">
          <Col sm="3" />

          <Col sm="3" />

          <Col sm="3">
            <h5>Total</h5>
          </Col>

          <Col sm="3">
            {/* <h4 name='total' >Rp. {parseInt(props.values.jumlah).toLocaleString({ minimumFractionDigits: 0 })}</h4> */}
          </Col>
        </Row>

        <hr />

        <Row className="mt-32">
          <Col className="d-flex justify-content-end">
            <Button variant="danger" className="mr-4">
              Kembali
            </Button>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

// export async function getServerSideProps() {
//     // // Get biaya from API
//     // const biayas = await prisma.headerBiaya.findMany({
//     //     orderBy:
//     //         [
//     //             {
//     //                 id: 'asc'
//     //             }
//     //         ],
//     //     include: {
//     //         detail_biaya: true,
// 	// 					akun: true,
// 	// 					kontak: true,
//     //     }
//     // });

//     // return {
//     //     props: {
//     //         data: biayas,
//     //     }
//     // }
// }
