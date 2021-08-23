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

export default function bank_deposit({ data,data2 }) {
    const router = useRouter();
    const { id } = router.query;

    function edit() {
        router.push(`../edit-terima/${id}`);
      }

    return (
        <Layout>
        <div variant="container">
        <div class="text-md font-medium text-gray-900 mb-2">
            Transaksi 
            <Row>
                <Col>
                    <h4 class="mt-2 mb-5">
                        Bank Deposit #{id}
                        </h4>
                 </Col>
            
                 <Col>
                    <div class="float-right">
                            <h1 class="text-2xl">
                                Selesai
                            </h1>
                 </div>
                 </Col>
        </Row>
        </div>   

        {data.map((i) => (
         <div className="mb-10">
            <Row>
                <Col >
                 <Form.Label className='font-medium'>Setor Ke:</Form.Label>
                  <p>{i.akun_setor.nama_akun} </p>
                </Col>
                <Col></Col>
                <Col>
                <h3>
                    Total Amount 
                </h3>
                <h2 class="text-purple-700 text-opacity-100 ">Rp. {i.total}</h2>
                </Col>
            </Row>   
        </div>
         ))}

        <div className="mb-10"> 
        {data.map((i) => (
            <Row>
                <Col >
                    <Form.Label className='font-medium'>Pembayar: </Form.Label>
                     <p> {i.akun_membayar.nama_akun}</p>
                </Col>
                <Col >
                    <Form.Label className='font-medium'>Tanggal Transaksi: </Form.Label>
                     <p> {i.tgl_transaksi}</p>
                </Col>
                <Col>
                    <Form.Label className='font-medium'> Nomor Transaksi: </Form.Label>
                     <p> {i.no_transaksi}</p>
                </Col>
            </Row>
            ))}
        </div>
        
        <div className="mb-12">
                    <Table class="table mt-4">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Akun</th>
                                        <th scope="col">Deskripsi</th>
                                        <th scope="col">Pajak</th>
                                        <th scope="col">Jumlah(IDR)</th>
                                    </tr>
                                </thead>
                                {data2.map((i) => (
                                <tbody>
                                    <tr>
                                        <td>
                                            {i.akun.nama_akun}
                                        </td>
                                        <td>
                                            {i.deskripsi}
                                        </td>   
                                        <td >
                                           {i.pajak.nama}
                                        </td>
                                        <td > 
                                            {i.jumlah}
                                        </td>
                                    </tr>
                                 
                                </tbody>
                                ))}
                            </Table>    
                         </div>
            
{/*  
         <div class="mb-6">
             {data.map((i) => (
            <Row>
                <Col></Col>
                <Col></Col> 
                <Col>      
                <Form.Group as={Row} controlId="">
                        <Form.Label column sm="4">
                        Subtotal 
                        </Form.Label>
                        <Col sm="6">
                            {i.subtotal}
                        </Col>
                    </Form.Group>
                

                <Form.Group as={Row} controlId="">
                    <Col> 
                    <Form.Label column sm="4">
                        Pajak
                        </Form.Label>
                    </Col>
                       
                        <Col sm="6">
                            {i.hasil_pajak}
                        </Col>
                </Form.Group>

           
                <Form.Group as={Row} controlId="">
                        <Form.Label column sm="4">
                        Total
                        </Form.Label>
                        
                        <Col sm="6">
                        {i.total}
                        </Col>
                        
                </Form.Group>
                </Col>
            </Row>
            ))}
        </div> */}

        <div class="mt-20">
					<Row sm="12">
						<Col sm="4" />

						<Col sm="4" />

						<Col sm="2">
							<h6>Subtotal</h6>
						</Col>

						{data.map((i) => (
						<Col sm="2">
							<h6>Rp. {i.subtotal}</h6>
						</Col>
					))}
					</Row>
				</div>

                <div class="mt-4">
					<Row sm="12">
						<Col sm="4" />

						<Col sm="4" />

						<Col sm="2">
							<h6> Pajak</h6>
						</Col>

						{data.map((i) => (
						<Col sm="2">
							<h6>Rp. {i.hasil_pajak}</h6>
						</Col>
					))}
					</Row>
				</div>

                <div class="mt-5 mb-10">
					<Row sm="12">
						<Col sm="4" />

						<Col sm="4" />

						<Col sm="2">
							<h6>Total</h6>
						</Col>

						{data.map((i) => (
						<Col sm="2">
							<h6>Rp. {i.total}</h6>
						</Col>
					))}
					</Row>
				</div>

              <div>
                <Button variant="secondary mr-2"><ArrowBackIosIcon fontSize="medium"/>Kembali</Button>
                <Button variant="primary"><PrintIcon fontSize="medium"/> Cetak</Button>

                 <div className="float-right">
                         {/* <Link key={kasbank.id} href={`${kasbank.id}`}> */}
                                   <a>
                                     <Button variant="success"><CheckCircleIcon fontSize="medium" onClick={edit} />Ubah</Button>
                                  </a>
                          {/* </Link> */}
                 </div>
             </div>
      
         </div>
     </Layout>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
  
    const header = await prisma.headerTerimaUang.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        akun_setor: true,
        akun_membayar: true,
        DetailTerimaUang: true,
      },
    });
  
    const detail = await prisma.detailTerimaUang.findMany({
      where: {
        header_terima_uang_id: parseInt(id),
      },
      include: {
        header_terima_uang: true,
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
  