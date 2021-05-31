import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createMany = await prisma.kategori.createMany({
            data: [
                { name: "Akun Piutang" },
                { name: "Aktiva Lancar Lainnya" },
                { name: "Kas & Bank" },
                { name: "Persediaan" },
                { name: "Aktiva Tetap" },
                { name: "Aktiva Lainnya" },
                { name: "Depresiasi & Amortasi" },
                { name: "Akun Hutang" },
                { name: "Kartu Kredit" },
                { name: "Kewajiban Lancar Lainnya" },
                { name: "Kewajiban Jangka Panjang" },
                { name: "Ekuitas" },
                { name: "Pendapatan" },
                { name: "Pendapatan Lainnya" },
                { name: "Harga Pokok Penjualan" },
                { name: "Beban" },
                { name: "Beban Lainnya" },
            ],
            skipDuplicates: true,
        })

        // const allKateogories = await prisma.kategori.findMany({
        //     include: {
        //         Akun: true,
        //     },
        // })

        // console.dir(allKateogories, { depth: null })

        res.status(200).json({ message: 'SEED KATEGORI DAFTAR AKUN SUCCESS!', data: createMany })
    } catch (error) {
        res.status(400).json({ name: 'SEED KATEGORI DAFTAR AKUN FAILED!', error })
        console.log(error)
    }
}
