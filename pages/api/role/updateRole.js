import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {

    try {
        const updateRole = await prisma.role.update({
            where: {
                id: parseInt(req.body.id)
            },
            data:
            {
                roleType: req.body.role_type,
                roleDesc: req.body.role_desc
            }
        })

        res.status(201).json({ message: 'UPDATE ROLE SUCCESS!', data: updateRole })
    } catch (error) {
        res.status(400).json({ data: 'UPDATE ROLE FAILED!', error })
        console.log(error)
    }
}
