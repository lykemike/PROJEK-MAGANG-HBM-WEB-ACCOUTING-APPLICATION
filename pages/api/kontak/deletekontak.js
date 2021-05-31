import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createMany = await prisma.kontak.delete({
            where: {
                id: req.body.kontakid
            },
        })

        res.status(201).json({ message: 'DELETE KONTAK SUCCESS!', data: createMany })
    } catch (error) {
        res.status(error.statusCode).json({ data: 'DELETE KONTAK FAILED!' })
        console.log(error)
    }
}
