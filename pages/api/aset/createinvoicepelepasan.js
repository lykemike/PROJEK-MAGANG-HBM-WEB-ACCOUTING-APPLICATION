import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const find_latest = await prisma.pelepasanAset.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (req.body.tipe_saldo === "kredit") {
      const jurnal_aset = await prisma.jurnalInvoicePelepasanAset.createMany({
        data: [
          {
            pelepasan_aset_id: find_latest.id,
            header_aset_id: parseInt(req.body.id),
            akun_id: parseInt(req.body.akun_deposit_id),
            nominal: parseInt(req.body.nominal),
            tipe_saldo: "Debit",
          },
          {
            pelepasan_aset_id: find_latest.id,
            header_aset_id: parseInt(req.body.id),
            akun_id: parseInt(req.body.nama_akun_untungrugi),
            nominal: parseInt(req.body.nominal),
            tipe_saldo: "Kredit",
          },
        ],
      });
    } else {
      const jurnal_aset = await prisma.jurnalInvoicePelepasanAset.createMany({
        data: [
          {
            pelepasan_aset_id: find_latest.id,
            header_aset_id: parseInt(req.body.id),
            akun_id: parseInt(req.body.akun_deposit_id),
            nominal: parseInt(req.body.nominal),
            tipe_saldo: "Kredit",
          },
          {
            pelepasan_aset_id: find_latest.id,
            header_aset_id: parseInt(req.body.id),
            akun_id: parseInt(req.body.nama_akun_untungrugi),
            nominal: parseInt(req.body.nominal),
            tipe_saldo: "Debit",
          },
        ],
      });
    }

    res.status(201).json({ message: "CREATE PELEPASAN ASET SUCCESS!", data: find_latest });
  } catch (error) {
    res.status(400).json({ data: "CREATE PELEPASAN ASET FAILED!", error });
    console.log(error);
  }
};
