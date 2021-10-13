import React from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import {
  Button,
  Table,
  DropdownButton,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
  Dropdown,
} from "react-bootstrap";
import SettingsIcon from "@material-ui/icons/Settings";

const laporanaruskas = () => {
  return (
    <Layout>
      <div variant="container">
        <div></div>
        <h4 class="mb-8 mt-3">Arus Kas</h4>

        <Row>
          <Col sm="3">
            <Form.Label>Tanggal Mulai</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Pick date"
                type="date"
                aria-label="date"
              />
            </InputGroup>
          </Col>
          <Col sm="3">
            <Form.Label>Tanggal Selesai</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Pick date"
                type="date"
                aria-label="date"
              />
            </InputGroup>
          </Col>

          <Col>
            <Button variant="primary mr-2 mt-7"> Filter</Button>
          </Col>
        </Row>

        <div class="flex flex-row-reverse">
          <DropdownButton
            variant="primary ml-2"
            id="dropdown-basic-button"
            title="Export"
          >
            <Dropdown.Item>
              <Link href="#">
                <a>PDF</a>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">XLS</Dropdown.Item>
            <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
          </DropdownButton>
        </div>

        <Table class="table mt-4">
          <tbody>
            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Arus kas dari Aktivitas Operasional
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Penerimaan dari pelanggan</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Aset lancar lainnya</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Pembayaran ke pemasok</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Kartu kredit dan liabilitas jangka pendek lainnya</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Pendapatan lainnya</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Pengeluaran operasional</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kas bersih yang diperoleh dari Aktivitas Operasional
                </div>
              </td>
              <td></td>
              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Arus kas dari Aktivitas Investasi
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Perolehan/Penjualan aset</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Aktivitas investasi lainnya</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kas bersih yang diperoleh dari Aktivitas Investasi
                </div>
              </td>

              <td></td>
              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Arus kas dari Aktivitas Pendanaan
                </div>
              </td>

              <td></td>
              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900"></div>
              </td>
            </tr>

            <tr>
              <td>Pembayaran/Penerimaan pinjaman</td>
              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>Ekuitas/Modal</td>

              <td></td>
              <td></td>
              <td>Rp. XXX</td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kas bersih yang diperoleh dari Aktivitas Pendanaan
                </div>
              </td>

              <td></td>
              <td></td>

              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Kenaikan (penurunan) kas
                </div>
              </td>
              <td></td>

              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Saldo kas awal
                </div>
              </td>
              <td></td>

              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">
                  Saldo kas akhir
                </div>
              </td>
              <td></td>

              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900">Rp. 0.00</div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default laporanaruskas;
