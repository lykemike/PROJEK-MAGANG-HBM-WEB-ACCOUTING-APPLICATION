import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const delete_detail_reimbursement = prisma.detailReimburse.deleteMany({
      where: {
        header_reimburse_id: parseInt(req.body.id),
      },
    });

    const delete_header_reimbursement = prisma.headerReimburse.delete({
      where: {
        id: parseInt(req.body.id),
      },
    });

    const transaction = await prisma.$transaction([delete_detail_reimbursement, delete_header_reimbursement]);

    res.status(201).json({
      message: "Delete Reimbursement Success!",
    });
  } catch (error) {
    res.status(400).json({ data: "Delete Reimbursement Success!", error });
    console.log(error);
  }
};
