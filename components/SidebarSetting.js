import React from 'react';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import Link from 'next/link';

export default function SidebarSetting() {
    return (
        <div>
            <Link href="/setting/setting-perusahaan">
				<a>
                <span class="ml-2 text-lg tracking-wide truncate text-black">Perusahaan</span> <br/>
                </a>
			</Link>
            <span class="ml-2 text-lg tracking-wide truncate">Penjualan</span> <br/>
			<Link href="/setting/format-pengaturan">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/> Format Pengaturan</span> <br/>
                </a>
			</Link>
            <Link href="/setting/pengingat-faktur">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/> Pengingat Faktur</span> <br/>
                </a>
			</Link>
            <Link href="/setting/pembelian">
				<a>
                <span class="ml-2 text-lg tracking-wide truncate text-black">Pembelian</span> <br/>
                </a>
			</Link>
            <Link href="/setting/produk-dan-jasa">
				<a>
                <span class="ml-2 text-lg tracking-wide truncate text-black">Produk dan Jasa</span> <br/>
                </a>
			</Link>
            <span class="ml-2 text-lg tracking-wide truncate">Template</span> <br/>
            <Link href="/setting/template-faktur-penjualan">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/>Faktur Penjualan</span> <br/>
                </a>
			</Link>
            <Link href="/setting/template-penawaran-penjualan">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/>Penawaran Penjualan</span> <br/>
                </a>
			</Link>
            <Link href="/setting/template-pemesanan-penjualan">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/>Pemesanan Penjualan</span> <br/>
                </a>
			</Link>
            <Link href="/setting/template-pemesanan-pembelian">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/>Pemesanan Pembelian</span> <br/>
                </a>
			</Link>
            <Link href="/setting/pemetaan-akun">
				<a>
                <span class="ml-2 text-lg tracking-wide truncate text-black">Pemetaan Akun</span> <br/>
                </a>
			</Link>
            <Link href="/setting/daftar-pengguna">
				<a>
                <span class="ml-2 text-lg tracking-wide truncate text-black">Pengaturan Pengguna</span> <br/>
                </a>
			</Link>
            
            
            

            
		</div>
    )
}
