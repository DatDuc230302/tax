'use client';

import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import css from './NavMove.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { getDateVI, getDateVI2 } from '@/functions/getDateVI';

export default function NavMove() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div className="flex justify-center px-4 bg-[#F2F2F2] h-[40px] ">
            <div className="text-[14px] w-wMain flex items-center justify-between">
                <div>
                    {pathName !== '/' && (
                        <span
                            onClick={() => router.back()}
                            className={`${css.backTitle} cursor-pointer flex items-center gap-[2px]`}
                        >
                            <i className={`${css.backIcon}`}>
                                <HiOutlineChevronLeft fontSize={16} />
                            </i>
                            Quay lại
                        </span>
                    )}
                </div>
                <span className="font-bold hidden lg:flex">{getDateVI()}</span>
                <span className="font-bold flex lg:hidden ">{getDateVI2()}</span>
            </div>
        </div>
    );
}
