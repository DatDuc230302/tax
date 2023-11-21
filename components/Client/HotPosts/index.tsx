'use client';

import React from 'react';
import css from './HotPosts.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { serverBackend } from '@/server';
import { AiOutlineEye } from 'react-icons/ai';
import { descViews } from '@/functions/descViews';

export default function HotPosts({ posts }: { posts: any }) {
    let hotPosts: any = descViews(posts);

    return (
        <div className="flex justify-center px-4 py-4 min-h-[450px]">
            <div className="flex w-wMain flex-col my-2 font-merriweather">
                <>
                    <div className="flex justify-between border-b-[2px] items-center">
                        <h1 className="text-[26px] line-clamp-2">Bài viết nổi bật</h1>
                        <Link
                            href={'/bai-dang'}
                            className="cursor-pointer text-[13px] hover:text-colorLink duration-100 ease-linear"
                        >
                            Xem thêm
                        </Link>
                    </div>
                    <div className="flex flex-col lg:flex-row mt-3 w-full gap-3">
                        {hotPosts.map(
                            (item: any, index: number) =>
                                index === 0 && (
                                    <Link
                                        href={`/bai-dang?postId=${item.id}`}
                                        key={index}
                                        className={`${css.hover} flex w-full flex-col gap-3`}
                                    >
                                        <div className="flex relative w-full overflow-hidden h-[420px]">
                                            <Image
                                                src={`${serverBackend}${item.images}`}
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
                                                {item.parent_name}
                                            </span>
                                            <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                {item.category_name}
                                            </span>
                                            <span className="text-[12px]">{item.Issuance_date}</span>
                                            <span className="flex gap-1 items-center text-[14px]">
                                                <AiOutlineEye fontSize={18} />
                                                {item.views}
                                            </span>
                                        </div>
                                    </Link>
                                ),
                        )}
                        <div className="flex flex-col w-full gap-3">
                            {hotPosts.map(
                                (item: any, index: number) =>
                                    index > 0 &&
                                    index < 5 && (
                                        <Link
                                            href={`/bai-dang?postId=${item.id}`}
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
                                                        src={`${serverBackend}${item.images}`}
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
                                                    {item.parent_name}
                                                </span>
                                                <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                    {item.category_name}
                                                </span>
                                                <span className="text-[12px]">{item.Issuance_date}</span>
                                                <span className="flex gap-1 items-center text-[14px]">
                                                    <AiOutlineEye fontSize={18} />
                                                    {item.views}
                                                </span>
                                            </div>
                                        </Link>
                                    ),
                            )}
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
}
