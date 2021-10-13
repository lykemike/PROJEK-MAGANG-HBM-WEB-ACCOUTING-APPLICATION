import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const _delete = await prisma.detailBankStatement.delete({
      where: {
        id: parseInt(req.body.bank_statement_id),
      },
    });

    res.status(201).json({ message: "Delete Bank Statement Success!", data: _delete });
  } catch (error) {
    res.status(400).json({ data: "Delete Bank Statement Failed!", error });
    console.log(error);
  }
};
