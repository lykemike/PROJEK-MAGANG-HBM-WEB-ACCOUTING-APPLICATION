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
    let beban_selain_beban_pajak = [];
    let beban_lainnya_selain_beban_pajak = [];
    let pendaptan_lainnya = [];
    let beban_pajak = [];
    let beban_lainnya_pajak = [];

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

    transform
      ?.filter((data) => data.kategori_id == 16 && data.nominal_pajak == 0)
      .map((data) => {
        beban_selain_beban_pajak.push({ ...data, label: "Beban Selain Beban Pajak" });
      });

    transform
      ?.filter((data) => data.kategori_id == 17 && data.nominal_pajak == 0)
      .map((data) => {
        beban_lainnya_selain_beban_pajak.push({ ...data, label: "Beban Selain Beban Pajak" });
      });

    transform
      ?.filter((data) => data.kategori_id == 14)
      .map((data) => {
        pendaptan_lainnya.push({ ...data, label: "Pendapatan Lainnya" });
      });

    transform
      ?.filter((data) => data.kategori_id == 16 && data.nominal_pajak > 0)
      .map((data) => {
        beban_pajak.push({ ...data, label: "Beban Pajak" });
      });

    transform
      ?.filter((data) => data.kategori_id == 17 && data.nominal_pajak > 0)
      .map((data) => {
        beban_lainnya_pajak.push({ ...data, label: "Beban Pajak" });
      });

    let hasilUnionPPHPP = union(pendapatan_penjualan, harga_pokok_penjualan, beban_selain_beban_pajak, beban_lainnya_selain_beban_pajak, pendaptan_lainnya, beban_pajak, beban_lainnya_pajak);
    const hasilGroupPPHPP = groupBy(hasilUnionPPHPP, "label");

    for (const [key, value] of Object.entries(hasilGroupPPHPP)) {
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
      } else if (i.label == "Beban Selain Beban Pajak" && saldo_normal_debit > 0) {
        end_result.push({
          label: "Beban Selain Beban Pajak",
          data: i,
        });
        // } else if (i.label == "Beban Selain Beban Pajak" && saldo_normal_debit > 0) {
        //   end_result.push({
        //     label: "Beban Selain Beban Pajak",
        //     total: saldo_normal_debit,
        //   });
        // } else if (i.label == "Beban Selain Beban Pajak" && saldo_normal_debit < 0) {
        //   end_result.push({
        //     label: "Beban Selain Beban Pajak",
        //     total: "(Rp." + saldo_normal_debit * -1 + ")",
        //   });
      } else if (i.label == "Pendapatan Lainnya" && saldo_normal_kredit > 0) {
        end_result.push({
          label: "Pendapatan Lainnya",
          total: saldo_normal_kredit,
        });
      } else if (i.label == "Pendapatan Lainnya" && saldo_normal_kredit < 0) {
        end_result.push({
          label: "Pendapatan Lainnya",
          total: "(Rp." + saldo_normal_kredit * -1 + ")",
        });
      } else if (i.label == "Beban Pajak" && saldo_normal_debit > 0) {
        end_result.push({
          label: "Beban Pajak",
          total: saldo_normal_debit,
        });
      } else if (i.label == "Beban Pajak" && saldo_normal_debit < 0) {
        end_result.push({
          label: "Beban Pajak",
          total: "(Rp." + saldo_normal_debit * -1 + ")",
        });
      }
    });

    res.status(201).json({ message: "Laba Rugi data found!", end_result });
  } catch (error) {
    res.status(400).json({ data: "Laba Rugi data not found!", error });
    console.log(error);
  }
};
