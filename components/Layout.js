import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }) {
	return (
		<div className="bg-white-300">
			<Navbar />
			<Sidebar />
			<Head>
			</Head>

			<main className="ml-64 p-8">{children}</main>
		</div>
	);
}
