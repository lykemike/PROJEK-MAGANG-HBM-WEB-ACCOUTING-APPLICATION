/*
  Warnings:

  - Added the required column `nama_setting` to the `SettingDefault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `settingdefault` ADD COLUMN     `nama_setting` VARCHAR(191) NOT NULL;
