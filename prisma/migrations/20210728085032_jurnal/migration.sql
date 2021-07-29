-- CreateTable
CREATE TABLE `PenerimaanPembayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_penjualan_id` INTEGER NOT NULL,
    `cara_penagihan` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPenerimaanPembayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_penjualan_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `akun_name` VARCHAR(191) NOT NULL,
    `debit` INTEGER NOT NULL,
    `kredit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPembelian` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pembelian_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `akun_name` VARCHAR(191) NOT NULL,
    `debit` INTEGER NOT NULL,
    `kredit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PengirimanBayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pembelian_id` INTEGER NOT NULL,
    `cara_penagihan` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JurnalPengirimanBayaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_pembelian_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `akun_name` VARCHAR(191) NOT NULL,
    `debit` INTEGER NOT NULL,
    `kredit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PenerimaanPembayaran` ADD FOREIGN KEY (`header_penjualan_id`) REFERENCES `HeaderPenjualan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPenerimaanPembayaran` ADD FOREIGN KEY (`header_penjualan_id`) REFERENCES `HeaderPenjualan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPenerimaanPembayaran` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPembelian` ADD FOREIGN KEY (`header_pembelian_id`) REFERENCES `HeaderPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPembelian` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PengirimanBayaran` ADD FOREIGN KEY (`header_pembelian_id`) REFERENCES `HeaderPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPengirimanBayaran` ADD FOREIGN KEY (`header_pembelian_id`) REFERENCES `HeaderPembelian`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JurnalPengirimanBayaran` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
