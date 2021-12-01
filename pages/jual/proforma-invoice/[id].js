import React from "react";
import Layout from "../../../components/Layout";

import { Row, Col, Button, FormControl } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function salesInvoice({ header, detail, jurnal }) {
  const router = useRouter();
  const { id } = router.query;

  let min = "0";
  let max = "100";

  return (
    <div className="container">
      <Row>
        <Col>
          <label>Jakarta Barat 11470</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>INDONESIA</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Telp: +62 21 2789 3347</label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Fax : +62 21 2789 3348</label>
        </Col>
      </Row>

      <div className="border border-black">
        <div className="px-2 py-2">
          <Row>
            <Col sm="6">
              <label style={{ width: 60 }} className="font-medium mr-2">
                To:
              </label>
              <label>{header[0].nama_perusahaan}</label>
            </Col>
          </Row>

          <Row>
            <Col sm="6">
              <label style={{ width: 60 }} className="font-medium mr-2">
                Address:
              </label>
              <label>{header[0].alamat_penagihan}</label>
            </Col>
          </Row>

          <Row>
            <Col sm="6">
              <label style={{ width: 60 }} className="font-medium mr-2">
                Telepon:
              </label>
              <label className="mr-12">{header[0].kontak.nomor_telepon}</label>

              <label className="font-medium mr-2">Fax:</label>
              <label>{header[0].kontak.nomor_fax}</label>
            </Col>
          </Row>

          <Row>
            <Col sm="6">
              <label className="font-medium mr-2">Say:</label>
              <FormControl type="text" class="border-radius: 0" />
            </Col>
          </Row>

          <Row>
            <Col sm="6">
              <label className="font-medium mr-2">Presentase Penagihan: </label>
              <FormControl type="number" min={min} max={max} class="border-radius: 0" />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerPenjualan.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
    },
  });

  const detail = await prisma.detailPenjualan.findMany({
    where: {
      header_penjualan_id: parseInt(id),
    },
    include: {
      header_penjualan: true,
      produk: true,
    },
  });

  return {
    props: {
      header: header,
      detail: detail,
    },
  };
}
