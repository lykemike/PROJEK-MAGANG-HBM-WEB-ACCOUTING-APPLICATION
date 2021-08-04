-- CreateTable
CREATE TABLE `HeaderKirimUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `akun_bayar_id` INTEGER NOT NULL,
    `akun_penerima_id` INTEGER NOT NULL,
    `no_transaksi` INTEGER NOT NULL,
    `tag` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NOT NULL,
    `file_attachment` VARCHAR(191) NOT NULL,
    `subtotal` INTEGER NOT NULL,
    `pajak` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailKirimUang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `header_kirim_uang_id` INTEGER NOT NULL,
    `akun_id` INTEGER NOT NULL,
    `nama_akun` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `pajak_id` INTEGER NOT NULL,
    `pajak_nama` VARCHAR(191) NOT NULL,
    `pajak_persen` INTEGER NOT NULL,
    `hasil_pajak` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HeaderKirimUang` ADD FOREIGN KEY (`akun_bayar_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HeaderKirimUang` ADD FOREIGN KEY (`akun_penerima_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailKirimUang` ADD FOREIGN KEY (`header_kirim_uang_id`) REFERENCES `HeaderKirimUang`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailKirimUang` ADD FOREIGN KEY (`akun_id`) REFERENCES `Akun`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailKirimUang` ADD FOREIGN KEY (`pajak_id`) REFERENCES `Pajak`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
