import multer from "multer";
import { extname } from "path";
import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const frontend_data = {
      kontak_id: parseInt(req.body.nama_supplier),
      nama_supplier: req.body.nama_supplier,
      email: req.body.email,
      alamat_supplier: req.body.alamat_supplier,
      tgl_transaksi: req.body.tgl_transaksi,
      tgl_jatuh_tempo: req.body.tgl_jatuh_tempo,
      syarat_pembayaran: req.body.syarat_pembayaran,
      no_ref_penagihan: parseInt(req.body.no_ref_penagihan),
      no_transaksi: parseInt(req.body.no_transaksi),
      tag: req.body.tag,
      pesan: req.body.pesan,
      memo: req.body.memo,
      file_attachment: req.body.fileattachment,
      subtotal: parseInt(req.body.subtotal),
      total_diskon_per_baris: parseInt(req.body.total_diskon_per_baris),
      diskon: parseInt(req.body.diskon),
      total_diskon: parseInt(req.body.total_diskon),
      total_pajak_per_baris: parseInt(req.body.total_pajak_per_baris),
      total: parseInt(req.body.total),
      pemotongan: parseInt(req.body.pemotongan),
      pemotongan_total: parseInt(req.body.pemotongan_total),
      akun_pemotongan: parseInt(req.body.akun_pemotongan),
      uang_muka: parseInt(req.body.uang_muka),
      akun_uang_muka: parseInt(req.body.akun_uang_muka),
      sisa_tagihan: parseInt(req.body.sisa_tagihan),
      balance: parseInt(req.body.balance),
    };

    const update_header_pembelian = await prisma.headerPembelian.updateMany({
      where: {
        id: parseInt(req.body.id),
      },
      data: [frontend_data],
      skipDuplicates: true,
    });

    const find_header_pembelian = await prisma.headerPembelian.findMany({
      where: {
        id: parseInt(req.body.id),
      },
    });

    let detail = [];
    req.body.produks.map((i) => {
      detail.push({
        header_pembelian_id: find_header_pembelian.id,
        produk_id: parseInt(i.produk_id),
        nama_produk: i.nama_produk,
        desk_produk: i.deskripsi_produk,
        kuantitas: parseInt(i.kuantitas),
        satuan: i.satuan,
        harga_satuan: parseInt(i.harga_satuan),
        diskon: parseInt(i.diskon),
        hasil_diskon: parseInt(i.hasil_diskon),
        pajak_id: parseInt(i.pajak_id),
        pajak_nama: i.pajak_nama,
        pajak_persen: i.pajak_persen,
        hasil_pajak: parseInt(i.hasil_pajak),
        jumlah: parseInt(i.jumlah),
      });
    });

    const update_detail_pembelian = await prisma.detailPembelian.update({
      where: {
        header_pembelian_id: parseInt(req.body.id),
      },
      data: detail,
      skipDuplicates: true,
    });

    res.status(201).json([{ message: "Update pembelian success!", data: update_detail_pembelian }]);
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};
