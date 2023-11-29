import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';

export default function UserHistory({ userHistory }: { userHistory: any }) {
    return (
        <Table
            aria-label="Example table with client side pagination"
            classNames={{
                wrapper: 'max-h-[400px]',
            }}
        >
            <TableHeader>
                <TableColumn key="name">Tên tài khoản</TableColumn>
                <TableColumn key="email">Hành động</TableColumn>
                <TableColumn key="phone">Thời gian thay đổi</TableColumn>
            </TableHeader>
            <TableBody>
                {userHistory.map((item: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="w-[25%] whitespace-nowrap">{item.user_name}</TableCell>
                        <TableCell className="w-[25%] whitespace-nowrap">
                            {item.activity_type === 'created post' && 'Tạo bài viết mới'}
                            {item.activity_type === 'updated post' && 'Cập nhật bài viết'}
                            {item.activity_type === 'Updated post status to inactive' &&
                                'Chuyển trạng thái bài viết thành không hoạt động'}
                            {item.activity_type === 'Updated post status to active' &&
                                'Chuyển trạng thái bài viết thành hoạt động'}
                        </TableCell>
                        <TableCell className="w-[25%] whitespace-nowrap flex gap-2">{item.activity_time}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
