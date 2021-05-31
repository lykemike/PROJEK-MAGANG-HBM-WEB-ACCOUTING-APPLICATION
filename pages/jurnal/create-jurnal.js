import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col} from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link';

// import 'date-fns';
// import {KeyboardDatePicker} from '@material-ui/pickers';

export default function createjurnal() {
    // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    // const handleDateChange = (date) => {
    //     setSelectedDate(date);
    // };
    return (
        <Layout>
            <h1>Jurnal</h1>
            <Form>
                <Form.Group as={Row} controlId="formPlaintext">
                    <Form.Label column sm="2">
                    No. Transaksi
                    </Form.Label>
                    <Form.Label column sm="2">
                    Tgl.Transaksi
                    </Form.Label>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="2">
                    <Form.Control type="text" placeholder="" />
                    </Col>
                    <Col sm="2">
                    <Form.Control type="date" placeholder="" />
                    {/* <KeyboardDatePicker disableToolbar variant="inline" format="MM/dd/yyyy" margin="normal" id="date-picker-inline" label="Date picker inline" value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{'aria-label': 'change date',}}/> */}
                    </Col>
                </Form.Group>
            </Form>
            <div className='card'>
                <div className='card-body'>
                <Form>
                <Form.Group as={Row} controlId="formPlaintext">
                    <Form.Label column sm="3">
                    Akun
                    </Form.Label>
                    <Form.Label column sm="2">
                    Deskripsi
                    </Form.Label>
                    <Form.Label column sm="2">
                    Tag
                    </Form.Label>
                    <Form.Label column sm="2">
                    Debit
                    </Form.Label>
                    <Form.Label column sm="2">
                    Kredit
                    </Form.Label>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintext">
                    <Col sm="3">
                    <Form.Control as="select">
                        <option>Default select</option>
                    </Form.Control>
                    </Col>
                    <Col sm="2">
                    <Form.Control type="text" placeholder="" />
                    </Col>
                    <Col sm="2">
                    <Form.Control type="text" placeholder="" />
                    </Col>
                    <Col sm="2">
                    <Form.Control type="text" placeholder="" />
                    </Col>
                    <Col sm="2">
                    <Form.Control type="text" placeholder="" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="3">
                        <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"><AddIcon fontSize="small"/> Tambah data</button>
                        </Col>
                        <Col sm="3">
                            
                        </Col>
                        <Col sm="3">
                        Total Debit <br/>
                        Rp. 0,00    
                        </Col>
                        <Col sm="3">                    
                        Total Kredit <br/>
                        Rp. 0,00
                        </Col>
                        
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="3">
                        File Attachment
                        <Form.File id="custom-file" label="Browse file" custom/>
                        </Col>                       
                </Form.Group>
                </Form>
                </div>
            </div>    
            <div class="left-0 px-4 py-3 border-t border-gray-200 w-full flex justify-end items-center gap-3">  
            <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none">Batal</button>
            <Link href="/jurnal/jurnal-entry">
            <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Submit</button>
           </Link> 
           </div>
            
        </Layout>
    )
}
