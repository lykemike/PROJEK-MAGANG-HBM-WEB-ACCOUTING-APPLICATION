import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy } from "lodash";
import { getTrialBalancePrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const trial_balance = await getTrialBalancePrisma("01/01/2022", "31/01/2022");
    let transform = trial_balance;
    const hasil_group_aset = groupBy(transform, "kategori");

    res.status(201).json({ message: "Trial Balance data found!", trial_balance, hasil_group_aset });
  } catch (error) {
    res.status(400).json({ data: "Trial Balance data not found!", error });
    console.log(error);
  }
};
