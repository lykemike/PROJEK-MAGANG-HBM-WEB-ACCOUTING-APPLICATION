import React, { useState } from "react";
import Layout from "../../components/layout";
import Link from "next/link";
import {
  Button,
  Table,
  DropdownButton,
  Row,
  Col,
  Form,
  FormControl,
  InputGroup,
  Dropdown,
  Modal,
} from "react-bootstrap";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function perubahan_modal({}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Layout>
      <div variant="container">
        <div></div>
        <h4 class="mb-8 mt-2">Perubahan Modal</h4>

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

          <Button variant="primary" onClick={handleShow}>
            <AddCircleOutlineIcon fontSize="small" /> Ubah Persentase
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Pemegang Saham</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>Nama </Col>
                <Col>Akun Modal</Col>
                <Col>Akun Prive</Col>
                <Col>Persentase</Col>
              </Row>
              <Row>
                <Col sm="3">
                  <Form.Control
                    placeholder=""
                    type="text"
                    name="nama_pemegangsaham"
                  />
                </Col>

                <Col sm="3">
                  <Form.Control
                    as="select"
                    name="akun_modal"
                    // onChange={props.handleChange}
                    // onBLur={props.handleBlur}
                  >
                    {/* {data.map((akun_modal) => (
                      <option key={akun_modal.id} value={akun_modal.id}>
                        {akun_modal.nama_akun}
                      </option>
                    ))} */}
                  </Form.Control>
                </Col>
                <Col sm="3">
                  <Form.Control placeholder="" type="text" name="akun_prive" />
                </Col>
                <Col sm="3">
                  <Form.Control placeholder="-" type="text" name="persentase" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Submit</Button>
            </Modal.Footer>
          </Modal>
        </div>

        <Table class="table mt-4">
          <tbody>
            <tr>
              <td>Laba Tahun Berjalan</td>
              <td>XXXX</td>
            </tr>

            <tr>
              <td>Dividen</td>
              <td>XXXX</td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">Laba</div>
              </td>
              <td>
                <div class="text-md font-medium text-gray-900">XXXXXX</div>
              </td>
            </tr>
          </tbody>
        </Table>

        <Table class="table mt-4">
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>Pemegang Saham 1</td>
              <td>Pemegang Saham 2</td>
              <td>Pemegang Saham 3</td>
            </tr>

            <tr>
              <td>Modal</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Setoran Modal</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Laba Bersih</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>Prive</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td>
                <div class="text-md font-medium text-gray-900">Modal Akhir</div>
              </td>
              <td></td>
              <td></td>

              <td></td>
              <td>
                <div class="text-md font-medium text-gray-900"></div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
}
