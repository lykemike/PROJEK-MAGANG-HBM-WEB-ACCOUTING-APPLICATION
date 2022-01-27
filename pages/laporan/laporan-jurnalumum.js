import {
  Breadcrumbs,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import TabelJurnalUmum from "../../components/Laporan/TabelJurnalUmum";
import Layout from "../../components/layout";
import Axios from "../../utils/axios";

export default function laporanjurnalumum() {
  const tgl_mulai = useRef(null);
  const tgl_akhir = useRef(null);
  const [jurnal, setJurnal] = useState([]);
  const [total_debit, setTotalDebit] = useState(0);
  const [total_kredit, setTotalKredit] = useState(0);
  const onClick = () => {
    Axios.get("/laporan/jurnalumum").then((response) => {
      setJurnal(response?.data?.data || []);
      setTotalDebit(response.data.debit);
      setTotalKredit(response.data.kredit);
    });
  };

  return (
    <Layout>
      <div className="border-b border-gray-200">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="../laporan/menulaporan">
            Laporan
          </Link>
          <Typography color="textPrimary">Jurnal Umum</Typography>
        </Breadcrumbs>

        <Row>
          <Col sm="8">
            <h2 className="text-blue-600">Jurnal Umum</h2>
          </Col>
        </Row>
      </div>

      <div class="mt-4 mb-4">
        <Row>
          <Col sm="3">
            <Form.Label>Tanggal Mulai</Form.Label>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Pick date"
                type="date"
                aria-label="date"
                ref={tgl_mulai}
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
                ref={tgl_akhir}
              />
            </InputGroup>
          </Col>

          <Col>
            <Button
              variant="primary mr-2 mt-7"
              className="mt-1"
              onClick={onClick}
            >
              Filter
            </Button>
          </Col>

          <div class="flex flex-row-reverse mt-1">
            <Col>
              <Form.Label />
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
            </Col>
          </div>
        </Row>
      </div>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead className="bg-dark">
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography className="text-dark">Tanggal Transaksi</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXXXXXXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXXXXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXX</Typography>
              </TableCell>
              <TableCell>
                <Typography className="text-dark">XXXXXXX</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {jurnal?.map((data, index) => (
            <TabelJurnalUmum key={index} data={data.data} label={data.label} />
          ))}
          <TableFooter>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell align="right">
                <Typography className="text-black font-bold">
                  Grand Total
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className="text-black font-bold">
                  Rp. {total_debit.toLocaleString({ minimumFractionDigits: 0 })}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography className="text-black font-bold">
                  Rp.{" "}
                  {total_kredit.toLocaleString({ minimumFractionDigits: 0 })}
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Layout>
  );
}
