// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from ".prisma/client"

const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createMany = await prisma.menu.createMany({
            data:
                [
                    {
                        menu_name: 'Dashboard',
                    },
                    {
                        menu_name: 'Jurnal',
                    },
                    {
                        menu_name: 'User',
                    },
                    {
                        menu_name: 'Role',
                    },
                    {
                        menu_name: 'Daftar Akun',
                    },
                    {
                        menu_name: 'Kontak',
                    },
                    {
                        menu_name: 'Laporan',
                    },
                    {
                        menu_name: 'Pajak',
                    },
                    {
                        menu_name: 'Produk',
                    },
                    {
                        menu_name: 'Kas & Bank',
                    },
                    {
                        menu_name: 'Penjualan',
                    },
                    {
                        menu_name: 'Pembelian',
                    },
                    {
                        menu_name: 'Biaya',
                    },
                    {
                        menu_name: 'Pengaturan',
                    },
                ]
        })

        res.status(200).json({ message: 'success!', data: createMany })
    } catch (error) {
        res.status(400).json({ data: 'error', error })
        console.log(error)
    }
}
