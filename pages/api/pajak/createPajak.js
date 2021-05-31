import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const createPajak = await prisma.pajak.createMany({
            data:
                [
                    {
                        nama: req.body.nama,
                        presentasaAktif: parseInt(req.body.presentaseAktif),
                        akunPenjual: parseInt(req.body.akunPajakPenjualan),
                        akunPembeli: parseInt(req.body.akunPajakPembelian)
                    }
                ],
            skipDuplicates: true,
        })

        res.status(201).json({ message: 'CREATE AKUN PAJAK SUCCESS!', data: createPajak })
    } catch (error) {
        res.status(400).json({ data: 'CREATE AKUN PAJAK FAILED!', error })
        console.log(error)
    }
}
