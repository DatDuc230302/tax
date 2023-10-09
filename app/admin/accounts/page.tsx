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
import { BiRefresh } from 'react-icons/bi';
import { MdSettingsBackupRestore } from 'react-icons/md';
import RestoreStatus from '@/components/RestoreStatus';
import DeleteStatus from '@/components/DeleteStatus';
import UpdateUser from '@/components/UpdateUser';
import axios from 'axios';
const data = [
    {
        name: 'Tony Reichert',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        role: 'root',
        status: 'active',
    },
    {
        name: 'Duong Thuan An',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        role: 'admin',
        status: 'inactive',
    },
    {
        name: 'Tran Duc Dat',
        email: 'thanhai@gmail.com',
        phone: '0958823',
        pass: '1234',
        role: 'admin',
        status: 'inactive',
    },
    {
        name: 'Le Thanh Phu',
        email: 'thanhphu@gmail.com',
        phone: '0958823014',
        pass: '123456789',
        role: 'root',
        status: 'active',
    },
    {
        name: 'Phan Thanh Hai',
        email: 'thanhphu@gmail.com',
        phone: '0958823014',
        pass: '123456789',
        role: 'root',
        status: 'inactive',
    },
    {
        name: 'Tran Quoc Hao',
        email: 'thanhphu@gmail.com',
        phone: '0958823014',
        pass: '123456789',
        role: 'admin',
        status: 'active',
    },
];

export default function Accounts() {
    const [users, setUsers] = useState<object[]>([]);
    const [sortUsers, setSortUsers] = useState<object[]>([]);
    const [selection, setSelection] = useState<string>('Tên');
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');
    const [sortRole, setSortRole] = useState<string>('Sắp xếp quyền');

    useEffect(() => {
        const key: string = searchValue;
        switch (selection) {
            case 'Tên':
                setUsers(
                    sortUsers.filter((item: any) => item.name.toLocaleLowerCase().includes(key.toLocaleLowerCase())),
                );
                break;
            case 'Email':
                setUsers(
                    sortUsers.filter((item: any) => item.email.toLocaleLowerCase().includes(key.toLocaleLowerCase())),
                );
                break;
            case 'Số điện thoại':
                setUsers(
                    sortUsers.filter((item: any) => item.phone.toLocaleLowerCase().includes(key.toLocaleLowerCase())),
                );
                break;
            default:
                break;
        }
    }, [searchValue]);

    useEffect(() => {
        let sortData: object[] = [];
        if (sortStatus === 'Sắp xếp trạng thái') {
            if (sortRole === 'Sắp xếp quyền') {
                sortData = data;
            } else if (sortRole === 'Quản trị viên') {
                sortData = data.filter((item: any) => item.role === 'root');
            } else if (sortRole === 'Người quản lý') {
                sortData = data.filter((item: any) => item.role === 'admin');
            }
        } else if (sortStatus === 'Hoạt động') {
            if (sortRole === 'Sắp xếp quyền') {
                sortData = data.filter((item: any) => item.status === 'active');
            } else if (sortRole === 'Quản trị viên') {
                sortData = data.filter((item: any) => item.status === 'active' && item.role === 'root');
            } else if (sortRole === 'Người quản lý') {
                sortData = data.filter((item: any) => item.status === 'active' && item.role === 'admin');
            }
        } else if (sortStatus === 'Không hoạt động') {
            if (sortRole === 'Sắp xếp quyền') {
                sortData = data.filter((item: any) => item.status === 'inactive');
            } else if (sortRole === 'Quản trị viên') {
                sortData = data.filter((item: any) => item.status === 'inactive' && item.role === 'root');
            } else if (sortRole === 'Người quản lý') {
                sortData = data.filter((item: any) => item.status === 'inactive' && item.role === 'admin');
            }
        }
        setUsers(sortData);
        setSortUsers(sortData);
        setSearchValue('');
    }, [sortStatus, sortRole]);

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex h-max py-4">
                <div className="flex px-4 w-full gap-4 flex-col lg:flex-row justify-between">
                    <div className="flex items-center h-full flex-1 relative ">
                        <Input
                            onChange={(e) => setSearchValue(String(e.target.value))}
                            className="rounded-none"
                            type="text"
                            placeholder={`Tìm kiếm theo ${selection}`}
                            value={searchValue}
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
                    <div className="flex justify-center flex-col lg:flex-row items-center gap-4">
                        <div className="flex w-full gap-3 justify-between">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                        variant="flat"
                                    >
                                        {sortStatus}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Single selection example" variant="flat">
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
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button
                                        className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                        variant="flat"
                                    >
                                        {sortRole}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Single selection example" variant="flat">
                                    <DropdownItem onClick={() => setSortRole('Sắp xếp quyền')} key="text">
                                        Tất cả
                                    </DropdownItem>
                                    <DropdownItem onClick={() => setSortRole('Quản trị viên')} key="text">
                                        Quản trị viên
                                    </DropdownItem>
                                    <DropdownItem onClick={() => setSortRole('Người quản lý')} key="text">
                                        Người quản lý
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex w-full gap-3 justify-between">
                            <Button
                                className="shrink-0 h-[40px] lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                color="primary"
                            >
                                <CreateUser>
                                    <AiOutlinePlusCircle fontSize={20} />
                                    Thêm tài khoản
                                </CreateUser>
                            </Button>
                            <Button
                                className="shrink-0 h-[40px] lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                color="primary"
                            >
                                <BiRefresh fontSize={20} />
                                Tải lại trang
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
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
                                <TableCell className="w-[170px]">
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
                                <TableCell className="w-[170px] shrink-0">
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
                                <TableCell className="flex w-[80px] items-center h-full justify-between">
                                    <UpdateUser
                                        nameValue={item.name}
                                        emailValue={item.email}
                                        phoneValue={item.phone}
                                        passValue={item.pass}
                                        confirmPassValue={item.confirmPass}
                                    >
                                        <HiMiniPencilSquare className={'cursor-pointer'} fontSize={20} />
                                    </UpdateUser>
                                    <DeleteStatus>
                                        {item.status === 'active' && (
                                            <FaTrashAlt className={'cursor-pointer'} fontSize={20} />
                                        )}
                                    </DeleteStatus>
                                    {item.status === 'inactive' && (
                                        <RestoreStatus>
                                            <MdSettingsBackupRestore className={'cursor-pointer'} fontSize={20} />
                                        </RestoreStatus>
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
