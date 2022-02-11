import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy, union } from "lodash";
import { getNeracaPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const Neraca = await getNeracaPrisma("01/01/2022", "31/01/2022");
    let transform = Neraca;

    let aset_lancar = [];
    let aset_tetap = [];
    let aktiva_lainya = [];
    let liabilitas_pendek = [];
    let liabilitas_panjang = [];
    let modal = [];

    transform
      ?.filter((data) => data.kategori_id == 1 || data.kategori_id == 2 || data.kategori_id == 3 || data.kategori_id == 4)
      .map((data) => {
        aset_lancar.push({
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
        aktiva_lainya.push({
          ...data,
          label: "aktiva_lainya",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 8 || data.kategori_id == 10)
      .map((data) => {
        liabilitas_pendek.push({
          ...data,
          label: "liabilitas_pendek",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 11)
      .map((data) => {
        liabilitas_panjang.push({
          ...data,
          label: "liabilitas_panjang",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 12)
      .map((data) => {
        modal.push({
          ...data,
          label: "modal",
        });
      });

    const hasil_group_aset = groupBy(union(aset_lancar, aset_tetap, aktiva_lainya, liabilitas_pendek, liabilitas_panjang, modal), "label");

    res.status(201).json({ message: "Trial Balance data found!", Neraca, hasil_group_aset });
  } catch (error) {
    res.status(400).json({ data: "Trial Balance data not found!", error });
    console.log(error);
  }
};
