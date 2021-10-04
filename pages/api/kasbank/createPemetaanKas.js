import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    let pemetaan_kas = [];
    req.body.multiple_akun.map((i) => {
      pemetaan_kas.push({
        tgl_transaksi: i.tgl_transaksi,
        detail_bank_statement_id: parseInt(i.detail_bank_statement_id),
        deskripsi: i.deskripsi,
        akun_id: parseInt(i.akun_id),
        nominal: parseInt(i.nominal),
        tipe_saldo: "Kredit",
      });
    });

    // for (const data of req.body) {
    //     if (req.body.bank_type == "Debit"){
    //         const debit_jurnal = await prisma.jurnalBankStatement.createMany({
    //             data: [{
    //                 detail_bank_statement_id:
    //                 akun_id: 10,
    //                 nominal: req.body.nominal,
    //                 tipe_saldo: "Debit"
    //             }]
    //         })
    //     } else {

    //     }
    // }

    res.status(201).json({ message: "Create Pemetaan Akun Success!", pemetaan_kas });
  } catch (error) {
    res.status(400).json({ data: "Failed to create pemetaan akun!", error });
    console.log(error);
  }
};
