'use client';

import React, { useEffect, useState } from 'react';
import css from './News.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { serverBackend } from '@/server';

export default function News() {
    const [news, setNews] = useState<object[]>([]);
    const newsV = [
        {
            id: 1,
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/782c7a22-ed07-4d92-afc8-5848b3a861a2-20230823023746-e.jpeg',
            title: 'Chương trình “Hóa đơn may mắn” Quý II năm 2023',
        },
        {
            id: 1,
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/infographic-cv-2749-20230801030536-e.jpeg',
            title: 'Triển khai liên thông đăng ký kinh doanh và đăng ký thuế đối với hộ kinh doanh theo',
        },
        {
            id: 1,
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/infographic-cv-2749-20230801030536-e.jpeg',
            title: 'Triển khai liên thông đăng ký kinh doanh và đăng ký thuế đối với hộ kinh doanh theo',
        },
        {
            id: 1,
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/infographic-cv-2749-20230801030536-e.jpeg',
            title: 'Triển khai liên thông đăng ký kinh doanh và đăng ký thuế đối với hộ kinh doanh theo',
        },
        {
            id: 1,
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/infographic-cv-2749-20230801030536-e.jpeg',
            title: 'Triển khai liên thông đăng ký kinh doanh và đăng ký thuế đối với hộ kinh doanh theo',
        },
    ];

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post`);
            if (result.data.message === 'success') {
                setNews(result.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center px-4">
            <div className="flex w-[1200px] flex-col my-2 font-merriweather">
                <div className="flex justify-between border-b-[2px] pb-4 border-[#eaeaea]">
                    <h1 className="text-[30px]">Tin tức sự kiện</h1>
                    <div className="flex gap-3">
                        <span className="cursor-pointer text-[14px] text-red-500">Tin bài về thuế</span>
                        <span className="cursor-pointer text-[14px] hover:text-red-500 duration-100 ease-linear">
                            Tin chuẩn
                        </span>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row mt-1 w-full gap-3">
                    {news.map(
                        (item: any, index: number) =>
                            index === 0 && (
                                <Link
                                    href={`/bai-dang/tin-tuc/${item.id}`}
                                    key={index}
                                    className={`${css.hover} flex w-full flex-col gap-3`}
                                >
                                    <div className="flex relative w-full overflow-hidden h-[300px]">
                                        <Image
                                            src={
                                                'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/infographic-cv-2749-20230801030536-e.jpeg'
                                            }
                                            alt=""
                                            className={`${css.img} object-cover`}
                                            fill
                                            sizes="1000000px"
                                        />
                                    </div>
                                    <h3 className={`${css.title} text-[30px] line-clamp-2`}>{item.title}</h3>
                                </Link>
                            ),
                    )}
                    <div className="flex flex-col w-full gap-3">
                        {news.map(
                            (item: any, index: number) =>
                                index > 0 && (
                                    <Link
                                        href={`/bai-dang/tin-tuc/${item.id}`}
                                        key={index}
                                        className={`${css.hover} items-center flex w-full h-max p-4 gap-3 bg-[#F9F9F9]`}
                                    >
                                        <div className={'flex shrink-0 w-[123px] overflow-hidden  h-[76px] relative'}>
                                            <Image
                                                sizes="100000000000000px"
                                                className={`${css.img} object-cover`}
                                                fill
                                                src={
                                                    'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202308/Images/infographic-cv-2749-20230801030536-e.jpeg'
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <h3 className={`${css.title}  text-[16px] line-clamp-2 max-w-[400px]`}>
                                            {item.title}
                                        </h3>
                                    </Link>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}