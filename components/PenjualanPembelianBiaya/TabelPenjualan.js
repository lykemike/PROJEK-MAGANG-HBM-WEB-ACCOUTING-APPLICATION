import React, { useState, useMemo, useCallback } from "react";
import Link from "next/Link";
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, Edit, Delete, Icon, AssignmentTurnedIn } from "@material-ui/icons/";
import { Row, Col, FormControl, Modal, Button } from "react-bootstrap";
import { Snackbar, Table, TableHead, TableBody, TableFooter, TableRow, TableCell, Collapse, IconButton, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import Axios from "axios";
import { Formik, Form as Forms, FieldArray } from "formik";

function CompleteInvoice(props) {
  const api_confirm = "http://localhost:3000/api/jual/confirmInvoice";
  const router = useRouter();

  const day = new Date();
  const current = day.toISOString().slice(0, 10);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState, toast_message: "" });
  };

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Invoice Confirmation</Modal.Title>
      </Modal.Header>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Formik
        initialValues={{
          id: props.id,
          tanggal: current,
        }}
        onSubmit={async (values) => {
          console.log(values);
          Axios.post(api_confirm, values)
            .then(function (response) {
              setState({ open: true, toast_message: response.data.message });
              setTimeout(() => {
                router.reload(window.location.pathname);
              }, 2000);
            })
            .catch(function (error) {
              setState({ open: true, toast_message: error.response.data.message });
            });
        }}
      >
        {(formikProps) => (
          <>
            <Modal.Body>
              <label className="text-sm font-medium">Pick confirmation date:</label>
              <FormControl type="date" name="tanggal_terima" value={formikProps.values.tanggal} onChange={(e) => formikProps.setFieldValue(`tanggal`, e.target.value)} />

              <p className="text-sm mt-2">
                Are you sure you want to complete this invoice? This current status will change to <label className="font-medium">"Done"</label>, and can't be{" "}
                <label className="font-medium">Edited</label>.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
              <Button variant="primary" onClick={formikProps.handleSubmit}>
                Confirm, Done!
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}

function DeleteInvoice(props) {
  const api_delete = "http://localhost:3000/api/jual/deletePenerimaanPembayaran";
  const router = useRouter();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState, toast_message: "" });
  };

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };

  const handle_delete = async () => {
    Axios.delete(api_delete, {
      data: {
        id: props.id,
      },
    })
      .then(function (response) {
        setState({ open: true, toast_message: response.data.message });
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 2000);
      })
      .catch(function (error) {
        setState({ open: true, toast_message: error.response.data.message });
      });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} open={open} onClose={handleClose} message={toast_message} key={vertical + horizontal} />
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-sm">
          Are you sure you want to delete <label className="font-medium">{props.nama}</label>? These will revert "jumlah" from the current invoice to sisa tagihan.
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

export default function TablePenjualan({ data, modalDelete }) {
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });
  const [modalShow2, setModalShow2] = useState({ open: false, id: 0, nama: "" });

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
          <DeleteInvoice id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
          <CompleteInvoice id={modalShow2.id} show={modalShow2.open} nama={modalShow2.nama} backdrop="static" keyboard={false} onHide={() => setModalShow2({ open: false, id: 0, nama: "" })} />
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
                <label variant="body1" gutterBottom component="div" className="text-black text-sm">
                  Daftar Penerimaan Pembayaran
                </label>
                <Table size="small" aria-label="purchases">
                  <TableHead className="bg-blue-200">
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
                        <TableCell style={{ minWidth: 150, width: 150 }}>Invoice #{(index += 1)}</TableCell>
                        <TableCell style={{ minWidth: 150, width: 150 }}>{i.tgl_pembayaran}</TableCell>
                        <TableCell>{i.presentase_penagihan}%</TableCell>

                        <TableCell style={{ minWidth: 200, width: 200 }}>
                          {data.tipe_perusahaan == "false"
                            ? "Rp. " + i.tagihan_sebelum_pajak.toLocaleString({ minimumFractionDigits: 0 })
                            : "Rp. " + i.tagihan_setelah_pajak.toLocaleString({ minimumFractionDigits: 0 })}
                        </TableCell>

                        <TableCell style={{ minWidth: 150, width: 150 }}>
                          {i.status == "Process" ? (
                            <span class="bg-red-200 text-red-600 py-1 px-3 rounded text-xs">{i.status}</span>
                          ) : (
                            <span class="bg-green-200 text-green-600 py-1 px-3 rounded text-xs">{i.status}</span>
                          )}
                        </TableCell>

                        <TableCell align="right" style={{ minWidth: 250, width: 250 }}>
                          {i.status == "Process" ? (
                            <Button variant="success" size="sm" className="mr-2" onClick={() => setModalShow2({ open: true, id: i.id, nama: "Complete " })}>
                              <AssignmentTurnedIn className="text-white" fontSize="small" />
                            </Button>
                          ) : null}

                          <Link href={`../jual/pembayaran/view/${i.id}`}>
                            <a>
                              <Button variant="info" size="sm" className="mr-2">
                                <Visibility className="text-white" fontSize="small" />
                              </Button>
                            </a>
                          </Link>

                          {i.status == "Process" ? (
                            <Link href={`../jual/pembayaran/edit/${i.id}`}>
                              <a>
                                <Button variant="warning" size="sm" className="mr-2">
                                  <Edit className="text-white" fontSize="small" />
                                </Button>
                              </a>
                            </Link>
                          ) : null}

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
