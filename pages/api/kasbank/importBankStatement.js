import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const current_akun = { id: req.body.id };
    const current_day = { current: req.body.current };

    let data_import = [];
    req.body.bankStatement.map((i) => {
      data_import.push({
        akun_id: parseInt(current_akun.id),
        tgl_import: current_day.current,
        tgl_mutasi_bank: i.TransactionDateBank,
        debit: parseInt(i.Received),
        kredit: parseInt(i.Spent),
        deskripsi: i.Description,
        saldo: 0,
        status: "Belum terekonsiliasi",
      });
    });

    const create_bank_statement = await prisma.detailBankStatement.createMany({
      data: data_import,
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Import Bank Statement Success!", data: create_bank_statement });
  } catch (error) {
    res.status(400).json({ data: "Import Bank Statement Failed!", error });
    console.log(error);
  }
};
