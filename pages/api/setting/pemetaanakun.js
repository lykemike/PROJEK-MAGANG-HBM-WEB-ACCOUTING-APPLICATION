import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  try {

    const frontend_data = {
        
    }

    res.status(201).json(

      { message: "Pemetaan akun successfully saved!", data: update }
    );
  } catch (error) {
    res
      .status(400)
      .json(
        { data: "Failed to save pemetaan akun!", error },
      );
    console.log(error);
  }
};
