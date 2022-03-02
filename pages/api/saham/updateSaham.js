import { PrismaClient } from ".prisma/client";
import { groupBy, sortBy, sum, sumBy, merge, union, mapValues } from "lodash";
import { getNeracaPrisma } from "../../../utils";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    let detail = [];
    req.body.sahams.map((i) => {
      detail.push({
        id: parseInt(i.id),
        nama: i.nama,
        akun_modal_id: parseInt(i.akun_modal_id),
        akun_prive_id: i.akun_prive_id == null ? null : parseInt(i.akun_prive_id),
        presentase: parseInt(i.presentase),
      });
    });

    let sahamId = detail?.map((i) => i.id);

    for (let index = 0; index < detail.length; index++) {
      const update = await prisma.pemegangSaham.update({
        where: {
          id: sahamId[index],
        },
        data: detail[index],
      });
    }
    res.status(201).json({ message: "Update Modal Success!", detail });
  } catch (error) {
    res.status(400).json({ data: "Update Modal Failed!", error });
    console.log(error);
  }
};
