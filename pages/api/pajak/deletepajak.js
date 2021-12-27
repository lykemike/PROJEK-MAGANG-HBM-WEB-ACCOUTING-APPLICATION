import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const find_current_transactions = await prisma.pajak.findFirst({
      where: {
        id: parseInt(req.body.pajakid),
      },
      include: {
        DetailBiaya1: true,
        DetailBiaya2: true,
        HeaderPenjualan: true,
        PenerimaanPembayaran: true,
      },
    });

    let message = "";
    if (
      find_current_transactions.DetailBiaya1.length > 0 ||
      find_current_transactions.DetailBiaya2.length > 0 ||
      find_current_transactions.HeaderPenjualan.length > 0 ||
      find_current_transactions.PenerimaanPembayaran.length > 0
    ) {
      message = "Pajak cannot be deleted because there is still an ongoing transaction!";
    } else {
      const delete_pajak = await prisma.pajak.delete({
        where: {
          id: parseInt(req.body.pajakid),
        },
      });
      message = "Delete Pajak Success!";
    }

    res.status(201).json({ message: "Delete pajak success!", message });
  } catch (error) {
    res.status(400).json({ data: "Delete pajak failed!", error });
    console.log(error);
  }
};
