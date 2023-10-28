'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, usePagination } from '@nextui-org/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { FaFlag } from 'react-icons/fa';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';

export default function CurrentPosts() {
    const list = [
        {
            title: '1',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '2',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '3',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '4',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '5',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '6',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '7',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '8',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '9',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
        {
            title: '10',
            img: 'https://media.hcmtax.gov.vn/Media/1_HCMTAX/FolderFunc/202303/Images/123-20230313111341-e.jpg',
            content:
                ' Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền AutheAuthentication và  Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp',
        },
    ];

    const itemsPerPage: number = 4;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [start, setStart] = useState<number>(0);
    const [end, setEnd] = useState<number>(itemsPerPage);

    useEffect(() => {
        const newStart = (currentPage - 1) * itemsPerPage;
        const newEnd = newStart + itemsPerPage;
        setStart(newStart);
        setEnd(newEnd);
    }, [currentPage]);

    return (
        <div className="flex justify-center my-2 font-merriweather px-4">
            <div className="flex w-wMain flex-col gap-2">
                <h2 className="text-[26px]">Bài viết gần đây</h2>
                <div className="flex w-full gap-3 flex-wrap md:justify-center lg:justify-start lg:flex-nowrap">
                    {list.slice(start, end).map((item: any, index: number) => (
                        <div
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
                                        src={item.img}
                                        alt=""
                                        fill
                                        sizes="100000px"
                                        className="object-cover rounded-[4px]"
                                    />
                                </div>
                                <h3 className="line-clamp-2 font-bold">{item.title}</h3>
                                <span className="text-[14px] text-[#505050] line-clamp-2 max-w-[800px]">
                                    {item.content}
                                </span>
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
                        total={Math.ceil(list.length / 4)}
                        initialPage={1}
                    />
                </div>
            </div>
        </div>
    );
}
