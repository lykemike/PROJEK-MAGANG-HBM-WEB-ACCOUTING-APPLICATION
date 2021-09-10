import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const find_latest = await prisma.pelepasanAset.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (req.body.untungrugi === "untung") {
      const jurnal_aset = await prisma.jurnalInvoicePelepasanAset.createMany({
        data: [
          {
            header_pelepasan_aset_id: find_latest.id,
            akun_id: parseInt(req.body.akun_deposit_id),
            nominal: parseInt(req.body.nominal_deposit),
            tipe_saldo: "Debit",
          },
          {
            header_pelepasan_aset_id: find_latest.id,
            akun_id: parseInt(req.body.untungrugi_akun),
            nominal: parseInt(req.body.nominal_untungrugi),
            tipe_saldo: "Kredit",
          },
        ],
      });
    } else {
      const jurnal_aset = await prisma.jurnalInvoicePelepasanAset.createMany({
        data: [
          {
            header_pelepasan_aset_id: find_latest.id,
            akun_id: parseInt(req.body.akun_deposit_id),
            nominal: parseInt(req.body.nominal_deposit),
            tipe_saldo: "Kredit",
          },
          {
            header_pelepasan_aset_id: find_latest.id,
            akun_id: parseInt(req.body.untungrugi_akun),
            nominal: parseInt(req.body.nominal_untungrugi),
            tipe_saldo: "Debit",
          },
        ],
      });
    }

    res.status(201).json({ message: "CREATE PELEPASAN ASET SUCCESS!", jurnal_aset });
  } catch (error) {
    res.status(400).json({ data: "CREATE PELEPASAN ASET FAILED!", error });
    console.log(error);
  }
};
