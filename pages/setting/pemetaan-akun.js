import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,InputGroup,FormControl,Button,OverlayTrigger,Tooltip,Card} from 'react-bootstrap'
import SidebarSetting from '../../components/SidebarSetting'
import Divider from '@material-ui/core/Divider';

import * as Yup from 'yup'
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

<<<<<<< HEAD
export default function pemetaanakun({data,data2,data3,data4,data5,data6,data7,data8,data9,data10}) {
=======
export default function pemetaanakun({data,data2,data3,data4,data5,data6,data7,data8,data9,data10, data11, data12, data13, data14, data15,data16,data17, data18, data19, data20}) {
>>>>>>> 85777909e487d9bea248add5ee5309f083e7b774
    return ( 
        <Layout>
            <h1>Pengaturan</h1>
            <Row>
                <Col sm="3">
                <SidebarSetting></SidebarSetting>
                </Col>
                <Divider orientation="vertical" flexItem />
                <Col sm="8">
                    <h4>Daftar Pemetaan</h4>
                    Pilih akun default untuk setiap label untuk membantu sistem membuat entri jurnal Anda secara otomatis dari transaksi. Semua kolom wajib diisi
                    <h4>Penjualan</h4>
                    <div className="border-t border-gray-200 py-2">
                       <Row className="mb-2">
                        <Col>
                        Pendapatan Penjualan
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                            {data.map((i) => (
                                <option key={i.id} value={i.id}>
                                {i.nama_akun}
                                </option>
                            ))}
                        </Form.Control>
                        </Col>

                        <Col>
                        Pembayaran Dimuka
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data4.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>
                    </Row> 

                    <Row className="mb-2">
                        <Col>
                        Diskon Penjualan
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data2.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>

                        <Col>
                        Piutang Belum Ditagih
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data5.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>
                    </Row>

                    <Row className="mb-2">
                        <Col>
                        Pemotongan
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data3.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>

                        <Col>
                        Pajak Penjualan
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data6.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>
                    </Row>
                    </div>

                    {/* <Row className="mb-2">
                        <Col>
                        Pengiriman Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                        Hutang Pajak Penjualan
                        </Col>
                        <Col>
                            <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row> */}

                    <h4>Pembelian</h4>
                    <div className="border-t border-gray-200 py-2">
                       <Row className="mb-2">
                        <Col>
                        Pembelian (COGS)
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data7.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>
                        <Col>
                            Hutang Belum Ditagih
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data11.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>
                    </Row> 

                    <Row className="mb-2">
                        <Col>
                        Pemotongan
                        </Col>
                        <Col>
                        <Form.Control as='select'>
                        {data8.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>
                        <Col>
                            Pajak Pembelian
                        </Col>
                        <Col>
                        <Form.Control as="select">
                        {data12.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                            </Form.Control>
                        </Col>
                    </Row> 

                    <Row className="mb-2">
                        <Col sm="3">
                        Uang Muka Pembelian
                        </Col>
                        <Col sm="3">
                        <Form.Control as='select'>
                        {data10.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>

                        <Col sm="3">
                        Diskon Pembelian
                        </Col>
                        <Col sm="3">
                        <Form.Control as='select'>
                        {data9.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                        </Form.Control>
                        </Col>
                    </Row>
                    </div>

                    <h4>Biaya</h4>
                    <div className="border-t border-gray-200 py-2">
                    <Row className="mb-2">
                        <Col>
                        Pemotongan
                        </Col>
                        <Col>
                        <Form.Control as="select">
                        {data13.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                            </Form.Control>
                        </Col>
                        <Col>
                            Hutang Usaha
                        </Col>
                        <Col>
                        <Form.Control as="select">
                        {data14.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                            </Form.Control>
                        </Col>
                    </Row> 
                    </div>

                    <h4>Persediaan</h4>
                    <div className="border-t border-gray-200 py-2">
                    <Row className="mb-2">
                        <Col>
                        Persediaan
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Persediaan Rusak
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row> 
                    <Row className="mb-2">
                        <Col>
                        Persediaan Umum
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                        <Col>
                            Persediaan Produksi
                        </Col>
                        <Col>
                        <Form.Control as="select">
                                <option></option>
                            </Form.Control>
                        </Col>
                    </Row>
                    </div>

                    <h4>Lainya</h4>
                    <div className="border-t border-gray-200 py-2">
                    <Row className="mb-2">
                        <Col>
                        Ekuitas Saldo Awal
                        </Col>
                        <Col>
                        <Form.Control as="select">
                        {data19.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                            </Form.Control>
                        </Col>
                        <Col>
                            Aset Tetap
                        </Col>
                        <Col>
                        <Form.Control as="select">
                        {data20.map((i) => (
                            <option key={i.id} value={i.id}>
                            {i.nama_akun}
                            </option>
                        ))}
                            </Form.Control>
                        </Col>
                    </Row>
                    </div>
                    Penetapan ulang akun akan berlaku setelah Anda menyerahkan pemetaan akun ini
                </Col>
            </Row>
            <div class="left-0 px-4 py-3 w-full flex justify-center items-end gap-3">  
                        <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Simpan</button>
                    </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const akunA = await prisma.akun.findMany({
      where: {
        kategoriId: {
          in: [13, 14],
        },
      },
    });
  
    const akunB = await prisma.akun.findMany({
      where: {
        kategoriId: {
          in: [13],
        },
      },
    });
  
    const akunC = await prisma.akun.findMany({
      where: {
        kategoriId: {
          in: [13],
        },
      },
    });
  
    const akunD = await prisma.akun.findMany({
      where: {
        kategoriId: {
          in: [3],
        },
      },
    });
  
    const akunE = await prisma.akun.findMany({
      where: {
        kategoriId: {
          in: [1, 2],
        },
      },
    });
  
    const akunF = await prisma.akun.findMany({
      where: {
        kategoriId: {
          in: [10, 13, 14, 16, 17],
        },
      },
    });
  
    const akunG = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [15],
          },
        },
      });
    
      const akunH = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [15],
          },
        },
      });
    
      const akunI = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [13],
          },
        },
      });
    
      const akunJ = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [3],
          },
        },
      });
    
      const akunK = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [8],
          },
        },
      });
    
      const akunL = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [2, 13, 14, 16, 17],
          },
        },
      });

      const akunM = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [15],
          },
        },
      });
    
      const akunN = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [8],
          },
        },
      });
//OPQR
      const akunS = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [12],
          },
        },
      });
    
      const akunT = await prisma.akun.findMany({
        where: {
          kategoriId: {
            in: [5],
          },
        },
      });
    
    return {
      props: {
        data: akunA,
        data2: akunB,
        data3: akunC,
        data4: akunD,
        data5: akunE,
        data6: akunF,
        data7: akunG,
        data8: akunH,
        data9: akunI,
        data10: akunJ,
        data11: akunK,
        data12: akunL,
        data13: akunM,
        data14: akunN,
        data19: akunS,
        data20: akunT,
      },
    };
  }
  