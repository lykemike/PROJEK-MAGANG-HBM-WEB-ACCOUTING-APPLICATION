import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_user = await prisma.user.delete({
      where: {
        id: parseInt(req.body.userid),
      },
    });

    res.status(201).json({ message: "Delete user success!" });
  } catch (error) {
    res.status(400).json({ data: "Delete user failed!", error });
    console.log(error);
  }
};
