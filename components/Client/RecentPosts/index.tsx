'use client';

import { getDays } from '@/functions/getDays';
import { serverBackend } from '@/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';

export default function RecentPosts({ postsRes }: { postsRes: any }) {
    let recentPosts: any;
    if (postsRes.err === 'None URL') {
        console.log('Check your URL');
        recentPosts = [];
    } else if (postsRes.err === 'None API') {
        console.log('Check your API');
        recentPosts = [];
    } else if (postsRes.message === 'success') {
        recentPosts = postsRes.filter((item: any) => item.status !== 'inactive');
    }

    return (
        <div className="flex justify-center my-2 font-merriweather px-4 min-h-[450px]">
            <div className="flex w-wMain flex-col gap-2">
                <div className="flex justify-between border-b-[2px]">
                    <h2 className="text-[26px]">Bài viết gần đây</h2>
                    <Link
                        href={`/bai-dang`}
                        className="text-[13px] cursor-pointer hover:text-colorLink duration-100 ease-linear"
                    >
                        Xem thêm
                    </Link>
                </div>
                <div className="mt-2 flex w-full gap-3 flex-wrap md:justify-center lg:justify-start lg:flex-nowrap">
                    {recentPosts.map(
                        (item: any, index: number) =>
                            index < 4 &&
                            item.status === 'active' && (
                                <div
                                    key={index}
                                    className="flex gap-3 justify-center p-4 md:w-[40%] lg:w-[25%] h-max flex-col rounded-[16px] border-[2px] border-[#e8e8e8]"
                                >
                                    <Link
                                        href={`bai-dang?postId=${item.id}`}
                                        className="flex cursor-pointer flex-col gap-3"
                                    >
                                        <div className="flex flex-col gap-2 items-center">
                                            <div className="w-full select-none relative h-[150px]">
                                                <Image
                                                    src={`${serverBackend}${item.images}`}
                                                    alt=""
                                                    fill
                                                    sizes="100000px"
                                                    className="object-cover rounded-[4px]"
                                                />
                                            </div>
                                            <h3 className="line-clamp-2 font-bold">{item.title}</h3>
                                            <div className="overflow-hidden font-light line-clamp-3 text-[14px] text-[#767676]">
                                                {item.short_desc}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="flex w-full flex-col whitespace-nowrap gap-2">
                                        <div className="flex gap-2 items-center">
                                            <span className="text-[12px]">{getDays(item.created_at)} ngày trước</span>
                                            <span className="flex gap-1 items-center text-[14px]">
                                                <AiOutlineEye fontSize={18} />
                                                {item.views}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="cursor-pointer rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                {item.parent_name}
                                            </span>
                                            <span className="cursor-pointer rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                {item.category_name}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ),
                    )}
                </div>
            </div>
        </div>
    );
}
