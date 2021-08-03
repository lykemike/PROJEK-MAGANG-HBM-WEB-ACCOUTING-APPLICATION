/*
  Warnings:

  - Added the required column `status` to the `HeaderPembelian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `headerpembelian` ADD COLUMN     `status` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `TransferUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_id` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `file_attachment` VARCHAR(191) NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `tgl_transaksi` VARCHAR(191) NOT NULL,
    `tag` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeaderTerimaUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_setor_id` INTEGER NOT NULL,
    `akun_membayar_id` INTEGER NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
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
    `deskripsi` VARCHAR(191) NOT NULL,
    `pajak_id` INTEGER NOT NULL,
    `pajak_nama` VARCHAR(191) NOT NULL,
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TransferUang` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderTerimaUang` ADD FOREIGN KEY (`akun_setor_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderTerimaUang` ADD FOREIGN KEY (`akun_membayar_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTerimaUang` ADD FOREIGN KEY (`header_terima_uang_id`) REFERENCES `HeaderTerimaUang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailTerimaUang` ADD FOREIGN KEY (`pajak_id`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
