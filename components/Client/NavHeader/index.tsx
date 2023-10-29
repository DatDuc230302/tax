'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaBars, FaHome } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import SearchTool from '../SearchTool';

interface items {
    icon?: ReactElement;
    title?: string;
    href?: string;
}

export const listNav: items[] = [
    {
        icon: <FaHome color={'white'} fontSize={'18px'} />,
        href: '/',
    },
    {
        icon: <HiChevronDown color="white" fontSize={22} />,
        title: 'TIN TỨC',
        href: '',
    },
    {
        title: 'BÀI ĐĂNG',
        href: '/bai-dang',
    },
    {
        title: 'TIỆN ÍCH',
        href: '/tien-ich',
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

export default function NavHeader() {
    const [active, setActive] = useState<number>(0);

    const pathName = usePathname();

    const path: string = '/' + pathName.split('/')[1];

    useEffect(() => {
        switch (path) {
            case '/':
                setActive(0);
                break;
            case '/bai-dang':
                setActive(2);
                break;
            case '/tien-ich':
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
        <div className="hidden lg:flex w-full justify-between h-full items-center font-sansSerif">
            <div className="flex h-full">
                {listNav.map((item: any, index: number) => (
                    <div key={index}>
                        {item.href.length > 0 && (
                            <Link
                                href={`${item.href}`}
                                className={`${
                                    active === index && `bg-[#52b6ff]`
                                } text-white select-none gap-1 h-full items-center px-4 hover:bg-[#52B6FF] duration-100 ease-linear flex shrink-0 cursor-pointer font-bold`}
                            >
                                {item.icon ? item.icon : item.title}
                            </Link>
                        )}
                        {!item.href && (
                            <span
                                className={`${
                                    active === index && `bg-[#52b6ff]`
                                } text-white select-none gap-1 h-full items-center px-4 hover:bg-[#52B6FF] duration-100 ease-linear flex shrink-0 cursor-pointer font-bold`}
                            >
                                {item.title}
                                {item.icon}
                            </span>
                        )}
                    </div>
                ))}
                <i className="flex h-full cursor-pointer items-center pb-[2px] px-4 hover:bg-[#52B6FF] duration-100 ease-linea">
                    <FaBars fontSize={20} color="white" />
                </i>
            </div>
            <div className="flex">
                <SearchTool />
            </div>
        </div>
    );
}
