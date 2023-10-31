'use client';
import { BsInfoCircle } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Tooltip } from '@nextui-org/react';
import { serverBackend } from '@/server';
import axios from 'axios';
const data = [
    {
        id: '1',
        nameAccount: 'Đạt',
        namePost: 'Báo cáo tài chính',
        action: 'Cập nhật',
        date: '15/5',
    },
    {
        id: '2',
        nameAccount: 'Hào',
        namePost: 'Văn bản hành chính',
        action: 'Chuyển trạng thái',
        date: '15/5',
    },
];
export default function TrashAdmin() {
    const [postTrash, setPostTrash] = useState([]);
    const [userTrash, setUserTrash] = useState([]);

    useEffect(() => {
        axios
            .get(`${serverBackend}/api/v1/posts/trashed`)
            .then((response) => {
                setPostTrash(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching post history:', error);
            });

        axios
            .get(`${serverBackend}/api/v1/trashed`)
            .then((response) => {
                setUserTrash(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user history:', error);
            });
    }, []);
    return (
        <div className="flex flex-col p-4">
            <Tabs aria-label="Dynamic tabs">
                <Tab key={'Accounts'} title={'Bài đăng'}>
                     <Table
                        aria-label="Example table with client side pagination"
                        classNames={{
                            wrapper: 'max-h-[400px]',
                        }}
                    >
                    <TableHeader>
                            <TableColumn key="name">Tiêu đề bài viết</TableColumn>
                            <TableColumn key="email">nội dung</TableColumn>
                            <TableColumn key="email">Ảnh đại diện</TableColumn>
                            <TableColumn key="email">Số hiệu</TableColumn>
                            <TableColumn key="phone">Ngày ban hành</TableColumn>
                            <TableColumn key="role">file</TableColumn>
                            <TableColumn key="role">ngày xóa</TableColumn>
                            <TableColumn key="role">Công cụ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {postTrash.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <span className="w-[280px] line-clamp-1">{item.title}</span>
                                    </TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.content}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.images}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.serial_number}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.Issuance_date}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.file}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.deleted_at}</TableCell>
                                    <TableCell>
                                        <div className='className="w-[170px] text-center whitespace-nowrap flex gap-2'>
                                            <Tooltip content="Xem chi tiết dữ liệu">
                                                <i className="cursor-pointer">
                                                    <BsInfoCircle fontSize={20} />
                                                </i>
                                            </Tooltip>
                                            <Tooltip content="Xem chi tiết dữ liệu">
                                                <i className="cursor-pointer">
                                                    <BsInfoCircle fontSize={20} />
                                                </i>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                </Tab>
                <Tab key={'Posts'} title={'Bài đăng'}>
                    <Table
                        aria-label="Example table with client side pagination"
                        classNames={{
                            wrapper: 'max-h-[400px]',
                        }}
                    >
                    <TableHeader>
                            <TableColumn key="name">Tên người dùng</TableColumn>
                            <TableColumn key="email">email</TableColumn>
                            <TableColumn key="email">Số điện thoại</TableColumn>
                            <TableColumn key="email">quyền</TableColumn>
                            <TableColumn key="role">ngày xóa</TableColumn>
                            <TableColumn key="role">Công cụ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {userTrash.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <span className="w-[280px] line-clamp-1">{item.name}</span>
                                    </TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.email}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.phone}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.role}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.deleted_at}</TableCell>
                                    <TableCell>
                                        <div className='className="w-[170px] text-center whitespace-nowrap flex gap-2'>
                                            <Tooltip content="Xem chi tiết dữ liệu">
                                                <i className="cursor-pointer">
                                                    <BsInfoCircle fontSize={20} />
                                                </i>
                                            </Tooltip>
                                            <Tooltip content="Xem chi tiết dữ liệu">
                                                <i className="cursor-pointer">
                                                    <BsInfoCircle fontSize={20} />
                                                </i>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                </Tab>
            </Tabs>
        </div>
    );
}
