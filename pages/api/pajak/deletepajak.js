import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_pajak = await prisma.pajak.delete({
      where: {
        id: parseInt(req.body.pajakid),
      },
    });

    res.status(201).json({ message: "Delete pajak success!", data: delete_pajak });
  } catch (error) {
    res.status(400).json({ data: "Delete pajak failed!", error });
    console.log(error);
  }
};
