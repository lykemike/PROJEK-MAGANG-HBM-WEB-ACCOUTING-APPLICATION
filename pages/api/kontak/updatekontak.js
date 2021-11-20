import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      gelar: req.body.gelar,
      nama: req.body.nama,
      nomor_hp: req.body.nomor_hp,
      email: req.body.email,
      jabatan: req.body.jabatan,
      nama_perusahaan: req.body.nama_perusahaan,
      nomor_telepon: req.body.nomor_telepon,
      nomor_fax: req.body.nomor_fax,
      nomor_npwp: req.body.nomor_npwp,
      alamat_perusahaan: req.body.alamat_perusahaan,
      nama_bank: req.body.nama_bank,
      kantor_cabang_bank: req.body.kantor_cabang_bank,
      nomor_rekening: req.body.nomor_rekening,
      atas_nama: req.body.atas_nama,
      akun_piutang_id: parseInt(req.body.akun_piutang_id),
      akun_piutang_name: req.body.akun_piutang_name,
      akun_hutang_id: parseInt(req.body.akun_hutang_id),
      akun_hutang_name: req.body.akun_hutang_name,
      syarat_pembayaran: req.body.syarat_pembayaran,
    };

    const update_kontak = await prisma.kontak.update({
      where: {
        id: parseInt(req.body.id),
      },
      data: frontend_data,
    });

    const delete_kontak_detail = await prisma.kontakDetail.deleteMany({
      where: {
        kontak_id: parseInt(req.body.id),
      },
    });

    let detail = [];
    req.body.menu.map((i) => {
      detail.push({
        kontak_id: parseInt(req.body.id),
        kontak_type_id: parseInt(i),
      });
    });

    const create_kontak_detail = await prisma.kontakDetail.createMany({
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json({ message: "Update Kontak Success!", data: frontend_data });
  } catch (error) {
    res.status(400).json({ data: "Update kontak failed!", error });
    console.log(error);
  }
};
