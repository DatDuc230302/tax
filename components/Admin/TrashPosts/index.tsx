'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import RestoreTrash from '../RestoreTrash';
import { serverBackend } from '@/server';
import axios from 'axios';
import { formatTime } from '@/functions/formatTime';

export default function TrashPosts() {
    const [trashPosts, setTrashPosts] = useState<object[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
        getTrashPosts();
    }, [refresh]);

    const getTrashPosts = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/posts/trashed`);
            if (result.data.message === 'success') {
                setTrashPosts(result.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>ID bài viết</TableColumn>
                <TableColumn>Tên bài viết</TableColumn>
                <TableColumn>Ngày xóa</TableColumn>
                <TableColumn>Công cụ</TableColumn>
            </TableHeader>
            <TableBody>
                {trashPosts.map((item: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="whitespace-nowrap w-[170px]">{item.id}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">{item.title}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">{formatTime(item.deleted_at)}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">
                            <div className="flex gap-2">
                                <RestoreTrash
                                    type={'post'}
                                    idTrashPost={item.id}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
