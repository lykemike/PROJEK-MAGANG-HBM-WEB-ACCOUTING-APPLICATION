import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const getkontak = await prisma.kontak.findUnique({
            where: {
                id: parseInt(req.body.id),
            }
        })

        res.status(201).json({ message: 'KONTAK FOUND!', data: getkontak })
    } catch (error) {
        res.status(400).json({ data: 'KONTAK NOT FOUND!', error })
        console.log(error)
    }
}

