'use client';

import React, { useEffect, useState } from 'react';
import css from './HotPosts.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { serverBackend } from '@/server';
import { Card, Skeleton } from '@nextui-org/react';
import { loadingApi } from '@/functions/loadingApi';
import { removeDuplicates } from '@/functions/removeDuplicates';
import SnackbarMessage from '@/components/Common/SnackbarMessage';
import { AiOutlineEye } from 'react-icons/ai';

const data = [
    {
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
    },
    {
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
    },
    {
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
    },
    {
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
    },
    {
        title: 'Công bố quyết định điều động, bổ nhiệm Cục trưởng Cục Thuế TP. Hồ Chí Minh',
    },
];

export default function HotPosts() {
    const [news, setNews] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [networkError, setNetworkError] = useState<boolean>(false);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = loadingApi(async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/postByCategory/2`);
            if (result.data.message === 'success') {
                setNews(result.data.data);
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setNetworkError(true);
            }
        }
    }, setLoading);

    return (
        <div className="flex justify-center pt-8 px-4">
            {networkError && <SnackbarMessage title="Không thể kết nối đến máy chủ" type={4} />}
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
                        <div className="flex justify-between border-b-[2px] pb-3 border-[#eaeaea]">
                            <h1 className="text-[26px] line-clamp-2">Bài viết nổi bật</h1>
                        </div>
                        <div className="flex flex-col lg:flex-row mt-3 w-full gap-3">
                            {data.map(
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
                                            <div className="flex flex-col gap-2">
                                                <h3 className={`${css.title} text-[26px] line-clamp-2`}>
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                        Tin tức
                                                    </span>
                                                    <span className="text-[12px]">12 ngày trước</span>
                                                    <span className="flex gap-1 items-center text-[14px]">
                                                        <AiOutlineEye fontSize={18} />0
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ),
                            )}
                            <div className="flex flex-col w-full gap-3">
                                {data.map(
                                    (item: any, index: number) =>
                                        index > 0 &&
                                        index < 5 && (
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
                                                <div className="flex flex-col gap-2">
                                                    <h3 className={`${css.title} text-[14px] line-clamp-2`}>
                                                        {item.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                            Tin tức
                                                        </span>
                                                        <span className="text-[12px]">12 ngày trước</span>
                                                        <span className="flex gap-1 items-center text-[14px]">
                                                            <AiOutlineEye fontSize={18} />0
                                                        </span>
                                                    </div>
                                                </div>
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
