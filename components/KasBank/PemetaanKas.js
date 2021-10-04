import React, { useMemo, useState } from "react";
import { TableBody, TableCell, TableRow, Checkbox } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Navbar, Nav, NavDropdown, Form } from "react-bootstrap";
import Link from "next/link";

export default function BankStatement({ data, index, selectedBankStatement, handleSelectOneBankStatement, bankId }) {
  const [open, setOpen] = useState(false);

  let autoIncrement = 1;
  console.log(bankId);

  function cancelButton() {
    router.push(`pisah/${data.id}`);
    bankId;
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
            <Nav className="mr-auto" />
            <Nav>
              <NavDropdown id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link href={`pisah/${data.id}`}>
                    <a>Pisah</a>
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>Hapus</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </TableCell>
          {/* <List component="nav" aria-label="mailbox folders">
            <ListItem button>
              <ListItemText primary="Inbox" />
            </ListItem>
            <Divider />
            <ListItem button divider>
              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Trash" />
            </ListItem>
            <Divider light />
            <ListItem button>
              <ListItemText primary="Spam" />
            </ListItem>
          </List> */}
        </TableRow>
      </TableBody>
    </>
  );
}
