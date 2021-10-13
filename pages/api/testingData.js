import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const testing = await prisma.akun.findMany({});

    res.status(201).json({ message: "Testing Success!", testing });
  } catch (error) {
    res.status(400).json({ roleType: "TESTING FAILED", error });
    console.log(error);
  }
};
