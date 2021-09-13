import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // PENJUALAN PENDAPATAN
    const update = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "pendapatan_penjualan"
      },
      data: {
        akun_id: parseInt(req.body.pendapatan_penjualan),
      },
    });

    // PENJUALAN DISKON
    const update2 = await prisma.settingDefault.updateMany({
      where: {
       nama_setting: "diskon_penjualan"
      },
      data: {
        akun_id: parseInt(req.body.diskon_penjualan),
      },
    });

    // PENJUALAN PEMOTONGAN
    const update3 = await prisma.settingDefault.updateMany({
      where: {
        tipe: "penjualan",
        nama_setting: "pemotongan"
      },
      data: {
        akun_id: parseInt(req.body.pemotongan_penjualan),
      },
    });

    // PENJUALAN PEMBAYARAN DI MUKA
    const update4 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "pembayaran_dimuka"
      },
      data: {
        akun_id: parseInt(req.body.pembayaran_di_muka),
      },
    });

    // PENJUALAN PIUTANG BELUM DI TAGIH
    const update5 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "piutang_blm_ditagih"
      },
      data: {
        akun_id: parseInt(req.body.piutang_belum_ditagih),
      },
    });

    // PENJUALAN PAJAK
    const update6 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "pajak_penjualan"
      },
      data: {
        akun_id: parseInt(req.body.pajak_penjualan),
      },
    });

    // PEMBELIAN COGS
    const update7 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "pembelian_cogs"
      },
      data: {
        akun_id: parseInt(req.body.pembelian_cogs),
      },
    });

    // PEMBELIAN PEMOTONGAN
    const update8 = await prisma.settingDefault.updateMany({
      where: {
        tipe: "pembelian",
        nama_setting: "pemotongan"
      },
      data: {
        akun_id: parseInt(req.body.pemotongan_pembelian),
      },
    });

    // PEMBELIAN UANG MUKA
    const update9 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "uang_muka_pembelian"
      },
      data: {
        akun_id: parseInt(req.body.uang_muka_pembelian),
      },
    });

    // PEMBELIAN HUTANG BELUM DI TAGIH
    const update10 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "hutang_blm_ditagih",
      },
      data: {
        akun_id: parseInt(req.body.hutang_belum_ditagih),
      },
    });

    // PEMBELIAN PAJAK
    const update11 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "pajak_pembelian"
      },
      data: {
        akun_id: parseInt(req.body.pajak_pembelian),
      },
    });

    // PEMBELIAN DISKON
    const update12 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "diskon_pembelian"
      },
      data: {
        akun_id: parseInt(req.body.diskon_pembelian),
      },
    });

    // BIAYA PEMOTONGAN
    const update13 = await prisma.settingDefault.updateMany({
      where: {
        tipe: "biaya",
        nama_setting: "pemotongan"
      },
      data: {
        akun_id: parseInt(req.body.pemotongan_biaya),
      },
    });

    // BIAYA HUTANG USAHA
    const update14 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "hutang_usaha"
      },
      data: {
        akun_id: parseInt(req.body.hutang_usaha),
      },
    });

    // EKUITAS SALDO AWAL
    const update15 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "ekuitas_saldo_awal"
      },
      data: {
        akun_id: parseInt(req.body.ekuitas_saldo_awal),
      },
    });

    // ASET TETAP
    const update16 = await prisma.settingDefault.updateMany({
      where: {
        nama_setting: "aset_tetap"
      },
      data: {
        akun_id: parseInt(req.body.aset_tetap),
      },
    });

    res.status(201).json({ message: "Pemetaan akun successfully updated!", data: update });
  } catch (error) {
    res.status(400).json({ data: "Failed to save pemetaan akun!", error });
    console.log(error);
  }
};
