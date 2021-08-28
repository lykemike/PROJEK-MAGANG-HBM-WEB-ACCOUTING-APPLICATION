import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { Form, Row, Col, Button } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default function jurnalentry({data,data2}) {
	const router = useRouter();
	const { id } = router.query;

	function edit() {
		router.push(`../${id}`);
	  }

	return (
		<Layout>
			<h3>Transaksi</h3>
			<h2 class="mb-4">Jurnal Entry #{id}</h2>
			{data.map((i) => (
			<Form>
				<Form.Group as={Row} controlId="formPlaintext">
					<Col sm="3">
						Tgl. Transaksi: <br />
						{i.tgl_transaksi}
					</Col>
					<Col sm="3">
						No. Transaksi <br />
						{i.no_transaksi}
					</Col>
					<Col sm="3"></Col>
					<Col sm="3">
						<button type="button" class="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg">
							Cetak
						</button>
					</Col>
				</Form.Group>
			</Form>
			))}
 		
		 
			<table class="min-w-full table-auto">
				<thead class="justify-between">
					<tr class="bg-dark">
						<th class="px-2 py-2">
							<span class="text-gray-300">No Akun</span>
						</th>
						<th class="px-8 py-2">
							<span class="text-gray-300">Akun</span>
						</th>
						<th class="px-2 py-2">
							<span class="text-gray-300">Deskripsi</span>
						</th>
						<th class="px-2 py-2">
							<span class="text-gray-300">Debit(in IDR)</span>
						</th>
						<th class="px-2 py-2">
							<span class="text-gray-300">Kredit(in IDR)</span>
						</th>
					</tr>
				</thead>
			{data2.map((i) => (
				<tbody class="bg-white divide-y divide-gray-200">
					{/* {data.map((i, index) => ( */}
					<tr>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">{i.akun.kode_akun}</div>
						</td>
						<td class="px-8 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">{i.akun.nama_akun}</div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">{i.deskripsi}</div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">Rp. {i.debit}</div>
						</td>
						<td class="px-2 py-2 whitespace-nowrap font-large">
							<div class="text-lg text-gray-900">Rp. {i.kredit}</div>
						</td>
					</tr>
			
				</tbody>	
				))}	
			</table>
			
		
		
{data.map((i) => (
			<Form class="mt-5">
				<Form.Group as={Row} controlId="formPlaintext">
					<Col sm="3">
					</Col>
					<Col sm="3"></Col>
					<Col sm="3">	
					Total Debit: <br />
					{i.total_debit}
					</Col>
					<Col sm="3">
					Total Kredit: <br/>
					{i.total_kredit}
					</Col>
				</Form.Group>
			</Form>
	))}

			<Form class="mt-10">
				<Form.Group as={Row} controlId="formPlaintext">
					<Col sm="3">
						<div class="px-0 py-3">
							<button type="button" class="focus:outline-none text-white text-sm py-2 px-4 rounded-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" onClick={edit}>
								Edit
							</button>
						</div>
					</Col>
					<Col sm="3"></Col>
					<Col sm="3"></Col>
					<Col sm="3">
					</Col>
				</Form.Group>
			</Form>
		</Layout>
	);
}

export async function getServerSideProps(context) {
    const { id } = context.query;
  
    const header = await prisma.headerJurnal.findMany({
      where: {
        id: parseInt(id),
      },
      include: {
        DetailJurnal: true,
      },
    });
  
    const detail = await prisma.detailJurnal.findMany({
      where: {
        header_jurnal_id: parseInt(id),
      },
      include: {
        header_jurnal: true,
        akun: true,
      },
    });
  
    return {
      props: {
        data: header,
        data2: detail,
      },
    };
  }
  