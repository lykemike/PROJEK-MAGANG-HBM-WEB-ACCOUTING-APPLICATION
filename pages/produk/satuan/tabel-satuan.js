import React, {useState} from 'react';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import TablePagination from "../../../components/TablePagination";
import { Card, Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default function tabelSatuanProduk({ data }) {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
  
    const firstIndex = page * rowsPerPage;
    const lastIndex = page * rowsPerPage + rowsPerPage;

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
			<Row>
				<Col>
					<h2>Satuan Produk</h2>
					<p>Menambahkan Satuan Produk Baru</p>
				</Col>
			</Row>
			<hr />

			<Row>
				<Col sm="2">
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon1">
								<SearchIcon />
							</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl placeholder="cari" aria-label="cari" aria-describedby="basic-addon1" />
					</InputGroup>
				</Col>
				<Col className="d-flex justify-content-end">
					<Link href="/produk/satuan/add-satuan">
						<a>
							<Button variant="primary">
								<AddIcon fontSize="small" />
								Tambah
							</Button>
						</a>
					</Link>
				</Col>
			</Row>

			<hr className="mt-12" />

			<Card>
				<Card.Body>
					<div className="mt-2">
						<table className="min-w-full table-auto">
							<thead className="justify-between">
								<tr className="bg-dark">
									<th className="px-2 py-2">
										<span className="text-gray-300">Nama Satuan</span>
									</th>
									{/* <th className="px-2 py-2">
										<span className="text-gray-300">Action</span>
									</th> */}
								</tr>
							</thead>

							<tbody className="bg-white divide-y divide-gray-200">
								{data.slice(firstIndex, lastIndex).map((satuanProduk) => (
									<tr>
										<td className="px-2 py-2 whitespace-nowrap" >
											<div className="text-sm text-gray-900">{satuanProduk.satuan}</div>
										</td>
										{/* <td className="px-2 py-2 whitespace-nowrap">
											<div className="text-sm text-gray-900">
                                                <Link key={satuanProduk.id} href={`${satuanProduk.id}`}>
                                                    <a>
                                                        <Button variant="warning mr-2">Edit</Button>
                                                    </a>
                                                </Link>
											</div>
										</td> */}
									</tr>
								))} 
							</tbody>
						</table>
                        <div class='flex items-center justify-center mt-4'>
                        <TablePagination
                            onPrevChange={handlePrevChange}
                            onNextChange={handleNextChange}
                            onFirstPage={handleFirstPage}
                            onLastPage={handleLastPage}
                            onClickPage={handleClickPage}
                            lastIndex={parseInt(data.length / rowsPerPage)}
                            currentPage={page}
                        />
                        </div>                       
					</div>
				</Card.Body>
			</Card>
		</Layout>
	);
}

export async function getServerSideProps() {
	// Get Kategori Produk from API
	const satuanProduk = await prisma.satuanProduk.findMany({
		orderBy: {
			id: 'asc'
		}
	});

	return {
		props: {
			data: satuanProduk
		}
	};
}
