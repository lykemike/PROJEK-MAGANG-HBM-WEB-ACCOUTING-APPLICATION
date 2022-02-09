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
import { groupBy, sortBy, sum, sumBy } from "lodash";
import { getBukuBesarPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const start_date = req.body.tgl_awal;
    const end_date = req.body.tgl_akhir;
    const buku_besar = await getBukuBesarPrisma(start_date, end_date);
    let transform = [];
    let result = [];

    buku_besar?.map((data, index) => {
      if (data.saldo_normal == "Debit") {
        if (data.debit > 0) {
          transform.push({
            heading: data.heading,
            tanggal: data.tanggal,
            debit: data.debit,
            kredit: data.kredit,
            sumber_transaksi: data.sumber_transaksi,
            no_ref: data.no_ref,
            saldo_awal: data.saldo_awal,
            saldo_awal_date: data.saldo_awal_date,
            saldo_normal: data.saldo_awal_date,
            selisih: data.saldo_awal + data.debit,
          });
        } else {
          transform.push({
            heading: data.heading,
            tanggal: data.tanggal,
            debit: data.debit,
            kredit: data.kredit,
            sumber_transaksi: data.sumber_transaksi,
            no_ref: data.no_ref,
            saldo_awal: data.saldo_awal,
            saldo_awal_date: data.saldo_awal_date,
            saldo_normal: data.saldo_awal_date,
            selisih: data.saldo_awal - data.kredit,
          });
        }
      } else if (data.saldo_normal == "Kredit") {
        if (data.kredit > 0) {
          transform.push({
            heading: data.heading,
            tanggal: data.tanggal,
            debit: data.debit,
            kredit: data.kredit,
            sumber_transaksi: data.sumber_transaksi,
            no_ref: data.no_ref,
            saldo_awal: data.saldo_awal,
            saldo_awal_date: data.saldo_awal_date,
            saldo_normal: data.saldo_awal_date,
            selisih: data.saldo_awal + data.kredit,
          });
        } else {
          transform.push({
            heading: data.heading,
            tanggal: data.tanggal,
            debit: data.debit,
            kredit: data.kredit,
            sumber_transaksi: data.sumber_transaksi,
            no_ref: data.no_ref,
            saldo_awal: data.saldo_awal,
            saldo_awal_date: data.saldo_awal_date,
            saldo_normal: data.saldo_awal_date,
            selisih: data.saldo_awal - data.debit,
          });
        }
      }
    });

    let sorting = sortBy(transform, "tanggal");
    let hasil_grouping = groupBy(sorting, "heading");
    let total_debit = sumBy(transform, "debit");
    let total_kredit = sumBy(transform, "kredit");

  

    for (const [key, value] of Object.entries(hasil_grouping)) {
      result.push({
        label: key,
        data: value,
      });
    }

    res.status(201).json({ data: sortBy(result, "label"), debit: total_debit, kredit: total_kredit });
  } catch (error) {
    res.status(400).json({ data: "JURNAL UMUM NOT FOUND!", error });
    console.log(error);
  }
};

