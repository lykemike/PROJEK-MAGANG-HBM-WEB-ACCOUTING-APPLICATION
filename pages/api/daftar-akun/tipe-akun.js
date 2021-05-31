// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createMany = await prisma.tipeAkun.createMany({
            data: [
                { name: "Kas" },
                { name: "Bank" },
                { name: "Ayat Silang" },
                { name: "Piutang Usaha" },
                { name: "Piutang Karyawan & Lain-Lain" },
                { name: "Piutang Direksi" },
                { name: "Pembayaran Muka" },
                { name: "Uang Muka Pajak" },
                { name: "Biaya Dibayar Dimuka Lain-Lain" },
                { name: "Aktiva Tetap" },
                { name: "Akumulasi Penyusutan Aktiva" },
                { name: "Utang Dagang" },
                { name: "Utang Pajak" },
                { name: "Utang Lain-Lain" },
                { name: "Utang Pemegang Saham" },
                { name: "Modal Saham" },
                { name: "Laba Ditahan" },
                { name: "Penjualan" },
                { name: "Beban HPP" },
                { name: "Beban Penjualan" },
                { name: "Beban Administrasi dan Umum" },
                { name: "Pendapatan Lain-Lain" },
                { name: "Beban Lain-Lain" },
            ],
            skipDuplicates: true,
        })

        const allTipeAkun = await prisma.kategori.findMany({
            include: {
                Akun: true,
            },
        })

        console.dir(allTipeAkun, { depth: null })

        res.status(200).json({ message: 'SEED TIPE AKUN DAFTAR AKUN SUCCESS!', data: createMany })
    } catch (error) {
        res.status(400).json({ rname: 'SEED TIPE AKUN DAFTAR AKUN FAILED!', error })
        console.log(error)
    }
}
