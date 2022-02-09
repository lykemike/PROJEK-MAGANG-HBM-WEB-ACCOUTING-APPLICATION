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

    let result2 = [];

    for (const [key, value] of Object.entries(hasilNestedGrouping)) {
      result.push({
        label: key,
        data: value,
      });
    }

    for (const [key, value] of Object.entries(result)) {
      result2.push({
        label: key,
        data: value.data,
      });
    }

    res.status(201).json({ message: "Trial Balance data found!", data: result, result2 });
  } catch (error) {
    res.status(400).json({ data: "Trial Balance data not found!", error });
    console.log(error);
  }
};
