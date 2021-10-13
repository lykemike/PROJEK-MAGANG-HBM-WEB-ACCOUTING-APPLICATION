import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_role = await prisma.role.delete({
      where: {
        id: req.body.roleid,
      },
    });

    res.status(201).json({ message: "Delete role success!", data: delete_role });
  } catch (error) {
    res.status(400).json({ data: "Delete role failed!", error });
    console.log(error);
  }
};
