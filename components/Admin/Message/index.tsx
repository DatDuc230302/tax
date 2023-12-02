'use client';

import Image from 'next/image';
import React from 'react';
import { IoMdSend } from 'react-icons/io';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

export default function Message() {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className="flex w-full h-full p-4">
            <div className="w-full h-[600px] flex border-[1px] border-[#c4c4c4]">
                <div className="shrink-0 flex flex-col w-[40%] border-[1px] border-r-[#c4c4c4]">
                    <div className="flex px-4 py-2 border-[1px] border-b-[#c4c4c4] justify-between">
                        <h2 className="shrink-0 font-bold text-[24px] text-[#05728F]">Gần đây</h2>
                        <input placeholder="Tìm kiếm tên" className="border-b-[2px] border-b-[#c4c4c4]" />
                    </div>
                    <div className="flex flex-col overflow-y-auto">
                        {arr.map((item: any) => (
                            <div
                                key={item}
                                className="flex gap-2 last:border-b-[0] px-4 py-4 items-center cursor-pointer border-b-[1px] border-b-[#c4c4c4] hover:bg-[#e4e4e4] duration-100 ease-linear"
                            >
                                <div className="relative w-[56px] h-[50px]">
                                    <Image
                                        src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/lmht-darius-duong-tren.jpg"
                                        alt=""
                                        fill
                                        sizes="10000px"
                                        className="object-cover rounded-[50%]"
                                    />
                                </div>
                                <div className="flex w-full flex-col justify-between">
                                    <div className="flex w-full justify-between">
                                        <span className="text-[14px] font-bold">Đạt</span>
                                        <span className="text-[14px] font-bold">25/5/2002</span>
                                    </div>
                                    <p className="text-[#989898] text-[14px] line-clamp-2">
                                        Test, which is a new approach to have all solutions astrology under one roof.
                                        Test, which is a new approach to have all solutions astrology under one roof.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex px-4 items-center py-[8.5px] border-[1px] border-b-[#c4c4c4] justify-between">
                        <h2 className="shrink-0 font-bold text-[24px] text-[#05728F]">Tin nhắn</h2>
                        <i className="cursor-pointer">
                            <IoEllipsisVerticalSharp fontSize={24} />
                        </i>
                    </div>
                    <div className="flex flex-col h-full justify-between bg-[#e0e0e0]">
                        <div className="flex flex-col ">
                            <div className="flex gap-3 px-4 py-4 items-center">
                                <div className="relative w-[56px] h-[50px]">
                                    <Image
                                        src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/11/lmht-darius-duong-tren.jpg"
                                        alt=""
                                        fill
                                        sizes="10000px"
                                        className="object-cover rounded-[50%]"
                                    />
                                </div>
                                <p className="flex bg-white shadow-2xl rounded-[16px]  p-2">
                                    Tôi muốn hỏi về việt đóng thuế
                                </p>
                            </div>
                            <div className="px-4 flex justify-end">
                                <span className="shadow-2xl bg-[#E5EFFF] p-2 rounded-[16px]">Ok luôn</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-t-[1px] items-center px-4 border-t-[#c4c4c4] h-[50px] w-full flex">
                        <input className="w-full bg-transparent" placeholder="Nhập tin nhắn" />
                        <i className="cursor-pointer">
                            <IoMdSend color={'#0B80FF'} fontSize={30} />
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
}
