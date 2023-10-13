'use client';
import React, { useContext } from 'react';
import { AdminContext } from '../layout';
import NoneRole from '@/componentsAdmin/NoneRole';

export default function History() {
    const dataContext = useContext(AdminContext);
    return dataContext.role !== 'root' ? (
        <NoneRole />
    ) : (
        <div className="flex justify-center w-full h-full">
            <div className="flex w-[1170px]">Lịch sử hoạt động</div>
        </div>
    );
}
