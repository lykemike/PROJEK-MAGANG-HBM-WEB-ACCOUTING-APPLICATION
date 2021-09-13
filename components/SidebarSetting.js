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


            <Link href="/setting/pengingat-faktur">
				<a>
                <span class="ml-2 text-lg tracking-wide truncate text-black">Pengingat Faktur</span> <br/>
                </a>
			</Link>

            <span class="ml-2 text-lg tracking-wide truncate">Template</span> <br/>
            <Link href="/setting/template-email-penjualan">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/>Template Email</span> <br/>
                </a>
			</Link>
            <Link href="/setting/pengaturan-pdf">
				<a>
                <span class="ml-4 text-lg tracking-wide truncate text-gray-500"><ArrowRightIcon fontSize="small"/>Template PDF</span> <br/>
                </a>
			</Link>
            <Link href="/setting/pemetaan-akun">
				<a>
                <span class="ml-2 text-lg tracking-wide truncate text-black">Pemetaan Akun</span> <br/>
                </a>
			</Link>
            
		</div>
    )
}
