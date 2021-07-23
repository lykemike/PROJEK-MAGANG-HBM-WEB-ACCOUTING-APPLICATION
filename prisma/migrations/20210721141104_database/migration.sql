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
    `harga_beli_satuan` INTEGER NOT NULL,
    `akun_pembelian` INTEGER NOT NULL,
    `pajak_beli` VARCHAR(191) NOT NULL,
    `harga_jual_satuan` INTEGER NOT NULL,
    `akun_penjualan` INTEGER NOT NULL,
    `pajak_jual` VARCHAR(191) NOT NULL,

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
    `balance` INTEGER NOT NULL,
    `pemotongan` INTEGER NOT NULL,
    `pemotongan_total` INTEGER NOT NULL,
    `akun_pemotongan` INTEGER NOT NULL,
    `uang_muka` INTEGER NOT NULL,
    `akun_uang_muka` INTEGER NOT NULL,
    `sisa_tagihan` INTEGER NOT NULL,
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
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPenjualan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_penjualan_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `akun_name` VARCHAR(191) NOT NULL,
    `debit` INTEGER NOT NULL,
    `kredit` INTEGER NOT NULL,

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
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

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
ALTER TABLE `JurnalPenjualan` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
