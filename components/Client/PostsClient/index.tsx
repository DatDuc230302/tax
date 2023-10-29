'use client';

import React, { useEffect, useState } from 'react';
import PostsCategories from '../PostsCategories';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination } from '@nextui-org/react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { FaFlag } from 'react-icons/fa';
import Image from 'next/image';
import { AiOutlineEye } from 'react-icons/ai';
import { useParams, useSearchParams } from 'next/navigation';
import PostClient from '../PostClient';
const list = [
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Đạt',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 20236',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
    {
        title: 'Giảm thuế Giá trị gia tăng từ ngày 01 tháng 07 năm 2023 đến hết ngày 31 tháng 12 năm 2023',
        img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
        content:
            ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
    },
];

export default function PostsClient() {
    const itemsPerPage: number = 5;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(itemsPerPage);
    const [searchValue, setSearchValue] = useState<string>('');
    const [posts, setPosts] = useState<object[]>(list);

    const searchParams = useSearchParams();

    useEffect(() => {
        const newStart = (currentPage - 1) * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
    }, [currentPage]);

    useEffect(() => {
        if (searchValue.length > 0) {
            setPosts(
                list.filter((item: any) => item.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())),
            );
        } else {
            setPosts(list);
        }
    }, [searchValue]);

    return (
        <div className="flex gap-6 px-4 font-roboto min-h-[700px]">
            {searchParams.get('postId') ? (
                <PostClient />
            ) : (
                <>
                    <PostsCategories />
                    <div className="w-full flex flex-col gap-2 pb-[20px]">
                        <div className="justify-between flex flex-col md:flex-row">
                            <h2 className="font-bold text-[26px]">Tất cả bài đăng</h2>
                            <input
                                placeholder="Tìm kiếm tên bài đăng"
                                className="border-[1px] border-[#ccc] rounded-[16px] p-2"
                                type="text"
                                onChange={(e) => setSearchValue(String(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            {posts.slice(start, end).map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="border-[2px] cursor-pointer border-[#eaeaea] w-full rounded-[16px] p-4 flex flex-col"
                                >
                                    <div className="flex w-full justify-between items-center">
                                        <div className="flex gap-2 text-[14px]">
                                            <span>Trần Đức Đạt</span>
                                            <span>Người quản lý</span>
                                        </div>
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
                                    <div className="flex gap-2">
                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-[20px] font-bold line-clamp-2">{item.title}</h2>
                                            <p className="text-[#505050] text-[15px] line-clamp-2">{item.content}</p>
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
                                    </div>
                                    <div className="flex w-full whitespace-nowrap items-center gap-2">
                                        <span className="rounded-[16px] hover:bg-[#bdbdbd] duration-100 ease-linear font-bold py-1 px-2 items-center flex justify-center text-[12px] bg-[#F2F2F2]">
                                            Tin tức
                                        </span>
                                        <span className="text-[12px]">12 ngày trước</span>
                                        <span className="flex gap-1 items-center text-[14px]">
                                            <AiOutlineEye fontSize={18} />0
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <Pagination
                                onChange={setCurrentPage}
                                showControls
                                total={Math.ceil(list.length / 5)}
                                initialPage={1}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
