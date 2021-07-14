import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createMany = await prisma.kategoriKontak.createMany({
      data: [
        { nama: "Supplier" },
        { nama: "Pelanggan" },
        { nama: "Karyawan" },
        { nama: "Lainnya" },
      ],
      skipDuplicates: true,
    });

    res.status(201).json({ message: "SEED KATEGORI KONTAK SUCCESS!", data: createMany });
  } catch (error) {
    res.status(400).json({ nama: "SEED KATEGORI KONTAK FAILED!", error });
    console.log(error);
  }
};
