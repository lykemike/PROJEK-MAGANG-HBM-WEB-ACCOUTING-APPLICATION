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

    let transform = buku_besar;
    let result = [];

    let hasil_grouping = groupBy(transform, "heading");
    let total_debit = sumBy(transform, "debit");
    let total_kredit = sumBy(transform, "kredit");

    for (const [key, value] of Object.entries(hasil_grouping)) {
      result.push({
        label: key,
        data: value,
      });
    }

    res.status(200).json({ data: sortBy(result, "label"), debit: total_debit, kredit: total_kredit });
  } catch (error) {
    res.status(400).json({ data: "JURNAL UMUM NOT FOUND!", error });
    console.log(error);
  }
};

//testing
