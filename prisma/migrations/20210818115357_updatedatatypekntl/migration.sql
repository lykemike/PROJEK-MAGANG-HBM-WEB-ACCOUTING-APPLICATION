-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleType` VARCHAR(50) NOT NULL,
    `roleDesc` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(20) NOT NULL,
    `lastName` VARCHAR(20) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `loggedIn` BOOLEAN NOT NULL DEFAULT false,
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolePrivellege` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,
    `value` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `saldo_normal_id` INTEGER NOT NULL,
    `saldo_normal_nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipeAkun` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Akun` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_akun` VARCHAR(191) NOT NULL,
    `tipeId` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `kategoriId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KategoriKontak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KategoriProduk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SatuanProduk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `satuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kontak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_panggilan` VARCHAR(191) NOT NULL,
    `gelar` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nomor_hp` VARCHAR(191) NOT NULL,
    `tipe_identitas` VARCHAR(191) NOT NULL,
    `nomor_identitas` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `info_lain` VARCHAR(191) NOT NULL,
    `nama_perusahaan` VARCHAR(191) NOT NULL,
    `nomor_telepon` VARCHAR(191) NOT NULL,
    `nomor_fax` VARCHAR(191) NOT NULL,
    `nomor_npwp` VARCHAR(191) NOT NULL,
    `alamat_pembayaran` VARCHAR(191) NOT NULL,
    `alamat_pengiriman` VARCHAR(191) NOT NULL,
    `nama_bank` VARCHAR(191) NOT NULL,
    `kantor_cabang_bank` VARCHAR(191) NOT NULL,
    `pemegang_akun_bank` VARCHAR(191) NOT NULL,
    `nomor_rekening` VARCHAR(191) NOT NULL,
    `akun_piutang` INTEGER NOT NULL,
    `akun_hutang` INTEGER NOT NULL,
    `syarat_pembayaran_utama` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KontakDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kontak_id` INTEGER NOT NULL,
    `kontak_type_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `kode_sku` VARCHAR(191) NOT NULL,
    `kategori_produk_id` INTEGER NOT NULL,
    `unit` INTEGER NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `harga_beli_satuan` INTEGER NOT NULL,
    `akun_pembelian` INTEGER NOT NULL,
    `harga_jual_satuan` INTEGER NOT NULL,
    `akun_penjualan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pajak` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `presentasaAktif` INTEGER NOT NULL,
    `akunPenjual` INTEGER NOT NULL,
    `akunPembeli` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderPenjualan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kontak_id` INTEGER NOT NULL,
    `nama_supplier` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `alamat_supplier` VARCHAR(191) NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `tgl_jatuh_tempo` VARCHAR(191) NOT NULL,
    `syarat_pembayaran` VARCHAR(191) NOT NULL,
    `no_ref_penagihan` VARCHAR(191) NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `file_attachment` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `total_diskon_per_baris` INTEGER NOT NULL,
    `diskon` INTEGER NOT NULL,
    `total_diskon` INTEGER NOT NULL,
    `total_pajak_per_baris` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `balance` INTEGER NOT NULL,
    `pemotongan` INTEGER NOT NULL,
    `pemotongan_total` INTEGER NOT NULL,
    `akun_pemotongan` INTEGER NOT NULL,
    `uang_muka` INTEGER NOT NULL,
    `akun_uang_muka` INTEGER NOT NULL,
    `sisa_tagihan` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
UNIQUE INDEX `HeaderPenjualan.no_transaksi_unique`(`no_transaksi`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailPenjualan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_penjualan_id` INTEGER NOT NULL,
    `produk_id` INTEGER NOT NULL,
    `nama_produk` VARCHAR(191) NOT NULL,
    `desk_produk` VARCHAR(191) NOT NULL,
    `kuantitas` INTEGER NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,
    `harga_satuan` INTEGER NOT NULL,
    `diskon` INTEGER NOT NULL,
    `hasil_diskon` INTEGER NOT NULL,
    `pajak_id` INTEGER NOT NULL,
    `pajak_nama` VARCHAR(191) NOT NULL,
    `pajak_nama_akun_jual` VARCHAR(191) NOT NULL,
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPenjualan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_penjualan_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PenerimaanPembayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_penjualan_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `cara_pembayaran` VARCHAR(191) NOT NULL,
    `tgl_pembayaran` VARCHAR(191) NOT NULL,
    `tgl_jauth_tempo` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPenerimaanPembayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_penjualan_id` INTEGER NOT NULL,
    `nama_penerimaan_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderPembelian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kontak_id` INTEGER NOT NULL,
    `nama_supplier` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `alamat_supplier` VARCHAR(191) NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `tgl_jatuh_tempo` VARCHAR(191) NOT NULL,
    `syarat_pembayaran` VARCHAR(191) NOT NULL,
    `no_ref_penagihan` INTEGER NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `file_attachment` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `total_diskon_per_baris` INTEGER NOT NULL,
    `diskon` INTEGER NOT NULL,
    `total_diskon` INTEGER NOT NULL,
    `total_pajak_per_baris` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `pemotongan` INTEGER NOT NULL,
    `pemotongan_total` INTEGER NOT NULL,
    `akun_pemotongan` INTEGER NOT NULL,
    `uang_muka` INTEGER NOT NULL,
    `akun_uang_muka` INTEGER NOT NULL,
    `sisa_tagihan` INTEGER NOT NULL,
UNIQUE INDEX `HeaderPembelian.no_transaksi_unique`(`no_transaksi`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailPembelian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pembelian_id` INTEGER NOT NULL,
    `produk_id` INTEGER NOT NULL,
    `nama_produk` VARCHAR(191) NOT NULL,
    `desk_produk` VARCHAR(191) NOT NULL,
    `kuantitas` INTEGER NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,
    `harga_satuan` INTEGER NOT NULL,
    `diskon` INTEGER NOT NULL,
    `hasil_diskon` INTEGER NOT NULL,
    `pajak_id` INTEGER NOT NULL,
    `pajak_nama` VARCHAR(191) NOT NULL,
    `pajak_nama_akun_beli` VARCHAR(191) NOT NULL,
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPembelian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pembelian_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengirimanBayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pembelian_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `cara_pembayaran` VARCHAR(191) NOT NULL,
    `tgl_pembayaran` VARCHAR(191) NOT NULL,
    `tgl_jauth_tempo` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPengirimanBayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pembelian_id` INTEGER NOT NULL,
    `nama_penerimaan_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderBiaya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_kas_bank` INTEGER NOT NULL,
    `nama_penerima` INTEGER NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `cara_pembayaran` VARCHAR(191) NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `alamat_penagihan` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `lampiran` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `pajak` INTEGER NOT NULL,
    `akun_pemotongan` INTEGER NOT NULL,
    `pemotongan` INTEGER NOT NULL,
    `jumlah_pemotongan` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
UNIQUE INDEX `HeaderBiaya.no_transaksi_unique`(`no_transaksi`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailBiaya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_biaya_id` INTEGER NOT NULL,
    `akun_biaya_id` INTEGER NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `pajak_id` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalBiaya` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_biaya_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SettingDefault` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_id` INTEGER NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,
    `nama_setting` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransferUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_transfer_id` INTEGER NOT NULL,
    `akun_setor_id` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalTransferUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transfer_uang_id` INTEGER NOT NULL,
    `nama_transfer_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderTerimaUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_setor_id` INTEGER NOT NULL,
    `akun_membayar_id` INTEGER NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `file_attachment` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `pajak` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailTerimaUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_terima_uang_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `pajak_id` INTEGER NOT NULL,
    `pajak_nama` VARCHAR(191) NOT NULL,
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `pajak_nama_akun_jual` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalTerimaUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_terima_uang_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderKirimUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_bayar_id` INTEGER NOT NULL,
    `akun_penerima_id` INTEGER NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `file_attachment` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `pajak` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailKirimUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_kirim_uang_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `pajak_id` INTEGER,
    `pajak_nama` VARCHAR(191) NOT NULL,
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `pajak_nama_akun_beli` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalKirimUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_kirim_uang_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderJurnal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `no_transaksi` INTEGER NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `total_debit` INTEGER NOT NULL,
    `total_kredit` INTEGER NOT NULL,
    `lampiran` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailJurnal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_jurnal_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `debit` INTEGER NOT NULL,
    `kredit` INTEGER NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_aset` VARCHAR(191) NOT NULL,
    `nomor_aset` VARCHAR(191) NOT NULL,
    `akun_aset_id` INTEGER NOT NULL,
    `deskripsi_aset` VARCHAR(191) NOT NULL,
    `tgl_akuisisi` VARCHAR(191) NOT NULL,
    `biaya_akuisisi` INTEGER NOT NULL,
    `akun_dikreditkan_id` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `aset_non_depresiasi` BOOLEAN NOT NULL,
    `metode` VARCHAR(191) NOT NULL,
    `masa_manfaat` INTEGER NOT NULL,
    `nilai_tahun` INTEGER NOT NULL,
    `akun_penyusutan_id` INTEGER NOT NULL,
    `akumulasi_akun_penyusutan_id` INTEGER NOT NULL,
    `akumulasi_penyusutan` INTEGER NOT NULL,
    `tgl_penyusutan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PelepasanAset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `harga_jual` INTEGER NOT NULL,
    `deposit_id` INTEGER NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvoicePelepasanAset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,
    `untungrugi` INTEGER NOT NULL,
    `untungrugiakun` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalAset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_create_aset_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPelepasanAset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pelepasan_aset_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalInvoicePelepasanAset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoice_pelepasan_aset_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `tipe_saldo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePrivellege` ADD FOREIGN KEY (`role_id`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolePrivellege` ADD FOREIGN KEY (`menu_id`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Akun` ADD FOREIGN KEY (`tipeId`) REFERENCES `TipeAkun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Akun` ADD FOREIGN KEY (`kategoriId`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kontak` ADD FOREIGN KEY (`akun_piutang`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kontak` ADD FOREIGN KEY (`akun_hutang`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KontakDetail` ADD FOREIGN KEY (`kontak_id`) REFERENCES `Kontak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KontakDetail` ADD FOREIGN KEY (`kontak_type_id`) REFERENCES `KategoriKontak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD FOREIGN KEY (`kategori_produk_id`) REFERENCES `KategoriProduk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD FOREIGN KEY (`unit`) REFERENCES `SatuanProduk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD FOREIGN KEY (`akun_pembelian`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD FOREIGN KEY (`akun_penjualan`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pajak` ADD FOREIGN KEY (`akunPenjual`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pajak` ADD FOREIGN KEY (`akunPembeli`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderPenjualan` ADD FOREIGN KEY (`kontak_id`) REFERENCES `Kontak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderPenjualan` ADD FOREIGN KEY (`akun_pemotongan`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderPenjualan` ADD FOREIGN KEY (`akun_uang_muka`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPenjualan` ADD FOREIGN KEY (`header_penjualan_id`) REFERENCES `HeaderPenjualan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPenjualan` ADD FOREIGN KEY (`produk_id`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPenjualan` ADD FOREIGN KEY (`pajak_id`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPenjualan` ADD FOREIGN KEY (`header_penjualan_id`) REFERENCES `HeaderPenjualan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PenerimaanPembayaran` ADD FOREIGN KEY (`header_penjualan_id`) REFERENCES `HeaderPenjualan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PenerimaanPembayaran` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPenerimaanPembayaran` ADD FOREIGN KEY (`header_penjualan_id`) REFERENCES `HeaderPenjualan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderPembelian` ADD FOREIGN KEY (`kontak_id`) REFERENCES `Kontak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderPembelian` ADD FOREIGN KEY (`akun_pemotongan`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderPembelian` ADD FOREIGN KEY (`akun_uang_muka`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPembelian` ADD FOREIGN KEY (`header_pembelian_id`) REFERENCES `HeaderPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPembelian` ADD FOREIGN KEY (`produk_id`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailPembelian` ADD FOREIGN KEY (`pajak_id`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPembelian` ADD FOREIGN KEY (`header_pembelian_id`) REFERENCES `HeaderPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengirimanBayaran` ADD FOREIGN KEY (`header_pembelian_id`) REFERENCES `HeaderPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengirimanBayaran` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPengirimanBayaran` ADD FOREIGN KEY (`header_pembelian_id`) REFERENCES `HeaderPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderBiaya` ADD FOREIGN KEY (`akun_kas_bank`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderBiaya` ADD FOREIGN KEY (`nama_penerima`) REFERENCES `Kontak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderBiaya` ADD FOREIGN KEY (`akun_pemotongan`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailBiaya` ADD FOREIGN KEY (`header_biaya_id`) REFERENCES `HeaderBiaya`(`no_transaksi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailBiaya` ADD FOREIGN KEY (`akun_biaya_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailBiaya` ADD FOREIGN KEY (`pajak_id`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalBiaya` ADD FOREIGN KEY (`header_biaya_id`) REFERENCES `HeaderBiaya`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SettingDefault` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferUang` ADD FOREIGN KEY (`akun_transfer_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferUang` ADD FOREIGN KEY (`akun_setor_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalTransferUang` ADD FOREIGN KEY (`transfer_uang_id`) REFERENCES `TransferUang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderTerimaUang` ADD FOREIGN KEY (`akun_setor_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderTerimaUang` ADD FOREIGN KEY (`akun_membayar_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTerimaUang` ADD FOREIGN KEY (`header_terima_uang_id`) REFERENCES `HeaderTerimaUang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTerimaUang` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTerimaUang` ADD FOREIGN KEY (`pajak_id`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalTerimaUang` ADD FOREIGN KEY (`header_terima_uang_id`) REFERENCES `HeaderTerimaUang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderKirimUang` ADD FOREIGN KEY (`akun_bayar_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderKirimUang` ADD FOREIGN KEY (`akun_penerima_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailKirimUang` ADD FOREIGN KEY (`header_kirim_uang_id`) REFERENCES `HeaderKirimUang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailKirimUang` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailKirimUang` ADD FOREIGN KEY (`pajak_id`) REFERENCES `Pajak`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalKirimUang` ADD FOREIGN KEY (`header_kirim_uang_id`) REFERENCES `HeaderKirimUang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailJurnal` ADD FOREIGN KEY (`header_jurnal_id`) REFERENCES `HeaderJurnal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailJurnal` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aset` ADD FOREIGN KEY (`akun_aset_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aset` ADD FOREIGN KEY (`akun_dikreditkan_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aset` ADD FOREIGN KEY (`akun_penyusutan_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Aset` ADD FOREIGN KEY (`akumulasi_akun_penyusutan_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PelepasanAset` ADD FOREIGN KEY (`deposit_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalAset` ADD FOREIGN KEY (`header_create_aset_id`) REFERENCES `Aset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPelepasanAset` ADD FOREIGN KEY (`header_pelepasan_aset_id`) REFERENCES `PelepasanAset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalInvoicePelepasanAset` ADD FOREIGN KEY (`invoice_pelepasan_aset_id`) REFERENCES `InvoicePelepasanAset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
