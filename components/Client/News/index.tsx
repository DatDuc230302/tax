'use client';

import { removeDuplicates } from '@/functions/removeDuplicates';
import { serverBackend } from '@/server';
import { Pagination } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

export default function News() {
    const arr = ['Tin bài về thuế', 'Tin kinh tế', 'Tin chính trị'];
    const [news, setNews] = useState<object[]>([]);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post/3`);
            if (result.data.message === 'success') {
                setNews(result.data.data);
            }
        } catch (err) {}
    };

    console.log(removeDuplicates(news, 'category_name'));

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
                    {news.map(
                        (item: any, index: number) =>
                            item.status === 'active' && (
                                <Link
                                    href={`/bai-dang?postId=${item.id}`}
                                    key={index}
                                    className="cursor-pointer rounded-[12px] flex-col-reverse md:flex-row flex justify-between gap-4 bg-[#f2f2f2] p-3"
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
