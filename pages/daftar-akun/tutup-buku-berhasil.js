import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import DoneIcon from '@material-ui/icons/Done';
import { Button } from 'react-bootstrap';

export default function TutupBukuBerhasil () {
	return (
		<Layout>
			<div variant="container">
				<h1>Tutup Buku Berhasil</h1>

				<div className="text-center">
					<DoneIcon style={{ fontSize: 150 }} />
					<h1>Tutup Buku Berhasil !</h1>
					<p>Buku Anda Periode Dari DD/MM/YYY hingga DD/MM/YYYY berhasil ditutup</p>
					<Link href="/">
						<Button variant="primary">Kembali ke Dashboard</Button>
					</Link>
				</div>
			</div>
		</Layout>
	);
}
