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
        ?.filter((data) => data.kategori_id == 14)
        .map((j) => {
          pendapatanlainya.push({
            ...j,
            label: "Pendapatan Lainnya",
            // heading: "Liabilitas",
          });
        });
    });
    //////////////////////////////////
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
    ////////////////////////////////////////////////

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

    res.status(201).json({
      message: "Neraca data found!",
      hasil_union_aset,
    });
  } catch (error) {
    res.status(400).json({ data: "Neraca data not found!", error });
    console.log(error);
  }
};
