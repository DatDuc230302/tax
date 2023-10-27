'use client';

import React, { useState, ReactElement } from 'react';
import css from './Sidebar.module.scss';
import { listNav } from '../NavCategories';
import { AiOutlineClose } from 'react-icons/ai';
import Search from '../Search';
import { FaBars } from 'react-icons/fa';

interface items {
    icon?: ReactElement;
    title?: string;
    href: string;
}

export default function Sidebar() {
    const [turn, setTurn] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setTurn(!turn)}>
                <FaBars className={'cursor-pointer'} color="white" fontSize={20} />
            </button>
            <div className={`${css.modal} ${turn ? 'visible' : 'invisible'}`}>
                <div onClick={() => setTurn(false)} className={`${css.overlay}`}></div>
                <div className={`${css.box} ${turn && 'left-[0px]'}`}>
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
                                    <span
                                        key={index}
                                        className="items-center flex border-b-[1px] cursor-pointer border-[#ccc] h-[49px]"
                                    >
                                        {item.title}
                                    </span>
                                ),
                        )}
                        <Search className="border-[2px] border-[#ccc] mt-2 w-full" />
                    </div>
                </div>
            </div>
        </>
    );
}
