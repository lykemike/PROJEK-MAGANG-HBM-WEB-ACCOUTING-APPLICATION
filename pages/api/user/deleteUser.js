import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: req.body.userid,
            },
        })

        res.status(201).json({ message: 'DELETE USER SUCESS!', data: deleteUser })
    } catch (error) {
        res.status(400).json({ data: 'DELETE USER FAILED!', error })
        console.log(error)
    }
}
