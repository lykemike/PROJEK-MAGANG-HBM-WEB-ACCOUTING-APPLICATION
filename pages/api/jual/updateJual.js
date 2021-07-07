import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {

    try {
        const updateJual = await prisma.jual.update({
            where: {
                id: parseInt(req.body.id),
            },
            data:
            {
                namapelanggan: req.body.nama_pelanggan,
			    tgltransaksi: req.body.tgl_transaksi,
			    tgljatuhtempo: req.body.tgl_jatuhtempo,
			    notransaksi: parseInt(req.body.no_transaksi),
                tag: req.body.tag
            }
        })

        res.status(201).json({ message: 'UPDATE PENJUALAN SUCCESS!', data: updateJual })
    } catch (error) {
        res.status(400).json({ data: 'UPDATE PENJUALAN FAILED!', error })
        console.log(error)
    }
}
