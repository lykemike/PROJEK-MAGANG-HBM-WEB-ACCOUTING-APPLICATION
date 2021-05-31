import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const getProduk = await prisma.produk.findUnique({
            where: {
                id: parseInt(req.body.id),
            }
        })

        res.status(201).json({ message: 'PRODUK FOUND!', data: getProduk })
    } catch (error) {
        res.status(400).json({ data: 'PRODUK NOT FOUND!', error })
        console.log(error)
    }
}

