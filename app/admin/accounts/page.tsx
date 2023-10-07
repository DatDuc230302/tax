'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import CreateUser from '@/components/CreateUser';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Input,
    Chip,
    Tooltip,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { FaTrashAlt } from 'react-icons/fa';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { MdOutlineRestore } from 'react-icons/md';
import RestoreStatus from '@/components/RestoreStatus';
import DeleteStatus from '@/components/DeleteStatus';
const data = [
    {
        key: '1',
        name: 'Tony Reichert',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        role: 'root',
        status: 'active',
    },
    {
        key: '1',
        name: 'Tran duc dat',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        role: 'admin',
        status: 'inactive',
    },
    {
        key: '1',
        name: 'Thanh hai',
        email: 'thanhai@gmail.com',
        phone: '0958823',
        pass: '1234',
        role: 'admin',
        status: 'inactive',
    },
];

export default function Accounts() {
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [users, setUsers] = useState<object[]>(data);
    const [selection, setSelection] = useState<string>('Tên');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');
    const handleSearch = (key: string) => {
        switch (selection) {
            case 'Tên':
                setUsers(users.filter((item: any) => item.name.toLocaleLowerCase().includes(key.toLocaleLowerCase())));
                break;
            case 'Email':
                setUsers(users.filter((item: any) => item.email.toLocaleLowerCase().includes(key.toLocaleLowerCase())));
                break;
            case 'Số điện thoại':
                setUsers(users.filter((item: any) => item.phone.toLocaleLowerCase().includes(key.toLocaleLowerCase())));
                break;
            default:
                setUsers(users);
                break;
        }
    };

    useEffect(() => {
        switch (sortStatus) {
            case 'Sắp xếp trạng thái':
                setUsers(data);
                break;
            case 'Hoạt động':
                setUsers(data.filter((item) => item.status === 'active'));
                break;
            case 'Không hoạt động':
                setUsers(data.filter((item) => item.status === 'inactive'));
                break;
            default:
                break;
        }
    }, [sortStatus]);

    return (
        <div className="flex flex-col w-full px-4 py-[20px] gap-4">
            <div className="flex justify-end gap-10">
                <div className="flex flex-1 relative ">
                    <Input
                        onChange={(e) => handleSearch(String(e.target.value))}
                        className="rounded-none"
                        type="text"
                        placeholder={`Tìm kiếm theo ${selection}`}
                    />
                    <div className="absolute right-0">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="flat">{selection}</Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection example"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                            >
                                <DropdownItem onClick={() => setSelection('Tên')} key="text">
                                    Tên
                                </DropdownItem>
                                <DropdownItem onClick={() => setSelection('Email')} key="text">
                                    Email
                                </DropdownItem>
                                <DropdownItem onClick={() => setSelection('Số điện thoại')} key="text">
                                    Số điện thoại
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            className="shrink-0 text-white h-full w-[180px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                            variant="flat"
                        >
                            {sortStatus}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                    >
                        <DropdownItem onClick={() => setSortStatus('Sắp xếp trạng thái')} key="text">
                            Tất cả
                        </DropdownItem>
                        <DropdownItem onClick={() => setSortStatus('Hoạt động')} key="text">
                            Hoạt động
                        </DropdownItem>
                        <DropdownItem onClick={() => setSortStatus('Không hoạt động')} key="text">
                            Không hoạt động
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button
                    className="shrink-0 h-full w-[180px] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e] p-0"
                    color="primary"
                >
                    <CreateUser>
                        <AiOutlinePlusCircle fontSize={20} />
                        Thêm tài khoản
                    </CreateUser>
                </Button>
            </div>
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
                    <TableColumn key="pass">Mật khẩu</TableColumn>
                    <TableColumn key="role">Quyền</TableColumn>
                    <TableColumn key="status">Trạng thái</TableColumn>
                    <TableColumn key="status">Công cụ</TableColumn>
                </TableHeader>
                <TableBody>
                    {users.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.pass}</TableCell>
                            <TableCell>
                                {item.role === 'root' && (
                                    <Chip className="text-white" color="danger">
                                        {capitalizeFirstLetter(item.role)}
                                    </Chip>
                                )}
                                {item.role === 'admin' && (
                                    <Chip className="text-white" color={'warning'}>
                                        {capitalizeFirstLetter(item.role)}
                                    </Chip>
                                )}
                            </TableCell>
                            <TableCell>
                                {item.status === 'inactive' && (
                                    <Chip className="text-white" color="success">
                                        Không hoạt động
                                    </Chip>
                                )}
                                {item.status === 'active' && (
                                    <Chip className="text-white" color="primary">
                                        Hoạt động
                                    </Chip>
                                )}
                            </TableCell>
                            <TableCell className="flex items-center h-full gap-2">
                                <HiMiniPencilSquare className={'cursor-pointer'} fontSize={18} />
                                <DeleteStatus>
                                    {item.status === 'active' && (
                                        <FaTrashAlt className={'cursor-pointer'} fontSize={18} />
                                    )}
                                </DeleteStatus>
                                {item.status === 'inactive' && (
                                    <RestoreStatus>
                                        <MdOutlineRestore className={'cursor-pointer'} fontSize={20} />
                                    </RestoreStatus>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
