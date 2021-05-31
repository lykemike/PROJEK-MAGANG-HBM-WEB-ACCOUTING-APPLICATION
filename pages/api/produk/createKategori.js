import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {

    try {
        const createKategoriProduk = await prisma.kategoriProduk.createMany({
            data: [
                {
                    nama: req.body.nama,
                    jumlah: parseInt(req.body.jumlah)
                },
            ],
            skipDuplicates: true,
        })

        res.status(201).json({ message: 'CREATE KATEGORI PRODUK SUCCESSFUL!', data: createKategoriProduk })
    } catch (error) {
        res.status(400).json({ data: 'CREATE KATEGORI PRODUK FAILED!', error })
        console.log(error)
    }
}
