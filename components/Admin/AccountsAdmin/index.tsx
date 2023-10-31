'use client';

import React, { useContext, useEffect, useState } from 'react';
import ChangeStatus from '@/components/Admin/ChangeStatus';
import Delete from '@/components/Admin/Delete';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import axios from 'axios';
import { serverBackend } from '@/server';
import { AdminContext } from '@/app/admin/layout';
import NoneRole from '@/components/Admin/NoneRole';
import { formatTime } from '@/functions/formatTime';
import CreateUser from '../CreateUser';
import SnackbarMessage from '@/components/Common/SnackbarMessage';
import AccountsToolsAdmin from '../AccountsToolsAdmin';

export default function AccountsAdmin() {
    // Dữ liệu users ban đầu
    const [initialUsers, setInitialUsers] = useState<object[]>([]);
    // Dữ liệu users có thể thay đổi
    const [users, setUsers] = useState<object[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    // Refresh lại component khi thay đổi
    const [refresh, setRefresh] = useState<boolean>(false);
    // Lấy dữ liệu context từ Layout Admin
    const dataContext = useContext(AdminContext);

    useEffect(() => {
        document.title = 'Quản lý người dùng';
    }, []);

    useEffect(() => {
        getUser();
    }, [refresh]);

    const getUser = async () => {
        try {
            const result = await axios.get(`${serverBackend}/api/v1/user`);
            setInitialUsers(result.data.data);
            setUsers(result.data.data);
        } catch (err: any) {
            console.log(err);
        }
    };

    return dataContext.role !== 'root' ? (
        <NoneRole />
    ) : (
        <div className="flex flex-col w-full gap-4 px-4">
            <AccountsToolsAdmin
                setUsers={setUsers}
                initialUsers={initialUsers}
                refresh={refresh}
                setRefresh={setRefresh}
            />
            <div className="flex flex-col gap-4">
                <Table
                    aria-label="Example table with client side pagination"
                    classNames={{
                        wrapper: 'max-h-[400px]',
                    }}
                >
                    <TableHeader>
                        <TableColumn key="name">Tên</TableColumn>
                        <TableColumn key="email">Email</TableColumn>
                        <TableColumn key="phone">Số điện thoại</TableColumn>
                        <TableColumn key="role">Quyền</TableColumn>
                        <TableColumn key="status">Trạng thái</TableColumn>
                        <TableColumn key="created">Ngày tạo</TableColumn>
                        <TableColumn key="updated">Ngày cập nhật</TableColumn>
                        <TableColumn key="tools">Công cụ</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {users.map((item: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell className="w-[170px] whitespace-nowrap">{item.name}</TableCell>
                                <TableCell className="w-[170px] whitespace-nowrap">{item.email}</TableCell>
                                <TableCell className="w-[170px] whitespace-nowrap">{item.phone}</TableCell>
                                <TableCell className="w-[170px] whitespace-nowrap">
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
                                <TableCell className="w-[170px] flex items-center">
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
                                <TableCell className="w-[170px] whitespace-nowrap">
                                    {formatTime(item.created_at)}
                                </TableCell>
                                <TableCell className="w-[170px] whitespace-nowrap">
                                    {formatTime(item.updated_at)}
                                </TableCell>
                                <TableCell className="w-[170px] whitespace-nowrap">
                                    {item.role !== 'root' && (
                                        <div className="flex gap-2">
                                            <ChangeStatus
                                                type="account"
                                                idUser={item.id}
                                                status={item.status}
                                                refresh={refresh}
                                                setRefresh={setRefresh}
                                            />
                                            {item.status === 'inactive' && (
                                                <Delete
                                                    type="account"
                                                    idUser={item.id}
                                                    refresh={refresh}
                                                    setRefresh={setRefresh}
                                                />
                                            )}
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
