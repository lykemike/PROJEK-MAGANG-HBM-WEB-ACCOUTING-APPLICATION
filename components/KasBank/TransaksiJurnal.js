import React, { useMemo, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { Row, Col, FormControl, Modal, Button } from "react-bootstrap";
import { Snackbar, Breadcrumbs, Typography, Checkbox, Paper, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, TableSortLabel } from "@material-ui/core";
import { VisibilityOutlined } from "@material-ui/icons/";
import { KeyboardArrowDown, KeyboardArrowUp, Visibility, Edit, Delete, Icon, AssignmentTurnedIn } from "@material-ui/icons/";
import { useRouter } from "next/router";
import Axios from "axios";

function DeleteKirimUang(props) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };
  const api_delete = "http://localhost:3000/api/kasbank/deleteKirimUang";
  const router = useRouter();

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
          Are you sure you want to delete <label className="font-medium">{props.nama}</label>?
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

function DeleteTerimaUang(props) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };
  const api_delete = "http://localhost:3000/api/kasbank/deleteTerimaUang";
  const router = useRouter();

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
          Are you sure you want to delete <label className="font-medium">{props.nama}</label>?
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

function DeleteTransferUang(props) {
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    toast_message: "",
  });

  const { vertical, horizontal, open, toast_message } = state;

  const handleClose = () => {
    setState({ ...state, open: false, toast_message: "" });
  };
  const api_delete = "http://localhost:3000/api/kasbank/deleteTransferUang";
  const router = useRouter();

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
          Are you sure you want to delete <label className="font-medium">{props.nama}</label>?
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
export default function TransaksiJurnal({ data, index, bankid, label, view, contact, selectedTransactions, handleSelectOne }) {
  const [modalShow, setModalShow] = useState({ open: false, id: 0, nama: "" });
  const [modalShow2, setModalShow2] = useState({ open: false, id: 0, nama: "" });
  const [modalShow3, setModalShow3] = useState({ open: false, id: 0, nama: "" });

  const detail = useMemo(() => {
    if (view == "kirimuang") {
      return data.HeaderKirimUang;
    } else if (view == "terimauang") {
      return data.HeaderTerimaUang;
    } else if (view == "transferuang1") {
      return data.TransferUang1;
    } else {
      return data.TransferUang2;
    }
  }, [view]);

  return (
    <>
      <DeleteKirimUang id={modalShow.id} show={modalShow.open} nama={modalShow.nama} backdrop="static" keyboard={false} onHide={() => setModalShow({ open: false, id: 0, nama: "" })} />
      <DeleteTerimaUang id={modalShow2.id} show={modalShow2.open} nama={modalShow2.nama} backdrop="static" keyboard={false} onHide={() => setModalShow2({ open: false, id: 0, nama: "" })} />
      <DeleteTransferUang id={modalShow3.id} show={modalShow3.open} nama={modalShow3.nama} backdrop="static" keyboard={false} onHide={() => setModalShow3({ open: false, id: 0, nama: "" })} />
      <TableBody>
        {detail.map((i, index) => (
          <TableRow key={JSON.stringify({ id: i.id, tipe: view })} selected={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}>
            <TableCell style={{ minWidth: 50, width: 50 }}>
              <Checkbox
                checked={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}
                color="primary"
                onChange={(event) => handleSelectOne(event, JSON.stringify({ id: i.id, tipe: view }))}
                value={selectedTransactions.indexOf(JSON.stringify({ id: i.id, tipe: view })) !== -1}
              />
            </TableCell>
            <TableCell style={{ minWidth: 150, width: 150 }}>{i.tgl_transaksi}</TableCell>
            <TableCell style={{ minWidth: 200, width: 200 }}>{contact == "contact" ? i.kontak.nama_perusahaan : "-"}</TableCell>
            <TableCell style={{ minWidth: 200, width: 200 }}>Rp. {label == "incoming" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "0, 00"}</TableCell>
            <TableCell style={{ minWidth: 200, width: 200 }}>Rp. {label == "outgoing" ? i.total.toLocaleString({ minimumFractionDigits: 0 }) : "0, 00"}</TableCell>
            <TableCell style={{ minWidth: 200, width: 200 }}>
              Rp. 0,00
              {/* Rp. {label == "outgoing" ? i.sisa_saldo_akuntransfer.toLocaleString({ minimumFractionDigits: 0 }) : i.sisa_saldo_akunsetor.toLocaleString({ minimumFractionDigits: 0 })} */}
            </TableCell>
            <TableCell style={{ minWidth: 200, width: 200 }}>
              {i.status == "Belum terekonsiliasi" ? (
                <span class="bg-red-200 text-red-600 py-1 px-3 rounded text-xs">{i.status}</span>
              ) : (
                <span class="bg-green-200 text-green-600 py-1 px-3 rounded text-xs">{i.status}</span>
              )}
            </TableCell>
            <TableCell style={{ minWidth: 200, width: 200 }} align="right">
              {view == "kirimuang" ? (
                <>
                  <Link href={`view-kirim/${i.id}`}>
                    <a>
                      <Button variant="info" size="sm" className="mr-2">
                        <Visibility className="text-white" fontSize="small" />
                      </Button>
                    </a>
                  </Link>
                  {i.status == "Belum terekonsiliasi" ? (
                    <Link href={`edit-kirim/${i.id}`}>
                      <a>
                        <Button variant="warning" size="sm" className="mr-2">
                          <Edit className="text-white" fontSize="small" />
                        </Button>
                      </a>
                    </Link>
                  ) : null}

                  <Button variant="danger" size="sm" onClick={() => setModalShow({ open: true, id: i.id, nama: "Transaksi Kirim Uang Rp. " + i.total.toLocaleString() })}>
                    <Delete className="text-white" fontSize="small" />
                  </Button>
                </>
              ) : null}

              {view == "terimauang" ? (
                <>
                  <Link href={`view-terima/${i.id}`}>
                    <a>
                      <Button variant="info" size="sm" className="mr-2">
                        <Visibility className="text-white" fontSize="small" />
                      </Button>
                    </a>
                  </Link>
                  {i.status == "Belum terekonsiliasi" ? (
                    <Link href={`edit-terima/${i.id}`}>
                      <a>
                        <Button variant="warning" size="sm" className="mr-2">
                          <Edit className="text-white" fontSize="small" />
                        </Button>
                      </a>
                    </Link>
                  ) : null}

                  <Button variant="danger" size="sm" onClick={() => setModalShow2({ open: true, id: i.id, nama: "Transaksi Terima Uang Rp. " + i.total.toLocaleString() })}>
                    <Delete className="text-white" fontSize="small" />
                  </Button>
                </>
              ) : null}

              {view == "transferuang1" ? (
                <>
                  <Link href={`view-transfer/${i.id}`}>
                    <a>
                      <Button variant="info" size="sm" className="mr-2">
                        <Visibility className="text-white" fontSize="small" />
                      </Button>
                    </a>
                  </Link>
                  {i.status == "Belum terekonsiliasi" ? (
                    <Link href={`edit-transfer/${i.id}`}>
                      <a>
                        <Button variant="warning" size="sm" className="mr-2">
                          <Edit className="text-white" fontSize="small" />
                        </Button>
                      </a>
                    </Link>
                  ) : null}

                  <Button variant="danger" size="sm" onClick={() => setModalShow3({ open: true, id: i.id, nama: "Transaksi Transfer Uang Rp. " + i.total.toLocaleString() })}>
                    <Delete className="text-white" fontSize="small" />
                  </Button>
                </>
              ) : null}
              {view == "transferuang2" ? (
                <>
                  <Link href={`view-transfer/${i.id}`}>
                    <a>
                      <Button variant="info" size="sm" className="mr-2">
                        <Visibility className="text-white" fontSize="small" />
                      </Button>
                    </a>
                  </Link>
                  <Link href={`edit-transfer/${i.id}`}>
                    <a>
                      <Button variant="warning" size="sm" className="mr-2">
                        <Edit className="text-white" fontSize="small" />
                      </Button>
                    </a>
                  </Link>
                  <Button variant="danger" size="sm" onClick={() => setModalShow3({ open: true, id: i.id, nama: "Transaksi Transfer Uang Rp. " + i.total.toLocaleString() })}>
                    <Delete className="text-white" fontSize="small" />
                  </Button>
                </>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
