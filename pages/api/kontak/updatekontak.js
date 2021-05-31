import { PrismaClient } from ".prisma/client"
const prisma = new PrismaClient();

export default async (req, res) => {

	try {
		const updatekontak = await prisma.kontak.update({
			where: {
				id: parseInt(req.body.id)
			},
			data:
			{
				nama_panggilan: req.body.namaPanggilan,

				gelar: req.body.gelar,
				nama: req.body.nama,
				nomor_hp: req.body.nomorHp,
				tipe_identitas: req.body.tipeIdentitas,
				nomor_identitas: req.body.nomorIdentitas,
				email: req.body.email,
				info_lain: req.body.infoLain,
				nama_perusahaan: req.body.namaPerusahaan,
				nomor_telepon: req.body.nomorTelepon,
				nomor_fax: req.body.nomorFax,
				nomor_npwp: req.body.nomorNpwp,
				alamat_pembayaran: req.body.alamatPembayaran,
				alamat_pengiriman: req.body.alamatPengiriman,

				nama_bank: req.body.namaBank,
				kantor_cabang_bank: req.body.kantorCabangBank,
				pemegang_akun_bank: req.body.pemegangAkunBank,
				nomor_rekening: req.body.nomorRekening,

				akun_piutang: parseInt(req.body.akunPiutang),
				akun_hutang: parseInt(req.body.akunHutang),

				syarat_pembayaran_utama: req.body.syaratPembayaranUtama,
			}
		})

		res.status(201).json({ message: 'UPDATE KONTAK SUCCESS!', data: updatekontak })
	} catch (error) {
		res.status(400).json({ data: 'UPDATE KONTAK FAILED!', error })
		console.log(error)
	}
}
