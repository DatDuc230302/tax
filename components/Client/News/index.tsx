'use client';

import SnackbarMessage from '@/components/Common/SnackbarMessage';
import { removeDuplicates } from '@/functions/removeDuplicates';
import { serverBackend } from '@/server';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

const fakeApi = [
    {
        id: '1',
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
        content:
            'Sáng 23/10, tại Cục Thuế TP Hồ Chí Minh, Tổng cục Thuế tổ chức Hội nghị công bố quyết định điều động, bổ nhiệm đồng chí Nguyễn Nam Bình, Cục trưởng Cục Thuế tỉnh Bà Rịa - Vũng Tàu giữ chức Cục trưởng Cục Thuế TP Hồ Chí Minh. Tổng cục trưởng Tổng cục Thuế Mai Xuân Thành chủ trì hội nghị.',
        Issuance_date: '13/02/2012',
        serial_number: '13/4/2012',
        status: 'active',
    },
    {
        id: '2',
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
        content:
            'Sáng 23/10, tại Cục Thuế TP Hồ Chí Minh, Tổng cục Thuế tổ chức Hội nghị công bố quyết định điều động, bổ nhiệm đồng chí Nguyễn Nam Bình, Cục trưởng Cục Thuế tỉnh Bà Rịa - Vũng Tàu giữ chức Cục trưởng Cục Thuế TP Hồ Chí Minh. Tổng cục trưởng Tổng cục Thuế Mai Xuân Thành chủ trì hội nghị.',
        Issuance_date: '13/02/2012',
        serial_number: '13/4/2012',
        status: 'active',
    },
    {
        id: '3',
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
        content:
            'Sáng 23/10, tại Cục Thuế TP Hồ Chí Minh, Tổng cục Thuế tổ chức Hội nghị công bố quyết định điều động, bổ nhiệm đồng chí Nguyễn Nam Bình, Cục trưởng Cục Thuế tỉnh Bà Rịa - Vũng Tàu giữ chức Cục trưởng Cục Thuế TP Hồ Chí Minh. Tổng cục trưởng Tổng cục Thuế Mai Xuân Thành chủ trì hội nghị.',
        Issuance_date: '13/02/2012',
        serial_number: '13/4/2012',
        status: 'active',
    },
    {
        id: '4',
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
        content:
            'Sáng 23/10, tại Cục Thuế TP Hồ Chí Minh, Tổng cục Thuế tổ chức Hội nghị công bố quyết định điều động, bổ nhiệm đồng chí Nguyễn Nam Bình, Cục trưởng Cục Thuế tỉnh Bà Rịa - Vũng Tàu giữ chức Cục trưởng Cục Thuế TP Hồ Chí Minh. Tổng cục trưởng Tổng cục Thuế Mai Xuân Thành chủ trì hội nghị.',
        Issuance_date: '13/02/2012',
        serial_number: '13/4/2012',
        status: 'active',
    },
    {
        id: '5',
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
        content:
            'Sáng 23/10, tại Cục Thuế TP Hồ Chí Minh, Tổng cục Thuế tổ chức Hội nghị công bố quyết định điều động, bổ nhiệm đồng chí Nguyễn Nam Bình, Cục trưởng Cục Thuế tỉnh Bà Rịa - Vũng Tàu giữ chức Cục trưởng Cục Thuế TP Hồ Chí Minh. Tổng cục trưởng Tổng cục Thuế Mai Xuân Thành chủ trì hội nghị.',
        Issuance_date: '13/02/2012',
        serial_number: '13/4/2012',
        status: 'active',
    },
];

export default function News() {
    const arr = ['Tin bài về thuế', 'Tin kinh tế', 'Tin chính trị'];
    const [news, setNews] = useState<object[]>([]);
    const [networkError, setNewworkError] = useState<boolean>(false);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/postByCategory/1`);
            if (result.data.message === 'success') {
                setNews(result.data.data);
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setNews(fakeApi);
                setNewworkError(true);
            }
        }
    };

    return (
        <div className="flex justify-center font-merriweather min-h-[950px] px-4 py-2">
            {networkError && <SnackbarMessage title="Không thể kết nối đến máy chủ" type={4} />}
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
                    {news.map(
                        (item: any, index: number) =>
                            item.status === 'active' && (
                                <Link
                                    href={`/bai-dang?postId=${item.id}`}
                                    key={index}
                                    className="cursor-pointer rounded-[12px] flex-col-reverse md:flex-row flex justify-between gap-4 bg-[#F9F9F9] p-3"
                                >
                                    <div className="flex flex-col gap-4 justify-center">
                                        <div className="flex flex-col pr-[20px] gap-2">
                                            <h3 className="line-clamp-2 font-bold">{item.title}</h3>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                                className="font-light line-clamp-3 text-[14px] text-[#767676]"
                                            ></div>
                                        </div>
                                        <div className="flex w-full whdivtespace-nowrap items-center gap-2">
                                            <span className="text-[12px]">{item.Issuance_date}</span>
                                            <span className="text-[12px]">Mã: {item.serial_number}</span>
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
                                        {/* <Image
                                    src={
                                        `${serverBackend}/item.images
                                    }
                                    className="object-cover rounded-[12px]"
                                    alt=""
                                    fill
                                    sizes="100000px"
                                /> */}
                                    </div>
                                </Link>
                            ),
                    )}
                </div>
            </div>
        </div>
    );
}
