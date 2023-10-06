'use client';

import React from 'react';
import { Button, Pagination } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Image from 'next/image';

const headerRow: string[] = ['Tên bài viết', 'Thể loại', 'Nội dụng'];

export default function Articles() {
    return (
        <div className="flex px-[20px] flex-col w-full pt-[20px] gap-5">
            <div className="flex justify-end gap-10">
                <Input type="text" placeholder="Tìm kiếm bài báo" />
                <Button
                    className="h-full w-[180px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] flex items-center"
                    color="primary"
                >
                    <AiOutlinePlusCircle fontSize={20} />
                    Thêm bài viết
                </Button>
            </div>
            <div className="h-[500px] p-6 w-full rounded-[10px] border-[1px] bg-white border-[#ccc] mt-2 flex-col">
                <div className="flex p-2 px-4 bg-[#F4F4F5] rounded-[10px]">
                    {headerRow.map((item: string, index: number) => (
                        <span className="" key={index}>
                            {item}
                        </span>
                    ))}
                    <span>Ngày đăng</span>
                    <div className="flex">
                        <span>Trạng thái và công cụ</span>
                    </div>
                </div>
                <div className="flex flex-col px-4 p-2">
                    <div className="flex h-full items-center gap-4">
                        <Image
                            className="rounded-[50%]"
                            src={'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
                            width={50}
                            height={50}
                            alt=""
                        />
                        <span>Đây là bài báo của gì đó</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Pagination showControls total={10} initialPage={1} />
            </div>
        </div>
    );
}
