import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const updatePajak = await prisma.pajak.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: {
        nama: req.body.nama,
        presentase_aktif: parseInt(req.body.presentase_aktif),
        akun_jual: parseInt(req.body.akun_pajak_penjualan_id),
        akun_beli: parseInt(req.body.akun_pajak_penjualan_id),
      },
    });

    res.status(200).json({ message: "Update Pajak Success!" });
  } catch (error) {
    res.status(400).json({ data: "Update Pajak Failed!", error });
    console.log(error);
  }
};
