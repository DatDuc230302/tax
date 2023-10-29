'use client';

import { serverBackend } from '@/server';
import { Pagination } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

export default function News() {
    const arr = ['Tin bài về thuế', 'Tin kinh tế', 'Tin chính trị'];
    const list = [1, 2, 3, 4];
    const [news, setNews] = useState<object[]>([]);

    const getNews = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post`);
        } catch (err) {}
    };

    return (
        <div className="flex justify-center font-merriweather min-h-[950px] px-4 py-2">
            <div className="w-wMain flex flex-col gap-4">
                <div className="flex justify-between items-center border-b-[2px] border-[#f5f5f5]">
                    <h2 className="text-[26px]">Tin tức</h2>
                    <div className="hidden sm:flex gap-3 text-[14px]">
                        {arr.map((item: any) => (
                            <h4
                                key={item}
                                className="cursor-pointer text-[#414141] hover:text-red-500 duration-200 ease-linear "
                            >
                                {item}
                            </h4>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {list.map((item, index) => (
                        <Link
                            href={'/bai-dang?postId=1'}
                            key={index}
                            className="cursor-pointer rounded-[12px] flex-col-reverse md:flex-row flex justify-between gap-4 bg-[#f2f2f2] p-3"
                        >
                            <div className="flex flex-col gap-4 justify-center">
                                <div className="flex flex-col pr-[20px] gap-2">
                                    <h3 className="line-clamp-2 font-bold">
                                        Chống thất thu thương mại điện tử: ngành thuế đã thực hiện đồng bộ nhiều giải
                                        pháp
                                    </h3>
                                    <p className="line-clamp-3 text-[14px] text-[#767676]">
                                        Theo ông Vũ Mạnh Cường, vài năm gần đây, khi hoạt động kinh doanh trên nền tảng
                                        số phổ biến tại các TP lớn ở Việt Nam, ngành thuế đã có nhiều giải pháp để chủ
                                        động quản lý. Cụ thể, Tổng cục Thuế đã tham mưu, trình các cấp có thẩm quyền,
                                        trình Quốc hội ban hành Luật Quản lý thuế số 38 có hiệu lực từ 1/7/2020. Theo
                                        đó, để đấu tranh phòng chống gian lận qua hoạt động thương mại điện tử, Luật đã
                                        quy định nhiệm vụ, chức năng, quy tắc phối hợp giữa các bộ, ban, ngành. Trong
                                        đó, Bộ Công thương, Bộ Thông tin và Truyền thông có nhiệm vụ cung cấp, phối hợp
                                        để chuyển dữ liệu thông tin và biện pháp quản lý đối với hoạt động kinh doanh
                                        qua mạng cho cơ quan thuế. Cùng với đó, ngân hàng thương mại có trách nhiệm cung
                                        cấp tất cả dữ liệu mua bán hàng hoá khi được cơ quan thuế đề nghị. Trên cơ sở
                                        này, ngành thuế đã hoàn thiện cơ chế quản lý thu thuế đối với hoạt động thương
                                        mại điện tử.
                                    </p>
                                </div>
                                <div className="flex w-full whitespace-nowrap items-center gap-2">
                                    <span className="text-[12px]">12 ngày trước</span>
                                    <span className="flex gap-1 items-center text-[14px]">
                                        <AiOutlineEye fontSize={18} />0
                                    </span>
                                </div>
                            </div>
                            <div className="w-full md:w-[280px] shrink-0 h-[180px] relative">
                                <Image
                                    src={
                                        'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202310/Images/dth-1077-20231023104509-e.jpg'
                                    }
                                    className="object-cover rounded-[12px]"
                                    alt=""
                                    fill
                                    sizes="100000px"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
