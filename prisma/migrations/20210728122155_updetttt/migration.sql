/*
  Warnings:

  - You are about to drop the column `pajak_beli` on the `produk` table. All the data in the column will be lost.
  - You are about to drop the column `pajak_jual` on the `produk` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produk` DROP COLUMN `pajak_beli`,
    DROP COLUMN `pajak_jual`,
    ADD COLUMN     `quantity` INTEGER NOT NULL;
