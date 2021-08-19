import React from "react";
import Layout from "../../components/Layout";
import { Row, Col, Form, Button, FormCheck, InputGroup } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/Link";
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function BuatBiaya({ data, data2, data3, data4, data5 }) {
  const url = "http://localhost:3000/api/biaya/create-biaya";

  return (
    <Layout>
      <Formik
        initialValues={{
          akun_kas_bank: "",
          nama_penerima: "",
          tgl_transaksi: "",
          cara_pembayaran: "",
          no_transaksi: "",
          alamat_penagihan: "",
          tag: "",
          boolean: false,
          detail_biaya: [
            {
              akun_biaya_id: "",
              nama_akun: "",
              deskripsi: "",
              pajak_id: "",
              nama_pajak: "",
              nama_pajak_akun_beli: "",
              persen_pajak: "",
              hasil_pajak: "",
              jumlah: 0,
              total_per_baris: "",
            },
          ],
          memo: "",
          fileattachment: [],
          subtotal: "",
          pajak: "",
          total: "",
          pemotongan: "",
          jumlah_pemotongan: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          let formData = new FormData();
          for (var key in values) {
            if (key == "detail_biaya") {
              formData.append(`${key}`, JSON.stringify(values[key]));
            } else {
              formData.append(`${key}`, `${values[key]}`);
            }
          }
          Array.from(values.fileattachment).map((i) => formData.append("file", i));
          console.log(values);
          Axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then(function (response) {
              console.log(response);
              // router.push(`view/${idInvoice}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }}>
        {(props) => (
          <Forms noValidate>
            <div>
              <h4>Buat Biaya</h4>
              <hr />
            </div>

            <Form>
              {/* bayar dari, bayar nanti, and total */}
              <Row sm="12">
                <Col sm="4">
                  <Form.Label className="font-medium">Bayar Dari</Form.Label>
                  <Form.Control as="select" defaultValue="Choose..." name="akun_kas_bank" onChange={props.handleChange}>
                    <option>Pilih</option>
                    {data.map((akun) => (
                      <option key={akun.id} value={akun.id}>
                        {akun.nama_akun}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm="3">
                  <Form.Label />
                  <Row className="ml-1 mt-3">
                    <FormCheck />
                    <p className="font-medium">Bayar Nanti</p>
                  </Row>
                </Col>
                <Col sm="3" />
                <Col sm="2" className="justify-content-end">
                  <Row>
                    <h4 className="mr-2 ">Total</h4>
                    <h4 class="text-blue-600" name="jumlah_pemotongan">
                      Rp. {props.values.jumlah_pemotongan.toLocaleString({ minimumFractionDigits: 0 })}
                    </h4>
                  </Row>
                </Col>
              </Row>

              <hr />

              {/* nama_penerima, tanggal transaksi, cara pembayaran and no transaksi */}
              <Row sm="12">
                <Col sm="4">
                  <Form.Label className="font-medium">Penerima</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    name="nama_penerima"
                    onChange={(e) => {
                      props.setFieldValue(`nama_penerima`, e.target.value);
                      if (e.target.value === "") {
                        props.setFieldValue(`alamat_penagihan`, "");
                      } else {
                        let result = data3.filter((i) => {
                          return i.id === parseInt(e.target.value);
                        });
                        props.setFieldValue(`alamat_penagihan`, result[0].alamat_pembayaran);
                      }
                    }}>
                    <option>Pilih</option>
                    {data3.map((kontak) => (
                      <option key={kontak.id} value={kontak.id}>
                        {kontak.nama}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm="3">
                  <Form.Label className="font-medium">Tanggal Transaksi</Form.Label>
                  <Form.Control placeholder="Auto" type="date" name="tgl_transaksi" onChange={props.handleChange} />
                </Col>
                <Col sm="3">
                  <Form.Label className="font-medium">Cara Pembayaran</Form.Label>
                  <Form.Control as="select" defaultValue="Choose..." name="cara_pembayaran" onChange={props.handleChange}>
                    <option>Pilih</option>
                    <option value="Cash">Tunai / Cash</option>
                    <option value="Credit">Credit / Term of Payment</option>
                  </Form.Control>
                </Col>
                <Col sm="2">
                  <Form.Label className="font-medium">No. Transaksi</Form.Label>
                  <Form.Control type="text" placeholder="Auto" name="no_transaksi" onChange={props.handleChange} />
                </Col>
              </Row>

              {/* alamat penagihan and tag */}
              <Row sm="12">
                <Col sm="4" className="mt-3">
                  <Form.Label className="font-medium">Alamat Penagihan</Form.Label>
                  <Form.Control as="textarea" rows={4} name="alamat_penagihan" value={props.values.alamat_penagihan} />
                </Col>
                <Col sm="3" />
                <Col sm="3" />
                <Col sm="2" className="mt-3">
                  <Form.Label className="font-medium">Tag</Form.Label>
                  <Form.Control placeholder="Tag" name="tag" onChange={props.handleChange} />
                </Col>
              </Row>

              <Row className="d-flex justify-content-end mr-3 mt-12">
                <div class="float-right mt-2 ">
                  <Form.Check
                    label="Harga Termasuk Pajak"
                    type="switch"
                    id="custom-switch"
                    onChange={(e) => {
                      if (e.target.checked === false) {
                        props.setFieldValue((props.values.boolean = false));
                        const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);
                        const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);

                        props.setFieldValue((props.values.subtotal = subtotal));
                        props.setFieldValue("subtotal", subtotal);

                        let total = subtotal + pajak_total;
                        props.setFieldValue((props.values.total = total));

                        let jumlah_pemotongan = total - props.values.pemotongan;
                        props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                      } else {
                        props.setFieldValue((props.values.boolean = true));
                        const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);
                        const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);

                        let new_subtotal = subtotal - pajak_total;
                        props.setFieldValue((props.values.subtotal = new_subtotal));
                        props.setFieldValue("subtotal", new_subtotal);

                        let total = subtotal;
                        props.setFieldValue((props.values.total = total));

                        let jumlah_pemotongan = total - props.values.pemotongan;
                        props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                      }
                    }}
                  />
                </div>
              </Row>

              <hr />

              {/* akun biaya, deskripsi, pajak, jumlah and empty col for delete button */}
              <Row sm="12">
                <Col sm="3">
                  <Form.Label className="font-medium">Akun Biaya</Form.Label>
                </Col>
                <Col sm="3">
                  <Form.Label className="font-medium">Deskripsi</Form.Label>
                </Col>
                <Col sm="2">
                  <Form.Label className="font-medium">Pajak</Form.Label>
                </Col>
                <Col sm="3">
                  <Form.Label className="font-medium">Jumlah</Form.Label>
                </Col>
                <Col sm="1">
                  <Form.Label className="font-medium" />
                </Col>
              </Row>

              <hr />
              <Form>
                <FieldArray name="detail_biaya">
                  {({ insert, remove, push }) => (
                    <div>
                      {props.values.detail_biaya.length > 0 &&
                        props.values.detail_biaya.map((i, index) => (
                          <Row className="mb-3" key={index}>
                            <Col sm="3">
                              <Form.Control
                                as="select"
                                //   defaultValue='Choose...'
                                //   name='akun_biaya_id'
                                name={`detail_biaya.${index}.akun_biaya_id`}
                                onChange={(e) => {
                                  props.setFieldValue(`detail_biaya.${index}.akun_biaya_id`, e.target.value);
                                  if (e.target.value === "") {
                                    props.setFieldValue(`detail_biaya.${index}.akun_biaya_id`);
                                  } else {
                                    let result = data2.filter((i) => {
                                      return i.id === parseInt(e.target.value);
                                    });
                                  }
                                  props.setFieldValue(`detail_biaya.${index}.nama_akun`, data2.filter((i) => i.id === parseInt(e.target.value))[0].nama_akun);
                                  //     console.log(data2.filter((i) => i.id === parseInt(e.target.value)));
                                }}>
                                <option>Pilih</option>
                                {data2.map((akun) => (
                                  <option key={akun.id} value={akun.id}>
                                    {akun.nama_akun}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                            <Col sm="3">
                              <Form.Control placeholder="" type="text" name={`detail_biaya.${index}.deskripsi`} onChange={props.handleChange} />
                            </Col>
                            <Col sm="2">
                              <Form.Control
                                as="select"
                                name={`detail_biaya.${index}.pajak_id`}
                                onChange={(e) => {
                                  props.setFieldValue(`detail_biaya.${index}.pajak_id`, e.target.value);
                                  if (props.values.boolean == false) {
                                    if (e.target.value === "") {
                                      props.setFieldValue(`detail_biaya.${index}.pajak_id`);
                                    } else {
                                      let result = data4.filter((i) => {
                                        return i.id === parseInt(e.target.value);
                                      });
                                    }
                                    props.setFieldValue(`detail_biaya.${index}.nama_pajak`, data4.filter((i) => i.id === parseInt(e.target.value))[0].nama);

                                    // Rumus pajak
                                    let pajak1 = data4.filter((i) => {
                                      return i.id === parseInt(e.target.value);
                                    });

                                    props.setFieldValue(`detail_biaya.${index}.nama_pajak_akun_beli`, pajak1[0].kategori2.nama_akun);
                                    props.setFieldValue(`detail_biaya.${index}.persen_pajak`, pajak1[0].presentasaAktif);
                                    let pajak2 = pajak1[0].presentasaAktif / 100;
                                    let pajak3 = pajak2 * props.values.detail_biaya[index].jumlah;
                                    props.setFieldValue((props.values.detail_biaya[index].hasil_pajak = pajak3));
                                    props.setFieldValue((props.values.detail_biaya[index].pajak = pajak3));
                                    const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);
                                    props.setFieldValue("pajak", pajak_total);

                                    //rumus jumlah
                                    let result = parseInt(props.values.detail_biaya[index].jumlah);
                                    props.setFieldValue((props.values.detail_biaya[index].jumlah = result));
                                    const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);

                                    props.setFieldValue((props.values.subtotal = subtotal));
                                    props.setFieldValue("subtotal", subtotal);

                                    // Rumus total

                                    let total = parseInt(subtotal + pajak_total);
                                    props.setFieldValue("total", total);
                                    // Rumus potongan
                                    let jumlah_pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                                  } else {
                                    if (e.target.value === "") {
                                      props.setFieldValue(`detail_biaya.${index}.pajak_id`);
                                    } else {
                                      let result = data4.filter((i) => {
                                        return i.id === parseInt(e.target.value);
                                      });
                                    }
                                    props.setFieldValue(`detail_biaya.${index}.nama_pajak`, data4.filter((i) => i.id === parseInt(e.target.value))[0].nama);

                                    // Rumus pajak
                                    let pajak1 = data4.filter((i) => {
                                      return i.id === parseInt(e.target.value);
                                    });

                                    props.setFieldValue(`detail_biaya.${index}.nama_pajak_akun_beli`, pajak1[0].kategori2.nama_akun);
                                    props.setFieldValue(`detail_biaya.${index}.persen_pajak`, pajak1[0].presentasaAktif);
                                    let pajak2 = pajak1[0].presentasaAktif / 100;
                                    let pajak3 = pajak2 * props.values.detail_biaya[index].jumlah;
                                    props.setFieldValue((props.values.detail_biaya[index].hasil_pajak = pajak3));
                                    props.setFieldValue((props.values.detail_biaya[index].pajak = pajak3));
                                    const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);
                                    props.setFieldValue("pajak", pajak_total);

                                    //rumus jumlah
                                    let result = parseInt(props.values.detail_biaya[index].jumlah);
                                    props.setFieldValue((props.values.detail_biaya[index].jumlah = result));
                                    const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);

                                    const newsub = props.values.detail_biaya[index].jumlah - props.values.detail_biaya[index].hasil_pajak;
                                    props.setFieldValue((props.values.detail_biaya[index].total_per_baris = newsub));

                                    let new_subtotal = subtotal - pajak_total;
                                    props.setFieldValue((props.values.subtotal = new_subtotal));
                                    props.setFieldValue("subtotal", new_subtotal);

                                    let total = parseInt(subtotal);
                                    props.setFieldValue("total", total);

                                    // Rumus potongan
                                    let jumlah_pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                                  }
                                }}>
                                <option>Pilih</option>
                                {data4.map((pajak) => (
                                  <option key={pajak.id} value={pajak.id}>
                                    {pajak.nama}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                            <Col sm="3">
                              <Form.Control
                                placeholder=""
                                name={`detail_biaya.${index}.jumlah`}
                                value={props.values.jumlah}
                                onChange={(e) => {
                                  // Rumus jumlah
                                  props.setFieldValue(`detail_biaya.${index}.total_per_baris`, parseInt(e.target.value));
                                  if (props.values.boolean == false) {
                                    let result = parseInt(e.target.value);
                                    props.setFieldValue((props.values.detail_biaya[index].jumlah = result));
                                    const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                                    props.setFieldValue("subtotal", subtotal);
                                    props.setFieldValue((props.values.subtotal = subtotal));

                                    // Rumus pajak
                                    let pajak1 = result * (props.values.detail_biaya[index].persen_pajak / 100);
                                    props.setFieldValue((props.values.detail_biaya[index].pajak = pajak1));
                                    props.setFieldValue((props.values.detail_biaya[index].hasil_pajak = pajak1));
                                    const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);
                                    props.setFieldValue("pajak", pajak_total);

                                    // Rumus total

                                    let total = parseInt(subtotal + pajak_total);
                                    props.setFieldValue("total", total);

                                    // Rumus potongan
                                    let jumlah_pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                                  } else {
                                    let result = parseInt(e.target.value);
                                    props.setFieldValue((props.values.detail_biaya[index].jumlah = result));
                                    const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                                    props.setFieldValue("subtotal", subtotal);

                                    // Rumus pajak
                                    let pajak1 = result * (props.values.detail_biaya[index].persen_pajak / 100);
                                    props.setFieldValue((props.values.detail_biaya[index].pajak = pajak1));
                                    props.setFieldValue((props.values.detail_biaya[index].hasil_pajak = pajak1));
                                    const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);
                                    props.setFieldValue("pajak", pajak_total);

                                    const newsub = e.target.value - props.values.detail_biaya[index].hasil_pajak;
                                    console.log(newsub);
                                    props.setFieldValue((props.values.detail_biaya[index].total_per_baris = newsub));
                                    // Rumus total

                                    let total = parseInt(subtotal);
                                    props.setFieldValue("total", total);

                                    let new_subtotal = subtotal - pajak_total;
                                    props.setFieldValue((props.values.subtotal = new_subtotal));
                                    props.setFieldValue("subtotal", new_subtotal);

                                    // Rumus potongan
                                    let jumlah_pemotongan = total - props.values.pemotongan;
                                    props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                                  }
                                }}
                              />
                            </Col>
                            <Col sm="1">
                              <Button variant="danger" onClick={() => remove(index)}>
                                <CloseIcon fontSize="small" />
                              </Button>
                            </Col>
                          </Row>
                        ))}
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() =>
                          push({
                            akun_biaya_id: "",
                            deskripsi: "",
                            pajak_id: "",
                            jumlah: 0,
                            nama_pajak: "",
                            nama_pajak_akun_beli: "",
                            persen_pajak: "",
                            hasil_pajak: "",
                            total_per_baris: "",
                          })
                        }>
                        <AddIcon /> Tambah data
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Form>

              {/* memo, subtotal, pajak, total, pemotongan and total */}
              <Row sm="12" className="mt-3">
                <Col sm="4">
                  <Form.Label className="font-medium">Memo</Form.Label>
                  <Form.Control as="textarea" rows={4} name="memo" onChange={props.handleChange} />
                </Col>
                <Col sm="3" />
                <Col sm="3" className="mt-3">
                  <Col>
                    <p>SubTotal</p>
                    <p>Pajak</p>
                    <p>Total</p>
                    <p>Pemotongan</p>
                  </Col>
                </Col>
                <Col sm="2" className="mt-3">
                  <Col>
                    <p name="subtotal">Rp. {props.values.subtotal.toLocaleString({ minimumFractionDigits: 0 })}</p>
                    <p name="pajak">Rp. {props.values.pajak.toLocaleString({ minimumFractionDigits: 0 })}</p>
                    <p name="total">Rp. {props.values.total.toLocaleString({ minimumFractionDigits: 0 })}</p>
                  </Col>
                </Col>
              </Row>

              {/* lampiran, select, pemotongan input, and total */}
              <Row sm="12">
                <Col sm="4">
                  <Form.Label className="font-medium">Lampiran</Form.Label>
                  <Form>
                    <Form.File type="file" name="fileattachment" onChange={(e) => props.setFieldValue("fileattachment", e.target.files)} />
                  </Form>
                </Col>
                <Col sm="3">
                  <Form.Control as="select" defaultValue="Choose..." name="akun_pemotongan" onChange={props.handleChange}>
                    <option>pilih</option>
                    {data5.map((akun) => (
                      <option key={akun.id} value={akun.id}>
                        {akun.nama_akun}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col sm="3">
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder=""
                      aria-label="Amount (to the nearest dollar)"
                      name="pemotongan"
                      onChange={(e) => {
                        props.setFieldValue(`pemotongan`, e.target.value);
                        if (props.values.boolean == false) {
                          //rumus jumlah

                          const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                          props.setFieldValue((props.values.subtotal = subtotal));
                          props.setFieldValue("subtotal", subtotal);
                          // Rumus pajak
                          const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);

                          let total = parseInt(subtotal + pajak_total);
                          props.setFieldValue("total", total);

                          // Rumus potongan
                          let jumlah_pemotongan = props.values.total - e.target.value;
                          props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                        } else {
                          //rumus jumlah

                          const subtotal = props.values.detail_biaya.reduce((a, b) => (a = a + b.jumlah), 0);
                          const pajak_total = props.values.detail_biaya.reduce((a, b) => (a = a + b.pajak), 0);

                          let new_subtotal = subtotal - pajak_total;
                          props.setFieldValue((props.values.subtotal = new_subtotal));
                          props.setFieldValue("subtotal", new_subtotal);

                          props.setFieldValue((props.values.total = subtotal));
                          props.setFieldValue("total", subtotal);

                          // Rumus potongan
                          let jumlah_pemotongan = props.values.total - e.target.value;
                          props.setFieldValue("jumlah_pemotongan", jumlah_pemotongan);
                        }
                      }}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>%</InputGroup.Text>
                      <InputGroup.Text>Rp</InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
                <Col sm="2">
                  <Col className="mt-2">
                    <p>Rp. 0,00</p>
                  </Col>
                </Col>
              </Row>

              {/* total */}
              <Row sm="12" className="mt-3">
                <Col sm="4" />
                <Col sm="3" />
                <Col sm="3" />
                <Col sm="2" className="justify-content-end">
                  <Row>
                    <h4 className="mr-2 ">Total</h4>
                    <h4 class="text-blue-600" name="jumlah_pemotongan">
                      Rp. {props.values.jumlah_pemotongan.toLocaleString({ minimumFractionDigits: 0 })}
                    </h4>
                  </Row>
                </Col>
              </Row>

              {/* button batal and bayar */}
              <Row>
                <Col className="d-flex justify-content-end mt-10">
                  <Button variant="danger mr-2">Batal</Button>
                  <Button variant="success" className="ml-2" onClick={props.handleSubmit}>
                    Bayar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Forms>
        )}
      </Formik>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Get kategori akun from akun model
  const getAkun = await prisma.akun.findMany({
    where: {
      // Akun kas & bank
      kategoriId: 3,
    },
  });

  const getAkun2 = await prisma.akun.findMany({
    where: {
      // Akun beban, & beban lainnya
      kategoriId: {
        in: [16, 17],
      },
    },
  });

  const getAkun3 = await prisma.akun.findMany({
    where: {
      // Akun pendapatan
      kategoriId: 13,
    },
  });

  // Get kontak from kontak model
  const getKontak = await prisma.kontak.findMany({
    orderBy: [
      {
        nama: "asc",
      },
    ],
  });

  //Get Pajak form pajak model
  const getPajak = await prisma.pajak.findMany({
    orderBy: [
      {
        nama: "asc",
      },
    ],
    include: {
      kategori2: true,
    },
  });

  return {
    props: {
      data: getAkun,
      data2: getAkun2,
      data3: getKontak,
      data4: getPajak,
      data5: getAkun3,
    },
  };
}
