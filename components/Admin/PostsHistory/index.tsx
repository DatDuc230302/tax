import { Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from '@nextui-org/react';
import React from 'react';
import { BsInfoCircle } from 'react-icons/bs';

export default function PostsHistory({ postsHistory }: { postsHistory: any }) {
    return (
        <Table
            aria-label="Example table with client side pagination"
            classNames={{
                wrapper: 'max-h-[400px]',
            }}
        >
            <TableHeader>
                <TableColumn key="name">Tiêu đề bài viết</TableColumn>
                <TableColumn key="user">Người thực hiện</TableColumn>
                <TableColumn key="oldData">Dữ liệu cũ</TableColumn>
                <TableColumn key="newData">Dữ liệu mới</TableColumn>
                <TableColumn key="activity">Hành động</TableColumn>
                <TableColumn key="date">Ngày thực hiện</TableColumn>
                <TableColumn key="tools">Công cụ</TableColumn>
            </TableHeader>
            <TableBody>
                {postsHistory.map((item: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell>
                            <span className="w-[280px] line-clamp-1">{item.post_title}</span>
                        </TableCell>
                        <TableCell className="w-[170px] whitespace-nowrap">{item.user_name}</TableCell>
                        <TableCell className="w-[170px] whitespace-nowrap">
                            <Chip>Dữ liệu cũ</Chip>
                        </TableCell>
                        <TableCell className="w-[170px] whitespace-nowrap">
                            <Chip color="primary">Dữ liệu mới</Chip>
                        </TableCell>
                        <TableCell className="w-[170px] whitespace-nowrap">
                            {item.action === 'updated post' && 'Cập nhật bài viết'}
                            {item.action === 'change status' && 'Đổi trạng thái'}
                        </TableCell>
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
    );
}
