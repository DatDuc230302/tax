'use client';

import CreateCategory from '@/components/Admin/CreateCategory';
import { formatTime } from '@/functions/formatTime';
import { serverBackend } from '@/server';
import {
    Button,
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
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import CreateSubCategory from '../CreateSubCategory';
import axios from 'axios';
import UpdateCategoryAndSubCategory from '../UpdateCategoryAndSubCategory';

export default function ManageCategory({ refresh, setRefresh }: { refresh: boolean; setRefresh: any }) {
    const [turn, setTurn] = useState<boolean>(false);
    const [parentCategories, setParentCategories] = useState<object[]>([]);
    const [categories, setCategories] = useState<object[]>([]);

    useEffect(() => {
        getParentCategories();
        getCategories();
    }, [refresh]);

    const getParentCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/getParentCategory`);
            if (result.data.message === 'success') {
                setParentCategories(result.data.data);
            }
        } catch {}
    };

    const getCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/category`);
            if (result.data.message === 'success') {
                setCategories(result.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
    };

    return (
        <>
            <Button
                className="bg-[#2FBD5E] lg:w-[180px] w-[100%] shrink-0 text-white text-[16px]"
                onClick={() => setTurn(true)}
            >
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
                            <Tabs aria-label="Dynamic tabs">
                                <Tab key={'categories'} title={'Thể loại cha'}>
                                    <div className="flex justify-end mb-2">
                                        <CreateCategory refresh={refresh} setRefresh={setRefresh} />
                                    </div>
                                    <Table
                                        aria-label="Example table with client side pagination"
                                        classNames={{
                                            wrapper: 'max-h-[400px]',
                                        }}
                                    >
                                        <TableHeader>
                                            <TableColumn key="name">ID</TableColumn>
                                            <TableColumn key="name">Thể loại cha</TableColumn>
                                            <TableColumn key="created">Ngày tạo</TableColumn>
                                            <TableColumn key="updated">Ngày cập nhật</TableColumn>
                                            <TableColumn key="tools">Công cụ</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {parentCategories.map((item: any, index: number) => (
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
                                                        {item.name !== 'Tin tức' && (
                                                            <UpdateCategoryAndSubCategory
                                                                type="category"
                                                                idCategory={item.id}
                                                                refresh={refresh}
                                                                setRefresh={setRefresh}
                                                            />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Tab>
                                <Tab key={'subCategories'} title={'Thể loại con'}>
                                    <div className="flex w-full justify-end mb-2">
                                        <CreateSubCategory
                                            parentCategories={parentCategories}
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                        />
                                    </div>
                                    <Table
                                        aria-label="Example table with client side pagination"
                                        classNames={{
                                            wrapper: 'max-h-[400px]',
                                        }}
                                    >
                                        <TableHeader>
                                            <TableColumn key="name">ID</TableColumn>
                                            <TableColumn key="name">Thể loại con</TableColumn>
                                            <TableColumn key="parent">Thể loại cha</TableColumn>
                                            <TableColumn key="created">Ngày tạo</TableColumn>
                                            <TableColumn key="updated">Ngày cập nhật</TableColumn>
                                            <TableColumn key="tools">Công cụ</TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {categories.map(
                                                (item: any, index: number) =>
                                                    item.parent_name && (
                                                        <TableRow key={index}>
                                                            <TableCell className="whitespace-nowrap">
                                                                {item.id}
                                                            </TableCell>
                                                            <TableCell className="whitespace-nowrap">
                                                                {item.name}
                                                            </TableCell>
                                                            <TableCell className="whitespace-nowrap">
                                                                {item.parent_name}
                                                            </TableCell>
                                                            <TableCell className="whitespace-nowrap">
                                                                {formatTime(item.created_at)}
                                                            </TableCell>
                                                            <TableCell className="whitespace-nowrap">
                                                                {formatTime(item.updated_at)}
                                                            </TableCell>
                                                            <TableCell className="flex w-[80px] items-center h-full justify-between">
                                                                {item.name !== 'Tin kinh tế' &&
                                                                    item.name !== 'Tin chính trị' &&
                                                                    item.name !== 'Tin về thuế' && (
                                                                        <UpdateCategoryAndSubCategory
                                                                            type="subCategory"
                                                                            idSubCategory={item.id}
                                                                            parentIDSubCategory={item.parent_id}
                                                                            refresh={refresh}
                                                                            setRefresh={setRefresh}
                                                                        />
                                                                    )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                            )}
                                        </TableBody>
                                    </Table>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
