let pajak_id_frontend = [];
detail.map((i) => {
  pajak_id_frontend.push({
    pajak_id: parseInt(i.pajak_keluaran_id),
    nominal: i.pajak_keluaran_per_baris == "" || i.pajak_keluaran_per_baris == 0 ? 0 : parseInt(i.pajak_keluaran_per_baris),
  });
});

const find_pajak_keluaran = await prisma.pajak.findMany({
  where: {
    id: {
      in: pajak_id_frontend.map((i) => i.pajak_id),
    },
  },
  select: {
    akun_jual: true,
  },
});

const saldo_skrg_pajak_keluaran = await prisma.detailSaldoAwal.findMany({
  where: {
    akun_id: {
      in: find_pajak_keluaran.map((i) => i.akun_jual),
    },
  },
});

let merge_data = _.merge(pajak_id_frontend, saldo_skrg_pajak_keluaran);
let new_data = [];
merge_data.map((i) => {
  new_data.push({
    akun_id: i.akun_id,
    sisa_saldo: i.sisa_saldo + i.nominal,
  });
});

for (var k = 0; k < merge_data.length; k++) {
  const update = await prisma.detailSaldoAwal.updateMany({
    where: {
      akun_id: new_data[k].akun_id,
    },
    data: {
      sisa_saldo: new_data[k].sisa_saldo,
    },
  });
}
