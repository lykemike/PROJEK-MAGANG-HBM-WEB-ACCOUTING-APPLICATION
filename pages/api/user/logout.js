// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        loggedIn : true
      },
    });

    if (findUser.loggedIn) {
      await prisma.user.update({
        where: {
          loggedIn: true,
        },
        data: { loggedIn: false },
      });
    } else {
      throw new Error("data not found");
    }

    res.status(200).json({ message: "LOGOUT SUCCESS!", data: findUser });
  } catch (error) {
    res.status(400).json({ data: "LOGOUT FAILED", error });
    console.log(error);
  }
};