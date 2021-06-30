-- CreateTable
CREATE TABLE `Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menu_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `RoleAccess` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleId` INTEGER NOT NULL,
    `menuId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

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
CREATE TABLE `Produk` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `kode_sku` VARCHAR(191) NOT NULL,
    `kategoriId` INTEGER NOT NULL,
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
CREATE TABLE `Penjualan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kontakID` INTEGER NOT NULL,
    `namapelanggan` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `alamatpenagihan` VARCHAR(191) NOT NULL,
    `tgltransaksi` VARCHAR(191) NOT NULL,
    `tgljatuhtempo` VARCHAR(191) NOT NULL,
    `syaratpembayaran` VARCHAR(191) NOT NULL,
    `no_ref_penagihan` INTEGER NOT NULL,
    `notransaksi` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `uangmuka` INTEGER NOT NULL,
    `sisa_tagihan` INTEGER NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `fileattachment` VARCHAR(191) NOT NULL,
    `diskontambahan` VARCHAR(191) NOT NULL,
    `pemotongan` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
UNIQUE INDEX `Penjualan.notransaksi_unique`(`notransaksi`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Penjualandetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `penjualanID` INTEGER NOT NULL,
    `produkID` INTEGER NOT NULL,
    `nama_produk` VARCHAR(191) NOT NULL,
    `desk_produk` VARCHAR(191) NOT NULL,
    `kuantitas` INTEGER NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,
    `harga_satuan` INTEGER NOT NULL,
    `diskon` INTEGER NOT NULL,
    `diskonperbaris` INTEGER NOT NULL,
    `pajakperbaris` INTEGER NOT NULL,
    `pajakID` INTEGER NOT NULL,
    `pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pembelian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kontakID` INTEGER NOT NULL,
    `namasupplier` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `alamatsupplier` VARCHAR(191) NOT NULL,
    `tgltransaksi` VARCHAR(191) NOT NULL,
    `tgljatuhtempo` VARCHAR(191) NOT NULL,
    `syaratpembayaran` VARCHAR(191) NOT NULL,
    `no_ref_supplier` INTEGER NOT NULL,
    `notransaksi` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `uangmuka` INTEGER NOT NULL,
    `sisa_tagihan` INTEGER NOT NULL,
    `pesan` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `fileattachment` VARCHAR(191) NOT NULL,
    `diskontambahan` VARCHAR(191) NOT NULL,
    `pemotongan` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
UNIQUE INDEX `Pembelian.notransaksi_unique`(`notransaksi`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pembeliandetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pembelianID` INTEGER NOT NULL,
    `produkID` INTEGER NOT NULL,
    `nama_produk` VARCHAR(191) NOT NULL,
    `desk_produk` VARCHAR(191) NOT NULL,
    `kuantitas` INTEGER NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,
    `harga_satuan` INTEGER NOT NULL,
    `diskon` INTEGER NOT NULL,
    `diskonperbaris` VARCHAR(191) NOT NULL,
    `pajakperbaris` VARCHAR(191) NOT NULL,
    `pajakID` INTEGER NOT NULL,
    `pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleAccess` ADD FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoleAccess` ADD FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Akun` ADD FOREIGN KEY (`tipeId`) REFERENCES `TipeAkun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Akun` ADD FOREIGN KEY (`kategoriId`) REFERENCES `Kategori`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kontak` ADD FOREIGN KEY (`akun_piutang`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kontak` ADD FOREIGN KEY (`akun_hutang`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD FOREIGN KEY (`kategoriId`) REFERENCES `KategoriProduk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD FOREIGN KEY (`akun_pembelian`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produk` ADD FOREIGN KEY (`akun_penjualan`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pajak` ADD FOREIGN KEY (`akunPenjual`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pajak` ADD FOREIGN KEY (`akunPembeli`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjualan` ADD FOREIGN KEY (`kontakID`) REFERENCES `Kontak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjualandetail` ADD FOREIGN KEY (`penjualanID`) REFERENCES `Penjualan`(`notransaksi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjualandetail` ADD FOREIGN KEY (`produkID`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Penjualandetail` ADD FOREIGN KEY (`pajakID`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pembelian` ADD FOREIGN KEY (`kontakID`) REFERENCES `Kontak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pembeliandetail` ADD FOREIGN KEY (`pembelianID`) REFERENCES `Pembelian`(`notransaksi`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pembeliandetail` ADD FOREIGN KEY (`produkID`) REFERENCES `Produk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pembeliandetail` ADD FOREIGN KEY (`pajakID`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
