'use client';

import React, { useState, ReactElement } from 'react';
import { listNav } from '../NavHeader';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import SearchTool from '../SearchTool';

interface items {
    icon?: ReactElement;
    title?: string;
    href?: string;
}

export default function Sidebar() {
    const [turn, setTurn] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setTurn(!turn)}>
                <FaBars className={'cursor-pointer'} color="white" fontSize={20} />
            </button>
            <div className={`z-[fixed top-0 bottom-0 right-0 left-0`}>
                <div
                    className={`${
                        turn ? 'visible' : 'invisible'
                    } z-50 bg-black bg-opacity-50 fixed left-0 right-0 top-0 bottom-0`}
                    onClick={() => setTurn(false)}
                ></div>
                <div
                    className={`${
                        turn ? 'left-[0]' : 'left-[-260px]'
                    } duration-250 ease-linear w-[260px] z-50 bg-white h-full fixed top-0 `}
                >
                    <div className="h-[70px] w-full bg-[#0B80FF] flex justify-between items-center px-4">
                        <AiOutlineClose
                            fontSize={20}
                            color="white"
                            className={'cursor-pointer'}
                            onClick={() => setTurn(false)}
                        />
                    </div>
                    <div className="flex flex-col px-4">
                        {listNav.map(
                            (item: items, index: number) =>
                                index > 0 && (
                                    <div key={index}>
                                        {item.href && (
                                            <Link
                                                href={item.href}
                                                className="items-center flex border-b-[1px] cursor-pointer border-[#ccc] h-[49px]"
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </div>
                                ),
                        )}
                        <SearchTool className="border-[2px] border-[#ccc] mt-2 w-full" />
                    </div>
                </div>
            </div>
        </>
    );
}
