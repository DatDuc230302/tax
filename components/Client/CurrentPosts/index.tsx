'use client';

import { getDays } from '@/functions/getDays';
import { serverBackend } from '@/server';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, usePagination } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaFlag } from 'react-icons/fa';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

export default function CurrentPosts() {
    const itemsPerPage: number = 4;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(itemsPerPage);
    const [posts, setPosts] = useState<object[]>([]);

    useEffect(() => {
        const newStart = (currentPage - 1) * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
    }, [currentPage]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post`);
            if (result.data.message === 'success') {
                setPosts(result.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center my-2 font-merriweather px-4 min-h-[400px]">
            <div className="flex w-wMain flex-col gap-2">
                <h2 className="text-[26px]">Bài viết gần đây</h2>
                <div className="flex w-full gap-3 flex-wrap md:justify-center lg:justify-start lg:flex-nowrap">
                    {posts.slice(start, end).map((item: any, index: number) => (
                        <Link
                            href={`bai-dang?postId=${item.id}`}
                            key={index}
                            className="cursor-pointer flex gap-3 justify-center p-4 md:w-[40%] lg:w-[25%] h-max flex-col rounded-[16px] border-[2px] border-[#e8e8e8]"
                        >
                            <div className="flex justify-end">
                                <Dropdown placement="bottom-end">
                                    <DropdownTrigger>
                                        <i className="p-2 cursor-pointer">
                                            <IoEllipsisHorizontalSharp fontSize={18} />
                                        </i>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Static Actions">
                                        <DropdownItem key="report">
                                            <div className="flex gap-2 items-center">
                                                <FaFlag fontSize={16} />
                                                Báo cáo
                                            </div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <div className="w-full relative h-[150px]">
                                    <Image
                                        src={
                                            'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg'
                                        }
                                        alt=""
                                        fill
                                        sizes="100000px"
                                        className="object-cover rounded-[4px]"
                                    />
                                </div>
                                <h3 className="line-clamp-2 font-bold">{item.title}</h3>
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.content }}
                                    className="font-light line-clamp-3 text-[14px] text-[#767676]"
                                ></div>
                            </div>
                            <div className="flex w-full whitespace-nowrap items-center gap-2">
                                <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                    Tin tức
                                </span>
                                <span className="text-[12px]">{getDays(item.created_at)} ngày trước</span>
                                <span className="flex gap-1 items-center text-[14px]">
                                    <AiOutlineEye fontSize={18} />0
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-end">
                    <Pagination onChange={setCurrentPage} total={Math.ceil(posts.length / 4)} initialPage={1} />
                </div>
            </div>
        </div>
    );
}
