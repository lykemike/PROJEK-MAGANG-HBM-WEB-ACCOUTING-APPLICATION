import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, Form, Button, FormCheck } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function Purchase_invoice({ data, data2 }) {
  const router = useRouter();
  const {id} = router.query;

  function cancelButton() {
    router.push(`../pembayaran/${id}`)
  }

  return (
    <Layout>
      <div>
        <h4>Transaksi</h4>
        <h4>Purchase Invoice # {id}</h4>
        <hr />
      </div>
      {data.map((i) => (
        <Form>
          <Row sm='12'>
            <Col sm='3'>
              <Form.Label className='font-medium'>Supplier: {i.kontak.nama} </Form.Label>
            </Col>

            <Col sm='3'>
              <Form.Label className='font-medium'>Email: {i.email}</Form.Label>
            </Col>
            <Col className='d-flex justify-content-end mr-3'>
              <Row>
                <h4 className='mr-2'>Total</h4>

                <h4>Rp. Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</h4>
              </Row>
            </Col>
          </Row>

          <hr />

          <div class='mb-10'>
            {data.map((i) => (
              <Row sm='12'>
                <Col sm='3'>
                  <Form.Label className='font-medium'>Alamat Supplier:</Form.Label>
                  <p>{i.alamat_supplier} </p>
                </Col>

                <Col sm='3'>
                  <Form.Label className='font-medium'>Tgl Invoice: </Form.Label>
                  <p>{i.tgl_transaksi} </p>
                  <Form.Label className='font-medium'>Tgl Jatuh Tempo: </Form.Label>
                  <p>{i.tgl_jatuh_tempo} </p>
                  {/* <Form.Label className='font-medium'>Syarat Pembayaran: {i.syarat_pembayaran}</Form.Label> */}
                  <Form.Label className='font-medium'>Syarat Pembayaran: Cash</Form.Label>
                </Col>

                <Col sm='3'>
                  <Form.Label className='font-medium'>No Transaksi: {i.no_transaksi} </Form.Label>
                  <br />
                  <Form.Label className='font-medium'>Tag: {i.tag} </Form.Label>
                  <br />
                  <Form.Label className='font-medium'>No Referensi Tagihan: {i.no_ref_penagihan} </Form.Label>
                </Col>
              </Row>
            ))}
          </div>
          <hr />

          <div class='mb-10'>
            <Row sm='10'>
              <Col sm='2'>
                <Form.Label className='font-medium'>Produk</Form.Label>
              </Col>

              <Col sm='2'>
                <Form.Label className='font-medium'>Deskripsi</Form.Label>
              </Col>

              <Col sm='2'>
                <Form.Label className='font-medium'>Harga Satuan</Form.Label>
              </Col>

              <Col sm='1'>
                <Form.Label className='font-medium'>Diskon</Form.Label>
              </Col>

              <Col sm='1'>
                <Form.Label className='font-medium'>Pajak</Form.Label>
              </Col>
              <Col sm='2'>
                <Form.Label className='font-medium'>Jumlah</Form.Label>
              </Col>
            </Row>

            <hr />
            {data2.map((i) => (
              <Row className='mb-12'>
                <Col sm='2'>
                  <p>{i.nama_produk}</p>
                </Col>

                <Col sm='2'>
                  <p>{i.desk_produk}</p>
                </Col>

                <Col sm='2'>
                  <p>Rp. {i.harga_satuan.toLocaleString({ minimumFractionDigits: 0 })}</p>
                </Col>

                <Col sm='1'>
                  <p>{i.diskon} %</p>
                </Col>

                <Col sm='1'>
                  <p>
                    {i.pajak_nama} - {i.pajak_persen} %
                  </p>
                </Col>

                <Col sm='2'>
                  <p>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</p>
                </Col>
              </Row>
            ))}
          </div>

          <div class='mt-20'>
            <Row sm='12'>
              <Col sm='3' />

              <Col sm='3' />
              <Col sm='3' />

              <Col sm='3'>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='6'>Sub Total</Col>
                  <Col sm='4'>Rp. {i.subtotal.toLocaleString({ minimumFractionDigits: 0 })}</Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='6'>Diskon</Col>
                  <Col sm='4'>Rp. {((i.total_diskon) + (i.total_pajak_per_baris)).toLocaleString({ minimumFractionDigits: 0 })}</Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='6'>Nama Pajak</Col>
                  <Col sm='4'>Rp. {i.total_pajak_per_baris.toLocaleString({ minimumFractionDigits: 0 })}</Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='6'>Total</Col>
                  <Col sm='4'>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='6'>Jumlah Pemotongan</Col>
                  <Col sm='4'>Rp. {i.pemotongan.toLocaleString({ minimumFractionDigits: 0 })}</Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='6'>Sudah Dibayar</Col>
                  <Col sm='4'>Rp. {i.uang_muka.toLocaleString({ minimumFractionDigits: 0 })}</Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formPlaintext'>
                  <Col sm='6'>Sisa Tagihan</Col>
                  <Col sm='4'>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</Col>
                </Form.Group>
              </Col>
            </Row>
          </div>

          <Row>
            <Col className='d-flex justify-content-end mt-10'>
              <Link href='/beli/pembelian'>
                <Button variant='danger mr-2'>Kembali</Button>
              </Link>
                <Button variant='success' onClick={cancelButton} >Bayar</Button>
            </Col>
          </Row>
        </Form>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const header = await prisma.headerPembelian.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      kontak: true,
      DetailPembelian: true,
    },
  });

  const detail = await prisma.detailPembelian.findMany({
    where: {
      header_pembelian_id: parseInt(id),
    },
    include: {
      header_pembelian: true,
      produk: true,
      pajak: true,
    },
  });

  return {
    props: {
      data: header,
      data2: detail,
    },
  };
}
