import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // get current penerimaan pembayaran data
    const get_penerimaan_pembayaran = await prisma.penerimaanPembayaran.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        header_penjualan: true,
      },
    });

    // set const for easier global use
    const penerimaan_pembayaran_id = get_penerimaan_pembayaran.id;
    const header_penjualan_id = get_penerimaan_pembayaran.header_penjualan.id;
    const tipe_perusahaan = get_penerimaan_pembayaran.header_penjualan.tipe_perusahaan;
    const tagihan_sebelum_pajak = get_penerimaan_pembayaran.tagihan_sebelum_pajak;
    const tagihan_setelah_pajak = get_penerimaan_pembayaran.tagihan_setelah_pajak;
    const sisa_tagihan = get_penerimaan_pembayaran.header_penjualan.sisa_tagihan;

    // condition for where penjualan tipe perusahaan is false (negeri) or true (swasta)
    if (tipe_perusahaan == "false") {
      // revert sisa tagihan
      const revert_sisa_tagihan = tagihan_sebelum_pajak + sisa_tagihan;

      // update sisa tagihan
      const update_sisa_tagihan = await prisma.headerPenjualan.update({
        where: {
          id: header_penjualan_id,
        },
        data: {
          sisa_tagihan: revert_sisa_tagihan,
        },
      });
    } else {
      // revert sisa tagihan
      const revert_sisa_tagihan = tagihan_setelah_pajak + sisa_tagihan;

      // update sisa tagihan
      const update_sisa_tagihan = await prisma.headerPenjualan.update({
        where: {
          id: header_penjualan_id,
        },
        data: {
          sisa_tagihan: revert_sisa_tagihan,
        },
      });
    }

    // delete current jurnal from laporan transaksi table
    const delete_jurnal_penerimaan_from_laporan_transaksi = await prisma.laporanTransaksi.deleteMany({
      where: {
        delete_ref_no: penerimaan_pembayaran_id,
        delete_ref_name: "Penerimaan Pembayaran",
      },
    });

    // delete current jurnal from jurnal penerimaan pemabayaran table
    const delete_jurnal_penerimaan_pembayaran = prisma.jurnalPenerimaanPembayaran.deleteMany({
      where: {
        penerimaan_pembayaran_id: penerimaan_pembayaran_id,
      },
    });

    // delete current invoice from penerimaan pembayaran table
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
