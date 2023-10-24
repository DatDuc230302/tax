'use client';

import CreateCategory from '@/components/Admin/CreateCategory';
import CreateSubCategory from '@/components/Admin/CreateSubCategory';
import { formatTime } from '@/functions/formatTime';
import { serverBackend } from '@/server';
import {
    Button,
    Input,
    Skeleton,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tabs,
    Tooltip,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

export default function ManageCategory({
    categories,
    subCategories,
    refresh,
    setRefresh,
}: {
    categories: object[];
    subCategories: object[];
    refresh: boolean;
    setRefresh: any;
}) {
    const [turn, setTurn] = useState<boolean>(false);
    const searchCategories = (value: string) => {};
    const searchSubCategories = (value: string) => {};

    return (
        <>
            <Button className="bg-[#2FBD5E] w-[170px] text-white text-[16px]" onClick={() => setTurn(true)}>
                Quản lý thể loại
            </Button>
            {turn && (
                <div className="fixed z-30 top-[70px] bg-white bottom-0 left-0 right-0">
                    <div className="flex flex-col px-5 mt-4 w-full">
                        <div className="flex flex-col w-full gap-4 mt-4">
                            <div className="flex w-full justify-end px-3">
                                <Tooltip content="Đóng">
                                    <i onClick={() => setTurn(false)}>
                                        <AiOutlineClose className="cursor-pointer" fontSize={20} />
                                    </i>
                                </Tooltip>
                            </div>
                            <Tabs aria-label="Tabs sizes">
                                <Tab key="Category" title="Thể loại cha">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-3 items-center ">
                                            <Input
                                                onChange={(e) => searchCategories(String(e.target.value))}
                                                label="Tìm kiếm thể loại cha"
                                            />
                                            <CreateCategory refresh={refresh} setRefresh={setRefresh} />
                                        </div>
                                        <Table
                                            aria-label="Example table with client side pagination"
                                            classNames={{
                                                wrapper: 'max-h-[400px]',
                                            }}
                                        >
                                            <TableHeader>
                                                <TableColumn key="ID">ID</TableColumn>
                                                <TableColumn key="name">Tên</TableColumn>
                                                <TableColumn key="created">Ngày tạo</TableColumn>
                                                <TableColumn key="updated">Ngày cập nhật</TableColumn>
                                                <TableColumn key="tools">Công cụ</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {categories.map((item: any, index: number) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="whitespace-nowrap">{item.id}</TableCell>
                                                        <TableCell className="whitespace-nowrap">{item.name}</TableCell>
                                                        <TableCell className="whitespace-nowrap">
                                                            {formatTime(item.created_at)}
                                                        </TableCell>
                                                        <TableCell className="whitespace-nowrap">
                                                            {formatTime(item.updated_at)}
                                                        </TableCell>
                                                        <TableCell className="flex w-[80px] items-center h-full justify-between">
                                                            <BsPencilSquare fontSize={20} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Tab>
                                <Tab key="Subcategory" title="Thể loại con">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-3 items-center ">
                                            <Input label="Tìm kiếm thể loại con" />
                                            <CreateSubCategory
                                                refresh={refresh}
                                                setRefresh={setRefresh}
                                                categories={categories}
                                                subCategories={subCategories}
                                            />
                                        </div>
                                        <Table
                                            classNames={{
                                                wrapper: 'max-h-[400px]',
                                            }}
                                            aria-label="Example table with client side pagination"
                                        >
                                            <TableHeader>
                                                <TableColumn key="ID">ID</TableColumn>
                                                <TableColumn key="name">Tên</TableColumn>
                                                <TableColumn key="name">Thể loại cha</TableColumn>
                                                <TableColumn key="created">Ngày tạo</TableColumn>
                                                <TableColumn key="updated">Ngày cập nhật</TableColumn>
                                                <TableColumn key="tools">Công cụ</TableColumn>
                                            </TableHeader>
                                            <TableBody>
                                                {subCategories.map((item: any, index: number) => (
                                                    <TableRow key={index}>
                                                        <TableCell className="whitespace-nowrap">{item.id}</TableCell>
                                                        <TableCell className="whitespace-nowrap">
                                                            {item.subcategory_name}
                                                        </TableCell>
                                                        <TableCell className="whitespace-nowrap">
                                                            {item.category_name}
                                                        </TableCell>
                                                        <TableCell className="whitespace-nowrap">
                                                            {formatTime(item.created_at)}
                                                        </TableCell>
                                                        <TableCell className="whitespace-nowrap">
                                                            {formatTime(item.updated_at)}
                                                        </TableCell>
                                                        <TableCell className="flex w-[80px] items-center h-full justify-between">
                                                            <BsPencilSquare fontSize={20} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
