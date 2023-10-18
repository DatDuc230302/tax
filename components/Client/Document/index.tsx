'use client';

import { serverBackend } from '@/server';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Document() {
    const [active, setActive] = useState<number>(0);

    const handleChange = (index: number) => {
        setActive(index);
    };

    const [posts, setPosts] = useState<object[]>([]);
    const [title, setTitle] = useState<string>('');

    const list: any = [
        {
            title: 'Tổng cục Trưởng Mai Xuân Thành gửi thư chúc mừng ngày doanh nhân Việt nam 13/10!',
            serial_number: '04/2007/QH12',
            Issuance_date: '26/05/2015',
        },
        {
            title: 'Tổng cục Trưởng Mai Xuân Thành gửi thư chúc mừng ngày doanh nhân Việt nam 13/10!',
            serial_number: '04/2007/QH12',
            Issuance_date: '26/05/2015',
        },
        {
            title: 'Tổng cục Trưởng Mai Xuân Thành gửi thư chúc mừng ngày doanh nhân Việt nam 13/10!',
            serial_number: '04/2007/QH12',
            Issuance_date: '26/05/2015',
        },
        {
            title: 'Tổng cục Trưởng Mai Xuân Thành gửi thư chúc mừng ngày doanh nhân Việt nam 13/10!',
            serial_number: '04/2007/QH12',
            Issuance_date: '26/05/2015',
        },
    ];

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post`);
            console.log(result);
            if (result.data.message === 'success') {
                setPosts(result.data.data);
                setTitle(result.data.data[0].category_name);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex w-full justify-center py-3">
            <div className="w-[1200px] flex flex-col mt-6">
                <div className=" flex flex-col gap-2 items-center lg:flex-row justify-between">
                    <h2 className="text-[30px]">{title}</h2>
                    <div className="flex gap-2">
                        {posts.map(
                            (item: any, index: number) =>
                                item.category_name === 'Tin tức' && (
                                    <span
                                        onClick={() => handleChange(index)}
                                        className={`${
                                            active === index ? 'text-red-500 ' : 'text-black'
                                        } flex font-bold ease-linear duration-200 cursor-pointer text-[14px] h-full items-center pb-2`}
                                        key={index}
                                    >
                                        {item.subcategory_name}
                                    </span>
                                ),
                        )}
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    {list.map((item: any, index: number) => (
                        <div key={index} className="flex-col flex gap-1 lg:gap-0 lg:flex-row lg:justify-between py-4">
                            <div className="flex items-center h-full gap-6">
                                <Image src="/imgs/posts/document.png" width={37} height={49} alt="" />
                                <Link
                                    href={`/bai-dang/${item.id}`}
                                    className="pr-[10px] flex font-bold cursor-pointer hover:text-red-500 duration-100 ease-linear"
                                >
                                    {item.title}
                                </Link>
                            </div>
                            <div className="flex justify-between md:justify-start lg:justify-start gap-10 flex-shrink-0 ">
                                <div className="flex flex-col w-[200px] whitespace-nowrap">
                                    <span>Số hiệu:</span>
                                    <span className="text-red-500">{item.serial_number}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span>Ngày ban hành:</span>
                                    <span className="text-red-500">{item.Issuance_date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
