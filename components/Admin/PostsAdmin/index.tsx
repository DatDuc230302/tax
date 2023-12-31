'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button } from '@nextui-org/react';
import ChangeStatus from '@/components/Admin/ChangeStatus';
import UpdatePost from '@/components/Admin/UpdatePost';
import { serverBackend } from '@/server';
import axios from 'axios';
import { formatTime } from '@/functions/formatTime';
import Delete from '../Delete';
import PostsToolsAdmin from '../PostsToolsAdmin';

export default function PostsAdmin() {
    const [initialPosts, setInitialPosts] = useState<object[]>([]);
    const [posts, setPosts] = useState<object[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [categories, setCategories] = useState<object[]>([]);
    const [parentCategories, setParentCategories] = useState<object[]>([]);

    useEffect(() => {
        getPosts();
        getCategories();
        getParentCategories();
    }, [refresh]);

    useEffect(() => {
        document.title = 'Quản lý bài viết';
    }, []);

    const getPosts = async () => {
        try {
            const result: any = await axios.get(`${serverBackend}/api/v1/post`);

            if (result.data.message === 'success') {
                setPosts(result.data.data);
                setInitialPosts(result.data.data);
            }
        } catch (err: any) {
            console.log(err);
        }
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

    const getParentCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/getParentCategory`);
            if (result.data.message === 'success') {
                setParentCategories(result.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col w-full px-4 gap-4 mt-4">
            <div className="flex gap-3 flex-col-reverse lg:flex-row">
                <PostsToolsAdmin
                    setPosts={setPosts}
                    initialPosts={initialPosts}
                    parentCategories={parentCategories}
                    categories={categories}
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
                    <TableColumn key="id">ID</TableColumn>
                    <TableColumn key="name">Tiêu đề bài viết</TableColumn>
                    <TableColumn key="short_desc">Mô tả ngắn</TableColumn>
                    <TableColumn key="content">Nội dung</TableColumn>
                    <TableColumn key="category">Thể loại cha</TableColumn>
                    <TableColumn key="role">Thể loại con</TableColumn>
                    <TableColumn key="serial">Số hiệu</TableColumn>
                    <TableColumn key="issuance">Ngày ban hành</TableColumn>
                    <TableColumn key="created">Ngày tạo</TableColumn>
                    <TableColumn key="updated">Ngày cập nhật</TableColumn>
                    <TableColumn key="status">Trạng thái</TableColumn>
                    <TableColumn key="tools">Công cụ</TableColumn>
                </TableHeader>
                <TableBody>
                    {posts.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="whitespace-nowrap w-[170px]">{item.id}</TableCell>
                            <TableCell>
                                <div className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                                    {item.title}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                                    {item.short_desc}
                                </div>
                            </TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">
                                <Chip size="md" color="primary">
                                    Nội dung
                                </Chip>
                            </TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">{item.parent_name}</TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">{item.category_name}</TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">
                                {item.serial_number ? item.serial_number : 'Trống'}
                            </TableCell>
                            <TableCell className="w-[200px] whitespace-nowrap">
                                {item.Issuance_date ? item.Issuance_date : 'Trống'}
                            </TableCell>
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
                                    id={item.id}
                                    oldTitle={item.title}
                                    oldContent={item.content}
                                    oldShortDesc={item.short_desc}
                                    oldCategory={item.parent_name}
                                    oldSubCategory={item.category_name}
                                    oldCategoryID={item.category_id}
                                    oldserial={item.serial_number}
                                    oldissuance={item.Issuance_date}
                                    oldFilesArr={item.file ? item.file.split(',') : []}
                                    oldImageBase={item.images}
                                    categories={categories}
                                    parentCategories={parentCategories}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />

                                <ChangeStatus
                                    type="post"
                                    idPost={item.id}
                                    status={item.status}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                                {item.status === 'inactive' && (
                                    <Delete
                                        type="post"
                                        idPost={item.id}
                                        refresh={refresh}
                                        setRefresh={setRefresh}
                                    ></Delete>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
