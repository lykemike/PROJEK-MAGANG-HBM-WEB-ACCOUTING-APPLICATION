import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const getkontak = await prisma.kontak.findUnique({
            where: {
                id: ParseInt(req.body.id),
            }
        })

        res.status(201).json({ message: 'USER FOUND!', data: getkontak })
    } catch (error) {
        res.status(400).json({ data: 'USER NOT FOUND!', error })
        console.log(error)
    }
}

