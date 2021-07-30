/*
  Warnings:

  - You are about to drop the column `cara_penagihan` on the `penerimaanpembayaran` table. All the data in the column will be lost.
  - Added the required column `cara_pembayaran` to the `PenerimaanPembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgl_pembayaran` to the `PenerimaanPembayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgl_jauth_tempo` to the `PenerimaanPembayaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penerimaanpembayaran` DROP COLUMN `cara_penagihan`,
    ADD COLUMN     `cara_pembayaran` VARCHAR(191) NOT NULL,
    ADD COLUMN     `tgl_pembayaran` VARCHAR(191) NOT NULL,
    ADD COLUMN     `tgl_jauth_tempo` VARCHAR(191) NOT NULL;
