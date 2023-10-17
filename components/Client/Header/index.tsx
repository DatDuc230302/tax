'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaHome, FaBars } from 'react-icons/fa';
import { BiSolidRightArrow } from 'react-icons/bi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import Search from '../Search';
import Sidebar from '../Sidebar';

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
                setTitle('Tiện ích');
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
    }, [path]);

    return (
        <header id="header" className="flex flex-col select-none">
            <div className="hidden lg:flex relative h-[135px]">
                <div className="flex w-full h-[135px] relative">
                    <Image src={'/imgs/bg_header.jpg'} fill sizes="1000000px" alt="" />
                </div>
                <div className="flex absolute w-full h-full">
                    <div className="w-[220px] h-[120px] relative">
                        <Image src={'/imgs/logo.png'} fill sizes="220px" alt="" />
                    </div>
                    <div className="hidden lg:flex h-full justify-center flex-col text-white font-bold text-[26px]">
                        <span>CỔNG THÔNG TIN ĐIỆN TỬ</span>
                        <span>CHI CỤC THUẾ QUẬN 8 - TP. HỒ CHÍ MINH</span>
                    </div>
                </div>
                <div className="absolute top-0 right-0 flex items-center gap-2 text-white px-2 py-1">
                    <div className="flex items-center gap-2 font-bold hover:underline cursor-pointer">
                        <BsFillTelephoneFill color="white" />
                        <span>0957124124</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between px-[15px] bg-[#0B80FF] w-full h-[70px] lg:h-[42px]">
                <div className="h-full flex w-full lg:hidden items-center">
                    <Sidebar>
                        <FaBars className={'cursor-pointer'} color="white" fontSize={20} />
                    </Sidebar>
                    <div className="flex ">
                        <Image src={'/imgs/logo.png'} width={100} height={100} alt="" />
                        <h1 className="flex items-center text-white font-bold">Chi cục thuế quận 8</h1>
                    </div>
                </div>
                <div className="hidden lg:flex h-full items-center">
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

                <div className="hidden lg:flex">
                    <Search />
                </div>
            </div>
        </header>
    );
}
