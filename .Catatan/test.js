import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy, merge, union, mapValues } from "lodash";
import { getLabaRugiPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const start_date = "01-01-2022";
    const end_date = "28-02-2022";

    const laba_rugi = await getLabaRugiPrisma(start_date, end_date);
    let transform = laba_rugi;

    let result = [];
    let end_result = [];
    let pendapatan_penjualan = [];
    let harga_pokok_penjualan = [];
    let total_laba_kotor = [];

    transform
      ?.filter((data) => data.kategori_id == 13)
      .map((data) => {
        pendapatan_penjualan.push({ ...data, label: "Pendapatan Penjualan" });
      });

    transform
      ?.filter((data) => data.kategori_id == 15)
      .map((data) => {
        harga_pokok_penjualan.push({ ...data, label: "Harga Pokok Penjualan" });
      });

    let hasilUnion = union(pendapatan_penjualan, harga_pokok_penjualan);
    const hasilGroup = groupBy(hasilUnion, "label");

    for (const [key, value] of Object.entries(hasilGroup)) {
      result.push({
        label: key,
        data: value,
      });
    }

    result?.map((i) => {
      let saldo_normal_debit = sumBy(i.data, "debit") - sumBy(i.data, "kredit");
      let saldo_normal_kredit = sumBy(i.data, "kredit") - sumBy(i.data, "debit");

      if (i.label == "Pendapatan Penjualan" && saldo_normal_kredit > 0) {
        end_result.push({
          label: "Pendapatan Penjualan",
          total: saldo_normal_kredit,
        });
      } else if (i.label == "Pendapatan Penjualan" && saldo_normal_kredit < 0) {
        end_result.push({
          label: "Pendapatan Penjualan",
          total: "(Rp." + saldo_normal_kredit * -1 + ")",
        });
      } else if (i.label == "Harga Pokok Penjualan" && saldo_normal_debit > 0) {
        end_result.push({
          label: "Harga Pokok Penjualan",
          total: saldo_normal_debit,
        });
      } else if (i.label == "Harga Pokok Penjualan" && saldo_normal_debit < 0) {
        end_result.push({
          label: "Harga Pokok Penjualan",
          total: " (Rp." + saldo_normal_debit * -1 + ")",
        });
      }
    });

    total_laba_kotor.push({
      total_laba_kotor: end_result[0].total - end_result[1].total,
    });

    res.status(201).json({ message: "Laba Rugi data found!", result, end_result, total_laba_kotor });
  } catch (error) {
    res.status(400).json({ data: "Laba Rugi data not found!", error });
    console.log(error);
  }
};
