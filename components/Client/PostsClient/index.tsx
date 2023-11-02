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
    // Lấy Categroy và SubCategory trên URL
    const searchParams: any = useSearchParams();
    const category: any = searchParams.get('category') ? searchParams.get('category') : null;
    const subCategory: any = searchParams.get('subCategory') ? searchParams.get('subCategory') : null;

    // Phân trang
    const itemsPerPage: number = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(itemsPerPage);
    const [posts, setPosts] = useState<object[]>([]);
    const [initialPost, setInitialPost] = useState<object[]>([]);
    //

    useEffect(() => {
        const newStart = (currentPage - 1) * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
    }, [currentPage]);

    useEffect(() => {
        if (subCategory) {
            setPosts(initialPost.filter((item: any) => removeDiacriticsAndSpaces(item.category_name) === subCategory));
        } else {
            setPosts(initialPost);
        }
    }, [subCategory]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/post`);
            if (result.data.message === 'success') {
                setInitialPost(result.data.data);
                if (subCategory) {
                    setPosts(
                        result.data.data.filter(
                            (item: any) => removeDiacriticsAndSpaces(item.category_name) === subCategory,
                        ),
                    );
                } else {
                    setPosts(result.data.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex w-full gap-6 px-4 font-roboto min-h-[700px]">
            {searchParams.get('postId') ? (
                <PostClient postId={searchParams.get('postId')} />
            ) : (
                <>
                    <PostsCategories />
                    <div className="w-full flex flex-col gap-2 pb-[20px]">
                        <div className="justify-between flex flex-col md:flex-row">
                            <h2 className="font-bold text-[26px]">Bài đăng</h2>
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
                                                key={index}
                                                className="cursor-pointer rounded-[12px] flex-col-reverse md:flex-row flex justify-between gap-4 bg-[#F9F9F9] p-3"
                                            >
                                                <div className="flex flex-col gap-4 justify-center">
                                                    <div className="flex flex-col pr-[20px] gap-2">
                                                        <h3 className="line-clamp-2 font-bold">{item.title}</h3>
                                                        <div
                                                            // dangerouslySetInnerHTML={{ __html: item.content }}
                                                            className="font-light line-clamp-3 text-[14px] text-[#767676]"
                                                        >
                                                            Mới đây, Bộ Tài chính đã có Văn bản số 14246/BTC-CST báo cáo
                                                            Thủ tướng Chính phủ và Công văn số 14247/BTC-CST xin ý kiến
                                                            các bộ, ngành về việc rà soát giảm phí, lệ phí để tháo gỡ
                                                            khó khăn cho đối tượng chịu ảnh hưởng bởi dịch Covid-19 nhằm
                                                            gia hạn thêm 06 tháng đối với các khoản phí, lệ phí đã điều
                                                            chỉnh giảm tại 21 Thông tư ban hành trong năm 2020
                                                        </div>
                                                    </div>
                                                    <div className="flex w-full whdivtespace-nowrap items-center gap-2">
                                                        <span className="text-[12px]">{item.Issuance_date}</span>
                                                        <span className="text-[12px]">Mã: {item.serial_number}</span>
                                                        <span className="flex gap-1 items-center text-[14px]">
                                                            <AiOutlineEye fontSize={18} />0
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-[280px] shrink-0 h-[180px] relative">
                                                    <Image
                                                        src={
                                                            'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202310/Images/dth-1077-20231023104509-e.jpg'
                                                        }
                                                        className="object-cover rounded-[12px]"
                                                        alt=""
                                                        fill
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
