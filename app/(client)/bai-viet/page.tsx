'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface items {
    title: string;
    slug: string;
}

const listPosts: items[] = [
    {
        title: 'Luật',
        slug: 'luat',
    },
    {
        title: 'Nghị định',
        slug: 'nghi-dinh',
    },
    {
        title: 'Thông tư',
        slug: 'thong-tu',
    },
    {
        title: 'Hướng dẫn của bộ tài chính',
        slug: 'huong-dan',
    },
    {
        title: 'Thuế giá trị gia tăng (GTGT)',
        slug: 'thue-gia-tri',
    },
    {
        title: 'Hướng dẫn của Tổng cục thuế',
        slug: 'tong-cuc-thue',
    },
];

export default function Posts() {
    const [active, setActive] = useState<number>(0);

    const handleChange = (index: number) => {
        setActive(index);
    };

    const arr: number[] = [1, 2, 3, 4, 5, 6];

    return (
        <div className="flex flex-col mt-6">
            <div className=" flex flex-col gap-2 items-center lg:flex-row justify-between">
                <h2 className="text-[30px]">Bài viết</h2>
                <div className="flex gap-2">
                    {listPosts.map((item: items, index: number) => (
                        <span
                            onClick={() => handleChange(index)}
                            className={`${
                                active === index ? 'text-red-500 ' : 'text-black'
                            } flex font-bold ease-linear duration-200 cursor-pointer text-[14px] h-full items-center pb-2`}
                            key={index}
                        >
                            {item.title}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex flex-col mt-4">
                {arr.map((item: number) => (
                    <div key={item} className="flex-col flex gap-1 lg:gap-0 lg:flex-row lg:justify-between py-4">
                        <div className="flex items-center h-full gap-6">
                            <Image src="/imgs/posts/document.png" width={37} height={49} alt="" />
                            <Link
                                href={`/bai-viet/${1}`}
                                className="pr-[10px] flex font-bold cursor-pointer hover:text-red-500 duration-100 ease-linear"
                            >
                                Luật thuế thu nhập cá nhân số 04/2007/QH12 của Quốc hội Luật thuế thu nhập cá nhân số
                            </Link>
                        </div>
                        <div className="flex justify-between md:justify-start lg:justify-start gap-10 flex-shrink-0 ">
                            <div className="flex flex-col">
                                <span>Số hiệu:</span>
                                <span className="text-red-500">04/2007/QH12</span>
                            </div>
                            <div className="flex flex-col">
                                <span>Ngày ban hành:</span>
                                <span className="text-red-500">04/12/2015</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
