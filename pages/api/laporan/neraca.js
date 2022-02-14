import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy, merge, union, mapValues } from "lodash";
import { getNeracaPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const Neraca = await getNeracaPrisma("01/01/2022", "31/01/2022");
    let transform = Neraca;
    // let array = [];
    // let array1 = [];
    let aset_lancar = [];
    let aset_tetap = [];
    let aktiva_lainya = [];
    let liabilitas_pendek = [];
    let liabilitas_panjang = [];
    let modal = [];

    transform
      ?.filter((data) => data.kategori_id == 1 || data.kategori_id == 2 || data.kategori_id == 3 || data.kategori_id == 4)
      .map((data) => {
        array.push({
          ...data,
          label: "Aset Lancar",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 5 || data.kategori_id == 7)
      .map((data) => {
        aset_tetap.push({
          ...data,
          label: "Aset Tetap",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 6)
      .map((data) => {
        array1.push({
          ...data,
          label: "Aktiva Lainya",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 8 || data.kategori_id == 10)
      .map((data) => {
        liabilitas_pendek.push({
          ...data,
          label: "Liabilitas Pendek",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 11)
      .map((data) => {
        liabilitas_panjang.push({
          ...data,
          label: "Liabilitas Panjang",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 12)
      .map((data) => {
        modal.push({
          ...data,
          label: "Modal",
        });
      });

    const hasil_union_aset = union(aset_lancar, aset_tetap, aktiva_lainya, liabilitas_pendek, liabilitas_panjang, modal);
    const hasilNestedGrouping = mapValues(
      groupBy(hasil_union_aset, (i) => i.label),
      (hasil_union_aset2) => groupBy(hasil_union_aset2, (j) => j.heading)
    );

    res.status(201).json({ message: "Trial Balance data found!", hasilNestedGrouping });
  } catch (error) {
    res.status(400).json({ data: "Trial Balance data not found!", error });
    console.log(error);
  }
};
