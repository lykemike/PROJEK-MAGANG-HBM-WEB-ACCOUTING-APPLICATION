import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // const create_akun = await prisma.akun.createMany({
    //   data: [
    //     {
    //       kode_akun: req.body.kode_akun,
    //       tipeId: parseInt(req.body.sub_akun),
    //       nama_akun: req.body.nama_akun,
    //       kategoriId: parseInt(req.body.header_akun),
    //     },
    //   ],
    //   skipDuplicates: true,
    // });

    const find_last_kode_akun = await prisma.akun.findFirst({
      where: {
        kategoriId: parseInt(req.body.header_akun),
      },
      orderBy: {
        kode_akun: "desc",
      },
      select: {
        kode_akun: true,
      },
    });

    const split = find_last_kode_akun.kode_akun.split("-");
    const join = parseInt(split[1]) + 1;

    const test = {
      nama_akun: req.body.nama_akun,
      kode_akun: "1-" + join.toString(),
    };

    if (req.body.kategori_id == 1) {
      // Akun piutang 1-10101 - 1-10199
    } else if (req.body.kategori_id == 2) {
      // Aktiva lancar lainnya 1-10301 - 1-10599
    } else if (req.body.kategori_id == 3) {
      // Kas & bank 1-10001 = 1-10099
    } else if (req.body.kategori_id == 4) {
      // Persediaan 1-10201 - 1-10299
    } else if (req.body.kategori_id == 5) {
      // Aktiva tetap 1-10601 - 1-10699
    } else if (req.body.kategori_id == 6) {
      // Aktiva lainnya 1-10701 - 1-10749
    } else if (req.body.kategori_id == 7) {
      // Depresiasi & amortasi 1-10750 - 1-10759
    } else if (req.body.kategori_id == 8) {
      // Akun hutang 2-20101 - 2-20299
    } else if (req.body.kategori_id == 10) {
      // Kewajiban lancar lainnya 2-20301 - 2-20699
    } else if (req.body.kategori_id == 11) {
      // Kewajiban jangkan panjang 2-20701 - 2-20799
    } else if (req.body.kategori_id == 12) {
      // Ekuitas 3-30001 - 3-30999
    } else if (req.body.kategori_id == 13) {
      // Pendapatan 4-40001 - 4-40999
    } else if (req.body.kategori_id == 14) {
      // Pendapatan lainnya 7-70001 - 7-70999
    } else if (req.body.kategori_id == 15) {
      // Harga pokok penjualan 5-50001 - 50999
    } else if (req.body.kategori_id == 16) {
      // Beban 6-60001 - 6-60999
    } else if (req.body.kategori_id == 17) {
      // Beban lainnya 8-80001 - 80999
    }

    res.status(200).json({ message: "CREATE AKUN BARU SUCCESS!", find_last_kode_akun, test, split });
  } catch (error) {
    res.status(400).json({ kode_akun: "CREATE AKUN BARU FAILED!", error });
    console.log(error);
  }
};
