import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy, merge, union, mapValues } from "lodash";
import { getTrialBalancePrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const start_date = req.body.tgl_awal;
    const end_date = req.body.tgl_akhir;

    const trial_balance = await getTrialBalancePrisma(start_date, end_date);
    let transform = trial_balance;
    let aset = [];
    let kewajiban = [];
    let ekuitas = [];
    let result = [];

    transform
      ?.filter(
        (data) =>
          data.kategori_id == 1 ||
          data.kategori_id == 2 ||
          data.kategori_id == 3 ||
          data.kategori_id == 4 ||
          data.kategori_id == 5 ||
          data.kategori_id == 6 ||
          data.kategori_id == 7 ||
          data.kategori_id == 15
      )
      .map((data) => {
        aset.push({
          ...data,
          label: "Aset",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 8 || data.kategori_id == 10 || data.kategori_id == 11)
      .map((data) => {
        kewajiban.push({
          ...data,
          label: "Kewajiban",
        });
      });

    transform
      ?.filter((data) => data.kategori_id == 12 || data.kategori_id == 13 || data.kategori_id == 14 || data.kategori_id == 16 || data.kategori_id == 17)
      .map((data) => {
        ekuitas.push({
          ...data,
          label: "Ekuitas",
        });
      });

    let hasilUnion = union(aset, kewajiban, ekuitas);

    const hasilNestedGrouping = mapValues(
      groupBy(hasilUnion, (i) => i.label),
      (hasilUnion2) => groupBy(hasilUnion2, (j) => j.heading)
    );

    for (const [key, value] of Object.entries(hasilNestedGrouping)) {
      result.push({
        label: key,
        data: value,
      });
    }

    let end_result = [];

    result.map((data) => {
      let obj = { label: data.label };
      let sumValue = [];

      for (const [key, value] of Object.entries(data.data)) {
        let selisih_pny_debit = sumBy(value, "debit") - sumBy(value, "kredit");
        let selisih_pny_kredit = sumBy(value, "kredit") - sumBy(value, "debit");
        let selisih_akhir_debit = sumBy(value, "debit") - sumBy(value, "kredit") + value[0].saldo_awal_debit;
        let selisih_akhir_kredit = sumBy(value, "kredit") - sumBy(value, "debit") + value[0].saldo_awal_kredit;

        let pny_debit = 0;
        let pny_kredit = 0;
        let akhir_debit = 0;
        let akhir_kredit = 0;

        let total_pny_debit = 0;
        let total_pny_kredit = 0;
        let total_akhir_debit = 0;
        let total_akhir_kredit = 0;

        if (value[0].saldo_normal == "Debit" && selisih_pny_debit > 0) {
          pny_debit = "Rp. " + selisih_pny_debit.toLocaleString({ minimumFractionDigits: 0 });
          pny_kredit = 0;

          total_pny_debit = selisih_pny_debit;
          total_pny_kredit = 0;
        } else if (value[0].saldo_normal == "Debit" && selisih_pny_debit < 0) {
          pny_debit = "(Rp. " + (selisih_pny_debit * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")";
          pny_kredit = 0;

          total_pny_debit = selisih_pny_debit;
          total_pny_kredit = 0;
        } else if (value[0].saldo_normal == "Kredit" && selisih_pny_kredit > 0) {
          pny_debit = 0;
          pny_kredit = "Rp. " + selisih_pny_kredit.toLocaleString({ minimumFractionDigits: 0 });

          total_pny_debit = 0;
          total_pny_kredit = selisih_pny_kredit;
        } else if (value[0].saldo_normal == "Kredit" && selisih_pny_kredit < 0) {
          pny_debit = 0;
          pny_kredit = "(Rp. " + (selisih_pny_kredit * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")";

          total_pny_debit = 0;
          total_pny_kredit = selisih_pny_kredit;
        }

        if (value[0].saldo_normal == "Debit" && selisih_akhir_debit > 0) {
          akhir_debit = "Rp. " + selisih_akhir_debit.toLocaleString({ minimumFractionDigits: 0 });
          akhir_kredit = 0;

          total_akhir_debit = selisih_akhir_debit;
          total_akhir_kredit = 0;
        } else if (value[0].saldo_normal == "Debit" && selisih_akhir_debit < 0) {
          akhir_debit = "(Rp. " + (selisih_akhir_debit * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")";
          akhir_kredit = 0;

          total_akhir_debit = selisih_akhir_debit;
          total_akhir_kredit = 0;
        } else if (value[0].saldo_normal == "Kredit" && selisih_akhir_kredit > 0) {
          akhir_debit = 0;
          akhir_kredit = "Rp. " + selisih_akhir_kredit.toLocaleString({ minimumFractionDigits: 0 });

          total_akhir_debit = 0;
          total_akhir_kredit = selisih_akhir_kredit;
        } else if (value[0].saldo_normal == "Kredit" && selisih_akhir_kredit < 0) {
          akhir_debit = 0;
          akhir_kredit = "(Rp. " + (selisih_akhir_kredit * -1).toLocaleString({ minimumFractionDigits: 0 }) + ")";

          total_akhir_debit = 0;
          total_akhir_kredit = selisih_akhir_kredit;
        }

        sumValue.push({
          heading: key,
          saldo_normal: value[0].saldo_normal,
          saldo_awal_debit: value[0].saldo_awal_debit,
          saldo_awal_kredit: value[0].saldo_awal_kredit,
          pny_debit: pny_debit == 0 ? "Rp. 0" : pny_debit,
          pny_kredit: pny_kredit == 0 ? "Rp. 0" : pny_kredit,
          akhir_debit: akhir_debit == 0 ? "Rp. 0" : akhir_debit,
          akhir_kredit: akhir_kredit == 0 ? "Rp. 0" : akhir_kredit,

          total_pny_debit: total_pny_debit,
          total_pny_kredit: total_pny_kredit,
          total_akhir_debit: total_akhir_debit,
          total_akhir_kredit: total_akhir_kredit,
        });
      }

      end_result.push({ ...obj, value: sumValue });
      sumValue = [];
      obj = {};
    });

    res.status(201).json({ message: "Trial Balance data found!", data: end_result });
  } catch (error) {
    res.status(400).json({ data: "Trial Balance data not found!", error });
    console.log(error);
  }
};
