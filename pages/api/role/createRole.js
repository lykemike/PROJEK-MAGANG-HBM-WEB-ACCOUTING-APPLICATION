import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      roleType: req.body.role_type,
      roleDesc: req.body.role_desc,
    };

    const create_role = await prisma.role.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_role = await prisma.role.findFirst({
      where: {
        roleType: frontend_data.roleType,
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

    const create_role_privellege = await prisma.rolePrivellege.createMany({
      data: detail,
      skipDuplicates: true,
    });

    res
      .status(201)
      .json(
        { message: "Create role success!", data: create_role },
        { message: "Find role id success!", data: find_role },
        { message: "Create role privellege success!", data: create_role_privellege }
      );
  } catch (error) {
    res
      .status(400)
      .json(
        { data: "Failed to create role!", error },
        { data: "Failed to find role id!", error },
        { data: "Failed to create role privellege!", error }
      );
    console.log(error);
  }
};
