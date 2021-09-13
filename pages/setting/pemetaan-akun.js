import React from "react";
import Layout from "../../components/Layout";
import { Form, Row, Col } from "react-bootstrap";
import SidebarSetting from "../../components/SidebarSetting";
import Divider from "@material-ui/core/Divider";
import { Formik, Form as Forms } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function pemetaanakun({
  setting,
  data,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
  data13,
  data14,
  data15,
  data16,
  data17,
  data18,
  data19,
  data20,
}) {
  const url = "http://localhost:3000/api/setting/updatePemetaanAkun";
  const router = useRouter();
  console.log(setting.filter(i => i.nama_setting === "pendapatan_penjualan").map(i => i.akun_id))
  return (
    <Layout>
      <Formik
        initialValues={{
          pendapatan_penjualan: setting.filter(i => i.nama_setting === "pendapatan_penjualan").map(i => i.akun_id),
          diskon_penjualan: setting.filter(i => i.nama_setting === "diskon_penjualan").map(i => i.akun_id),
          pemotongan_penjualan: setting.filter(i => i.nama_setting === "pemotongan").map(i => i.akun_id),
          pembayaran_di_muka: setting.filter(i => i.nama_setting === "pembayaran_dimuka").map(i => i.akun_id),
          piutang_belum_ditagih: setting.filter(i => i.nama_setting === "piutang_blm_ditagih").map(i => i.akun_id),
          pajak_penjualan: setting.filter(i => i.nama_setting === "pajak_penjualan").map(i => i.akun_id),
          pembelian_cogs: setting.filter(i => i.nama_setting === "pembelian_cogs").map(i => i.akun_id),
          pemotongan_pembelian: setting.filter(i => i.nama_setting === "pemotongan").map(i => i.akun_id),
          uang_muka_pembelian: setting.filter(i => i.nama_setting === "uang_muka_pembelian").map(i => i.akun_id),
          hutang_belum_ditagih: setting.filter(i => i.nama_setting === "hutang_blm_ditagih").map(i => i.akun_id),
          pajak_pembelian: setting.filter(i => i.nama_setting === "pajak_pembelian").map(i => i.akun_id),
          diskon_pembelian: setting.filter(i => i.nama_setting === "diskon_pembelian").map(i => i.akun_id),
          pemotongan_biaya: setting.filter(i => i.nama_setting === "pemotongan").map(i => i.akun_id),
          hutang_usaha: setting.filter(i => i.nama_setting === "hutang_usaha").map(i => i.akun_id),
          ekuitas_saldo_awal: setting.filter(i => i.nama_setting === "ekuitas_saldo_awal").map(i => i.akun_id),
          aset_tetap: setting.filter(i => i.nama_setting === "aset_tetap").map(i => i.akun_id),
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(url, values)
            .then(function (response) {
              console.log(response);
             
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <h1>Pengaturan</h1>
            <Row>
              <Col sm='3'>
                <SidebarSetting />
              </Col>
              <Divider orientation='vertical' flexItem />
              <Col sm='8'>
                <div className='mb-3'>
                  <h4>Daftar Pemetaan</h4>
                  Pilih akun default untuk setiap label untuk membantu sistem membuat entri jurnal Anda secara otomatis dari transaksi. Semua kolom wajib diisi
                </div>
                <h4>Penjualan</h4>
                <div className='border-t border-gray-200 py-2'>
                  <Row className='mb-2'>
                    <Col>Pendapatan Penjualan</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.pendapatan_penjualan} name='pendapatan_penjualan' onChange={props.handleChange}>
                        {data.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col>Pajak Penjualan</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.pajak_penjualan} name='pajak_penjualan' onChange={props.handleChange}>
                        {data6.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col>Diskon Penjualan</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.diskon_penjualan} name='diskon_penjualan' onChange={props.handleChange}>
                        {data2.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col>Piutang Belum Ditagih</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.piutang_belum_ditagih} name='piutang_belum_ditagih' onChange={props.handleChange}>
                        {data5.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  {/* <Row className='mb-2'>
                    <Col>Pemotongan</Col>
                    <Col>
                      <Form.Control disabled as='select' name='pemotongan_penjualan' onChange={props.handleChange}>
                        {data3.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col>Pembayaran Dimuka</Col>
                    <Col>
                      <Form.Control as='select' disabled name='pembayaran_di_muka' onChange={props.handleChange}>
                        {data4.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row> */}
                </div>
                <h4>Pembelian</h4>
                <div className='border-t border-gray-200 py-2'>
                  <Row className='mb-2'>
                    <Col>Pembelian (COGS)</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.pembelian_cogs} name='pembelian_cogs' onChange={props.handleChange}>
                        {data7.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>Hutang Belum Ditagih</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.hutang_belum_ditagih} name='hutang_belum_ditagih' onChange={props.handleChange}>
                        {data11.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  <Row className='mb-2'>
                    <Col sm='3'>Diskon Pembelian</Col>
                    <Col sm='3'>
                      <Form.Control as='select' value={props.values.diskon_pembelian} name='diskon_pembelian' onChange={props.handleChange}>
                        {data9.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col>Pajak Pembelian</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.pajak_pembelian} name='pajak_pembelian' onChange={props.handleChange}>
                        {data12.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  {/* <Row className='mb-2'>
                    <Col>Pemotongan</Col>
                    <Col>
                      <Form.Control disabled as='select' name='pemotongan_pembelian' onChange={props.handleChange}>
                        {data8.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col sm='3'>Uang Muka Pembelian</Col>
                    <Col sm='3'>
                      <Form.Control disabled as='select' name='uang_muka_pembelian' onChange={props.handleChange}>
                        {data10.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row> */}
                </div>
                <h4>Biaya</h4>
                <div className='border-t border-gray-200 py-2'>
                  <Row className='mb-2'>
                    <Col>Pemotongan</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.pemotongan_biaya} name='pemotongan_biaya' onChange={props.handleChange}>
                        {data13.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>Hutang Usaha</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.hutang_usaha} name='hutang_usaha' onChange={props.handleChange}>
                        {data14.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </div>
                {/* <h4>Persediaan</h4>
                <div className='border-t border-gray-200 py-2'>
                  <Row className='mb-2'>
                    <Col>Persediaan</Col>
                    <Col>
                      <Form.Control as='select'>
                        <option></option>
                      </Form.Control>
                    </Col>
                    <Col>Persediaan Rusak</Col>
                    <Col>
                      <Form.Control as='select'>
                        <option></option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <Row className='mb-2'>
                    <Col>Persediaan Umum</Col>
                    <Col>
                      <Form.Control as='select'>
                        <option></option>
                      </Form.Control>
                    </Col>
                    <Col>Persediaan Produksi</Col>
                    <Col>
                      <Form.Control as='select'>
                        <option></option>
                      </Form.Control>
                    </Col>
                  </Row>
                </div> */}
                <h4>Lainya</h4>
                <div className='border-t border-gray-200 py-2'>
                  <Row className='mb-2'>
                    <Col>Ekuitas Saldo Awal</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.ekuitas_saldo_awal} name='ekuitas_saldo_awal' onChange={props.handleChange}>
                        {data19.map((i, index) => (
                          <option key={index} value={i.id}>
                            {i.nama_akun}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>Aset Tetap</Col>
                    <Col>
                      <Form.Control as='select' value={props.values.aset_tetap} name='aset_tetap' onChange={props.handleChange}>
                        {data20.map((i, index) => (
                          <option key={index} value={i.id}>
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
            <div class='left-0 px-4 py-3 w-full flex justify-center items-end gap-3'>
              <button class='bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none' onClick={props.handleSubmit}>
                Simpan
              </button>
            </div>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
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

  const get_settings = await prisma.settingDefault.findMany({
    orderBy: {
      id: "asc",
    },
  });

  let list_setting = [];
  get_settings.map((i) => {
    list_setting.push({
      akun_id: i.akun_id,
    });
  });

  return {
    props: {
      setting: get_settings,
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
