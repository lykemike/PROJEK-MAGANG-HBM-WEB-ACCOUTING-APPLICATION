import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_role_privellege = prisma.rolePrivellege.deleteMany({
      where: {
        role_id: parseInt(req.body.roleid),
      },
    });

    const delete_user = prisma.user.deleteMany({
      where: {
        roleId: parseInt(req.body.roleid),
      },
    });

    const delete_role = prisma.role.delete({
      where: {
        id: req.body.roleid,
      },
    });

    const transaction = await prisma.$transaction([delete_role_privellege, delete_user, delete_role]);

    res.status(201).json({ message: "Delete role success!" });
  } catch (error) {
    res.status(400).json({ data: "Delete role failed!", error });
    console.log(error);
  }
};
