/*
  Warnings:

  - Added the required column `akun_id` to the `PenerimaanPembayaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `penerimaanpembayaran` ADD COLUMN     `akun_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PenerimaanPembayaran` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
