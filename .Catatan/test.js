const getSelisih = () => {
  let akhir = [];
  data.forEach((z, indexLabel) => {
    let obj = { label: z.label };
    let temp = [];
    let saldo_awal = 0;
    z.value.map((j, index) => {
      if (index > 0) {
        if (j.saldo_normal === "Debit") {
          saldo_awal = saldo_awal + j.debit - j.kredit;
        }
        if (j.saldo_normal === "Kredit") {
          saldo_awal = saldo_awal + j.kredit - j.debit;
        }
        temp.push({
          ...j,
          selisih: saldo_awal,
        });
      } else {
        if (j.saldo_normal === "Debit") {
          saldo_awal = z.value[0].debit + z.value[0].saldo_awal - z.value[0].kredit;
        }
        if (j.saldo_normal === "Kredit") {
          saldo_awal = z.value[0].kredit + z.value[0].saldo_awal - z.value[0].debit;
        }
        temp.push({
          ...j,
          selisih: saldo_awal,
        });
      }
    });
    saldo_awal = 0;
    akhir.push({ ...obj, value: temp });
  });

  return akhir;
};
