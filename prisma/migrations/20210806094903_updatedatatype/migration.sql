/*
  Warnings:

  - Added the required column `tgl_transaksi` to the `HeaderKirimUang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgl_transaksi` to the `HeaderTerimaUang` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `headerkirimuang` ADD COLUMN     `tgl_transaksi` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `headerterimauang` ADD COLUMN     `tgl_transaksi` VARCHAR(191) NOT NULL;
