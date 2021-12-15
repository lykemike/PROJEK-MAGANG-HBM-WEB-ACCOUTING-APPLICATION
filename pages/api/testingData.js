import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const CREATE = await prisma.periode.createMany({
      data: [
        {
          nama: "January",
        },
        {
          nama: "February",
        },
        {
          nama: "March",
        },
        {
          nama: "April",
        },
        {
          nama: "May",
        },
        {
          nama: "June",
        },
        {
          nama: "July",
        },
        {
          nama: "August",
        },
        {
          nama: "September",
        },
        {
          nama: "October",
        },
        {
          nama: "November",
        },
        {
          nama: "December",
        },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Testing Success!", CREATE });
  } catch (error) {
    res.status(400).json({ roleType: "TESTING FAILED", error });
    console.log(error);
  }
};
