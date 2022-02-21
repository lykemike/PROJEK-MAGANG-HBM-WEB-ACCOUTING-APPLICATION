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

    result
      ?.filter((data) => data.kategori_id == 1 || data.kategori_id == 13)
      .map((data) => {
        penerimaan_pelanggan.push({
          ...data,
          label: "Penerimaaan Dari Pelanggan",
          // heading: "Aset",
        });
      });

    result
      ?.filter((data) => data.kategori_id == 2)
      .map((data) => {
        aset_lancar.push({
          ...data,
          label: "Aset Lancar Lainya",
          // heading: "Aset",
        });
      });

    result
      ?.filter((data) => data.data.kategori_id == 8 || data.data.kategori_id == 15)
      .map((data) => {
        pembayaran.push({
          ...data,
          label: "Pembayaran ke Pemasok",
          // heading: "Aset",
        });
      });

    result
      ?.filter((data) => data.kategori_id == 10)
      .map((data) => {
        kartukreditliabilitaspendek.push({
          ...data,
          label: "Kartu Kredit dan Liabilitas Jangka Pendek Lainnya",
          // heading: "Liabilitas",
        });
      });

    result
      ?.filter((data) => data.kategori_id == 14)
      .map((data) => {
        pendapatanlainya.push({
          ...data,
          label: "Pendapatan Lainnya",
          // heading: "Liabilitas",
        });
      });

    result
      ?.filter((data) => data.kategori_id == 16 || data.kategori_id == 17)
      .map((data) => {
        operasional.push({
          ...data,
          label: "Pengeluaran operasional",
          // heading: "Liabilitas",
        });
      });

    result
      ?.filter((data) => data.kategori_id == 5)
      .map((data) => {
        penjualanaset.push({
          ...data,
          label: "Perolehan/Penjualan Aset",
          // heading: "Aset",
        });
      });

    result
      ?.filter((data) => data.kategori_id == 6)
      .map((data) => {
        aktivitas.push({
          ...data,
          label: "Aktivitas Investasi Lainnya",
          // heading: "Aset",
        });
      });

    result
      ?.filter((data) => data.kategori_id == 11)
      .map((data) => {
        pembayaranpinjaman.push({
          ...data,
          label: "Pembayaran/Penerimaan pinjaman",
          // heading: "Aset",
        });
      });
    result
      ?.filter((data) => data.kategori_id == 12)
      .map((data) => {
        modal.push({
          ...data,
          label: "Ekuitas/Modal",
          // heading: "Aset",
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

    res.status(201).json({ message: "Neraca data found!", result });
  } catch (error) {
    res.status(400).json({ data: "Neraca data not found!", error });
    console.log(error);
  }
};
