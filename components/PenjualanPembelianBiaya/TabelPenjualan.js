import React, { useState, useMemo, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Link from "next/Link";
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, Edit, Delete, Icon, Done } from "@material-ui/icons/";
import { Row, Col, FormControl, Modal, Button } from "react-bootstrap";
import { TableFooter } from "@material-ui/core";
import Axios from "axios";
function DeleteDetail(props) {
  const api_delete = "http://localhost:3000/api/jual/deletePenerimaanPembayaran";

  const handle_delete = async () => {
    Axios.delete(api_delete, {
      data: {
        id: props.id,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm">
          Are you sure you want to delete <label className="font-medium">{props.nama}</label>? These will revert the current "sisa tagihan" before this invoice.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handle_delete}>
          Confirm, Delete!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Table2({ data, modalDelete }) {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const detail = useMemo(() => {
    return data.PenerimaanPembayaran;
  }, []);

  const status = useCallback((tgl_jatuh_tempo, status) => {
    if (tgl_jatuh_tempo < current) {
      return <span class="bg-red-200 text-red-600 py-1 px-3 rounded text-xs">Jatuh Tempo</span>;
    } else if (status == "Complete") {
      return <span class="bg-green-200 text-green-600 py-1 px-3 rounded text-xs">{data.status}</span>;
    } else if (status == "Active") {
      return <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded text-xs">{data.status}</span>;
    } else if (status == "Partial") {
      return <span class="bg-purple-200 text-purple-600 py-1 px-3 rounded text-xs">{data.status}</span>;
    } else {
      null;
    }
  }, []);

  return (
    <>
      <TableBody>
        <TableRow>
          <DeleteDetail id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
          <TableCell style={{ minWidth: 50, width: 50 }}>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" style={{ minWidth: 200, width: 200 }}>
            {data.tgl_kontrak_mulai}
          </TableCell>
          <TableCell style={{ minWidth: 160, width: 160 }}>Sales Invoice #{data.id}</TableCell>
          <TableCell style={{ minWidth: 250, width: 250 }}>{data.nama_perusahaan}</TableCell>
          <TableCell style={{ minWidth: 200, width: 200 }}>{data.tgl_kontrak_expired}</TableCell>
          <TableCell style={{ minWidth: 150, width: 150 }}>{status(data.tgl_kontrak_expired, data.status)}</TableCell>
          <TableCell style={{ minWidth: 200, width: 200 }}>Rp. {data.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>

          <TableCell align="right" style={{ minWidth: 200, width: 200 }}>
            <Link href={`../jual/view/${data.id}`}>
              <a>
                <Button variant="info" size="sm" className="mr-2">
                  <Visibility className="text-white" fontSize="small" />
                </Button>
              </a>
            </Link>

            {data.PenerimaanPembayaran.length > 0 ? null : (
              <Link href={`../jual/${data.id}`}>
                <a>
                  <Button variant="warning" size="sm" className="mr-2">
                    <Edit className="text-white" fontSize="small" />
                  </Button>
                </a>
              </Link>
            )}

            <Button variant="danger" size="sm" onClick={modalDelete}>
              <Delete className="text-white" fontSize="small" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="body1" gutterBottom component="div" className="text-black font-bold">
                  Daftar Penerimaan Pembayaran
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead className="bg-blue-300">
                    <TableRow>
                      <TableCell>Invoice</TableCell>
                      <TableCell>Tanggal</TableCell>
                      <TableCell>Presentase Penagihan</TableCell>
                      <TableCell>Jumlah</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.PenerimaanPembayaran.map((i, index) => (
                      <TableRow>
                        <TableCell>Invoice #{(index += 1)}</TableCell>
                        <TableCell>{i.tgl_pembayaran}</TableCell>
                        <TableCell>{i.presentase_penagihan}%</TableCell>
                        {data.tipe_perusahaan == "false" ? (
                          <TableCell>Rp. {i.tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                        ) : (
                          <TableCell>Rp. {i.tagihan_setelah_pajak.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
                        )}
                        <TableCell>{i.status}</TableCell>
                        <TableCell align="right">
                          <Button variant="success" size="sm" className="mr-2">
                            <Done className="text-white" fontSize="small" />
                          </Button>

                          <Link href={`../jual/pembayaran/view/${i.id}`}>
                            <a>
                              <Button variant="info" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                            </a>
                          </Link>
                          <Link href={`../jual/pembayaran/edit/${i.id}`}>
                            <a>
                              <Button variant="warning" size="sm" className="mr-2">
                                <Edit className="text-white" fontSize="small" />
                              </Button>
                            </a>
                          </Link>

                          <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.id, nama: "Invoice from " + data.nama_perusahaan })}>
                            <Delete className="text-white" fontSize="small" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell align="right">Total Pembayaran</TableCell>
                      <TableCell>
                        Rp.
                        {detail.reduce((a, b) => (a = a + b.tagihan_sebelum_pajak), 0).toLocaleString({ minimumFractionDigits: 0 })}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
