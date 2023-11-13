'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaBars, FaHome } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import SearchTool from '../SearchTool';
import css from './NavHeader.module.scss';
import { removeDiacriticsAndSpaces } from '@/functions/removeDiacriticsAndSpaces';

interface items {
    icon?: ReactElement;
    title?: string;
    href?: string;
    isBlank?: boolean;
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
        title: 'DỊCH VỤ CÔNG',
        href: 'https://dichvucong.hochiminhcity.gov.vn/vi/',
        isBlank: true,
    },
    {
        title: 'VĂN BẢN',
        href: '/bai-dang?category=van-ban',
    },
    {
        title: 'TIỆN ÍCH',
        href: '/tien-ich',
    },
    {
        title: 'LIÊN HỆ',
        href: '/lien-he',
    },
];

interface subNewItems {
    title: string;
}

const subNews: subNewItems[] = [{ title: 'Tin kinh tế' }, { title: 'Tin chính trị' }, { title: 'Tin về thuế' }];

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
            case '/van-ban':
                setActive(4);
                break;
            case '/tien-ich':
                setActive(5);
                break;
            case '/lien-he':
                setActive(6);
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
                            <div
                                className={`${
                                    active === index && `bg-[#52b6ff]`
                                } text-white select-none gap-1 h-full items-center px-4 hover:bg-[#52B6FF] duration-100 ease-linear flex shrink-0 cursor-pointer font-bold`}
                            >
                                {!item.isBlank && (
                                    <Link href={`${item.href}`}>{item.icon ? item.icon : item.title}</Link>
                                )}
                                {item.isBlank && (
                                    <a target="blank" href={`${item.href}`}>
                                        {item.icon ? item.icon : item.title}
                                    </a>
                                )}
                            </div>
                        )}
                        {!item.href && (
                            <span
                                className={`${active === index && `bg-[#52b6ff]`} ${
                                    css.news
                                } text-white cursor-default relative select-none gap-1 h-full items-center px-4 hover:bg-[#52B6FF] duration-100 ease-linear flex shrink-0 font-bold`}
                            >
                                {item.title}
                                {item.icon}
                                <div className={`${css.subNews} shadow-2xl flex flex-col`}>
                                    {subNews.map((subNew: any) => (
                                        <Link
                                            href={`/bai-dang?category=tin-tuc&subCategory=${removeDiacriticsAndSpaces(
                                                subNew.title,
                                            )}`}
                                            key={subNew}
                                            className="py-2 px-4 text-[#363636] hover:bg-[#e4e4e4] cursor-pointer"
                                        >
                                            {subNew.title}
                                        </Link>
                                    ))}
                                </div>
                            </span>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex">
                <SearchTool />
            </div>
        </div>
    );
}
