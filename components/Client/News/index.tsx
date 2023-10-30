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
    const [news, setNews] = useState<object[]>([]);
    const [initialNews, setInitialNews] = useState<object[]>([]);
    const [subCategory, setSubCategory] = useState<string>('');
    const [active, setActive] = useState<number>(-1);

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        let sortNews: object[];
        if (subCategory === 'Tất cả') {
            sortNews = initialNews;
        } else {
            sortNews = initialNews.filter((item: any) => item.category_name === subCategory);
        }
        setNews(sortNews);
    }, [subCategory]);

    const getNews = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/postByCategory/1`);
            if (result.data.message === 'success') {
                setNews(result.data.data.filter((item: any) => item.status !== 'inactive'));
                setInitialNews(result.data.data.filter((item: any) => item.status !== 'inactive'));
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setNews(fakeApi);
            }
        }
    };

    const onclickSubCategory = (name: string, indexActive: number) => {
        setSubCategory(name);
        setActive(indexActive);
    };

    return (
        <div className="flex justify-center font-merriweather min-h-[500px] px-4 py-2">
            <div className="w-wMain flex flex-col gap-4">
                <div className="flex justify-between items-center border-b-[2px] border-[#f5f5f5]">
                    <h2 className="text-[26px]">Tin tức</h2>
                    <div className="hidden sm:flex gap-3 text-[14px]">
                        <h4
                            onClick={() => onclickSubCategory('Tất cả', -1)}
                            className={`${
                                active === -1 && 'text-red-500'
                            } cursor-pointer text-[#414141] hover:text-red-500 duration-200 ease-linear`}
                        >
                            Tất cả
                        </h4>
                        {removeDuplicates(initialNews, 'category_name').map((item: any, index: number) => (
                            <h4
                                onClick={() => onclickSubCategory(item.category_name, index)}
                                key={index}
                                className={`${
                                    active === index && 'text-red-500'
                                } cursor-pointer text-[#414141] hover:text-red-500 duration-200 ease-linear `}
                            >
                                {item.category_name}
                            </h4>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {news.map(
                        (item: any, index: number) =>
                            item.status === 'active' &&
                            index < 4 && (
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
