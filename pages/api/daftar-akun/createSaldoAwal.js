import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {
    try {

        const frontend_data = {
          tgl_konversi: req.body.tgl_konversi
        }

        // let data = [];
        // req.body.saldo_awal && JSON.parse(req.body.saldo_awal).map((i) => {
        //   data.push({
        //     akun_id: parseInt(i.akun_id),
        //     debit: parseInt(i.debit),
        //     kredit: parseInt(i.kredit),
        //   })
        // })

        res.status(201).json({ message: 'Atur Saldo Awal Success!', data: req.body.saldo_awal })
    } catch (error) {
        res.status(400).json({ message: "Atur Saldo Awal Failed!", error })
        console.log(error)
    }
}
