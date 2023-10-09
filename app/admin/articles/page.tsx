'use client';

import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
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
import CreateArticle from '@/components/CreateArticle';
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
];

export default function Articles() {
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [users, setUsers] = useState<object[]>(data);

    const [selection, setSelection] = useState<string>('Tên');

    const handleSearch = (key: string) => {
        switch (selection) {
            case 'Tên':
                setUsers(data.filter((item) => item.name.toLocaleLowerCase().includes(key.toLocaleLowerCase())));
                break;
            case 'Email':
                setUsers(data.filter((item) => item.email.toLocaleLowerCase().includes(key.toLocaleLowerCase())));
                break;
            case 'Số điện tho':
                setUsers(data.filter((item) => item.phone.toLocaleLowerCase().includes(key.toLocaleLowerCase())));
                break;
        }
    };

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
                <CreateArticle />
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
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.phone}</TableCell>
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
                                        {capitalizeFirstLetter(item.status)}
                                    </Chip>
                                )}
                                {item.status === 'active' && (
                                    <Chip className="text-white" color="primary">
                                        {capitalizeFirstLetter(item.status)}
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
