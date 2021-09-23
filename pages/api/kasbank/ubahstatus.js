import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    if (!req.body) throw new Error("No body on request");

    for (const data of req.body) {
      let parsed = JSON.parse(data);
      if (parsed.tipe === "kirimuang") {
        const kirimuang = await prisma.headerKirimUang.update({
          where: {
            id: +parsed.id,
          },
          data: {
            status: "Sudah Terekonsilisasi",
          },
        });
      } else if (parsed.tipe === "terimauang") {
        const terimauang = await prisma.headerTerimaUang.update({
          where: {
            id: +parsed.id,
          },
          data: {
            status: "Sudah Terekonsilisasi",
          },
        });
      } else {
        const transferuang = await prisma.transferUang.update({
          where: {
            id: +parsed.id,
          },
          data: {
            status: "Sudah Terekonsilisasi",
          },
        });
      }
    }
    // req.body &&
    //   req.body.map((data) => {
    //     let parsed = JSON.parse(data);
    //     if (parsed.tipe === "kirimuang") {
    //       const kirimuang = await prisma.headerKirimUang.update({
    //         where: {
    //           id: +parsed.id,
    //         },
    //         data: {
    //           status: "Sudah Terekonsilisasi",
    //         },
    //       });
    //     } else if (parsed.tipe === "terimauang") {
    //       const terimauang = await prisma.headerTerimaUang.update({
    //         where: {
    //           id: +parsed.id,
    //         },
    //         data: {
    //           status: "Sudah Terekonsilisasi",
    //         },
    //       });
    //     } else {
    //       const transferuang = await prisma.transferUang.update({
    //         where: {
    //           id: +parsed.id,
    //         },
    //         data: {
    //           status: "Sudah Terekonsilisasi",
    //         },
    //       });
    //     }
    //   });

    res.status(201).json({ message: "Terkonsiliasi Success!", data: req.body });
  } catch (error) {
    res.status(400).json({ data: "Terkonsiliasi Failed!", error });
    console.log(error);
  }
};
