import React from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col ,FormControl} from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link';

import * as Yup from 'yup'
import { Formik, Form as Forms, FieldArray } from "formik";
import Axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// import 'date-fns';
// import {KeyboardDatePicker} from '@material-ui/pickers';

export default function create_jurnal({data}) {
	const router = useRouter();

	// const url = "http://localhost:3000/api/";

    return (
        <Layout>
             <Formik
                initialValues={{
                    no_transaksi: '',
                    tgl_transaksi: "",
                    nama_akun: 0,
                    deskripsi: "",
                    tag: "",
                    debit: "" ,
                    kredit: "",
                    totaldebit: "",
                    totalkredit: "",
                    lampiran: ""
                }}
                onSubmit={async (values) => {
                    // alert(JSON.stringify(values, null, 2));
                    // console.log(values)
                    Axios.post(url, values)
                        .then(function (response) {
                        console.log(response);
                        router.push("");
                        })
                        .catch(function (error) {
                        console.log(error);
                        });
                    }}>                        
        {(props) => (
          <Forms noValidate>
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
                    <Form.Control 
                        placeholder="Auto"
                        name="no_transaksi"
                        disabled
                    />
                    </Col>
                    <Col sm="2">
                    <FormControl
                        placeholder="Pick date"
                        type='date'
                        aria-label="date"
                        name="tgl_transaksi"
                        />
                        {props.errors.tgl_transaksi && props.touched.tgl_transaksi ? <div>{props.errors.tgl_transaksi}</div> : null}
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
                         <Form.Control placeholder="Isi Deskripsi" name="deskripsi"/>  
                    </Col>
                    <Col sm="2">
                         <Form.Control placeholder="" name="tag"/>   
                    </Col>
                    <Col sm="2">
                         <Form.Control placeholder="Isi Debit" name="debit"/>  
                    </Col>
                    <Col sm="2">
                         <Form.Control placeholder="Isi Kredit" name="kredit"/>  
                    </Col>
                </Form.Group>
           

                <Form.Group as={Row} controlId="formPlaintext">
                        <Col sm="3">
                        <button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg"><AddIcon fontSize="small"/> Tambah data</button>
                        </Col>
                        <Col sm="3">
                            
                        </Col>
                        <Col sm="3" name="totaldebit">
                        Total Debit <br/>
                        Rp. 0,00    
                        </Col>
                        <Col sm="3" name="totalkredit">                    
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
            <button onclick="openModal(false)"class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white focus:outline-none ml-4 mr-2">Batal</button>
            <Link href="/jurnal/jurnal-entry">
            <button class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white focus:outline-none">Submit</button>
           </Link> 
           </div>
           </Forms>
         )}
        </Formik> 
        </Layout>
    )
}

export async function getServerSideProps() {
    const akuns = await prisma.akun.findMany({
      orderBy: [
        {
          kode_akun: "asc",
        },
      ],
      include: {
        kategori_akun: true,
      },
    });
  
    return {
      props: {
        data: akuns,
      },
    };
  }
  