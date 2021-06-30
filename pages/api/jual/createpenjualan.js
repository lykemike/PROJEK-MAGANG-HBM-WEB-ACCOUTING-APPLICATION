import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export default async (req, res) => {
	try {
		const kontakPenjualan = {
			kontakID: parseInt(req.body.nama_pelanggan),
			namapelanggan: req.body.nama_pelanggan,
			email: req.body.email,
			alamatpenagihan: req.body.alamat_penagihan,
			tgltransaksi: req.body.tgl_transaksi,
			tgljatuhtempo: req.body.tgl_jatuhtempo,
			syaratpembayaran: req.body.syarat_pembayaran,
			no_ref_penagihan: parseInt(req.body.no_ref_penagihan),
			notransaksi: parseInt(req.body.no_transaksi),
			tag: req.body.tag,
			uangmuka: parseInt(req.body.uangmuka),
			sisa_tagihan: Math.floor(req.body.sisatagihan),
			pesan: req.body.pesan,
			memo: req.body.memo,
			fileattachment: '-',
			diskontambahan: req.body.diskontambahan,
			pemotongan: req.body.pemotongan,
			total: Math.floor(req.body.total)
		};

		const createpenjualan = await prisma.penjualan.createMany({
			data: [kontakPenjualan]
		});
		const findpenjualan = await prisma.penjualan.findFirst({
			where: {
				notransaksi: parseInt(req.body.no_transaksi)
			}
		});

		let detail = [];
		req.body.produks.map((i) => {
			detail.push({
				penjualanID: findpenjualan.notransaksi,
				produkID: parseInt(i.produk_ID),
				nama_produk: i.nama_produk,
				desk_produk: i.deskripsi_produk,
				kuantitas: parseInt(i.kuantitas),
				satuan: 'gram',
				harga_satuan: parseInt(Math.floor(i.harga_satuan)),
				diskon: parseInt(i.diskon),
				diskonperbaris: parseInt(i.diskonperbaris),
				pajakperbaris: parseInt(i.pajakperbaris),
				pajakID: parseInt(i.pajakID),
				pajak: 0, //pajak nanti di hapus
				jumlah: Math.floor(i.jumlah)
			});
		});

		const createpenjualandetail = await prisma.penjualandetail.createMany({
			data: detail,
			skipDuplicates: true
		});

		res.status(201).json([
			{ message: 'CREATE PENJUALAN SUCCESS!', data: findpenjualan },
			{ message: 'CREATE PENJUALAN SUCCESS!', data: createpenjualandetail }
		]);
	} catch (error) {
		res.status(400).json([
			{ data: 'CREATE PENJUALAN FAILED!', error },
			{ data: 'CREATE PENJUALAN FAILED!', error }
		]);
		console.log(error);
	}
};
