'use client';
import React, { useContext } from 'react';
import { AdminContext } from '../layout';
import NoneRole from '@/componentsAdmin/NoneRole';
import { Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, Tooltip } from '@nextui-org/react';
import { BsInfoCircle } from 'react-icons/bs';

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

export default function History() {
    const dataContext = useContext(AdminContext);

    const showAction = (id: string) => {
        alert(id);
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
                            <TableColumn key="name">Tên tài khoản</TableColumn>
                            <TableColumn key="email">Tên bài đăng</TableColumn>
                            <TableColumn key="phone">Hành động</TableColumn>
                            <TableColumn key="role">Ngày thực hiện</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {data.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.nameAccount}</TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.namePost}</TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap flex gap-2">
                                        {item.action}
                                        <Tooltip content="Xem chi tiết hành động" placement="bottom">
                                            <i
                                                onClick={() => showAction(item.id)}
                                                className="w-[20px] flex cursor-pointer"
                                            >
                                                <BsInfoCircle fontSize={20} />
                                            </i>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Tab>
                <Tab key="time" title="Thời gian truy cập">
                    <Table
                        aria-label="Example table with client side pagination"
                        classNames={{
                            wrapper: 'max-h-[400px]',
                        }}
                    >
                        <TableHeader>
                            <TableColumn key="name">Tên tài khoản</TableColumn>
                            <TableColumn key="email">Thời gian đăng nhập</TableColumn>
                            <TableColumn key="phone">Thời gian đăng xuất</TableColumn>
                            <TableColumn key="role">Tổng thời gian truy cập</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {data.map((item: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.nameAccount}</TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.namePost}</TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap flex gap-2">
                                        {item.action}
                                        <Tooltip content="Xem chi tiết hành động" placement="bottom">
                                            <i
                                                onClick={() => showAction(item.id)}
                                                className="w-[20px] flex cursor-pointer"
                                            >
                                                <BsInfoCircle fontSize={20} />
                                            </i>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell className="w-[25%] whitespace-nowrap">{item.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Tab>
            </Tabs>
        </div>
    );
}
