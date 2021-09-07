import React from "react";
import Link from "next/Link";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

export default function TableJualBeli({ data, index, label, view }) {
  return (
    <>
      {view == "biaya" ? (
        <tr key={index}>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.tgl_transaksi}</div>
          </td>
          <td class='px-8 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>
              {label} #{data.id}
            </div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.akun1.nama_akun}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.kontak.nama}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.tag}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            {data.status == "Complete" ? (
              <span class='bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs'>{data.status}</span>
            ) : (
              <span class='bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs'>{data.status}</span>
            )}
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>Rp. {data.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrape'>
            <div class='text-base text-gray-900'>Rp. {data.total.toLocaleString({ minimumFractionDigits: 0 })}</div>
          </td>
          <td>
            <Link href={`../../${view}/view/${data.id}`}>
              <a>
                <VisibilityOutlinedIcon color='primary' fontSize='small' className='mr-2' />
              </a>
            </Link>
            <Link href={`../../${view}/${data.id}`}>
              <a>
                <EditOutlinedIcon color='action' fontSize='small' className='mr-2' />
              </a>
            </Link>
            <DeleteOutlineIcon color='secondary' fontSize='small' />
          </td>
        </tr>
      ) : (
        <tr key={index}>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.tgl_transaksi}</div>
          </td>
          <td class='px-8 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>
              {label} #{data.id}
            </div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.kontak.nama_panggilan}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.tgl_jatuh_tempo}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>{data.tag}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            {data.status == "Complete" ? (
              <span class='bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs'>{data.status}</span>
            ) : (
              <span class='bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs'>{data.status}</span>
            )}
          </td>
          <td class='px-2 py-2 whitespace-nowrap'>
            <div class='text-base text-gray-900'>Rp. {data.sisa_tagihan.toLocaleString({ minimumFractionDigits: 0 })}</div>
          </td>
          <td class='px-2 py-2 whitespace-nowrape'>
            <div class='text-base text-gray-900'>Rp. {data.total.toLocaleString({ minimumFractionDigits: 0 })}</div>
          </td>
          <td>
            <Link href={`../../${view}/view/${data.id}`}>
              <a>
                <VisibilityOutlinedIcon color='primary' fontSize='small' className='mr-2' />
              </a>
            </Link>
            <Link href={`../../${view}/${data.id}`}>
              <a>
                <EditOutlinedIcon color='action' fontSize='small' className='mr-2' />
              </a>
            </Link>
            <DeleteOutlineIcon color='secondary' fontSize='small' />
          </td>
        </tr>
      )}
    </>
  );
}
