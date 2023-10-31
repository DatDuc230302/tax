'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import RestoreTrash from '../RestoreTrash';
import DeletePermanent from '../DeletePermanent';

export default function TrashAccounts() {
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>ID tài khoản</TableColumn>
                <TableColumn>Tên tài khoản</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Số điện thoại</TableColumn>
                <TableColumn>Quyền</TableColumn>
                <TableColumn>Ngày xóa</TableColumn>
                <TableColumn>Công cụ</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell className="whitespace-nowrap w-[170px]">1</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">Admin</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">@gmail.com</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">123456789</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">Active</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">Active</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">
                        <div className="flex gap-2">
                            <RestoreTrash type={'accounts'} />
                            <DeletePermanent type={'accounts'} />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
