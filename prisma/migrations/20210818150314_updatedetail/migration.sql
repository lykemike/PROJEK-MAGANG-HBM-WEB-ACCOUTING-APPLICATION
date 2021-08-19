/*
  Warnings:

  - Added the required column `nama_akun` to the `DetailBiaya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pajak` to the `DetailBiaya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_pajak` to the `DetailBiaya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pajak_persen` to the `DetailBiaya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasil_pajak` to the `DetailBiaya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama_pajak_akun_beli` to the `DetailBiaya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_per_baris` to the `DetailBiaya` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detailbiaya` ADD COLUMN     `nama_akun` VARCHAR(191) NOT NULL,
    ADD COLUMN     `pajak` INTEGER NOT NULL,
    ADD COLUMN     `nama_pajak` VARCHAR(191) NOT NULL,
    ADD COLUMN     `pajak_persen` INTEGER NOT NULL,
    ADD COLUMN     `hasil_pajak` INTEGER NOT NULL,
    ADD COLUMN     `nama_pajak_akun_beli` VARCHAR(191) NOT NULL,
    ADD COLUMN     `total_per_baris` INTEGER NOT NULL;
