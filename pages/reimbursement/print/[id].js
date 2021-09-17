import React,{useState} from 'react'
import Layout from '../../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton,InputGroup, FormControl,Dropdown , Row , Col, Form, Card} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {Formik , Form as Forms} from 'formik'
import * as Yup from 'yup'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";


export default function invoice_reimbursement({data,data2}) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
                <div variant="container">
                        <h4 class="mt-2 mb-5">
                            Reimbursement #{id}
                        </h4>

                {data.map((i) => (
                    <div class="mb-10">
                        <Row>
                            <Col >
                                <p className="font-medium ml-2">Nama Pegawai: </p>
                                <p className="ml-2">{i.nama_pegawai}</p>  
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </div>
                ))}
      
                    <div class="mb-12">
                        <Table class="table mt-4">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Tanggal</th>
                                    <th  scope="col">Tempat</th>
                                    <th  scope="col">Biaya</th>
                                    <th  scope="col">Keterangan</th>
                                    <th  scope="col">Jumlah</th>
                                </tr>
                            </thead>
                     {data2.map((i) => (
                            <tbody>
                                <tr>
                                   <td> 
                                        <p>{i.tanggal}</p>
                                    </td>   
                                    <td>
                                        <p>{i.tempat}</p>  
                                    </td>   
                                    <td>
                                        <p>{i.biaya}</p>
                                    </td>
                                    <td> 
                                        <p>{i.keterangan}</p>  
                                    </td>
                                    <td> 
                                        <p>{i.jumlah}</p>  
                                    </td>
                                </tr>
                            </tbody>
                     ))}
                        </Table>
                            {/* <Button variant="primary ml-2"><PlaylistAddIcon fontSize="medium"/> Tambah Data</Button> */}
                        </div>
                    <hr />
                        <div>
                        {data.map((i) => (
                            <Row>
                                <Col sm="3">
                                    <p className="font-medium ml-2 mt-4">Pemohon </p>
                                    <p className="ml-2 mt-14">{i.nama_pegawai}</p>     
                                </Col>

                                <Col sm="3">
                                    <p className="font-medium ml-2 mt-4">Yang Mengetahui </p>
                                    <p className="ml-2 mt-14">{i.yang_mengetahui}</p>  
                                </Col>
                                <Col sm="3">
                                    <p className="font-medium ml-2 mt-4"> Yang Menyetujui </p>
                                    <p className="ml-2 mt-14">{i.yang_menyetujui}</p>      
                                </Col>
                                <Col></Col>
                            </Row>
                        ))}
                        </div>
                    </div>
                </div>
   )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    const header = await prisma.headerReimburse.findMany({
        where: {
            id: parseInt(id),
          },
    });

    const detail = await prisma.detailReimburse.findMany({
        where: {
            id: parseInt(id),
          },
    })
  
    return {
      props: {
        data: header,
        data2: detail
      },
    };
  }
