import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createpenjualan = await prisma.penjualan.createMany({
            data: [
                {
                    namapelanggan: req.body.nama_pelanggan,
                    email: req.body.email,
                    alamatpenagihan: req.body.alamat_penagihan,
                    tgltransaksi: req.body.tgl_transaksi,
                    tgljatuhtempo: req.body.tgl_jatuhtempo,
                    syaratpembayaran: req.body.syarat_pembayaran,
                    no_ref_penagihan: parseInt(req.body.no_ref_penagihan),
                    tag: req.body.tag,
                    nama_produk: req.body.nama_produk,
                    desk_produk: req.body.deskripsi_produk,
                    kuantitas: parseInt(req.body.kuantitas),
                    satuan: "kg",
                    harga_satuan: parseInt(req.body.harga_satuan),
                    diskon: parseInt(req.body.diskon),
                    pajak: parseInt(req.body.pajak),
                    sisa_tagihan: parseInt(req.body.sisatagihan),
                    pesan: req.body.pesan,
                    fileattachment: req.body.fileattachment,
                    uangmuka: parseInt(req.body.uangmuka),
                    kontakID: 1,
                    pajakID: 1,
                    produkID: 1
                }
            ],
            skipDuplicates: true,
        })

        res.status(200).json({ message: 'CREATE USER SUCCESS!', data: createpenjualan })
    } catch (error) {
        res.status(400).json({ data: 'CREATE USER FAILED!', error })
        console.log(error)
    }
}
