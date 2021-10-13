import { PrismaClient } from ".prisma/client";
import { flatten } from "lodash";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const getJournal = await prisma.headerJurnal.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        DetailJurnal: {
          include: {
            akun: true,
          },
        },
      },
    });

    const getPenjualan = await prisma.headerPenjualan.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        JurnalPenjualan: {
          include: {
            akun: true,
          },
        },
      },
    });

    const getPembelian = await prisma.headerPembelian.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        JurnalPembelian: {
          include: {
            akun: true,
          },
        },
      },
    });

    const getKirimUang = await prisma.headerKirimUang.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        JurnalKirimUang: {
          include: {
            akun: true,
          },
        },
      },
    });

    const getTransferUang = await prisma.transferUang.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        JurnalTransferUang: {
          include: {
            akun: true,
          },
        },
      },
    });

    const getTerimaUang = await prisma.headerTerimaUang.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        JurnalTerimaUang: {
          include: {
            akun: true,
          },
        },
      },
    });

    //Journal Entry
    const total_journal_debit = flatten(
      getJournal.map((i) => {
        return i.DetailJurnal.filter((j) => j.tipe_saldo === "Debit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    const total_journal_kredit = flatten(
      getJournal.map((i) => {
        return i.DetailJurnal.filter((j) => j.tipe_saldo === "Kredit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    //Sales Invoice
    const total_penjualan_debit = flatten(
      getPenjualan.map((i) => {
        return i.JurnalPenjualan.filter((j) => j.tipe_saldo === "Debit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    const total_penjualan_kredit = flatten(
      getPenjualan.map((i) => {
        return i.JurnalPenjualan.filter((j) => j.tipe_saldo === "Kredit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    //Purchase Invoice
    const total_pembelian_debit = flatten(
      getPembelian.map((i) => {
        return i.JurnalPembelian.filter((j) => j.tipe_saldo === "Debit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    const total_pembelian_kredit = flatten(
      getPembelian.map((i) => {
        return i.JurnalPembelian.filter((j) => j.tipe_saldo === "Kredit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    //Kirim Uang Invoice
    const total_kirimuang_debit = flatten(
      getKirimUang.map((i) => {
        return i.JurnalKirimUang.filter((j) => j.tipe_saldo === "Debit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    const total_kirimuang_kredit = flatten(
      getKirimUang.map((i) => {
        return i.JurnalKirimUang.filter((j) => j.tipe_saldo === "Kredit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    //Terima Uang Invoice
    const total_terimauang_debit = flatten(
      getTerimaUang.map((i) => {
        return i.JurnalTerimaUang.filter((j) => j.tipe_saldo === "Debit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    const total_terimauang_kredit = flatten(
      getTerimaUang.map((i) => {
        return i.JurnalTerimaUang.filter((j) => j.tipe_saldo === "Kredit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    //Transfer Uang Invoice
    const total_transferuang_debit = flatten(
      getTransferUang.map((i) => {
        return i.JurnalTransferUang.filter((j) => j.tipe_saldo === "Debit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    const total_transferuang_kredit = flatten(
      getTransferUang.map((i) => {
        return i.JurnalTransferUang.filter((j) => j.tipe_saldo === "Kredit");
      })
    ).reduce((a, b) => a + b.nominal, 0);

    const grandtotaldebit =
      total_kirimuang_debit +
      total_pembelian_debit +
      total_penjualan_debit +
      total_terimauang_debit +
      total_transferuang_debit +
      total_journal_debit;

    const grandtotalkredit =
      total_kirimuang_kredit +
      total_pembelian_kredit +
      total_penjualan_kredit +
      total_terimauang_kredit +
      total_transferuang_kredit +
      total_journal_kredit;

    res.status(201).json({
      message: "JURNAL UMUM FOUND!",
      grandtotaldebit,
      grandtotalkredit,
      total_journal_debit,
      total_journal_kredit,
      total_penjualan_debit,
      total_penjualan_kredit,
      total_terimauang_debit,
      total_terimauang_kredit,
      total_kirimuang_debit,
      total_kirimuang_kredit,
      total_pembelian_debit,
      total_pembelian_kredit,
      total_transferuang_debit,
      total_transferuang_kredit,
    });
  } catch (error) {
    res.status(400).json({ data: "JURNAL UMUM NOT FOUND!", error });
    console.log(error);
  }
};

//testing
