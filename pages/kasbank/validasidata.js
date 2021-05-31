import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown , Row , Col, Form, Card, InputGroup,FormControl} from 'react-bootstrap';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const validasidata = () => {
    return (
        <Layout>
        <div variant="container">
        <div class="text-md font-medium text-gray-900 mb-2">
           
            Impor - Rekening Koran 
            <Row>
                <Col>
                    <h4 class="mt-2 mb-5">
                        Validasi Data
                        </h4>
                 </Col>
            </Row>
            <Row></Row>
        <div class="mt-2">
                    <div>
                        
                       <h1>
                       <div class="text-lg text-gray-900">Mohon Cek Kembali Rekening Koran :</div>  
                       </h1>

                        <div className="float-right mb-5 mt-3">
                        <Button variant="success mr-2"><ThumbUpIcon fontSize="medium"/> Berhasil : X</Button>
                        <Button variant="danger mr-2"><SmsFailedIcon fontSize="medium"/> Gagal : X </Button>
                        <Button variant="secondary mr-2"><AddToQueueIcon fontSize="medium"/> Total : X</Button>
                        </div>
                        </div>
							
                          <Table class="table mt-8">
				            	<thead class="thead-light">
                              <tr>
                            <th class="px-2 py-2">
                                <span>Tanggal</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Terima(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-2">
                                <span>Kirim(dalam IDR)</span>
                            </th>
                            <th class="px-2 py-2">
                                 <span>Deskripsi</span>
                            </th>
    
                        </tr>
                        </thead>    
                        <tr>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">1 Januari 2021</div>
                            </td>
                            <td class="px-8 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">01-02</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">Rp, 0.00</div>
                            </td>
                            <td class="px-2 py-2 whitespace-nowrap font-large">
                            <div class="text-lg text-gray-900">DATA DUMMY</div>
                            </td>
            
                        </tr>    
                    </Table>                
				</div>
                
        </div>
        <div class="float-right mt-10">
         <Link href="/kasbank/akundetail">   
        <Button variant="outline-dark mt-20"><KeyboardBackspaceIcon fontSize="medium"/> Kembali</Button>
        </Link>
        </div>
   	    </div>
     </Layout>      
        
    )  
}

export default validasidata
