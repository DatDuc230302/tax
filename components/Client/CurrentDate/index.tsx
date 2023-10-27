'use client';

import { formatDateVI } from '@/functions/formatDateVI';
import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import css from './CurrentDate.module.scss';
import { usePathname, useRouter } from 'next/navigation';

export default function CurrentDate() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div className="flex justify-center bg-[#F2F2F2] h-[40px] ">
            <div className="text-[14px] w-[1200px] flex items-center justify-between">
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
                <span>{formatDateVI()}</span>
            </div>
        </div>
    );
}
