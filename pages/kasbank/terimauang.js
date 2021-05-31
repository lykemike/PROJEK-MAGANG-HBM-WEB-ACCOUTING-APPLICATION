import React,{useState} from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton,InputGroup, FormControl,Dropdown , Row , Col, Form, Card} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {Formik , Form as Forms} from 'formik'
import * as Yup from 'yup'

const TerimaUangSchema = Yup.object().shape({
    setor: Yup.string()
      .required('Required'),
    pengirim : Yup.string().required('Required'),
    pembayaranAkun : Yup.string().required('Harus Dipilih!'),
    nomortransaksi : Yup.string().required('Required')
    // lastName: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('Required'),
    // email: Yup.string().email('Invalid email').required('Required'),
  });


const terimauang = () => {
    return (
        <div>
         <Layout>
             <Formik
                    initialValues={{
                        setor : '',
                        pengirim : "",
                        pembayaranAkun : '',
                        nomortransaksi : ""
                    }}
                    validationSchema={TerimaUangSchema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {(props) => (
                        <Forms noValidate>
        <div variant="container">
        <div class="text-md font-medium text-gray-900 mb-2">
            Transaksi</div>
             <h4 class="mt-2 mb-5">
                Terima Uang
                 </h4>

        <div class="mb-10">
            <Row>
                <Col >
                <Form.Label>
                    Setor ke
                    </Form.Label>
                        <Form.Control as="select" name="setor" onChange={props.handleChange} onBlur={props.handleBlur}>
                            <option value='' disabled>Pilih Bank Penerima</option>
                            <option value='BCA'>BCA</option>
                            <option value='BRI'>BRI</option>
                            <option value='BNI'>BNI</option>
                            <option value='BUKOPIN'>BUKOPIN</option>
                            <option value='MANDIRI'>MANDIRI</option>
                          </Form.Control>
                          {props.errors.setor && props.touched.setor ? <div>{props.errors.setor}</div> : null}
                </Col>
                <Col></Col>
                <Col>
                <h3>
                    Total Amount 
                </h3>
                <h2 class="text-purple-700 text-opacity-100 ">Rp, 0.00</h2>
                </Col>
            </Row>
        </div>

        <div class="mb-10">
            <Row>
                <Col>
                <Form.Label>
                    Yang Membayar
                </Form.Label>
                        <Form.Control as="select" name="pengirim" onChange={props.handleChange} onBlur={props.handleBlur}>
                            <option value="" disabled>Pilih Bank Pengirim</option>
                            <option value="BCA">BCA</option>
                            <option value="BRI">BRI</option>
                        </Form.Control>
                        {props.errors.pengirim && props.touched.pengirim ? <div>{props.errors.pengirim}</div> : null}
                </Col>
                
                <Col>
                                <Form.Label>
                                    Tanggal Transaksi
                                </Form.Label>
                                <InputGroup className="mb-3">
                                       
                                  
                                     
                                        <FormControl
                                        placeholder="Pick date"
                                        type='date'
                                        aria-label="date"
                                        />
                                    </InputGroup>
                               
                            
                                </Col>
                
                <Col> 
                <Form.Label name="nomortransaksi" onCharge={props.handleChange} onBlur={props.handleBlur}>
                    Nomor Transaksi
                </Form.Label>
                <Form.Control placeholder="ID" />
                {props.errors.nomortransaksi && props.touched.nomortransaksi ? <div>{props.errors.nomortransaksi}</div> : null}
                </Col>

                <Col>
                <Form.Label>
                    Tag
                </Form.Label>
                <Form.Control placeholder="Tag" />
                </Col>

            </Row>

        <div class="float-right mt-2 mb-4">
                <Form.Check
                    label="Harga Termasuk Pajak" 
                    type="switch"
                    id="custom-switch"
                    
                />
                </div>
                
        </div>

        <div class="mb-12">
        <Table class="table mt-4">
					<thead class="thead-light">
						<tr>
							<th class="text-center" scope="col">Terima Dari</th>
                            <th class="text-center" scope="col">Deskripsi</th>
							<th class="text-center" scope="col">Pajak</th>
							<th class="text-center" scope="col">Jumlah</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td> 
                                <Form.Control as="select" >
                                    <option value="1">Pilih 1</option>
                                </Form.Control>
                             
                            </td>   
     
							<td>
                                <Form.Control placeholder="Isi Deskripsi" />    
                            </td>   
							<td>
                                <Form.Control as="select">
                                    <option>Pilih 1</option>
                                </Form.Control>
                            </td>
							<td> 
                                <Form.Control placeholder="Input Jumlah" />  
                            </td>
						</tr>

						<tr>
							<td> 
                                <Form.Control as="select">
                                    <option>Pilih 1</option>
                                </Form.Control>
                            </td>
							<td>
                                <Form.Control placeholder="Isi Deskripsi" />    
                            </td>   
							<td>
                                <Form.Control as="select">
                                    <option>Pilih 1</option>
                                </Form.Control>
                            </td>
							<td> 
                                <Form.Control placeholder="Input Jumlah" />  
                            </td>
						</tr>
                      
					</tbody>
				</Table>
                <Button variant="primary ml-2"><PlaylistAddIcon fontSize="medium"/> Tambah Data</Button>
             </div>

        <div class="mb-6">
            <Row>
                <Col>
    
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Memo</Form.Label>
                    <Form.Control as="textarea" rows="4" />
                </Form.Group>
                
                </Col>
                <Col></Col> 
                <Col>
                <Form.Group as={Row} >
                        <Form.Label column sm="3">
                        Subtotal
                        </Form.Label>
                        <Col sm="6">
                        <Form.Control  placeholder="0,00" />
                        </Col>
                    </Form.Group>

                <Form.Group as={Row} >
                        <Form.Label column sm="3">
                        Total
                        </Form.Label>
                        <Col sm="6">
                        <Form.Control  placeholder="Rp, 0.00" />
                        </Col>
                </Form.Group>
                </Col>
            </Row>
        </div>
      
        <div class="mb-10">
            <Row>
                <Col>
                <div>
                <Form.Label>
                  <AttachmentIcon />  Lampiran
                </Form.Label>  
                
                <Card border="secondary" style={{ width: '15rem' }}>
						<p>
						     Tarik file ke sini, atau   
                        <Card.Link href="#"> pilih file</Card.Link>
                        </p>
                        <p>
						    Ukuran Max 10MB
						</p>
					</Card>
                </div>
                </Col>
                <Col></Col> 
                <Col>
                    
                </Col>
            </Row>
        </div>

     <div className="float-right mb-10">
                <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Batal</Button>
                <Link href="/kasbank/bankdeposit">
                <Button variant="success" type="submit" onClick={props.handleSubmit}><CheckCircleIcon fontSize="medium"/> Buat Transferan</Button>
                </Link>
        </div>
        </div>
        </Forms>
                    )}
        </Formik>
        </Layout>
        </div>
    )
}

export default terimauang
