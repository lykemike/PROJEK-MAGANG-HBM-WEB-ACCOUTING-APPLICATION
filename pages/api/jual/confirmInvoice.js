import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const get_penerimaan_pembayaran = await prisma.penerimaanPembayaran.findFirst({
      where: {
        id: parseInt(req.body.id),
      },
      include: {
        header_penjualan: {
          include: {
            kontak: {
              include: {
                piutang: true,
              },
            },
          },
        },
        akun: true,
        JurnalPenerimaanPembayaran: {
          include: {
            akun: true,
          },
        },
      },
    });

    const get_saldo_skrg = await prisma.detailSaldoAwal.findMany({
      where: {
        akun_id: {
          in: get_penerimaan_pembayaran.JurnalPenerimaanPembayaran.map((i) => i.akun_id),
        },
      },
    });

    let sisa_saldo_skrg = [];
    get_penerimaan_pembayaran.JurnalPenerimaanPembayaran.map((i) => {
      sisa_saldo_skrg.push({
        akun_id: i.akun_id,
        nominal: i.nominal,
      });
    });

    let new_sisa_saldo_skrg = [];
    sisa_saldo_skrg.map((i, index) => {
      new_sisa_saldo_skrg.push({
        akun_id: i.akun_id,
        nominal: get_saldo_skrg[index].sisa_saldo + i.nominal,
      });
    });

    for (var k = 0; k < get_saldo_skrg.length; k++) {
      const update_saldo_skrg = await prisma.detailSaldoAwal.updateMany({
        where: {
          akun_id: new_sisa_saldo_skrg[k].akun_id,
        },
        data: {
          sisa_saldo: new_sisa_saldo_skrg[k].nominal,
        },
      });
    }

    const tipe_perusahaan = get_penerimaan_pembayaran.header_penjualan.tipe_perusahaan;
    const akun_kas_kecil = get_penerimaan_pembayaran.akun_id;
    const akun_piutang = get_penerimaan_pembayaran.header_penjualan.kontak.piutang.id;
    const nominal_negeri = get_penerimaan_pembayaran.tagihan_sebelum_pajak - get_penerimaan_pembayaran.pajak_total;
    const nominal_swasta = get_penerimaan_pembayaran.tagihan_setelah_pajak - get_penerimaan_pembayaran.pajak_total;

    if (tipe_perusahaan == "false") {
      const update_status = await prisma.penerimaanPembayaran.update({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
        data: {
          status: "Done",
        },
      });

      const create_jurnal_done = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            tanggal: req.body.tanggal,
            akun_id: akun_kas_kecil,
            nominal: nominal_negeri,
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            tanggal: req.body.tanggal,
            akun_id: akun_piutang,
            nominal: nominal_negeri,
            tipe_saldo: "Kredit",
          },
        ],
      });
    } else {
      const update_status = await prisma.penerimaanPembayaran.update({
        where: {
          id: get_penerimaan_pembayaran.id,
        },
        data: {
          status: "Done",
        },
      });

      const create_jurnal_done = await prisma.jurnalPenerimaanPembayaran.createMany({
        data: [
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            tanggal: req.body.tanggal,
            akun_id: akun_kas_kecil,
            nominal: nominal_swasta,
            tipe_saldo: "Debit",
          },
          {
            header_penjualan_id: get_penerimaan_pembayaran.header_penjualan.id,
            penerimaan_pembayaran_id: get_penerimaan_pembayaran.id,
            tanggal: req.body.tanggal,
            akun_id: akun_piutang,
            nominal: nominal_swasta,
            tipe_saldo: "Kredit",
          },
        ],
      });
    }

    const message = "All data successfully DONE";

    res.status(201).json({ message: "Complete invoice penerimaan pembayaran success!", get_penerimaan_pembayaran, get_saldo_skrg, sisa_saldo_skrg, new_sisa_saldo_skrg });
  } catch (error) {
    res.status(400).json({ data: "Comeplete invoice penerimaan pembayaran failed!", error });
    console.log(error);
  }
};
