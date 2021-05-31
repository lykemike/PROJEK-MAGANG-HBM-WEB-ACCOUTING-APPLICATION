import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {
        const updatePajak = await prisma.pajak.update({
            where: {
                id: parseInt(req.body.id)
            },
            data:
            {
                nama: req.body.nama,
                presentasaAktif: parseInt(req.body.presentaseAktif),
                akunPenjual: parseInt(req.body.akunPajakPenjualan),
                akunPembeli: parseInt(req.body.akunPajakPembelian)
            }
        })

        res.status(200).json({ message: 'UPDATE AKUN PAJAK SUCCESS!', data: updatePajak })
    } catch (error) {
        res.status(400).json({ data: 'UPDATE AKUN PAJAK FAILED!', error })
        console.log(error)
    }
}
