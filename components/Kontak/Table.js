import React from "react";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Link from "next/Link";
import Axios from "axios";
export default function Table2({ data }) {
  console.log(data);
  const deleteKontak = "http://localhost:3000/api/kontak/deleteKontak";

  const handleDelete = (id) => {
    Axios.delete(deleteKontak, {
      data: {
        kontakid: id,
      },
    })
      .then(function (response) {
        console.log(response);
        router.push("../kontak/tabel-kontak");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell component='th' scope='row'>
            {data.kontak.nama_panggilan}
          </TableCell>
          <TableCell>{data.kontak.nama_perusahaan}</TableCell>
          <TableCell>{data.kontak.alamat_pengiriman.length > 30 ? data.kontak.alamat_pengiriman.slice(0, 30) + "..." : data.kontak.alamat_pengiriman}</TableCell>
          <TableCell>{data.kontak.email}</TableCell>
          <TableCell>{data.kontak.nomor_hp}</TableCell>
          <TableCell>Rp.</TableCell>
          <TableCell align='right'>
            <Link key={data.kontak.id} href={`${data.kontak.id}`}>
              <a>
                <EditOutlinedIcon color='action' fontSize='small' className='mr-2' />
              </a>
            </Link>

            {/* <DeleteOutlineIcon class='cursor-pointer' color='secondary' fontSize='small' onClick={() => handleDelete(i.id)} /> */}
            <DeleteOutlineIcon class='cursor-pointer' color='secondary' fontSize='small' />
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
