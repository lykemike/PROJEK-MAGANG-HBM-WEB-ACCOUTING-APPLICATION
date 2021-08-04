/*
  Warnings:

  - You are about to drop the column `akun_id` on the `transferuang` table. All the data in the column will be lost.
  - Added the required column `akun_transfer_id` to the `TransferUang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `akun_setor_id` to the `TransferUang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transferuang` DROP FOREIGN KEY `transferuang_ibfk_1`;

-- AlterTable
ALTER TABLE `transferuang` DROP COLUMN `akun_id`,
    ADD COLUMN     `akun_transfer_id` INTEGER NOT NULL,
    ADD COLUMN     `akun_setor_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TransferUang` ADD FOREIGN KEY (`akun_transfer_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransferUang` ADD FOREIGN KEY (`akun_setor_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
