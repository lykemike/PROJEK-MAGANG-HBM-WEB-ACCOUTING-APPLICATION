import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const get_pengiriman_pembayaran = await prisma.pengirimanPembayaran.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        header_pembelian: true,
      },
    });

    const pengiriman_pembayaran_id = get_pengiriman_pembayaran.id;
    const header_pembelian_id = get_pengiriman_pembayaran.header_pembelian.id;
    const tipe_perusahaan = get_pengiriman_pembayaran.header_pembelian.tipe_perusahaan;
    const tagihan_sebelum_pajak = get_pengiriman_pembayaran.tagihan_sebelum_pajak;
    const tagihan_setelah_pajak = get_pengiriman_pembayaran.tagihan_setelah_pajak;
    const sisa_tagihan = get_pengiriman_pembayaran.header_pembelian.sisa_tagihan;

    if (tipe_perusahaan == "false") {
      const revert_sisa_tagihan = tagihan_sebelum_pajak + sisa_tagihan;

      const update_sisa_tagihan = await prisma.headerpembelian.update({
        where: {
          id: header_pembelian_id,
        },
        data: {
          sisa_tagihan: revert_sisa_tagihan,
        },
      });
    } else {
      const revert_sisa_tagihan = tagihan_setelah_pajak + sisa_tagihan;

      const update_sisa_tagihan = await prisma.headerPembelian.update({
        where: {
          id: header_pembelian_id,
        },
        data: {
          sisa_tagihan: revert_sisa_tagihan,
        },
      });
    }

    const delete_jurnal_penerimaan_pembayaran = prisma.jurnalPenerimaanPembayaran.deleteMany({
      where: {
        penerimaan_pembayaran_id: penerimaan_pembayaran_id,
      },
    });

    const delete_penerimaan_pembayaran = prisma.penerimaanPembayaran.delete({
      where: {
        id: penerimaan_pembayaran_id,
      },
    });

    const transaction = await prisma.$transaction([delete_jurnal_penerimaan_pembayaran, delete_penerimaan_pembayaran]);

    res.status(201).json({ message: "Delete invoice penerimaan pembayaran success!", data: transaction });
  } catch (error) {
    res.status(400).json({ data: "Delete invoice penerimaan pembayaran failed!", error });
    console.log(error);
  }
};
