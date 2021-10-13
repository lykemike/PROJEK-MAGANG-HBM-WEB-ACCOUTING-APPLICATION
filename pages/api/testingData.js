import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const testing = await prisma.user.createMany({
      data: [
        {
          firstName: "Michael",
          lastName: "Montolalu",
          email: "mike@hbm.co.id",
          password: "admin1234",
          roleId: 15,
        },
        {
          firstName: "Kevin",
          lastName: "Prawira",
          email: "kape@hbm.co.id",
          password: "admin1234",
          roleId: 15,
        },
        {
          firstName: "Kevin",
          lastName: "Qyan",
          email: "kekian@hbm.co.id",
          password: "admin1234",
          roleId: 15,
        },
        {
          firstName: "Jessica",
          lastName: "-",
          email: "jess@hbm.co.id",
          password: "admin1234",
          roleId: 3,
        },
        {
          firstName: "Lucky",
          lastName: "-",
          email: "lucky@hbm.co.id",
          password: "admin1234",
          roleId: 3,
        },
        {
          firstName: "Irva",
          lastName: "-",
          email: "irva@hbm.co.id",
          password: "admin1234",
          roleId: 3,
        },
        {
          firstName: "Pak Henry",
          lastName: "-",
          email: "kenry@hbm.co.id",
          password: "admin1234",
          roleId: 5,
        },
        {
          firstName: "Sarah",
          lastName: "-",
          email: "sarah@hbm.co.id",
          password: "admin1234",
          roleId: 3,
        },
        {
          firstName: "Sigit",
          lastName: "-",
          email: "sigit@hbm.co.id",
          password: "admin1234",
          roleId: 14,
        },
        {
          firstName: "Pak Taren",
          lastName: "-",
          email: "taren@hbm.co.id",
          password: "admin1234",
          roleId: 1,
        },
        {
          firstName: "Pak Roeddy",
          lastName: "-",
          email: "roeddy@hbm.co.id",
          password: "admin1234",
          roleId: 1,
        },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Testing Success!", data: testing });
  } catch (error) {
    res.status(400).json({ roleType: "TESTING FAILED", error });
    console.log(error);
  }
};
