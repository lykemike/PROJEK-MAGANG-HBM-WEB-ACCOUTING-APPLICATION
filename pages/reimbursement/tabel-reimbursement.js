import React,{useState} from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { Button, Row, Col, FormControl } from 'react-bootstrap';
import Add from '@material-ui/icons/Add';
import TablePagination from "../../components/TablePagination";
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'
import { useRouter } from 'next/router'

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export default function list({  }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const firstIndex = page * rowsPerPage;
    const lastIndex = page * rowsPerPage + rowsPerPage;

    // // User API
    // const deleteUser = 'http://localhost:3000/api/user/deleteUser'

    // // Redirect Function
    // const router = useRouter();

    // // Delete Exisiting User based on [id] 
    // const handleDelete = async (id) => {
    //     Axios.delete(deleteUser, {
    //         data: {
    //             userid: id
    //         }
    //     }).then(function (response) {
    //         console.log(response);
    //         router.push('tabel-user');
    //     }).
    //         catch(function (error) {
    //             console.log(error)
    //         })
    // };

    
  const handlePrevChange = () => {
    if (page < 1) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };

  const handleNextChange = () => {
    if (page < parseInt(data.length / rowsPerPage)) {
      setPage(page + 1);
    } else {
      setPage(parseInt(data.length / rowsPerPage));
    }
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleClickPage = (id) => {
    setPage(id);
  };

  const handleLastPage = () => {
    setPage(parseInt(data.length / rowsPerPage));
  };

    return (
        <Layout>
            {/* <Formik>
                {(props) => (
                    <Forms noValidate> */}
                        <div variant="container">
                            <Row>
                                <Col>
                                    <h4>Reimbursement List</h4>
                                </Col>

                                <Col className="d-flex justify-content-end">
                                    <Link href="add-reimbursement">
                                        <Button variant="primary mr-2"><Add fontSize="small" /> Buat Reimbursement Baru</Button>
                                    </Link>
                                </Col>
                            </Row>

                           
                            <Row className="mt-3">
                                <Col sm="9">
                                
                                </Col>

                                <Col sm="3" className="float-right">
                                     <FormControl placeholder='Search . . . .' aria-label='cari' aria-describedby='basic-addon1' onChange={(e) => handleChange(e)} />
                                </Col>
                            </Row>
                            <div className="mt-8">
                                <table className="min-w-full table-auto">
                                    <thead className="justify-between">
                                        <tr className="bg-dark">
                                            <th className="px-2 py-2">
                                                <span className="text-gray-300">Nama Pegawai</span>
                                            </th>
                                            <th className="px-2 py-2">
                                                <span className="text-gray-300">No Reimbursement</span>
                                            </th>
                                            <th className="px-2 py-2">
                                                <span className="text-gray-300">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* {data.slice(firstIndex, lastIndex).map((user) => ( */}
                                            <tr >
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">COBA COBA</div>
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">COBA COBA</div>
                                                </td>

                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        <Button variant="danger">Delete</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        {/* ))} */}
                                    </tbody>
                                </table>
                                <div class='flex items-center justify-center mt-4'>
                                    {/* <TablePagination
                                    onPrevChange={handlePrevChange}
                                    onNextChange={handleNextChange}
                                    onFirstPage={handleFirstPage}
                                    onLastPage={handleLastPage}
                                    onClickPage={handleClickPage}
                                    lastIndex={parseInt(data.length / rowsPerPage)}
                                    currentPage={page}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    {/* </Forms>
                )}
            </Formik> */}
        </Layout>
    )
}

export async function getServerSideProps() {
    // Get User and Role Names from API


    return {
        props: {
       
        }
    }
}