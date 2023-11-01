'use client';

import React, { useEffect, useState } from 'react';
import PostsCategories from '../PostsCategories';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination } from '@nextui-org/react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { FaFlag } from 'react-icons/fa';
import Image from 'next/image';
import { AiOutlineEye } from 'react-icons/ai';
import { useSearchParams } from 'next/navigation';
import PostClient from '../PostClient';
import axios from 'axios';
import { serverBackend } from '@/server';
import { getDays } from '@/functions/getDays';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';
import { removeDiacriticsAndSpaces } from '@/functions/removeDiacriticsAndSpaces';

export default function PostsClient() {
    const searchParams: any = useSearchParams();
    const itemsPerPage: number = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(itemsPerPage);
    const [posts, setPosts] = useState<object[]>([]);
    const [initialPost, setInitialPost] = useState<object[]>([]);
    const category = searchParams.get('category') ? searchParams.get('category') : null;
    const subCategory = searchParams.get('subCategory') ? searchParams.get('subCategory') : null;

    

    useEffect(() => {
        const newStart = (currentPage - 1) * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
    }, [currentPage]);

    useEffect(() => {
        if (category) {
            if (subCategory) {
                setPosts(
                    initialPost.filter(
                        (item: any) =>
                            removeDiacriticsAndSpaces(item.parent_name) === category &&
                            removeDiacriticsAndSpaces(item.category_name) === subCategory,
                    ),
                );
            } else {
                setPosts(initialPost.filter((item: any) => removeDiacriticsAndSpaces(item.parent_name) === category));
            }
        } else {
            setPosts(initialPost);
        }
    }, [searchParams.get('category'), searchParams.get('subCategory')]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post`);
            if (result.data.message === 'success') {
                setPosts(result.data.data);
                setInitialPost(result.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex gap-6 px-4 font-roboto min-h-[700px]">
            {searchParams.get('postId') ? (
                <PostClient postId={searchParams.get('postId')} />
            ) : (
                <>
                    <PostsCategories />
                    <div className="w-full flex flex-col gap-2 pb-[20px]">
                        <div className="justify-between flex flex-col md:flex-row">
                            <h2 className="font-bold text-[26px]">Tất cả bài đăng</h2>
                        </div>
                        <div className="flex flex-col gap-4">
                            {posts.slice(start, end).map(
                                (item: any, index: number) =>
                                    item.status === 'active' && (
                                        <div
                                            key={index}
                                            className="border-[2px] gap-3 border-[#eaeaea] w-full rounded-[16px] p-4 flex flex-col"
                                        >
                                            <div className="flex w-full justify-between items-center">
                                                <div></div>
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
                                            <Link
                                                href={`/bai-dang?postId=${item.id}`}
                                                className="flex gap-2 cursor-pointer"
                                            >
                                                <div className="flex flex-col justify-center">
                                                    <h2 className="text-[20px] font-bold line-clamp-2">{item.title}</h2>
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                                        className="font-light line-clamp-3 text-[14px] text-[#767676]"
                                                    ></div>
                                                </div>
                                                <div className="shrink-0 relative w-[200px] h-[120px]">
                                                    <Image
                                                        className="rounded-[15px]"
                                                        src={item.img}
                                                        fill
                                                        alt=""
                                                        sizes="100000px"
                                                    />
                                                </div>
                                            </Link>
                                            <div className="flex w-full whitespace-nowrap items-center gap-2">
                                                <div className="flex gap-2 items-center">
                                                    <span className="rounded-[16px] cursor-pointer hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                        {item.parent_name}
                                                    </span>
                                                    <BiChevronRight fontSize={14} />
                                                    {item.category_name && (
                                                        <span className="rounded-[16px] cursor-pointer hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                                            {item.category_name}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-[12px]">
                                                    {getDays(item.created_at)} ngày trước
                                                </span>
                                                <span className="flex gap-1 items-center text-[14px]">
                                                    <AiOutlineEye fontSize={18} />0
                                                </span>
                                            </div>
                                        </div>
                                    ),
                            )}
                        </div>
                        <div className="flex justify-end">
                            {posts.length > 5 && (
                                <Pagination
                                    onChange={setCurrentPage}
                                    showControls
                                    total={Math.ceil(posts.length / 5)}
                                    initialPage={1}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
