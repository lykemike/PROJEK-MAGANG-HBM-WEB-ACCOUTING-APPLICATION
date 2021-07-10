// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: req.body.loginEmail,
        password: req.body.loginPassword,
      },
      include: {
        role: {
          include: {
            RolePrivellege: true,
          },
        },
      },
    });

    if (findUser.email && findUser.password) {
      await prisma.user.update({
        where: {
          email: findUser.email,
        },
        data: { loggedIn: true },
      });
    } else {
      throw new Error("data not found");
    }

    res.status(200).json({ message: "LOGIN SUCCESS!", data: findUser });
  } catch (error) {
    res.status(400).json({ data: "LOGIN FAILED", error });
    console.log(error);
  }
};
