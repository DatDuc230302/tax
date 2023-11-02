'use client';

import React, { useEffect, useState } from 'react';
import css from './HotPosts.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { serverBackend } from '@/server';
import { AiOutlineEye } from 'react-icons/ai';

export default function HotPosts() {
    const [hotPosts, setHotPosts] = useState<object[]>([]);
    const [news, setNews] = useState<object[]>([]);

    useEffect(() => {
        getHotPosts();
    }, []);

    const getHotPosts = async () => {
        try {
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center px-4 py-4 min-h-[450px]">
            <div className="flex w-wMain flex-col my-2 font-merriweather">
                <>
                    <div className="flex justify-between border-b-[2px] items-center border-[#eaeaea]">
                        <h1 className="text-[26px] line-clamp-2">Bài viết nổi bật</h1>
                        <Link href={'/bai-dang'} className="cursor-pointer text-[13px]">
                            Xem thêm
                        </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row mt-3 w-full gap-3">
                        {hotPosts.map(
                            (item: any, index: number) =>
                                index === 0 && (
                                    <span key={index} className={`${css.hover} flex w-full flex-col gap-3`}>
                                        <div className="flex relative w-full overflow-hidden h-[420px]">
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
                                        <div className="flex flex-col gap-2">
                                            <h3 className={`${css.title} text-[26px] line-clamp-2`}>{item.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                Tin tức
                                            </span>
                                            <span className="text-[12px]">23/01/2023</span>
                                            <span className="flex gap-1 items-center text-[14px]">
                                                <AiOutlineEye fontSize={18} />0
                                            </span>
                                        </div>
                                    </span>
                                ),
                        )}
                        <div className="flex flex-col w-full gap-3">
                            {hotPosts.map(
                                (item: any, index: number) =>
                                    index > 0 &&
                                    index < 5 && (
                                        <span
                                            key={index}
                                            className={`${css.hover} flex w-full h-max p-4 flex-col gap-3 bg-[#F9F9F9]`}
                                        >
                                            <div className="flex gap-3 items-center">
                                                <div
                                                    className={
                                                        'flex shrink-0 w-[123px] overflow-hidden  h-[76px] relative'
                                                    }
                                                >
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
                                                <div className="flex flex-col gap-2">
                                                    <h3 className={`${css.title} text-[14px] line-clamp-2`}>
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-start gap-2">
                                                <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                    Tin tức
                                                </span>
                                                <span className="text-[12px]">23/01/2023</span>
                                                <span className="flex gap-1 items-center text-[14px]">
                                                    <AiOutlineEye fontSize={18} />0
                                                </span>
                                            </div>
                                        </span>
                                    ),
                            )}
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}
