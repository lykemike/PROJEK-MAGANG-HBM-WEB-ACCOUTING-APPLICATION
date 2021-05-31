import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const getPajak = await prisma.pajak.findUnique({
            where: {
                id: parseInt(req.body.id),
            }
        })

        res.status(201).json({ message: 'success!', data: getPajak })
    } catch (error) {
        res.status(400).json({ data: 'error', error })
        console.log(error)
    }
}