import React from "react";
import Layout from "../../../components/Layout";
import { Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function salesInvoice({ data, header }) {
  const router = useRouter();
  const { id } = router.query;

  function pembayaran() {
    router.push(`../pembayaran-jual/${id}`);
  }

  function edit() {
    router.push(`../${id}`);
  }

  function cetak() {
    router.push(`../cetak/${id}`);
  }

  const jurnal_penerimaan_pembayaran = header[0].JurnalPenerimaanPembayaran.filter((i) => i.tipe_saldo === "Debit").reduce((a, b) => (a = a + b.nominal), 0);
  return (
    <Layout>
      <div>
        <Row>
          <Col>
            <h5>Transaksi</h5>
            <h3 className='text-blue-600'>Sales Invoice #{id}</h3>
          </Col>
          <Col>
            <h3>{header[0].sisa_tagihan > 0 ? <h3 className='mt-2 mb-3 float-right'>Terbayar Sebagian</h3> : <h3 className='mt-2 mb-3 float-right text-green-500'>Lunas</h3>}</h3>
          </Col>
        </Row>

        <hr />

        {header.map((i) => (
          <Row>
            <Col sm='4'>
              <Row>
                <p className='font-medium ml-2'>Pelanggan: </p>
                <p className='ml-2'>{i.kontak.nama}</p>
              </Row>
            </Col>
            <Col sm='4'>
              <Row>
                <p className='font-medium'>Email: </p>
                <p className='ml-2'>{i.email}</p>
              </Row>
            </Col>
            <Col sm='4'>
              <Row className='mt-2 mb-3 float-right'>
                <h3>Total Amount</h3>
                <h3 className=' text-blue-600 ml-2'>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</h3>
              </Row>
            </Col>
          </Row>
        ))}

        <hr />

        {header.map((i) => (
          <Row>
            <Col sm='4'>
              <Row>
                <p className='font-medium ml-2'>Alamat Penagihan: </p>
              </Row>
              <p className='ml-2'>{i.alamat_supplier}</p>
            </Col>

            <Col sm='4'>
              <Row>
                <p className='font-medium'>Tanggal Transaksi: </p>
                <p className='ml-2'>{i.tgl_transaksi}</p>
              </Row>
              <Row>
                <p className='font-medium'>Tanggal Jatuh Tempo: </p>
                <p className='ml-2'>{i.tgl_jatuh_tempo}</p>
              </Row>
              <Row>
                <p className='font-medium'>Syarat Pembayaran: </p>
                <p className='ml-2'>{data.nama_pembayaran}</p>
              </Row>
            </Col>

            <Col sm='4'>
              <Row>
                <p className='font-medium'>No. Transaksi:</p>
                <p className='ml-2'>Sales Invoice #{i.no_transaksi}</p>
              </Row>
              <Row>
                <p className='font-medium'>Tag: </p>
                <p className='ml-2'>{i.tag}</p>
              </Row>
              <Row>
                <p className='font-medium'>No. Kontrak: </p>
                <p className='ml-2'>{i.no_ref_penagihan}</p>
              </Row>
            </Col>
          </Row>
        ))}

        <table class='min-w-full table-auto mt-12'>
          <thead class='justify-between'>
            <tr class='bg-dark'>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Produk</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Deskripsi</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Kuantitas</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Satuan</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Harga Satuan</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Diskon</span>
              </th>
              <th class='px-2 py-2'>
                <span class='text-gray-300'>Jumlah</span>
              </th>
            </tr>
          </thead>

          {header[0].DetailPenjualan.map((i) => (
            <tbody class='bg-white divide-y divide-gray-200'>
              <tr>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{i.produk.nama}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{i.desk_produk}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{i.kuantitas}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{i.satuan}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>Rp. {i.harga_satuan.toLocaleString({ minimumFractionDigits: 0 })}</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>{i.diskon}%</div>
                </td>
                <td class='px-2 py-2 whitespace-nowrap'>
                  <div class='text-sm text-gray-900'>Rp. {i.jumlah.toLocaleString({ minimumFractionDigits: 0 })}</div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <hr />

        {header.map((i) => (
          <Row>
            <Col sm='4'></Col>
            <Col sm='4'></Col>
            <Col sm='4'>
              <Row>
                <Col>
                  <p className='font-medium d-flex justify-content-end'>Subtotal</p>
                  <p className='font-medium d-flex justify-content-end'>Diskon</p>
                  <p className='font-medium d-flex justify-content-end'>Total</p>
                  <p className='font-medium d-flex justify-content-end'>Jumlah Pemotongan</p>
                  <p className='font-medium d-flex justify-content-end'>Sudah Dibayar</p>
                  <h3 className='font-medium d-flex justify-content-end mt-12'>Sisa Tagihan</h3>
                </Col>
                <Col>
                  <p className='ml-2'>Rp. {i.subtotal.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  <p className='ml-2'>Rp. {(i.total_diskon + i.total_diskon_per_baris).toLocaleString({ minimumFractionDigits: 0 })}</p>
                  <p className='ml-2'>Rp. {i.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  <p className='ml-2'>Rp. {i.pemotongan.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  <p className='ml-2'>Rp. {(i.uang_muka + jurnal_penerimaan_pembayaran).toLocaleString({ minimumFractionDigits: 0 })}</p>
                  <h3 className='ml-2 mt-12'>Rp. {i.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</h3>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}

        <hr />
        <div>
          <Row>
            <Col>
              <Row className='float-left' />
            </Col>
            <Col>
              <Row>
                <Button variant='primary' className='mr-6' onClick={cetak}>
                  Cetak
                </Button>
                <Button variant='primary' onClick={pembayaran}>
                  Terima Pembayaran
                </Button>
              </Row>
            </Col>
            <Col>
              <Row className='float-right'>
                <Button variant='danger' className='mr-6'>
                  Kembali
                </Button>
                <Button variant='success' onClick={edit}>
                  Ubah
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
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
      DetailPenjualan: {
        include: {
          produk: true,
          pajak: true,
        },
      },
      JurnalPenerimaanPembayaran: true,
    },
  });

  const find_syarat_pembayaran = await prisma.syaratPembayaran.findFirst({
    where: {
      value: parseInt(header[0].syarat_pembayaran),
    },
  });

  return {
    props: {
      header: header,
      data: find_syarat_pembayaran,
    },
  };
}
