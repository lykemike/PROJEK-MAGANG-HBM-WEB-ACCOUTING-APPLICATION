import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const create_gelar = await prisma.gelar.createMany({
      data: [
        {
          nama: "-",
        },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Testing Success!", create_gelar });
  } catch (error) {
    res.status(400).json({ roleType: "TESTING FAILED", error });
    console.log(error);
  }
};
