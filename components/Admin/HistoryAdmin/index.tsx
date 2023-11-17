'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '@/app/admin/layout';
import NoneRole from '@/components/Admin/NoneRole';
import { Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Tooltip } from '@nextui-org/react';
import { BsInfoCircle } from 'react-icons/bs';
import axios from 'axios';
import { serverBackend } from '@/server';
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

export default function HistoryAdmin() {
    const dataContext = useContext(AdminContext);
    const [postsHistory, setPostsHistory] = useState<object[]>([]);
    const [userHistory, setUserHistory] = useState([]);

    useEffect(() => {
        getPostHistory();

        axios
            .get(`${serverBackend}/api/v1/user_history`)
            .then((response) => {
                setUserHistory(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching user history:', error);
            });
    }, []);

    const getPostHistory = async () => {
        const result = await axios.get(`${serverBackend}/api/v1/post_history`);
        if (result.data.message === 'success') {
            setPostsHistory(result.data.data);
        }
    };

    return dataContext.role !== 'root' ? (
        <NoneRole />
    ) : (
        <div className="flex w-full flex-col mt-4 h-full px-4">
            <Tabs aria-label="Tabs sizes">
                <Tab key="posts" title="Lịch sử bài viết">
                    <Table
                        aria-label="Example table with client side pagination"
                        classNames={{
                            wrapper: 'max-h-[400px]',
                        }}
                    >
                        <TableHeader>
                            <TableColumn key="name">Tiêu đề bài viết</TableColumn>
                            <TableColumn key="email">Người thực hiện</TableColumn>
                            <TableColumn key="email">Dữ liệu cũ</TableColumn>
                            <TableColumn key="email">Dữ liệu mới</TableColumn>
                            <TableColumn key="phone">Hành động</TableColumn>
                            <TableColumn key="role">Ngày thực hiện</TableColumn>
                            <TableColumn key="role">Công cụ</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {postsHistory.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <span className="w-[280px] line-clamp-1">{item.post_title}</span>
                                    </TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.user_name}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">d</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">d</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.action}</TableCell>
                                    <TableCell className="w-[170px] whitespace-nowrap">{item.action_time}</TableCell>
                                    <TableCell>
                                        <div className='className="w-[170px] text-center whitespace-nowrap flex gap-2'>
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
                <Tab key="time" title="Hoạt động">
                    <Table
                        aria-label="Example table with client side pagination"
                        classNames={{
                            wrapper: 'max-h-[400px]',
                        }}
                    >
                        <TableHeader>
                            <TableColumn key="name">Tên tài khoản</TableColumn>
                            <TableColumn key="email">Đã thay đổi</TableColumn>
                            <TableColumn key="phone">Thời gian thay đổi</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {userHistory.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.user_name}</TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.activity_type}</TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap flex gap-2">
                                        {item.activity_time}
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
