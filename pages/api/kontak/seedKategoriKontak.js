import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createMany = await prisma.kategoriKontak.createMany({
            data: [
                { name: "Supplier" },
                { name: "Pelanggan" },
                { name: "Karyawan" },
                { name: "Lainnya" },
            ],
            skipDuplicates: true,
        })

        res.status(201).json({ message: 'SEED KATEGORI KONTAK SUCCESS!', data: createMany })
    } catch (error) {
        res.status(400).json({ name: 'SEED KATEGORI KONTAK FAILED!', error })
        console.log(error)
    }
}
