import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    for (const data of req.body) {
         const update_status_bank_statement = await prisma.detailBankStatement.update({
        where: {
          id: parseInt(data),
        },
        data: {
          status: "Sudah Terekonsilisasi",
        },
      });
    }

    res.status(201).json({ message: "Bank Statement Terkonsiliasi Success!", });
  } catch (error) {
    res.status(400).json({ data: "Bank Statement Terkonsiliasi Failed!", error });
    console.log(error);
  }
};
