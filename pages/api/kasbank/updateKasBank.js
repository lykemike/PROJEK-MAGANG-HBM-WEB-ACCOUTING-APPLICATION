import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const find_akun = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.id),
      },
      include: {
        akun: true,
      },
    });

    const saldo_awal = parseInt(req.body.saldo_baru);
    const selisih_saldo = find_akun.sisa_saldo - find_akun.debit;
    const sisa_saldo_baru = saldo_awal + selisih_saldo;

    const update_saldo_awal = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.id),
      },
      data: {
        debit: parseInt(saldo_awal),
        sisa_saldo: parseInt(sisa_saldo_baru),
      },
    });

    const success_message = "Update Saldo Awal " + find_akun.akun.nama_akun + "success!";
    const failed_message = "Update Saldo Awal " + find_akun.akun.nama_akun + "failed!";
    res.status(201).json({ message: success_message });
  } catch (error) {
    res.status(400).json({ data: failed_message, error });
    console.log(error);
  }
};
