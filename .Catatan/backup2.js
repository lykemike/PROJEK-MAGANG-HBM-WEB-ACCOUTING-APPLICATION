import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy } from "lodash";
import { getBukuBesarPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const start_date = req.body.tgl_awal;
    const end_date = req.body.tgl_akhir;
    const buku_besar = await getBukuBesarPrisma(start_date, end_date);
    let tranform = [];

    let result = [];

    let saldo_awal = 0;

    buku_besar?.map((data, index) => {
      if (data.saldo_normal == "Debit") {
        tranform.push({
          heading: data.heading,
          tanggal: data.tanggal,
          debit: data.debit,
          kredit: data.kredit,
          sumber_transaksi: data.sumber_transaksi,
          no_ref: data.no_ref,
          saldo_awal: data.saldo_awal,
          saldo_awal_date: data.saldo_awal_date,
          saldo_normal: data.saldo_awal_date,
          selisih: 0,
        });
      } else if (data.saldo_normal == "Kredit") {
        tranform.push({
          heading: data.heading,
          tanggal: data.tanggal,
          debit: data.debit,
          kredit: data.kredit,
          sumber_transaksi: data.sumber_transaksi,
          no_ref: data.no_ref,
          saldo_awal: data.saldo_awal,
          saldo_awal_date: data.saldo_awal_date,
          saldo_normal: data.saldo_awal_date,
          selisih: 0,
        });
      }
    });

    let hasil_grouping = groupBy(tranform, "heading");
    let total_debit = sumBy(tranform, "debit");
    let total_kredit = sumBy(tranform, "kredit");

    for (const [key, value] of Object.entries(hasil_grouping)) {
      result.push({
        label: key,
        data: value,
      });
    }

    let akhir = [];
    result.forEach((value, indexLabel) => {
      let obj = { label: value.label };
      let temp = [];
      let saldo_awal = 0;
      value.data.map((j, index) => {
        if (index > 0) {
          saldo_awal = saldo_awal + j.debit - j.kredit;
          temp.push({
            ...j,
            selisih: saldo_awal,
          });
        } else {
          saldo_awal = value.data[0].debit;
          temp.push({
            ...j,
            selisih: saldo_awal,
          });
        }
      });
      saldo_awal = 0;
      akhir.push({ ...obj, value: temp });
    });

    res.status(201).json({ data: sortBy(result, "label"), debit: total_debit, kredit: total_kredit, result, akhir });
  } catch (error) {
    res.status(400).json({ data: "JURNAL UMUM NOT FOUND!", error });
    console.log(error);
  }
};

// BAKC UP

import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy, merge, union, mapValues } from "lodash";
import { getTrialBalancePrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const trial_balance = await getTrialBalancePrisma("01/01/2022", "31/01/2022");
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
        let pny_debit = sumBy(value, "debit") - sumBy(value, "kredit");
        let pny_kredit = sumBy(value, "kredit") - sumBy(value, "debit");
        let akhir_debit = sumBy(value, "saldo_awal_debit") + pny_debit;
        let akhir_kredit = sumBy(value, "saldo_awal_kredit") + pny_kredit;
        let jadi_debit = 0;
        let jadi_kredit = 0;
        let jadi_pny_debit = value[0].saldo_normal === "Debit" ? akhir_debit : 0;
        let jadi_pny_kredit = value[0].saldo_normal === "Kredit" ? akhir_kredit : 0;
        if (pny_debit < 0 && value[0].saldo_normal === "Debit") {
          jadi_pny_kredit = pny_debit * -1;
          jadi_pny_debit = 0;
        } else if (pny_kredit < 0 && value[0].saldo_normal === "Kredit") {
          jadi_pny_debit = pny_kredit * -1;
          jadi_pny_kredit = 0;
        } else if (pny_debit > 0 && value[0].saldo_normal === "Debit") {
          jadi_pny_debit = pny_debit;
          jadi_pny_kredit = 0;
        } else if (pny_kredit > 0 && value[0].saldo_normal === "Kredit") {
          jadi_pny_debit = 0;
          jadi_pny_kredit = pny_kredit;
        }

        if (akhir_debit < 0 && value[0].saldo_normal === "Debit") {
          jadi_kredit = +akhir_debit * -1;
        } else if (akhir_kredit < 0 && value[0].saldo_normal === "Kredit") {
          jadi_debit = +akhir_kredit * -1;
        }
        sumValue.push({
          heading: key,
          debit: sumBy(value, "debit"),
          kredit: sumBy(value, "kredit"),
          saldo_awal_debit: sumBy(value, "saldo_awal_debit"),
          saldo_awal_kredit: sumBy(value, "saldo_awal_kredit"),
          saldo_pny_debit: jadi_pny_debit,
          saldo_pny_kredit: jadi_pny_kredit,
          saldo_akhir_debit: jadi_debit,
          saldo_akhir_kredit: jadi_kredit,
          saldo_normal: value[0].saldo_normal,
        });
      }
      end_result.push({ ...obj, value: sumValue });
      sumValue = [];
      obj = {};
    });
    // penyesuian_debit, penyesuian_kredit, saldo_akhir_debit, saldo_akhir_kredit

    res.status(201).json({ message: "Trial Balance data found!", data: end_result });
  } catch (error) {
    res.status(400).json({ data: "Trial Balance data not found!", error });
    console.log(error);
  }
};

