import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // get date from input, then split into DD:MM:YYYY
    const confirm_date = req.body.tgl_transaksi;
    const day = confirm_date.split("-")[2];
    const month = confirm_date.split("-")[1];
    const year = confirm_date.split("-")[0];

    // get current timestamp 25 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // get data from front end
    const frontend_data = {
      akun_transfer_id: parseInt(req.body.akun_transfer),
      akun_setor_id: parseInt(req.body.akun_setor),
      total: parseInt(req.body.total),
      memo: req.body.memo,
      tgl_transaksi: req.body.tgl_transaksi,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      tag: req.body.tag,
      status: "Belum terekonsiliasi",
    };

    // create transfer uang
    const create_transfer_uang = await prisma.transferUang.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    // get latest id by sorting in "DESC" than getting the first data
    const find_latest = await prisma.transferUang.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    // create jurnal transfer uang
    const create_jurnal_transfer_uang = await prisma.jurnalTransferUang.createMany({
      data: [
        {
          transfer_uang_id: find_latest.id,
          akun_id: parseInt(req.body.akun_setor),
          nominal: parseInt(req.body.total),
          tipe_saldo: "Debit",
        },
        {
          transfer_uang_id: find_latest.id,
          akun_id: parseInt(req.body.akun_transfer),
          nominal: parseInt(req.body.total),
          tipe_saldo: "Kredit",
        },
      ],
    });

    // find akun transfer in detail saldo awal
    const get_akun_transfer = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_transfer),
      },
    });

    // update saldo saat ini in detail saldo awal
    const update_saldo_skrg_transfer = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_transfer),
      },
      data: {
        sisa_saldo: get_akun_transfer.sisa_saldo - parseInt(req.body.total),
      },
    });

    // find akun setor in detail saldo awal
    const get_akun_setor = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: parseInt(req.body.akun_setor),
      },
    });

    // update saldo saat ini in detail saldo awal
    const update_saldo_skrg_setor = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: parseInt(req.body.akun_setor),
      },
      data: {
        sisa_saldo: get_akun_setor.sisa_saldo + parseInt(req.body.total),
      },
    });

    // create laporan transaksi
    const create_laporan_transaksi = await prisma.laporanTransaksi.createMany({
      data: [
        {
          akun_id: parseInt(req.body.akun_setor),
          kategori_id: 3,
          timestamp: current_time,
          date: req.body.tgl_transaksi,
          hari: parseInt(day),
          bulan: parseInt(month),
          tahun: parseInt(year),
          debit: parseInt(req.body.total),
          kredit: 0,
          sumber_transaksi: "Kas & Bank",
          no_ref: find_latest.id,
          delete_ref_no: find_latest.id,
          delete_ref_name: "Transfer Uang",
        },
        {
          akun_id: parseInt(req.body.akun_transfer),
          kategori_id: 3,
          timestamp: current_time,
          date: req.body.tgl_transaksi,
          hari: parseInt(day),
          bulan: parseInt(month),
          tahun: parseInt(year),
          debit: 0,
          kredit: parseInt(req.body.total),
          sumber_transaksi: "Kas & Bank",
          no_ref: find_latest.id,
          delete_ref_no: find_latest.id,
          delete_ref_name: "Transfer Uang",
        },
      ],
    });

    res.status(201).json({ message: "Create transfer uang success!", id: find_latest });
  } catch (error) {
    res.status(400).json({ data: "Failed to create transfer uang!", error });
    console.log(error);
  }
};
