import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getJurnal = async (tgl_awal, tgl_akhir) => {
  return await prisma.$queryRaw`SELECT b.nama_akun,b.kode_akun,TO_DATE(a.date,'YYYY-MM-DD') as tanggal, a.debit,a.kredit,a.sumber_transaksi, a.no_ref FROM "LaporanTransaksi" a
                                    INNER JOIN "Akun" b ON b.id = a.akun_id

                                    WHERE TO_DATE(a.date,'YYYY-M-DD') BETWEEN ${new Date(
                                      tgl_awal
                                    )} AND ${new Date(tgl_akhir)}

                                    -- ORDER BY TO_DATE(a.date,'YYYY-MM-DD') ASC`;
};

export const getBukuBesar = async (tgl_awal, tgl_akhir) => {
  return await prisma.$queryRaw`SELECT a.nama_akun,a.kode_akun,d.debit as saldo_debit, d.kredit as saldo_kredit,l.* FROM "LaporanTransaksi" l

    INNER JOIN "Akun" a ON a.id = l.akun_id
    INNER JOIN "DetailSaldoAwal" as d ON d.akun_id = a.id 
    
    WHERE TO_DATE(l.date,'YYYY-M-DD') BETWEEN ${new Date(
      tgl_awal
    )} AND ${new Date(tgl_akhir)}
    `;
};
