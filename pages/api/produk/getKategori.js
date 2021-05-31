import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {

    try {
        const getKategoriProduk = await prisma.kategoriProduk.findUnique({
            where: {
                id: req.body.id,
            }
        })

        res.status(201).json({ message: 'KATEGORI PRODUK FOUND!', data: getKategoriProduk })
    } catch (error) {
        res.status(400).json({ data: 'KATEGORI PRODUK NOT FOUND!', error })
        console.log(error)
    }
}

