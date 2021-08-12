import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      akun_transfer_id: parseInt(req.body.akun_transfer),
      akun_setor_id: parseInt(req.body.akun_setor),
      jumlah: parseInt(req.body.jumlah),
      memo: req.body.memo,
      no_transaksi: parseInt(req.body.id),
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
    };  

    const update_transfer_uang = await prisma.transferUang.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: [frontend_data],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Update Transfer Uang Success!", data: update_transfer_uang });
  } catch (error) {
    res.status(400).json({ data: "Failed!", error });
    console.log(error);
  }
};
