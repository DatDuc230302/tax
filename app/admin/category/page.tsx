'use client';

import CreateCategory from '@/componentsAdmin/CreateCategory';
import CreateSubCategory from '@/componentsAdmin/CreateSubCategory';
import { formatTime } from '@/functions/formatTime';
import { serverBackend } from '@/server';
import {
    Button,
    Card,
    CardBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
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
} from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { loadingApi } from '@/functions/loadingApi';

const data = [
    {
        id: '1',
        name: 'Tony Reichert',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        status: 'active',
    },
    {
        id: '1',
        name: 'Tran duc dat',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        status: 'inactive',
    },
];

export default function Category() {
    const [categories, setCategories] = useState<object[]>([]);
    const [subCategories, setSubCategories] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
        getCategories();
        getSubCategories();
    }, [refresh]);

    const getCategories = loadingApi(async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/category`);
            if (result.data.message === 'success') {
                setCategories(result.data.data);
            }
        } catch {
            console.log('Lỗi nè');
        }
    }, setLoading);

    const getSubCategories = loadingApi(async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/subcategory`);
            if (result.data.message === 'success') {
                setSubCategories(result.data.data);
            }
        } catch {
            console.log('Lỗi nè');
        }
    }, setLoading);

    return (
        <div className="flex flex-col px-5 mt-4 w-full">
            {loading ? (
                <div className="mt-4">
                    <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <div className="space-y-3 pt-3">
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-full rounded-lg">
                            <div className="h-3 w-full rounded-lg bg-default-300"></div>
                        </Skeleton>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-full gap-4 mt-4">
                    <Tabs aria-label="Tabs sizes">
                        <Tab key="Category" title="Category">
                            <div className="flex gap-3 items-center ">
                                <Input label="Tìm kiếm thể loại cha" />
                                <CreateCategory refresh={refresh} setRefresh={setRefresh} />
                            </div>
                            <Table
                                className="max-h-[250px] overflow-y-auto"
                                aria-label="Example table with client side pagination"
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
                                                <BsTrash fontSize={20} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Tab>
                        <Tab key="Subcategory" title="Subcategory">
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
                                className="max-h-[250px] overflow-y-auto"
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
                                            <TableCell className="whitespace-nowrap">{item.subcategory_name}</TableCell>
                                            <TableCell className="whitespace-nowrap">{item.category_name}</TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                {formatTime(item.created_at)}
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                {formatTime(item.updated_at)}
                                            </TableCell>
                                            <TableCell className="flex w-[80px] items-center h-full justify-between">
                                                <BsPencilSquare fontSize={20} />
                                                <BsTrash fontSize={20} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Tab>
                    </Tabs>
                </div>
            )}
        </div>
    );
}
