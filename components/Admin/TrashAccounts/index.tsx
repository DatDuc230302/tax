'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import RestoreTrash from '../RestoreTrash';
import DeletePermanent from '../DeletePermanent';
import axios from 'axios';
import { serverBackend } from '@/server';
import { formatTime } from '@/functions/formatTime';

export default function TrashAccounts() {
    const [trashAccounts, setTrashAccounts] = useState<object[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    useEffect(() => {
        getTrashAccounts();
    }, [refresh]);

    const getTrashAccounts = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/trashed`);
            setTrashAccounts(result.data.data);
        } catch (err) {
            console.log(err);
        }
    };

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
                {trashAccounts.map((item: any, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="whitespace-nowrap w-[170px]">{item.id}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">{item.name}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">{item.email}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">{item.phone}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">
                            {item.role === 'root' && (
                                <div className="text-white p-1 w-[140px] rounded-[50px] flex items-center justify-center select-none bg-red-500">
                                    Quản trị viên
                                </div>
                            )}
                            {item.role === 'admin' && (
                                <div
                                    className="text-white bg-yellow-500 p-1 w-[140px] rounded-[50px] flex items-center justify-center select-none"
                                    color={'warning'}
                                >
                                    Người quản lý
                                </div>
                            )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">{formatTime(item.deleted_at)}</TableCell>
                        <TableCell className="whitespace-nowrap w-[170px]">
                            <div className="flex gap-2">
                                <RestoreTrash
                                    type={'account'}
                                    idTrashUser={item.id}
                                    refresh={refresh}
                                    setRefresh={setRefresh}
                                />
                                <DeletePermanent
                                    type={'account'}
                                    idTrashUser={item.id}
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
