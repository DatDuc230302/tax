'use client';

import React, { useEffect, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import { FaTrashAlt } from 'react-icons/fa';
import { HiMiniPencilSquare } from 'react-icons/hi2';
import { MdSettingsBackupRestore } from 'react-icons/md';
import RestoreStatus from '@/components/RestoreStatus';
import DeleteStatus from '@/components/DeleteStatus';
import CreateArticle from '@/components/CreateArticle';
import UpdateUser from '@/components/UpdateUser';
const data = [
    {
        key: '1',
        name: 'Tony Reichert',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        status: 'active',
    },
    {
        key: '1',
        name: 'Tran duc dat',
        email: 'datduc2303@gmail.com',
        phone: '0958823',
        pass: '1234',
        status: 'inactive',
    },
];

export default function Articles() {
    const [users, setUsers] = useState<object[]>(data);
    const [selection, setSelection] = useState<string>('Tên');
    const [searchValue, setSearchValue] = useState<string>('');
    const [sortUsers, setSortUsers] = useState<object[]>([]);
    const [sortCategory, setSortCategory] = useState<string>('Sắp xếp thể loại');
    const [sortTag, setSortTag] = useState<string>('Sắp xếp tag');
    const [sortStatus, setSortStatus] = useState<string>('Sắp xếp trạng thái');

    useEffect(() => {}, [searchValue]);

    useEffect(() => {}, [sortStatus]);

    return (
        <div className="flex flex-col w-full px-4 py-[20px] gap-4">
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
                                    {sortCategory}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Single selection example" variant="flat">
                                <DropdownItem onClick={() => setSortStatus('Sắp xếp trạng thái')} key="text">
                                    Tất cả
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    className="shrink-0 h-[40px] text-white lg:w-[180px] w-[45%] text-[16px] hover:bg-opacity-80 duration-100 ease-linear bg-[#2fbd5e]"
                                    variant="flat"
                                >
                                    {sortTag}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Single selection example" variant="flat">
                                <DropdownItem onClick={() => setSortStatus('Sắp xếp trạng thái')} key="text">
                                    Tất cả
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
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
                                <DropdownItem key="text">Tất cả</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <CreateArticle />
                    </div>
                </div>
            </div>
            <Table
                aria-label="Example table with client side pagination"
                classNames={{
                    wrapper: 'max-h-[400px]',
                }}
            >
                <TableHeader>
                    <TableColumn key="name">Tên bài viết</TableColumn>
                    <TableColumn key="content">Nội dung</TableColumn>
                    <TableColumn key="category">Thể loại</TableColumn>
                    <TableColumn key="role">Tag</TableColumn>
                    <TableColumn key="status">Trạng thái</TableColumn>
                    <TableColumn key="status">Công cụ</TableColumn>
                </TableHeader>
                <TableBody>
                    {users.map((item: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell className="flex w-max flex-nowrap">{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.pass}</TableCell>
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
    );
}
