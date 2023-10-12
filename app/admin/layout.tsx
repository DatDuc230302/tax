'use client';

import NoneAdmin from '@/components/NoneAdmin';
import { serverBackend } from '@/server';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsFillPostcardFill } from 'react-icons/bs';
import { FaUserFriends, FaBars, FaUser } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        document.title = 'Trang quản trị';
    }, []);

    interface items {
        icon: React.ReactElement;
        title: string;
        href: string;
    }

    const listItems: items[] = [
        {
            icon: <BiSolidDashboard fontSize={20} />,
            title: 'Bảng điều khiển',
            href: '/admin/dashboard',
        },
        {
            icon: <BsFillPostcardFill fontSize={20} />,
            title: 'Bài viết',
            href: '/admin/articles',
        },
        {
            icon: <FaUserFriends fontSize={20} />,
            title: 'Tài khoản',
            href: '/admin/accounts',
        },
    ];

    const router = useRouter();
    const nameUser: any = sessionStorage.getItem('name_user');
    const roleUSer: any = sessionStorage.getItem('role_user');

    const logout = async () => {
        const token: any = sessionStorage.getItem('access_token');
        const result = await axios.post(
            `${serverBackend}/api/v1/logout`,
            {},
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        if (result.data.status === 'success') {
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('name_user');
            sessionStorage.removeItem('role_user');
            router.push('/login');
        }
    };

    const renderUI = () => {
        if (roleUSer !== 'admin' && roleUSer !== 'root') {
            return <div>Cút khỏi server</div>;
        } else {
            return (
                <div className="flex h-full">
                    <div className="flex w-full flex-col">
                        <div className="justify-between px-4 flex bg-[#3077D9] w-full h-[70px]">
                            <Dropdown>
                                <DropdownTrigger>
                                    <div className="flex cursor-pointer h-full px-1 items-center">
                                        <FaBars color="white" fontSize={24} />
                                    </div>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Example with disabled actions">
                                    {listItems.map((item: items, index: number) => (
                                        <DropdownItem textValue={item.title} key={index}>
                                            <Link href={item.href} className="flex items-center gap-2">
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
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
                                    <DropdownItem onClick={() => logout()} textValue="logout">
                                        Đăng xuất
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="flex">{children}</div>
                    </div>
                </div>
            );
        }
    };

    return renderUI();
}
