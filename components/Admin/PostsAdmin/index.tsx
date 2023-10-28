'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button } from '@nextui-org/react';
import ManageCategory from '@/components/Admin/ManageCategory';
import ChangeStatus from '@/components/Admin/ChangeStatus';
import CreatePost from '@/components/Admin/CreatePost';
import UpdatePost from '@/components/Admin/UpdatePost';
import { serverBackend } from '@/server';
import axios from 'axios';
import { formatTime } from '@/functions/formatTime';
import Delete from '../Delete';
import SortPosts from '../SortPosts';
import SnackbarMessage from '@/components/Common/SnackbarMessage';

export default function PostsAdmin() {
    const [posts, setPosts] = useState<object[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [categories, setCategories] = useState<object[]>([]);
    const [parentCategories, setParentCategories] = useState<object[]>([]);
    const [alert, setAlert] = useState<boolean>(false);

    useEffect(() => {
        getPosts();
        getCategories();
    }, [refresh]);

    const getPosts = async () => {
        try {
            const result: any = await axios.get(`${serverBackend}/api/v1/post`);

            if (result.data.message === 'success') {
                setPosts(result.data.data);
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setAlert(true);
            }
        }
    };

    const getCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/category`);
            if (result.data.message === 'success') {
                setCategories(result.data.data);
            }
        } catch (err: any) {
            if (err.message === 'Network Error') {
                setAlert(true);
            }
        }
    };

    const getParentCategories = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/getParentCategory`);
            if (result.data.message === 'success') {
                setParentCategories(result.data.data);
            }
        } catch {}
    };

    return (
        <div className="flex flex-col w-full px-4 gap-4 mt-4">
            {alert && <SnackbarMessage title="Không thể kết nối đến máy chủ" type={4} />}
            <div className="flex gap-3">
                <SortPosts />
                <ManageCategory refresh={refresh} setRefresh={setRefresh}  />
                <CreatePost categories={categories} refresh={refresh} setRefresh={setRefresh} />
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
                                <Delete type="post" idPost={item.id} refresh={refresh} setRefresh={setRefresh}></Delete>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
