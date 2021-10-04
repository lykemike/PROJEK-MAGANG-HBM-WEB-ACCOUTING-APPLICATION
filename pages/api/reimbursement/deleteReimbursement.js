import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const deleteReimbursement = await prisma.headerReimburse.delete({
      where: {
        id: req.body.reimbursementId,
      },
    });

    res.status(201).json({
      message: "DELETE REIMBURSEMENT SUCESS!",
      data: deleteReimbursement,
    });
  } catch (error) {
    res.status(400).json({ data: "DELETE REIMBURSEMENT FAILED!", error });
    console.log(error);
  }
};
