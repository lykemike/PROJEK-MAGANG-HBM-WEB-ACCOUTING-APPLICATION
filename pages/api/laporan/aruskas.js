import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy, merge, union, mapValues, includes } from "lodash";
import { getArusKasPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const start_date = req.body.tgl_awal;
    const end_date = req.body.tgl_akhir;
    const aruskas = await getArusKasPrisma(start_date, end_date);
    let transform = aruskas;

    let penerimaan_pelanggan = [];
    let aset_lancar = [];
    let pembayaran = [];
    let kartukreditliabilitaspendek = [];
    let pendapatanlainya = [];
    let operasional = [];
    let penjualanaset = [];
    let aktivitas = [];
    let pembayaranpinjaman = [];
    let modal = [];

    let result = [];
    let result2 = [];
    let hasilgrup1 = groupBy(transform, "sumber");

    for (const [key, value] of Object.entries(hasilgrup1)) {
      let temp = [];

      let isInclude = value
        .map((i) => {
          return +i.kategori_id;
        })
        .includes(3);

      result.push({
        label: key,
        data: isInclude ? value : [],
      });
      temp = [];
    }

    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 1 || data.kategori_id == 13)
        .map((j) => {
          penerimaan_pelanggan.push({
            ...j,
            label: "Penerimaaan Dari Pelanggan",
            // heading: "Aset",
          });
        });
    });

    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 2)
        .map((j) => {
          aset_lancar.push({
            ...j,
            label: "Aset Lancar Lainya",
            // heading: "Aset",
          });
        });
    });
    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 8 || data.kategori_id == 15)
        .map((j) => {
          pembayaran.push({
            ...j,
            label: "Pembayaran ke Pemasok",
          });
        });
    });

    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 10)
        .map((j) => {
          kartukreditliabilitaspendek.push({
            ...j,
            label: "Kartu Kredit dan Liabilitas Jangka Pendek Lainnya",
            // heading: "Liabilitas",
          });
        });
    });

    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 14)
        .map((j) => {
          pendapatanlainya.push({
            ...j,
            label: "Pendapatan Lainnya",
            // heading: "Liabilitas",
          });
        });
    });

    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 16 || data.kategori_id == 17)
        .map((j) => {
          operasional.push({
            ...j,
            label: "Pengeluaran operasional",
            // heading: "Liabilitas",
          });
        });
    });

    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 5)
        .map((j) => {
          penjualanaset.push({
            ...j,
            label: "Perolehan/Penjualan Aset",
            // heading: "Aset",
          });
        });
    });
    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 6)
        .map((j) => {
          aktivitas.push({
            ...j,
            label: "Aktivitas Investasi Lainnya",
            // heading: "Aset",
          });
        });
    });
    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 11)
        .map((j) => {
          pembayaranpinjaman.push({
            ...j,
            label: "Pembayaran/Penerimaan pinjaman",
            // heading: "Aset",
          });
        });
    });

    result?.map((i) => {
      i.data
        ?.filter((data) => data.kategori_id == 12)
        .map((j) => {
          modal.push({
            ...j,
            label: "Ekuitas/Modal",
            // heading: "Aset",
          });
        });
    });

    const hasil_union_aset = union(
      aset_lancar,
      penerimaan_pelanggan,
      pembayaran,
      kartukreditliabilitaspendek,
      pendapatanlainya,
      operasional,
      penjualanaset,
      pembayaranpinjaman,
      aktivitas,
      modal
    );
    let total = [];

    let hasilgroupinglabel = groupBy(hasil_union_aset, "label");

    for (const [key, value] of Object.entries(hasilgroupinglabel)) {
      result2.push({
        label: key,
        data: value,
      });
    }
    result2.map((j) => {
      let pny = 0;
      pny = sumBy(j.data, "debit") - sumBy(j.data, "kredit");

      if (j.label == "Penerimaaan Dari Pelanggan" && pny > 0) {
        total.push({
          kode: 1,
          penerimaan_dari_pelanggan: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }),
          total2: pny,
        });
      } else if (j.label == "Penerimaaan Dari Pelanggan" && pny < 0) {
        total.push({
          kode: 1,
          penerimaan_dari_pelanggan: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")",
          total2: pny,
        });
      } else if (j.label == "Aset Lancar Lainya" && pny > 0) {
        total.push({
          kode: 2,
          aset: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }),
          total2: pny,
        });
      } else if (j.label == "Aset Lancar Lainya" && pny < 0) {
        total.push({ kode: 2, aset: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Pembayaran ke Pemasok" && pny > 0) {
        total.push({ kode: 3, pembayaran: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Pembayaran ke Pemasok" && pny < 0) {
        total.push({ kode: 3, pembayaran: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Kartu Kredit dan Liabilitas Jangka Pendek Lainnya" && pny > 0) {
        total.push({ kode: 4, kartukredit: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Kartu Kredit dan Liabilitas Jangka Pendek Lainnya" && pny < 0) {
        total.push({ kode: 4, kartukredit: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Pendapatan Lainnya" && pny > 0) {
        total.push({ kode: 5, pendapatanlain: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Pendapatan Lainnya" && pny < 0) {
        total.push({ kode: 5, pendapatanlain: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Pengeluaran operasional" && pny > 0) {
        total.push({ kode: 6, pengeluaran: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Pengeluaran operasional" && pny < 0) {
        total.push({ kode: 6, pengeluaran: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Perolehan/Penjualan Aset" && pny > 0) {
        total.push({ kode: 7, penjualanaset: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Perolehan/Penjualan Aset" && pny < 0) {
        total.push({ kode: 7, penjualanaset: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Aktivitas Investasi Lainnya" && pny > 0) {
        total.push({ kode: 8, aktivitas: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Aktivitas Investasi Lainnya" && pny < 0) {
        total.push({ kode: 8, aktivitas: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Pembayaran/Penerimaan pinjaman" && pny > 0) {
        total.push({ kode: 9, penerimaanpinjaman: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Pembayaran/Penerimaan pinjaman" && pny < 0) {
        total.push({ kode: 9, penerimaanpinjaman: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      } else if (j.label == "Ekuitas/Modal" && pny > 0) {
        total.push({ kode: 10, modal: "Rp. " + pny.toLocaleString({ minimumFractionDigits: 0 }), total2: pny });
      } else if (j.label == "Ekuitas/Modal" && pny < 0) {
        total.push({ kode: 10, modal: "(Rp. " + (pny * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")", total2: pny });
      }
    });

    let pny1 = total?.filter((i) => i.kode == 1);
    let pny2 = total?.filter((i) => i.kode == 2);
    let pny3 = total?.filter((i) => i.kode == 3);
    let pny4 = total?.filter((i) => i.kode == 4);
    let pny5 = total?.filter((i) => i.kode == 5);
    let pny6 = total?.filter((i) => i.kode == 6);
    let pny7 = total?.filter((i) => i.kode == 7);
    let pny8 = total?.filter((i) => i.kode == 8);
    let pny9 = total?.filter((i) => i.kode == 9);
    let pny10 = total?.filter((i) => i.kode == 10);

    let total_opr = [
      {
        aktivias_opr: pny1[0].total2 + pny2[0].total2 + pny3[0].total2 + pny4[0].total2 + pny5[0].total2 + pny6[0].total2,
      },
      { aktivitas_inv: pny7[0].total2 + pny8[0].total2 },
      { aktivitas_dana: pny9[0].total2 + pny10[0].total2 },
    ];

    res.status(201).json({
      message: "Neraca data found!",
      pny1,
      data: total,
    });
  } catch (error) {
    res.status(400).json({ data: "Neraca data not found!", error });
    console.log(error);
  }
};
