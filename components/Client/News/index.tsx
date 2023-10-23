'use client';

import React, { useEffect, useState } from 'react';
import css from './News.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { serverBackend } from '@/server';
import { Card, Skeleton } from '@nextui-org/react';
import { loadingApi } from '@/functions/loadingApi';
import { removeDuplicates } from '@/functions/removeDuplicates';

export default function News() {
    const [news, setNews] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [subCategories, setSubCategories] = useState<object[]>([]);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = loadingApi(async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/postByCategory/2`);
            if (result.data.message === 'success') {
                setNews(result.data.data);
                setSubCategories(removeDuplicates(result.data.data, 'subcategory_name'));
            }
        } catch (err) {
            console.log(err);
        }
    }, setLoading);

    return (
        <div className="flex justify-center px-4 my-3">
            <div className="flex w-[1200px] flex-col my-2 font-merriweather">
                {loading ? (
                    <Card className="w-full space-y-5 p-4" radius="lg">
                        <Skeleton className="rounded-lg h-[300px]">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 h-[20px] rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 h-[20px]  rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 h-[20px]  rounded-lg">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>
                ) : (
                    <>
                        <div className="flex justify-between border-b-[2px] pb-4 border-[#eaeaea]">
                            <h1 className="text-[30px]">Tin tức sự kiện</h1>
                            <div className="flex gap-3 items-center">
                                {subCategories.map((item: any, index) => (
                                    <span
                                        key={index}
                                        className="cursor-pointer text-[14px] hover:text-red-500 duration-100 ease-linear"
                                    >
                                        {item.subcategory_name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row mt-3 w-full gap-3">
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
                                                <h3 className={`${css.title}  text-[16px] line-clamp-2 max-w-[400px]`}>
                                                    {item.title}
                                                </h3>
                                            </Link>
                                        ),
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
