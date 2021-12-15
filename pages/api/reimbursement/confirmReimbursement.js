import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const update_reimburse_status = await prisma.headerReimburse.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        status: "Done",
      },
    });

    res.status(201).json({
      message: "Update Reimbursement Status Successful!",
    });
  } catch (error) {
    res.status(400).json({ data: "Update Status Failed!", error });
    console.log(error);
  }
};
