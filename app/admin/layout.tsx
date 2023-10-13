'use client';

import NoneRole from '@/componentsAdmin/NoneRole';
import { serverBackend } from '@/server';
import axios from 'axios';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, createContext } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import NavAdmin from '@/componentsAdmin/NavAdmin';

interface typeContext {
    name: string;
    role: string;
}

export const AdminContext = createContext<typeContext>({
    name: '',
    role: '',
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [nameUser, setNameUser] = useState<string>('');
    const [roleUser, setRoleUser] = useState<string>('');
    const router = useRouter();

    // Truyền dữ liệu thông qua đây
    const dataContext = { name: nameUser, role: roleUser };

    useEffect(() => {
        document.title = 'Trang quản trị';
        const name: any = sessionStorage.getItem('name_user');
        const role: any = sessionStorage.getItem('role_user');
        setNameUser(String(name));
        setRoleUser(String(role));
    }, []);

    const logout = async () => {
        sessionStorage.removeItem('role_user');
        sessionStorage.removeItem('name_user');
        router.push('/login');
        // try {
        //     const token: any = sessionStorage.getItem('access_token');
        //     const result = await axios.post(
        //         `${serverBackend}/api/v1/logout`,
        //         {},
        //         {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         },
        //     );
        //     if (result.data.status === 'success') {
        //         sessionStorage.removeItem('access_token');
        //         sessionStorage.removeItem('name_user');
        //         sessionStorage.removeItem('role_user');
        //         router.push('/login');
        //     }
        // } catch {
        //     console.log('Error');
        // }
    };

    const renderUI = () => {
        if (roleUser.length > 0) {
            if (roleUser === 'admin' || roleUser === 'root') {
                return (
                    <AdminContext.Provider value={dataContext}>
                        <div className="flex h-full">
                            <div className="flex w-full flex-col">
                                <div className="justify-between px-4 flex bg-[#3077D9] w-full h-[70px]">
                                    <NavAdmin />
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <div className="cursor-pointer gap-2 pr-2 flex h-full items-center">
                                                <Badge content="12" size="sm" color="danger">
                                                    <div className="w-[40px] h-[40px] relative">
                                                        <Image
                                                            src="/imgs/avatar.jpg"
                                                            fill
                                                            sizes="40px"
                                                            className="rounded-[50%]"
                                                            alt=""
                                                        />
                                                    </div>
                                                </Badge>
                                                <div className="flex items-center text-[14px] text-white">
                                                    <span>{nameUser}</span>
                                                    <MdOutlineKeyboardArrowDown fontSize={20} />
                                                </div>
                                            </div>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Example with disabled actions"
                                            disabledKeys={['edit', 'delete']}
                                        >
                                            <DropdownItem textValue="info">
                                                <Link href={'/admin/infoAccount'}>Thông tin tài khoản</Link>
                                            </DropdownItem>
                                            <DropdownItem onClick={() => logout()} textValue="logout">
                                                Đăng xuất
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <div className="flex">{children}</div>
                            </div>
                        </div>
                    </AdminContext.Provider>
                );
            } else {
                return <NoneRole />;
            }
        }
    };

    return renderUI();
}
