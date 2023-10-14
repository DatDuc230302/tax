'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Tooltip,
} from '@nextui-org/react';
import { BsInfoCircle } from 'react-icons/bs';
import Link from 'next/link';
import ManageCategory from '@/componentsAdmin/ManageCategory/page';
import ChangeStatus from '@/componentsAdmin/ChangeStatus';
import CreatePost from '@/componentsAdmin/CreatePost';
import UpdatePost from '@/componentsAdmin/UpdatePost';
const data = [
    {
        id: '1',
        title: 'Tony Reichert',
        content: 'Dat dep trai',
        category: 'Pháp luật',
        subCategory: 'Hai hước',
        number: '1234',
        data: '15/5',
        status: 'active',
    },
];

export default function Posts() {
    const [posts, setPosts] = useState<object[]>(data);
    const [selection, setSelection] = useState<string>('Tên');
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortCategory, setSortCategory] = useState<string>('Sắp xếp thể loại');
    const [subCategory, setSubCategory] = useState<string>('Sắp xếp thể loại con');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');
    const [turnBoxCategory, setTurnBoxCategory] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);

    useEffect(() => {}, [searchValue]);

    useEffect(() => {}, [sortStatus]);

    useEffect(() => {
        if (sortCategory === 'Sắp xếp thể loại') {
            setSubCategory('Sắp xếp thể loại con');
        }
    }, [sortCategory]);

    return (
        <div className="flex flex-col w-full px-4 py-[20px] gap-4">
            <div className="flex w-full gap-4 flex-col lg:flex-row justify-between">
                <div className="flex justify-center flex-col lg:flex-row items-center gap-4">
                    <div className="flex w-full gap-3 justify-between">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                    variant="flat"
                                >
                                    {sortCategory}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Single selection example" variant="flat">
                                <DropdownItem onClick={() => setSortCategory('Sắp xếp thể loại')} key="text">
                                    Tất cả
                                </DropdownItem>
                                <DropdownItem onClick={() => setSortCategory('Tin tức')} key="text">
                                    Tin tức
                                </DropdownItem>
                                <DropdownItem onClick={() => setSortCategory('Văn bản')} key="text">
                                    Văn bản
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    isDisabled={sortCategory === 'Sắp xếp thể loại' ? true : false}
                                    className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                    variant="flat"
                                >
                                    {subCategory}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Single selection example" variant="flat">
                                <DropdownItem onClick={() => setSubCategory('Sắp xếp thể loại con')} key="text">
                                    Tất cả
                                </DropdownItem>
                                <DropdownItem onClick={() => setSubCategory('Tin tức')} key="text">
                                    Tin tức
                                </DropdownItem>
                                <DropdownItem onClick={() => setSubCategory('Văn bản')} key="text">
                                    Văn bản
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="flex w-full gap-3 justify-between">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                    variant="flat"
                                >
                                    {sortStatus}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Single selection example" variant="flat">
                                <DropdownItem onClick={() => setSortStatus('Sắp xếp trạng thái')}>Tất cả</DropdownItem>
                                <DropdownItem onClick={() => setSortStatus('Hoạt động')}>Hoạt động</DropdownItem>
                                <DropdownItem onClick={() => setSortStatus('Không hoạt động')}>
                                    Không hoạt động
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            onClick={() => setTurnBoxCategory(true)}
                            className="shrink-0 lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                            color="primary"
                        >
                            Quản lý thể loại
                        </Button>
                    </div>
                    <CreatePost />
                </div>
            </div>
            <div className="flex w-full lg:w-[957px] items-center h-full flex-1 relative ">
                <Input
                    onChange={(e) => setSearchValue(String(e.target.value))}
                    className="rounded-none"
                    type="text"
                    placeholder={`Tìm kiếm theo ${selection}`}
                    value={searchValue}
                />
                <div className="absolute right-0">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button variant="flat">{selection}</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                        >
                            <DropdownItem onClick={() => setSelection('Tên')} key="text">
                                Tên
                            </DropdownItem>
                            <DropdownItem onClick={() => setSelection('Email')} key="text">
                                Email
                            </DropdownItem>
                            <DropdownItem onClick={() => setSelection('Số điện thoại')} key="text">
                                Số điện thoại
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <Table
                aria-label="Example table with client side pagination"
                classNames={{
                    wrapper: 'max-h-[400px]',
                }}
            >
                <TableHeader>
                    <TableColumn key="name">Tiêu đề bài viết</TableColumn>
                    <TableColumn key="content">Nội dung</TableColumn>
                    <TableColumn key="category">Thể loại</TableColumn>
                    <TableColumn key="role">Thể loại con</TableColumn>
                    <TableColumn key="status">Số hiệu</TableColumn>
                    <TableColumn key="status">Ngày ban hành</TableColumn>
                    <TableColumn key="status">Trạng thái</TableColumn>
                    <TableColumn key="status">Công cụ</TableColumn>
                </TableHeader>
                <TableBody>
                    {posts.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="flex w-max flex-nowrap">{item.title}</TableCell>
                            <TableCell>{item.content}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.subCategory}</TableCell>
                            <TableCell>15vh</TableCell>
                            <TableCell>15 / 5</TableCell>
                            <TableCell className="w-[170px] shrink-0">
                                {item.status === 'inactive' && (
                                    <div className="select-none w-[140px] text-white flex p-1 items-center justify-center rounded-[50px] bg-[#b1b1b1]">
                                        Không hoạt động
                                    </div>
                                )}
                                {item.status === 'active' && (
                                    <div className="select-none w-[140px] text-white flex p-1 items-center justify-center rounded-[50px]  bg-[#2FBD5E]">
                                        Hoạt động
                                    </div>
                                )}
                            </TableCell>
                            <TableCell className="flex w-[80px] items-center h-full justify-between gap-3">
                                <UpdatePost
                                    oldTitle={item.title}
                                    oldContent={item.content}
                                    oldCategory={item.category}
                                    oldSubCategory={item.subCategory}
                                />
                                <ChangeStatus
                                    type="posts"
                                    status={item.status}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                                <Tooltip content="Xem chi tiết bài viết">
                                    <Link href={`/admin/posts/${item.id}`} className="cursor-pointer">
                                        <BsInfoCircle fontSize={20} />
                                    </Link>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {turnBoxCategory && (
                <div className="fixed z-30 top-[70px] bg-white bottom-0 left-0 right-0">
                    <ManageCategory setTurnBoxCategory={setTurnBoxCategory} />
                </div>
            )}
        </div>
    );
}
