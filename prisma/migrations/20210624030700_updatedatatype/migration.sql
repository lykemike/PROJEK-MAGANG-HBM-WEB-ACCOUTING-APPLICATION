/*
  Warnings:

  - You are about to alter the column `diskonperbaris` on the `pembeliandetail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `pajakperbaris` on the `pembeliandetail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `pembeliandetail` MODIFY `diskonperbaris` INTEGER NOT NULL,
    MODIFY `pajakperbaris` INTEGER NOT NULL;
