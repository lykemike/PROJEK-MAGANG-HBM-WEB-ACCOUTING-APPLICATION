import multer from "multer";
import { extname } from "path";
import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();
import _ from "lodash";
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split(".")[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");
  callback(null, `${name}-${randomName}${fileExtName}`);
};

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: editFileName,
  }),
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async (req, res) => {
  await runMiddleware(req, res, upload.single("file"));
  try {
    // get date from input, then split into DD:MM:YYYY
    const confirm_date = req.body.tgl_transaksi;
    const day = confirm_date.split("-")[2];
    const month = confirm_date.split("-")[1];
    const year = confirm_date.split("-")[0];

    // get current timestamp 25 hour format
    const today = new Date();
    const current_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // get data from front end
    const frontend_data = {
      akun_id: parseInt(req.body.akun_id),
      kategori_id: 3,
      tgl_transaksi: req.body.tgl_transaksi,
      hari: parseInt(day),
      bulan: parseInt(month),
      tahun: parseInt(year),
      cara_pembayaran_id: parseInt(req.body.cara_pembayaran_id),
      harga_termasuk_pajak: req.body.harga_termasuk_pajak,
      pajak_masukan_total: parseInt(req.body.pajak_masukan_total),
      pajak_keluaran_total: parseInt(req.body.pajak_keluaran_total),
      memo: req.body.memo,
      file_attachment: req.file == undefined ? "-" : req.file.filename,
      subtotal: parseInt(req.body.subtotal),
      total: parseInt(req.body.total),
    };

    // find detail saldo awal
    const find_saldo_skrg = await prisma.detailSaldoAwal.findFirst({
      where: {
        akun_id: frontend_data.akun_id,
      },
    });

    //
    const update_kas = await prisma.detailSaldoAwal.update({
      where: {
        akun_id: frontend_data.akun_id,
      },
      data: {
        sisa_saldo: find_saldo_skrg.sisa_saldo - parseInt(req.body.total),
      },
    });

    const create_header_biaya = await prisma.headerBiaya.createMany({
      data: [frontend_data],
      skipDuplicates: true,
    });

    // get latest id by sorting in "DESC" than getting the first data
    const find_latest = await prisma.headerBiaya.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    let termasuk_pajak = req.body.harga_termasuk_pajak;

    let detail = [];
    JSON.parse(req.body.detail_biaya).map((i) => {
      detail.push({
        header_biaya_id: find_latest.id,
        akun_id: parseInt(i.akun_id),
        kategori_id: parseInt(i.kategori_id),
        akun_nama: i.akun_nama,
        deskripsi: i.deskripsi,

        pajak_id: i.pajak_id == "" ? null : parseInt(i.pajak_id),

        pajak_masukan_id: i.pajak_masukan_id == "" ? null : parseInt(i.pajak_masukan_id),
        kategori_id_masukan: i.kategori_id_masukan == "" ? null : parseInt(i.kategori_id_masukan),
        pajak_masukan_nama: i.pajak_masukan_nama == "" ? "-" : i.pajak_masukan_nama,
        pajak_masukan_persen: i.pajak_masukan_persen == "" ? 0 : parseInt(i.pajak_masukan_persen),
        pajak_masukan_per_baris: i.pajak_masukan_per_baris == "" ? 0 : parseInt(i.pajak_masukan_per_baris),

        pajak_keluaran_id: i.pajak_keluaran_id == "" ? null : parseInt(i.pajak_keluaran_id),
        kategori_id_keluaran: i.kategori_id_keluaran == "" ? null : parseInt(i.kategori_id_keluaran),
        pajak_keluaran_nama: i.pajak_keluaran_nama == "" ? "-" : i.pajak_keluaran_nama,
        pajak_keluaran_persen: i.pajak_keluaran_persen == "" ? 0 : parseInt(i.pajak_keluaran_persen),
        pajak_keluaran_per_baris: i.pajak_keluaran_per_baris == "" ? 0 : parseInt(i.pajak_keluaran_per_baris),

        jumlah: parseInt(i.jumlah),
        termasuk_jumlah: parseInt(i.termasuk_jumlah),
        termasuk_pajak_masukan: parseInt(i.termasuk_pajak_masukan),
        termasuk_pajak_keluaran: parseInt(i.termasuk_pajak_keluaran),
      });
    });

    const create_detail_biaya = await prisma.detailBiaya.createMany({
      data: detail,
    });

    if (termasuk_pajak == "false") {
      let jurnal_akun_debit = [];
      detail.map((i) => {
        jurnal_akun_debit.push({
          header_biaya_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.jumlah),
          tipe_saldo: "Debit",
        });
      });

      let jurnal_pajak_masukan = [];
      detail.map((i) => {
        jurnal_pajak_masukan.push({
          header_biaya_id: find_latest.id,
          akun_id: i.pajak_masukan_id == null ? null : parseInt(i.pajak_masukan_id),
          nominal: i.pajak_masukan_per_baris == 0 ? 0 : parseInt(i.pajak_masukan_per_baris),
          tipe_saldo: "Debit",
        });
      });

      let jurnal_pajak_keluaran = [];
      detail.map((i) => {
        jurnal_pajak_keluaran.push({
          header_biaya_id: find_latest.id,
          akun_id: i.pajak_keluaran_id == null ? null : parseInt(i.pajak_keluaran_id),
          nominal: i.pajak_keluaran_per_baris == 0 ? 0 : parseInt(i.pajak_keluaran_per_baris),
          tipe_saldo: "Kredit",
        });
      });

      // insert data to jurnal biaya table
      const create_jurnal_1 = await prisma.jurnalBiaya.createMany({
        data: jurnal_akun_debit,
      });

      const create_jurnal_2 = await prisma.jurnalBiaya.createMany({
        data: jurnal_pajak_masukan,
      });

      const create_jurnal_3 = await prisma.jurnalBiaya.createMany({
        data: jurnal_pajak_keluaran,
      });

      const create_jurnal_4 = await prisma.jurnalBiaya.createMany({
        data: {
          header_biaya_id: find_latest.id,
          akun_id: parseInt(req.body.akun_id),
          nominal: parseInt(req.body.total),
          tipe_saldo: "Kredit",
        },
      });

      // push data to laporan transaksi
      let laporan_transaksi = [];
      req.body.detail_biaya &&
        JSON.parse(req.body.detail_biaya).map((i) => {
          laporan_transaksi.push({
            akun_id: parseInt(i.akun_id),
            kategori_id: parseInt(i.kategori_id),
            timestamp: current_time,
            date: req.body.tgl_transaksi,
            hari: parseInt(day),
            bulan: parseInt(month),
            tahun: parseInt(year),
            debit: parseInt(i.jumlah),
            kredit: 0,
            sumber_transaksi: "Biaya",
            no_ref: find_latest.id,
            delete_ref_no: find_latest.id,
            delete_ref_name: "Expense",
          });
        });

      // push data pajak masukan to laporan transaksi
      let laporan_transaksi_pajak_masukan = [];
      req.body.detail_biaya &&
        JSON.parse(req.body.detail_biaya).map((i) => {
          if (i.kategori_id_masukan == "") {
          } else {
            laporan_transaksi_pajak_masukan.push({
              akun_id: i.pajak_masukan_id,
              kategori_id: parseInt(i.kategori_id_masukan),
              timestamp: current_time,
              date: req.body.tgl_transaksi,
              hari: parseInt(day),
              bulan: parseInt(month),
              tahun: parseInt(year),
              debit: parseInt(i.pajak_masukan_per_baris),
              kredit: 0,
              sumber_transaksi: "Biaya",
              no_ref: find_latest.id,
              delete_ref_no: find_latest.id,
              delete_ref_name: "Expense",
            });
          }
        });

      // push data pajak keluaran to laporan transaksi
      let laporan_transaksi_pajak_keluaran = [];
      req.body.detail_biaya &&
        JSON.parse(req.body.detail_biaya).map((i) => {
          if (i.kategori_id_keluaran == "") {
          } else {
            laporan_transaksi_pajak_keluaran.push({
              akun_id: i.pajak_keluaran_id,
              kategori_id: parseInt(i.kategori_id_keluaran),
              timestamp: current_time,
              date: req.body.tgl_transaksi,
              hari: parseInt(day),
              bulan: parseInt(month),
              tahun: parseInt(year),
              debit: 0,
              kredit: parseInt(i.pajak_keluaran_per_baris),
              sumber_transaksi: "Biaya",
              no_ref: find_latest.id,
              delete_ref_no: find_latest.id,
              delete_ref_name: "Expense",
            });
          }
        });

      // push data to laporan transaksi kredit
      let laporan_transaksi_kredit = [];
      laporan_transaksi_kredit.push({
        akun_id: parseInt(req.body.akun_id),
        kategori_id: 3,
        timestamp: current_time,
        date: req.body.tgl_transaksi,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: 0,
        kredit: parseInt(req.body.total),
        sumber_transaksi: "Biaya",
        no_ref: find_latest.id,
        delete_ref_no: find_latest.id,
        delete_ref_name: "Expense",
      });

      // insert data to laporan transaksi table
      const create_laporan_transaksi_1 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi,
      });

      const create_laporan_transaksi_2 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi_pajak_masukan,
      });

      const create_laporan_transaksi_3 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi_pajak_keluaran,
      });

      const create_laporan_transaksi_4 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi_kredit,
      });
    } else {
      let jurnal_akun_debit = [];
      detail.map((i) => {
        jurnal_akun_debit.push({
          header_biaya_id: find_latest.id,
          akun_id: parseInt(i.akun_id),
          nominal: parseInt(i.termasuk_jumlah),
          tipe_saldo: "Debit",
        });
      });

      let jurnal_pajak_masukan = [];
      detail.map((i) => {
        jurnal_pajak_masukan.push({
          header_biaya_id: find_latest.id,
          akun_id: i.pajak_masukan_id == null ? null : parseInt(i.pajak_masukan_id),
          nominal: i.termasuk_pajak_masukan == 0 ? 0 : parseInt(i.termasuk_pajak_masukan),
          tipe_saldo: "Debit",
        });
      });

      let jurnal_pajak_keluaran = [];
      detail.map((i) => {
        jurnal_pajak_keluaran.push({
          header_biaya_id: find_latest.id,
          akun_id: i.pajak_keluaran_id == null ? null : parseInt(i.pajak_keluaran_id),
          nominal: i.termasuk_pajak_keluaran == 0 ? 0 : parseInt(i.termasuk_pajak_keluaran),
          tipe_saldo: "Kredit",
        });
      });

      // insert data to table jurnal
      const create_jurnal_1 = await prisma.jurnalBiaya.createMany({
        data: jurnal_akun_debit,
      });

      const create_jurnal_2 = await prisma.jurnalBiaya.createMany({
        data: jurnal_pajak_masukan,
      });

      const create_jurnal_3 = await prisma.jurnalBiaya.createMany({
        data: jurnal_pajak_keluaran,
      });

      const create_jurnal_4 = await prisma.jurnalBiaya.createMany({
        data: {
          header_biaya_id: find_latest.id,
          akun_id: parseInt(req.body.akun_id),
          nominal: parseInt(req.body.total),
          tipe_saldo: "Kredit",
        },
      });

      // push data to laporan transaksi
      let laporan_transaksi = [];
      req.body.detail_biaya &&
        JSON.parse(req.body.detail_biaya).map((i) => {
          laporan_transaksi.push({
            akun_id: parseInt(i.akun_id),
            kategori_id: parseInt(i.kategori_id),
            timestamp: current_time,
            date: req.body.tgl_transaksi,
            hari: parseInt(day),
            bulan: parseInt(month),
            tahun: parseInt(year),
            debit: parseInt(i.jumlah),
            kredit: 0,
            sumber_transaksi: "Biaya",
            no_ref: find_latest.id,
            delete_ref_no: find_latest.id,
            delete_ref_name: "Expense",
          });
        });

      // push data pajak masukan to laporan transaksi
      let laporan_transaksi_pajak_masukan = [];
      req.body.detail_biaya &&
        JSON.parse(req.body.detail_biaya).map((i) => {
          if (i.kategori_id_masukan == "") {
          } else {
            laporan_transaksi_pajak_masukan.push({
              akun_id: i.pajak_masukan_id,
              kategori_id: parseInt(i.kategori_id_masukan),
              timestamp: current_time,
              date: req.body.tgl_transaksi,
              hari: parseInt(day),
              bulan: parseInt(month),
              tahun: parseInt(year),
              debit: parseInt(i.pajak_masukan_per_baris),
              kredit: 0,
              sumber_transaksi: "Biaya",
              no_ref: find_latest.id,
              delete_ref_no: find_latest.id,
              delete_ref_name: "Expense",
            });
          }
        });

      // push data pajak keluaran to laporan transaksi
      let laporan_transaksi_pajak_keluaran = [];
      req.body.detail_biaya &&
        JSON.parse(req.body.detail_biaya).map((i) => {
          if (i.kategori_id_keluaran == "") {
          } else {
            laporan_transaksi_pajak_keluaran.push({
              akun_id: i.pajak_keluaran_id,
              kategori_id: parseInt(i.kategori_id_keluaran),
              timestamp: current_time,
              date: req.body.tgl_transaksi,
              hari: parseInt(day),
              bulan: parseInt(month),
              tahun: parseInt(year),
              debit: 0,
              kredit: parseInt(i.pajak_keluaran_per_baris),
              sumber_transaksi: "Biaya",
              no_ref: find_latest.id,
              delete_ref_no: find_latest.id,
              delete_ref_name: "Expense",
            });
          }
        });

      // push data to laporan transaksi kredit
      let laporan_transaksi_kredit = [];
      laporan_transaksi_kredit.push({
        akun_id: parseInt(req.body.akun_id),
        kategori_id: 3,
        timestamp: current_time,
        date: req.body.tgl_transaksi,
        hari: parseInt(day),
        bulan: parseInt(month),
        tahun: parseInt(year),
        debit: 0,
        kredit: parseInt(req.body.total),
        sumber_transaksi: "Biaya",
        no_ref: find_latest.id,
        delete_ref_no: find_latest.id,
        delete_ref_name: "Expense",
      });

      // insert data to laporan transaksi table
      const create_laporan_transaksi_1 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi,
      });

      const create_laporan_transaksi_2 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi_pajak_masukan,
      });

      const create_laporan_transaksi_3 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi_pajak_keluaran,
      });

      const create_laporan_transaksi_4 = await prisma.laporanTransaksi.createMany({
        data: laporan_transaksi_kredit,
      });
    }

    res.status(201).json({
      message: "Create biaya success!",
      id: find_latest,
    });
  } catch (error) {
    res.status(400).json({ data: "Failed to create detail biaya!", error });
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
