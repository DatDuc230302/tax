'use client';

import { MessageIcon } from '@/components/Common/Icons';
import React from 'react';
import { Tooltip } from '@nextui-org/react';

export default function Asking() {
    return (
        <Tooltip content="Đặt câu hỏi">
            <div className="duration-200 ease-linear hover:bg-opacity-60 fixed bg-[#0B80FF] bottom-[40px] cursor-pointer p-3 rounded-[50%] right-[70px]">
                <MessageIcon size={16} />
            </div>
        </Tooltip>
    );
}
