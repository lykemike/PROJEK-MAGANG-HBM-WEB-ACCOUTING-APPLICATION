import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function laporanbukubesar({ header}) {

  console.log(header)
  return (
    <div>
    </div>
  );
}

export async function getServerSideProps() {
  const header = await prisma.akun.findMany({
    orderBy: {
      kategoriId: "asc",
    },
    include: {
      JurnalPenjualan: {
        include: {
          header_penjualan: true
        }
      },
      DetailJurnal: {
        include: {
          header_jurnal: true
        }
      },
    }
  });


  return {
    props: {
      header: header,

    },
  };
}
