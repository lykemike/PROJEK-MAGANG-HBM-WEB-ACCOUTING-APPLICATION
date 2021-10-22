import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const get_satuan = await prisma.satuanProduk.findMany({});
    res.status(201).json({ message: "USER FOUND!", data: get_satuan });
  } catch (error) {
    res.status(400).json({ data: "USER NOT FOUND!", error });
    console.log(error);
  }
};
