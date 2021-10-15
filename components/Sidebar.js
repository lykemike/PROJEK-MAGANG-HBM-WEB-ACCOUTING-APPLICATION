import React, { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AssessmentIcon from "@material-ui/icons/Assessment";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PaymentIcon from "@material-ui/icons/Payment";
import SettingsIcon from "@material-ui/icons/Settings";
import FaceIcon from "@material-ui/icons/Face";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessIcon from "@material-ui/icons/Business";
import MoneyIcon from "@material-ui/icons/Money";

const Sidebar = () => {
  const [previlleges, setPrevilleges] = useState([]);
  const navigationsMenu = [
    {
      id: 1,
      menu: "Dashboard",
      href: "/",
      icon: <HomeIcon />,
    },
    {
      id: 7,
      menu: "Laporan",
      href: "/laporan/menulaporan",
      icon: <AssessmentIcon />,
    },
    {
      id: 14,
      menu: "Pengaturan",
      href: "/setting/setting-perusahaan",
      icon: <SettingsIcon />,
    },
  ];

  const navigationsTransaction = [
    {
      id: 2,
      menu: "Jurnal",
      href: "/jurnal/create-jurnal",
      icon: <MenuBookIcon />,
    },
    {
      id: 10,
      menu: "Kas & Bank",
      href: "/kasbank/kasbankhome",
      icon: <AccountBalanceWalletIcon />,
    },
    {
      id: 11,
      menu: "Penjualan",
      href: "/jual/penjualan",
      icon: <ShoppingBasketIcon />,
    },
    {
      id: 12,
      menu: "Pembelian",
      href: "/beli/pembelian",
      icon: <ShoppingCartIcon />,
    },
    {
      id: 13,
      menu: "Biaya",
      href: "/biaya/pengeluaran",
      icon: <PaymentIcon />,
    },
    {
      id: 14,
      menu: "Reimbursement",
      href: "/reimbursement/tabel-reimbursement",
      icon: <MoneyIcon />,
    },
  ];

  const navigationsMasterData = [
    {
      id: 6,
      menu: "Kontak",
      href: "/kontak/tabel-kontak",
      icon: <ImportContactsIcon />,
    },
    {
      id: 8,
      menu: "Pajak",
      href: "/pajak/tabel-pajak",
      icon: <MonetizationOnIcon />,
    },
    {
      id: 9,
      menu: "Produk",
      href: "/produk/tabel-produk",
      icon: <LocalMallIcon />,
    },
    {
      id: 5,
      menu: "Daftar Akun",
      href: "/daftar-akun/daftar-akun",
      icon: <AccountBalanceIcon />,
    },
    {
      id: 14,
      menu: "Aset",
      href: "/aset/list-aset",
      icon: <BusinessIcon />,
    },
  ];

  const navigationsUserRole = [
    {
      id: 3,
      menu: "User",
      href: "/user/tabel-user",
      icon: <FaceIcon />,
    },
    {
      id: 4,
      menu: "Role",
      href: "/role/tabel-role",
      icon: <SupervisorAccountIcon />,
    },
  ];
  useEffect(() => {
    const user_login = localStorage.getItem("user_login");
    let id_previllege = JSON.parse(user_login);
    setPrevilleges(id_previllege.role.RolePrivellege);
  }, []);

  return (
    <div>
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-dark h-full ">
        <div className="flex items-center justify-center h-14">
          <div />
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-2 space-y-1">
            <li className="px-7">
              <div className="flex flex-row items-center h-8">
                <div className="text-lg font-light tracking-wide text-white">
                  Menu
                </div>
              </div>
            </li>
            {previlleges.length > 0
              ? previlleges.map((j) => {
                  return navigationsMenu
                    .filter((i) => i.id === j.menu_id)
                    .map((k) => {
                      return (
                        <li key="index">
                          <Link href={k.href}>
                            <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                              <span className="inline-flex justify-center items-center ml-4">
                                {k.icon}
                              </span>
                              <span className="ml-2 text-sm tracking-wide truncate">
                                {k.menu}
                              </span>
                            </a>
                          </Link>
                        </li>
                      );
                    });
                })
              : ""}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}
          </ul>
          <ul className="flex flex-col py-1 space-y-1">
            <li className="px-7">
              <div className="flex flex-row items-center h-8">
                <div className="text-lg font-light tracking-wide text-white">
                  Transaction
                </div>
              </div>
            </li>
            {previlleges.length > 0
              ? previlleges.map((j) => {
                  return navigationsTransaction
                    .filter((i) => i.id === j.menu_id)
                    .map((k) => {
                      return (
                        <li key="index">
                          <Link href={k.href}>
                            <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                              <span className="inline-flex justify-center items-center ml-4">
                                {k.icon}
                              </span>
                              <span className="ml-2 text-sm tracking-wide truncate">
                                {k.menu}
                              </span>
                            </a>
                          </Link>
                        </li>
                      );
                    });
                })
              : ""}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}
          </ul>
          <ul className="flex flex-col py-1 space-y-1">
            <li className="px-7">
              <div className="flex flex-row items-center h-8">
                <div className="text-lg font-light tracking-wide text-white">
                  Master Data
                </div>
              </div>
            </li>
            {previlleges.length > 0
              ? previlleges.map((j) => {
                  return navigationsMasterData
                    .filter((i) => i.id === j.menu_id)
                    .map((k) => {
                      return (
                        <li key="index">
                          <Link href={k.href}>
                            <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                              <span className="inline-flex justify-center items-center ml-4">
                                {k.icon}
                              </span>
                              <span className="ml-2 text-sm tracking-wide truncate">
                                {k.menu}
                              </span>
                            </a>
                          </Link>
                        </li>
                      );
                    });
                })
              : ""}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}
          </ul>
          <ul className="flex flex-col py-1 space-y-1">
            <li className="px-7">
              <div className="flex flex-row items-center h-8">
                <div className="text-lg font-light tracking-wide text-white">
                  User & Role
                </div>
              </div>
            </li>
            {previlleges.length > 0
              ? previlleges.map((j) => {
                  return navigationsUserRole
                    .filter((i) => i.id === j.menu_id)
                    .map((k) => {
                      return (
                        <li key="index">
                          <Link href={k.href}>
                            <a className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                              <span className="inline-flex justify-center items-center ml-4">
                                {k.icon}
                              </span>
                              <span className="ml-2 text-sm tracking-wide truncate">
                                {k.menu}
                              </span>
                            </a>
                          </Link>
                        </li>
                      );
                    });
                })
              : ""}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}

            {/* <hr className="ml-4 mr-4 bg-black" /> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
