import React, { useMemo, useState } from "react";
import { TableBody, TableCell, TableRow, Checkbox } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Navbar, Nav, NavDropdown, Form, Modal, Button, Row } from "react-bootstrap";
import Link from "next/link";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Axios from "axios";
import HorizontalSplitOutlinedIcon from "@material-ui/icons/HorizontalSplitOutlined";
import { TrashIcon, ViewListIcon } from "@heroicons/react/solid";

export default function BankStatement({ data, index, selectedBankStatement, handleSelectOneBankStatement, onDelete }) {
  const [open, setOpen] = useState(false);

  function cancelButton() {
    router.push(`pisah/${data.id}`);
  }
  return (
    <>
      <TableBody>
        <TableRow key={data.id} selected={selectedBankStatement.indexOf(data.id) !== -1}>
          <TableCell>
            <Checkbox
              checked={selectedBankStatement.indexOf(data.id) !== -1}
              color="primary"
              onChange={(event) => handleSelectOneBankStatement(event, data.id)}
              value={selectedBankStatement.indexOf(data.id) !== -1}
            />
          </TableCell>
          <TableCell component="th" scope="row">
            {data.tgl_mutasi_bank}
          </TableCell>
          <TableCell>Rp. {data.debit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          <TableCell>Rp. {data.kredit.toLocaleString({ minimumFractionDigits: 0 })}</TableCell>
          <TableCell>{data.deskripsi}</TableCell>
          <TableCell>
            {data.status == "Belum Terekonsiliasi" ? (
              <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{data.status}</span>
            ) : (
              <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{data.status}</span>
            )}
          </TableCell>
          <TableCell>
            <Row>
              <Link href={`pisah/${data.id}`}>
                <a>
                  <ViewListIcon className="cursor-pointer w-6 h-6 text-blue-600" fontSize="small" />
                </a>
              </Link>
              <TrashIcon className="cursor-pointer w-6 h-6 text-red-500" fontSize="small" onClick={onDelete} />
            </Row>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
