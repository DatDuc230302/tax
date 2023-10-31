'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import RestoreTrash from '../RestoreTrash';
import DeletePermanent from '../DeletePermanent';

export default function TrashPosts() {
    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>ID bài viết</TableColumn>
                <TableColumn>Tên bài viết</TableColumn>
                <TableColumn>Ngày xóa</TableColumn>
                <TableColumn>Công cụ</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell className="whitespace-nowrap w-[170px]">1</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">Admin</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">15/5/2002</TableCell>
                    <TableCell className="whitespace-nowrap w-[170px]">
                        <div className="flex gap-2">
                            <RestoreTrash type={'posts'} />
                            <DeletePermanent type={'posts'} />
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
