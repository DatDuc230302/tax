'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';
import { AiFillDashboard, AiFillSetting, AiFillSliders } from 'react-icons/ai';
import { BiCategory, BiSolidDashboard } from 'react-icons/bi';
import { BsClockHistory, BsFillPostcardFill } from 'react-icons/bs';
import { FaBars, FaTrash, FaUserFriends } from 'react-icons/fa';

interface items {
    icon: React.ReactElement;
    title: string;
    href: string;
}

const listItems: items[] = [
    {
        icon: <AiFillDashboard fontSize={20} />,
        title: 'Bảng điều khiển',
        href: '/admin',
    },
    {
        icon: <BsFillPostcardFill fontSize={20} />,
        title: 'Bài viết',
        href: '/admin/posts',
    },
    {
        icon: <FaUserFriends fontSize={20} />,
        title: 'Tài khoản',
        href: '/admin/accounts',
    },
    {
        icon: <BsClockHistory fontSize={20} />,
        title: 'Lịch sử hoạt động',
        href: '/admin/history',
    },
    {
        icon: <AiFillSliders fontSize={20} />,
        title: 'Quản lý Slides',
        href: '/admin/slides',
    },
    {
        icon: <AiFillSetting fontSize={20} />,
        title: 'Quản lý trang',
        href: '/admin/settingWeb',
    },
    {
        icon: <FaTrash fontSize={20} />,
        title: 'Thùng rác',
        href: '/admin/trash',
    },
];

export default function NavAdmin() {
    return (
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
    );
}
