import React from 'react'
import Layout from '../../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown , Row , Col, Form, Card, InputGroup,FormControl} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PrintIcon from '@material-ui/icons/Print';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function bank_transfer({ data ,data2}) {
    const router = useRouter();
    const { id } = router.query;


    return (
//         <div>
//              <Layout>
//         <div variant="container">
//         <div class="text-md font-medium text-gray-900 mb-2">
           
//             Transaksi 
//             <Row>
//                 <Col>
//                     <h4 class="mt-2 mb-5">
//                         Bank Withdrawal #{id}
//                         </h4>
//                  </Col>
            
//                  <Col>
//                     <div class="float-right">
//                             <h1 class="text-2xl">
//                                 Selesai
//                             </h1>
//                  </div>
//                  </Col>
//         </Row>
//         </div>        
                
//          <div class="mb-10">
//             <Row>
//                 <Col >
//                 <Form.Label>
//                     Bayar Dari
//                     </Form.Label>
//                         <Form.Control>
                         
//                           </Form.Control>
//                 </Col>
//                 <Col></Col>
//                 <Col>
//                 <h3>
//                     Total Amount 
//                 </h3>
//                 <h2 class="text-purple-700 text-opacity-100 ">Rp, 0.00</h2>
//                 </Col>
//             </Row>
//         </div>

//         <div class="mb-10">
//         {data.map((i) => (
//             <Row>
//                 <Col >
//                     <Form.Label>
//                         Penerima: {i.akun_penerima}
//                     </Form.Label>
                  
//                 </Col>

//                 <Col >
//                     <Form.Label>
//                         Tanggal Transaksi: {i.tgl_transaksi}
//                     </Form.Label>
                   
//                 </Col>

//                 <Col>
//                     <Form.Label>
//                         Nomor Transaksi: {i.no_transaksi}
//                     </Form.Label>
                   
//                 </Col>
//             </Row>
//         ))}
//         </div>

//         <div class="mb-12">
//                     <Table class="table mt-4">
//                                 <thead class="thead-light">
//                                     <tr>
//                                         <th class="text-center" scope="col">Akun</th>
//                                         <th class="text-center" scope="col">Deskripsi</th>
//                                         <th class="text-center" scope="col">Pajak</th>
//                                         <th class="text-center" scope="col">Jumlah(IDR)</th>
//                                     </tr>
//                                 </thead>
//                                 {data2.map((i) => (
//                                 <tbody>
//                                     <tr>
//                                         <td class="text-center">
//                                             {i.akun.nama_akun}
//                                         </td>
//                                         <td>
//                                             {i.deskripsi}
//                                         </td>   
//                                         <td class="text-center">
//                                            {i.pajak.nama}
//                                         </td>
//                                         <td class="text-center"> 
//                                             {i.jumlah}
//                                         </td>
//                                     </tr>
                                
//                                 </tbody>               
//                                  ))}
//                             </Table>
                 
//                         </div>
            

//          <div class="mb-6">
//          {data.map((i) => (
//             <Row>
//                 <Col></Col>
//                 <Col></Col> 
//                 <Col>
//                 <Form.Group as={Row} controlId="\">
//                         <Form.Label column sm="4">
//                         Subtotal
//                         </Form.Label>
//                         <Col sm="6">
//                         {i.subtotal}
//                         </Col>
//                     </Form.Group>

//                 <Form.Group as={Row} controlId="\\">
//                         <Form.Label column sm="4">
//                         Pajak
//                         </Form.Label>
//                         <Col sm="6">
//                         {i.hasil_pajak}
//                         </Col>
//                 </Form.Group>

//                 <Form.Group as={Row} controlId="[]">
//                         <Form.Label column sm="4">
//                         Total
//                         </Form.Label>
//                         <Col sm="6">
//                         {i.total}
//                         </Col>
//                     </Form.Group>

//                 </Col>
//             </Row>
//              ))}
//         </div>
//     <div>
   
//                 <Button variant="secondary mr-2"><ArrowBackIosIcon fontSize="medium"/>Kembali</Button>
//                 <Button variant="primary"><PrintIcon fontSize="medium"/> Cetak</Button>

//      <div className="float-right">
//                 <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Hapus</Button>
//                 <Button variant="success"><CheckCircleIcon fontSize="medium"/>Ubah</Button>
//         </div>
//         </div>
//         </div>
       
//         </Layout>
//         </div>
//     )
// }

        <Layout>
        <div variant="container">
        <div class="text-md font-medium text-gray-900 mb-2">
            Transaksi</div>
            <h4 class="mt-2 mb-5">
                Kirim Uang #{id}
            </h4>
 
        <div class="mb-10">
       {data.map((i) => (
            <Row>
                <Col >
                <Form.Label>
                    Bayar dari : {i.akun_bayar.nama_akun}
                    </Form.Label>
                </Col>
                <Col></Col>
                <Col>
                <h3>
                    Total Amount 
                </h3>
                <h2 class="text-purple-700 text-opacity-100 ">Rp, {i.total}</h2>
                </Col>
            </Row>
            ))}
        </div>

        <div class="mb-10">
        {data.map((i) => (
        <Row>
            <Col>
                <Form.Label>
                    Penerima: {i.akun_penerima.nama_akun}
                </Form.Label>
            </Col>
                
            <Col>
                <Form.Label>
                Tanggal Transaksi: {i.tgl_transaksi}
                </Form.Label>
            </Col>
                
            <Col> 
                <Form.Label>
                    Nomor Transaksi: {i.no_transaksi}
                </Form.Label>
            </Col>

                <Col>
                <Form.Label>
                    Tag: {i.tag}
                </Form.Label>
                </Col>

            </Row>
        ))}
        </div>

        <div class="mb-12">
        <Table class="table mt-4">
                    <thead class="thead-light">
                        <tr>
                            <th class="text-center" scope="col">Akun</th>
                            <th class="text-center" scope="col">Deskripsi</th>
                            <th class="text-center" scope="col">Pajak</th>
                            <th class="text-center" scope="col">Jumlah</th>
                        </tr>
                    </thead>
                    {data2.map((i) => (
                    <tbody>
                        <tr>
                            <td>{i.akun.nama_akun}</td>   
                            <td>{i.deskripsi} </td>   
                            <td>{i.pajak.nama} </td>
                            <td>{i.jumlah} </td> 
                        </tr>
                    </tbody>
                    ))}
                </Table>
            </div>

        <div class="mb-6">
        {data.map((i) => (
            <Row>
                <Col></Col>
                <Col></Col> 
                <Col>
                <Form.Group as={Row} >
                        <Form.Label column sm="3">
                        Subtotal
                        </Form.Label>
                        <Col sm="6">Rp. {i.subtotal}</Col>
                    </Form.Group>

                <Form.Group as={Row} >
                        <Form.Label column sm="3">
                        Pajak
                        </Form.Label>
                        <Col sm="6">Rp. {i.hasil_pajak}</Col>
                </Form.Group>

                <Form.Group as={Row} >
                        <Form.Label column sm="3">
                        Total
                        </Form.Label>
                        <Col sm="6">Rp. {i.total}</Col>
                </Form.Group>
                </Col>
            </Row>
        ))}
        </div>

        <Button variant="secondary mr-2"><ArrowBackIosIcon fontSize="medium"/>Kembali</Button>
                 <Button variant="primary"><PrintIcon fontSize="medium"/> Cetak</Button>

      <div className="float-right">
                 <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Hapus</Button>
                <Button variant="success"><CheckCircleIcon fontSize="medium"/>Ubah</Button>
        </div>
       </div>
 
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const { id } = context.query;
  
    const header = await prisma.headerKirimUang.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        akun_bayar: true,
        akun_penerima: true,
        DetailKirimUang: true,
      },
    });
  
    const detail = await prisma.detailKirimUang.findMany({
      where: {
        header_kirim_uang_id: parseInt(id),
      },
      include: {
        header_kirim_uang: true,
        akun: true,
        pajak: true,
      },
    });
  
    return {
      props: {
        data: header,
        data2: detail,
      },
    };
  }
  