'use client';

import React, { useContext, useEffect, useState } from 'react';
import PostsCategories from '../PostsCategories';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination } from '@nextui-org/react';
import Image from 'next/image';
import { AiOutlineEye } from 'react-icons/ai';
import { useSearchParams } from 'next/navigation';
import PostClient from '../PostClient';
import { serverBackend } from '@/server';
import { getDays } from '@/functions/getDays';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';
import { removeDiacriticsAndSpaces } from '@/functions/removeDiacriticsAndSpaces';
import { ClientContext } from '@/app/(client)/layout';
import { MdChevronRight } from 'react-icons/md';

export default function PostsClient() {
    // Lấy Categroy và SubCategory trên URL
    const searchParams: any = useSearchParams();
    const category: any = searchParams.get('category') ? searchParams.get('category') : null;
    const subCategory: any = searchParams.get('subCategory') ? searchParams.get('subCategory') : null;
    const searchValue: any = searchParams.get('search') ? searchParams.get('search') : null;

    // lẫy dữ liệu
    const dataContext: any = useContext(ClientContext);

    // Phân trang 1
    const itemsPerPage: number = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(itemsPerPage);
    const [posts, setPosts] = useState<any>(dataContext.posts);

    // Phân trang 2
    useEffect(() => {
        const newStart = (currentPage - 1) * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
    }, [currentPage]);

    // Chưa đặt tên
    useEffect(() => {
        setCurrentPage(1);
        if (searchValue) {
            setPosts(
                dataContext.posts.filter((item: any) =>
                    item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
                ),
            );
        } else {
            if (category) {
                if (subCategory) {
                    setPosts(
                        dataContext.posts.filter(
                            (item: any) => removeDiacriticsAndSpaces(item.category_name) === subCategory,
                        ),
                    );
                } else {
                    setPosts(
                        dataContext.posts.filter(
                            (item: any) => removeDiacriticsAndSpaces(item.parent_name) === category,
                        ),
                    );
                }
            } else {
                setPosts(dataContext.posts);
            }
        }
    }, [searchValue, category, subCategory, dataContext.posts]);

    const handleChangePage = (pageNum: number) => {
        setCurrentPage(pageNum);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <div className="flex flex-col lg:flex-row w-full gap-6 px-4 font-roboto">
                {searchParams.get('postId') ? (
                    <PostClient postId={searchParams.get('postId')} />
                ) : (
                    <>
                        <div className="flex justify-center md:justify-start">
                            <PostsCategories />
                        </div>
                        <div className="w-full flex flex-col gap-2 pb-[20px] min-h-[700px] justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center flex-col md:flex-row">
                                    <h2 className="font-bold text-[26px]">Bài đăng </h2>
                                    {searchValue && (
                                        <div className="flex items-center">
                                            <MdChevronRight fontSize={20} />
                                            <div className="flex gap-2">
                                                <span>Tìm kiếm:</span>
                                                <span>{searchValue}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {posts.length === 0 && <div className="">Không có dữ liệu</div>}
                                <div className="flex flex-col gap-4">
                                    {posts.slice(start, end).map(
                                        (item: any, index: number) =>
                                            item.status === 'active' && (
                                                <div
                                                    key={index}
                                                    className="border-[2px] gap-3 border-[#eaeaea] w-full rounded-[16px] p-4 flex flex-col"
                                                >
                                                    <Link
                                                        href={`/bai-dang?postId=${item.id}`}
                                                        key={index}
                                                        className="cursor-pointer rounded-[12px] flex-col-reverse md:flex-row flex justify-between gap-4 bg-[#F9F9F9] p-3"
                                                    >
                                                        <div className="flex flex-col gap-4 justify-center">
                                                            <div className="flex flex-col pr-[20px] gap-2">
                                                                {item.parent_name !== 'Video' && (
                                                                    <h3 className="line-clamp-2 font-bold">
                                                                        {item.title}
                                                                    </h3>
                                                                )}
                                                                <span className="font-light line-clamp-3 text-[14px] text-[#767676]">
                                                                    {item.short_desc}
                                                                </span>
                                                            </div>
                                                            <div className="flex w-full whdivtespace-nowrap items-center gap-2">
                                                                {item.parent_name !== 'Video' && (
                                                                    <span className="text-[12px]">
                                                                        {item.Issuance_date}
                                                                    </span>
                                                                )}
                                                                {item.parent_name !== 'Video' && item.serial_number && (
                                                                    <span className="text-[12px]">
                                                                        Mã: {item.serial_number}
                                                                    </span>
                                                                )}
                                                                <span className="flex gap-1 items-center text-[14px]">
                                                                    <AiOutlineEye fontSize={18} /> {item.views}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="w-full md:w-[280px] shrink-0 h-[180px] relative">
                                                            {item.parent_name !== 'Video' && (
                                                                <Image
                                                                    src={`${serverBackend}/${item.images}`}
                                                                    className="object-cover rounded-[12px]"
                                                                    alt=""
                                                                    fill
                                                                    sizes="100000px"
                                                                />
                                                            )}
                                                            {item.parent_name === 'Video' && (
                                                                <iframe
                                                                    className="select-none"
                                                                    allowFullScreen={true}
                                                                    width="100%"
                                                                    height="150"
                                                                    src={`https://www.youtube.com/embed/${item.content}?si=fo9sSxzqp_r6LJ2z`}
                                                                ></iframe>
                                                            )}
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
                                                    </div>
                                                </div>
                                            ),
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end pb-4">
                                {posts.length > 5 && (
                                    <Pagination
                                        onChange={(e) => handleChangePage(e)}
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
        </>
    );
}
