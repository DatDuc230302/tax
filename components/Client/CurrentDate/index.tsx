import { formatDateVI } from '@/functions/formatDateVI';
import React from 'react';

export default function CurrentDate() {
    return (
        <div className="flex justify-center bg-[#F2F2F2] h-[40px] ">
            <div className="text-[14px] w-[1200px] flex items-center justify-end">{formatDateVI()}</div>
        </div>
    );
}
