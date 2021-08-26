import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const deleteAset = await prisma.aset.delete({
            where: {
                id: req.body.asetid,
            },
        })

        res.status(201).json({ message: 'DELETE ASET SUCESS!', data: deleteAset })
    } catch (error) {
        res.status(400).json({ data: 'DELETE ASET FAILED!', error })
        console.log(error)
    }
}