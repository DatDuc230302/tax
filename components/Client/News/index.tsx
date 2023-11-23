'use client';

import { removeDuplicates } from '@/functions/removeDuplicates';
import { serverBackend } from '@/server';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';

export default function News({ posts }: { posts: any }) {
    const [news, setNews] = useState<any>(posts.filter((item: any) => item.parent_name === 'Tin tức'));

    const [subCategory, setSubCategory] = useState<string>('Tất cả');
    const [active, setActive] = useState<number>(-1);

    useEffect(() => {
        if (subCategory === 'Tất cả') {
            setNews(posts);
        } else {
            setNews(posts.filter((item: any) => item.category_name === subCategory));
        }
    }, [subCategory]);

    const onclickSubCategory = (name: string, indexActive: number) => {
        setSubCategory(name);
        setActive(indexActive);
    };

    return (
        <div className="flex justify-center font-merriweather min-h-[450px] px-4 py-2">
            <div className="w-wMain flex flex-col gap-4">
                <div className="flex justify-between items-center border-b-[2px]">
                    <h2 className="text-[26px]">Tin tức</h2>
                    <div className="hidden sm:flex gap-3 text-[13px]">
                        <h4
                            onClick={() => onclickSubCategory('Tất cả', -1)}
                            className={`${
                                active === -1 && 'text-red-500'
                            } cursor-pointer text-[#414141] hover:text-red-500 duration-200 ease-linear`}
                        >
                            Tất cả
                        </h4>
                        {removeDuplicates(posts, 'category_name').map((item: any, index: number) => (
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
                                            <div className="font-light line-clamp-3 text-[14px] text-[#767676]">
                                                {item.short_desc}
                                            </div>
                                        </div>
                                        <div className="flex w-full whdivtespace-nowrap items-center gap-2">
                                            <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                {item.category_name}
                                            </span>
                                            <span className="text-[12px]">{item.Issuance_date}</span>
                                            {item.serial_number && (
                                                <span className="text-[12px]">Mã: {item.serial_number}</span>
                                            )}
                                            <span className="flex gap-1 items-center text-[14px]">
                                                <AiOutlineEye fontSize={18} />0
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-[280px] shrink-0 h-[180px] relative">
                                        <Image
                                            src={`${serverBackend}${item.images}`}
                                            className="object-cover rounded-[12px]"
                                            alt=""
                                            fill
                                            sizes="100000px"
                                        />
                                    </div>
                                </Link>
                            ),
                    )}
                </div>
            </div>
        </div>
    );
}
