import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import Link from 'next/link';
import { Button, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import TablePagination from "../../components/TablePagination";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default function jurnalentry({ data }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
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
            <div variant="container">
                <div class="text-md font-medium text-gray-900">
                    <AccountBalanceWalletIcon /> Kas & Bank</div>
                <h4 class="mt-2">
                    Akun Kas
                 </h4>

                <div class="flex flex-row-reverse">

                    <DropdownButton variant="primary ml-2" id="dropdown-basic-button" title="Buat Transaksi">
                        <Dropdown.Item>
                            <Link href="/kasbank/transferuang">
                                <a>Transfer Uang</a>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href="/kasbank/terimauang">
                                <a>Terima Uang</a>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link href="/kasbank/kirimuang">
                                <a>Kirim Uang</a>
                            </Link>
                        </Dropdown.Item>

                    </DropdownButton>
                </div>
                <div className="mt-8">
                    <table className="min-w-full table-auto">
                        <thead className="justify-between">
                            <tr className="bg-dark">
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Kode Akun</span>
                                </th>
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Nama Akun</span>
                                </th>
                                <th className="px-2 py-2">
                                    <span className="text-gray-300">Saldo</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.slice(firstIndex, lastIndex).map((kasBank, index) => (
                                <tr>
                                    <td className="px-2 py-2 whitespace-nowrap font-medium">
                                        <div className="text-sm text-gray-900">{kasBank.kode_akun}</div>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                    <Link key={index} href={`/kasbank/${kasBank.id}`}>
                                        <div className="text-sm text-gray-900">{kasBank.nama_akun}</div>
                                    </Link>
                                    </td>
                                    <td className="px-2 py-2 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">Rp. 0,00</div>
                                    </td>
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
            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    // Get Akuns from API
    const kasBank = await prisma.akun.findMany({
        where:
        {
            kategoriId: 3
        }

    });

    return {
        props: {
            data: kasBank
        }
    }
}

