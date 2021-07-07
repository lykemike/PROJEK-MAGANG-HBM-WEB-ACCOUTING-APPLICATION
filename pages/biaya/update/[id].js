import React from "react";
import { Row, Col, FormCheck, Button } from "react-bootstrap";
import Link from "next/link";
import Layout from "../../../components/Layout";

import { useRouter } from "next/router";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function ViewBiaya({ data }) {
  // Redirect Function and Take URL Parameter [id]
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div>
        <h4 class='text-gray-500'>Biaya</h4>
        <Row>
          <Col>
            <h3 class='text-blue-600'>Pengeluaran #EXP001</h3>
          </Col>
          <Col className='d-flex justify-content-end'>
            <h3 class='text-black'>LUNAS</h3>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col sm='2'>
            <h5 className='mr-2'>Bayar Dari</h5>
          </Col>
          <Col sm='4'>
            {data.map((biaya) => (
              <h5 class='text-blue-600'>{biaya.akun1.nama_akun}</h5>
            ))}
          </Col>
          <Col sm='2' />
          <Col sm='2'>
            <h5 className='mr-2'>Total Amount</h5>
          </Col>
          <Col sm='2'>
            {data.map((biaya) => (
              <h5 class='text-blue-600'>Rp. {biaya.total.toLocaleString({ minimumFractionDigits: 0 })}</h5>
            ))}
          </Col>
        </Row>

        <hr />

        <Row>
          <Col sm='2'>
            <p className='font-medium'>Penerima:</p>
          </Col>
          <Col sm='2'>
            {data.map((biaya) => (
              <p>{biaya.kontak.nama}</p>
            ))}
          </Col>

          <Col sm='2'>
            <p className='font-medium'>Tanggal Transaksi:</p>
          </Col>
          <Col sm='2'>
            {data.map((biaya) => (
              <p>{biaya.tgl_transaksi}</p>
            ))}
          </Col>

          <Col sm='2'>
            <p className='font-medium'>No Transaksi:</p>
          </Col>
          <Col sm='2'>
            {data.map((biaya) => (
              <p>{biaya.no_transaksi}</p>
            ))}
          </Col>

          <Col sm='2'>
            <p className='font-medium'>Alamat Penagihan:</p>
          </Col>
          <Col sm='2'>
            {data.map((biaya) => (
              <p>{biaya.alamat_penagihan}</p>
            ))}
          </Col>

          <Col sm='2'>
            <p className='font-medium'>Cara Pembayaran:</p>
          </Col>
          <Col sm='2'>
            {data.map((biaya) => (
              <p>{biaya.cara_pembayaran}</p>
            ))}
          </Col>

          <Col sm='2'>
            <p className='font-medium'>Tag:</p>
          </Col>
          <Col sm='2'>
            {data.map((biaya) => (
              <p>{biaya.tag}</p>
            ))}
          </Col>

          <Col sm='4' />
        </Row>

        <table class='min-w-full table-auto mt-12'>
          <thead class='justify-between'>
            <tr class='bg-dark'>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Akun Biaya</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Deskripsi</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Pajak</span>
              </th>
              <th class='px-2 py-2 d-flex justify-content-end'>
                <span class='text-gray-300'>Jumlah (dalam IDR)</span>
              </th>
            </tr>
          </thead>
          <tbody class='bg-white divide-y divide-gray-200'>
            {data.map((biaya) => (
              <tr>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{biaya.detail_biaya.deskripsi}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>Testing</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>13%</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap d-flex justify-content-end'>
                  <div class='text-sm text-gray-900'>Rp. 130,000</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <Row sm='12'>
          <Col sm='4' />
          <Col sm='4' />
          <Col sm='2'>
            <p>Subtotal</p>
            <p>Pajak</p>
            <p>Total</p>
            <p>Jumlah Pemotongan</p>
            <p>Sudah Dibayar</p>
            <h4>Sisa Tagihan</h4>
          </Col>

          {data.map((biaya) => (
            <Col sm='2'>
              <p>Rp. {biaya.subtotal.toLocaleString({ minimumFractionDigits: 0 })}</p>
              <p>Rp. {biaya.pajak.toLocaleString({ minimumFractionDigits: 0 })}</p>
              <p>Rp. {biaya.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
              <p>Rp. {biaya.pemotongan.toLocaleString({ minimumFractionDigits: 0 })}</p>
              <p>Rp. {biaya.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
              <h4>Rp. 0,00</h4>
            </Col>
          ))}
        </Row>

        <hr />

        <Row className='mt-32'>
          <Col>
            <Button variant='secondary'>Hapus</Button>
          </Col>

          <Col>
            <Button variant='primary'>Cetak</Button>
          </Col>

          <Col className='d-flex justify-content-end'>
            <Button variant='danger' className='mr-4'>
              Kembali
            </Button>
            <Button variant='success'>Ubah</Button>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  // Get biaya from API
  const biayas = await prisma.headerBiaya.findMany({
    where: {
      id: parseInt(id),
    },
    include: {
      detail_biaya: true,
      akun1: true,
      kontak: true,
    },
  });

  // const detail = await prisma.detailBiaya.findyMany({
  //   orderBy: {
  //     id: "asc",
  //   },
  // });

  return {
    props: {
      data: biayas,
      // data2: detail,
    },
  };
}
