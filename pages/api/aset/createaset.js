import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createAset = await prisma.aset.createMany({
      data: [
        {
          nama_aset: req.body.nama_aset,
          nomor_aset: req.body.nomor_aset,
          akun_aset_id: parseInt(req.body.akun_aset_tetap),
          deskripsi_aset: req.body.deskripsi,
          tgl_akuisisi: req.body.tgl_akuisisi,
          biaya_akuisisi: parseInt(req.body.biaya_akuisisi),
          akun_dikreditkan_id: parseInt(req.body.akun_dikreditkan),
          tag: req.body.tag,
          aset_non_depresiasi: req.body.aset_non_depresiasi,
          metode: req.body.metode,
          masa_manfaat: parseInt(req.body.masa_manfaat),
          nilai_tahun: parseInt(req.body.nilai_tahun),
          akun_penyusutan_id: parseInt(req.body.akun_penyusutan),
          akumulasi_akun_penyusutan_id: parseInt(req.body.akumulasi_akun_penyusutan),
          akumulasi_penyusutan: parseInt(req.body.akumulasi_penyusutan),
          tgl_penyusutan: req.body.tgl_penyusutan,
        },
      ],
      skipDuplicates: true,
    });

    const find_latest = await prisma.aset.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const find_akun_penyusutan = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.akun_penyusutan),
      },
    });

    const find_akumulasi_akun_penyusutan_id = await prisma.akun.findFirst({
      where: {
        id: parseInt(req.body.akumulasi_akun_penyusutan),
      },
    });

    const jurnal_aset = await prisma.jurnalAset.createMany({
      data: [
        {
          header_aset_id: find_latest.id,
          nama_akun: find_akun_penyusutan.nama_akun,
          nominal: parseInt(req.body.akumulasi_penyusutan),
          tipe_saldo: "Debit",
        },
        {
          header_aset_id: find_latest.id,
          nama_akun: find_akumulasi_akun_penyusutan_id.nama_akun,
          nominal: parseInt(req.body.akumulasi_penyusutan),
          tipe_saldo: "Kredit",
        },
      ],
    });

    res.status(201).json({ message: "CREATE ASET SUCCESS!", data: jurnal_aset });
  } catch (error) {
    res.status(400).json({ data: "CREATE ASET FAILED!", error });
    console.log(error);
  }
};
