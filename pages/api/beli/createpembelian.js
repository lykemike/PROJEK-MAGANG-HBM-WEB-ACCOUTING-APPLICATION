import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export default async (req, res) => {
	try {
		const kontakPembelian = {
			kontakID: parseInt(req.body.nama_supplier),
			namasupplier: req.body.nama_supplier,
			email: req.body.email,
			alamatsupplier: req.body.alamat_supplier,
			tgltransaksi: req.body.tgl_transaksi,
			tgljatuhtempo: req.body.tgl_jatuhtempo,
			syaratpembayaran: req.body.syarat_pembayaran,
			no_ref_supplier: parseInt(req.body.no_ref_supplier),
			notransaksi: parseInt(req.body.no_transaksi),
			tag: req.body.tag,
			uangmuka: parseInt(req.body.uangmuka),
			sisa_tagihan: req.body.sisatagihan,
			pesan: req.body.pesan,
			memo: req.body.memo,
			fileattachment: '-',
			diskontambahan: req.body.diskontambahan,
			pemotongan: req.body.pemotongan,
			total: req.body.total
		};

		const createpembelian = await prisma.pembelian.createMany({
			data: [kontakPembelian]
		});

		const findpembelian = await prisma.pembelian.findFirst({
			where: {
				notransaksi: parseInt(req.body.no_transaksi)
			}
		});
		let detail = [];
		req.body.produks.map((i) => {
			detail.push({
				pembelianID: findpembelian.notransaksi,
				produkID: parseInt(i.produk_ID),
				nama_produk: i.nama_produk,
				desk_produk: i.deskripsi_produk,
				kuantitas: parseInt(i.kuantitas),
				satuan: 'gram',
				harga_satuan: parseInt(Math.floor(i.satuan)),
				diskon: parseInt(i.diskon),
				diskonperbaris: parseInt(i.diskonperbaris),
				pajakperbaris: parseInt(i.pajakperbaris),
				pajakID: parseInt(i.pajakID),
				pajak: 0,
				jumlah: Math.floor(i.jumlah)
			});
		});
		const createpembeliandetail = await prisma.pembeliandetail.createMany({
			data: detail,
			skipDuplicates: true
		});

		res.status(201).json([
			{ message: 'CREATE PEMBELIAN SUCCESS!', data: findpembelian },
			{ message: 'CREATE PEMBELIAN SUCCESS!', data: createpembeliandetail }
		]);
	} catch (error) {
		res.status(400).json([
			{ data: 'CREATE PEMBELIAN FAILED!', error },
			{ data: 'CREATE PEMBELIAN FAILED!', error }
		]);
		console.log(error);
	}
};
