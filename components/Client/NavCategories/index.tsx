'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

interface items {
    icon?: ReactElement;
    title?: string;
    href: string;
}

export const listNav: items[] = [
    {
        icon: <FaHome color={'white'} fontSize={'22px'} />,
        href: '/',
    },
    {
        title: 'NỘP THUẾ',
        href: '/nop-thue',
    },
    {
        title: 'TIỆN ÍCH',
        href: '/tien-ich',
    },
    {
        title: 'VẤN ĐỀ THƯỜNG GẶP',
        href: '/van-de',
    },
    {
        title: 'HƯỚNG DẪN',
        href: '/huong-dan',
    },
    {
        title: 'LIÊN HỆ',
        href: '/lien-he',
    },
];

export default function NavCategories() {
    const [active, setActive] = useState<number>(0);

    const pathName = usePathname();

    const path: string = '/' + pathName.split('/')[1];

    useEffect(() => {
        switch (path) {
            case '/':
                setActive(0);
                break;
            case '/nop-thue':
                setActive(1);
                break;
            case '/tien-ich':
                setActive(2);
                break;
            case '/van-de':
                setActive(3);
                break;
            case '/huong-dan':
                setActive(4);
                break;
            case '/lien-he':
                setActive(5);
                break;
            case '/search':
                break;
            default:
                setActive(0);
        }
    }, [path]);

    return (
        <div className="hidden lg:flex h-full items-center font-sansSerif">
            {listNav.map((item: any, index: number) => (
                <Link
                    key={index}
                    href={`${item.href}`}
                    className={`${
                        active === index && `bg-[#52b6ff]`
                    } text-white select-none gap-1 h-full items-center px-4 hover:bg-[#52B6FF] duration-100 ease-linear flex shrink-0 cursor-pointer font-bold`}
                >
                    {item.icon ? item.icon : item.title}
                    <IoIosArrowDown fontSize={16} />
                </Link>
            ))}
        </div>
    );
}
