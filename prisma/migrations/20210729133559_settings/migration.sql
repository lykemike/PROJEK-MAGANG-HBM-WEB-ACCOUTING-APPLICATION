-- CreateTable
CREATE TABLE `SettingDefault` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_id` INTEGER NOT NULL,
    `tipe` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SettingDefault` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
