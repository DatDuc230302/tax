'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { BiSolidRightArrow } from 'react-icons/bi';
import Search from '../Search';

interface items {
    icon?: ReactElement;
    title?: string;
    href: string;
}

const listNav: items[] = [
    {
        icon: <FaHome color={'white'} fontSize={'22px'} />,
        href: '/',
    },
    {
        title: 'TIN TỨC',
        href: '/tin-tuc',
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

export default function Header() {
    const pathName = usePathname();

    const path: string = '/' + pathName.split('/')[1];
    const [active, setActive] = useState<number>(0);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        switch (path) {
            case '/':
                setActive(0);
                break;
            case '/tin-tuc':
                setActive(1);
                setTitle('Tin tức');
                break;
            case '/nop-thue':
                setActive(2);
                setTitle('Nộp thuế');
                break;
            case '/tien-ich':
                setActive(3);
                setTitle('Tin tức');
                break;
            case '/van-de':
                setActive(4);
                setTitle('Vấn đề');
                break;
            case '/huong-dan':
                setActive(5);
                setTitle('Hướng dẫn');
                break;
            case '/lien-he':
                setActive(6);
                setTitle('Liên hệ');
                break;
            case '/search':
                setTitle('Tìm kiếm');
                break;
            default:
                setActive(0);
        }
    }, [pathName]);

    return (
        <header className="flex flex-col">
            <div className="flex relative h-[135px]">
                <Image
                    src={'/imgs/bg_header.jpg'}
                    layout="responsive"
                    width={0}
                    height={135}
                    className="object-cover"
                    alt=""
                />
                <div className="flex absolute w-full h-full">
                    <Image className="shrink-0" src={'/imgs/logo.png'} width={220} height={80} alt="" />
                    <div className="flex h-full justify-center flex-col text-white font-bold text-[26px]">
                        <span>CỔNG THÔNG TIN ĐIỆN TỬ</span>
                        <span>CHI CỤC THUẾ QUẬN 8 - TP. HỒ CHÍ MINH</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between px-[15px] bg-[#0B80FF] w-full h-[42px]">
                <div className="flex h-full items-center">
                    {listNav.map((item: items, index: number) => (
                        <Link
                            key={index}
                            href={`${item.href}`}
                            className={`${
                                active === index && `bg-[#52b6ff]`
                            } text-white select-none h-full items-center px-4 hover:bg-[#52B6FF] duration-100 ease-linear flex shrink-0 cursor-pointer font-bold`}
                        >
                            {item.icon ? item.icon : item.title}
                        </Link>
                    ))}
                </div>
                <Search />
            </div>
            {path !== '/' && (
                <div className="flex bg-[#F3F3F3] w-full gap-1 h-[50px] items-center px-2">
                    <span>Trang trủ</span>
                    <i className="flex translate-y-[1.5px]">
                        <BiSolidRightArrow color={'#333333'} fontSize={12} />
                    </i>
                    <span>{title}</span>
                </div>
            )}
        </header>
    );
}
