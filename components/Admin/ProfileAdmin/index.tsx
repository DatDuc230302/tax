'use client';

import React, { useContext } from 'react';
import { AdminContext } from '@/app/admin/layout';
import { MdSecurity } from 'react-icons/md';
import { Chip } from '@nextui-org/react';

export default function ProfileAdmin() {
    const dataContext: any = useContext(AdminContext);
    return (
        <div className="flex w-full mt-4 justify-center px-10">
            <div className="w-full flex gap-4">
                <div className="border-[1px] shrink-0 rounded-[10px] shadow-xl border-[#ccc] w-[320px] h-[350px] p-4 flex justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="border-[1px] relative border-[#ccc] rounded-[50%] h-[200px] w-[200px]">
                            <div className="absolute bottom-4 w-full flex justify-center">
                                <MdSecurity fontSize={50} />
                            </div>
                        </div>
                        {dataContext.role === 'root' && <Chip color="danger">Quản trị viên</Chip>}
                        {dataContext.role === 'admin' && <Chip color="primary">Người quản lý</Chip>}
                    </div>
                </div>
                <div className="border-[1px] shadow-2xl rounded-[10px] border-[#ccc] w-full h-[350px] p-4 flex">
                    <span>Họ và trên: {dataContext.name}</span>
                </div>
            </div>
        </div>
    );
}
