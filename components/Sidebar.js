import React,{useEffect, useState} from 'react';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PaymentIcon from '@material-ui/icons/Payment';
import SettingsIcon from '@material-ui/icons/Settings';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


const Sidebar = () => {
	
	const [data, setData] = useState(0)

	useEffect(() => {
		const user_login = localStorage.getItem('user_login');
		let id_role = JSON.parse(user_login)
		setData(id_role.roleId)
	}, [])

	switch(data){
		case 1:
			return(<div>
			<div>
			<div class="fixed flex flex-col top-0 left-0 w-64 bg-dark h-full ">
				<div class="flex items-center justify-center h-14">
					<div />
				</div>
				<div class="overflow-y-auto overflow-x-hidden flex-grow">
					<ul class="flex flex-col py-4 space-y-1">
						<li class="px-7">
							<div class="flex flex-row items-center h-8">
								<div class="text-lg font-light tracking-wide text-white">Menu</div>
							</div>
						</li>

						<li>
							<Link href="/">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<HomeIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/jurnal/create-jurnal">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<MenuBookIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Jurnal</span>
								</a>
							</Link>
						</li>

						<li>
							<Link href="/user/tabel-user">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<FaceIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">User</span>
								</a>
							</Link>
						</li>

						<li>
							<Link href="/role/tabel-role">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<SupervisorAccountIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Role</span>
								</a>
							</Link>
						</li>


						<hr class="ml-4 mr-4 bg-black" />

						<li>
							<Link href="/daftar-akun/daftar-akun">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<AccountBalanceIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Daftar Akun</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/kontak/tabel-kontak">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<ImportContactsIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Kontak</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/laporan/menulaporan">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<AssessmentIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Laporan</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/pajak/tabel-pajak">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<MonetizationOnIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Pajak</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/produk/tabel-produk">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<LocalMallIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Produk</span>
								</a>
							</Link>
						</li>

						<hr class="ml-4 mr-4 bg-black" />

						<li>
							<Link href="/kasbank/kasbankhome">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<AccountBalanceWalletIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Kas & Bank</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/jual/penjualan">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<ShoppingBasketIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Penjualan</span>
								</a>
							</Link>

						</li>
						<li>
							<Link href="/beli/pembelian">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<ShoppingCartIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Pembelian</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/biaya/pengeluaran">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<PaymentIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Biaya</span>
								</a>
							</Link>
						</li>

						<hr class="ml-4 mr-4 bg-black" />

						<li>
							<Link href="/setting/setting-perusahaan">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<SettingsIcon />
									</span>

									<span class="ml-2 text-sm tracking-wide truncate">Pengaturan</span>
								</a>
							</Link>

						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>)

		case 2:
			return(
				<div>
					<div class="fixed flex flex-col top-0 left-0 w-64 bg-dark h-full ">
						<div class="flex items-center justify-center h-14">
							<div />
					</div>
					<div class="overflow-y-auto overflow-x-hidden flex-grow">
					<ul class="flex flex-col py-4 space-y-1">
						<li class="px-7">
							<div class="flex flex-row items-center h-8">
								<div class="text-lg font-light tracking-wide text-white">Menu</div>
							</div>
						</li>

						<li>
							<Link href="/">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<HomeIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/jurnal/create-jurnal">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<MenuBookIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Jurnal</span>
								</a>
							</Link>
						</li>

						</ul>
					</div>
				</div>
			</div>
			)

		default:
			return(<div>
				id tidak terdefinisi
			</div>)

	}
	
	return (	
		<div>
			<div class="fixed flex flex-col top-0 left-0 w-64 bg-dark h-full ">
				<div class="flex items-center justify-center h-14">
					<div />
				</div>
				<div class="overflow-y-auto overflow-x-hidden flex-grow">
					<ul class="flex flex-col py-4 space-y-1">
						<li class="px-7">
							<div class="flex flex-row items-center h-8">
								<div class="text-lg font-light tracking-wide text-white">Menu</div>
							</div>
						</li>

						<li>
							<Link href="/">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<HomeIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/jurnal/create-jurnal">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<MenuBookIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Jurnal</span>
								</a>
							</Link>
						</li>

						<li>
							<Link href="/user/tabel-user">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<FaceIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">User</span>
								</a>
							</Link>
						</li>

						<li>
							<Link href="/role/tabel-role">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<SupervisorAccountIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Role</span>
								</a>
							</Link>
						</li>


						<hr class="ml-4 mr-4 bg-black" />

						<li>
							<Link href="/daftar-akun/daftar-akun">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<AccountBalanceIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Daftar Akun</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/kontak/tabel-kontak">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<ImportContactsIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Kontak</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/laporan/menulaporan">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<AssessmentIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Laporan</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/pajak/tabel-pajak">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<MonetizationOnIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Pajak</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/produk/tabel-produk">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<LocalMallIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Produk</span>
								</a>
							</Link>
						</li>

						<hr class="ml-4 mr-4 bg-black" />

						<li>
							<Link href="/kasbank/kasbankhome">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<AccountBalanceWalletIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Kas & Bank</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/jual/penjualan">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<ShoppingBasketIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Penjualan</span>
								</a>
							</Link>

						</li>
						<li>
							<Link href="/beli/pembelian">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<ShoppingCartIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Pembelian</span>
								</a>
							</Link>
						</li>
						<li>
							<Link href="/biaya/pengeluaran">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<PaymentIcon />
									</span>
									<span class="ml-2 text-sm tracking-wide truncate">Biaya</span>
								</a>
							</Link>
						</li>

						<hr class="ml-4 mr-4 bg-black" />

						<li>
							<Link href="/setting/setting-perusahaan">
								<a class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-600 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
									<span class="inline-flex justify-center items-center ml-4">
										<SettingsIcon />
									</span>

									<span class="ml-2 text-sm tracking-wide truncate">Pengaturan</span>
								</a>
							</Link>

						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;


