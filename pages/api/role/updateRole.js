import { PrismaClient } from ".prisma/client";
import { id } from "date-fns/locale";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const update_role = await prisma.role.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        roleType: req.body.role_type,
        roleDesc: req.body.role_desc,
      },
    });

    const find_role = await prisma.role.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const delete_role_privellege = await prisma.rolePrivellege.deleteMany({
      where: {
        role_id: parseInt(req.body.id),
      },
    });

    let detail = [];
    req.body.menu.map((i) => {
      detail.push({
        role_id: find_role.id,
        menu_id: parseInt(i),
        value: true,
      });
    });

    const update_role_privellege = await prisma.rolePrivellege.createMany({
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Update role success!" });
  } catch (error) {
    res.status(400).json({ data: "Update role failed!", error });
    console.log(error);
  }
};
