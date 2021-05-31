// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // const createMany = await prisma.role.createMany({
    //   data: [
    //     { roleType: "Admin", roleDesc: "super user, access to all admin rights" },
    //     { roleType: "Web Developer", roleDesc: "Web Developer front end and back end" },
    //     { roleType: "Mobile Programmer", roleDesc: "Mobile developer creating mobile apps android or ios" },
    //   ],
    //   skipDuplicates: true,
    // })

    // const allRoles = await prisma.role.findMany({
    //   include: {
    //     User: true,
    //   },
    // })

    // console.dir(allRoles, { depth: null })

    // res.status(200).json({ message: 'success!', data: createMany })
  } catch (error) {
    // res.status(400).json({ roleType: 'error', error })
  }
}
