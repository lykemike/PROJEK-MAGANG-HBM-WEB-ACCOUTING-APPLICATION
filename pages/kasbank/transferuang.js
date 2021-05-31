import React,{useState} from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton ,FormControl,InputGroup, Dropdown , Row , Col, Form, Card} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {Formik , Form as Forms} from 'formik'
import * as Yup from 'yup'

const TransferUangSchema = Yup.object().shape({
    bankPengirim: Yup.string()
      .required('Required'),
    bankPenerima : Yup.string().required('Required'),
    // lastName: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('Required'),
    // email: Yup.string().email('Invalid email').required('Required'),
  });



const transferuang = () => {
    return (
        <Layout>
             <Formik
                    initialValues={{
                        bankPengirim : '',
                        bankPenerima : "",
                    }}
                    validationSchema={TransferUangSchema}
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
                Transfer Uang
                 </h4>

        <div class="mb-10">
            <Row>
                <Col >
                <Form.Label>
                    Transfer dari
                </Form.Label>
                        <Form.Control as="select"  name="bankPengirim" onChange={props.handleChange} onBlur={props.handleBlur}>
                            <option value='' disabled>Pilih Bank Pengirim</option>
                            <option value="BCA">BCA</option>
                            <option value="BRI">BRI</option>
                        </Form.Control>
                        {props.errors.bankPengirim && props.touched.bankPengirim ? <div>{props.errors.bankPengirim}</div> : null}
                </Col>
                <Col>
                    <Form.Label>
                    Setor ke
                    </Form.Label>
                        <Form.Control as="select" name="bankPenerima" onChange={props.handleChange} onBlur={props.handleBlur}>
                            <option value=''>Pilih Bank Penerima</option>
                            <option value="BCA">BCA</option>
                            <option value="BRI">BRI</option>
                            <option value="BNI">BNI</option>
                            <option value="BUKOPIN">BUKOPIN</option>
                            <option VALUE="MANDIRI">MANDIRI</option>
                          </Form.Control>
                          {props.errors.bankPenerima && props.touched.bankPenerima ? <div>{props.errors.bankPenerima}</div> : null}
                     </Col>
                <Col>
                <Form.Label>
                    Jumlah
                </Form.Label>
                <Form.Control placeholder="Jumlah Uang" /></Col>
            </Row>
        </div>

        <div class="mb-10">
            <Row>
                <Col>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Memo</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                </Col>
                
                <Col> 
                <Form.Label>
                    Nomor Transaksi
                </Form.Label>
                <Form.Control placeholder="ID" />
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
                <Form.Label>
                    Tag
                </Form.Label>
                <Form.Control placeholder="Tag" />
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
      
     <div className="float-right">
                <Button variant="danger mr-2"><HighlightOffIcon fontSize="medium"/> Batal</Button>
                <Link href="/kasbank/banktransfer">
                <Button variant="success" type="submit" onClick={props.handleSubmit}><CheckCircleIcon fontSize="medium"/> Buat Transferan</Button>
                </Link>
        </div>
        </div>
        </Forms>
                    )}
        </Formik>          
        </Layout>
    )
}

export default transferuang

