import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      nama_pegawai: req.body.nama_pegawai,
      yang_mengetahui: req.body.yang_mengetahui,
      yang_menyetujui: req.body.yang_menyetujui,
      periode: req.body.periode,
      total: parseInt(req.body.total),
      status: "Process",
    };

    const update_header_reimburse = await prisma.headerReimburse.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: frontend_data,
    });

    const delete_detail_reimburse = await prisma.detailReimburse.deleteMany({
      where: {
        header_reimburse_id: parseInt(req.body.id),
      },
    });

    let detail = [];
    req.body.detail_reimburse.map((i) => {
      detail.push({
        header_reimburse_id: parseInt(req.body.id),
        tanggal: i.tanggal,
        tempat: i.tempat,
        biaya: i.biaya,
        keterangan: i.keterangan,
        jumlah: parseInt(i.jumlah),
      });
    });

    const create_detail_reimburse = await prisma.detailReimburse.createMany({
      data: detail,
    });

    res.status(201).json({
      message: "Update Reimbursement Successful!",
      id: parseInt(req.body.id),
    });
  } catch (error) {
    res.status(400).json({ data: "Update Reimbursement Failed!", error });
    console.log(error);
  }
};
