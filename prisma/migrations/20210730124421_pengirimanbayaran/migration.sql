/*
  Warnings:

  - You are about to drop the column `cara_penagihan` on the `pengirimanbayaran` table. All the data in the column will be lost.
  - Added the required column `akun_id` to the `PengirimanBayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cara_pembayaran` to the `PengirimanBayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgl_pembayaran` to the `PengirimanBayaran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tgl_jauth_tempo` to the `PengirimanBayaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengirimanbayaran` DROP COLUMN `cara_penagihan`,
    ADD COLUMN     `akun_id` INTEGER NOT NULL,
    ADD COLUMN     `cara_pembayaran` VARCHAR(191) NOT NULL,
    ADD COLUMN     `tgl_pembayaran` VARCHAR(191) NOT NULL,
    ADD COLUMN     `tgl_jauth_tempo` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `PengirimanBayaran` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
