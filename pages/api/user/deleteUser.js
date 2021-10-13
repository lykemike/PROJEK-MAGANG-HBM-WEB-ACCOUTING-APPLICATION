import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: req.body.userid,
      },
    });

    res.status(201).json({ message: "Delete user success!", data: deleteUser });
  } catch (error) {
    res.status(400).json({ data: "Delete user failed!", error });
    console.log(error);
  }
};
