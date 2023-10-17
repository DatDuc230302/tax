'use client';

import React, { useContext } from 'react';
import { AdminContext } from '@/app/admin/layout';
import Image from 'next/image';

export default function ProfileAdmin() {
    const dataContext: any = useContext(AdminContext);
    return (
        <div className="flex w-full mt-4 justify-center">
            <div className="px-4 w-[1170px] flex flex-col">
                <h2 className="text-[26px] font-bold">Hồ sơ</h2>
                <div className="flex items-center gap-20">
                    <span className="flex">Ảnh đại diện:</span>
                    <div className="relative flex w-[100px] h-[100px] rounded-[50%]">
                        <Image src={'/imgs/avatar.jpg'} className="rounded-[50%]" fill sizes="10000px" alt="" />
                    </div>
                </div>
                <span>Quyền: {dataContext.role}</span>
            </div>
        </div>
    );
}
