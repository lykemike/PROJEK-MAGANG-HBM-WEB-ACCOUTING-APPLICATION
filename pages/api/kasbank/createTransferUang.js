import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      akun_transfer_id: parseInt(req.body.akun_transfer),
      akun_setor_id: parseInt(req.body.akun_setor),
      jumlah: parseInt(req.body.jumlah),
      memo: req.body.memo,
      file_attachment: 'req.file.filename',
      no_transaksi: parseInt(req.body.no_transaksi),
      tgl_transaksi: req.body.tgl_transaksi,
      tag: req.body.tag,
    };

    const create_transfer_uang = await prisma.transferUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_transfer_uang = await prisma.transferUang.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        id: frontend_data.id,
      },
    });

    const find_no_transaksi = await prisma.transferUang.findFirst({
      orderBy: {
        id: "desc",
      },
      where: {
        no_transaksi: frontend_data.id,
      },
    });

    const update_no_transaksi = await prisma.transferUang.update({
      where: {
        id: frontend_data.id,
        no_transaksi: parseInt(req.body.no_transaksi),
      },
      data: {
        no_transaksi: find_no_transaksi.id,
      },
    });

    res.status(201).json({ message: "Create Transfer Uang Success!", data: update_no_transaksi });
  } catch (error) {
    res.status(400).json({ data: "Failed to create transfer uang!", error });
    console.log(error);
  }
};