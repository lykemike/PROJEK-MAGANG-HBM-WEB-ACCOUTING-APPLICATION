import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createUser = await prisma.user.createMany({
      data: [
        {
          firstName: req.body.first_name,
          lastName: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          roleId: parseInt(req.body.role_id),
        },
      ],
      skipDuplicates: true,
    });

    res.status(200).json({ message: "Create user success!", data: "Success" });
  } catch (error) {
    res.status(400).json({ data: "Create user failed!", error });
    console.log(error);
  }
};
