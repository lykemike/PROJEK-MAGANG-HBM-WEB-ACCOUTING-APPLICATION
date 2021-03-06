import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getJurnal = async (tgl_awal, tgl_akhir) => {
  return await prisma.$queryRaw`SELECT b.nama_akun,b.kode_akun,TO_DATE(a.date,'YYYY-MM-DD') as tanggal, a.debit,a.kredit,a.sumber_transaksi, a.no_ref FROM "LaporanTransaksi" a
                                    INNER JOIN "Akun" b ON b.id = a.akun_id

                                    WHERE TO_DATE(a.date,'YYYY-M-DD') BETWEEN ${new Date(tgl_awal)} AND ${new Date(tgl_akhir)}

                                    ORDER BY a.kredit, a.debit ASC`;
};

export const getBukuBesar = async (tgl_awal, tgl_akhir) => {
  return await prisma.$queryRaw`SELECT a.nama_akun,a.kode_akun,d.debit as saldo_debit, d.kredit as saldo_kredit,l.* FROM "LaporanTransaksi" l

    INNER JOIN "Akun" a ON a.id = l.akun_id
    INNER JOIN "DetailSaldoAwal" as d ON d.akun_id = a.id 
    
    WHERE TO_DATE(l.date,'YYYY-M-DD') BETWEEN ${new Date(tgl_awal)} AND ${new Date(tgl_akhir)}
    `;
};

export const getJurnalPrisma = async (tgl_awal, tgl_akhir) => {
  let transform = [];
  const get_selected_data = await prisma.laporanTransaksi.findMany({
    where: {
      date: {
        gte: tgl_awal,
        lte: tgl_akhir,
      },
    },
    include: {
      akun: {
        select: {
          nama_akun: true,
          kode_akun: true,
        },
      },
    },
  });

  get_selected_data?.map((data) => {
    transform.push({
      heading: data.sumber_transaksi + " #" + data.no_ref + " || " + data.date,
      nama_akun: data.akun.nama_akun,
      kode_akun: data.akun.kode_akun,
      tanggal: data.date,
      debit: data.debit,
      kredit: data.kredit,
      sumber_transaksi: data.sumber_transaksi,
      no_ref: data.no_ref,
    });
  });

  return transform;
};

export const getBukuBesarPrisma = async (tgl_awal, tgl_akhir) => {
  let transform = [];
  const get_selected_data = await prisma.laporanTransaksi.findMany({
    where: {
      date: {
        gte: tgl_awal,
        lte: tgl_akhir,
      },
    },
    include: {
      akun: {
        select: {
          nama_akun: true,
          kode_akun: true,
          kategori_akun: {
            select: {
              saldo_normal_nama: true,
            },
          },
          DetailSaldoAwal: {
            include: {
              header_saldo_awal: true,
            },
          },
        },
      },
    },
  });

  get_selected_data?.map((data) => {
    transform.push({
      heading: data.akun.nama_akun + ": " + data.akun.kode_akun,
      tanggal: data.date,
      debit: data.debit,
      kredit: data.kredit,
      sumber_transaksi: data.sumber_transaksi,
      no_ref: data.no_ref,
      saldo_awal: data.akun.DetailSaldoAwal[0].debit == 0 ? data.akun.DetailSaldoAwal[0].kredit : data.akun.DetailSaldoAwal[0].debit,
      saldo_awal_date: data.akun.DetailSaldoAwal[0].header_saldo_awal.tgl_konversi,
      saldo_normal: data.akun.kategori_akun.saldo_normal_nama,
    });
  });

  return transform;
};

export const getTrialBalancePrisma = async (tgl_awal, tgl_akhir) => {
  let transform = [];

  const get_selected_data = await prisma.laporanTransaksi.findMany({
    where: {
      date: {
        gte: tgl_awal,
        lte: tgl_akhir,
      },
    },
    include: {
      kategori: true,
      akun: {
        select: {
          nama_akun: true,
          kode_akun: true,
          kategori_akun: {
            select: {
              saldo_normal_nama: true,
            },
          },
          DetailSaldoAwal: {
            include: {
              header_saldo_awal: true,
            },
          },
        },
      },
    },
  });

  get_selected_data?.map((data) => {
    transform.push({
      heading: "(" + data.akun.kode_akun + ") - " + data.akun.nama_akun,
      tanggal: data.date,
      debit: data.debit,
      kredit: data.kredit,
      kategori_id: data.kategori.id,
      saldo_awal_debit: data.akun.DetailSaldoAwal[0].debit > 0 ? data.akun.DetailSaldoAwal[0].debit : 0,
      saldo_awal_kredit: data.akun.DetailSaldoAwal[0].kredit > 0 ? data.akun.DetailSaldoAwal[0].kredit : 0,
      saldo_normal: data.akun.kategori_akun.saldo_normal_nama,
    });
  });

  return transform;
};

export const getNeracaPrisma = async (tgl_awal, tgl_akhir) => {
  let transform = [];

  const get_selected_data = await prisma.laporanTransaksi.findMany({
    where: {
      date: {
        gte: tgl_awal,
        lte: tgl_akhir,
      },
    },
    include: {
      kategori: true,
      akun: {
        select: {
          nama_akun: true,
          kode_akun: true,
          kategori_akun: {
            select: {
              saldo_normal_nama: true,
            },
          },
          DetailSaldoAwal: {
            include: {
              header_saldo_awal: true,
            },
          },
        },
      },
    },
  });

  get_selected_data?.map((data) => {
    transform.push({
      heading: "(" + data.akun.kode_akun + ") - " + data.akun.nama_akun,
      tanggal: data.date,
      debit: data.debit,
      kredit: data.kredit,
      kategori_id: data.kategori.id,
      saldo_awal_debit: data.akun.DetailSaldoAwal[0].debit > 0 ? data.akun.DetailSaldoAwal[0].debit : 0,
      saldo_awal_kredit: data.akun.DetailSaldoAwal[0].kredit > 0 ? data.akun.DetailSaldoAwal[0].kredit : 0,
      saldo_normal: data.akun.kategori_akun.saldo_normal_nama,
    });
  });

  return transform;
};

export const getLabaRugiPrisma = async (tgl_awal, tgl_akhir) => {
  let transform = [];

  const get_selected_data = await prisma.laporanTransaksi.findMany({
    where: {
      date: {
        gte: tgl_awal,
        lte: tgl_akhir,
      },
    },
    include: {
      kategori: true,
      akun: {
        select: {
          nama_akun: true,
          kode_akun: true,
          kategori_akun: true,
          DetailSaldoAwal: {
            include: {
              header_saldo_awal: true,
            },
          },
        },
      },
    },
  });

  get_selected_data?.map((data) => {
    transform.push({
      heading: "(" + data.akun.kode_akun + ") - " + data.akun.nama_akun,
      tanggal: data.date,
      debit: data.debit,
      kredit: data.kredit,
      kategori_id: data.kategori.id,
      saldo_normal: data.akun.kategori_akun.saldo_normal_nama,
      nominal_pajak: data.nominal_pajak,
    });
  });

  return transform;
};

export const getArusKasPrisma = async (tgl_awal, tgl_akhir) => {
  let transform = [];

  const get_selected_data = await prisma.laporanTransaksi.findMany({
    where: {
      date: {
        gte: tgl_awal,
        lte: tgl_akhir,
      },
    },
    include: {
      kategori: true,
      akun: {
        select: {
          nama_akun: true,
          kode_akun: true,
          kategori_akun: true,
          DetailSaldoAwal: {
            include: {
              header_saldo_awal: true,
            },
          },
        },
      },
    },
  });

  get_selected_data?.map((data) => {
    transform.push({
      heading: "(" + data.akun.kode_akun + ") - " + data.akun.nama_akun,
      tanggal: data.date,
      debit: data.debit,
      kredit: data.kredit,
      kategori_id: data.kategori.id,
      saldo_normal: data.akun.kategori_akun.saldo_normal_nama,
      nominal_pajak: data.nominal_pajak,
      saldo_awal: data.akun.DetailSaldoAwal[0].debit > 0 ? data.akun.DetailSaldoAwal[0].debit : 0,
    });
  });
  //test
  return transform;
};

export const getsaldoawal = async () => {
  let saldo_awal = [];
  const get_saldo_awal = await prisma.akun.findMany({
    where: { kategoriId: 3 },
    include: {
      DetailSaldoAwal: true,
    },
  });

  get_saldo_awal?.map((i) => {
    saldo_awal.push({
      akun_id: i.id,
      saldo_awal: i.DetailSaldoAwal.length == [] ? 0 : i.DetailSaldoAwal[0].debit,
    });
  });

  return saldo_awal;
};

export const getDividen = async () => {
  let dividen = [];
  const get_dividen = await prisma.akun.findMany({
    where: {
      kategoriId: 12,
      nama_akun: "Dividen",
    },
    include: {
      LaporanTransaksi: {
        where: {
          kategori_id: 12,
          akun_id: 117,
        },
      },
    },
  });

  get_dividen?.map((i) => {
    dividen.push({
      ...i,
    });
  });

  return dividen;
};

export const getModal = async () => {
  let modal = [];

  const get_modal = await prisma.akun.findMany({
    where: {
      nama_akun: {
        startsWith: "Modal",
      },
    },
    include: {
      DetailSaldoAwal: true,
      PemegangSahamModal: true,
      LaporanTransaksi: true,
    },
  });

  get_modal?.map((i) => {
    modal.push({
      ...i,
    });
  });

  return modal;
};
