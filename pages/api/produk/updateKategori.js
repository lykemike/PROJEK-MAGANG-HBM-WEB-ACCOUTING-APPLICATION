import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {

    try {
        const updateKategoriProduk = await prisma.kategoriProduk.update({
            where: {
                id: parseInt(req.body.id)
            },
            data:
            {
                nama: req.body.nama,
                jumlah: parseInt(req.body.jumlah)
            }
        })

        res.status(201).json({ message: 'UPDATE KATEGORI PRODUK SUCCESS!', data: updateKategoriProduk })
    } catch (error) {
        res.status(400).json({ data: 'UPDATE KATEGORI PRODUK FAILED!', error })
        console.log(error)
    }
}
