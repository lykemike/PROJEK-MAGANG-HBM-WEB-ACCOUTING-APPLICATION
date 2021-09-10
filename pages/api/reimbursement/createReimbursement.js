import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      nama_pegawai: req.body.nama_pegawai,
      yang_mengetahui: req.body.yang_mengetahui,
      yang_menyetujui: req.body.yang_menyetujui,
      status: "Process",
    };

    const create_header_reimburse = await prisma.headerReimburse.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_latest = await prisma.headerReimburse.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    let detail = [];
    req.body.detail_reimburse.map((i) => {
      detail.push({
        header_reimburse_id: find_latest.id,
        tanggal: i.tanggal,
        tempat: i.biaya,
        biaya: i.biaya,
        keterangan: i.keterangan,
        jumlah: parseInt(i.jumlah),
      });
    });

    const create_detail_reimburse = await prisma.detailReimburse.createMany({
      data: detail,
    });

    res.status(201).json({ message: "Create Reimbursement Successful!", data: create_detail_reimburse });
  } catch (error) {
    res.status(400).json({ data: "Create Reimbursement Failed!", error });
    console.log(error);
  }
};
