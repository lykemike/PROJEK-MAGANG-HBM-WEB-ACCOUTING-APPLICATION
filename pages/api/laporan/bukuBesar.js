import { PrismaClient } from ".prisma/client";
import { groupBy } from "lodash";
import { getBukuBesar } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const buku_besar = await getBukuBesar("2022-1-1", "2022-1-28");
    let result = [];

    let hasil_grouping = groupBy(buku_besar, "nama_akun");

    for (const [key, value] of Object.entries(hasil_grouping)) {
      result.push({
        label: key,
        source: value,
      });
    }

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ data: "JURNAL UMUM NOT FOUND!", error });
    console.log(error);
  }
};

//testing
