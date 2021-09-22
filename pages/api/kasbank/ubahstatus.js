import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    req.body &&
      req.body.map((data) => {
        let parsed = JSON.parse(data);
        if (parsed.tipe === "kirimuang") {
          const kirimuang = await prisma.headerKirimUang.update({
            where: {
              id: +parsed.id,
            },
            data: {
              status: "sudah di rekonsilisasi",
            },
          });
        } else if (parsed.tipe === "terimauang") {
          const terimauang = await prisma.headerTerimaUang.update({
            where: {
              id: +parsed.id,
            },
            data: {
              status: "sudah di rekonsilisasi",
            },
          });
        } else {
          const transferuang = await prisma.transferUang.update({
            where: {
              id: +parsed.id,
            },
            data: {
              status: "sudah di rekonsilisasi",
            },
          });
        }
      });

    res.status(201).json({ message: "USER FOUND!", data: req.body });
  } catch (error) {
    res.status(400).json({ data: "USER NOT FOUND!", error });
    console.log(error);
  }
};
