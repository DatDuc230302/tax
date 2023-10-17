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
    Chip,
} from '@nextui-org/react';
import { BsInfoCircle } from 'react-icons/bs';
import Link from 'next/link';
import ManageCategory from '@/components/Admin/ManageCategory/page';
import ChangeStatus from '@/components/Admin/ChangeStatus';
import CreatePost from '@/components/Admin/CreatePost';
import UpdatePost from '@/components/Admin/UpdatePost';
import { serverBackend } from '@/server';
import axios from 'axios';
import { formatTime } from '@/functions/formatTime';
import Delete from '../Delete';

export default function PostsAdmin() {
    const [posts, setPosts] = useState<object[]>([]);
    const [selection, setSelection] = useState<string>('Tên');
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortCategory, setSortCategory] = useState<string>('Sắp xếp thể loại');
    const [subCategory, setSubCategory] = useState<string>('Sắp xếp thể loại con');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');
    const [turnBoxCategory, setTurnBoxCategory] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [categories, setCategories] = useState<object[]>([]);
    const [subCategories, setSubCategories] = useState<object[]>([]);

    useEffect(() => {
        getPosts();
        getCategories();
        getSubCategories();
    }, [refresh]);

    const getPosts = async () => {
        try {
            const result: any = await axios.get(`${serverBackend}/api/v1/post`);

            if (result.data.message === 'success') {
                setPosts(result.data.data);
            }
        } catch {
            console.log('Error');
        }
    };

    const getCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/category`);
            if (result.data.message === 'success') {
                setCategories(result.data.data);
            }
        } catch {
            console.log('Lỗi nè');
        }
    };

    const getSubCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/subcategory`);
            if (result.data.message === 'success') {
                setSubCategories(result.data.data);
            }
        } catch {
            console.log('Lỗi nè');
        }
    };

    return (
        <div className="flex flex-col w-full px-4 py-[20px] gap-4 mt-4">
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
                    <CreatePost refresh={refresh} setRefresh={setRefresh} subCategories={subCategories} />
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
                    <TableColumn key="category">Thể loại cha</TableColumn>
                    <TableColumn key="role">Thể loại con</TableColumn>
                    <TableColumn key="status">Số hiệu</TableColumn>
                    <TableColumn key="status">Ngày ban hành</TableColumn>
                    <TableColumn key="status">Ngày tạo</TableColumn>
                    <TableColumn key="status">Ngày cập nhật</TableColumn>
                    <TableColumn key="status">Trạng thái</TableColumn>
                    <TableColumn key="status">Công cụ</TableColumn>
                </TableHeader>
                <TableBody>
                    {posts.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                <div className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                                    {item.title}
                                </div>
                            </TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">
                                <Chip size="md" color="primary">
                                    Nội dung
                                </Chip>
                            </TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">{item.category_name}</TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">{item.subcategory_name}</TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">
                                {item.serial_number ? item.serial_number : 'null'}
                            </TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">{item.Issuance_date}</TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">{formatTime(item.created_at)}</TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">{formatTime(item.updated_at)}</TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">
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
                            <TableCell className="w-[200px] flex gap-3 whitespace-nowrap">
                                <UpdatePost
                                    oldTitle={item.title}
                                    oldContent={item.content}
                                    oldCategory={item.category_name}
                                    oldSubCategory={item.subcategory_name}
                                    img={'/imgs/avatar.jpg'}
                                    categories={categories}
                                    subCategories={subCategories}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                                <ChangeStatus type="post" idPost={item.id} refresh={refresh} setRefresh={setRefresh} />
                                <Delete type="post" idPost={item.id} refresh={refresh} setRefresh={setRefresh}></Delete>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {turnBoxCategory && (
                <div className="fixed z-30 top-[70px] bg-white bottom-0 left-0 right-0">
                    <ManageCategory
                        categories={categories}
                        subCategories={subCategories}
                        refresh={refresh}
                        setRefresh={setRefresh}
                        setTurnBoxCategory={setTurnBoxCategory}
                    />
                </div>
            )}
        </div>
    );
}
