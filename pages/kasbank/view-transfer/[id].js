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
            <h4> Transaksi </h4>
               
                <Row>
                    <Col>
                        <h3 class="mt-2 mb-5">
                            Bank Transfer #{id}
                            </h3>
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
                        {data.map((i) => (
                        <Col>
                      
                            <Form.Label className='font-medium'>Transfer Dari : </Form.Label>
                            <p> {i.akun_transfer.nama_akun} </p>   
                        </Col>
                        ))} 

                             
                        {data.map((i) => (
                        <Col>
                      
                            <Form.Label className='font-medium'>Tanggal Transaksi: </Form.Label>
                            <p>   {i.tgl_transaksi} </p>   
                        </Col>
                        ))} 

                    </Row>  
                  
                </div>
               
                <div class="mb-10">
              
                    <Row>
                
                        {data.map((i) => (
                        <Col>
                      
                            <Form.Label className='font-medium'> Setor ke: </Form.Label>
                            <p>  {i.akun_setor.nama_akun}</p>   
                        </Col>
                        ))} 

                        {data.map((i) => (
                        <Col>
                      
                            <Form.Label className='font-medium'> Nomor Transaksi: </Form.Label>
                            <p> {i.no_transaksi}</p>   
                        </Col>
                        ))} 

                    </Row>
    
                </div>

                <div class="mb-10">
               
                    <Row>
                        {data.map((i) => (
                        <Col>
                      
                            <Form.Label className='font-medium'>Jumlah:  </Form.Label>
                            <p>  {i.jumlah}</p>   
                        </Col>
                        ))} 

                        <Col></Col>
                    </Row>
                  </div> 
            <div>

                <Button variant="secondary mr-2"><ArrowBackIosIcon fontSize="medium"/>Kembali</Button>
                <Button variant="primary"><PrintIcon fontSize="medium"/> Cetak</Button>

                <div className="float-right">
                     
                                   <a>
                                     <Button variant="success"><CheckCircleIcon fontSize="medium"/>Ubah</Button>
                                  </a>
                         
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
  

