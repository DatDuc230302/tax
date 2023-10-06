'use client';

import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Pagination } from '@nextui-org/react';

export default function Accounts() {
    const headerRow: string[] = ['Tên', 'Email', 'Số điện thoại', 'Mật khẩu', 'Quyền', 'Trạng thái', 'Công cụ'];

    return (
        <div className="flex flex-col w-full px-4 py-[20px] gap-4">
            <div className="flex justify-end gap-10">
                <Input type="text" placeholder="Tìm kiếm tài khoản" />
                <Button
                    className="h-full w-[210px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] flex items-center"
                    color="primary"
                >
                    <AiOutlinePlusCircle fontSize={20} />
                    Thêm tài khoản
                </Button>
            </div>
            <div className="h-[500px] p-6 w-full rounded-[10px] border-[1px] bg-white border-[#ccc] mt-2 flex-col">
                <div className="flex p-2 px-4 bg-[#F4F4F5] rounded-[10px] justify-between">
                    {headerRow.map((item: string, index: number) => (
                        <span className="" key={index}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex justify-end">
                <Pagination showControls total={10} initialPage={1} />
            </div>
        </div>
    );
}
