import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const getJual = await prisma.jual.findUnique({
            where: {
                id: parseInt(req.body.id),
            }
        })

        res.status(201).json({ message: 'USER FOUND!', data: getJual })
    } catch (error) {
        res.status(400).json({ data: 'USER NOT FOUND!', error })
        console.log(error)
    }
}
