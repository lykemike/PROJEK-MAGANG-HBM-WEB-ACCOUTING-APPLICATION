import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, Form, Button, FormCheck } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/Link";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function sales_invoice({ data, data2, data3 }) {
  const router = useRouter();
  const { id } = router.query;

  function pembayaran() {
    router.push(`../pembayaran-jual/${id}`);
  }

  function edit() {
    router.push(`../${id}`);
  }

  const diskon_total = data2.reduce((a, b) => (a = a + b.hasil_diskon), 0);
  const jurnal_penerimaan_pembayaran = data3.reduce((a, b) => (a = a + b.nominal), 0);

  return (
    <Layout>
      <div>
        <h4>Transaksi</h4>
        <h4>Sales Invoice # {id}</h4>
        <hr />
      </div>
      {data.map((i) => (
        <Form>
          <Row sm='12'>
            <Col sm='3'>
              <Form.Label className='font-medium'>Pelanggan: {i.kontak.nama} </Form.Label>
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
                  <Form.Label className='font-medium'>Alamat Penagihan:</Form.Label>
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
                  <Form.Label className='font-medium'>No Invoice: {i.no_transaksi} </Form.Label>
                  <br />
                  <Form.Label className='font-medium'>Tag: {i.tag} </Form.Label>
                  <br />
                  <Form.Label className='font-medium'>Nomor Kontrak: {i.no_ref_penagihan} </Form.Label>
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

              <Col sm='2'>
                <Form.Label className='font-medium'>Diskon</Form.Label>
              </Col>

              <Col sm='2'>
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

                <Col sm='2'>
                  <p>{i.diskon} %</p>
                </Col>

                <Col sm='2'>
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
                  <Col sm='4'>Rp. {(i.total_diskon + diskon_total).toLocaleString({ minimumFractionDigits: 0 })}</Col>
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
                  <Col sm='4'>Rp. {(i.uang_muka + jurnal_penerimaan_pembayaran).toLocaleString({ minimumFractionDigits: 0 })}</Col>
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
              <Button variant='primary mr-2'> Cetak </Button>
              <Link href='/jual/penerimaan-pembayaran'>
              <Button variant='secondary mr-2'>Ubah</Button>
                <Button variant='danger mr-2'>Batal</Button>
              </Link>
              <Button variant='success mr-2' onClick={pembayaran}>
                Bayar
              </Button>
              <Button variant='success' onClick={edit}>
                Ubah
              </Button>
            </Col>
          </Row>
        </Form>
      ))}
    </Layout>
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
      DetailPenjualan: true,
    },
  });

  const detail = await prisma.detailPenjualan.findMany({
    where: {
      header_penjualan_id: parseInt(id),
    },
    include: {
      header_penjualan: true,
      produk: true,
      pajak: true,
    },
  });

  const jurnal_penerimaan_pembayaran = await prisma.jurnalPenerimaanPembayaran.findMany({
    where: {
      header_penjualan_id: parseInt(id),
      tipe_saldo: "Debit"
    }
  })

  return {
    props: {
      data: header,
      data2: detail,
      data3: jurnal_penerimaan_pembayaran
    },
  };
}
