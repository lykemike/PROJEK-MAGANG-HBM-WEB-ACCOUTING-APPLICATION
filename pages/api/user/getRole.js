import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const getRole = await prisma.role.findUnique({
            where: {
                id: parseInt(req.body.id),
            }
        })

        res.status(201).json({ message: 'ROLE FOUND!', data: getRole })
    } catch (error) {
        res.status(400).json({ data: 'ROLE NOT FOUND!', error })
        console.log(error)
    }
}

