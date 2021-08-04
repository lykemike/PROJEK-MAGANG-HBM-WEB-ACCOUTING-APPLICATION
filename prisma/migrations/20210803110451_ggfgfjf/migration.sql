/*
  Warnings:

  - Added the required column `akun_id` to the `DetailTerimaUang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_akun` to the `DetailTerimaUang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailterimauang` ADD COLUMN     `akun_id` INTEGER NOT NULL,
    ADD COLUMN     `nama_akun` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `DetailTerimaUang` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
