import { React, useEffect } from 'react';
import Layout from '../../components/Layout';

export default function test() {
	const data = [
		{ name: 'Pensil', price: 10000 },
		{ name: 'Buku Tulis', price: 10000 },
		{ name: 'Pulpen sarasa', price: 20000 }
	];

	const sum = data.map((total) => total.price).reduce((a, b) => a + b);

	const total = data.reduce((a, b) => (a = a + b.price), 0);
	return (
		<Layout>
			<p> {sum} </p>
			<p>{total}</p>
		</Layout>
	);
}
