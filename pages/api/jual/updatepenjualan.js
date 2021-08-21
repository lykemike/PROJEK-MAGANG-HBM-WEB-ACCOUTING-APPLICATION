import multer from "multer";
import { extname } from "path";
import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

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
    const frontend_data = {
      kontak_id: parseInt(req.body.nama_supplier),
      nama_supplier: req.body.nama_supplier,
      email: req.body.email,
      alamat_supplier: req.body.alamat_supplier,
      tgl_transaksi: req.body.tgl_transaksi,
      tgl_jatuh_tempo: req.body.tgl_jatuh_tempo,
      syarat_pembayaran: String(req.body.syarat_pembayaran),
      no_ref_penagihan: req.body.no_ref_penagihan,
      no_transaksi: parseInt(req.body.no_transaksi),
      tag: req.body.tag,
      pesan: req.body.pesan,
      memo: req.body.memo,
      file_attachment: "req.file.filename",
      subtotal: parseInt(req.body.subtotal),
      total_diskon_per_baris: parseInt(req.body.total_diskon_per_baris),
      diskon: parseInt(req.body.diskon),
      total_diskon: parseInt(req.body.total_diskon),
      total_pajak_per_baris: parseInt(req.body.total_pajak_per_baris),
      total: parseInt(req.body.total),
      pemotongan: parseInt(req.body.pemotongan),
      pemotongan_total: parseInt(req.body.pemotongan_total),
      akun_pemotongan: parseInt(req.body.akun_pemotongan),
      uang_muka: parseInt(req.body.uang_muka),
      akun_uang_muka: parseInt(req.body.akun_uang_muka),
      sisa_tagihan: parseInt(req.body.sisa_tagihan),
      balance: parseInt(req.body.balance),
      status: "Active",
    };

    const update_header_penjualan = await prisma.headerPenjualan.update({
      where: {
        id: parseInt(req.body.no_transaksi)
      },
      data: frontend_data
    })

    const delete_old_detail = await prisma.detailPenjualan.deleteMany({
      where: {
        header_penjualan_id: parseInt(req.body.no_transaksi)
      }
    })

    const delete_old_jurnal = await prisma.jurnalPenjualan.deleteMany({
      where: {
        header_penjualan_id: parseInt(req.body.no_transaksi)
      }
    })

    const get_setting_penjualan = await prisma.settingDefault.findMany({
      where: {
        tipe: "penjualan",
      },
      include: {
        akun: true,
      },
    });

    const setting_pembayaran_dimuka = get_setting_penjualan.filter((i) => i.nama_setting === "pembayaran_dimuka");
    const setting_piutang_blm_ditagih = get_setting_penjualan.filter((i) => i.nama_setting === "piutang_blm_ditagih");
    const setting_diskon_penjualan = get_setting_penjualan.filter((i) => i.nama_setting === "diskon_penjualan");
    const setting_pemotongan = get_setting_penjualan.filter((i) => i.nama_setting === "pemotongan");
    const setting_pajak_penjualan = get_setting_penjualan.filter((i) => i.nama_setting === "pajak_penjualan");
    const setting_pendapatan_penjualan = get_setting_penjualan.filter((i) => i.nama_setting === "pendapatan_penjualan");
    const total_diskon = parseInt(req.body.total_diskon_per_baris) + parseInt(req.body.total_diskon);

    let detail = [];
    req.body.produks &&
      JSON.parse(req.body.produks).map((i) => {
        if (parseInt(i.hasil_pajak) == 0) {
          detail.push({
            header_penjualan_id: parseInt(req.body.no_transaksi),
            produk_id: parseInt(i.produk_id),
            nama_produk: i.nama_produk,
            desk_produk: i.deskripsi_produk,
            kuantitas: parseInt(i.kuantitas),
            satuan: i.satuan,
            harga_satuan: parseInt(i.harga_satuan),
            diskon: parseInt(i.diskon),
            hasil_diskon: parseInt(i.hasil_diskon),
            pajak_id: 1,
            pajak_nama: "KOSONG",
            pajak_persen: 0,
            hasil_pajak: 0,
            jumlah: parseInt(i.jumlah),
            pajak_nama_akun_jual: setting_pajak_penjualan[0].akun.nama_akun,
          });
        } else {
          detail.push({
            header_penjualan_id: parseInt(req.body.no_transaksi),
            produk_id: parseInt(i.produk_id),
            nama_produk: i.nama_produk,
            desk_produk: i.deskripsi_produk,
            kuantitas: parseInt(i.kuantitas),
            satuan: i.satuan,
            harga_satuan: parseInt(i.harga_satuan),
            diskon: parseInt(i.diskon),
            hasil_diskon: parseInt(i.hasil_diskon),
            pajak_id: parseInt(i.pajak_id),
            pajak_nama: i.pajak_nama,
            pajak_persen: parseInt(i.pajak_persen),
            hasil_pajak: parseInt(i.hasil_pajak),
            jumlah: parseInt(i.jumlah),
            pajak_nama_akun_jual: i.pajak_nama_akun_jual,
          });
        }
      });

      const create_detail_penjualan = await prisma.detailPenjualan.createMany({
        data: detail,
      });

      let list_pajak = [];
      detail.map((i) => {
        if (i.nama_pajak == "" || i.hasil_pajak == 0) {
          list_pajak.push({
            header_penjualan_id: parseInt(req.body.no_transaksi),
            nama_akun: setting_pajak_penjualan[0].akun.nama_akun,
            nominal: 0,
            tipe_saldo: "Kredit",
          });
        } else {
          list_pajak.push({
            header_penjualan_id: parseInt(req.body.no_transaksi),
            nama_akun: i.pajak_nama_akun_jual,
            nominal: parseInt(i.hasil_pajak),
            tipe_saldo: "Kredit",
        });
      }
    });

    const akunUangMuka = await prisma.akun.findMany({
      where: {
        id: parseInt(req.body.akun_uang_muka),
      },
    });

    const akunPemotongan = await prisma.akun.findMany({
      where: {
        id: parseInt(req.body.akun_pemotongan),
      },
    });

    const pembayaran_di_muka = parseInt(req.body.uang_muka) >= 0 ? akunUangMuka[0].nama_akun : akunUangMuka[0].nama_akun;
    const piutang_blm_ditagih =
      parseInt(req.body.sisa_tagihan) >= 0 ? setting_piutang_blm_ditagih[0].akun.nama_akun : setting_piutang_blm_ditagih[0].akun.nama_akun;
    const nilai_diskon_penjualan =
      parseInt(total_diskon) >= 0 ? setting_diskon_penjualan[0].akun.nama_akun : setting_diskon_penjualan[0].akun.nama_akun;
    const pemotongan = parseInt(req.body.pemotongan) >= 0 ? akunPemotongan[0].nama_akun : akunPemotongan[0].nama_akun;
    const pendapatan_penjualan =
      parseInt(req.body.subtotal) >= 0 ? setting_pendapatan_penjualan[0].akun.nama_akun : setting_pendapatan_penjualan[0].akun.nama_akun;

    const create_jurnal_penjualan = await prisma.jurnalPenjualan.createMany({
      data: [
        {
          header_penjualan_id: parseInt(req.body.no_transaksi),
          nama_akun: pembayaran_di_muka,
          tipe_saldo: "Debit",
          nominal: parseInt(req.body.uang_muka),
        },
        {
          header_penjualan_id: parseInt(req.body.no_transaksi),
          nama_akun: piutang_blm_ditagih,
          tipe_saldo: "Debit",
          nominal: parseInt(req.body.sisa_tagihan),
        },
        {
          header_penjualan_id: parseInt(req.body.no_transaksi),
          nama_akun: nilai_diskon_penjualan,
          tipe_saldo: "Debit",
          nominal: parseInt(total_diskon),
        },
        {
          header_penjualan_id: parseInt(req.body.no_transaksi),
          nama_akun: pemotongan,
          tipe_saldo: "Debit",
          nominal: parseInt(req.body.pemotongan),
        },
        {
          header_penjualan_id: parseInt(req.body.no_transaksi),
          nama_akun: pendapatan_penjualan,
          tipe_saldo: "Kredit",
          nominal: parseInt(req.body.subtotal),
        },
      ],
    });

    const add_jurnal_penjualan = await prisma.jurnalPenjualan.createMany({
      data: list_pajak,
    });

    res.status(201).json([{ message: "Find produk detail success!", add_jurnal_penjualan }]);
  } catch (error) {
    res.status(400).json([{ data: "Failed!", error }]);
    console.log(error);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
