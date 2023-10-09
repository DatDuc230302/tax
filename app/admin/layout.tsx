'use client';

import NoneAdmin from '@/components/NoneAdmin';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import Link from 'next/link';
import * as React from 'react';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsFillPostcardFill } from 'react-icons/bs';
import { FaUserFriends, FaBars, FaUser } from 'react-icons/fa';

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
                        <DropdownMenu aria-label="Example with disabled actions" disabledKeys={['edit', 'delete']}>
                            {listItems.map((item: items, index: number) => (
                                <DropdownItem key={index}>
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
                                <FaUser color="white" fontSize={24} />
                                <div className="flex flex-col text-[14px] text-white">
                                    <span>d</span>
                                </div>
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Example with disabled actions" disabledKeys={['edit', 'delete']}>
                            <DropdownItem>
                                <span>Đăng xuất</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="flex">{children}</div>
            </div>
        </div>
    );
}
