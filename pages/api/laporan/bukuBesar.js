import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy } from "lodash";
import { getBukuBesarPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    // let result = [];

    // let hasil_grouping = groupBy(buku_besar, "nama_akun");

    // for (const [key, value] of Object.entries(hasil_grouping)) {
    //   result.push({
    //     label: key,
    //     data: value,
    //   });
    // }

    const start_date = req.body.tgl_awal;
    const end_date = req.body.tgl_akhir;
    const buku_besar = await getBukuBesarPrisma(start_date, end_date);

    // let transform = buku_besar;
    let transform2 = [];
    // let result = [];
    let result2 = [];

    let a = 0;
    let b = 0;

    buku_besar?.map((data) => {
      if (data.saldo_normal == "Debit") {
        transform2.push({
          heading: data.heading,
          tanggal: data.tanggal,
          debit: data.debit,
          kredit: data.kredit,
          sumber_transaksi: data.sumber_transaksi,
          no_ref: data.no_ref,
          saldo_awal: data.saldo_awal,
          saldo_awal_date: data.saldo_awal_date,
          saldo_normal: data.saldo_awal_date,
          selisih: data.debit > 0 ? data.saldo_awal + data.debit : data.saldo_awal - data.debit,
        });
        // if (data.debit > 0) {
        //   transform2.push({
        //     heading: data.heading,
        //     tanggal: data.tanggal,
        //     debit: data.debit,
        //     kredit: data.kredit,
        //     sumber_transaksi: data.sumber_transaksi,
        //     no_ref: data.no_ref,
        //     saldo_awal: data.saldo_awal,
        //     saldo_awal_date: data.saldo_awal_date,
        //     saldo_normal: data.saldo_awal_date,
        //     selisih: data.saldo_awal + data.debit,
        //   });
        // } else {
        //   transform2.push({
        //     heading: data.heading,
        //     tanggal: data.tanggal,
        //     debit: data.debit,
        //     kredit: data.kredit,
        //     sumber_transaksi: data.sumber_transaksi,
        //     no_ref: data.no_ref,
        //     saldo_awal: data.saldo_awal,
        //     saldo_awal_date: data.saldo_awal_date,
        //     saldo_normal: data.saldo_awal_date,
        //     selisih: data.saldo_awal - data.kredit,
        //   });
        // }
      } else if (data.saldo_normal == "Kredit") {
        // if (data.kredt > 0) {
        //   transform2.push({
        //     heading: data.heading,
        //     tanggal: data.tanggal,
        //     debit: data.debit,
        //     kredit: data.kredit,
        //     sumber_transaksi: data.sumber_transaksi,
        //     no_ref: data.no_ref,
        //     saldo_awal: data.saldo_awal,
        //     saldo_awal_date: data.saldo_awal_date,
        //     saldo_normal: data.saldo_awal_date,
        //     selisih: data.saldo_awal + data.kredit,
        //   });
        // } else {
        //   transform2.push({
        //     heading: data.heading,
        //     tanggal: data.tanggal,
        //     debit: data.debit,
        //     kredit: data.kredit,
        //     sumber_transaksi: data.sumber_transaksi,
        //     no_ref: data.no_ref,
        //     saldo_awal: data.saldo_awal,
        //     saldo_awal_date: data.saldo_awal_date,
        //     saldo_normal: data.saldo_awal_date,
        //     selisih: data.saldo_awal - data.debit,
        //   });
        // }
        transform2.push({
          heading: data.heading,
          tanggal: data.tanggal,
          debit: data.debit,
          kredit: data.kredit,
          sumber_transaksi: data.sumber_transaksi,
          no_ref: data.no_ref,
          saldo_awal: data.saldo_awal,
          saldo_awal_date: data.saldo_awal_date,
          saldo_normal: data.saldo_awal_date,
          selisih: data.kredit > 0 ? data.saldo_awal - data.debit : data.saldo_awal + data.debit,
        });
      }
    });

    // let hasil_grouping = groupBy(transform, "heading");
    let hasil_grouping2 = groupBy(transform2, "heading");

    // let total_debit = sumBy(transform, "debit");
    // let total_kredit = sumBy(transform, "kredit");
    let total_debit = sumBy(transform2, "debit");
    let total_kredit = sumBy(transform2, "kredit");

    // for (const [key, value] of Object.entries(hasil_grouping)) {
    //   result.push({
    //     label: key,
    //     data: value,
    //   });
    // }

    for (const [key, value] of Object.entries(hasil_grouping2)) {
      result2.push({
        label: key,
        data: value,
      });
    }

    res.status(201).json({ data: sortBy(result2, "label"), debit: total_debit, kredit: total_kredit, result2 });
  } catch (error) {
    res.status(400).json({ data: "JURNAL UMUM NOT FOUND!", error });
    console.log(error);
  }
};
