import React from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton , Dropdown , Row , Col, Form, Card, InputGroup,FormControl} from 'react-bootstrap';
import AttachmentIcon from '@material-ui/icons/Attachment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EventNoteIcon from '@material-ui/icons/EventNote';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PrintIcon from '@material-ui/icons/Print';

const banktransfer = () => {
    return (
        <Layout>
        <div variant="container">
            <div class="text-md font-medium text-gray-900 mb-2">
            
                Transaksi 
                <Row>
                    <Col>
                        <h4 class="mt-2 mb-5">
                            Bank Transfer #XXX
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
                            <Form.Label>
                                Transfer Dari
                            </Form.Label>
                            <Form.Control placeholder="" />
                        </Col>

                        <Col>
                            <Form.Label>
                                Tanggal Transaksi
                            </Form.Label>
                                <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text >
                                <EventNoteIcon/>
                                </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                    placeholder="Pick date"
                                    aria-label="date"
                                    />
                                </InputGroup>
                        </Col>
                    </Row>
                </div>

                <div class="mb-10">
                    <Row>
                        <Col >
                            <Form.Label>
                                Setor ke
                            </Form.Label>
                            <Form.Control placeholder="" />
                        </Col>

                        <Col>
                            <Form.Label>
                                Nomor Transaksi
                            </Form.Label>
                            <Form.Control placeholder="Auto" />
                        </Col>
                    </Row>
                </div>

                <div class="mb-10">
                    <Row>
                        <Col >
                            <Form.Label>
                                Jumlah
                            </Form.Label>
                            <Form.Control placeholder="" />
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

export default banktransfer
