import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const deleteRole = await prisma.role.delete({
            where: {
                id: req.body.roleid,
            },
        })

        res.status(201).json({ message: 'DELETE ROLE SUCCESS!', data: deleteRole })
    } catch (error) {
        res.status(400).json({ data: 'DELETE ROLE FAILED!', error })
        console.log(error)
    }
}
