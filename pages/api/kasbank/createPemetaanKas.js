import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const bank_type = req.body.bank_type;
    const total = req.body.total;
    const header_akun = req.body.header_akun;

    let pemetaan_kas = [];
    let jurnal = [];

    if (bank_type == "Debit") {
      jurnal.push({
        tgl_transaksi: req.body.current_date,
        detail_bank_statement_id: parseInt(header_akun.id),
        deskripsi: "-",
        akun_id: parseInt(header_akun.akun_id),
        nominal: parseInt(total),
        tipe_saldo: "Debit",
        tipe_transaksi: "Terima",
      });

      req.body.multiple_akun.map((i) => {
        pemetaan_kas.push({
          tgl_transaksi: i.tgl_transaksi,
          detail_bank_statement_id: parseInt(i.detail_bank_statement_id),
          deskripsi: i.deskripsi,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.nominal),
          tipe_saldo: "Kredit",
          tipe_transaksi: "Terima",
        });
      });
    } else {
      jurnal.push({
        tgl_transaksi: req.body.current_date,
        detail_bank_statement_id: parseInt(header_akun.id),
        deskripsi: "-",
        akun_id: parseInt(header_akun.akun_id),
        nominal: parseInt(total),
        tipe_saldo: "Kredit",
        tipe_transaksi: "Bayar",
      });
      req.body.multiple_akun.map((i) => {
        pemetaan_kas.push({
          tgl_transaksi: i.tgl_transaksi,
          detail_bank_statement_id: parseInt(i.detail_bank_statement_id),
          deskripsi: i.deskripsi,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.nominal),
          tipe_saldo: "Debit",
          tipe_transaksi: "Bayar",
        });
      });
    }

    const create_jurnal = await prisma.jurnalBankStatement.createMany({
      data: jurnal,
      skipDuplicates: true,
    });

    const create_jurnal2 = await prisma.jurnalBankStatement.createMany({
      data: pemetaan_kas,
      skipDuplicates: true,
    });

    const update_status = await prisma.detailBankStatement.update({
      where: {
        id: parseInt(header_akun.id),
      },
      data: {
        status: "Sudah Terekonsilisasi",
      },
    });

    res.status(201).json({
      message: "Create Pemetaan Akun Success!",
      create_jurnal,
      create_jurnal2,
      update_status,
    });
  } catch (error) {
    res.status(400).json({ data: "Failed to create pemetaan akun!", error });
    console.log(error);
  }
};
