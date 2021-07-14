import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const createRole = await prisma.role.createMany({
      data: [
        {
          roleType: "Admin",
          roleDesc: "Administrator",
        },
      ],
      skipDuplicates: true,
    });

    const createUser = await prisma.user.createMany({
      data: [
        {
          firstName: "Admin",
          lastName: "HBM",
          email: "admin@hbm.co.id",
          password: "admin1234",
          roleId: 1,
        },
      ],
      skipDuplicates: true,
    });

    const createMenu = await prisma.menu.createMany({
      data: [
        {
          menu_name: "Dashboard",
        },
        {
          menu_name: "Jurnal",
        },
        {
          menu_name: "User",
        },
        {
          menu_name: "Role",
        },
        {
          menu_name: "Daftar Akun",
        },
        {
          menu_name: "Kontak",
        },
        {
          menu_name: "Laporan",
        },
        {
          menu_name: "Pajak",
        },
        {
          menu_name: "Produk",
        },
        {
          menu_name: "Kas & Bank",
        },
        {
          menu_name: "Penjualan",
        },
        {
          menu_name: "Pembelian",
        },
        {
          menu_name: "Biaya",
        },
        {
          menu_name: "Pengaturan",
        },
      ],
    });

    const createRolePrivellege = await prisma.rolePrivellege.createMany({
      data: [
        {
          role_id: 1,
          menu_id: 1,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 2,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 3,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 4,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 5,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 6,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 7,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 8,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 9,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 10,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 11,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 12,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 13,
          value: true,
        },
        {
          role_id: 1,
          menu_id: 14,
          value: true,
        },
      ],
      skipDuplicates: true,
    });

    const createKategoriKontak = await prisma.kategoriKontak.createMany({
      data: [
        { nama: "Supplier" },
        { nama: "Pelanggan" },
        { nama: "Karyawan" },
        { nama: "Lainnya" },
      ],
      skipDuplicates: true,
    });

    res
      .status(201)
      .json(
        { message: "Create Admin Role Success!", data: createRole },
        { message: "Create User Admin Success!", data: createUser },
        { message: "Create Menu Success!", data: createMenu },
        { message: "Create Role Privellege Success!", data: createRolePrivellege },
        { message: "Create Kategori Kontak Success!", data: createKategoriKontak }
      );
  } catch (error) {
    res
      .status(400)
      .json(
        { roleType: "Create Admin Role Failed!", error },
        { firstName: "Create User Admin Failed!", error },
        { menu_name: "Create Menu Failed!", error },
        { role_id: "Create Privellege Failed!", error },
        { nama: "Create Kategori Kontak Failed!", error }
      );
    console.log(error);
  }
};
