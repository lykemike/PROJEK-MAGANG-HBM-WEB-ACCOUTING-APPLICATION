import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const get_pengiriman_pembayaran = await prisma.pengirimanBayaran.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        header_pembelian: true,
      },
    });

    const pengiriman_pembayaran_id = get_pengiriman_pembayaran.id;
    const header_pembelian_id = get_pengiriman_pembayaran.header_pembelian.id;
    const jumlah_pengirimanbayaran = get_pengiriman_pembayaran.jumlah;
    const sisa_tagihan = get_pengiriman_pembayaran.header_pembelian.sisa_tagihan;

    const revert_sisa_tagihan = jumlah_pengirimanbayaran + sisa_tagihan;

    const update_sisa_tagihan = await prisma.headerPembelian.update({
      where: {
        id: header_pembelian_id,
      },
      data: {
        sisa_tagihan: revert_sisa_tagihan,
      },
    });

    const delete_jurnal_Pengiriman_pembayaran = prisma.jurnalPengirimanBayaran.deleteMany({
      where: {
        PengirimanBayaran_id: pengiriman_pembayaran_id,
      },
    });

    const delete_Pengiriman_pembayaran = prisma.pengirimanBayaran.delete({
      where: {
        id: pengiriman_pembayaran_id,
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal_Pengiriman_pembayaran, delete_Pengiriman_pembayaran]);

    res.status(201).json({ message: "Delete invoice Pengiriman pembayaran success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete invoice Pengiriman pembayaran failed!", error });
    console.log(error);
  }
};
