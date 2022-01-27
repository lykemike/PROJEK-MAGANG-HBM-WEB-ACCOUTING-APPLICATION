import { PrismaClient } from ".prisma/client";
import { data } from "autoprefixer";
import { groupBy, sortBy, sum, sumBy } from "lodash";
import { getJurnal } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const getJournal = await getJurnal("2022-1-1", "2022-1-28");
    let transform = [];
    let result = [];

    getJournal?.map((data) => {
      transform.push({
        ...data,
        heading: `${data.sumber_transaksi}#${data.no_ref}||${data.tanggal}`,
      });
    });

    let hasil_grouping = groupBy(transform, "heading");
    let total_debit = sumBy(transform, "debit");
    let total_kredit = sumBy(transform, "kredit");

    for (const [key, value] of Object.entries(hasil_grouping)) {
      result.push({
        label: key,
        data: value,
      });
    }

    res
      .status(200)
      .json({
        data: sortBy(result, "label"),
        debit: total_debit,
        kredit: total_kredit,
      });
  } catch (error) {
    res.status(400).json({ data: "JURNAL UMUM NOT FOUND!", error });
    console.log(error);
  }
};

//testing
