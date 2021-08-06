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

export default function bank_transfer({ data }) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout>
        <div variant="container">
            <div class="text-md font-medium text-gray-900 mb-2">
            
                Transaksi 
                <Row>
                    <Col>
                        <h4 class="mt-2 mb-5">
                            Bank Transfer #{id}
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

                <div class="mb-10">            
                    <Row>
                        <Col >
                        {data.map((i) => (
                            <Form.Label>
                                Transfer Dari : {i.akun_transfer.nama_akun}
                            </Form.Label> ))} 
                        </Col>

                        <Col>
                        {data.map((i) => (
                            <Form.Label>
                                Tanggal Transaksi: {i.tgl_transaksi}
                            </Form.Label>))}
                        </Col> 
                      
                    </Row>  
                  
                </div>
               
                <div class="mb-10">
              
                    <Row>
                        <Col >  {data.map((i) => (
                            <Form.Label>
                                Setor ke: {i.akun_setor.nama_akun}
                            </Form.Label>))}
                        </Col>

                        <Col>{data.map((i) => (
                            <Form.Label>
                                Nomor Transaksi: {i.no_transaksi}
                            </Form.Label>))}
                        </Col>
                    </Row>
    
                </div>

                <div class="mb-10">
               
                    <Row>
                        <Col > {data.map((i) => (
                            <Form.Label>
                                Jumlah: {i.jumlah}
                            </Form.Label>))}
                        </Col>

                        <Col></Col>
                    </Row>
                  </div> 
            <div>

                <Button variant="secondary mr-2"><ArrowBackIosIcon fontSize="medium"/>Kembali</Button>
                <Button variant="primary"><PrintIcon fontSize="medium"/> Cetak</Button>

                <div className="float-right">
                    <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Hapus</Button>
                    <Button variant="success"><CheckCircleIcon fontSize="medium"/>Ubah</Button>
                </div>
          
             </div> 
    
        </div> 
       
    </Layout>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;

	const transfer = await prisma.transferUang.findMany({
        where: {
          id: parseInt(id)
        },
        include :{
            akun_setor: true,
            akun_transfer: true,
        }
      });
  
    
    return {
      props: {
        data: transfer,
      },
    };
  }
  

